import { useLang } from '@/hooks/useLang';

const projects = [
  { href: 'https://clinicplt.vercel.app/login', img: '/images/pf-clinic.jpg', catAr: 'نظام طبي', catEn: 'Medical System', nameAr: 'كلينيك — إدارة العيادات', nameEn: 'Clinicplt — Clinic Management', descAr: 'نظام SaaS متكامل للعيادات والمراكز الطبية', descEn: 'Integrated SaaS system for clinics and medical centers' },
  { href: 'https://kyn-app.vercel.app/', img: '/images/pf-kyn.jpg', catAr: 'تطبيق ذكي', catEn: 'Smart App', nameAr: 'KYN App', nameEn: 'KYN App', descAr: 'منصة ذكية متكاملة بتجربة مستخدم احترافية', descEn: 'Integrated smart platform with professional UX' },
  { href: 'https://darbonna-taxi.vercel.app/', img: '/images/pf-darbonna.jpg', catAr: 'تطبيق نقل', catEn: 'Transport App', nameAr: 'Darbonna Taxi', nameEn: 'Darbonna Taxi', descAr: 'منصة حجز سيارات أجرة ذكية مع تتبع مباشر', descEn: 'Smart taxi booking platform with live tracking' },
  { href: 'https://superlative-cheesecake-4963e9.netlify.app/', img: '/images/pf-salon.jpg', catAr: 'موقع تجاري', catEn: 'Business Website', nameAr: 'صالون كلاس تكريت', nameEn: 'Salon Class Tikrit', descAr: 'موقع صالون تجميل فاخر مع نظام حجوزات', descEn: 'Luxury beauty salon website with booking system' },
  { href: 'https://zesty-licorice-3717d7.netlify.app/', img: '/images/pf-tikmart.jpg', catAr: 'متجر إلكتروني', catEn: 'E-Commerce', nameAr: 'متجر إلكتروني احترافي', nameEn: 'Professional Online Store', descAr: 'منصة تسوق متكاملة مع إدارة منتجات وسلة شراء', descEn: 'Integrated shopping platform with product management and cart' },
  { href: 'https://karmaclub-sandy.vercel.app/', img: '/images/pf-karma.jpg', catAr: 'موقع نادي رياضي', catEn: 'Sports Club Website', nameAr: 'نادي الكرمة الرياضي', nameEn: 'Al-Karma Sport Club', descAr: 'موقع احترافي لنادي كرة قدم عراقي في دوري النجوم — تأسس 1974', descEn: 'Professional website for an Iraqi football club in the Stars League — founded 1974' },
  { href: 'https://glowing-rugelach-33ae09.netlify.app/', img: '/images/pf-erbil.jpg', catAr: 'موقع نادي رياضي', catEn: 'Sports Club Website', nameAr: 'نادي أربيل الرياضي', nameEn: 'Erbil Sport Club', descAr: 'موقع نادي أربيل الرياضي — من أبرز أندية كرة القدم العراقية، تأسس 1968', descEn: 'Erbil Sport Club — one of Iraq\'s most celebrated football clubs, founded 1968' },
];

export default function Portfolio() {
  const { t } = useLang();
  const doubled = [...projects, ...projects];

  return (
    <section className="dt-section alt portfolio-section" id="portfolio">
      <div className="dt-container">
        <div className="dt-section-head">
          <span className="dt-badge">{t('أعمالنا', 'Our Work')}</span>
          <h2 className="dt-section-title">{t('مشاريع حقيقية لعملاء حقيقيين', 'Real Projects for Real Clients')}</h2>
          <p className="dt-section-sub">{t('نماذج من مشاريعنا المنجزة في العراق والمنطقة', 'Selected projects delivered across Iraq and the region')}</p>
        </div>
      </div>
      <div className="pf-scroll-wrap">
        <div className="pf-scroll-track">
          {doubled.map((p, i) => (
            <a key={i} href={p.href} target="_blank" rel="noreferrer" className="pf-item">
              <div className="pf-img">
                <img src={p.img} alt={t(p.nameAr, p.nameEn)} loading="lazy" />
              </div>
              <div className="pf-body">
                <span className="pf-cat">{t(p.catAr, p.catEn)}</span>
                <strong>{t(p.nameAr, p.nameEn)}</strong>
                <p>{t(p.descAr, p.descEn)}</p>
                <span className="pf-badge-live">✅ {t('عميل حقيقي', 'Real Client')}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
