import { useEffect, useRef, type RefObject } from 'react';

interface Particle { x: number; y: number; vx: number; vy: number; tx: number; ty: number; r: number; blue: boolean; free: boolean }

const INK = '#12151C';
const LAPIS = '#2340E0';
const FONT = '"Noto Kufi Arabic"';
const CYCLE_MS = 5200;
const REPEL_RADIUS_SQ = 9000;

// Rasterise one phrase off-screen and return the pixel positions its glyphs cover.
function samplePhrase(lines: string[], w: number, h: number, rtl: boolean): [number, number][] {
  const off = document.createElement('canvas');
  off.width = w; off.height = h;
  const o = off.getContext('2d');
  if (!o) return [];
  const narrow = w < 700;
  let size = Math.min(w / (narrow ? 4.6 : 7.4), h / 4.1);
  o.font = `900 ${size}px ${FONT}`;
  const widest = Math.max(...lines.map(l => o.measureText(l).width));
  if (widest > w * .9) { size *= (w * .9) / widest; o.font = `900 ${size}px ${FONT}`; }
  o.direction = rtl ? 'rtl' : 'ltr';
  o.textAlign = rtl ? 'right' : 'left';
  o.textBaseline = 'middle';
  o.fillStyle = '#000';
  const lh = size * 1.3;
  const top = h * (narrow ? .38 : .45) - (lines.length - 1) * lh / 2;
  const edge = Math.max(16, w * .045);
  lines.forEach((l, k) => o.fillText(l, rtl ? w - edge : edge, top + k * lh));
  const data = o.getImageData(0, 0, w, h).data;
  const gap = Math.max(3, Math.round(size / 34));
  const pts: [number, number][] = [];
  for (let y = 0; y < h; y += gap) {
    for (let x = 0; x < w; x += gap) {
      if (data[(y * w + x) * 4 + 3] > 140) pts.push([x + (Math.random() - .5) * 1.2, y + (Math.random() - .5) * 1.2]);
    }
  }
  return pts;
}

/**
 * Ink particles that write each phrase in turn. Returns nothing; drives the canvas
 * and reports the active phrase through onIndex so the hero can show its dots.
 */
export function useInk(canvasRef: RefObject<HTMLCanvasElement>, phrases: string[][], rtl: boolean, active: number, onIndex: (i: number) => void) {
  const state = useRef({ parts: [] as Particle[], targets: [] as [number, number][][], w: 0, h: 0, idx: 0 });
  const goRef = useRef<(i: number, burst: boolean) => void>(() => {});
  const restartRef = useRef<() => void>(() => {});

  useEffect(() => {
    const cv = canvasRef.current;
    const ctx = cv?.getContext('2d');
    if (!cv || !ctx) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const s = state.current;
    const mouse = { x: -9999, y: -9999 };
    let raf = 0;
    let timer = 0;
    let cancelled = false;

    const render = (snap: boolean) => {
      ctx.clearRect(0, 0, s.w, s.h);
      for (const p of s.parts) {
        if (snap) { p.x = p.tx; p.y = p.ty; } else {
          const dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx * dx + dy * dy;
          if (d2 < REPEL_RADIUS_SQ) { const f = (REPEL_RADIUS_SQ - d2) / REPEL_RADIUS_SQ * 3.2; const d = Math.sqrt(d2) || 1; p.vx += dx / d * f; p.vy += dy / d * f; }
          p.vx += (p.tx - p.x) * .028; p.vy += (p.ty - p.y) * .028;
          p.vx *= .84; p.vy *= .84; p.x += p.vx; p.y += p.vy;
        }
        ctx.globalAlpha = p.free ? .04 : 1;
        ctx.fillStyle = p.blue ? LAPIS : INK;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const go = (i: number, burst: boolean) => {
      s.idx = i;
      const t = s.targets[i] ?? [];
      const order = s.parts.map((_, k) => k).sort(() => Math.random() - .5);
      order.forEach((k, j) => {
        const p = s.parts[k];
        if (j < t.length) { p.tx = t[j][0]; p.ty = t[j][1]; p.free = false; }
        else { p.free = true; p.tx = Math.random() * s.w; p.ty = Math.random() * s.h * .6; }
        if (burst) { p.vx += (Math.random() - .5) * 18; p.vy += (Math.random() - .5) * 18; }
      });
      onIndex(i);
      if (reduce) render(true);
    };
    goRef.current = go;

    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      s.w = cv.clientWidth; s.h = cv.clientHeight;
      cv.width = s.w * dpr; cv.height = s.h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      s.targets = phrases.map(p => samplePhrase(p, s.w, s.h, rtl));
      const n = Math.max(...s.targets.map(t => t.length));
      const old = s.parts;
      s.parts = Array.from({ length: n }, (_, i) => old[i] ?? { x: Math.random() * s.w, y: Math.random() * s.h, vx: 0, vy: 0, tx: 0, ty: 0, r: Math.random() < .05 ? 2.2 : 1 + Math.random() * .8, blue: Math.random() < .07, free: false });
      go(Math.min(s.idx, phrases.length - 1), false);
    };

    const loop = () => { render(false); raf = requestAnimationFrame(loop); };
    const restart = () => { window.clearInterval(timer); if (!reduce) timer = window.setInterval(() => go((s.idx + 1) % phrases.length, true), CYCLE_MS); };
    const onMove = (e: PointerEvent) => { const r = cv.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    let resizeT = 0;
    const onResize = () => { window.clearTimeout(resizeT); resizeT = window.setTimeout(setup, 150); };

    cv.addEventListener('pointermove', onMove);
    cv.addEventListener('pointerleave', onLeave);
    window.addEventListener('resize', onResize);

    const fontReady: Promise<unknown> = document.fonts ? document.fonts.load(`900 80px ${FONT}`, rtl ? 'نبني' : 'Build') : Promise.resolve();
    fontReady.catch(() => undefined).then(() => {
      if (cancelled) return;
      s.idx = 0;
      setup();
      render(true); // first frame already reads as words
      if (!reduce) { loop(); restart(); }
    });
    restartRef.current = restart;

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.clearInterval(timer);
      window.clearTimeout(resizeT);
      cv.removeEventListener('pointermove', onMove);
      cv.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('resize', onResize);
    };
    // phrases/rtl change with language; onIndex is a stable state setter
  }, [canvasRef, phrases, rtl]);

  // Let the dots jump to a phrase.
  useEffect(() => {
    if (active !== state.current.idx && state.current.parts.length) {
      goRef.current(active, true);
      restartRef.current();
    }
  }, [active]);
}
