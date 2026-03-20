/* ============================================================
   ALSHAMMARI AI — chatbot.js
   ============================================================ */

const KB = [
    {
        keys: ['خدمات','تقدم','تعملون','تعمل','تصنع','ماذا'],
        reply: `نقدم أربع خدمات رئيسية:<br><br>
🌐 <b>تصميم مواقع ذكية</b> — مواقع وصفحات هبوط عالية التحويل<br>
⚙️ <b>تطوير أنظمة</b> — حلول برمجية لإدارة المشاريع والبيانات<br>
🤖 <b>أتمتة الأعمال بالـ AI</b> — بوتات، ملخصات، تحليل مستندات<br>
🛠️ <b>دعم وصيانة</b> — متابعة مستمرة وتحديثات دورية`
    },
    {
        keys: ['سعر','أسعار','تكلفة','كم','غالي','رخيص','ميزانية','باقة','باقات'],
        reply: `إليك باقاتنا الاحترافية 💼<br><br>
<b>🟢 Basic</b> — <b>400,000 – 600,000 د.ع</b><br>
موقع + واتساب + 3 صفحات<br><br>
<b>🔵 Standard</b> — <b>900,000 – 1,400,000 د.ع</b><br>
لوحة تحكم بسيطة + نموذج طلب<br><br>
<b>🟣 E-Commerce</b> — <b>2,000,000 – 3,500,000 د.ع</b><br>
متجر كامل + إدارة منتجات<br><br>
<b>🤖 Smart AI</b> — <b>4,000,000 – 5,500,000 د.ع</b><br>
كل شيء + مجيب آلي بالذكاء الاصطناعي<br><br>
<b>🏢 Enterprise</b> — <b>من 6,500,000 د.ع</b><br>
نظام كامل مخصص للشركات<br><br>
للاستفسار والحجز:<br>
<a href="https://wa.me/9647706688044" target="_blank" style="color:#e30613">واتساب: 07706688044</a>`
    },
    {
        keys: ['تواصل','اتصال','هاتف','واتساب','whatsapp','ايميل','بريد','contact'],
        reply: `يسعدنا التواصل معكم! 📞<br><br>
<b>واتساب:</b><br>
<a href="https://wa.me/9647706688044" target="_blank" style="color:#e30613">07706688044</a> &nbsp;|&nbsp;
<a href="https://wa.me/9647806688044" target="_blank" style="color:#e30613">07806688044</a><br><br>
<b>البريد:</b><br>
<a href="mailto:info@shammari-electronics.com" style="color:#e30613">info@shammari-electronics.com</a><br><br>
📍 العراق، بغداد، المنصور`
    },
    {
        keys: ['مدة','وقت','كم يستغرق','متى','ينتهي','تنفيذ','سرعة'],
        reply: `مدة التنفيذ تعتمد على المشروع:<br><br>
⚡ <b>صفحة هبوط:</b> 3–5 أيام<br>
🌐 <b>موقع متكامل:</b> 2–4 أسابيع<br>
⚙️ <b>نظام إداري:</b> 4–8 أسابيع<br>
🤖 <b>أتمتة AI:</b> حسب التعقيد<br><br>
نلتزم بالمواعيد المتفق عليها ✅`
    },
    {
        keys: ['مشاريع','أعمال','portfolio','سابق','نماذج','تجربة','خبرة'],
        reply: `أنجزنا <b>+150 مشروع</b> لأكثر من <b>+300 عميل</b> خلال <b>10 سنوات</b> من الخبرة. 🏆<br><br>
للاطلاع على نماذج أعمالنا:<br>
<a href="https://wa.me/9647706688044" target="_blank" style="color:#e30613">تواصل معنا عبر واتساب</a>`
    },
    {
        keys: ['ai','ذكاء','اصطناعي','chatgpt','bot','بوت','أتمتة','تلقائي'],
        reply: `نوظّف أحدث تقنيات الذكاء الاصطناعي: 🤖<br><br>
• بوتات محادثة مخصصة<br>
• ملخصات صوتية وفيديو تلقائية<br>
• تحليل المستندات والملفات<br>
• أتمتة المهام المتكررة<br>
• تكامل مع ChatGPT وغيره<br><br>
<a href="https://wa.me/9647706688044" target="_blank" style="color:#e30613">احصل على استشارة مجانية ←</a>`
    },
    {
        keys: ['دعم','صيانة','تحديث','مشكلة','خطأ','عطل'],
        reply: `نقدم دعماً فنياً <b>مستمراً على مدار الساعة</b> 🛠️<br><br>
• مراقبة الأداء والأمان<br>
• إصلاح الأخطاء بسرعة<br>
• تحديثات دورية للنظام<br>
• تحديث المحتوى والتصاميم<br><br>
<a href="https://wa.me/9647706688044" target="_blank" style="color:#e30613">أبلغ عن مشكلة →</a>`
    },
    {
        keys: ['شكر','ممتاز','رائع','احسنت','جيد','بارك'],
        reply: `شكراً لك على كلماتك الطيبة! 🙏<br>نسعى دائماً لتقديم أفضل خدمة.`
    },
    {
        keys: ['مرحبا','هلا','اهلا','السلام','صباح','مساء','هاي','hi','hello'],
        reply: `أهلاً وسهلاً! 👋<br>مرحباً بك في <b>الشمري AI</b>.<br><br>كيف يمكنني مساعدتك اليوم؟`
    }
];

const DEFAULT = [
    `سؤالك مهم لنا! 😊<br>للإجابة الدقيقة تواصل مع فريقنا:<br><a href="https://wa.me/9647706688044" target="_blank" style="color:#e30613">واتساب: 07706688044</a>`,
    `يسعدنا الإجابة عبر واتساب مباشرة:<br><a href="https://wa.me/9647706688044" target="_blank" style="color:#e30613">ابدأ المحادثة ←</a>`,
    `لم أفهم جيداً، لكن فريقنا متاح دائماً:<br><a href="mailto:info@shammari-electronics.com" style="color:#e30613">info@shammari-electronics.com</a>`
];

/* ── DOM ──────────────────────────────────────────────────── */
const botEl    = document.getElementById('chatbot');
const trigBtn  = document.getElementById('chatbot-trigger');
const closeBtn = document.getElementById('chatbot-close');
const msgsEl   = document.getElementById('chatbot-msgs');
const inputEl  = document.getElementById('chatbot-input');
const sendBtn  = document.getElementById('chatbot-send');
const badgeEl  = document.getElementById('chatbot-badge');
const quickEl  = document.getElementById('chatbot-quick');

let isOpen = false;

function open()  { isOpen = true;  botEl.classList.add('open');    badgeEl.classList.add('hide'); inputEl.focus(); scrollBottom(); }
function close() { isOpen = false; botEl.classList.remove('open'); }

trigBtn.addEventListener('click',  () => isOpen ? close() : open());
closeBtn.addEventListener('click', close);

/* ── Helpers ─────────────────────────────────────────────── */
function now() {
    return new Date().toLocaleTimeString('ar-IQ', { hour: '2-digit', minute: '2-digit' });
}
function scrollBottom() {
    setTimeout(() => { msgsEl.scrollTop = msgsEl.scrollHeight; }, 60);
}
function addMsg(html, type) {
    const el = document.createElement('div');
    el.className = `msg ${type}`;
    el.innerHTML = `<div class="bubble">${html}</div><span class="ts">${now()}</span>`;
    msgsEl.appendChild(el);
    scrollBottom();
}
function showTyping() {
    const el = document.createElement('div');
    el.className = 'msg bot'; el.id = 'typing';
    el.innerHTML = '<div class="typing"><span></span><span></span><span></span></div>';
    msgsEl.appendChild(el);
    scrollBottom();
}
function hideTyping() { document.getElementById('typing')?.remove(); }

/* ── Reply logic ─────────────────────────────────────────── */
function getReply(txt) {
    const q = txt.toLowerCase().trim();
    for (const row of KB) {
        if (row.keys.some(k => q.includes(k))) return row.reply;
    }
    return DEFAULT[Math.floor(Math.random() * DEFAULT.length)];
}

function send(txt) {
    txt = (txt ?? inputEl.value).trim();
    if (!txt) return;
    quickEl.style.display = 'none';
    addMsg(txt, 'user');
    inputEl.value = '';
    showTyping();
    setTimeout(() => { hideTyping(); addMsg(getReply(txt), 'bot'); }, 700 + Math.random() * 500);
}

sendBtn.addEventListener('click', () => send());
inputEl.addEventListener('keydown', e => { if (e.key === 'Enter') send(); });
quickEl.querySelectorAll('button').forEach(b => b.addEventListener('click', () => send(b.dataset.q)));

/* ── Welcome message ─────────────────────────────────────── */
setTimeout(() => {
    addMsg('أهلاً! 👋 أنا مساعد <b>الشمري AI</b>.<br>كيف يمكنني مساعدتك اليوم؟', 'bot');
}, 800);
