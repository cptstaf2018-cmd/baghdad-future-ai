import { useState, useEffect } from 'react';
import { useLang } from '@/hooks/useLang';

export default function Navbar() {
  const { t, toggle, lang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { href: '#about',      label: t('من نحن', 'About') },
    { href: '#services',   label: t('الخدمات', 'Services') },
    { href: '#products',   label: t('المنتجات', 'Products') },
    { href: '#industries', label: t('القطاعات', 'Industries') },
    { href: '#portfolio',  label: t('أعمالنا', 'Portfolio') },
    { href: '#contact',    label: t('تواصل معنا', 'Contact') },
  ];

  return (
    <nav className={`brand-navbar${scrolled ? ' scrolled' : ''}`} id="navbar">
      <div className="nav-inner">
        <a href="#" className="nav-logo">
          {t('بغداد المستقبل', 'Baghdad Future')} <span>AI</span>
        </a>
        <ul className="nav-links">
          {navItems.map(item => (
            <li key={item.href}>
              <a href={item.href} className="nav-a" onClick={() => setMenuOpen(false)}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="nav-actions">
          <a href="#contact" className="btn-contact-nav">
            {t('تواصل معنا', 'Contact Us')}
          </a>
          <button className="lang-btn" onClick={toggle} aria-label="Toggle language">
            {lang === 'ar' ? 'EN' : 'AR'}
          </button>
          <button
            className={`hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label={t('قائمة', 'Menu')}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        {navItems.map(item => (
          <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
