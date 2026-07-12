/**
 * Temporary homepage content. Replace these records with approved copy and
 * Shopify-backed featured products before launch.
 */
export type PlaceholderProduct = {
  name: string
  price: string
  color: string
  accent: string
}

export const placeholderProducts: PlaceholderProduct[] = [
  { name: 'Placeholder tee', price: '$00.00', color: 'bg-[#c9b4ec]', accent: 'bg-[#ff9ab8]' },
  { name: 'Placeholder tote', price: '$00.00', color: 'bg-[#ff9ab8]', accent: 'bg-[#ffca35]' },
  { name: 'Placeholder mug', price: '$00.00', color: 'bg-[#9fd6f5]', accent: 'bg-[#1c64d8]' },
  { name: 'Placeholder crew', price: '$00.00', color: 'bg-[#ffca35]', accent: 'bg-[#ff6b2c]' },
]

export const placeholderValues = [
  { title: 'Made with care', copy: 'Approved values copy will live here.', color: 'bg-[#ffca35]', symbol: '✦' },
  { title: 'Made mindfully', copy: 'Approved material notes will live here.', color: 'bg-[#c9b4ec]', symbol: '◌' },
  { title: 'Made to connect', copy: 'Approved community copy will live here.', color: 'bg-[#9fd6f5]', symbol: '↗' },
]
