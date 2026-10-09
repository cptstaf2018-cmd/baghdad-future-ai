import { useEffect, useState } from 'react';
import { useLang } from '@/hooks/useLang';
import { LogoMark } from './icons';

export default function Header() {
  const { t, toggle, lang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#about', label: t('من نحن', 'About') },
    { href: '#work', label: t('أعمالنا', 'Work') },
    { href: '#services', label: t('الخدمات', 'Services') },
    { href: '#academy', label: t('الأكاديمية', 'Academy') },
    { href: '#contact', label: t('تواصل', 'Contact') },
  ];

  return (
    <header className={`hf-header${scrolled || open ? ' is-scrolled' : ''}`}>
      <div className="hf-wrap hf-bar">
        <a className="hf-logo" href="#top" aria-label={t('بغداد المستقبل', 'Baghdad Future')}>
          <LogoMark />
          {t('بغداد المستقبل', 'Baghdad Future AI')}
        </a>
        <nav className="hf-menu" aria-label={t('الأقسام', 'Sections')}>
          {links.map(l => <a key={l.href} href={l.href}>{l.label}</a>)}
        </nav>
        <div className="hf-actions">
          <button className="hf-lang" type="button" onClick={toggle} aria-label={t('English', 'العربية')}>
            {lang === 'ar' ? 'EN' : 'ع'}
          </button>
          <a className="hf-btn hf-btn-ink hf-talk" href="#contact">{t('تحدّث معنا', 'Talk to us')}</a>
          <button className="hf-burger" type="button" aria-expanded={open} aria-controls="hf-drawer" aria-label={t('القائمة', 'Menu')} onClick={() => setOpen(v => !v)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
            </svg>
          </button>
        </div>
      </div>
      <nav id="hf-drawer" className={`hf-drawer${open ? ' is-open' : ''}`} aria-label={t('القائمة', 'Menu')}>
        {links.map(l => <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>)}
      </nav>
    </header>
  );
}
