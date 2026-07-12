import { collectionPreviewCards, homeValues } from '../../content/siteCopy'

/**
 * Draft visual preview content. These are not Shopify product records and
 * require final client approval before launch.
 */
export type CollectionPreviewCard = {
  name: string
  price: string
  color: string
  accent: string
}

export const collectionPreviews: CollectionPreviewCard[] = collectionPreviewCards.map(
  (card) => ({ ...card }),
)

export const homepageValues = homeValues.map((value) => ({ ...value }))
