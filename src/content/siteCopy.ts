/**
 * Draft visitor-facing copy for Hands Heart.
 *
 * This language is a cohesive working draft only. It must receive final client
 * approval before production launch; Shopify remains the source of truth for
 * product names, descriptions, prices, variants, and availability.
 */
export const siteCopy = {
  home: {
    heroEyebrow: 'A simple gesture',
    heroDescription:
      'Hands Heart is a small reminder that care can be shared, shown, and carried forward.',
    collectionEyebrow: 'The collection',
    collectionDescription:
      'A first look at the ideas taking shape around one unmistakable symbol.',
    collectionCta: 'Explore the collection',
    storyEyebrow: 'Together, by design',
    storyDescription:
      'Two hands make a heart. It is a familiar sign with room for your own meaning: a hello, a thank you, a little love.',
    shopEyebrow: 'Made for the moment',
    shopDescription:
      'Find the pieces that feel like you, then make the gesture your own.',
  },
  about: {
    heroEyebrow: 'Our story',
    heroDescription:
      'Hands Heart begins with a shape we all recognize: two hands, one heart, and a simple way to show up for each other.',
    originEyebrow: 'The starting point',
    originTitle: 'It starts with a gesture.',
    originDescription:
      'A heart made with your hands can say a lot without needing a long explanation. Hands Heart holds onto that feeling and makes space for it in the everyday.',
    originGraphicLabel: 'A symbol to share',
    connectionGraphicLabel: 'A little more together',
    connectionEyebrow: 'The feeling behind it',
    connectionDescription:
      'The best objects do more than fill a space. They mark a moment, start a conversation, or help you send a little care out into the world.',
    communityEyebrow: 'More room for connection',
    communityTitle: 'Keep the gesture going.',
    communityDescription:
      'Hands Heart is here for the small, sincere ways people reach for one another—on ordinary days and the ones worth remembering.',
    invitationEyebrow: 'Make it your own',
    invitationDescription:
      'Wear it, share it, or pass it along. However you find it, there is always room for one more good gesture.',
  },
  shop: {
    heroDescription:
      'Thoughtful objects for everyday connection—made to be noticed, shared, and made your own.',
    setupTitle: 'The collection is taking shape.',
    setupDescription:
      'We are getting the first Hands Heart pieces ready to meet you. Please check back soon.',
    emptyTitle: 'New pieces are on their way.',
    emptyDescription:
      'There are no pieces to show just yet. Come back soon to see what is next.',
    loadErrorDescription:
      'We could not load the latest pieces right now. Please try again in a moment.',
    loadMoreErrorTitle: 'More pieces need another try.',
    loadMoreErrorDescription:
      'The next pieces could not load just now. Your current collection is still here.',
    loadingMoreTitle: 'Loading more',
    loadingMoreDescription: 'Bringing in a few more pieces.',
    loadMoreLabel: 'Load more',
    catalogCompleteMessage: 'That is the whole collection for now.',
    unavailableImage: 'Product image unavailable',
  },
  product: {
    setupEyebrow: 'Coming to the collection',
    setupTitle: 'This piece is getting ready.',
    setupDescription:
      'Its details will be here soon. In the meantime, take a look around the collection.',
    noDescription:
      'The story behind this piece is still being written. Check back soon for the details.',
  },
  cart: {
    heading: 'Keep the connection close.',
    heroDescription:
      'Your chosen pieces are gathered here. Final order details are confirmed when you continue to checkout.',
    setupTitle: 'Your bag will be ready soon.',
    setupDescription:
      'The collection is still getting ready. Come back when there is a piece to make your own.',
    checkoutNote: 'Your final order details are confirmed at checkout.',
  },
  contact: {
    eyebrow: 'Let’s connect',
    intro:
      'Have a question, an idea, or a note to share? Send it our way—we would love to hear from you.',
    sideTitle: 'Every message matters',
    sideDescription:
      'A thoughtful note can start something good. Tell us what is on your mind.',
  },
  footer: {
    status: 'A small gesture for everyday connection.',
    legal: 'More Hands Heart details will live here soon.',
  },
  metadata: {
    home:
      'Hands Heart is a playful lifestyle brand built around a simple gesture of care, connection, and sharing.',
    about:
      'Discover the idea behind Hands Heart: a simple hand-made heart and a little more connection in the everyday.',
    shop:
      'Explore the Hands Heart collection of expressive everyday pieces made for sharing, keeping, and connecting.',
    productFallback:
      'Discover a Hands Heart piece made to carry a little more connection into the everyday.',
  },
} as const

/** These cards are visual collection previews, not Shopify product records. */
export const collectionPreviewCards = [
  {
    name: 'A little reminder',
    price: 'Coming to the collection',
    color: 'bg-[var(--color-lavender)]',
    accent: 'bg-[var(--color-pink-bright)]',
  },
  {
    name: 'Something to share',
    price: 'Coming to the collection',
    color: 'bg-[var(--color-pink-bright)]',
    accent: 'bg-[var(--color-yellow)]',
  },
  {
    name: 'Made for the everyday',
    price: 'Coming to the collection',
    color: 'bg-[var(--color-sky)]',
    accent: 'bg-[var(--color-blue)]',
  },
  {
    name: 'A heart to carry',
    price: 'Coming to the collection',
    color: 'bg-[var(--color-yellow)]',
    accent: 'bg-[var(--color-orange)]',
  },
] as const

export const homeValues = [
  {
    title: 'Keep it simple',
    copy: 'One small symbol can leave room for a whole lot of feeling.',
    color: 'bg-[var(--color-yellow)]',
    symbol: '✦',
  },
  {
    title: 'Make it yours',
    copy: 'Bring your own story to the gesture, wherever the day takes you.',
    color: 'bg-[var(--color-lavender)]',
    symbol: '◌',
  },
  {
    title: 'Pass it on',
    copy: 'A little care has a way of traveling farther when it is shared.',
    color: 'bg-[var(--color-sky)]',
    symbol: '↗',
  },
] as const

export const aboutValues = [
  {
    title: 'Meaningful by design',
    copy: 'The heart-hands gesture keeps the feeling clear, open, and easy to share.',
    color: 'bg-[var(--color-lavender)]',
    symbol: '✦',
  },
  {
    title: 'Made for real life',
    copy: 'Small reminders belong in the everyday moments that bring us back to each other.',
    color: 'bg-[var(--color-sky)]',
    symbol: '◌',
  },
  {
    title: 'Better together',
    copy: 'A good gesture grows when it is given, received, and passed along.',
    color: 'bg-[var(--color-pink-bright)]',
    symbol: '♥',
  },
] as const

export const aboutDetailPoints = [
  'A familiar sign with room for your own meaning.',
  'Everyday pieces for moments worth holding onto.',
  'A simple way to say: I am thinking of you.',
] as const
