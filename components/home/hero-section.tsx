import { HeroCarousel } from "./hero-carousel";
import { getBanners } from "@/services/banners/banner.service";

export default async function HeroSection() {
  // Fetch banners from Sanity CMS
  const banners = await getBanners();

  return (
    <div className="relative w-full overflow-hidden bg-white">
      {/* Carousel Component */}
      <HeroCarousel banners={banners} />
    </div>
  );
}
