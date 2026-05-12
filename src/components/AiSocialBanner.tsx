import { useLang } from '@/hooks/useLang';

const items = [
  { en: '🔥 OFFER: Full Account Revival Package — First Month 50% OFF',         ar: '🔥 عرض خاص: باقة إحياء الحساب الكاملة — الشهر الأول بخصم 50%' },
  { en: '🎁 FREE Account Audit Worth $200 — Limited Time Only',                 ar: '🎁 تحليل مجاني لحسابك بقيمة 200$ — لفترة محدودة فقط' },
  { en: '⚡ 100K+ Followers But Zero Engagement? We Revive in 30 Days',         ar: '⚡ فوق 100K متابع لكن تفاعل صفر؟ نعيده خلال 30 يوماً' },
  { en: '📦 Social Media Bundle: Content + Ads + Analytics — One Price',        ar: '📦 باقة السوشل ميديا: محتوى + إعلانات + تحليلات — بسعر واحد' },
  { en: '🤝 Trusted by 150+ Clients in Iraq · Gulf · Europe',                   ar: '🤝 ثقة أكثر من 150 عميل في العراق والخليج وأوروبا' },
  { en: '📈 Guaranteed Results or Your Money Back — No Risk',                   ar: '📈 نتائج مضمونة أو نرد لك المبلغ — بدون مخاطرة' },
  { en: '🎯 AI Strategy for Instagram · TikTok · YouTube · Snapchat · X',       ar: '🎯 استراتيجية ذكاء اصطناعي لإنستغرام · تيك توك · يوتيوب · سناب · إكس' },
  { en: '🚀 Book FREE Consultation NOW — WhatsApp Available 24/7',               ar: '🚀 احجز استشارتك المجانية الآن — واتساب متاح 24/7' },
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
