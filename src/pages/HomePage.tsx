import {
  ContactPlacementSection,
  FeaturedProductsSection,
  HeroSection,
  ShopPreviewSection,
  StorySection,
} from '../components/home/HomeSections'

export function HomePage() {
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
