import { useEffect, useRef } from 'react';
import { useLang } from '@/hooks/useLang';

export default function Services() {
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

  const services = [
    {
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="#67e8f9" strokeWidth="1.8" width="26" height="26"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
      bg: 'rgba(103,232,249,.08)', border: 'rgba(103,232,249,.2)',
      title: t('تطوير المواقع والتطبيقات', 'Web & App Development'),
      desc: t('مواقع مؤسسية، بوابات حكومية، تطبيقات جوال بمعايير عالمية وتجربة مستخدم احترافية.', 'Corporate websites, government portals, mobile apps with international standards and professional UX.'),
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="1.8" width="26" height="26"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>,
      bg: 'rgba(52,211,153,.08)', border: 'rgba(52,211,153,.2)',
      title: t('أنظمة إدارة الأعمال', 'Business Management Systems'),
      desc: t('أنظمة ERP وCRM مخصصة لإدارة الموارد البشرية، المالية، والمخزون بكفاءة عالية.', 'Custom ERP and CRM systems to manage HR, finance, and inventory with high efficiency.'),
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="1.8" width="26" height="26"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/></svg>,
      bg: 'rgba(129,140,248,.08)', border: 'rgba(129,140,248,.2)',
      title: t('الذكاء الاصطناعي والأتمتة', 'AI & Automation'),
      desc: t('روبوتات محادثة ذكية، تحليل البيانات، أتمتة العمليات، ونماذج تنبؤية متقدمة.', 'Smart chatbots, data analysis, process automation, and advanced predictive models.'),
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="1.8" width="26" height="26"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>,
      bg: 'rgba(251,191,36,.08)', border: 'rgba(251,191,36,.2)',
      title: t('المتاجر الإلكترونية', 'E-Commerce Solutions'),
      desc: t('منصات تجارة إلكترونية متكاملة مع بوابات دفع، إدارة مخزون، ولوحات تحكم ذكية.', 'Integrated e-commerce platforms with payment gateways, inventory management, and smart dashboards.'),
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="#f472b6" strokeWidth="1.8" width="26" height="26"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
      bg: 'rgba(244,114,182,.08)', border: 'rgba(244,114,182,.2)',
      title: t('أنظمة الحضور البيومترية', 'Biometric Attendance Systems'),
      desc: t('أنظمة حضور مركزية بتقنية بصمة الإصبع والوجه مع تقارير فورية وتكامل مع الرواتب.', 'Central attendance systems with fingerprint and face recognition, instant reports and payroll integration.'),
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="#fb923c" strokeWidth="1.8" width="26" height="26"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
      bg: 'rgba(251,146,60,.08)', border: 'rgba(251,146,60,.2)',
      title: t('تحليل البيانات والتقارير', 'Data Analytics & Reports'),
      desc: t('لوحات تحكم تفاعلية، تقارير مخصصة، وتحليلات ذكية تدعم القرار المؤسسي.', 'Interactive dashboards, custom reports, and smart analytics supporting institutional decision-making.'),
    },
  ];

  return (
    <section className="dt-section alt services-section" id="services">
      <div className="dt-container">
        <div className="dt-section-head">
          <span className="dt-badge">{t('خدماتنا', 'Our Services')}</span>
          <h2 className="dt-section-title">
            {t('حلول تقنية متكاملة لكل احتياجات مؤسستك', 'End-to-End Technology Solutions for Every Institution')}
          </h2>
          <p className="dt-section-sub">
            {t('من الفكرة إلى الإطلاق — نبني معك بكل خطوة', 'From idea to launch — we build with you every step of the way')}
          </p>
        </div>
        <div className="services-grid">
          {services.map(s => (
            <div key={s.title} className="svc-card reveal" ref={addReveal}>
              <div className="svc-icon-box" style={{ background: s.bg, borderColor: s.border }}>
                {s.icon}
              </div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
