/* ══════════════════════════════════════
   BAGHDAD FUTURE AI — script.js v3
   No GSAP · No Canvas · Lightweight
══════════════════════════════════════ */

'use strict';

/* ── NAVBAR ── */
const navbar   = document.getElementById('navbar');
const hamburger= document.getElementById('hamburger');
const mobileMenu=document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

// Close mobile menu on link click
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  navbar.style.background = window.scrollY > 40
    ? 'rgba(11,11,15,0.97)'
    : 'rgba(11,11,15,0.85)';
}, { passive: true });

/* ── REVEAL ON SCROLL ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      // Stagger siblings
      const siblings = e.target.parentElement.querySelectorAll('.reveal');
      let delay = 0;
      siblings.forEach((s, idx) => { if (s === e.target) delay = idx * 80; });
      setTimeout(() => e.target.classList.add('visible'), delay);
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── STATS COUNTER ── */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1600;
  const start = performance.now();
  const update = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(ease * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  };
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(e.target);
      counterObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.cnt').forEach(el => counterObserver.observe(el));

/* ── ORDER FORM → WHATSAPP ── */
document.getElementById('order-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const name    = document.getElementById('f-name').value.trim();
  const service = document.getElementById('f-service').value;
  const desc    = document.getElementById('f-desc').value.trim();

  if (!name || !desc) {
    alert('يرجى تعبئة جميع الحقول المطلوبة');
    return;
  }

  const msg = `مرحباً، أريد طلب مشروع 👋\n\n` +
    `👤 الاسم: ${name}\n` +
    `🛠️ الخدمة: ${service || 'غير محدد'}\n` +
    `📝 التفاصيل: ${desc}`;

  window.open(`https://wa.me/9647706688044?text=${encodeURIComponent(msg)}`, '_blank');
});

/* ══════════════════════════════════════
   CHATBOT
══════════════════════════════════════ */
const chatbot  = document.getElementById('chatbot');
const fab      = document.getElementById('chat-fab');
const chatWin  = document.getElementById('chat-win');
const chatX    = document.getElementById('chat-x');
const msgsEl   = document.getElementById('chat-msgs');
const inputEl  = document.getElementById('chat-input');
const sendBtn  = document.getElementById('chat-send');
const chatLabel= document.getElementById('chat-label');
const quickEl  = document.getElementById('chat-quick');

let chatOpen = false;
let welcomed = false;

function now() {
  return new Date().toLocaleTimeString('ar-IQ', { hour: '2-digit', minute: '2-digit' });
}

function scrollBottom() {
  msgsEl.scrollTop = msgsEl.scrollHeight;
}

function addMsg(text, type) {
  const div = document.createElement('div');
  div.className = `msg ${type}`;
  const sanitized = text
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/\n/g,'<br>');
  div.innerHTML = `<div class="bubble">${sanitized}</div><span class="msg-time">${now()}</span>`;
  // Bot messages allow safe HTML (from KB only)
  if (type === 'bot') div.querySelector('.bubble').innerHTML = text;
  msgsEl.appendChild(div);
  scrollBottom();
}

function showTyping() {
  const t = document.createElement('div');
  t.className = 'msg bot';
  t.id = 'typing-indicator';
  t.innerHTML = `<div class="bubble typing-bbl"><span></span><span></span><span></span></div>`;
  msgsEl.appendChild(t);
  scrollBottom();
  return t;
}

function removeTyping() {
  const t = document.getElementById('typing-indicator');
  if (t) t.remove();
}

/* ── KNOWLEDGE BASE ── */
const KB = [
  {
    keys: ['مرحبا','هلا','هاي','السلام','اهلا','اهلين','ماكو'],
    reply: `أهلاً وسهلاً! 👋<br>أنا مساعد شركة <b>بغداد المستقبل AI</b>.<br><br>كيف أقدر أساعدك اليوم؟`
  },
  {
    keys: ['سعر','أسعار','تكلفة','كلفة','بكم','بكام','ميزانية','باقة','باقات','تسعيرة','عروض'],
    reply: `<b>💼 باقاتنا الاحترافية</b><br><br>
<div style="display:flex;flex-direction:column;gap:7px">
<div style="background:rgba(255,255,255,.06);border-radius:8px;padding:9px 11px;border-right:2px solid #4ADE80">
🟢 <b>Basic — الأساسية</b><br>
💰 <b>400,000 – 600,000 د.ع</b><br>
⏱ 1 – 3 أيام &nbsp;|&nbsp; موقع + واتساب + 3 صفحات
</div>
<div style="background:rgba(255,255,255,.06);border-radius:8px;padding:9px 11px;border-right:2px solid #FBBF24">
🟡 <b>Standard — ستاندرد</b><br>
💰 <b>900,000 – 1,400,000 د.ع</b><br>
⏱ 3 – 5 أيام &nbsp;|&nbsp; لوحة تحكم + نموذج طلبات
</div>
<div style="background:rgba(255,255,255,.06);border-radius:8px;padding:9px 11px;border-right:2px solid #60A5FA">
🔵 <b>E-Commerce — تجارة إلكترونية</b><br>
💰 <b>2,000,000 – 3,500,000 د.ع</b><br>
⏱ 5 – 7 أيام &nbsp;|&nbsp; متجر كامل + إدارة منتجات
</div>
<div style="background:rgba(255,255,255,.06);border-radius:8px;padding:9px 11px;border-right:2px solid #A78BFA">
🟣 <b>Smart AI — ذكاء اصطناعي</b><br>
💰 <b>4,000,000 – 5,500,000 د.ع</b><br>
⏱ 7 – 10 أيام &nbsp;|&nbsp; كل شيء + مجيب آلي
</div>
<div style="background:rgba(255,255,255,.06);border-radius:8px;padding:9px 11px;border-right:2px solid #F87171">
🔴 <b>Enterprise — للشركات</b><br>
💰 <b>من 6,500,000 د.ع</b><br>
⏱ 10 – 20 يوم &nbsp;|&nbsp; نظام كامل + AI متقدم
</div>
</div><br>
✅ <i>نضمن التسليم في الوقت المحدد!</i><br><br>
📲 <a href="https://wa.me/9647706688044" target="_blank" style="color:#00ffd1;font-weight:600">تواصل معنا: 07706688044</a>`
  },
  {
    keys: ['خدمة','خدمات','تطوير','موقع','مواقع','نظام','اتمتة','ذكاء','ai','تصميم'],
    reply: `نقدم <b>3 خدمات رئيسية</b>:<br><br>
🌐 <b>تطوير المواقع</b><br>
مواقع تعريفية، متاجر، لوحات تحكم<br><br>
⚙️ <b>أنظمة الأعمال</b><br>
CRM، نظام طلبات، تقارير ذكية<br><br>
🤖 <b>أتمتة بالذكاء الاصطناعي</b><br>
مجيب واتساب، حجوزات، تحليل بيانات<br><br>
أي خدمة تهمك أكثر؟`
  },
  {
    keys: ['مدة','وقت','كم يوم','متى','تسليم','ينتهي','ينجز'],
    reply: `<b>⏱ مدة التنفيذ لكل باقة:</b><br><br>
🟢 Basic: <b>1 – 3 أيام</b><br>
🟡 Standard: <b>3 – 5 أيام</b><br>
🔵 E-Commerce: <b>5 – 7 أيام</b><br>
🟣 Smart AI: <b>7 – 10 أيام</b><br>
🔴 Enterprise: <b>10 – 20 يوم</b><br><br>
✅ نضمن التسليم في الوقت المحدد دائماً.`
  },
  {
    keys: ['تواصل','اتصال','هاتف','واتساب','ايميل','بريد','عنوان','موقعكم','فين'],
    reply: `تقدر تتواصل معنا عبر:<br><br>
📱 <a href="https://wa.me/9647706688044" target="_blank" style="color:#00ffd1;font-weight:600">واتساب: 07706688044</a><br>
📱 <a href="https://wa.me/9647806688044" target="_blank" style="color:#00ffd1">واتساب: 07806688044</a><br>
✉️ cptstaf2017@gmail.com<br>
📍 العراق، أربيل، شارع 100<br><br>
أو استخدم <a href="#order" style="color:#00ffd1" onclick="closeChat()">نموذج الطلب</a> في الموقع.`
  },
  {
    keys: ['انجاز','اعمال','مشاريع','portfolio','اعمالكم','شغلكم'],
    reply: `<b>🏆 من أبرز أعمالنا:</b><br><br>
🛍️ <a href="https://zesty-licorice-3717d7.netlify.app/" target="_blank" style="color:#00ffd1">متجر إلكتروني احترافي</a> — متجر مع إدارة منتجات<br>
🚖 <a href="https://darbonna-taxi.vercel.app/" target="_blank" style="color:#00ffd1">Darbonna Taxi</a> — منصة حجز سيارات ذكية<br>
🏪 <a href="https://mall-pos-system-fniugb.abacusai.app/" target="_blank" style="color:#00ffd1">Mall POS System</a> — نظام بيع يدير 50 فرع<br>
⚽ <a href="https://glowing-rugelach-33ae09.netlify.app/" target="_blank" style="color:#00ffd1">نادي اربيل</a> — نموذج موقع رياضي<br><br>
+150 مشروع منجز بنجاح ✅`
  },
  {
    keys: ['شكرا','شكراً','ممتاز','عظيم','رائع','كلش','حلو','وين'],
    reply: `شكراً لك! 😊<br>يسعدنا خدمتك دائماً.<br><br>
هل تحتاج مساعدة في شيء آخر؟`
  }
];

const fallbacks = [
  'لم أفهم سؤالك تماماً، هل يمكنك إعادة الصياغة؟ 🤔',
  'للمساعدة الأسرع تواصل معنا عبر <a href="https://wa.me/9647706688044" target="_blank" style="color:#00ffd1">واتساب</a> 📲',
  'أخبرني أكثر كيف أقدر أساعدك؟ 😊'
];
let fallbackIdx = 0;

function getReply(text) {
  const t = text.trim().toLowerCase();
  for (const item of KB) {
    if (item.keys.some(k => t.includes(k))) return item.reply;
  }
  return fallbacks[fallbackIdx++ % fallbacks.length];
}

function send(text) {
  const msg = (text || inputEl.value).trim();
  if (!msg) return;
  inputEl.value = '';

  addMsg(msg, 'user');
  quickEl.style.display = 'none';

  const typing = showTyping();
  const delay = 600 + Math.random() * 600;

  setTimeout(() => {
    removeTyping();
    addMsg(getReply(msg), 'bot');
  }, delay);
}

function sendQuick(text) {
  inputEl.value = text;
  send(text);
}

function openChat() {
  chatOpen = true;
  chatbot.classList.add('open');
  chatWin.setAttribute('aria-hidden', 'false');
  if (!welcomed) {
    welcomed = true;
    setTimeout(() => {
      addMsg(`أهلاً! 👋 أنا مساعد <b>بغداد المستقبل AI</b>.<br>اختر من الأسئلة السريعة أو اكتب سؤالك مباشرة.`, 'bot');
    }, 400);
  }
  setTimeout(() => inputEl.focus(), 300);
}

function closeChat() {
  chatOpen = false;
  chatbot.classList.remove('open');
  chatWin.setAttribute('aria-hidden', 'true');
}

fab.addEventListener('click', () => chatOpen ? closeChat() : openChat());
chatX.addEventListener('click', closeChat);
chatLabel.addEventListener('click', openChat);
sendBtn.addEventListener('click', () => send());
inputEl.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } });

/* ── Price button → open chatbot with pricing ── */
const priceBtn = document.getElementById('price-btn');
if (priceBtn) {
  priceBtn.addEventListener('click', () => {
    openChat();
    setTimeout(() => sendQuick('ما هي أسعاركم؟'), 800);
  });
}

/* ── Auto-show chatbot label after 5s ── */
setTimeout(() => {
  if (!chatOpen && chatLabel) {
    chatLabel.style.animation = 'pulse-label 2s ease infinite';
  }
}, 5000);
