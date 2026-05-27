import { useLang } from '@/hooks/useLang';

const projects = [
  { href: 'https://alhql-aldhky.vercel.app/dashboard', img: '/images/pf-farm.png', catAr: 'نظام زراعي ذكي', catEn: 'Smart Farm System', nameAr: 'الحقل الذكي — إدارة المواشي', nameEn: 'Smart Farm — Livestock Management', descAr: 'نظام ذكاء اصطناعي متكامل لإدارة الدواجن والأغنام والأبقار — صحة الحيوان، التغذية، الإنتاج واللقاحات', descEn: 'AI-powered system for managing poultry, sheep & cattle — health monitoring, feeding, production & vaccinations' },
  { href: 'https://www.clinic-ai-pro.com/', img: '/images/pf-clinic.jpg', catAr: 'نظام طبي', catEn: 'Medical System', nameAr: 'كلينيك — إدارة العيادات', nameEn: 'Clinicplt — Clinic Management', descAr: 'نظام SaaS متكامل للعيادات والمراكز الطبية', descEn: 'Integrated SaaS system for clinics and medical centers' },
  { href: 'https://kyn-app.vercel.app/', img: '/images/pf-kyn.jpg', catAr: 'تطبيق ذكي', catEn: 'Smart App', nameAr: 'KYN App', nameEn: 'KYN App', descAr: 'منصة ذكية متكاملة بتجربة مستخدم احترافية', descEn: 'Integrated smart platform with professional UX' },
  { href: 'https://darbonna-taxi.vercel.app/', img: '/images/pf-darbonna.jpg', catAr: 'تطبيق نقل', catEn: 'Transport App', nameAr: 'Darbonna Taxi', nameEn: 'Darbonna Taxi', descAr: 'منصة حجز سيارات أجرة ذكية مع تتبع مباشر', descEn: 'Smart taxi booking platform with live tracking' },
  { href: 'https://superlative-cheesecake-4963e9.netlify.app/', img: '/images/pf-salon.jpg', catAr: 'موقع تجاري', catEn: 'Business Website', nameAr: 'صالون كلاس تكريت', nameEn: 'Salon Class Tikrit', descAr: 'موقع صالون تجميل فاخر مع نظام حجوزات', descEn: 'Luxury beauty salon website with booking system' },
  { href: 'https://zesty-licorice-3717d7.netlify.app/', img: '/images/pf-tikmart.jpg', catAr: 'متجر إلكتروني', catEn: 'E-Commerce', nameAr: 'متجر إلكتروني احترافي', nameEn: 'Professional Online Store', descAr: 'منصة تسوق متكاملة مع إدارة منتجات وسلة شراء', descEn: 'Integrated shopping platform with product management and cart' },
  { href: 'https://karmaclub-sandy.vercel.app/', img: '/images/pf-karma.jpg', catAr: 'موقع نادي رياضي', catEn: 'Sports Club Website', nameAr: 'نادي الكرمة الرياضي', nameEn: 'Al-Karma Sport Club', descAr: 'موقع احترافي لنادي كرة قدم عراقي في دوري النجوم — تأسس 1974', descEn: 'Professional website for an Iraqi football club in the Stars League — founded 1974' },
  { href: 'https://glowing-rugelach-33ae09.netlify.app/', img: '/images/pf-erbil.jpg', catAr: 'موقع نادي رياضي', catEn: 'Sports Club Website', nameAr: 'نادي أربيل الرياضي', nameEn: 'Erbil Sport Club', descAr: 'موقع نادي أربيل الرياضي — من أبرز أندية كرة القدم العراقية، تأسس 1968', descEn: 'Erbil Sport Club — one of Iraq\'s most celebrated football clubs, founded 1968' },
  { href: 'https://gregarious-dodol-f11d3f.netlify.app/', img: '/images/pf-onetouch.jpg', catAr: 'موقع شركة هندسية', catEn: 'Engineering Firm Website', nameAr: 'ون تاتش للهندسة والإنشاء', nameEn: 'OneTouch Engineering', descAr: 'مكتب هندسي عراقي متخصص في التصميم والإنشاء — أكثر من 500 مشروع منذ 2003', descEn: 'Iraqi engineering office in design & construction — 500+ projects since 2003' },
  { href: 'https://amazing-rabanadas-319c89.netlify.app/', img: '/images/pf-social-ai.png', catAr: '🎁 أداة مجانية', catEn: '🎁 Free AI Tool', nameAr: 'مولّد محتوى السوشل ميديا بالذكاء الاصطناعي', nameEn: 'AI Social Media Content Generator', descAr: 'هدية من شركتنا — أداة ذكاء اصطناعي تولّد كابشن وهاشتاق لمنشوراتك بثوانٍ. جربها الآن مجاناً', descEn: 'Our gift to you — AI tool that generates captions & hashtags for your posts in seconds. Try it FREE', isFree: true },
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

        {/* Free tool highlight */}
        <a href="https://amazing-rabanadas-319c89.netlify.app/" target="_blank" rel="noreferrer" className="pf-free-banner">
          <div className="pf-free-banner-inner">
            <div className="pf-free-left">
              <span className="pf-free-tag">🎁 {t('هدية مجانية لك', 'Free Gift for You')}</span>
              <h3>{t('جرّب ذكاءنا الاصطناعي مجاناً — الآن', 'Try Our AI for FREE — Right Now')}</h3>
              <p>{t('أداة تولّد كابشن وهاشتاق احترافية لمنشوراتك على إنستغرام وتيك توك وفيسبوك — بثوانٍ، بدون أي تسجيل', 'Generates professional captions & hashtags for Instagram, TikTok & Facebook — in seconds, no sign-up needed')}</p>
              <span className="pf-free-cta">{t('افتح الأداة ← مجاناً', 'Open the Tool ← FREE')}</span>
            </div>
            <div className="pf-free-right">
              <div className="pf-free-feature">📸 {t('صوّر المنتج وانشر', 'Photo to Post')}</div>
              <div className="pf-free-feature">🤖 {t('كابشن بالذكاء الاصطناعي', 'AI Captions')}</div>
              <div className="pf-free-feature">📅 {t('جدول النشر الأسبوعي', 'Weekly Schedule')}</div>
              <div className="pf-free-feature">🔥 {t('هاشتاق العراق والخليج', 'Iraq & Gulf Hashtags')}</div>
            </div>
          </div>
        </a>

      </div>
      <div className="pf-scroll-wrap">
        <div className="pf-scroll-track">
          {doubled.map((p, i) => (
            <a key={i} href={p.href} target="_blank" rel="noreferrer" className={`pf-item${(p as any).isFree ? ' pf-item-free' : ''}`}>
              <div className="pf-img">
                <img src={p.img} alt={t(p.nameAr, p.nameEn)} loading="lazy" />
              </div>
              <div className="pf-body">
                <span className="pf-cat">{t(p.catAr, p.catEn)}</span>
                <strong>{t(p.nameAr, p.nameEn)}</strong>
                <p>{t(p.descAr, p.descEn)}</p>
                {(p as any).isFree
                  ? <span className="pf-badge-free">🎁 {t('هدية مجانية — جرّبها', 'Free Gift — Try It')}</span>
                  : <span className="pf-badge-live">✅ {t('عميل حقيقي', 'Real Client')}</span>
                }
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
