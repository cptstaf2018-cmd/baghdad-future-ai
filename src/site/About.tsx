import { useLang } from '@/hooks/useLang';

export default function About() {
  const { t } = useLang();

  const values = [
    {
      title: t('حل متكامل تحت سقف واحد', 'One roof, one partner'),
      body: t('المواقع والتطبيقات وأنظمة الإدارة والذكاء الاصطناعي والسوشل ميديا عند فريق واحد، بدل خدمات مبعثرة عند جهات مختلفة.', 'Websites, apps, business systems, AI and social media from one team, instead of scattered vendors.'),
    },
    {
      title: t('نبني للسوق العراقي', 'Built for the Iraqi market'),
      body: t('بالعربية وباللهجة التي يكتب بها زبونك، وبالدينار العراقي، ولطريقة عمل المحلات والمدارس والعيادات هنا.', 'In Arabic and the dialect your customers write in, priced in Iraqi dinar, shaped around how businesses here work.'),
    },
    {
      title: t('لا نسلّم ونختفي', 'We stay after launch'),
      body: t('ندرّب فريقك ونبقى معك بالدعم والتطوير بعد الإطلاق، لأن النظام يكبر مع عملك.', 'We train your team and keep supporting and improving the system as your business grows.'),
    },
  ];

  return (
    <section className="hf-sec" id="about" style={{ paddingBottom: 0 }}>
      <div className="hf-wrap">
        <div className="hf-head"><h2>{t('من نحن', 'About us')}</h2><span>{t('بغداد، العراق', 'Baghdad, Iraq')}</span></div>
        <div className="hf-about-grid">
          <div>
            <p className="hf-about-lead">{t(
              'بغداد المستقبل AI شركة تقنية تأسست عام 2023 لتكون الشريك التقني للشركات والمؤسسات في العراق والخليج.',
              'Baghdad Future AI is a technology company founded in 2023 to be the technical partner for businesses and institutions in Iraq and the Gulf.'
            )}</p>
            <p className="hf-about-body">{t(
              'بدأنا ببناء مواقع وأنظمة لعملائنا، ثم حوّلنا ما تعلّمناه إلى منصات جاهزة يستخدمها الناس يومياً: وكيل للرد على واتساب، ومسار للمدارس، وكير كار لمراكز السيارات، وكلينيك للعيادات، والحقل الذكي للمزارع. ونعلّم الشباب الذكاء الاصطناعي مجاناً عبر أكاديميتنا.',
              'We started by building websites and systems for clients, then turned what we learned into ready platforms people use every day: Wakeel for WhatsApp, Masar for schools, CareCar for car centers, Clinic for clinics and Smart Farm for farms. We also teach young people AI for free through our academy.'
            )}</p>
            <div className="hf-facts">
              <div><strong>2023</strong>{t('سنة التأسيس', 'Founded')}</div>
              <div><strong>{t('٥ منصات', '5 platforms')}</strong>{t('تعمل الآن', 'live today')}</div>
              <div><strong>{t('العراق والخليج', 'Iraq & Gulf')}</strong>{t('حيث نعمل', 'where we work')}</div>
            </div>
          </div>
          <div className="hf-values">
            {values.map(v => (
              <div className="hf-value" key={v.title}><h3>{v.title}</h3><p>{v.body}</p></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
