import { useLang } from '@/hooks/useLang';

const items = [
  { en: '🤖 AI-Powered Social Media Growth',        ar: '🤖 نمو السوشل ميديا بالذكاء الاصطناعي' },
  { en: '📊 Smart Account Analysis',                ar: '📊 تحليل ذكي للحسابات' },
  { en: '⚡ Boost Engagement with AI',              ar: '⚡ رفع التفاعل بالذكاء الاصطناعي' },
  { en: '🎯 Targeted Content Automation',           ar: '🎯 أتمتة المحتوى المستهدف' },
  { en: '📈 Data-Driven Growth Strategy',           ar: '📈 استراتيجية نمو مدعومة بالبيانات' },
  { en: '🌍 Meta · TikTok · LinkedIn · YouTube',   ar: '🌍 ميتا · تيك توك · لينكد إن · يوتيوب' },
  { en: '✨ AI Content Creation & Scheduling',      ar: '✨ إنشاء المحتوى وجدولته بالذكاء الاصطناعي' },
  { en: '🔥 Real Results — Real Clients',           ar: '🔥 نتائج حقيقية — عملاء حقيقيون' },
];

export default function AiSocialBanner() {
  const { lang } = useLang();
  const doubled = [...items, ...items];

  return (
    <div className="ai-social-banner">
      <div className="asb-label">
        <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
        </svg>
        AI
      </div>
      <div className="asb-track-wrap">
        <div className="asb-track">
          {doubled.map((item, i) => (
            <span key={i} className="asb-item">
              {lang === 'ar' ? item.ar : item.en}
              <span className="asb-sep">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
