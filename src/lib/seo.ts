import { useEffect } from 'react'

import { siteCopy } from '../content/siteCopy'

export interface RouteMetadata {
  title: string
  description: string
  pathname?: string
  image?: string | null
}

const siteName = 'Hands Heart'

function readPublicSiteUrl(): string | null {
  const value = import.meta.env.VITE_PUBLIC_SITE_URL

  if (typeof value !== 'string' || value.trim() === '') {
    return null
  }

  try {
    const url = new URL(value.trim())

    return url.protocol === 'http:' || url.protocol === 'https:'
      ? url.toString()
      : null
  } catch {
    return null
  }
}

function readBrowserOrigin(): string | null {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const url = new URL(window.location.origin)

    return url.protocol === 'http:' || url.protocol === 'https:'
      ? url.toString()
      : null
  } catch {
    return null
  }
}

/**
 * Resolves a canonical URL from public build metadata, or the current browser
 * origin during local development. Invalid configured values never interrupt
 * route rendering.
 */
export function getCanonicalUrl(pathname = '/'): string | null {
  const baseUrl = readPublicSiteUrl() ?? readBrowserOrigin()

  if (!baseUrl) {
    return null
  }

  try {
    return new URL(pathname, baseUrl).toString()
  } catch {
    return null
  }
}

function setMetaTag(
  attribute: 'name' | 'property',
  key: string,
  content: string | null | undefined,
): void {
  if (!content) {
    document.head
      .querySelector(`meta[${attribute}="${key}"]`)
      ?.remove()
    return
  }

  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`,
  )

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.append(element)
  }

  element.content = content
}

function setCanonicalLink(url: string | null): void {
  const existingLink = document.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]',
  )

  if (!url) {
    existingLink?.remove()
    return
  }

  const link = existingLink ?? document.createElement('link')

  link.rel = 'canonical'
  link.href = url

  if (!existingLink) {
    document.head.append(link)
  }
}

function getOpenGraphImage(image: string | null | undefined): string | null {
  if (!image) {
    return null
  }

  try {
    const url = new URL(image)

    return url.protocol === 'http:' || url.protocol === 'https:'
      ? url.toString()
      : null
  } catch {
    return null
  }
}

/** Updates the document head for client-rendered public storefront routes. */
export function useRouteMetadata({
  title,
  description,
  pathname,
  image,
}: RouteMetadata): void {
  const canonicalUrl = getCanonicalUrl(pathname)
  const openGraphImage = getOpenGraphImage(image)

  useEffect(() => {
    document.title = title
    setMetaTag('name', 'description', description)
    setMetaTag('property', 'og:title', title)
    setMetaTag('property', 'og:description', description)
    setMetaTag('property', 'og:image', openGraphImage)
    setCanonicalLink(canonicalUrl)
  }, [canonicalUrl, description, openGraphImage, title])
}

export const homeMetadata: RouteMetadata = {
  title: `${siteName} | Made to connect`,
  description:
    siteCopy.metadata.home,
  pathname: '/',
}

export const shopMetadata: RouteMetadata = {
  title: `Shop the collection | ${siteName}`,
  description:
    siteCopy.metadata.shop,
  pathname: '/shop',
}

export function getProductMetadata({
  description,
  featuredImageUrl,
  handle,
  title,
}: {
  description?: string | null
  featuredImageUrl?: string | null
  handle?: string | null
  title?: string | null
}): RouteMetadata {
  const normalizedTitle = title?.trim()
  const normalizedDescription = description?.trim()
  const normalizedHandle = handle?.trim()

  if (!normalizedTitle) {
    return {
      title: `Product details | ${siteName}`,
      description: siteCopy.metadata.productFallback,
      pathname: normalizedHandle
        ? `/products/${encodeURIComponent(normalizedHandle)}`
        : '/products',
    }
  }

  return {
    title: `${normalizedTitle} | ${siteName}`,
    description:
      normalizedDescription || siteCopy.metadata.productFallback,
    pathname: normalizedHandle
      ? `/products/${encodeURIComponent(normalizedHandle)}`
      : '/products',
    image: featuredImageUrl,
  }
}
