/* ============================================================
   RoxFit — Global JS (nav, scroll, animations, modal, quiz)
   ============================================================ */

/* ── NAV scroll effect ─────────────────────────────────── */
(function () {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 30);
  });

  /* Hamburger */
  const burger = document.querySelector('.hamburger');
  const mobMenu = document.querySelector('.mob-menu');
  if (burger && mobMenu) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      mobMenu.classList.toggle('open');
    });
    mobMenu.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        burger.classList.remove('open');
        mobMenu.classList.remove('open');
      })
    );
  }

  /* Mark active nav link */
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href.includes(page) || (page === 'index.html' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

/* ── Scroll-reveal animations ──────────────────────────── */
(function () {
  const els = document.querySelectorAll('.fade-up');
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
})();

/* ── Testimonial slider ─────────────────────────────────── */
(function () {
  const track = document.querySelector('.testimonials-track');
  const dots = document.querySelectorAll('.slider-dots .dot');
  if (!track || !dots.length) return;

  const cards = track.querySelectorAll('.testimonial-card');
  let current = 0;

  function goTo(i) {
    current = i;
    const w = cards[0].offsetWidth + 24; // card + gap
    track.style.transform = `translateX(-${i * w}px)`;
    dots.forEach((d, idx) => d.classList.toggle('active', idx === i));
  }

  dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));

  // Auto-advance
  let timer = setInterval(() => goTo((current + 1) % dots.length), 4200);
  track.addEventListener('mouseenter', () => clearInterval(timer));
  track.addEventListener('mouseleave', () => {
    timer = setInterval(() => goTo((current + 1) % dots.length), 4200);
  });

  // Recalc on resize
  window.addEventListener('resize', () => goTo(current));
})();

/* ── Auth modal ─────────────────────────────────────────── */
(function () {
  const overlay = document.getElementById('authModal');
  if (!overlay) return;
  const modal = overlay.querySelector('.modal');
  const closeBtn = overlay.querySelector('.modal-close');
  const tabs = overlay.querySelectorAll('.tab-btn');
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');

  function openModal(mode) {
    overlay.classList.add('open');
    switchTab(mode || 'signup');
  }
  function closeModal() { overlay.classList.remove('open'); }

  function switchTab(mode) {
    tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === mode));
    if (loginForm) loginForm.style.display = mode === 'login' ? 'block' : 'none';
    if (signupForm) signupForm.style.display = mode === 'signup' ? 'block' : 'none';
  }

  tabs.forEach(t => t.addEventListener('click', () => switchTab(t.dataset.tab)));
  closeBtn?.addEventListener('click', closeModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });

  // Expose globally
  window.openAuthModal = openModal;
  window.closeAuthModal = closeModal;

  // Wire all CTA buttons that say "join" or "buy"
  document.querySelectorAll('[data-auth]').forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.dataset.auth || 'signup'));
  });

  // Handle form submission (demo)
  [loginForm, signupForm].forEach(form => {
    form?.addEventListener('submit', e => {
      e.preventDefault();
      const email = form.querySelector('input[type="email"]').value;
      const name = form.querySelector('input[name="name"]')?.value || email.split('@')[0];
      localStorage.setItem('roxfit_user', JSON.stringify({ name, email }));
      closeModal();
      window.location.href = 'dashboard.html';
    });
  });
})();

/* ── Quiz ───────────────────────────────────────────────── */
(function () {
  const quizBtn = document.getElementById('quizBtn');
  const quizModal = document.getElementById('quizModal');
  if (!quizBtn || !quizModal) return;

  const questions = [
    { q: 'What is your main fitness goal?', opts: ['Lose weight & tone up', 'Build strength & muscle', 'Improve flexibility & wellness', 'Postnatal recovery'] },
    { q: 'How much time can you spare daily?', opts: ['15–20 minutes', '30–45 minutes', '60+ minutes', 'It varies'] },
    { q: 'What equipment do you have?', opts: ['Nothing — home bodyweight', 'Light dumbbells & bands', 'Full gym access', 'Some home gear'] },
    { q: 'What is your current fitness level?', opts: ['Complete beginner', 'Some experience', 'Intermediate', 'Advanced'] },
  ];

  const results = [
    { name: 'Burn & Sculpt', emoji: '🔥', desc: 'Perfect for beginners aiming to drop weight with zero equipment.' },
    { name: 'Strong & Defined', emoji: '💪', desc: 'Build lean muscle and feel powerfully feminine.' },
    { name: 'Flex & Flow', emoji: '🧘', desc: 'Restore balance, flexibility and inner calm.' },
    { name: 'Post-Baby Restore', emoji: '🌸', desc: 'Gentle, safe recovery designed for new mums.' },
  ];

  let step = 0;
  let answers = [];

  const closeBtn = quizModal.querySelector('.modal-close');
  const overlay = quizModal;

  quizBtn.addEventListener('click', () => { step = 0; answers = []; renderStep(); overlay.classList.add('open'); });
  closeBtn.addEventListener('click', () => overlay.classList.remove('open'));
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.classList.remove('open'); });

  function renderStep() {
    const body = quizModal.querySelector('.quiz-body');
    if (step >= questions.length) {
      const goalIdx = answers[0] ?? 0;
      const r = results[Math.min(goalIdx, results.length - 1)];
      body.innerHTML = `
        <div class="quiz-result">
          <div class="quiz-result-icon">${r.emoji}</div>
          <h3>Your perfect match is<br><span style="color:var(--rose-deep)">${r.name}</span>!</h3>
          <p>${r.desc}</p>
          <a href="programs.html" class="btn btn-primary btn-lg" style="margin-top:8px">View Program →</a>
        </div>`;
      return;
    }
    const q = questions[step];
    const dotsHTML = questions.map((_, i) =>
      `<div class="quiz-dot ${i < step ? 'done' : i === step ? 'active' : ''}"></div>`
    ).join('');

    body.innerHTML = `
      <div class="quiz-dots">${dotsHTML}</div>
      <div class="quiz-q">${q.q}</div>
      <div class="quiz-options">
        ${q.opts.map((o, i) => `<button class="quiz-opt" data-idx="${i}">${o}</button>`).join('')}
      </div>
      <div style="text-align:center;margin-top:14px;font-size:.78rem;color:var(--muted)">
        Question ${step + 1} of ${questions.length}
      </div>`;

    body.querySelectorAll('.quiz-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        answers.push(+btn.dataset.idx);
        step++;
        renderStep();
      });
    });
  }
})();

/* ── Email subscribe ─────────────────────────────────────── */
(function () {
  document.querySelectorAll('.subscribe-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const input = form.querySelector('input');
      if (!input.value) return;
      form.innerHTML = `<div style="color:#fff;font-weight:600;font-size:.95rem;text-align:center;padding:14px">🎉 You're in! Check your inbox for your free guide.</div>`;
    });
  });
})();

/* ── Contact form ───────────────────────────────────────── */
(function () {
  const form = document.getElementById('contactForm');
  const success = document.getElementById('contactSuccess');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    form.style.display = 'none';
    if (success) success.classList.add('show');
  });
})();

/* ── Filter tabs (programs page) ────────────────────────── */
(function () {
  const tabs = document.querySelectorAll('.filter-btn');
  if (!tabs.length) return;
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.dataset.filter;
      document.querySelectorAll('.prog-card').forEach(card => {
        const match = cat === 'all' || card.dataset.category === cat;
        card.style.display = match ? 'block' : 'none';
      });
    });
  });
})();

/* ── Sticky bar (detail page) ───────────────────────────── */
(function () {
  const bar = document.querySelector('.sticky-bar');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    bar.classList.toggle('show', window.scrollY > 500);
  });
})();

/* ── Dashboard ──────────────────────────────────────────── */
(function () {
  const wrap = document.querySelector('.dash-wrap');
  if (!wrap) return;

  // Load user
  const stored = JSON.parse(localStorage.getItem('roxfit_user') || '{}');
  document.querySelectorAll('.dash-user-name').forEach(el => el.textContent = stored.name || 'Queen');
  document.querySelectorAll('.dash-user-email').forEach(el => el.textContent = stored.email || '');
  document.querySelectorAll('.greeting-name').forEach(el => el.textContent = stored.name || 'Queen');

  // Sidebar nav
  const navItems = document.querySelectorAll('.dash-nav-item');
  const panels = document.querySelectorAll('.dash-panel');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');
      const target = item.dataset.panel;
      panels.forEach(p => p.style.display = p.id === target ? 'block' : 'none');
    });
  });

  // Animate progress bars
  setTimeout(() => {
    document.querySelectorAll('.bar-fill').forEach(bar => {
      bar.style.width = bar.dataset.pct + '%';
    });
  }, 300);

  // Logout
  document.querySelectorAll('.dash-logout').forEach(btn => {
    btn.addEventListener('click', () => {
      localStorage.removeItem('roxfit_user');
      window.location.href = 'index.html';
    });
  });
})();
