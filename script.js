/* ============================================================
   WITNEY MULAUDZI — PORTFOLIO JAVASCRIPT
   script.js
   ============================================================ */


/* ── 1. MOBILE NAV TOGGLE ─ */
const toggle = document.getElementById('navToggle');
const links  = document.getElementById('navLinks');

toggle.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  toggle.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', open);
});

// Close nav when any link is clicked
links.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    links.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', false);
  });
});


/* ── 2. SCROLL REVEAL + SKILL BARS ──────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const el = entry.target;
    el.classList.add('visible');

    // Animate skill bar fill when the card becomes visible
    if (el.classList.contains('skill-card')) {
      const fill  = el.querySelector('.skill-card__fill');
      const level = el.dataset.level || '0';
      setTimeout(() => {
        fill.style.width = level + '%';
      }, 100);
    }

    revealObserver.unobserve(el);
  });
}, { threshold: 0.15 });

// Observe all scroll-reveal elements, skill cards, and project cards
document.querySelectorAll('.reveal, .skill-card, .project-card').forEach(el => {
  revealObserver.observe(el);
});


/* ── 3. ANIMATED NUMBER COUNTERS ─────────────────────────────── */
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const el     = entry.target;
    const target = parseInt(el.dataset.count, 10);
    let current  = 0;
    const step   = Math.ceil(target / 30);

    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current;
      if (current >= target) clearInterval(timer);
    }, 40);

    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => {
  counterObserver.observe(el);
});


/* ── 4. ACTIVE NAV LINK HIGHLIGHT ON SCROLL ─────────────────── */
const sections = document.querySelectorAll('section[id], header[id]');
const navLinks = document.querySelectorAll('.nav__links a');

const highlightNav = () => {
  let current = '';

  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 80) {
      current = sec.id;
    }
  });

  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current
      ? '#ffffff'
      : '';
  });
};

window.addEventListener('scroll', highlightNav, { passive: true });
