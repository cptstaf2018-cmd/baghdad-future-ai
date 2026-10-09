import { useMemo, useRef, useState } from 'react';
import { useLang } from '@/hooks/useLang';
import { useInk } from './useInk';

const PHRASES_AR = [
  ['نبني ذكاءً', 'يفهم لهجتك'],
  ['وكيل يرد', 'على زبائنك'],
  ['مسار يدير', 'مدرستك'],
  ['كير كار يتذكّر', 'سيارتك'],
  ['من بغداد', 'إلى العالم'],
];
const PHRASES_EN = [
  ['We build AI', 'that gets you'],
  ['Wakeel answers', 'your customers'],
  ['Masar runs', 'your school'],
  ['CareCar remembers', 'every car'],
  ['From Baghdad', 'to the world'],
];

export default function Hero() {
  const { t, lang } = useLang();
  const canvas = useRef<HTMLCanvasElement>(null);
  const [index, setIndex] = useState(0);
  const rtl = lang === 'ar';
  const phrases = useMemo(() => (rtl ? PHRASES_AR : PHRASES_EN), [rtl]);
  useInk(canvas, phrases, rtl, index, setIndex);

  return (
    <section className="hf-hero" aria-labelledby="hf-title">
      <h1 className="hf-sr" id="hf-title">{t('بغداد المستقبل: نبني ذكاءً اصطناعياً يفهم لهجتك', 'Baghdad Future AI: we build AI that understands you')}</h1>
      <canvas ref={canvas} className="hf-ink" aria-hidden="true" />
      <div className="hf-hero-foot">
        <div className="hf-wrap">
          <div>
            <p>{t(
              'شركة برمجيات من بغداد تبني منصات وأنظمة ذكاء اصطناعي تعمل كل يوم في مطاعم ومدارس وعيادات ومراكز سيارات ومزارع العراق.',
              'A Baghdad software company building platforms and AI systems that run every day in Iraqi restaurants, schools, clinics, car centers and farms.'
            )}</p>
            <div className="hf-dots">
              {phrases.map((p, i) => (
                <button key={p.join(' ')} type="button" aria-label={p.join(' ')} aria-current={i === index} onClick={() => setIndex(i)} />
              ))}
            </div>
          </div>
          <div className="hf-hero-acts">
            <a className="hf-btn hf-btn-ink" href="#contact">{t('ابدأ مشروعك', 'Start your project')}</a>
            <a className="hf-btn hf-btn-out" href="#work">{t('شاهد أعمالنا', 'See our work')}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
