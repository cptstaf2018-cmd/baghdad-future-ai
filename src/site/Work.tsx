import { useEffect, useRef, useState } from 'react';
import { defaultProjects, type Project } from '@/data/projects';
import { useLang } from '@/hooks/useLang';

const PEEK_OFFSET = 230;
const FOLLOW_EASE = .14;

// Product/work index: big names; on desktop a screenshot floats after the cursor.
export default function Work() {
  const { t, lang } = useLang();
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [peekSrc, setPeekSrc] = useState('');
  const [peekOn, setPeekOn] = useState(false);
  const peek = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/projects')
      .then(r => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((data: { projects?: Project[] }) => {
        if (Array.isArray(data.projects) && data.projects.length > 0) setProjects(data.projects);
      })
      .catch(() => setProjects(defaultProjects));
  }, []);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover)').matches) return;
    const pos = { x: 0, y: 0, tx: 0, ty: 0 };
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      pos.tx = e.clientX + (document.documentElement.dir === 'rtl' ? -PEEK_OFFSET : PEEK_OFFSET);
      pos.ty = e.clientY;
    };
    const follow = () => {
      pos.x += (pos.tx - pos.x) * FOLLOW_EASE; pos.y += (pos.ty - pos.y) * FOLLOW_EASE;
      if (peek.current) { peek.current.style.left = `${pos.x}px`; peek.current.style.top = `${pos.y}px`; }
      raf = requestAnimationFrame(follow);
    };
    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(follow);
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
  }, []);

  const visible = projects.filter(p => !p.hidden);

  return (
    <section className="hf-sec" id="work">
      <div className="hf-wrap">
        <div className="hf-head">
          <h2>{t('أعمالنا ومنتجاتنا', 'Our work & products')}</h2>
          <span>{lang === 'ar' ? `${visible.length} مشروعاً` : `${visible.length} projects`}</span>
        </div>
        <div className="hf-work-list">
          {visible.map(p => (
            <a
              key={p.href}
              className="hf-prod"
              href={p.href}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => { setPeekSrc(p.img); setPeekOn(true); }}
              onMouseLeave={() => setPeekOn(false)}
            >
              <h3>{t(p.nameAr, p.nameEn).split(' — ')[0]}</h3>
              <p>{t(p.descAr, p.descEn)}</p>
              <span className="hf-sector">{t(p.catAr, p.catEn)}</span>
              <span className="hf-thumb"><img src={p.img} alt={t(p.nameAr, p.nameEn)} loading="lazy" /></span>
            </a>
          ))}
        </div>
      </div>
      <div ref={peek} className={`hf-peek${peekOn ? ' is-on' : ''}`} aria-hidden="true">
        {peekSrc && <img src={peekSrc} alt="" />}
      </div>
    </section>
  );
}
