const navbar = document.getElementById('navbar');
const yearEl = document.getElementById('year');
const localTimeEl = document.getElementById('local-time');
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const revealItems = document.querySelectorAll('.reveal');
const scrollProgress = document.getElementById('scroll-progress');
const backToTopBtn = document.getElementById('back-to-top');
const typewriterEl = document.getElementById('typewriter');
const toastEl = document.getElementById('toast');
const toastMsg = document.getElementById('toast-msg');
const mobileToggle = document.getElementById('mobile-toggle');
const navLinksContainer = document.getElementById('nav-links');

const navLinks = [...document.querySelectorAll('.nav-links a[href^="#"]')];
const trackedSections = navLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Live Alexandria Clock
function updateAlexandriaClock() {
  if (!localTimeEl) return;
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Africa/Cairo',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
    localTimeEl.textContent = `${formatter.format(new Date())} EEST`;
  } catch {
    localTimeEl.textContent = 'Alexandria, EG';
  }
}
updateAlexandriaClock();
setInterval(updateAlexandriaClock, 1000);

// Mobile Menu Toggle
if (mobileToggle && navLinksContainer) {
  mobileToggle.addEventListener('click', () => {
    navLinksContainer.classList.toggle('open');
  });
  navLinks.forEach((link) => {
    link.addEventListener('click', () =>
      navLinksContainer.classList.remove('open')
    );
  });
}

// Toast Notification Helper
let toastTimeout;
function showToast(message) {
  if (!toastEl || !toastMsg) return;
  toastMsg.textContent = message;
  toastEl.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toastEl.classList.remove('show');
  }, 2800);
}

// One-Click Copy Email
document.querySelectorAll('.copy-email-trigger').forEach((trigger) => {
  trigger.addEventListener('click', async () => {
    const email = trigger.getAttribute('data-email');
    if (!email) return;
    try {
      await navigator.clipboard.writeText(email);
      showToast(`Copied: ${email}`);
    } catch {
      showToast('Email: ' + email);
    }
  });
});

// Typewriter Effect
if (typewriterEl) {
  const roles = [
    'Computer Science & AI Student',
    'Web & Software Developer',
    'Competitive Programmer (ECPC)',
    'Problem Solver & Builder',
  ];
  let roleIndex = 0;
  let charIndex = roles[0].length;
  let isDeleting = true;

  function tickTypewriter() {
    const current = roles[roleIndex];
    charIndex += isDeleting ? -1 : 1;
    typewriterEl.textContent = current.substring(0, charIndex);

    let delay = isDeleting ? 32 : 68;

    if (!isDeleting && charIndex === current.length) {
      delay = 2300;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 320;
    }

    setTimeout(tickTypewriter, delay);
  }

  setTimeout(tickTypewriter, 2200);
}

// 3D Tilt on Cards (Desktop only)
if (window.matchMedia('(pointer: fine)').matches) {
  document.querySelectorAll('.tilt-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -3.5;
      const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 3.5;
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// Spotlight Coordinate Tracking
document.querySelectorAll('.spotlight-card').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  });
});

// Clean Copy Text
document.addEventListener('copy', (event) => {
  const activeEl = document.activeElement;
  if (
    activeEl &&
    (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA')
  ) {
    return;
  }

  const selection = window.getSelection();
  if (!selection || selection.isCollapsed) return;

  const cleanText = selection
    .toString()
    .replace(/^\s*#{1,6}\s*/gm, '')
    .trim();

  if (cleanText && event.clipboardData) {
    event.clipboardData.setData('text/plain', cleanText);
    event.preventDefault();
  }
});

// Project Deep-Dive Modal (Synced with CV)
const PROJECT_DATA = {
  'meta-tagger': {
    category: 'JAVA & AI INTEGRATION • 2026',
    title: 'Smart Meta Tagger',
    desc: 'Developed a Java-based application that integrates AI APIs to analyze uploaded images and videos, automatically generating descriptions and metadata tags.',
    highlights: [
      'Integrated AI REST APIs for automated visual content analysis and tagging.',
      'Built SQLite database connectivity to manage user registration and authentication.',
      'Implemented secure logging and searchable history of generated media metadata.',
    ],
    tags: ['Java', 'REST API', 'SQLite', 'AI Models'],
  },
  'cp-club': {
    category: 'FULL-STACK WEB • 2026',
    title: 'CP Club Website',
    desc: 'Built a dynamic website for the Competitive Programming Club to showcase events, resources, and announcements.',
    highlights: [
      'Developed PHP backend processing for dynamic event and announcement management.',
      'Crafted a responsive modern interface using HTML, CSS, and JavaScript.',
      'Organized training resources and contest updates for student members.',
    ],
    tags: ['PHP', 'JavaScript', 'HTML', 'CSS'],
  },
  portfolio: {
    category: 'FRONT-END ARCHITECTURE • 2026',
    title: 'Personal Portfolio Website',
    desc: 'Designed and developed a responsive personal portfolio website to showcase software engineering projects, technical skills, and achievements.',
    highlights: [
      'Warm editorial aesthetic with custom interactive CLI terminal and 3D card physics.',
      'Responsive layout engineered for seamless viewing across mobile and desktop.',
      'Integrated contact workflow and downloadable CV access.',
    ],
    tags: ['HTML', 'CSS', 'JavaScript'],
  },
  hotel: {
    category: 'RELATIONAL DATABASE DESIGN • 2025',
    title: 'Hotel Management System Database',
    desc: 'Designed a comprehensive Entity-Relationship Diagram (ERD) and relational database system modeling full hotel operations.',
    highlights: [
      'Modeled entities including guests, rooms, reservations, payments, and employee shifts.',
      'Implemented SQL scripts featuring table creation, constraints, and data updates.',
      'Wrote complex analytical JOIN queries for reporting and reservation tracking.',
    ],
    tags: ['SQL', 'ERD Design', 'Relational Databases'],
  },
  network: {
    category: 'NETWORK ARCHITECTURE • 2025',
    title: 'Enterprise Network Architecture Simulation',
    desc: 'Simulated a multi-branch corporate network topology linking regional locations using Cisco Packet Tracer.',
    highlights: [
      'Configured ISR4331 routers to interconnect multiple regional branch offices.',
      'Deployed DNS, DHCP, and wireless access points across network segments.',
      'Performed full ICMP routing validation for reliable cross-branch packet transfer.',
    ],
    tags: ['Cisco Packet Tracer', 'ISR4331 Routers', 'DNS / DHCP', 'ICMP'],
  },
  library: {
    category: 'SYSTEMS PROGRAMMING • 2024',
    title: 'Library Management System',
    desc: 'Developed a library management system in C to handle books, users, and borrowing operations.',
    highlights: [
      'Engineered efficient data handling structures for book catalogs and user records.',
      'Implemented fast search functionality across book titles and IDs.',
      'Managed borrowing and return workflows with persistent record storage.',
    ],
    tags: ['C', 'Data Structures', 'File Handling'],
  },
};

const projectCards = document.querySelectorAll('.projects-grid .project-card');
const projectModal = document.getElementById('project-modal');
const closeProjectModal = document.getElementById('close-project-modal');

projectCards.forEach((card) => {
  card.addEventListener('click', () => {
    const key = card.getAttribute('data-project');
    const data = PROJECT_DATA[key];
    if (!data || !projectModal) return;

    document.getElementById('modal-category').textContent = data.category;
    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-desc').textContent = data.desc;

    const listEl = document.getElementById('modal-list');
    listEl.innerHTML = data.highlights.map((item) => `<li>${item}</li>`).join('');

    const tagsEl = document.getElementById('modal-tags');
    tagsEl.innerHTML = data.tags.map((t) => `<span>${t}</span>`).join('');

    projectModal.classList.add('open');
  });
});

if (closeProjectModal && projectModal) {
  closeProjectModal.addEventListener('click', () =>
    projectModal.classList.remove('open')
  );
  projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) projectModal.classList.remove('open');
  });
}

// Interactive CLI Terminal (Ctrl+K / Cmd+K)
const terminalModal = document.getElementById('terminal-modal');
const openTerminalBtn = document.getElementById('open-terminal');
const heroTerminalBtn = document.getElementById('hero-terminal-btn');
const closeTerminalBtn = document.getElementById('close-terminal');
const terminalForm = document.getElementById('terminal-form');
const terminalInput = document.getElementById('terminal-input');
const terminalBody = document.getElementById('terminal-body');

function openTerminal() {
  if (!terminalModal) return;
  terminalModal.classList.add('open');
  setTimeout(() => terminalInput && terminalInput.focus(), 100);
}

function closeTerminal() {
  if (!terminalModal) return;
  terminalModal.classList.remove('open');
}

if (openTerminalBtn) openTerminalBtn.addEventListener('click', openTerminal);
if (heroTerminalBtn) heroTerminalBtn.addEventListener('click', openTerminal);
if (closeTerminalBtn) closeTerminalBtn.addEventListener('click', closeTerminal);
if (terminalModal) {
  terminalModal.addEventListener('click', (e) => {
    if (e.target === terminalModal) closeTerminal();
  });
}

window.addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    terminalModal.classList.contains('open') ? closeTerminal() : openTerminal();
  }
  if (e.key === 'Escape') {
    closeTerminal();
    if (projectModal) projectModal.classList.remove('open');
  }
});

const TERMINAL_COMMANDS = {
  help: () =>
    `Available commands: <span class="cmd-chip">whoami</span> <span class="cmd-chip">cv</span> <span class="cmd-chip">projects</span> <span class="cmd-chip">skills</span> <span class="cmd-chip">github</span> <span class="cmd-chip">ecpc</span> <span class="cmd-chip">contact</span> <span class="cmd-chip">clear</span>`,
  whoami: () =>
    `Abdullah Ali — Computer Science student at AASTMT (Alexandria, 2024–2028). Focused on Web Development, AI, and Competitive Programming.`,
  cv: () =>
    `Downloading Resume... <a href="Abdullah_Ali_CV.pdf" download="Abdullah_Ali_CV.pdf" style="color:#f2c078;text-decoration:underline;">Click here if download doesn't start</a>`,
  projects: () =>
    `1. Smart Meta Tagger (Java/REST API/SQLite/AI - 2026)<br>2. CP Club Website (PHP/JS/HTML/CSS - 2026)<br>3. Personal Portfolio Website (2026)<br>4. Hotel Management System DB (SQL/ERD - 2025)<br>5. Enterprise Network Simulation (Cisco ISR4331 - 2025)<br>6. Library Management System (C - 2024)`,
  skills: () =>
    `Languages: C, C++, Java, Python, PHP, JavaScript, HTML, CSS, SQL<br>Tools: Linux/Unix Shell, SQLite, Cisco Packet Tracer, Git, GitHub`,
  github: () =>
    `GitHub: <a href="https://github.com/abdullah-ali-attallah" target="_blank" style="color:#f2c078;text-decoration:underline;">github.com/abdullah-ali-attallah</a>`,
  ecpc: () =>
    `🏆 Ranked 14th Place University-Wide in the ECPC Qualifications (Aug 2026).`,
  contact: () =>
    `Email: abdullah.ali.attallah@gmail.com | Phone: (+20) 101 972 3809 (Email copied!)`,
};

if (terminalForm && terminalInput && terminalBody) {
  terminalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const raw = terminalInput.value.trim();
    const cmd = raw.toLowerCase();
    terminalInput.value = '';

    if (!cmd) return;

    if (cmd === 'clear') {
      terminalBody.innerHTML = '';
      return;
    }

    const line = document.createElement('div');
    line.className = 'term-line';
    const output = TERMINAL_COMMANDS[cmd]
      ? TERMINAL_COMMANDS[cmd]()
      : `Command not found: <strong>${raw}</strong>. Type <span class="cmd-chip">help</span> for available commands.`;

    line.innerHTML = `<div class="term-cmd">abdullah@portfolio:~$ ${raw}</div><div>${output}</div>`;
    terminalBody.appendChild(line);
    terminalBody.scrollTop = terminalBody.scrollHeight;

    if (cmd === 'contact' && navigator.clipboard) {
      navigator.clipboard.writeText('abdullah.ali.attallah@gmail.com');
    }
    if (cmd === 'cv') {
      const link = document.createElement('a');
      link.href = 'Abdullah_Ali_CV.pdf';
      link.download = 'Abdullah_Ali_CV.pdf';
      link.click();
    }
  });
}

// Formspree Submission
if (contactForm && formStatus) {
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalHTML = submitButton.innerHTML;

    submitButton.disabled = true;
    submitButton.innerHTML =
      '<span>SENDING...</span> <i class="fas fa-spinner fa-spin"></i>';
    formStatus.textContent = 'Sending your message...';

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error('Message could not be sent.');

      contactForm.reset();
      formStatus.textContent = 'Thanks! Your message has been sent successfully.';
      showToast('Message sent successfully!');
    } catch (error) {
      formStatus.textContent =
        error.message || 'Connection error. Please try again.';
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = originalHTML;
    }
  });
}

// Smooth Anchor Scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (event) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

if (backToTopBtn) {
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Scroll Handler
function handleScroll() {
  const scrollY = window.scrollY;

  if (navbar) navbar.classList.toggle('scrolled', scrollY > 30);
  if (backToTopBtn) backToTopBtn.classList.toggle('show', scrollY > 450);

  if (scrollProgress) {
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress.style.width = `${
      docHeight > 0 ? (scrollY / docHeight) * 100 : 0
    }%`;
  }

  updateActiveNav();
}

window.addEventListener('scroll', handleScroll, { passive: true });

function updateActiveNav() {
  if (!trackedSections.length) return;
  const marker = window.scrollY + window.innerHeight * 0.34;
  let currentSection = trackedSections[0];

  trackedSections.forEach((section) => {
    if (section.offsetTop <= marker) currentSection = section;
  });

  if (
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 20
  ) {
    currentSection = trackedSections[trackedSections.length - 1];
  }

  navLinks.forEach((link) => {
    link.classList.toggle(
      'active',
      link.getAttribute('href') === `#${currentSection.id}`
    );
  });
}

handleScroll();

// Staggered Reveal Observer
projectCards.forEach((card, index) => {
  card.style.transitionDelay = `${index * 0.07}s`;
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        setTimeout(() => {
          entry.target.style.transitionDelay = '0s';
        }, 700);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

revealItems.forEach((item) => revealObserver.observe(item));