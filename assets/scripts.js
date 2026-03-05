// ============================================================
// DARK MODE
// ============================================================
(function () {
  var html = document.documentElement;
  var toggle = document.getElementById('theme-toggle');

  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (toggle) {
      toggle.textContent = theme === 'dark' ? '☀️' : '🌙';
      toggle.setAttribute('aria-label', theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
    }
  }

  var stored   = localStorage.getItem('theme');
  var preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  setTheme(stored || preferred);

  if (toggle) {
    toggle.addEventListener('click', function () {
      var current = html.getAttribute('data-theme');
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  }
})();

// ============================================================
// MOBILE NAV TOGGLE
// ============================================================
(function () {
  var navToggle = document.getElementById('nav-toggle');
  var navLinks  = document.getElementById('nav-links');

  if (!navToggle || !navLinks) return;

  navToggle.addEventListener('click', function () {
    var isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));

    var icon = navToggle.querySelector('i');
    if (icon) icon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
  });

  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      var icon = navToggle.querySelector('i');
      if (icon) icon.className = 'fas fa-bars';
    });
  });
})();

// ============================================================
// INTERSECTION OBSERVER — SCROLL ANIMATIONS
// ============================================================
(function () {
  if (!('IntersectionObserver' in window)) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-in').forEach(function (el) {
    observer.observe(el);
  });

  document.querySelectorAll('.post-card').forEach(function (card, index) {
    card.style.transitionDelay = (index * 80) + 'ms';
    observer.observe(card);
  });
})();

// ============================================================
// SMOOTH SCROLL for anchor links
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
