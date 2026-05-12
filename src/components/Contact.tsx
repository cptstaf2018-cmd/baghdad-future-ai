import { useState, useEffect, useRef } from 'react';
import { useLang } from '@/hooks/useLang';

export default function Contact() {
  const { t } = useLang();
  const [form, setForm] = useState({ name: '', phone: '', org: '', service: '', desc: '' });
  const revealRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
    }, { threshold: 0.1 });
    if (revealRef.current) observer.observe(revealRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `*${t('طلب استشارة جديد', 'New Consultation Request')}*\n${t('الاسم', 'Name')}: ${form.name}\n${t('الهاتف', 'Phone')}: ${form.phone}\n${t('المؤسسة', 'Org')}: ${form.org}\n${t('الخدمة', 'Service')}: ${form.service}\n${t('التفاصيل', 'Details')}: ${form.desc}`;
    window.open(`https://wa.me/9647806688044?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section className="dt-section contact-section" id="contact">
      <div className="dt-container">
        <div className="dt-section-head">
          <span className="dt-badge">{t('تواصل معنا', 'Contact Us')}</span>
          <h2 className="dt-section-title">{t('تواصل معنا وابدأ مشروعك اليوم', 'Get in Touch and Start Your Project Today')}</h2>
        </div>
        <div className="contact-grid">
          <div className="contact-info">
            {[
              { icon: '📍', title: t('الفرع الأول — أربيل', 'Branch 1 — Erbil'), sub: t('شارع 100، أربيل، العراق', 'Street 100, Erbil, Iraq') },
              { icon: '📍', title: t('الفرع الثاني — بغداد', 'Branch 2 — Baghdad'), sub: t('المنصور، قرب تمثال أبو جعفر المنصور', 'Mansour, near Abu Jaafar Al-Mansour Statue') },
              { icon: '📱', title: t('الهاتف', 'Phone'), sub: <><a href="tel:07706688044">07706688044</a> · <a href="tel:07806688044">07806688044</a></> },
              { icon: '✉️', title: t('البريد الإلكتروني', 'Email'), sub: <a href="mailto:cptstaf2018@gmail.com">cptstaf2018@gmail.com</a> },
            ].map((item, i) => (
              <div key={i} className="cinfo-item">
                <div className="cinfo-icon">{item.icon}</div>
                <div><strong>{item.title}</strong><span>{item.sub}</span></div>
              </div>
            ))}
          </div>
          <form className="contact-form reveal" ref={revealRef} onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className="form-group">
                <label>{t('الاسم الكامل', 'Full Name')}</label>
                <input type="text" placeholder={t('أدخل اسمك الكامل', 'Enter your full name')} required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              </div>
              <div className="form-group">
                <label>{t('رقم الواتساب', 'WhatsApp Number')}</label>
                <input type="tel" placeholder="07xxxxxxxxx" required value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>{t('نوع المؤسسة', 'Institution Type')}</label>
                <select value={form.org} onChange={e => setForm(f => ({ ...f, org: e.target.value }))}>
                  <option value="">{t('اختر...', 'Select...')}</option>
                  <option>{t('وزارة / جهة حكومية', 'Ministry / Government')}</option>
                  <option>{t('مستشفى / مركز طبي', 'Hospital / Medical Center')}</option>
                  <option>{t('جامعة / مؤسسة تعليمية', 'University / Educational')}</option>
                  <option>{t('شركة خاصة', 'Private Company')}</option>
                  <option>{t('أخرى', 'Other')}</option>
                </select>
              </div>
              <div className="form-group">
                <label>{t('الخدمة المطلوبة', 'Required Service')}</label>
                <select value={form.service} onChange={e => setForm(f => ({ ...f, service: e.target.value }))}>
                  <option value="">{t('اختر الخدمة...', 'Select service...')}</option>
                  <option>{t('تطوير موقع / تطبيق', 'Web / App Development')}</option>
                  <option>{t('نظام إدارة أعمال', 'Business Management System')}</option>
                  <option>{t('ذكاء اصطناعي وأتمتة', 'AI & Automation')}</option>
                  <option>{t('نظام حضور بيومتري', 'Biometric Attendance System')}</option>
                  <option>{t('متجر إلكتروني', 'E-Commerce')}</option>
                  <option>{t('تحليل بيانات', 'Data Analytics')}</option>
                  <option>{t('باقة متكاملة', 'Complete Package')}</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>{t('وصف المشروع', 'Project Description')}</label>
              <textarea rows={4} placeholder={t('اشرح احتياجات مؤسستك باختصار...', 'Briefly describe your institution\'s needs...')} required value={form.desc} onChange={e => setForm(f => ({ ...f, desc: e.target.value }))} />
            </div>
            <button type="submit" className="btn-primary btn-full">
              <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.528 5.855L.057 23.943l6.255-1.641A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.811 9.811 0 01-5.001-1.366l-.36-.214-3.714.974.994-3.622-.234-.373A9.817 9.817 0 012.182 12C2.182 6.573 6.573 2.182 12 2.182S21.818 6.573 21.818 12 17.427 21.818 12 21.818z"/></svg>
              <span>{t('إرسال عبر واتساب', 'Send via WhatsApp')}</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
