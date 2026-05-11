import { useLang } from '@/hooks/useLang';

const clients = [
  'وزارة الصحة', 'مستشفى ابن النفيس', 'جامعة بغداد',
  'مجمع الرواد التجاري', 'عيادة الشفاء', 'شركة الرافدين', 'مركز أربيل الطبي',
];
const clientsEn = [
  'Ministry of Health', 'Ibn Al-Nafis Hospital', 'University of Baghdad',
  'Al-Ruwwad Complex', 'Al-Shifa Clinic', 'Al-Rafidain Co.', 'Erbil Medical Center',
];

export default function TrustedStrip() {
  const { lang, t } = useLang();
  const list = lang === 'ar' ? clients : clientsEn;
  const doubled = [...list, ...list]; // infinite scroll trick

  return (
    <div className="trusted-strip">
      <div className="trusted-inner">
        <span className="trusted-label">{t('يثقون بنا', 'Trusted By')}</span>
        <div className="trusted-track-wrap">
          <div className="trusted-track">
            {doubled.map((name, i) => (
              <span key={i}>
                {name}
                {i < doubled.length - 1 && <span className="sep"> ◆ </span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
