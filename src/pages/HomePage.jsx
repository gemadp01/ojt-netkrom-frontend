import Layout from "@/components/Layout";
import CallToActionSection from "@/components/Sections/HomePage/CallToActionSection";
import ContactSection from "@/components/Sections/HomePage/ContactSection";
import FeaturedProductsSection from "@/components/Sections/HomePage/FeaturedProductsSection";
import FeaturesSection from "@/components/Sections/HomePage/FeaturesSection";
import HeroSection from "@/components/Sections/HomePage/HeroSection";

const HomePage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Featured Products */}
      {/* Featured appears when products are added */}
      {/* <FeaturedProductsSection /> */}

      {/* CTA Section */}
      <CallToActionSection />

      {/* Contact Section */}
      <ContactSection />
    </Layout>
  );
};

export default HomePage;
