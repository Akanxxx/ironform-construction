'use strict';

// NAVBAR SCROLL
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// BURGER MENU
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
burger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  burger.setAttribute('aria-expanded', isOpen);
  const spans = burger.querySelectorAll('span');
  if (isOpen) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    const spans = burger.querySelectorAll('span');
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// SCROLL REVEAL
const revealTargets = document.querySelectorAll(
  '.service-card, .project-card, .team-card, .stat, .section-header'
);
revealTargets.forEach(el => el.classList.add('reveal'));
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const siblings = [...entry.target.parentElement.children];
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => entry.target.classList.add('visible'), idx * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
revealTargets.forEach(el => revealObserver.observe(el));

// TESTIMONIAL CAROUSEL
const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.dot');
let current = 0;
let timer;

function goToSlide(index) {
  testimonials[current].classList.remove('active');
  dots[current].classList.remove('active');
  current = (index + testimonials.length) % testimonials.length;
  testimonials[current].classList.add('active');
  dots[current].classList.add('active');
}

function startTimer() {
  timer = setInterval(() => goToSlide(current + 1), 5000);
}
function stopTimer() { clearInterval(timer); }

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    stopTimer();
    goToSlide(parseInt(dot.dataset.index));
    startTimer();
  });
});
startTimer();

// HERO PARALLAX
const heroBg = document.querySelector('.hero-bg img');
window.addEventListener('scroll', () => {
  if (!heroBg) return;
  if (window.scrollY < window.innerHeight) {
    heroBg.style.transform = `translateY(${window.scrollY * 0.25}px)`;
  }
}, { passive: true });

// STAT COUNTER ANIMATION
function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const text = el.textContent;
    const num = parseFloat(text.replace(/[^0-9.]/g, ''));
    const suffix = text.replace(/[0-9.]/g, '');
    if (isNaN(num)) return;
    const duration = 1800;
    const start = performance.now();
    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const val = Number.isInteger(num)
        ? Math.round(num * ease)
        : (num * ease).toFixed(1);
      el.textContent = val + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  });
}

const statsEl = document.querySelector('.hero-stats');
if (statsEl) {
  new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animateCounters();
    }
  }, { threshold: 0.5 }).observe(statsEl);
}

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = navbar.offsetHeight + 16;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

console.log('%cIRONFORM', 'font-size:2rem;font-weight:900;color:#e8c547;');
console.log('%cBuilt to Last.', 'color:#9898a6;');
// DARK / LIGHT MODE TOGGLE
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check saved preference
if (localStorage.getItem('theme') === 'light') {
  body.classList.add('light');
  themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('light');
  if (body.classList.contains('light')) {
    themeToggle.textContent = '☀️';
    localStorage.setItem('theme', 'light');
  } else {
    themeToggle.textContent = '🌙';
    localStorage.setItem('theme', 'dark');
  }
});