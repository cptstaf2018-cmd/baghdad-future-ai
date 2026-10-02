import { useEffect, useState } from 'react';
import { defaultProjects, type Project } from '@/data/projects';
import { useLang } from '@/hooks/useLang';

export default function Portfolio() {
  const { t } = useLang();
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const visibleProjects = projects.filter((project) => !project.hidden);
  const doubled = [...visibleProjects, ...visibleProjects];

  useEffect(() => {
    fetch('/api/projects')
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((data: { projects?: Project[] }) => {
        if (Array.isArray(data.projects) && data.projects.length > 0) {
          setProjects(data.projects);
        }
      })
      .catch(() => {
        setProjects(defaultProjects);
      });
  }, []);

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
