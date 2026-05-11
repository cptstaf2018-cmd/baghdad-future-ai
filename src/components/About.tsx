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
    { icon: '💡', title: t('الابتكار المستمر', 'Continuous Innovation'), desc: t('نواكب أحدث التقنيات العالمية', 'We keep pace with the latest global technologies') },
    { icon: '🛡️', title: t('الأمان والموثوقية', 'Security & Reliability'), desc: t('بنية تحتية آمنة بمعايير دولية', 'Secure infrastructure with international standards') },
    { icon: '🤝', title: t('شراكة حقيقية', 'True Partnership'), desc: t('ندعمك ما بعد التسليم بدون توقف', 'We support you post-delivery without stop') },
    { icon: '📍', title: t('خبرة محلية عميقة', 'Deep Local Expertise'), desc: t('نفهم السوق العراقي والبيئة المؤسسية', 'We understand the Iraqi market and institutional environment') },
  ];

  return (
    <section className="brand-section about-section" id="about">
      <div className="brand-container">
        <div className="about-grid">
          <div className="about-text">
            <span className="brand-tag">{t('من نحن', 'About Us')}</span>
            <h2 className="brand-section-title">
              {t('شركة تقنية عراقية رائدة في التحول الرقمي', "Iraq's Leading Technology Company in Digital Transformation")}
            </h2>
            <p className="about-desc">
              {t(
                'تأسست بغداد المستقبل AI عام 2023 بهدف واحد: بناء منظومة تقنية متكاملة تخدم المؤسسات العراقية الكبرى. نجمع بين الخبرة المحلية العميقة والتقنيات العالمية الحديثة لتقديم حلول رقمية حقيقية قابلة للتوسع والتطوير.',
                'Baghdad Future AI was founded in 2023 with one goal: building an integrated technology ecosystem for major Iraqi institutions. We combine deep local expertise with modern global technologies to deliver real, scalable digital solutions.'
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
                <div className="acm-stat"><span className="acm-num">2</span><span className="acm-lbl">{t('فرع', 'Branches')}</span></div>
                <div className="acm-stat"><span className="acm-num">Iraq</span><span className="acm-lbl">{t('& الخليج', '& Gulf')}</span></div>
              </div>
              <div className="acm-tags">
                <span>{t('الذكاء الاصطناعي', 'AI')}</span>
                <span>SaaS</span><span>ERP</span>
                <span>{t('الرعاية الصحية', 'Healthcare')}</span>
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
              <div className="act-icon">📍</div>
              <div>{t('أربيل · بغداد', 'Erbil · Baghdad')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
