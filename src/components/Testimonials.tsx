import { useLang } from '@/hooks/useLang';

const reviews = [
  { textAr: '"النظام ساعدنا على استقبال الطلبات بسرعة كبيرة بدون أي خطأ. ممتاز جداً!"', textEn: '"The system helped us process orders very quickly without any errors. Excellent!"', author: 'أحمد الكعبي', authorEn: 'Ahmed Al-Ka\'abi', src: '📘 Facebook', bg: 'linear-gradient(135deg,#2563EB,#1d4ed8)', letter: 'أ' },
  { textAr: '"تصميم الموقع احترافي جداً والتسليم كان قبل الموعد. شكراً فريق بغداد المستقبل!"', textEn: '"The website design is very professional and delivery was ahead of schedule. Thank you Baghdad Future team!"', author: 'سارة محمد', authorEn: 'Sara Mohammed', src: '📸 Instagram', bg: 'linear-gradient(135deg,#10B981,#059669)', letter: 'س' },
  { textAr: '"الفريق محترف وعندهم خبرة واضحة، النظام يشتغل بشكل ممتاز ومرن."', textEn: '"The team is professional with clear expertise, the system works excellently and flexibly."', author: 'كريم عبدالله', authorEn: 'Kareem Abdullah', src: '📘 Facebook', bg: 'linear-gradient(135deg,#06B6D4,#0891b2)', letter: 'ك' },
  { textAr: '"واو! المتجر الإلكتروني فاق توقعاتي. المبيعات زادت من الأسبوع الأول!"', textEn: '"Wow! The online store exceeded my expectations. Sales increased from the first week!"', author: 'نور الحسيني', authorEn: 'Nour Al-Husseini', src: '📸 Instagram', bg: 'linear-gradient(135deg,#D97757,#C0613B)', letter: 'ن' },
  { textAr: '"التعامل مع الفريق سريع ومرن، والنظام يعمل بدون توقف. أنصح الجميع!"', textEn: '"Working with the team is fast and flexible, and the system runs without interruption. I recommend them to everyone!"', author: 'مصطفى الجبوري', authorEn: 'Mustafa Al-Jabouri', src: '📘 Facebook', bg: 'linear-gradient(135deg,#8B5CF6,#7C3AED)', letter: 'م' },
  { textAr: '"نظام الحجوزات الذكي وفّر علينا ساعات يومياً. استثمار يستحق بكل تأكيد!"', textEn: '"The smart booking system saved us hours daily. An investment that\'s absolutely worth it!"', author: 'حيدر الموسوي', authorEn: 'Haider Al-Moussawi', src: '📘 Facebook', bg: 'linear-gradient(135deg,#F59E0B,#D97706)', letter: 'ح' },
];

export default function Testimonials() {
  const { lang, t } = useLang();
  const doubled = [...reviews, ...reviews];

  return (
    <section className="brand-section testimonials-section">
      <div className="brand-container">
        <div className="brand-section-head">
          <span className="brand-tag">{t('آراء العملاء', 'Client Reviews')}</span>
          <h2 className="brand-section-title">{t('ماذا قال عملاؤنا؟', 'What Did Our Clients Say?')}</h2>
        </div>
      </div>
      <div className="reviews-wrap">
        <div className="reviews-track">
          {doubled.map((r, i) => (
            <div key={i} className="review-card">
              <div className="stars">★★★★★</div>
              <p>{lang === 'ar' ? r.textAr : r.textEn}</p>
              <div className="review-author">
                <div className="review-av" style={{ background: r.bg }}>{r.letter}</div>
                <div>
                  <strong>{lang === 'ar' ? r.author : r.authorEn}</strong>
                  <span>{r.src}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
