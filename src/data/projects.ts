export type Project = {
  href: string;
  img: string;
  catAr: string;
  catEn: string;
  nameAr: string;
  nameEn: string;
  descAr: string;
  descEn: string;
  isFree?: boolean;
  hidden?: boolean;
};

export const defaultProjects: Project[] = [
  { href: 'https://www.wakeel-iq.store/about', img: '/images/pf-wakeel.png', catAr: 'موظف ذكي على واتساب', catEn: 'WhatsApp AI Employee', nameAr: 'Wakeel — موظفك الذكي على واتساب', nameEn: 'Wakeel — Your AI Employee on WhatsApp', descAr: 'مساعد ذكاء اصطناعي يرد على زبائنك بلهجتهم على واتساب، يسجّل الطلبات والمواعيد ويبلغك بكل شي', descEn: 'AI assistant that replies to your customers in their dialect on WhatsApp, logs orders & appointments and notifies you' },
  { href: 'https://masar-school.vercel.app/about', img: '/images/pf-masar.png', catAr: 'نظام SaaS للمدارس', catEn: 'School Management SaaS', nameAr: 'مسار — إدارة المدارس الأهلية', nameEn: 'Masar — Private School Management', descAr: 'منصة SaaS متكاملة للمدارس الأهلية — هويات الطلاب بالباركود، الأقساط، رواتب الموظفين وبوابة أولياء الأمور', descEn: 'Integrated SaaS platform for private schools — student QR IDs, tuition payments, staff payroll & parent portal' },
  { href: 'https://carecar.online/about', img: '/images/pf-carecar.png', catAr: 'نظام SaaS للسيارات', catEn: 'Car Management SaaS', nameAr: 'كير كار — إدارة مراكز السيارات', nameEn: 'CareCar — Car Service Management', descAr: 'منصة SaaS متكاملة لإدارة مراكز صيانة وغسيل السيارات — المواعيد، العملاء، الفواتير والتقارير', descEn: 'Integrated SaaS platform for car service & wash centers — appointments, clients, billing & reports' },
  { href: 'https://alhql-aldhky.vercel.app/dashboard', img: '/images/pf-farm.png', catAr: 'نظام زراعي ذكي', catEn: 'Smart Farm System', nameAr: 'الحقل الذكي — إدارة المواشي', nameEn: 'Smart Farm — Livestock Management', descAr: 'نظام ذكاء اصطناعي متكامل لإدارة الدواجن والأغنام والأبقار — صحة الحيوان، التغذية، الإنتاج واللقاحات', descEn: 'AI-powered system for managing poultry, sheep & cattle — health monitoring, feeding, production & vaccinations' },
  { href: 'https://www.clinic-ai-pro.com/', img: '/images/pf-clinic.jpg', catAr: 'نظام طبي', catEn: 'Medical System', nameAr: 'كلينيك — إدارة العيادات', nameEn: 'Clinicplt — Clinic Management', descAr: 'نظام SaaS متكامل للعيادات والمراكز الطبية', descEn: 'Integrated SaaS system for clinics and medical centers' },
  { href: 'https://kyn-app.vercel.app/', img: '/images/pf-kyn.jpg', catAr: 'تطبيق ذكي', catEn: 'Smart App', nameAr: 'KYN App', nameEn: 'KYN App', descAr: 'منصة ذكية متكاملة بتجربة مستخدم احترافية', descEn: 'Integrated smart platform with professional UX', hidden: true },
  { href: 'https://darbonna-taxi.vercel.app/', img: '/images/pf-darbonna.jpg', catAr: 'تطبيق نقل', catEn: 'Transport App', nameAr: 'Darbonna Taxi', nameEn: 'Darbonna Taxi', descAr: 'منصة حجز سيارات أجرة ذكية مع تتبع مباشر', descEn: 'Smart taxi booking platform with live tracking' },
  { href: 'https://superlative-cheesecake-4963e9.netlify.app/', img: '/images/pf-salon.jpg', catAr: 'موقع تجاري', catEn: 'Business Website', nameAr: 'صالون كلاس تكريت', nameEn: 'Salon Class Tikrit', descAr: 'موقع صالون تجميل فاخر مع نظام حجوزات', descEn: 'Luxury beauty salon website with booking system' },
  { href: 'https://zesty-licorice-3717d7.netlify.app/', img: '/images/pf-tikmart.jpg', catAr: 'متجر إلكتروني', catEn: 'E-Commerce', nameAr: 'متجر إلكتروني احترافي', nameEn: 'Professional Online Store', descAr: 'منصة تسوق متكاملة مع إدارة منتجات وسلة شراء', descEn: 'Integrated shopping platform with product management and cart' },
  { href: 'https://karmaclub-sandy.vercel.app/', img: '/images/pf-karma.jpg', catAr: 'موقع نادي رياضي', catEn: 'Sports Club Website', nameAr: 'نادي الكرمة الرياضي', nameEn: 'Al-Karma Sport Club', descAr: 'موقع احترافي لنادي كرة قدم عراقي في دوري النجوم — تأسس 1974', descEn: 'Professional website for an Iraqi football club in the Stars League — founded 1974' },
  { href: 'https://glowing-rugelach-33ae09.netlify.app/', img: '/images/pf-erbil.jpg', catAr: 'موقع نادي رياضي', catEn: 'Sports Club Website', nameAr: 'نادي أربيل الرياضي', nameEn: 'Erbil Sport Club', descAr: 'موقع نادي أربيل الرياضي — من أبرز أندية كرة القدم العراقية، تأسس 1968', descEn: 'Erbil Sport Club — one of Iraq\'s most celebrated football clubs, founded 1968' },
  { href: 'https://gregarious-dodol-f11d3f.netlify.app/', img: '/images/pf-onetouch.jpg', catAr: 'موقع شركة هندسية', catEn: 'Engineering Firm Website', nameAr: 'ون تاتش للهندسة والإنشاء', nameEn: 'OneTouch Engineering', descAr: 'مكتب هندسي عراقي متخصص في التصميم والإنشاء — أكثر من 500 مشروع منذ 2003', descEn: 'Iraqi engineering office in design & construction — 500+ projects since 2003' },
  { href: 'https://amazing-rabanadas-319c89.netlify.app/', img: '/images/pf-social-ai.png', catAr: '🎁 أداة مجانية', catEn: '🎁 Free AI Tool', nameAr: 'مولّد محتوى السوشل ميديا بالذكاء الاصطناعي', nameEn: 'AI Social Media Content Generator', descAr: 'هدية من شركتنا — أداة ذكاء اصطناعي تولّد كابشن وهاشتاق لمنشوراتك بثوانٍ. جربها الآن مجاناً', descEn: 'Our gift to you — AI tool that generates captions & hashtags for your posts in seconds. Try it FREE', isFree: true },
];
