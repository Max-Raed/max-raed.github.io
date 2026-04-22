/* ════════════════════════════════════
   PORTFOLIO — main.js
   ════════════════════════════════════ */

/* ── Mobile nav toggle ── */
const navToggle = document.querySelector('.nav-toggle');
const navLinks  = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', open);
  });
  navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
    })
  );
}

/* ── Active nav link on scroll ── */
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionIO = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navAnchors.forEach(a =>
        a.classList.toggle('active', a.getAttribute('href') === `#${id}`)
      );
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionIO.observe(s));

/* ── Animated counters ── */
const counters = document.querySelectorAll('[data-count]');

const counterIO = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      runCounter(entry.target);
      counterIO.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach(el => counterIO.observe(el));

function runCounter(el) {
  const target   = parseInt(el.dataset.count, 10);
  const suffix   = el.dataset.suffix || '';
  const duration = 1800;
  const start    = Date.now();

  const tick = () => {
    const t = Math.min((Date.now() - start) / duration, 1);
    const v = 1 - Math.pow(1 - t, 3);          /* ease-out cubic */
    el.querySelector('.counter-val').textContent = Math.floor(v * target);
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/* ── Education / Skills tabs ── */
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tabId = btn.dataset.tab;
    const scope = btn.closest('.section-inner');

    scope.querySelectorAll('.tab-btn').forEach(b =>
      b.classList.toggle('active', b === btn)
    );
    scope.querySelectorAll('.tab-panel').forEach(p =>
      p.classList.toggle('active', p.id === tabId)
    );
  });
});

/* ── Contact form (Formspree AJAX) ── */
const form       = document.querySelector('.contact-form');
const successBox = document.getElementById('form-success');

if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();

    const action = form.action;
    if (action.includes('YOUR_FORM_ID')) {
      alert(
        'Set up Formspree first:\n' +
        '1. Go to https://formspree.io and create a free account\n' +
        '2. Create a new form with email: hci.uniulm@gmail.com\n' +
        '3. Replace YOUR_FORM_ID in index.html with your actual ID'
      );
      return;
    }

    const btn = form.querySelector('button[type="submit"]');
    const orig = btn.textContent;
    btn.textContent = 'Sending…';
    btn.disabled = true;

    try {
      const res = await fetch(action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        form.reset();
        if (successBox) successBox.hidden = false;
      } else {
        alert('Something went wrong. Please try again or email me directly.');
      }
    } catch {
      alert('Network error. Please email me at hci.uniulm@gmail.com');
    } finally {
      btn.textContent = orig;
      btn.disabled = false;
    }
  });
}
