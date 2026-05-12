import { useEffect, useRef } from 'react';
import { useLang } from '@/hooks/useLang';

export default function Industries() {
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

  const industries = [
    { icon: '🏛️', title: t('الحكومة والوزارات', 'Government & Ministries'), desc: t('بوابات حكومية، أنظمة إدارة، تحول رقمي للمؤسسات الحكومية', 'Government portals, management systems, digital transformation for government institutions') },
    { icon: '🏥', title: t('المستشفيات والرعاية الصحية', 'Hospitals & Healthcare'), desc: t('أنظمة إدارة مستشفيات، سجلات طبية، مواعيد، ومتابعة المرضى', 'Hospital management systems, medical records, appointments, and patient follow-up') },
    { icon: '🎓', title: t('الجامعات والتعليم', 'Universities & Education'), desc: t('منصات تعليمية، أنظمة إدارة الطلاب، حضور إلكتروني، وبوابات أكاديمية', 'Educational platforms, student management systems, electronic attendance, and academic portals') },
    { icon: '🏢', title: t('الشركات والمؤسسات', 'Corporations & Enterprises'), desc: t('أنظمة ERP، CRM، إدارة المشاريع، وحلول رقمية لتحسين الكفاءة التشغيلية', 'ERP, CRM, project management, and digital solutions to improve operational efficiency') },
    { icon: '🛒', title: t('التجزئة والتجارة', 'Retail & Commerce'), desc: t('متاجر إلكترونية، أنظمة نقاط البيع POS، وإدارة المخزون والفروع', 'E-commerce stores, POS systems, and branch/inventory management') },
    { icon: '🏗️', title: t('المقاولات والصناعة', 'Construction & Industry'), desc: t('أنظمة إدارة المشاريع والموارد للشركات الإنشائية والصناعية الكبرى', 'Project and resource management systems for major construction and industrial companies') },
  ];

  return (
    <section className="dt-section alt industries-section" id="industries">
      <div className="dt-container">
        <div className="dt-section-head">
          <span className="dt-badge">{t('القطاعات', 'Industries')}</span>
          <h2 className="dt-section-title">{t('خبرة موثّقة في أبرز القطاعات الحيوية', 'Proven Expertise Across Key Industry Sectors')}</h2>
          <p className="dt-section-sub">{t('نخدم الوزارات والمستشفيات والجامعات والشركات بحلول مخصصة لكل قطاع', 'We serve ministries, hospitals, universities, and companies with tailored solutions for every sector')}</p>
        </div>
        <div className="industries-grid">
          {industries.map(ind => (
            <div key={ind.title} className="ind-card reveal" ref={addReveal}>
              <div className="ind-icon">{ind.icon}</div>
              <h3>{ind.title}</h3>
              <p>{ind.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
