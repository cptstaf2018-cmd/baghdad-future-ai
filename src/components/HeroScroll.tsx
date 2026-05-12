import { ScrollGlobe } from '@/components/ui/landing-page';
import AiSocialBanner from '@/components/AiSocialBanner';
import { useLang } from '@/hooks/useLang';

const globeConfig = {
  positions: [
    { top: "50%", left: "73%", scale: 1.9 },
    { top: "30%", left: "78%", scale: 1.2 },
    { top: "22%", left: "82%", scale: 1.7 },
    { top: "50%", left: "72%", scale: 2.1 },
  ],
  mobilePositions: [
    { top: "74%", left: "50%", scale: 1.1 },  // hero — centre-bottom
    { top: "70%", left: "50%", scale: 0.95 }, // innovation — centre
    { top: "76%", left: "50%", scale: 1.05 }, // discovery — centre-bottom
    { top: "72%", left: "50%", scale: 1.0 },  // future — centre
  ],
};

export default function HeroScroll() {
  const { lang, t } = useLang();
  const dir = lang === 'ar' ? 'rtl' as const : 'ltr' as const;

  const sections = [
    {
      id: 'hero',
      badge: t('بغداد المستقبل AI', 'Baghdad Future AI'),
      title: t('نبني مستقبلك الرقمي', 'We Build Your Digital Future'),
      subtitle: t('للعراق والخليج وكل العالم', 'Iraq · Gulf · Worldwide'),
      description: t(
        'من مواقع الشركات وتطبيقات الهاتف إلى أنظمة ERP والذكاء الاصطناعي وإدارة السوشل ميديا — شريك تقني واحد يغطي كل احتياجاتك الرقمية بجودة عالمية.',
        'From corporate websites and mobile apps to ERP systems, AI, and social media management — one tech partner covering all your digital needs with world-class quality.',
      ),
      align: 'left' as const,
      dir,
      actions: [
        {
          label: t('اطلب استشارة مجانية', 'Request Free Consultation'),
          variant: 'primary' as const,
          onClick: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
        },
        {
          label: t('شاهد أعمالنا', 'View Our Work'),
          variant: 'secondary' as const,
          onClick: () => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
        },
      ],
    },
    {
      id: 'innovation',
      badge: t('حضور عالمي', 'Global Presence'),
      extraTop: <AiSocialBanner />,
      title: t('عملاؤنا في العراق والخليج والعالم', 'Clients in Iraq, Gulf & Beyond'),
      subtitle: t('تقنية بلا حدود، نتائج ملموسة', 'Borderless Tech, Tangible Results'),
      description: t(
        'نخدم شركات ناشئة ومؤسسات راسخة في العراق والسعودية والإمارات والكويت وخارجها — نفهم السوق المحلي ونبني بمعايير دولية حتى تنافس بثقة في أي مكان.',
        'We serve startups and established businesses in Iraq, Saudi Arabia, UAE, Kuwait, and beyond — we understand the local market and build to international standards so you compete with confidence anywhere.',
      ),
      align: 'left' as const,
      dir,
    },
    {
      id: 'discovery',
      badge: t('خدماتنا', 'Our Services'),
      title: t('كل ما تحتاجه في مكان واحد', 'Everything You Need in One Place'),
      subtitle: t('من التصميم إلى التسويق إلى الأنظمة', 'Design · Marketing · Systems'),
      description: t(
        'لا تحتاج إلى أكثر من جهة واحدة — نغطي كل المسار الرقمي: تصميم وبرمجة، سوشل ميديا وإعلانات، أنظمة إدارة وذكاء اصطناعي.',
        'You need only one partner — we cover the full digital journey: design & development, social media & ads, management systems & AI.',
      ),
      align: 'left' as const,
      dir,
      features: [
        {
          title: t('إدارة السوشل ميديا والإعلانات', 'Social Media & Paid Ads'),
          description: t('محتوى احترافي، حملات مدفوعة على Meta وGoogle، وتقارير أداء شهرية تُظهر نتائج حقيقية', 'Professional content, paid campaigns on Meta & Google, monthly performance reports with real results'),
        },
        {
          title: t('مواقع وتطبيقات احترافية', 'Websites & Mobile Apps'),
          description: t('تصميم عصري وسريع وآمن — مواقع مؤسسية، متاجر إلكترونية، وتطبيقات iOS وAndroid', 'Modern, fast, and secure — corporate websites, e-commerce stores, iOS & Android apps'),
        },
        {
          title: t('ذكاء اصطناعي وأنظمة ERP', 'AI & ERP Systems'),
          description: t('روبوتات محادثة، تحليل بيانات، وأنظمة إدارة شاملة للموارد البشرية والمالية والمخزون', 'Chatbots, data analytics, and full ERP systems for HR, finance, and inventory'),
        },
      ],
    },
    {
      id: 'future',
      badge: t('ابدأ اليوم', 'Start Today'),
      title: t('مشروعك يستحق الأفضل', 'Your Project Deserves the Best'),
      subtitle: t('استشارة مجانية — بدون التزام', 'Free Consultation — No Commitment'),
      description: t(
        'سواء كنت تبدأ من الصفر أو تريد تطوير ما لديك — فريقنا جاهز لسماعك وتقديم حل واضح وسريع. تواصل معنا اليوم واحصل على استشارتك المجانية.',
        'Whether you are starting from scratch or want to upgrade what you have — our team is ready to listen and deliver a clear, fast solution. Contact us today and get your free consultation.',
      ),
      align: 'left' as const,
      dir,
      actions: [
        {
          label: t('تواصل معنا الآن', 'Contact Us Now'),
          variant: 'primary' as const,
          onClick: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
        },
        {
          label: t('استكشف خدماتنا', 'Explore Services'),
          variant: 'secondary' as const,
          onClick: () => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
        },
      ],
    },
  ];

  return (
    <ScrollGlobe
      sections={sections}
      globeConfig={globeConfig}
      className="bg-[#F0F4FF]"
    />
  );
}
