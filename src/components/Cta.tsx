import { useEffect, useRef } from 'react';
import { useLang } from '@/hooks/useLang';

export default function Cta() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="cta-section">
      <div className="cta-bg" />
      <div className="cta-inner reveal" ref={ref}>
        <span className="brand-tag light">{t('ابدأ مشروعك', 'Start Your Project')}</span>
        <h2>{t('مستعد لتحويل مؤسستك رقمياً؟', 'Ready to Digitally Transform Your Institution?')}</h2>
        <p>{t('تواصل معنا اليوم لاستشارة مجانية ودراسة احتياجاتك بدون أي التزام', 'Contact us today for a free consultation and study of your needs with no commitment')}</p>
        <div className="cta-btns">
          <a href="#contact" className="btn-primary btn-lg">{t('اطلب استشارة مجانية', 'Request Free Consultation')}</a>
          <a href="#portfolio" className="btn-secondary-cta">{t('شاهد أعمالنا', 'View Our Work')}</a>
        </div>
      </div>
    </section>
  );
}
