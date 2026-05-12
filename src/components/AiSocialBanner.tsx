import { useLang } from '@/hooks/useLang';

const items = [
  { en: '🔥 100K+ Followers? Engagement Dropped? We Fix That with AI',   ar: '🔥 حسابك فوق 100K مشترك؟ التفاعل توقف أو ضعف؟ نحلها بالذكاء الاصطناعي' },
  { en: '📊 Deep Account Analysis — Find Why Engagement Stopped',        ar: '📊 تحليل عميق لحسابك — نكشف سبب توقف التفاعل' },
  { en: '⚡ Revive Your Reach in 30 Days — Guaranteed Strategy',         ar: '⚡ نعيد انتشارك خلال 30 يوماً — استراتيجية مضمونة' },
  { en: '🎯 Tailored AI Content for Accounts Above 100K',                ar: '🎯 محتوى ذكي مصمم لحسابات فوق 100 ألف متابع' },
  { en: '📈 Turn Dead Followers into Active Engagement Again',            ar: '📈 حوّل متابعيك الصامتين إلى تفاعل حقيقي مجدداً' },
  { en: '🌍 Instagram · TikTok · YouTube · Snapchat · X',                ar: '🌍 انستغرام · تيك توك · يوتيوب · سناب · إكس' },
  { en: '✨ AI-Powered Posting Schedule Optimized for Your Audience',     ar: '✨ جدول نشر بالذكاء الاصطناعي مُحسَّن لجمهورك تحديداً' },
  { en: '🚀 Free Consultation for Struggling Accounts — Contact Now',     ar: '🚀 استشارة مجانية لأصحاب الحسابات المتوقفة — تواصل الآن' },
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
