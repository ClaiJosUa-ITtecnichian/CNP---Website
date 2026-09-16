/* ═══════════════════════════════════════════════════════════════
   CIÊNCIA NO PONTO — script.js
   ═══════════════════════════════════════════════════════════════ */

'use strict';

/* ─── Navbar: scroll shadow + active link highlighting ───────── */
(function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const navLinks  = document.querySelectorAll('.navbar__link');
  const sections  = document.querySelectorAll('main [id]');

  /* Add scrolled class for shadow */
  function onScroll() {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    highlightActiveLink();
    toggleBackToTop();
  }

  /* Highlight nav link matching the current viewport section */
  function highlightActiveLink() {
    let currentId = '';
    const offset = 100;

    sections.forEach(section => {
      const top = section.getBoundingClientRect().top;
      if (top <= offset) currentId = section.id;
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === '#' + currentId) link.classList.add('active');
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
})();


/* ─── Mobile hamburger menu ──────────────────────────────────── */
(function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('nav-menu');
  const navLinks  = navMenu.querySelectorAll('.navbar__link');

  function toggleMenu(open) {
    hamburger.classList.toggle('open', open);
    navMenu.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  }

  hamburger.addEventListener('click', () => {
    const isOpen = navMenu.classList.contains('open');
    toggleMenu(!isOpen);
  });

  /* Close menu when a link is clicked */
  navLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  /* Close menu on outside click */
  document.addEventListener('click', e => {
    if (navMenu.classList.contains('open') &&
        !navMenu.contains(e.target) &&
        !hamburger.contains(e.target)) {
      toggleMenu(false);
    }
  });

  /* Close on Escape */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      toggleMenu(false);
      hamburger.focus();
    }
  });
})();


/* ─── Smooth scroll for all in-page anchor links ────────────── */
(function initSmoothScroll() {
  const NAV_HEIGHT = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--nav-h') || '72',
    10
  );

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      if (!targetId) return; // bare '#' links

      const target = document.getElementById(targetId);
      if (!target) return;

      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
      window.scrollTo({ top, behavior: 'smooth' });

      /* Update focus for accessibility */
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  });
})();


/* ─── Back-to-top button ─────────────────────────────────────── */
(function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

function toggleBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  btn.classList.toggle('visible', window.scrollY > 400);
}


/* ─── Scroll-reveal animations ───────────────────────────────── */
(function initReveal() {
  /* Add .reveal to every major child of sections */
  const targets = document.querySelectorAll(
    '.pillar, .team-card, .disciplina-card, .plano-card, ' +
    '.social-card, .contacto__info-card, .note-card, .location-card, ' +
    '.sobre__intro, .sobre__pillars, .horarios__wrapper, ' +
    '.youtube__featured, .cta-banner, .contacto__layout'
  );

  targets.forEach(el => el.classList.add('reveal'));

  if (!('IntersectionObserver' in window)) {
    /* Fallback: show everything immediately */
    targets.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach(el => observer.observe(el));
})();


/* ─── Contact form validation + submission (EmailJS) ─────────── */
(function initContactForm() {
  const form       = document.getElementById('contactForm');
  if (!form) return;

  const successBox = document.getElementById('formSuccess');
  const submitBtn  = document.getElementById('submitBtn');

  /* ─── Pop-up de sucesso ─── */
  const popupOverlay = document.getElementById('popupOverlay');
  const popupClose   = document.getElementById('popupClose');
  const popupNome    = document.getElementById('popupNome');
  const popupEmail   = document.getElementById('popupEmail');

  function showPopup(nome, email) {
    if (!popupOverlay) return;
    if (popupNome)  popupNome.textContent  = nome;
    if (popupEmail) popupEmail.textContent = email;
    popupOverlay.classList.add('active');
    popupOverlay.setAttribute('aria-hidden', 'false');
    if (popupClose) popupClose.focus();
  }

  function closePopup() {
    if (!popupOverlay) return;
    popupOverlay.classList.remove('active');
    popupOverlay.setAttribute('aria-hidden', 'true');
    /* Reset form */
    form.reset();
    if (document.getElementById('multiplasWrapper')) {
      document.getElementById('multiplasWrapper').hidden = true;
    }
    form.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));
  }

  if (popupClose)   popupClose.addEventListener('click', closePopup);
  if (popupOverlay) popupOverlay.addEventListener('click', e => {
    if (e.target === popupOverlay) closePopup();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && popupOverlay && popupOverlay.classList.contains('active')) closePopup();
  });

  /* ─── EmailJS config — substitui pelos teus valores ─── */
  const EMAILJS_PUBLIC_KEY  = 'COLOCA_AQUI_A_TUA_PUBLIC_KEY';   // ex: 'user_xxxxxxxxxxxxxxx'
  const EMAILJS_SERVICE_ID  = 'COLOCA_AQUI_O_SERVICE_ID';        // ex: 'service_xxxxxxx'
  const EMAILJS_TEMPLATE_ID = 'COLOCA_AQUI_O_TEMPLATE_ID';       // ex: 'template_xxxxxxx'

  /* Inicializa o EmailJS */
  if (window.emailjs) {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }

  /* ── Field validators ── */
  const validators = {
    nome(value) {
      if (!value.trim()) return 'O nome é obrigatório.';
      if (value.trim().length < 2) return 'O nome deve ter pelo menos 2 caracteres.';
      return '';
    },
    email(value) {
      if (!value.trim()) return 'O e-mail é obrigatório.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return 'Introduz um e-mail válido.';
      return '';
    },
    disciplina(value) {
      if (!value) return 'Seleciona uma disciplina.';
      return '';
    },
    mensagem(value) {
      if (!value.trim()) return 'A mensagem é obrigatória.';
      if (value.trim().length < 10) return 'A mensagem deve ter pelo menos 10 caracteres.';
      return '';
    }
  };

  function showError(fieldId, message) {
    const field   = document.getElementById(fieldId);
    const errorEl = document.getElementById(fieldId + '-error');
    if (!field || !errorEl) return;
    field.classList.toggle('invalid', !!message);
    errorEl.textContent = message;
  }

  function validateField(fieldId) {
    const field = document.getElementById(fieldId);
    if (!field || !validators[fieldId]) return true;
    const error = validators[fieldId](field.value);
    showError(fieldId, error);
    return !error;
  }

  /* Live validation on blur */
  ['nome', 'email', 'disciplina', 'mensagem'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('blur', () => validateField(id));
      el.addEventListener('input', () => {
        if (el.classList.contains('invalid')) validateField(id);
      });
    }
  });

  /* ── Mostrar secção de múltiplas disciplinas ── */
  const selectDisciplina  = document.getElementById('disciplina');
  const multiplasWrapper  = document.getElementById('multiplasWrapper');

  if (selectDisciplina && multiplasWrapper) {
    selectDisciplina.addEventListener('change', function () {
      const isMultiplas = this.value === 'multiplas';
      multiplasWrapper.hidden = !isMultiplas;
      if (isMultiplas) {
        multiplasWrapper.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  /* Helper — lê as disciplinas selecionadas nos checkboxes */
  function getDisciplinasMultiplas() {
    const checkboxes = document.querySelectorAll('input[name="disc_check"]:checked');
    const selecionadas = Array.from(checkboxes).map(cb => cb.value);
    const outra = (document.getElementById('outraDisciplina') || {}).value || '';
    if (outra.trim()) selecionadas.push(outra.trim());
    return selecionadas;
  }

  /* ── Form submission via EmailJS ── */
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const validNome       = validateField('nome');
    const validEmail      = validateField('email');
    const validDisciplina = validateField('disciplina');
    const validMensagem   = validateField('mensagem');

    if (!validNome || !validEmail || !validDisciplina || !validMensagem) {
      const firstInvalid = form.querySelector('.invalid');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    /* Recolhe os valores */
    const nome       = document.getElementById('nome').value.trim();
    const email      = document.getElementById('email').value.trim();
    const paisCode   = document.getElementById('telefone-pais') ? document.getElementById('telefone-pais').value : '';
    const telNum     = document.getElementById('telefone').value.trim();
    const telefone   = telNum ? (paisCode + ' ' + telNum).trim() : 'Não fornecido';
    const disciplina = document.getElementById('disciplina').value;
    const mensagem   = document.getElementById('mensagem').value.trim();

    const disciplinaLabel = {
      matematica:    'Matemática',
      fisica:        'Física',
      quimica:       'Química',
      informatica:   'Informática',
      contabilidade: 'Contabilidade',
      multiplas:     'Múltiplas disciplinas',
      outro:         'Outro / Geral'
    }[disciplina] || disciplina;

    /* Se múltiplas, detalha as selecionadas */
    let disciplinaFinal = disciplinaLabel;
    if (disciplina === 'multiplas') {
      const lista = getDisciplinasMultiplas();
      if (lista.length === 0) {
        /* Obriga a selecionar pelo menos uma */
        const errEl = document.getElementById('multiplas-error');
        if (errEl) errEl.textContent = 'Seleciona pelo menos uma disciplina.';
        submitBtn.classList.remove('btn--loading');
        submitBtn.disabled = false;
        return;
      }
      disciplinaFinal = 'Múltiplas: ' + lista.join(', ');
      const errEl = document.getElementById('multiplas-error');
      if (errEl) errEl.textContent = '';
    }

    /* Parâmetros que correspondem às variáveis do template EmailJS */
    const templateParams = {
      nome,
      email,
      telefone,
      disciplina:  disciplinaFinal,
      mensagem,
      reply_to:    email
    };

    /* Mostra loading */
    submitBtn.classList.add('btn--loading');
    submitBtn.disabled = true;

    /* Verifica se o EmailJS está configurado */
    if (!window.emailjs ||
        EMAILJS_PUBLIC_KEY  === 'COLOCA_AQUI_A_TUA_PUBLIC_KEY' ||
        EMAILJS_SERVICE_ID  === 'COLOCA_AQUI_O_SERVICE_ID'     ||
        EMAILJS_TEMPLATE_ID === 'COLOCA_AQUI_O_TEMPLATE_ID') {

      /* Modo de demonstração — abre cliente de email local */
      submitBtn.classList.remove('btn--loading');
      submitBtn.disabled = false;

      const subject  = encodeURIComponent('Contacto via Website — ' + disciplinaFinal);
      const body     = encodeURIComponent(
        'Nome: ' + nome + '\n' +
        'E-mail: ' + email + '\n' +
        'Telefone: ' + telefone + '\n' +
        'Disciplina: ' + disciplinaFinal + '\n\n' +
        'Mensagem:\n' + mensagem
      );
      window.location.href = 'mailto:albinoalberto500@gmail.com?subject=' + subject + '&body=' + body;

      showPopup(nome, email);
      return;
    }

    /* Envio real via EmailJS */
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
      .then(() => {
        submitBtn.classList.remove('btn--loading');
        submitBtn.disabled = false;
        showPopup(nome, email);
      })
      .catch((error) => {
        submitBtn.classList.remove('btn--loading');
        submitBtn.disabled = false;
        console.error('EmailJS error:', error);

        /* Fallback — abre cliente de email local */
        const subject = encodeURIComponent('Contacto via Website — ' + disciplinaFinal);
        const body    = encodeURIComponent(
          'Nome: ' + nome + '\n' +
          'E-mail: ' + email + '\n' +
          'Telefone: ' + telefone + '\n' +
          'Disciplina: ' + disciplinaFinal + '\n\n' +
          'Mensagem:\n' + mensagem
        );
        window.location.href = 'mailto:albinoalberto500@gmail.com?subject=' + subject + '&body=' + body;

        showPopup(nome, email);
      });
  });
})();


/* ─── Lazy-load YouTube embed on scroll into view ────────────── */
(function initYoutubeLazyLoad() {
  const wrapper = document.querySelector('.youtube__embed-wrapper');
  if (!wrapper || !('IntersectionObserver' in window)) return;

  const iframe = wrapper.querySelector('iframe');
  if (!iframe) return;

  /* Store the real src in data-src and clear src initially */
  const realSrc = iframe.getAttribute('src');
  iframe.setAttribute('data-src', realSrc);
  iframe.removeAttribute('src');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          iframe.src = iframe.dataset.src;
          observer.unobserve(wrapper);
        }
      });
    },
    { threshold: 0.2 }
  );

  observer.observe(wrapper);
})();


/* ─── WhatsApp float pulse on first visit ────────────────────── */
(function initWaFloatPulse() {
  const btn = document.getElementById('whatsappFloat');
  if (!btn) return;

  /* Show a subtle attention animation after 3 s if user hasn't scrolled */
  let pulsed = false;
  function pulse() {
    if (pulsed) return;
    pulsed = true;
    btn.style.animation = 'waPulse 1s ease 2';
  }

  setTimeout(pulse, 3000);

  /* Inject the keyframe dynamically (avoids duplicating in CSS) */
  const style = document.createElement('style');
  style.textContent = `
    @keyframes waPulse {
      0%   { transform: scale(1); box-shadow: 0 4px 20px rgba(37,211,102,.4); }
      40%  { transform: scale(1.18); box-shadow: 0 6px 30px rgba(37,211,102,.6); }
      100% { transform: scale(1); box-shadow: 0 4px 20px rgba(37,211,102,.4); }
    }
  `;
  document.head.appendChild(style);
})();


/* ─── Schedule table: highlight today's rows ─────────────────── */
(function initScheduleHighlight() {
  const DAY_NAMES = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
  const today = DAY_NAMES[new Date().getDay()];

  document.querySelectorAll('.horarios__table tbody tr').forEach(row => {
    const header = row.querySelector('th');
    if (!header) return;
    const text = header.textContent.toLowerCase();
    if (text.includes(today)) {
      row.style.background = 'rgba(37,99,235,.06)';
      row.style.fontWeight = '500';
    }
  });
})();


/* ─── Active section indicator in URL hash (no page jump) ───── */
(function initHashSync() {
  const sections = document.querySelectorAll('main [id]');
  const NAV_H    = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--nav-h') || '72',
    10
  );

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      let current = '';
      sections.forEach(s => {
        if (s.getBoundingClientRect().top <= NAV_H + 10) current = s.id;
      });
      if (current && location.hash !== '#' + current) {
        history.replaceState(null, '', '#' + current);
      }
      ticking = false;
    });
  }, { passive: true });
})();

