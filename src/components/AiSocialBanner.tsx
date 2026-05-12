import { useLang } from '@/hooks/useLang';

const items = [
  { en: '😔 Posting every day but views keep dropping? You\'re not alone — we know exactly why',        ar: '😔 تنشر كل يوم والمشاهدات تنزل؟ — مو أنت المشكلة، الخوارزمية تجاهلتك ونحن نعرف السبب' },
  { en: '😤 You have 100K+ followers but your reels reach only 500 people?! That\'s not normal',       ar: '😤 عندك 100K متابع والريلز توصل لـ 500 شخص فقط؟! — هذا مو طبيعي وله حل' },
  { en: '😟 You used to get thousands of likes — now nothing. The algorithm buried your account',      ar: '😟 كنت تحصل على آلاف اللايكات والآن لا شيء — الخوارزمية دفنت حسابك ونحن نطلعه' },
  { en: '🤦 Your content is good but nobody sees it — your account is shadowbanned without knowing',   ar: '🤦 محتواك ممتاز بس ما أحد يشوفه — حسابك مسكوت عليه ومو داري' },
  { en: '😩 Competitors with fewer followers are beating you — you\'re doing something wrong',         ar: '😩 منافسون أقل منك متابعين يتقدمون عليك — في غلط ما تعرفه وأنت تكرر نفس الخطأ' },
  { en: '😰 You spent months building your audience — now they\'re not seeing your content at all',    ar: '😰 بنيت جمهورك بشهور من التعب — والآن المحتوى ما يوصلهم أبداً' },
  { en: '🧐 Something changed in the algorithm and your account never recovered — we can fix this FREE', ar: '🧐 الخوارزمية تغيرت وحسابك ما تعافى — نشخص المشكلة ونعطيك الحل مجاناً' },
  { en: '💬 Stop guessing. Get a FREE full diagnosis of your account in 48 hours — WhatsApp us now',   ar: '💬 خلّ التخمين يكفي — احصل على تشخيص مجاني كامل لحسابك خلال 48 ساعة — راسلنا الآن' },
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
