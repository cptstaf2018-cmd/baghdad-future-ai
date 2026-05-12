import { ScrollGlobe } from '@/components/ui/landing-page';
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
      title: t('نحو مؤسسات عراقية أذكى', 'Smarter Iraqi Institutions'),
      subtitle: t('بالذكاء الاصطناعي والتحول الرقمي', 'through AI & Digital Transformation'),
      description: t(
        'نصمم ونبني أنظمة ذكاء اصطناعي، ERP، منصات SaaS، وتطبيقات مؤسسية تساعد الوزارات والمستشفيات والجامعات والشركات على العمل بسرعة ووضوح وأمان.',
        'We design and build AI systems, ERP platforms, SaaS products, and enterprise apps that help ministries, hospitals, universities, and companies operate with speed, clarity, and security.',
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
      badge: t('شبكة حلول', 'Solution Network'),
      title: t('من بغداد وأربيل', 'From Baghdad & Erbil'),
      subtitle: t('إلى كل مؤسسة تبحث عن نمو حقيقي', 'to every institution ready to grow'),
      description: t(
        'نحوّل الاحتياج التشغيلي اليومي إلى أنظمة عملية: لوحات تحكم، قواعد بيانات، تكاملات، أتمتة، وتجارب استخدام يفهمها الفريق من اليوم الأول.',
        'We turn daily operational needs into practical systems: dashboards, databases, integrations, automation, and user experiences teams understand from day one.',
      ),
      align: 'left' as const,
      dir,
    },
    {
      id: 'discovery',
      badge: t('قدراتنا', 'Capabilities'),
      title: t('حلول جاهزة للتوسع', 'Solutions Built to Scale'),
      subtitle: t('مصممة لبيئة العمل العراقية', 'Designed for Iraqi Operations'),
      description: t(
        'نبدأ من المشكلة الحقيقية، ثم نبني طبقة تقنية قابلة للصيانة والتطوير — من المنتج الأولي إلى منصة مستقرة تخدم فروعاً ومستخدمين وبيانات متزايدة.',
        'We start with the real problem, then build a maintainable technology layer — from first release to a stable platform serving growing branches, users, and data.',
      ),
      align: 'left' as const,
      dir,
      features: [
        {
          title: t('ذكاء اصطناعي وأتمتة', 'AI & Automation'),
          description: t('روبوتات محادثة ذكية، تحليل بيانات، وأتمتة العمليات المؤسسية', 'Smart chatbots, data analytics, and institutional process automation'),
        },
        {
          title: t('أنظمة ERP مخصصة', 'Custom ERP Systems'),
          description: t('إدارة شاملة للموارد البشرية، المالية، والمخزون من منصة واحدة', 'Comprehensive HR, finance, and inventory management from one platform'),
        },
        {
          title: t('تحول رقمي متكامل', 'Complete Digital Transformation'),
          description: t('بنية تحتية آمنة بمعايير دولية ودعم مستمر بلا انقطاع', 'Secure infrastructure with international standards and uninterrupted support'),
        },
      ],
    },
    {
      id: 'future',
      badge: t('ابدأ الآن', 'Start Now'),
      title: t('مشروعك القادم', 'Your Next Project'),
      subtitle: t('يستحق نظاماً يليق بطموحه', 'Deserves Software Worthy of Its Ambition'),
      description: t(
        'سواء كنت تحتاج موقعاً مؤسسياً، تطبيقاً، نظام إدارة، أو أتمتة ذكية — نساعدك على تحويل الفكرة إلى منتج واضح قابل للإطلاق والدعم.',
        'Whether you need a corporate website, app, management system, or intelligent automation — we help turn the idea into a clear product ready to launch and support.',
      ),
      align: 'left' as const,
      dir,
      actions: [
        {
          label: t('انضم إلى رحلتنا', 'Join Our Journey'),
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
