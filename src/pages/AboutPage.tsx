import {
  AboutHero,
  CommunityAndCtaSections,
  ConnectionSection,
  OriginStorySection,
  PrinciplesSection,
} from '../components/about/AboutSections'
import { type RouteMetadata, useRouteMetadata } from '../lib/seo'

const aboutMetadata: RouteMetadata = {
  title: 'Our Story | Hands Heart',
  description:
    'Learn about the Hands Heart story, values, and the simple gesture that brings people together.',
  pathname: '/about',
}

export function AboutPage() {
  useRouteMetadata(aboutMetadata)

  return (
    <>
      <AboutHero />
      <OriginStorySection />
      <PrinciplesSection />
      <ConnectionSection />
      <CommunityAndCtaSections />
    </>
  )
}
