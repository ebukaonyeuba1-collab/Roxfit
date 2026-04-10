/* ============================================================
   RoxFit — Shared layout (nav + footer injected into every page)
   ============================================================ */

(function () {
  /* ── NAV ──────────────────────────────────────────── */
  const NAV = `
<nav class="nav">
  <a href="index.html" class="nav-logo">Rox<span>Fit</span></a>
  <div class="nav-links">
    <a href="programs.html" class="nav-link">Programs</a>
    <a href="ebooks.html"   class="nav-link">Ebooks</a>
    <a href="about.html"    class="nav-link">About</a>
    <a href="contact.html"  class="nav-link">Contact</a>
  </div>
  <div class="nav-actions">
    <button class="btn btn-outline btn-sm" onclick="openAuthModal('login')">Log In</button>
    <button class="btn btn-primary btn-sm" onclick="openAuthModal('signup')">Join Now</button>
  </div>
  <div class="hamburger" id="burger">
    <span></span><span></span><span></span>
  </div>
</nav>

<div class="mob-menu" id="mobMenu">
  <a href="programs.html" class="nav-link">Programs</a>
  <a href="ebooks.html"   class="nav-link">Ebooks</a>
  <a href="about.html"    class="nav-link">About</a>
  <a href="contact.html"  class="nav-link">Contact</a>
  <button class="btn btn-primary btn-lg" onclick="openAuthModal('signup')">Join Now ✨</button>
</div>`;

  /* ── FOOTER ───────────────────────────────────────── */
  const FOOTER = `
<footer class="footer">
  <div class="footer-grid">
    <div>
      <div class="footer-logo">Rox<span>Fit</span></div>
      <p class="footer-desc">The premium women's fitness platform built for African women who are done settling.</p>
      <div class="socials" style="margin-top:20px">
        <div class="social-icon">📸</div>
        <div class="social-icon">🎵</div>
        <div class="social-icon">▶️</div>
        <div class="social-icon">💬</div>
      </div>
    </div>
    <div class="footer-col">
      <h5>Programs</h5>
      <a href="programs.html">Burn & Sculpt</a>
      <a href="programs.html">Strong & Defined</a>
      <a href="programs.html">Flex & Flow</a>
      <a href="programs.html">Home Warrior</a>
    </div>
    <div class="footer-col">
      <h5>Company</h5>
      <a href="about.html">About Roxy</a>
      <a href="contact.html">Contact</a>
      <a href="#">Press</a>
      <a href="#">Careers</a>
    </div>
    <div class="footer-col">
      <h5>Support</h5>
      <a href="#">Help Centre</a>
      <a href="#">Privacy Policy</a>
      <a href="#">Terms of Service</a>
      <a href="dashboard.html">My Dashboard</a>
    </div>
  </div>
  <div class="footer-bottom">
    <span>© 2025 RoxFit. All rights reserved.</span>
    <span>Made with 💗 for women who hustle</span>
  </div>
</footer>`;

  /* ── AUTH MODAL ───────────────────────────────────── */
  const AUTH_MODAL = `
<div class="modal-overlay" id="authModal">
  <div class="modal">
    <button class="modal-close" onclick="closeAuthModal()">✕</button>
    <div style="text-align:center;margin-bottom:24px">
      <div style="font-size:2rem;margin-bottom:8px">💗</div>
      <h3 style="font-size:1.5rem">Welcome to RoxFit</h3>
      <p style="color:var(--muted);font-size:.85rem;margin-top:5px">Start your transformation today</p>
    </div>
    <div class="tab-row">
      <button class="tab-btn" data-tab="signup">Sign Up</button>
      <button class="tab-btn active" data-tab="login">Log In</button>
    </div>
    <form id="signupForm" style="display:none">
      <div class="form-group">
        <label class="form-label">Full Name</label>
        <input class="form-input" name="name" placeholder="e.g. Adaeze Nneka" required>
      </div>
      <div class="form-group">
        <label class="form-label">Email Address</label>
        <input class="form-input" type="email" placeholder="you@email.com" required>
      </div>
      <div class="form-group">
        <label class="form-label">Password</label>
        <input class="form-input" type="password" placeholder="••••••••" required>
      </div>
      <button type="submit" class="btn btn-primary" style="width:100%;justify-content:center;margin-top:4px">
        Create My Account 🚀
      </button>
    </form>
    <form id="loginForm" style="display:block">
      <div class="form-group">
        <label class="form-label">Email Address</label>
        <input class="form-input" type="email" placeholder="you@email.com" required>
      </div>
      <div class="form-group">
        <label class="form-label">Password</label>
        <input class="form-input" type="password" placeholder="••••••••" required>
      </div>
      <button type="submit" class="btn btn-primary" style="width:100%;justify-content:center;margin-top:4px">
        Log In →
      </button>
    </form>
  </div>
</div>`;

  /* ── QUIZ MODAL ───────────────────────────────────── */
  const QUIZ_MODAL = `
<div class="modal-overlay" id="quizModal">
  <div class="modal" style="max-width:530px">
    <button class="modal-close">✕</button>
    <div style="font-family:var(--font-h);color:var(--rose-deep);font-size:.95rem;margin-bottom:10px">Find Your Perfect Plan ✨</div>
    <div class="quiz-body"></div>
  </div>
</div>`;

  /* ── INJECT ───────────────────────────────────────── */
  document.body.insertAdjacentHTML('afterbegin', NAV);
  document.body.insertAdjacentHTML('beforeend', FOOTER);
  document.body.insertAdjacentHTML('beforeend', AUTH_MODAL);
  document.body.insertAdjacentHTML('beforeend', QUIZ_MODAL);

  /* hamburger wiring (needs DOM ready) */
  document.addEventListener('DOMContentLoaded', () => {
    const burger = document.getElementById('burger');
    const mob = document.getElementById('mobMenu');
    burger?.addEventListener('click', () => {
      burger.classList.toggle('open');
      mob.classList.toggle('open');
    });
  });
})();
