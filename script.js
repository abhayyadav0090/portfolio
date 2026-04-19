console.log("Portfolio loaded successfully!");

/* ===========================
   CUSTOM CURSOR
=========================== */
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
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

// Scale cursor on hover over interactive elements
document.querySelectorAll('a, button, .project-card, .cert-item, .skill-category').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1.6)';
    cursor.style.borderColor = 'rgba(232, 201, 122, 0.5)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    cursor.style.borderColor = 'var(--accent)';
  });
});

/* ===========================
   NAVBAR SCROLL EFFECT
=========================== */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ===========================
   SMOOTH ACTIVE NAV LINKS
=========================== */
const sections = document.querySelectorAll('section[id], header[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) {
      current = sec.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active-link');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active-link');
    }
  });
});

/* ===========================
   SCROLL REVEAL ANIMATION
=========================== */
const revealElements = document.querySelectorAll(
  '.about-grid, .skill-category, .project-card, .cert-item, .contact-wrapper, .hero-stats'
);

revealElements.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger delay for grid children
      const siblings = [...entry.target.parentElement.children];
      const index = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = (index * 0.08) + 's';
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => observer.observe(el));

/* ===========================
   SKILL BARS ANIMATION
=========================== */
const barFills = document.querySelectorAll('.bar-fill');

const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
    }
  });
}, { threshold: 0.3 });

barFills.forEach(bar => {
  bar.style.animationPlayState = 'paused';
  barObserver.observe(bar);
});

/* ===========================
   CONTACT FORM
=========================== */
const sendBtn = document.getElementById('sendBtn');
const feedback = document.getElementById('form-feedback');

if (sendBtn) {
  sendBtn.addEventListener('click', () => {
    const name = document.getElementById('fname').value.trim();
    const email = document.getElementById('femail').value.trim();
    const msg = document.getElementById('fmsg').value.trim();

    if (!name || !email || !msg) {
      feedback.textContent = '⚠️ Please fill in all fields.';
      feedback.style.color = '#f87171';
      feedback.style.display = 'block';
      setTimeout(() => { feedback.style.display = 'none'; }, 3000);
      return;
    }

    // Open mail client as fallback
    const mailtoLink = `mailto:abhayyadav19955@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(msg)}%0A%0AFrom: ${encodeURIComponent(email)}`;
    window.open(mailtoLink);

    feedback.textContent = '✅ Opening your mail client...';
    feedback.style.color = '#4ade80';
    feedback.style.display = 'block';

    document.getElementById('fname').value = '';
    document.getElementById('femail').value = '';
    document.getElementById('fmsg').value = '';

    setTimeout(() => { feedback.style.display = 'none'; }, 4000);
  });
}

/* ===========================
   TYPING EFFECT ON HERO ROLE
=========================== */
const roleEl = document.querySelector('.hero-role');
if (roleEl) {
  const roles = [
    'B.Tech IT · Full Stack Developer · Builder',
    'MERN Stack Learner · #CoderArmy',
    'AWS Cloud · AI Tools Enthusiast',
    'Building in Public · Every Single Day'
  ];
  let roleIdx = 0;
  let charIdx = 0;
  let deleting = false;

  function typeRole() {
    const current = roles[roleIdx];
    if (!deleting) {
      roleEl.textContent = current.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(typeRole, 2200);
        return;
      }
    } else {
      roleEl.textContent = current.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
      }
    }
    setTimeout(typeRole, deleting ? 28 : 48);
  }

  setTimeout(typeRole, 1400);
}

/* ===========================
   PARALLAX ON HERO BG TEXT
=========================== */
const heroBgText = document.querySelector('.hero-bg-text');
window.addEventListener('scroll', () => {
  if (heroBgText) {
    heroBgText.style.transform = `translate(-50%, calc(-50% + ${window.scrollY * 0.3}px))`;
  }
});
