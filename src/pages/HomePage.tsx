import {
  ContactPlacementSection,
  FeaturedProductsSection,
  HeroSection,
  ShopPreviewSection,
  StorySection,
} from '../components/home/HomeSections'
import { homeMetadata, useRouteMetadata } from '../lib/seo'

export function HomePage() {
  useRouteMetadata(homeMetadata)

  return (
    <>
      <HeroSection />
      <FeaturedProductsSection />
      <StorySection />
      <ShopPreviewSection />
      <ContactPlacementSection />
    </>
  )
}
