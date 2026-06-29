import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingConnectButton from "@/components/FloatingConnectButton";
import HeroSection from "@/sections/HeroSection";
import WhyChooseUs from "@/sections/WhyChooseUs";
import ServicesPreview from "@/sections/ServicesPreview";
import PortfolioPreview from "@/sections/PortfolioPreview";
import ReviewsPreview from "@/sections/ReviewsPreview";
import ProcessSection from "@/sections/ProcessSection";
import CTASection from "@/sections/CTASection";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <HeroSection />
        <WhyChooseUs />
        <ServicesPreview />
        <PortfolioPreview />
        <ProcessSection />
        <ReviewsPreview />
        <CTASection />
      </main>
      <Footer />
      <FloatingConnectButton />
    </div>
  );
}
