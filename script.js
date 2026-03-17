/* ============================================
   warr.gg — Portfolio Scripts
   ============================================ */

// ====== CUSTOM CURSOR ======
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  follower.style.left = followerX + 'px';
  follower.style.top = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

// Cursor scale on interactive elements
document.querySelectorAll('a, button, input, select, textarea').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(2)';
    follower.style.opacity = '0.4';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    follower.style.opacity = '1';
  });
});

// ====== NAV SCROLL ======
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// ====== MOBILE MENU ======
const burger = document.getElementById('navBurger');
const mobileMenu = document.getElementById('mobileMenu');

burger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  const spans = burger.querySelectorAll('span');
  if (mobileMenu.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

function closeMobile() {
  mobileMenu.classList.remove('open');
  const spans = burger.querySelectorAll('span');
  spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
}

// ====== REVEAL ON SCROLL ======
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ====== CONTACT FORM ======
// Uses Formspree — works on Vercel without a backend
// Sign up at formspree.io, create a form, replace YOUR_FORM_ID below
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

async function handleSubmit(e) {
  e.preventDefault();

  const form = document.getElementById('contactForm');
  const btn = document.getElementById('submitBtn');
  const btnText = document.getElementById('btnText');
  const successMsg = document.getElementById('formSuccess');
  const errorMsg = document.getElementById('formError');

  // Reset messages
  successMsg.classList.remove('show');
  errorMsg.classList.remove('show');

  // Loading state
  btn.disabled = true;
  btnText.textContent = 'Sending...';

  const data = {
    name: form.name.value,
    email: form.email.value,
    service: form.service.value,
    budget: form.budget.value,
    message: form.message.value,
    _replyto: form.email.value,
    _subject: `New inquiry from ${form.name.value} — warr.gg`,
  };

  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      successMsg.classList.add('show');
      form.reset();
    } else {
      throw new Error('Server error');
    }
  } catch (err) {
    errorMsg.classList.add('show');
  } finally {
    btn.disabled = false;
    btnText.textContent = 'Send Message';
  }
}

// ====== SMOOTH SCROLL FOR NAV LINKS ======
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ====== WORK ITEM STAGGER ======
const workItems = document.querySelectorAll('.work-item');
const workObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const idx = parseInt(entry.target.dataset.index || 0);
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, (idx % 5) * 80);
      workObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.05 });

workItems.forEach(item => {
  item.style.opacity = '0';
  item.style.transform = 'translateY(24px)';
  item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  workObserver.observe(item);
});
