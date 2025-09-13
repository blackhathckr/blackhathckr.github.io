import Navbar from "./Navbar";
import AnnouncementBar from "./AnnouncementBar";
import HeroSection from "./HeroSection";
import ARFeatureSection from "./ARFeatureSection";
import PromotionalBanners from "./PromotionalBanners";
import FeaturedCategories from "./FeaturedCategories";
import ProductCarousel from "./ProductCarousel";
import TestimonialsSection from "./TestimonialsSection";
import CouponSection from "./CouponSection";
import Footer from "./Footer";

const LandingPage = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <HeroSection />
      <AnnouncementBar />
      <FeaturedCategories />
      <ProductCarousel title="Best Sellers" />
      <ARFeatureSection />
      <PromotionalBanners />
      <CouponSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
