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
