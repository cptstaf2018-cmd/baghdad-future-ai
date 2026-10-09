import './site.css';
import Header from './Header';
import Hero from './Hero';
import About from './About';
import Work from './Work';
import { Academy, Contact, Footer, Services, Statement, WhatsAppFab } from './Sections';

export default function Site() {
  return (
    <div className="hf">
      <Header />
      <main id="top">
        <Hero />
        <Statement />
        <About />
        <Work />
        <Services />
        <Academy />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
