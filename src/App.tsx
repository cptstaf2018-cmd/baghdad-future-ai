import { LangProvider } from '@/hooks/useLang';
import Navbar from '@/components/Navbar';
import HeroScroll from '@/components/HeroScroll';
import AiSocialBanner from '@/components/AiSocialBanner';
import TrustedStrip from '@/components/TrustedStrip';
import About from '@/components/About';
import Services from '@/components/Services';
import Products from '@/components/Products';
import Industries from '@/components/Industries';
import WhyUs from '@/components/WhyUs';
import Portfolio from '@/components/Portfolio';
import Testimonials from '@/components/Testimonials';
import Cta from '@/components/Cta';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import WaFab from '@/components/WaFab';

export default function App() {
  return (
    <LangProvider>
      <Navbar />
      <HeroScroll />
      <AiSocialBanner />
      <TrustedStrip />
      <About />
      <Services />
      <Products />
      <Industries />
      <WhyUs />
      <Portfolio />
      <Testimonials />
      <Cta />
      <Contact />
      <Footer />
      <WaFab />
    </LangProvider>
  );
}
