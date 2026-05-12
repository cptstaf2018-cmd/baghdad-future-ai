import { useEffect, useRef } from 'react';
import { useLang } from '@/hooks/useLang';

export default function Products() {
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

  return (
    <section className="dt-section products-section" id="products">
      <div className="dt-container">
        <div className="dt-section-head">
          <span className="dt-badge">{t('منتجاتنا', 'Our Products')}</span>
          <h2 className="dt-section-title">{t('منتجاتنا البرمجية الجاهزة للتطبيق', 'Our Ready-to-Deploy Software Products')}</h2>
          <p className="dt-section-sub">{t('حلول برمجية متكاملة مصممة خصيصاً للبيئة العراقية والمؤسسية', 'Integrated software solutions designed specifically for the Iraqi and institutional environment')}</p>
        </div>
        <div className="products-grid">

          <a href="https://clinicplt.vercel.app/login" target="_blank" rel="noreferrer" className="product-card featured reveal" ref={addReveal}>
            <div className="product-badge">{t('متاح الآن', 'Live Now')}</div>
            <div className="product-icon">🏥</div>
            <h3>{t('كلينيك — نظام إدارة العيادات', 'Clinicplt — Clinic Management')}</h3>
            <p>{t('منصة SaaS متكاملة لإدارة العيادات والمراكز الطبية: المواعيد، المرضى، الفواتير، والتقارير.', 'Integrated SaaS platform for managing clinics and medical centers: appointments, patients, billing, and reports.')}</p>
            <ul className="product-features">
              <li>{t('إدارة مواعيد ذكية', 'Smart appointment management')}</li>
              <li>{t('سجلات طبية إلكترونية', 'Electronic medical records')}</li>
              <li>{t('نظام فواتير متكامل', 'Integrated billing system')}</li>
              <li>{t('تقارير وإحصائيات فورية', 'Instant reports & statistics')}</li>
            </ul>
            <span className="product-link">{t('زيارة المنصة ←', 'Visit Platform →')}</span>
          </a>

          <div className="product-card reveal" ref={addReveal}>
            <div className="product-icon">👁️</div>
            <h3>{t('نظام الحضور المركزي', 'Central Attendance System')}</h3>
            <p>{t('تتبع حضور الموظفين عبر بصمة الإصبع والوجه مع تكامل كامل مع أنظمة الرواتب والإدارة.', 'Employee attendance tracking via fingerprint and facial recognition with full integration with payroll and management systems.')}</p>
            <ul className="product-features">
              <li>{t('تعرف على الوجه والبصمة', 'Face & fingerprint recognition')}</li>
              <li>{t('إدارة مركزية لعدة فروع', 'Central management for multiple branches')}</li>
              <li>{t('تكامل مع نظام الرواتب', 'Payroll system integration')}</li>
            </ul>
            <span className="product-soon">{t('قريباً', 'Coming Soon')}</span>
          </div>

          <div className="product-card reveal" ref={addReveal}>
            <div className="product-icon">⚙️</div>
            <h3>{t('نظام ERP المؤسسي', 'Enterprise ERP System')}</h3>
            <p>{t('إدارة شاملة للموارد المؤسسية: المالية، الموارد البشرية، المشتريات، والمخزون من منصة واحدة.', 'Comprehensive institutional resource management: finance, HR, procurement, and inventory from one platform.')}</p>
            <ul className="product-features">
              <li>{t('إدارة مالية متكاملة', 'Integrated financial management')}</li>
              <li>{t('إدارة الموارد البشرية', 'Human resources management')}</li>
              <li>{t('لوحة تحكم مركزية', 'Central control dashboard')}</li>
            </ul>
            <span className="product-soon">{t('قريباً', 'Coming Soon')}</span>
          </div>

          <div className="product-card reveal" ref={addReveal}>
            <div className="product-icon">📊</div>
            <h3>{t('منصة تحليل البيانات', 'Data Analytics Platform')}</h3>
            <p>{t('لوحات تحكم ذكية وتقارير تفاعلية تحول بياناتك إلى قرارات استراتيجية دقيقة.', 'Smart dashboards and interactive reports that transform your data into precise strategic decisions.')}</p>
            <ul className="product-features">
              <li>{t('مرئيات بيانات تفاعلية', 'Interactive data visualizations')}</li>
              <li>{t('تنبؤات ذكاء اصطناعي', 'AI predictions')}</li>
              <li>{t('تقارير مخصصة', 'Custom reports')}</li>
            </ul>
            <span className="product-soon">{t('قريباً', 'Coming Soon')}</span>
          </div>

        </div>
      </div>
    </section>
  );
}

