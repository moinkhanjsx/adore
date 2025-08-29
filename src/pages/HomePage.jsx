import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import ProductsSection from '../components/ProductsSection';
import NewsSection from '../components/NewsSection';
import ContactSection from '../components/ContactSection';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ServicesSection />
      <ProductsSection />
      <NewsSection />
      <ContactSection />
    </div>
  );
};

export default HomePage;
