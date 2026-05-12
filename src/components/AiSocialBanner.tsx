import { useLang } from '@/hooks/useLang';

const items = [
  { en: '🎁 EXCLUSIVE OFFER — Free Full Account Analysis, Limited Spots!',           ar: '🎁 عرض حصري — تحليل كامل لحسابك مجاناً، أماكن محدودة!' },
  { en: '🔥 BREAKING: Free AI Content Strategy for the First 10 to Contact Us',      ar: '🔥 بشرى: استراتيجية محتوى مجانية بالذكاء الاصطناعي لأول 10 يتواصلون!' },
  { en: '🎯 FREE 30-Day Growth Plan — Tailored Only for Your Account',               ar: '🎯 خطة نمو مجانية لمدة 30 يوماً — مصممة لحسابك أنت تحديداً' },
  { en: '⚡ Exclusive: Free Engagement Revival Consultation — Today Only',            ar: '⚡ حصري: استشارة إحياء التفاعل مجاناً — اليوم فقط' },
  { en: '🌟 GIFT: Free Competitor Analysis Report — Know Where You Stand',           ar: '🌟 هدية: تقرير تحليل المنافسين مجاناً — اعرف موقعك بالسوق' },
  { en: '🚀 Free AI Audit: Discover Why Your Followers Stopped Engaging',            ar: '🚀 تشخيص مجاني بالذكاء الاصطناعي — اكتشف سبب توقف تفاعل متابعيك' },
  { en: '🎉 Special Offer: Free First Content Calendar for New Clients',             ar: '🎉 عرض مميز: أول تقويم محتوى مجاناً للعملاء الجدد' },
  { en: '💥 URGENT — Free Spot Available Now, Contact Us on WhatsApp!',              ar: '💥 عاجل — مقعد مجاني متاح الآن، تواصل معنا على الواتساب!' },
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
