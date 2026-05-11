'use strict';

/* ── NAVBAR ── */
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const mobileMenu= document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ── REVEAL ON SCROLL ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      const siblings = e.target.parentElement.querySelectorAll('.reveal');
      let delay = 0;
      siblings.forEach((s, idx) => { if (s === e.target) delay = idx * 90; });
      setTimeout(() => e.target.classList.add('visible'), delay);
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── STATS COUNTER ── */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const start  = performance.now();
  const dur    = 1800;
  const update = (now) => {
    const p = Math.min((now - start) / dur, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(ease * target);
    if (p < 1) requestAnimationFrame(update);
    else el.textContent = target;
  };
  requestAnimationFrame(update);
}
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { animateCounter(e.target); counterObs.unobserve(e.target); }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.cnt').forEach(el => counterObs.observe(el));

/* ── CONTACT FORM → WHATSAPP ── */
document.getElementById('contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const name    = document.getElementById('f-name').value.trim();
  const phone   = document.getElementById('f-phone').value.trim();
  const org     = document.getElementById('f-org').value;
  const service = document.getElementById('f-service').value;
  const desc    = document.getElementById('f-desc').value.trim();
  if (!name || !desc) { alert('يرجى تعبئة الاسم ووصف المشروع'); return; }
  const msg = 'مرحباً، أريد الاستفسار عن خدماتكم 👋\n\n' +
    '👤 الاسم: ' + name + '\n' +
    '📱 الهاتف: ' + (phone || 'غير محدد') + '\n' +
    '🏢 المؤسسة: ' + (org || 'غير محدد') + '\n' +
    '🛠️ الخدمة: ' + (service || 'غير محدد') + '\n' +
    '📝 التفاصيل: ' + desc;
  window.open('https://wa.me/9647706688044?text=' + encodeURIComponent(msg), '_blank');
});

/* ── LANGUAGE TOGGLE ── */
const langBtn   = document.getElementById('lang-btn');
const savedLang = localStorage.getItem('lang') || 'ar';

function applyLanguage(lang) {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
  langBtn.textContent = lang === 'ar' ? 'EN' : 'عر';
  localStorage.setItem('lang', lang);
  document.querySelectorAll('[data-ar]').forEach(el => {
    const val = lang === 'ar' ? el.dataset.ar : el.dataset.en;
    if (!val) return;
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = val;
    } else if (el.tagName === 'OPTION') {
      el.textContent = val;
    } else {
      const hasSvg = [...el.children].some(c => c.tagName === 'SVG');
      if (hasSvg) {
        el.childNodes.forEach(node => {
          if (node.nodeType === 3 && node.textContent.trim()) {
            node.textContent = ' ' + val;
          }
        });
      } else {
        el.textContent = val;
      }
    }
  });
}
applyLanguage(savedLang);
langBtn.addEventListener('click', () => {
  applyLanguage(localStorage.getItem('lang') === 'ar' ? 'en' : 'ar');
});

/* ── SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', ev => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      ev.preventDefault();
      const offset = target.getBoundingClientRect().top + window.scrollY - 76;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  });
});
