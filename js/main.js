/* ============================================================
   warr.gg — main.js
   EmailJS service ID: service_warr
   Template ID: template_contact
   Public Key: set in index.html
   ============================================================ */

/* ---- EMAILJS INIT ---- */
(function(){
  if (typeof emailjs !== 'undefined') {
    emailjs.init({ publicKey: "PASTE_YOUR_PUBLIC_KEY_HERE" }); // 👈 Step 4: replace this
  }
})();

/* ---- CURSOR ---- */
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');

if (cursor && cursorDot) {
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });

  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.12;
    cursorY += (mouseY - cursorY) * 0.12;
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
}

/* ---- NAV SCROLL ---- */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

/* ---- MOBILE MENU ---- */
const burger = document.getElementById('navBurger');
const mobileMenu = document.getElementById('mobileMenu');

burger && burger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

function closeMobile() {
  mobileMenu && mobileMenu.classList.remove('open');
}

/* ---- BUILD WORK GRIDS ---- */
const sqData = [
  { img: 'images/2kimage1.jpg',  num: '01', type: 'Megawagi' },
  { img: 'images/2kimage2.jpg',  num: '02', type: 'Time2Bet' },
  { img: 'images/2kimage3.jpg',  num: '03', type: 'Bren Esports' },
  { img: 'images/2kimage4.jpg',  num: '04', type: 'Nike' },
  { img: 'images/2kimage5.jpg',  num: '05', type: 'McDonalds' },
  { img: 'images/2kimage6.jpg',  num: '06', type: 'One Cagayan' },
  { img: 'images/2kimage7.jpg',  num: '07', type: 'Oreo' },
  { img: 'images/2kimage8.jpg',  num: '08', type: 'EQNX' },
  { img: 'images/2kimage9.jpg',  num: '09', type: 'Team Flash' },
  { img: 'images/2kimage10.jpg', num: '10', type: 'SnapDragon Pro Series' },
];

const tkData = [
  { img: 'images/10kimage1.jpg', num: '23', type: 'Dose' },
  { img: 'images/10kimage2.jpg', num: '24', type: 'Dose' },
  { img: 'images/10kimage3.jpg', num: '25', type: 'The Tuckshop Assembly' },
  { img: 'images/10kimage4.jpg', num: '26', type: 'The Tuckshop Assembly' },
  { img: 'images/10kimage5.jpg', num: '27', type: 'Dose' },
  { img: 'images/10kimage6.jpg', num: '28', type: 'Dose' },
];

const ptData = [
  { img: 'images/14kimage1.jpg', num: '11', type: 'Team Flash x Razer' },
  { img: 'images/14kimage2.jpg', num: '12', type: 'Team Flash x Omnidesk' },
  { img: 'images/14kimage3.jpg', num: '13', type: 'M6 World Championship' },
  { img: 'images/14kimage4.jpg', num: '14', type: 'The Tuckshop Assembly' },
  { img: 'images/14kimage5.jpg', num: '15', type: 'The Tuckshop Assembly' },
  { img: 'images/14kimage6.jpg', num: '16', type: 'EQNX Perfume Shop' },
  { img: 'images/14kimage7.jpg', num: '17', type: 'EQNX Perfume Shop' },
  { img: 'images/14kimage8.jpg', num: '18', type: '100 Thieves' },
  { img: 'images/14kimage9.jpg', num: '19', type: 'The Tuckshop Assembly' },
  { img: 'images/14kimage10.jpg', num: '20', type: 'Games of The Future 2024' },
  { img: 'images/14kimage11.jpg', num: '21', type: 'Esports World Cup x MLBB 2025' },
  { img: 'images/14kimage12.jpg', num: '22', type: 'Ninjas in Pyjamas x Team Flash' },
];

function buildWorkItem(data, cls) {
  return `
    <div class="${cls}" data-img="${data.img}">
      <div class="work-img-wrap">
        <img src="${data.img}" alt="Work ${data.num}" loading="lazy" />
      </div>
      <div class="work-meta">
        <span class="work-num">${data.num}</span>
        <span class="work-type">${data.type}</span>
      </div>
    </div>`;
}

const sqGrid = document.getElementById('sqGrid');
const ptGrid = document.getElementById('ptGrid');

if (sqGrid) sqGrid.innerHTML = sqData.map(d => buildWorkItem(d, 'work-item')).join('');
if (ptGrid) ptGrid.innerHTML = ptData.map(d => buildWorkItem(d, 'work-item-pt')).join('');

const tkGrid = document.getElementById('tkGrid');
if (tkGrid) tkGrid.innerHTML = tkData.map(d => buildWorkItem(d, 'work-item-tk')).join('');

/* ---- LIGHTBOX ---- */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

// lightbox disabled

lightboxClose && lightboxClose.addEventListener('click', closeLightbox);
lightbox && lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

/* ---- REVEAL ON SCROLL ---- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 60);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.05, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.reveal, .service-card, .pricing-card').forEach(el => {
  revealObserver.observe(el);
});

// Immediately show anything already in viewport on load
window.addEventListener('load', () => {
  document.querySelectorAll('.reveal, .service-card, .pricing-card').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.classList.add('visible');
    }
  });
});

/* ---- CONTACT FORM + EMAILJS ---- */
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const submitText = document.getElementById('submitText');
const formStatus = document.getElementById('formStatus');

form && form.addEventListener('submit', async e => {
  e.preventDefault();

  const name    = form.querySelector('[name="name"]').value.trim();
  const email   = form.querySelector('[name="email"]').value.trim();
  const subject = form.querySelector('[name="subject"]').value.trim();
  const budget  = form.querySelector('[name="budget"]').value;
  const message = form.querySelector('[name="message"]').value.trim();

  if (!name || !email || !subject || !message) {
    showStatus('Please fill in all required fields.', 'error');
    return;
  }

  submitBtn.disabled = true;
  submitText.textContent = 'Sending...';
  formStatus.className = 'form-status';
  formStatus.textContent = '';

  const templateParams = {
    from_name:    name,
    from_email:   email,
    subject:      subject,
    budget:       budget || 'Not specified',
    message:      message,
    to_email:     'wrrenvillapando@gmail.com',
    reply_to:     email,
  };

  try {
    if (typeof emailjs !== 'undefined') {
      await emailjs.send('PASTE_SERVICE_ID_HERE', 'PASTE_TEMPLATE_ID_HERE', templateParams); // 👈 Step 2 & 3: replace these
      showStatus('Message sent! I\'ll get back to you within 24 hours. 🎉', 'success');
      form.reset();
    } else {
      // Fallback: mailto link
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nBudget: ${budget || 'Not specified'}\n\n${message}`
      );
      window.open(`mailto:wrrenvillapando@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`);
      showStatus('Opening your email client...', 'success');
      form.reset();
    }
  } catch (err) {
    console.error('EmailJS error:', err);
    // Fallback to mailto
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nBudget: ${budget || 'Not specified'}\n\n${message}`
    );
    window.open(`mailto:wrrenvillapando@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`);
    showStatus('Opening your email client as fallback...', 'success');
    form.reset();
  } finally {
    submitBtn.disabled = false;
    submitText.textContent = 'Send Message →';
  }
});

function showStatus(msg, type) {
  formStatus.textContent = msg;
  formStatus.className = 'form-status ' + type;
  setTimeout(() => {
    formStatus.textContent = '';
    formStatus.className = 'form-status';
  }, 6000);
}

/* ---- SMOOTH ACTIVE NAV ---- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current
      ? 'var(--text)' : '';
  });
}, { passive: true });

/* ---- EMAIL ANTI-OBFUSCATION ---- */
// Split email so Cloudflare can't detect and obfuscate it
const emailUser = 'wrrenvillapando';
const emailDomain = 'gmail.com';
const fullEmail = emailUser + '@' + emailDomain;

// Fill all .email-reveal spans with the email text
document.querySelectorAll('.email-reveal').forEach(el => {
  el.textContent = fullEmail;
});

// Fix all mailto href links
document.querySelectorAll('a[href*="email-protection"], a[href*="cdn-cgi"]').forEach(el => {
  el.href = 'mailto:' + fullEmail;
  if (!el.textContent.trim() || el.textContent.includes('email-protection')) {
    el.textContent = fullEmail;
  }
});
