/**
 * The editable visual palette for Hands Heart.
 *
 * Update a value here to change every UI surface that uses its matching CSS
 * variable. Keep the token names stable so component styles stay readable.
 */
const colors = [
  '#10151b',
  '#26303a',
  '#34383d',
  '#51545a',
  '#59616a',
  '#59555a',
  '#fff9ed',
  '#fff1d8',
  '#f4ead8',
  '#fff6ed',
  '#1c64d8',
  '#2d78ed',
  '#dce9ff',
  '#9fd6f5',
  '#dff3ff',
  '#eef5ff',
  '#f4fbff',
  '#f9a3bd',
  '#ff9ab8',
  '#ffb9cb',
  '#ffdce7',
  '#f3d6df',
  '#ff6391',
  '#ff6b2c',
  '#ffe0ce',
  '#ffca35',
  '#ffd866',
  '#fff0be',
  '#c9b4ec',
  '#eee5fb',
  '#9edbb0',
  '#d9f3df',
  '#8f193d',
  '#e8dfd0',
  '#ffffff',
] as const

export const siteTheme = {
  colors: {
    ink: colors[0],
    inkSoft: colors[1],
    inkMuted: colors[2],
    inkSubtle: colors[3],
    muted: colors[4],
    mutedDisabled: colors[5],
    cream: colors[6],
    creamWarm: colors[7],
    creamDark: colors[8],
    creamSoft: colors[9],
    blue: colors[10],
    blueLight: colors[11],
    bluePale: colors[12],
    sky: colors[13],
    skyPale: colors[14],
    skySoft: colors[15],
    skyLight: colors[16],
    pink: colors[17],
    pinkBright: colors[18],
    pinkLight: colors[19],
    pinkPale: colors[20],
    pinkMuted: colors[21],
    pinkAccent: colors[22],
    orange: colors[23],
    orangePale: colors[24],
    yellow: colors[25],
    yellowLight: colors[26],
    yellowPale: colors[27],
    lavender: colors[28],
    lavenderPale: colors[29],
    green: colors[30],
    greenPale: colors[31],
    error: colors[32],
    footerText: colors[33],
    white: colors[34],
  },
} as const

export type SiteThemeColor = keyof typeof siteTheme.colors

/** Applies the theme to CSS custom properties used by Tailwind and CSS styles. */
export function applySiteTheme(theme = siteTheme) {
  const style = document.documentElement.style

  for (const [name, value] of Object.entries(theme.colors)) {
    style.setProperty(`--color-${toKebabCase(name)}`, value)
  }
}

function toKebabCase(value: string) {
  return value.replace(/[A-Z]/g, (character) => `-${character.toLowerCase()}`)
}
