// ===== EMBEDDED LOGO (base64 — works on any host, no path issues) =====
const LOGO_DATA ="logo.png"
document.querySelectorAll('#nav-logo-img, #hero-logo, #footer-logo').forEach(img => {
  img.src = LOGO_DATA;
});

// ===== CUSTOM CURSOR =====
const cursor      = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursor-trail');
let mx = 0, my = 0, tx = 0, ty = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});
function animTrail() {
  tx += (mx - tx) * 0.14;
  ty += (my - ty) * 0.14;
  cursorTrail.style.left = tx + 'px';
  cursorTrail.style.top  = ty + 'px';
  requestAnimationFrame(animTrail);
}
animTrail();
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.style.width='22px'; cursor.style.height='22px'; });
  el.addEventListener('mouseleave', () => { cursor.style.width='14px'; cursor.style.height='14px'; });
});

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const navLinks   = document.getElementById('nav-links');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// ===== PARTICLE CANVAS =====
(function() {
  const canvas = document.getElementById('particles-canvas');
  const ctx    = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  for (let i = 0; i < 60; i++) {
    particles.push({
      x: Math.random() * 1920, y: Math.random() * 1080,
      r: Math.random() * 1.5 + .4,
      vx: (Math.random() - .5) * .4,
      vy: (Math.random() - .5) * .4,
      a: Math.random()
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(72,217,110,' + (.15 + p.a * .2) + ')';
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

// ===== COUNTDOWN =====
function updateCountdown() {
  const end  = new Date('2025-05-01T23:59:59');
  const now  = new Date();
  const diff = end - now;
  if (diff <= 0) {
    document.getElementById('countdown-box') && (document.getElementById('countdown-box').innerHTML = '<p style="font-family:Anton,sans-serif;font-size:1.8rem;color:var(--gold)">Offer Ended</p>');
    return;
  }
  const d = Math.floor(diff / 864e5);
  const h = Math.floor((diff % 864e5) / 36e5);
  const m = Math.floor((diff % 36e5) / 6e4);
  const s = Math.floor((diff % 6e4) / 1e3);
  const f = n => String(n).padStart(2,'0');
  document.getElementById('cd-days').textContent  = f(d);
  document.getElementById('cd-hours').textContent = f(h);
  document.getElementById('cd-mins').textContent  = f(m);
  document.getElementById('cd-secs').textContent  = f(s);
}
updateCountdown();
setInterval(updateCountdown, 1000);

// ===== SCROLL REVEAL =====
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ===== COUNTER ANIMATION =====
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el  = e.target;
    const val = parseInt(el.dataset.val);
    if (!val) return;
    let start = 0;
    const step = val / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= val) { el.textContent = val.toLocaleString(); clearInterval(timer); }
      else el.textContent = Math.floor(start).toLocaleString();
    }, 16);
    counterObs.unobserve(el);
  });
}, { threshold: .5 });
document.querySelectorAll('.stat-num[data-val]').forEach(el => counterObs.observe(el));
