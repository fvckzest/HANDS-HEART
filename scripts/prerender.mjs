import { createServer } from 'node:http'
import { access, mkdir, readFile, stat, writeFile } from 'node:fs/promises'
import { dirname, extname, join, normalize, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer'

import { resolvePrerenderRoutes } from './prerender-routes.mjs'

const rootDirectory = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const outputDirectory = join(rootDirectory, 'dist')
const outputRoot = `${outputDirectory}/`
const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
}

function getStaticFilePath(pathname) {
  const decodedPathname = decodeURIComponent(pathname)
  const requestedPath = normalize(decodedPathname).replace(/^[/\\]+/, '')
  const candidate = resolve(outputDirectory, requestedPath)

  return candidate.startsWith(outputRoot) || candidate === outputDirectory
    ? candidate
    : null
}

async function readStaticFile(pathname) {
  const candidate = getStaticFilePath(pathname)

  if (!candidate) {
    return null
  }

  try {
    const candidateStats = await stat(candidate)

    if (!candidateStats.isFile()) {
      return null
    }

    return {
      body: await readFile(candidate),
      contentType: mimeTypes[extname(candidate)] ?? 'application/octet-stream',
    }
  } catch {
    return null
  }
}

async function startStaticServer() {
  const index = await readFile(join(outputDirectory, 'index.html'))
  const server = createServer(async (request, response) => {
    const requestUrl = new URL(request.url ?? '/', 'http://127.0.0.1')
    const staticFile = await readStaticFile(requestUrl.pathname)

    if (staticFile) {
      response.writeHead(200, { 'content-type': staticFile.contentType })
      response.end(staticFile.body)
      return
    }

    response.writeHead(200, { 'content-type': 'text/html; charset=utf-8' })
    response.end(index)
  })

  await new Promise((resolveServer, rejectServer) => {
    server.once('error', rejectServer)
    server.listen(0, '127.0.0.1', resolveServer)
  })

  const address = server.address()

  if (!address || typeof address === 'string') {
    await new Promise((resolveServer) => server.close(resolveServer))
    throw new Error('Prerender static server did not expose a local port.')
  }

  return {
    origin: `http://127.0.0.1:${address.port}`,
    close: () => new Promise((resolveServer) => server.close(resolveServer)),
  }
}

function getOutputPath(route) {
  if (route === '/') {
    return join(outputDirectory, 'index.html')
  }

  return join(outputDirectory, route.slice(1), 'index.html')
}

function escapeRegularExpression(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function removeLocalBuildUrls(html, origin) {
  const escapedOrigin = escapeRegularExpression(origin)
  const localCanonical = new RegExp(
    `<link rel="canonical" href="${escapedOrigin}[^"]*">`,
    'g',
  )

  return html
    .replace(localCanonical, '')
    .replaceAll(`${origin}/`, '/')
}

async function prerenderRoute(browser, origin, route) {
  const page = await browser.newPage()
  const pageErrors = []

  page.on('pageerror', (error) => pageErrors.push(error))

  try {
    await page.goto(`${origin}${route}`, { waitUntil: 'networkidle0' })
    await page.waitForSelector('#main-content')

    if (pageErrors.length > 0) {
      throw pageErrors[0]
    }

    const html = removeLocalBuildUrls(await page.content(), origin)
    const outputPath = getOutputPath(route)

    await mkdir(dirname(outputPath), { recursive: true })
    await writeFile(outputPath, html)
    console.log(`[prerender] Rendered ${route} -> ${outputPath}`)
  } finally {
    await page.close()
  }
}

async function getBrowserLaunchOptions() {
  if (process.env.PUPPETEER_EXECUTABLE_PATH) {
    return { headless: true, executablePath: process.env.PUPPETEER_EXECUTABLE_PATH }
  }

  const macOsChromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

  try {
    await access(macOsChromePath)

    return { headless: true, executablePath: macOsChromePath }
  } catch {
    return { headless: true }
  }
}

const routes = resolvePrerenderRoutes()
const staticServer = await startStaticServer()
const browser = await puppeteer.launch(await getBrowserLaunchOptions())

try {
  for (const route of routes) {
    await prerenderRoute(browser, staticServer.origin, route)
  }
} finally {
  await browser.close()
  await staticServer.close()
}
