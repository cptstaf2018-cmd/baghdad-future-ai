import { useLang } from '@/hooks/useLang';

const socials = [
  { href: 'https://www.facebook.com/www.cptsaad', label: 'Facebook', svg: <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
  { href: 'https://www.instagram.com/baghdad_future_ai', label: 'Instagram', svg: <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg> },
  { href: 'https://www.linkedin.com/in/baghdad-future-ai-a888b335a/', label: 'LinkedIn', svg: <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 23.2 24 22.222 0h.003z"/></svg> },
  { href: 'https://www.tiktok.com/@b.f.ai', label: 'TikTok', svg: <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/></svg> },
  { href: 'https://www.youtube.com/@زيزوالشمري-م9ك', label: 'YouTube', svg: <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17"><path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg> },
];

export default function Footer() {
  const { t } = useLang();

  const serviceLinks = [
    t('تطوير المواقع والتطبيقات', 'Web & App Development'),
    t('أنظمة إدارة الأعمال', 'Business Management Systems'),
    t('الذكاء الاصطناعي والأتمتة', 'AI & Automation'),
    t('المتاجر الإلكترونية', 'E-Commerce'),
    t('أنظمة الحضور البيومترية', 'Biometric Systems'),
    t('تحليل البيانات', 'Data Analytics'),
  ];

  return (
    <footer className="dt-footer">
      <div className="footer-top">
        <div className="dt-container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-logo">{t('بغداد المستقبل', 'Baghdad Future')} <span>AI</span></div>
              <p>{t('شريكك التقني الموثوق في بناء مستقبل رقمي ذكي للمؤسسات العراقية والعربية.', 'Your trusted technology partner in building an intelligent digital future for Iraqi and Arab institutions.')}</p>
              <div className="socials">
                {socials.map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} title={s.label}>
                    {s.svg}
                  </a>
                ))}
              </div>
            </div>
            <div className="footer-col">
              <h4>{t('الخدمات', 'Services')}</h4>
              <ul>{serviceLinks.map(l => <li key={l}>{l}</li>)}</ul>
            </div>
            <div className="footer-col">
              <h4>{t('تواصل معنا', 'Contact Us')}</h4>
              <ul>
                <li>📍 {t('أربيل · بغداد، العراق', 'Erbil · Baghdad, Iraq')}</li>
                <li><a href="tel:07706688044">📱 077 066 880 44</a></li>
                <li><a href="mailto:cptstaf2018@gmail.com">✉️ cptstaf2018@gmail.com</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="dt-container">
          <div className="footer-bottom-inner">
            <div className="footer-team-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
              <span>{t('فريق بغداد المستقبل AI', 'Baghdad Future AI Team')}</span>
            </div>
            <p>{t('© 2025 شركة بغداد المستقبل AI — جميع الحقوق محفوظة', '© 2025 Baghdad Future AI Company — All Rights Reserved')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
