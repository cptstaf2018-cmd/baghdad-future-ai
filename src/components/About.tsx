import { useEffect, useRef } from 'react';
import { useLang } from '@/hooks/useLang';

export default function About() {
  const { t } = useLang();
  const revealRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    revealRefs.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const addReveal = (el: HTMLElement | null) => { if (el) revealRefs.current.push(el); };

  const values = [
    { icon: '🌍', title: t('حضور إقليمي وعالمي', 'Regional & Global Presence'), desc: t('نخدم عملاء في العراق والسعودية والإمارات والكويت وأوروبا', 'Serving clients in Iraq, Saudi Arabia, UAE, Kuwait and Europe') },
    { icon: '📱', title: t('سوشل ميديا وتسويق رقمي', 'Social Media & Digital Marketing'), desc: t('محتوى، إعلانات، وحملات تجلب عملاء حقيقيين', 'Content, ads, and campaigns that bring real customers') },
    { icon: '🤝', title: t('شراكة طويلة الأمد', 'Long-Term Partnership'), desc: t('لا نسلّم المشروع ونمشي — ندعمك باستمرار ونكبر معك', 'We don\'t deliver and disappear — we support you continuously and grow with you') },
    { icon: '⚡', title: t('تسليم سريع وجودة عالية', 'Fast Delivery, High Quality'), desc: t('نلتزم بالمواعيد ونتجاوز التوقعات في كل مشروع', 'We meet deadlines and exceed expectations on every project') },
  ];

  return (
    <section className="dt-section about-section" id="about">
      <div className="dt-container">
        <div className="about-grid">
          <div className="about-text">
            <span className="dt-badge">{t('من نحن', 'About Us')}</span>
            <h2 className="dt-section-title">
              {t('شريكك الرقمي في العراق والخليج والعالم', 'Your Digital Partner in Iraq, Gulf & Beyond')}
            </h2>
            <p className="about-desc">
              {t(
                'تأسست بغداد المستقبل AI عام 2023 لتكون الشريك التقني الأول للشركات والمؤسسات في العراق ودول الخليج والعالم. نجمع المواقع والتطبيقات وإدارة السوشل ميديا وأنظمة ERP والذكاء الاصطناعي تحت سقف واحد — لأن عملاءنا يستحقون حلاً متكاملاً لا خدمات مبعثرة.',
                'Baghdad Future AI was founded in 2023 to be the first tech partner for businesses and institutions in Iraq, the Gulf, and worldwide. We bring together websites, apps, social media management, ERP systems, and AI under one roof — because our clients deserve an integrated solution, not scattered services.'
              )}
            </p>
            <div className="about-values">
              {values.map(v => (
                <div key={v.title} className="value-item reveal" ref={addReveal}>
                  <div className="value-icon">{v.icon}</div>
                  <div>
                    <strong>{v.title}</strong>
                    <p>{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="about-visual reveal" ref={addReveal}>
            <div className="about-card-main">
              <div className="acm-top">
                <div className="acm-icon">🏢</div>
                <div>
                  <div className="acm-title">{t('بغداد المستقبل AI', 'Baghdad Future AI')}</div>
                  <div className="acm-sub">{t('شركة تقنية متخصصة', 'Specialized Tech Company')}</div>
                </div>
              </div>
              <div className="acm-stats">
                <div className="acm-stat"><span className="acm-num">+150</span><span className="acm-lbl">{t('مشروع', 'Projects')}</span></div>
                <div className="acm-stat"><span className="acm-num">5+</span><span className="acm-lbl">{t('دول', 'Countries')}</span></div>
                <div className="acm-stat"><span className="acm-num">2023</span><span className="acm-lbl">{t('تأسست', 'Founded')}</span></div>
              </div>
              <div className="acm-tags">
                <span>{t('سوشل ميديا', 'Social Media')}</span>
                <span>{t('الذكاء الاصطناعي', 'AI')}</span>
                <span>ERP</span>
                <span>{t('تطبيقات', 'Apps')}</span>
              </div>
            </div>
            <div className="about-card-secondary">
              <div>
                <div className="acs-row">
                  <div className="acs-dot green" />
                  <span>{t('أنظمة نشطة الآن', 'Systems Active Now')}</span>
                </div>
                <div className="acs-num">24/7</div>
                <div className="acs-label">{t('دعم فني مستمر', 'Continuous Technical Support')}</div>
              </div>
            </div>
            <div className="about-card-third reveal" ref={addReveal}>
              <span>🌍</span>
              <div>{t('العراق · الخليج · العالم', 'Iraq · Gulf · World')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
