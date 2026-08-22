/* ═══ Jason Pan · Portfolio Script ═══ */

/* ── Ambient BG Canvas (stars + cursor trail) ── */
function initBgCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H;

  const STAR_COUNT = 140;
  const stars = [];
  const CURSOR_TRAIL_LEN = 22;
  const cursorPts = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x:     Math.random(),
      y:     Math.random(),
      r:     Math.random() * 1.1 + 0.25,
      a:     Math.random(),
      da:    (Math.random() * 0.4 + 0.15) * (Math.random() < 0.5 ? 1 : -1),
      speed: Math.random() * 0.006 + 0.002,
    });
  }

  document.addEventListener('mousemove', e => {
    cursorPts.push({ x: e.clientX, y: e.clientY });
    if (cursorPts.length > CURSOR_TRAIL_LEN) cursorPts.shift();
  });

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Stars
    for (const s of stars) {
      s.a += s.da * 0.012;
      s.y += s.speed * 0.0004;
      if (s.y > 1) s.y = 0;
      const alpha = (Math.sin(s.a) * 0.5 + 0.5) * 0.55 + 0.08;
      ctx.beginPath();
      ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200,210,230,${alpha})`;
      ctx.fill();
    }

    // Cursor trail
    for (let i = 0; i < cursorPts.length; i++) {
      const p    = cursorPts[i];
      const prog = i / CURSOR_TRAIL_LEN;
      ctx.beginPath();
      ctx.arc(p.x, p.y, prog * 5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(230,57,70,${prog * 0.5})`;
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }
  draw();
}

/* ── Scroll Reveal ── */
function initReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('shown');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

/* ── Active Nav Link ── */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-link');

  function setActive() {
    const scrollY = window.scrollY + 120;
    let current = '';
    sections.forEach(s => { if (scrollY >= s.offsetTop) current = s.id; });
    links.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href').slice(1) === current);
    });
  }

  window.addEventListener('scroll', setActive, { passive: true });
  setActive();
}

/* ── Smooth Scroll ── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* ── Contact Form ── */
function initContactForm() {
  const form   = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (!form || !status) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending…';

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' },
      });
      if (res.ok) {
        status.textContent = '✓ Message sent! I\'ll reply soon.';
        status.className = 'form-status success';
        form.reset();
      } else {
        throw new Error();
      }
    } catch {
      status.textContent = '✗ Something went wrong — try emailing directly.';
      status.className = 'form-status error';
    }

    btn.disabled = false;
    btn.textContent = 'Send Message';
    setTimeout(() => {
      status.textContent = '';
      status.className = 'form-status';
    }, 5000);
  });
}

/* ── Section Pokémon Info Fan ── */
function initSectionBadge() {
  const badge = document.getElementById('section-badge');
  if (!badge) return;

  // Individually-cropped type icons (cut from images/pokemon-types.png).
  const TYPE_ICON_FILE = {
    grass:    'images/type-grass.png',
    fire:     'images/type-fire.png',
    water:    'images/type-water.png',
    electric: 'images/type-electric.png',
    normal:   'images/type-normal.png', // Colorless icon stands in for Normal type
  };

  const POKEMON = {
    home:       { dex: '025', name: 'PIKACHU',    type: 'Electric', color: '#f5c518', colorRgb: '245,197,24', ht: '0.4m', wt: '6.0kg' },
    projects:   { dex: '004', name: 'CHARMANDER', type: 'Fire',     color: '#ff6432', colorRgb: '255,100,50', ht: '0.6m', wt: '8.5kg' },
    experience: { dex: '001', name: 'BULBASAUR',  type: 'Grass',    color: '#78c850', colorRgb: '120,200,80', ht: '0.7m', wt: '6.9kg' },
    interests:  { dex: '007', name: 'SQUIRTLE',   type: 'Water',    color: '#6ab8f7', colorRgb: '106,184,247', ht: '0.5m', wt: '9.0kg' },
    contact:    { dex: '133', name: 'EEVEE',      type: 'Normal',   color: '#c8a878', colorRgb: '200,168,120', ht: '0.3m', wt: '6.5kg' },
  };

  const sections = document.querySelectorAll('section[id]');
  let currentId = '';

  function update() {
    const mid = window.scrollY + window.innerHeight * 0.5;
    let next = 'home';
    sections.forEach(s => { if (mid >= s.offsetTop) next = s.id; });
    if (next === currentId) return;
    currentId = next;

    const p = POKEMON[next];
    if (!p) return;
    badge.style.setProperty('--badge-color', p.color);
    badge.style.setProperty('--badge-color-rgb', p.colorRgb);
    const iconFile = TYPE_ICON_FILE[p.type.toLowerCase()];
    badge.innerHTML = `
      <div class="sb-inner">
        <div class="sb-top">
          <span class="sb-icon" style="background-image:url('${iconFile}')"></span>
          <div class="sb-text">
            <span class="sb-dex">No. ${p.dex}</span>
            <span class="sb-name">${p.name}</span>
            <span class="sb-type">${p.type}</span>
          </div>
        </div>
        <div class="sb-divider"></div>
        <div class="sb-stats">
          <span class="sb-stat"><span class="sb-stat-label">HT</span> ${p.ht}</span>
          <span class="sb-stat"><span class="sb-stat-label">WT</span> ${p.wt}</span>
        </div>
      </div>`;
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* ── Stagger card reveals ── */
function initStagger() {
  document.querySelectorAll('.proj-grid, .contact-cards').forEach(grid => {
    grid.querySelectorAll('.reveal').forEach((c, i) => {
      c.style.transitionDelay = `${i * 90}ms`;
    });
  });
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  initBgCanvas();
  initReveal();
  initActiveNav();
  initSmoothScroll();
  initContactForm();
  initStagger();
  initSectionBadge();
});
