// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== COUNTDOWN TIMER =====
function updateCountdown() {
  const deadline = new Date('2025-05-01T23:59:59');
  const now      = new Date();
  const diff     = deadline - now;

  if (diff <= 0) {
    document.getElementById('countdown').innerHTML =
      '<p style="font-family:\'Bebas Neue\',sans-serif;font-size:2rem;color:var(--gold)">Offer Ended</p>';
    return;
  }

  const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secs  = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById('cd-days').textContent  = String(days).padStart(2,'0');
  document.getElementById('cd-hours').textContent = String(hours).padStart(2,'0');
  document.getElementById('cd-mins').textContent  = String(mins).padStart(2,'0');
  document.getElementById('cd-secs').textContent  = String(secs).padStart(2,'0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ===== INTERSECTION OBSERVER — fade-in sections =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.sport-card, .cs-card, .pitch-card').forEach(el => {
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});
