import {
  AboutHero,
  CommunityAndCtaSections,
  ConnectionSection,
  OriginStorySection,
  PrinciplesSection,
} from '../components/about/AboutSections'
import { siteCopy } from '../content/siteCopy'
import { type RouteMetadata, useRouteMetadata } from '../lib/seo'

const aboutMetadata: RouteMetadata = {
  title: 'Our Story | Hands Heart',
  description:
    siteCopy.metadata.about,
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
