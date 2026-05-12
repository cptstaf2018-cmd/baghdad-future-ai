import { useLang } from '@/hooks/useLang';

const items = [
  { en: '🔥 Why are accounts your size getting 10x more engagement? Find out FREE',   ar: '🔥 لماذا حسابات بحجمك تحصل على تفاعل أضعاف تفاعلك؟ — اعرف السبب مجاناً' },
  { en: '⚡ We give you a full account report in 48 hours — no strings attached',     ar: '⚡ نعطيك تقرير كامل عن حسابك خلال 48 ساعة — بدون أي التزام منك' },
  { en: '🎯 First month: we write the content, build the strategy, FREE',             ar: '🎯 الشهر الأول: نكتب المحتوى، نبني الاستراتيجية — مجاناً معك' },
  { en: '💡 100K followers and still invisible? We fix your algorithm problem FREE',   ar: '💡 100K متابع وما تظهر؟ — نحل مشكلة الخوارزمية معك مجاناً' },
  { en: '🚀 Try us 7 days FREE — if results don\'t show, walk away, no questions',    ar: '🚀 جربنا 7 أيام مجاناً — إذا ما شفت نتيجة، وداعاً بلا أي كلام' },
  { en: '🎁 FREE: Your competitors\' full analysis — see exactly what they\'re doing', ar: '🎁 هدية: تحليل كامل للمنافسين — شوف بالضبط ليش هم يكبرون وأنت واقف' },
  { en: '⭐ Join 150+ clients who doubled their reach — start FREE today',            ar: '⭐ انضم لـ 150+ عميل ضاعفوا انتشارهم — ابدأ معنا اليوم مجاناً' },
  { en: '📩 DM us NOW and get your FREE personalized growth roadmap in 24 hours',     ar: '📩 راسلنا الآن واحصل على خارطة طريق نمو مخصصة لحسابك خلال 24 ساعة' },
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
