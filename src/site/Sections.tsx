import { useLang } from '@/hooks/useLang';
import { waLink, WhatsAppIcon } from './icons';
import { socials } from './socials';

const ACADEMY_URL = 'https://baghdad-future-ai-academy.vercel.app';

export function Statement() {
  const { t } = useLang();
  return (
    <section className="hf-statement">
      <div className="hf-wrap">
        <p>
          {t('الزبون العراقي يكتب «شكد التوصيل؟» و«بعدكم فاتحين؟». ', 'Iraqi customers write the way they talk. ')}
          <span>{t(
            'لهذا نبني برمجيات تفهمه كما هو، بلهجته وبالدينار العراقي، وتعمل حتى وأنت نايم.',
            'So we build software that understands them as they are, in their dialect and in Iraqi dinar, and keeps working while you sleep.'
          )}</span>
        </p>
      </div>
    </section>
  );
}

export function Services() {
  const { t, lang } = useLang();
  return (
    <section className="hf-sec hf-svc" id="services">
      <div className="hf-wrap">
        <span className="hf-svc-lab">{t('الخدمات: وحين تحتاج شيئاً خاصاً بك', 'Services: when you need something of your own')}</span>
        {lang === 'ar' ? (
          <p>نبني <b>المواقع والتطبيقات</b>، و<b>أنظمة إدارة الأعمال</b> التي تربط فروعك ومخازنك وحساباتك، و<b>المساعدات الذكية</b> التي ترد على واتساب، و<b>المتاجر الإلكترونية</b>، و<b>أنظمة الحضور بالبصمة</b>، ثم نشغّل <b>حملاتك على السوشل ميديا</b> حتى يعرف الناس بها.</p>
        ) : (
          <p>We build <b>websites and apps</b>, <b>business systems</b> that connect your branches, stock and accounts, <b>AI assistants</b> that answer on WhatsApp, <b>online stores</b> and <b>biometric attendance</b>, then run your <b>social media campaigns</b> so people find you.</p>
        )}
      </div>
    </section>
  );
}

export function Academy() {
  const { t } = useLang();
  const lectures = [
    t('مقدمة في الذكاء الاصطناعي واستخدام ChatGPT', 'Intro to AI and using ChatGPT'),
    t('هندسة الأوامر وكتابة طلبات دقيقة', 'Prompt engineering'),
    t('صناعة الصور والفيديو بالذكاء الاصطناعي', 'Images and video with AI'),
    t('بناء موقع بمساعدة الذكاء الاصطناعي', 'Building a website with AI'),
    t('بناء مساعد ذكي بسيط', 'Building a simple AI assistant'),
    t('مشروعك الختامي ومناقشته', 'Your final project'),
  ];
  return (
    <section className="hf-academy" id="academy">
      <div className="hf-wrap hf-ac-grid">
        <div>
          <h2>{t('أكاديمية بغداد المستقبل تعلّم شباب العراق الذكاء الاصطناعي مجاناً', 'Baghdad Future AI Academy teaches young Iraqis AI, for free')}</h2>
          <p>{t(
            'دورة مباشرة عبر Google Meet، من أول سؤال تكتبه لـ ChatGPT إلى مشروع حقيقي تبنيه بنفسك. لا تحتاج أي خبرة برمجية.',
            'A live course on Google Meet, from your first ChatGPT question to a real project you build yourself. No coding experience needed.'
          )}</p>
          <a className="hf-btn hf-btn-ink" href={ACADEMY_URL} target="_blank" rel="noreferrer">{t('سجّل في الدفعة الأولى', 'Join the first cohort')}</a>
          <div className="hf-ac-note">
            <span><strong>{t('٥٠', '50')}</strong>{t('مقعداً في الدفعة الأولى', 'seats in the first cohort')}</span>
            <span><strong>{t('مجانية', 'Free')}</strong>{t('بدون أي رسوم', 'no fees at all')}</span>
          </div>
        </div>
        <ol className="hf-seq" aria-label={t('المحاضرات', 'Lectures')}>
          {lectures.map(l => <li key={l}>{l}</li>)}
        </ol>
      </div>
    </section>
  );
}

export function Socials() {
  return (
    <div className="hf-socials">
      {socials.map(s => (
        <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} title={s.label}>{s.svg}</a>
      ))}
    </div>
  );
}

export function Contact() {
  const { t } = useLang();
  return (
    <section className="hf-contact" id="contact">
      <div className="hf-wrap">
        <h2>{t('احكِ لنا عن عملك.', 'Tell us about your business.')}</h2>
        <div className="hf-contact-row">
          <p>{t('استشارة أولى مجانية على واتساب، ونرد خلال يوم عمل. وتابع جديدنا على منصات التواصل.', 'Your first consultation on WhatsApp is free, and we reply within one working day. Follow our news on social media.')}</p>
          <a className="hf-btn hf-btn-wa" href={waLink(t('مرحباً بغداد المستقبل، أريد استشارة لمشروعي', 'Hello Baghdad Future AI, I would like a consultation'))} target="_blank" rel="noreferrer">
            <WhatsAppIcon />{t('راسلنا على واتساب', 'Message us on WhatsApp')}
          </a>
        </div>
        <div style={{ marginTop: 28 }}><Socials /></div>
      </div>
    </section>
  );
}

export function Footer() {
  const { t } = useLang();
  const links = [
    { href: '#about', label: t('من نحن', 'About') },
    { href: '#work', label: t('أعمالنا', 'Work') },
    { href: '#services', label: t('الخدمات', 'Services') },
    { href: '#academy', label: t('الأكاديمية', 'Academy') },
  ];
  return (
    <footer className="hf-footer">
      <div className="hf-wrap">
        <div className="hf-foot-grid">
          <div>
            <h3>{t('بغداد المستقبل AI', 'Baghdad Future AI')}</h3>
            <p>{t('منصات وأنظمة ذكاء اصطناعي صُنعت في بغداد لأعمال العراق والخليج.', 'Platforms and AI systems made in Baghdad for businesses in Iraq and the Gulf.')}</p>
            <Socials />
          </div>
          <div>
            <h3>{t('الموقع', 'Site')}</h3>
            <ul className="hf-foot-links">{links.map(l => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}</ul>
          </div>
          <div>
            <h3>{t('تواصل', 'Contact')}</h3>
            <ul className="hf-foot-links">
              <li><a href={waLink(t('مرحباً بغداد المستقبل', 'Hello Baghdad Future AI'))} target="_blank" rel="noreferrer">{t('واتساب', 'WhatsApp')}</a></li>
              <li><a href={ACADEMY_URL} target="_blank" rel="noreferrer">{t('الأكاديمية', 'Academy')}</a></li>
              <li>{t('بغداد، العراق', 'Baghdad, Iraq')}</li>
            </ul>
          </div>
        </div>
        <div className="hf-foot-bottom">
          <span>© 2026 Baghdad Future AI</span>
          <span>{t('جميع الحقوق محفوظة', 'All rights reserved')}</span>
        </div>
      </div>
    </footer>
  );
}

export function WhatsAppFab() {
  const { t } = useLang();
  return (
    <a className="hf-fab" href={waLink(t('مرحباً بغداد المستقبل', 'Hello Baghdad Future AI'))} target="_blank" rel="noreferrer" aria-label={t('راسلنا على واتساب', 'Message us on WhatsApp')}>
      <WhatsAppIcon />
    </a>
  );
}
