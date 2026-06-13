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
});
