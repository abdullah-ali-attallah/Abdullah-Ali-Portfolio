const navbar = document.getElementById('navbar');
const yearEl = document.getElementById('year');
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const revealItems = document.querySelectorAll('.reveal');
const navLinks = [...document.querySelectorAll('.nav-links a[href^="#"]')];
const trackedSections = navLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

document.addEventListener('copy', (event) => {
  const selection = window.getSelection();
  if (!selection || selection.isCollapsed) return;

  const cleanText = selection
    .toString()
    .replace(/^\s*#{1,6}\s*/gm, '')
    .trim();

  event.clipboardData.setData('text/plain', cleanText);
  event.preventDefault();
});

if (contactForm && formStatus) {
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const submitButton = contactForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    formStatus.textContent = 'Sending your message...';

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { Accept: 'application/json' },
      });
      const responseText = await response.text();
      let result;

      try {
        result = JSON.parse(responseText);
      } catch (parseError) {
        throw new Error('The email service returned an invalid response');
      }

      if (!response.ok || (result.success !== true && result.success !== 'true')) {
        throw new Error(result.message || 'Message could not be sent');
      }

      contactForm.reset();
      formStatus.textContent = 'Thanks! Your message has been sent successfully.';
    } catch (error) {
      if (error.message.toLowerCase().includes('activate')) {
        formStatus.textContent = 'Please activate the email service using the confirmation email first.';
      } else {
        formStatus.textContent = 'The message could not be sent. Please check your connection and try again.';
      }
    } finally {
      submitButton.disabled = false;
    }
  });
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (event) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

window.addEventListener('scroll', () => {
  if (!navbar) return;

  if (window.scrollY > 30) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  updateActiveNav();
});

function updateActiveNav() {
  const marker = window.scrollY + window.innerHeight * 0.34;
  let currentSection = trackedSections[0];

  trackedSections.forEach((section) => {
    if (section.offsetTop <= marker) {
      currentSection = section;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${currentSection.id}`);
  });
}

updateActiveNav();

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => revealObserver.observe(item));