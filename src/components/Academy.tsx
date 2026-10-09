import { useEffect, useRef } from 'react';
import { useLang } from '@/hooks/useLang';

const ACADEMY_URL = 'https://baghdad-future-ai-academy.vercel.app';

const lectures = [
  { ar: 'مقدمة في الذكاء الاصطناعي واستخدام ChatGPT', en: 'Intro to AI and using ChatGPT' },
  { ar: 'هندسة الأوامر (Prompts)', en: 'Prompt engineering' },
  { ar: 'صناعة الصور والفيديو بالذكاء الاصطناعي', en: 'Creating images and video with AI' },
  { ar: 'بناء موقع بمساعدة الذكاء الاصطناعي', en: 'Building a website with AI' },
  { ar: 'بناء مساعد ذكي بسيط', en: 'Building a simple AI assistant' },
  { ar: 'مشروع تطبيقي ختامي ومناقشة المشاريع', en: 'Final hands-on project and review' },
];

export default function Academy() {
  const { t, lang } = useLang();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="dt-section academy-section" id="academy">
      <div className="dt-container">
        <div className="dt-section-head">
          <span className="dt-badge">{t('الأكاديمية', 'Academy')}</span>
          <h2 className="dt-section-title">{t('أكاديمية بغداد المستقبل للذكاء الاصطناعي', 'Baghdad Future AI Academy')}</h2>
          <p className="dt-section-sub">{t('نعلّم الجيل القادم استخدام الذكاء الاصطناعي — دورة مجانية لشباب العراق', 'Teaching the next generation to use AI — a free course for Iraqi youth')}</p>
        </div>

        <div className="academy-card reveal" ref={ref}>
          <a href={ACADEMY_URL} target="_blank" rel="noreferrer" className="academy-shot">
            <img src="/images/academy.png" alt={t('أكاديمية بغداد المستقبل للذكاء الاصطناعي', 'Baghdad Future AI Academy')} width={930} height={870} loading="lazy" />
          </a>
          <div className="academy-body">
            <span className="academy-free">{t('مجانية 100%', '100% Free')}</span>
            <h3>{t('تعلّم الذكاء الاصطناعي من الصفر إلى الاحتراف', 'Learn AI from Zero to Pro')}</h3>
            <p>{t('6 محاضرات عملية مباشرة عبر Google Meet، بدون أي خبرة برمجية، والدفعة الأولى 50 مقعداً.', '6 live practical lectures on Google Meet, no coding experience needed. First cohort: 50 seats.')}</p>
            <ol className="academy-lectures">
              {lectures.map(l => <li key={l.en}>{lang === 'ar' ? l.ar : l.en}</li>)}
            </ol>
            <a href={ACADEMY_URL} target="_blank" rel="noreferrer" className="academy-cta">{t('سجّل الآن مجاناً', 'Register Free Now')}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
