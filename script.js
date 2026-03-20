/* ══════════════════════════════════════════════════════
   بغداد المستقبل للذكاء الاصطناعي AI — script.js
   ══════════════════════════════════════════════════════ */

gsap.registerPlugin(ScrollTrigger);

/* ── Lenis smooth scroll ────────────────────────────── */
const lenis = new Lenis({ lerp: 0.10, smoothWheel: true, syncTouch: false, wheelMultiplier: 0.85 });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add(t => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);

/* ── Navbar: scroll-aware + hamburger ──────────────── */
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMobile = document.getElementById('nav-mobile');

window.addEventListener('scroll', () => {
    // navbar always has blur — just deepen border on scroll
}, { passive: true });

hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMobile.classList.toggle('open');
});

document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const el = document.querySelector(a.getAttribute('href'));
        if (!el) return;
        e.preventDefault();
        lenis.scrollTo(el, { offset: -70, duration: 1.4 });
        hamburger?.classList.remove('active');
        navMobile?.classList.remove('open');
    });
});

/* ── Canvas / Video Frames ─────────────────────────── */
const canvas = document.getElementById('video-canvas');
const ctx    = canvas.getContext('2d', { alpha: false, willReadFrequently: false });

function resizeCanvas() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', () => { resizeCanvas(); render(); }, { passive: true });

const TOTAL  = 360;
const src    = i => `./frames/frame_${String(i + 1).padStart(4, '0')}.webp`;
const frames = new Array(TOTAL);
const state  = { f: 0 };

/* Three-phase load: first 6 → next 30 → rest in batches */
(async () => {
    const load = i => new Promise(res => {
        const img = new Image();
        img.decoding = 'async';
        img.onload = img.onerror = () => res(img);
        img.src = src(i);
        frames[i] = img;
    });

    // Phase 1: first 6 frames — show instantly
    await Promise.all(Array.from({ length: 6 }, (_, i) => load(i)));
    render();

    // Phase 2: next 24 — ready before user starts scrolling
    await Promise.all(Array.from({ length: 24 }, (_, i) => load(i + 6)));

    // Phase 3: rest in small batches — no jank
    const BATCH = 10;
    for (let i = 30; i < TOTAL; i += BATCH) {
        const end = Math.min(i + BATCH, TOTAL);
        await Promise.all(Array.from({ length: end - i }, (_, k) => load(i + k)));
    }
})();

/* Scroll-driven frame sequencing — full page via Lenis */
lenis.on('scroll', ({ scroll, limit }) => {
    const progress = scroll / limit;
    state.f = progress * (TOTAL - 1);
    render();
});

/* rAF-throttled render — skips duplicate frames, never blocks paint */
let lastFrame = -1;
let rafId = null;
function render() {
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
        rafId = null;
        const idx = Math.round(state.f);
        if (idx === lastFrame) return;
        lastFrame = idx;
        const img = frames[idx];
        if (!img?.complete || !img.naturalWidth) return;
        /* Cover-fit: fill entire canvas */
        const cw = canvas.width, ch = canvas.height;
        const iw = img.naturalWidth, ih = img.naturalHeight;
        const scale = Math.max(cw / iw, ch / ih);
        const dw = iw * scale, dh = ih * scale;
        ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    });
}

/* ── Service card animations ────────────────────────── */
document.querySelectorAll('.service-block').forEach(block => {
    const anim  = block.dataset.anim;
    const isR   = block.classList.contains('right');
    const from  = { opacity: 0 };
    if (anim === 'fade-up')  from.y = 60;
    if (anim === 'slide-in') from.x = isR ? -70 : 70;
    if (anim === 'scale-up') from.scale = .82;

    gsap.timeline({
        scrollTrigger: { trigger: block, start: 'top 78%', end: 'top 18%', scrub: true }
    }).fromTo(block, from, { x: 0, y: 0, scale: 1, opacity: 1 });
});

/* ── Stats counters ─────────────────────────────────── */
document.querySelectorAll('.count').forEach(el => {
    const target = +el.dataset.target;
    ScrollTrigger.create({
        trigger: el, start: 'top 88%', once: true,
        onEnter: () => gsap.to({ v: 0 }, {
            v: target, duration: 2, ease: 'power2.out',
            onUpdate() { el.textContent = Math.round(this.targets()[0].v); }
        })
    });
});

/* ── Services accordion entrance ───────────────────────── */
gsap.from('.acc-header', {
    y: 30, opacity: 0, duration: .8,
    scrollTrigger: { trigger: '.acc-section', start: 'top 82%' }
});
gsap.to('.acc-item', {
    y: 0, opacity: 1, stagger: .1, duration: .6,
    ease: 'power3.out',
    scrollTrigger: { trigger: '.acc-list', start: 'top 85%' }
});

gsap.from('.stat', {
    y: 40, opacity: 0, stagger: .18, duration: .8,
    scrollTrigger: { trigger: '.stats-section', start: 'top 82%' }
});

/* ── CTA entrance ────────────────────────────────────── */
gsap.from('.cta-box > *', {
    y: 35, opacity: 0, stagger: .12, duration: .8,
    scrollTrigger: { trigger: '.cta-section', start: 'top 80%' }
});

/* ── Footer entrance ────────────────────────────────── */
gsap.from('.footer-grid > *', {
    y: 30, opacity: 0, stagger: .14, duration: .7,
    scrollTrigger: { trigger: '.footer', start: 'top 88%' }
});

/* ── Hero entrance ──────────────────────────────────── */
gsap.timeline({ delay: .1 })
    .from('.hero-badge',     { y: 10, opacity: 0, duration: .4, ease: 'power2.out', clearProps: 'all' })
    .from('.hero-h1',        { y: 30, opacity: 0, duration: .55, ease: 'power2.out', clearProps: 'all' }, '-=.15')
    .from('.hero-h2',        { y: 16, opacity: 0, duration: .45, ease: 'power2.out', clearProps: 'all' }, '-=.25')
    .from('.hero-desc',      { y: 12, opacity: 0, duration: .4,  ease: 'power2.out', clearProps: 'all' }, '-=.2')
    .from('.hero-btns .btn', { y: 12, opacity: 0, stagger: .07, duration: .38, ease: 'power2.out', clearProps: 'all' }, '-=.15')
    .from('.hero-stats',     { opacity: 0, duration: .3, clearProps: 'all' }, '-=.1');

/* ══════════════════════════════════════════════════════
   CHAT BOT
   ══════════════════════════════════════════════════════ */
const KB = [
    {
        keys: ['خدمات','تقدم','تعملون','ماذا','تصنع'],
        reply: `نقدم خمس خدمات متكاملة:<br><br>
🌐 <b>تصميم مواقع ذكية</b> — مواقع احترافية عالية التحويل<br>
⚙️ <b>تطوير أنظمة متكاملة</b> — حلول مخصصة لإدارة الأعمال<br>
🤖 <b>أتمتة الأعمال بالـ AI</b> — شات بوت وتحليل بيانات<br>
🛠️ <b>دعم وصيانة مستمر</b> — متابعة على مدار الساعة<br>
🏨 <b>أنظمة المطاعم والفنادق والبنوك</b>`
    },
    {
        keys: ['سعر','أسعار','تكلفة','كم','ميزانية','غالي','رخيص','باقة','باقات'],
        reply: `إليك باقاتنا الاحترافية 💼<br><br>
<b>🟢 Basic</b> — <b>400,000 – 600,000 د.ع</b><br>
⏱ 1 – 3 أيام &nbsp;|&nbsp; موقع + واتساب + 3 صفحات<br><br>
<b>🟡 Standard</b> — <b>900,000 – 1,400,000 د.ع</b><br>
⏱ 3 – 5 أيام &nbsp;|&nbsp; لوحة تحكم بسيطة + نموذج طلب<br><br>
<b>🔵 E-Commerce</b> — <b>2,000,000 – 3,500,000 د.ع</b><br>
⏱ 5 – 7 أيام &nbsp;|&nbsp; متجر كامل + إدارة منتجات<br><br>
<b>🟣 Smart AI</b> — <b>4,000,000 – 5,500,000 د.ع</b><br>
⏱ 7 – 10 أيام &nbsp;|&nbsp; كل شيء + مجيب آلي + إشعارات<br><br>
<b>🔴 Enterprise</b> — <b>من 6,500,000 د.ع</b><br>
⏱ 10 – 20 يوم &nbsp;|&nbsp; نظام كامل للشركات + AI متقدم<br><br>
✅ <i>نضمن تشغيل النظام في مدة قصيرة حتى يبدأ العمل فوراً!</i><br><br>
للاستفسار والحجز:<br>
<a href="https://wa.me/9647706688044" target="_blank" style="color:#00ffd1">واتساب: 07706688044</a>`
    },
    {
        keys: ['تواصل','اتصال','هاتف','واتساب','ايميل','بريد','contact'],
        reply: `تقدر تتواصل معنا مباشرة عبر الواتساب أو من خلال هذا الشات 📞<br><br>
<b>واتساب:</b><br>
<a href="https://wa.me/9647706688044" target="_blank" style="color:#00ffd1">07706688044</a> &nbsp;|&nbsp;
<a href="https://wa.me/9647806688044" target="_blank" style="color:#00ffd1">07806688044</a><br><br>
<b>البريد:</b><br>
<a href="mailto:info@shammari-electronics.com" style="color:#00ffd1">info@shammari-electronics.com</a><br>
📍 العراق، بغداد، المنصور`
    },
    {
        keys: ['مدة','وقت','يستغرق','تنفيذ','متى','سرعة'],
        reply: `مدة التنفيذ حسب نوع المشروع:<br><br>
⚡ صفحة هبوط: <b>3–5 أيام</b><br>
🌐 موقع متكامل: <b>2–4 أسابيع</b><br>
⚙️ نظام إداري: <b>4–8 أسابيع</b><br>
🤖 حل AI مخصص: حسب التعقيد<br><br>
نلتزم دائماً بالمواعيد المتفق عليها ✅`
    },
    {
        keys: ['مشاريع','أعمال','خبرة','portfolio','نماذج'],
        reply: `أنجزنا أكثر من <b>+150 مشروع</b> لـ<b>+300 عميل</b> خلال <b>10+ سنوات</b> خبرة. 🏆<br><br>
للاطلاع على نماذج أعمالنا:<br>
<a href="https://wa.me/9647706688044" target="_blank" style="color:#00ffd1">تواصل معنا ←</a>`
    },
    {
        keys: ['مرحبا','هلا','اهلا','السلام','صباح','مساء','hi','hello'],
        reply: `أهلاً وسهلاً! 👋<br>مرحباً بك في <b>شركة بغداد المستقبل AI</b>.<br>كيف يمكنني مساعدتك اليوم؟`
    },
    {
        keys: ['شكر','ممتاز','رائع','احسنت','جيد'],
        reply: `شكراً لك على كلماتك الطيبة! 🙏<br>نسعى دائماً لتقديم أفضل خدمة.`
    }
];

const FALLBACK = [
    `يسعدنا مساعدتك! للإجابة الدقيقة تواصل مع فريقنا مباشرة:<br><a href="https://wa.me/9647706688044" target="_blank" style="color:#00ffd1">واتساب: 07706688044</a>`,
    `سؤال رائع! فريقنا متاح للإجابة:<br><a href="https://wa.me/9647706688044" target="_blank" style="color:#00ffd1">ابدأ المحادثة ←</a>`
];

const chatbot  = document.getElementById('chatbot');
const fabBtn   = document.getElementById('chat-fab');
const fabDot   = document.getElementById('fab-dot');
const closeX   = document.getElementById('chat-x');
const msgsEl   = document.getElementById('chat-msgs');
const inputEl  = document.getElementById('chat-input');
const sendBtn  = document.getElementById('chat-send');
const quickEl  = document.getElementById('chat-quick');

let open = false;

function openChat()  { open = true;  chatbot.classList.add('open');    fabDot?.classList.add('hide'); inputEl?.focus(); scrollEnd(); }
function closeChat() { open = false; chatbot.classList.remove('open'); }

fabBtn?.addEventListener('click',  () => open ? closeChat() : openChat());
closeX?.addEventListener('click',  closeChat);

// CTA button opens chat
document.getElementById('open-chat')?.addEventListener('click', openChat);

function openChatWithPrice() {
    openChat();
    setTimeout(() => send('أسعار'), 400);
}

function ts() { return new Date().toLocaleTimeString('ar-IQ', { hour: '2-digit', minute: '2-digit' }); }
function scrollEnd() { setTimeout(() => { msgsEl.scrollTop = msgsEl.scrollHeight; }, 60); }

function addMsg(html, type) {
    const el = document.createElement('div');
    el.className = `msg ${type}`;
    el.innerHTML = `<div class="bubble">${html.replace(/\n/g, '<br>')}</div><span class="ts">${ts()}</span>`;
    msgsEl.appendChild(el);
    scrollEnd();
}

function showTyping() {
    const el = document.createElement('div');
    el.className = 'typing-bbl'; el.id = 'typing';
    el.innerHTML = '<span></span><span></span><span></span>';
    const wrapper = document.createElement('div');
    wrapper.className = 'msg bot'; wrapper.appendChild(el);
    wrapper.id = 'typing-wrap';
    msgsEl.appendChild(wrapper); scrollEnd();
}
function hideTyping() { document.getElementById('typing-wrap')?.remove(); }

function getReply(q) {
    q = q.toLowerCase().trim();
    for (const row of KB) {
        if (row.keys.some(k => q.includes(k))) return row.reply;
    }
    return FALLBACK[Math.floor(Math.random() * FALLBACK.length)];
}

function send(text) {
    text = (text ?? inputEl.value).trim();
    if (!text) return;
    quickEl.style.display = 'none';
    addMsg(text, 'user');
    inputEl.value = '';
    showTyping();
    setTimeout(() => { hideTyping(); addMsg(getReply(text), 'bot'); }, 750 + Math.random() * 500);
}

sendBtn?.addEventListener('click', () => send());
inputEl?.addEventListener('keydown', e => { if (e.key === 'Enter') send(); });
quickEl?.querySelectorAll('button').forEach(b => b.addEventListener('click', () => send(b.dataset.q)));

/* Welcome message after slight delay */
setTimeout(() => {
    addMsg('أهلاً! 👋 أنا مساعد <b>شركة بغداد المستقبل AI</b>.<br>كيف يمكنني مساعدتك اليوم؟', 'bot');
}, 1000);

/* ── Contact form → WhatsApp ─────────────────────── */
function handleContactForm(e) {
    e.preventDefault();
    const f = e.target;
    const name    = f.querySelector('input[type=text]').value.trim();
    const phone   = f.querySelector('input[type=tel]').value.trim();
    const service = f.querySelector('select').value;
    const msg     = f.querySelector('textarea').value.trim();
    const text = `مرحباً، أنا ${name}%0Aرقم الهاتف: ${phone}%0Aالخدمة المطلوبة: ${service || 'غير محدد'}%0Aالرسالة: ${msg}`;
    window.open(`https://wa.me/9647706688044?text=${text}`, '_blank');
    document.getElementById('form-success').style.display = 'block';
    f.reset();
}
