(() => {
  'use strict';

  /* ---------- 25-frame gaze engine ---------- */
  const canvas = document.getElementById('characterCanvas');
  const ctx = canvas.getContext('2d');
  const frameCache = {};
  const IDLE = { row: 3, col: 4 };
  let current = { ...IDLE };
  let drawn = null;          // key of the frame currently on canvas
  let queued = false;

  const preload = () => Promise.all(
    Array.from({ length: 25 }, (_, i) => {
      const r = Math.floor(i / 5) + 1, c = (i % 5) + 1, key = `${r}-${c}`;
      return new Promise(res => {
        const img = new Image();
        img.onload = img.onerror = () => { frameCache[key] = img; res(); };
        img.src = `assets/frames/r${r}c${c}.jpg`;
      });
    })
  );

  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    drawn = null;
    schedule();
  }

  function drawCurrentFrame() {
    queued = false;
    const key = `${current.row}-${current.col}`;
    if (key === drawn) return;
    const img = frameCache[key];
    if (!img || !img.naturalWidth) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    drawn = key;
  }
  function schedule() { if (!queued) { queued = true; requestAnimationFrame(drawCurrentFrame); } }

  function setFromPoint(clientX, clientY) {
    const normX = clientX / window.innerWidth;
    const normY = clientY / window.innerHeight;

    const col = normX < 0.20 ? 1 : normX < 0.40 ? 2 : normX < 0.60 ? 3 : normX < 0.80 ? 4 : 5;
    const row = normY < 0.20 ? 1 : normY < 0.40 ? 2 : normY < 0.60 ? 3 : normY < 0.80 ? 4 : 5;

    const next = { col, row };
    if (next.col !== current.col || next.row !== current.row) { current = next; schedule(); }
  }
  function setIdle() {
    if (current.row !== IDLE.row || current.col !== IDLE.col) { current = { ...IDLE }; schedule(); }
  }

  // Touch / coarse pointers: pan to look, plus an ambient loop when untouched.
  const coarse = matchMedia('(pointer: coarse)').matches;
  const AMBIENT = [[3,4],[2,3],[2,4],[3,5],[4,4],[4,5],[3,4],[3,2],[3,3],[4,3]];
  let ambientTimer = null, ambientIdx = 0, lastTouch = 0;
  function startAmbient() {
    if (ambientTimer) return;
    ambientTimer = setInterval(() => {
      if (Date.now() - lastTouch < 3000 || document.hidden) return;
      const [row, col] = AMBIENT[ambientIdx++ % AMBIENT.length];
      current = { row, col }; schedule();
    }, 1600);
  }

  function bindTracking() {
    if (!coarse) {
      window.addEventListener('mousemove', e => setFromPoint(e.clientX, e.clientY), { passive: true });
      document.addEventListener('mouseleave', setIdle);
      window.addEventListener('blur', setIdle);
    }
    const touch = e => {
      lastTouch = Date.now();
      const t = e.touches[0];
      if (t) setFromPoint(t.clientX, t.clientY);
    };
    window.addEventListener('touchstart', touch, { passive: true });
    window.addEventListener('touchmove', touch, { passive: true });
    if (coarse || matchMedia('(max-width: 1024px)').matches) startAmbient();
  }

  window.addEventListener('resize', resizeCanvas);
  preload().then(() => { resizeCanvas(); bindTracking(); });   // listeners bind only after all 25 frames are cached

  /* ---------- Navigation ---------- */
  const nav = document.getElementById('nav');
  const burger = document.getElementById('burger');
  const setMenu = open => {
    nav.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };
  burger.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
  document.querySelectorAll('#navLinks a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => e.key === 'Escape' && setMenu(false));

  document.getElementById('toTop').addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Scroll reveals (staggered) ---------- */
  document.querySelectorAll('.reveal').forEach(el => {
    const siblings = [...el.parentElement.children].filter(c => c.classList.contains('reveal'));
    el.style.setProperty('--i', siblings.indexOf(el));
  });
  document.querySelectorAll('.steps li').forEach(el => el.classList.add('reveal'));
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
  }), { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();
