import { useEffect, useRef } from 'react';
import { useLang } from '@/hooks/useLang';

export default function WhyUs() {
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

  const reasons = [
    { num: '01', title: t('خبرة محلية عميقة', 'Deep Local Expertise'), desc: t('نفهم تحديات البيئة العراقية والمتطلبات المؤسسية المحلية بعمق', 'We deeply understand Iraqi environment challenges and local institutional requirements') },
    { num: '02', title: t('حلول مخصصة لك', 'Custom Solutions for You'), desc: t('لا نبيع قوالب جاهزة — نبني حلاً مصمماً خصيصاً لاحتياجات مؤسستك', 'We don\'t sell ready templates — we build solutions designed specifically for your institution\'s needs') },
    { num: '03', title: t('دعم مستمر بلا انقطاع', 'Continuous Support'), desc: t('فريق دعم فني متخصص متاح 24/7 لضمان استمرارية عمل أنظمتك', 'Specialized technical support team available 24/7 to ensure your systems continuity') },
    { num: '04', title: t('ضمان النتائج', 'Results Guarantee'), desc: t('نلتزم بمعايير واضحة للأداء والجودة — نتائج قابلة للقياس أو نُعيد لك استثمارك', 'We commit to clear performance and quality standards — measurable results or we return your investment') },
  ];

  const badges = [
    { icon: '🔒', label: t('SSL آمن', 'SSL Secure') },
    { icon: '☁️', label: 'Cloud' },
    { icon: '🤖', label: t('AI مدعوم', 'AI Powered') },
    { icon: '⚡', label: '99.9% Uptime' },
    { icon: '📱', label: 'Mobile First' },
    { icon: '🛡️', label: t('أمان معياري', 'Standard Security') },
    { icon: '🌐', label: t('متعدد اللغات', 'Multilingual') },
    { icon: '📊', label: t('تحليلات', 'Analytics') },
    { icon: '🔄', label: t('تحديث مستمر', 'Continuous Updates') },
  ];

  return (
    <section className="dt-section whyus-section">
      <div className="dt-container">
        <div className="whyus-grid">
          <div className="whyus-text">
            <span className="dt-badge">{t('لماذا نحن', 'Why Choose Us')}</span>
            <h2 className="dt-section-title">{t('لماذا تختار بغداد المستقبل AI؟', 'Why Choose Baghdad Future AI?')}</h2>
            <div className="why-items">
              {reasons.map(r => (
                <div key={r.num} className="why-item reveal" ref={addReveal}>
                  <div className="why-num">{r.num}</div>
                  <div>
                    <h4>{r.title}</h4>
                    <p>{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="whyus-visual reveal" ref={addReveal}>
            <div className="trust-grid">
              {badges.map(b => (
                <div key={b.label} className="trust-badge">
                  <span>{b.icon}</span><span>{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
