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

          <a href="https://www.clinic-ai-pro.com/" target="_blank" rel="noreferrer" className="product-card featured reveal" ref={addReveal}>
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

          <a href="https://alhql-aldhky.vercel.app/dashboard" target="_blank" rel="noreferrer" className="product-card featured reveal" ref={addReveal}>
            <div className="product-badge">{t('متاح الآن', 'Live Now')}</div>
            <div className="product-icon">🐄</div>
            <h3>{t('الحقل الذكي — إدارة المواشي', 'Smart Farm — Livestock Management')}</h3>
            <p>{t('نظام ذكاء اصطناعي متكامل لإدارة الدواجن والأغنام والأبقار: صحة الحيوان، التغذية، الإنتاج واللقاحات.', 'Integrated AI system for managing poultry, sheep & cattle: animal health, feeding, production & vaccinations.')}</p>
            <ul className="product-features">
              <li>{t('متابعة صحة الحيوانات', 'Animal health monitoring')}</li>
              <li>{t('جدول تغذية ولقاحات ذكي', 'Smart feeding & vaccination schedule')}</li>
              <li>{t('إحصائيات الإنتاج اليومي', 'Daily production statistics')}</li>
              <li>{t('يدعم الدواجن والأغنام والأبقار', 'Supports poultry, sheep & cattle')}</li>
            </ul>
            <span className="product-link">{t('زيارة المنصة ←', 'Visit Platform →')}</span>
          </a>

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

