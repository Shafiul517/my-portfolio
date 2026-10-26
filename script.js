/* Shafiul Islam Portfolio — progressive enhancements */
(() => {
  'use strict';

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const root = document.documentElement;
  const body = document.body;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const EMAIL = 'shafiulislam517@gmail.com';
  const LINKEDIN = ''; // Add your public LinkedIn profile URL here when ready.
  const WORDS = [
    'selling to shopkeepers',
    'solving customer problems',
    'handling reports and data',
    'working under pressure'
  ];

  if ('IntersectionObserver' in window) root.classList.add('js-ready');

  /* LinkedIn actions stay hidden until a real profile URL is configured. */
  $$('[data-li]').forEach((link) => {
    if (LINKEDIN.trim()) {
      link.href = LINKEDIN;
      link.hidden = false;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    } else {
      link.hidden = true;
    }
  });

  const dock = $('#dock');
  if (dock && !LINKEDIN.trim()) dock.classList.add('two');

  /* Accessible mobile menu. */
  const menuButton = $('#mb');
  const menu = $('#nav');
  const menuLinks = $$('#nav > a');
  const closeMenu = (returnFocus = false) => {
    if (!menuButton || !menu) return;
    menu.classList.remove('o');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open menu');
    body.classList.remove('menu-open');
    if (returnFocus) menuButton.focus();
  };
  const openMenu = () => {
    if (!menuButton || !menu) return;
    menu.classList.add('o');
    menuButton.setAttribute('aria-expanded', 'true');
    menuButton.setAttribute('aria-label', 'Close menu');
    body.classList.add('menu-open');
  };

  menuButton?.addEventListener('click', () => {
    if (menuButton.getAttribute('aria-expanded') === 'true') closeMenu();
    else openMenu();
  });
  menuLinks.forEach((link) => link.addEventListener('click', () => closeMenu()));
  $$('.mobile-tabs a').forEach((link) => link.addEventListener('click', () => closeMenu()));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') {
      closeMenu(true);
    }
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 820) closeMenu();
    updateMenuIndicator($$('#nav > a').find((link) => link.classList.contains('on')));
  }, { passive: true });

  /* Desktop active-link indicator. */
  function updateMenuIndicator(link) {
    if (!menu || !link || window.innerWidth <= 820) return;
    menu.style.setProperty('--ix', `${link.offsetLeft}px`);
    menu.style.setProperty('--iw', `${link.offsetWidth}px`);
    menu.style.setProperty('--io', '1');
  }
  menuLinks.forEach((link) => {
    link.addEventListener('pointerenter', () => updateMenuIndicator(link));
    link.addEventListener('focus', () => updateMenuIndicator(link));
  });
  menu?.addEventListener('pointerleave', () => {
    updateMenuIndicator(menuLinks.find((link) => link.classList.contains('on')));
  });
  if (document.fonts?.ready) document.fonts.ready.then(() => {
    updateMenuIndicator(menuLinks.find((link) => link.classList.contains('on')));
  });

  /* Keep desktop and mobile navigation highlights in sync. */
  const mobileLinks = $$('.mobile-tabs a');
  const allSectionLinks = [...menuLinks, ...mobileLinks];
  const sections = $$('main section[id]');
  const setActiveSection = (sectionId) => {
    allSectionLinks.forEach((link) => {
      const active = link.getAttribute('href') === `#${sectionId}`;
      const isMobileTab = link.closest('.mobile-tabs') !== null;
      link.classList.toggle('on', active && !isMobileTab);
      link.classList.toggle('is-active', active && isMobileTab);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    updateMenuIndicator(menuLinks.find((link) => link.classList.contains('on')));
  };
  let tops = [];
  let maxScroll = 1;
  function measure() {
    tops = sections.map((section) => section.offsetTop);
    maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  }
  measure();
  function syncActiveSection() {
    if (!sections.length) return;
    const focusLine = window.scrollY + Math.min(window.innerHeight * .32, 260) + 76;
    let activeSection = sections[0];
    for (let i = 0; i < sections.length; i += 1) {
      if (tops[i] <= focusLine) activeSection = sections[i];
      else break;
    }
    setActiveSection(activeSection.id);
  }
  let sectionFrame = 0;
  window.addEventListener('scroll', () => {
    if (sectionFrame) return;
    sectionFrame = window.requestAnimationFrame(() => {
      sectionFrame = 0;
      syncActiveSection();
    });
  }, { passive: true });
  window.addEventListener('resize', () => { measure(); syncActiveSection(); }, { passive: true });
  window.addEventListener('load', () => { measure(); syncActiveSection(); });
  syncActiveSection();

  /* Decorative particle network only on larger desktop screens. No animation on mobile,
     reduced-motion devices, or hidden tabs to save battery and CPU. */
  const canvas = $('#sky');
  const context = canvas?.getContext('2d', { alpha: true });
  const useCanvas = Boolean(context && finePointer && window.innerWidth > 760 && !reducedMotion);
  let particles = [];
  let canvasWidth = 0;
  let canvasHeight = 0;
  let mouseX = -1000;
  let mouseY = -1000;
  let animationId = 0;
  let backgroundRunning = false;

  function resizeCanvas() {
    if (!useCanvas || !canvas || !context) return;
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;
    canvas.width = Math.round(canvasWidth * ratio);
    canvas.height = Math.round(canvasHeight * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    const count = Math.min(44, Math.max(24, Math.round(canvasWidth * canvasHeight / 30000)));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvasWidth,
      y: Math.random() * canvasHeight,
      vx: (Math.random() - .5) * .22,
      vy: (Math.random() - .5) * .22,
      radius: Math.random() * .9 + .35,
      gold: Math.random() < .1,
      phase: Math.random() * 6
    }));
  }

  function drawBackground() {
    if (!backgroundRunning || !context) return;
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    for (const particle of particles) {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.phase += .018;
      if (particle.x < -2) particle.x = canvasWidth + 2;
      else if (particle.x > canvasWidth + 2) particle.x = -2;
      if (particle.y < -2) particle.y = canvasHeight + 2;
      else if (particle.y > canvasHeight + 2) particle.y = -2;

      const dx = particle.x - mouseX;
      const dy = particle.y - mouseY;
      const distanceSquared = dx * dx + dy * dy;
      if (distanceSquared < 12000) {
        const force = (1 - distanceSquared / 12000) * .025;
        particle.x += dx * force;
        particle.y += dy * force;
      }
      const alpha = .28 + .22 * Math.sin(particle.phase);
      context.fillStyle = particle.gold
        ? `rgba(223,193,122,${alpha + .08})`
        : `rgba(190,210,250,${alpha})`;
      context.beginPath();
      context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      context.fill();
    }

    /* Short-range links drawn as ONE path per frame (much cheaper than one stroke per link). */
    context.strokeStyle = 'rgba(140,170,230,.07)';
    context.lineWidth = .7;
    context.beginPath();
    for (let i = 0; i < particles.length; i += 1) {
      for (let j = i + 1; j < particles.length; j += 1) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        if (dx * dx + dy * dy < 7800) {
          context.moveTo(particles[i].x, particles[i].y);
          context.lineTo(particles[j].x, particles[j].y);
        }
      }
    }
    context.stroke();
    animationId = window.requestAnimationFrame(drawBackground);
  }

  function startBackground() {
    if (!useCanvas || document.hidden || backgroundRunning) return;
    backgroundRunning = true;
    animationId = window.requestAnimationFrame(drawBackground);
  }
  function stopBackground() {
    backgroundRunning = false;
    if (animationId) window.cancelAnimationFrame(animationId);
    animationId = 0;
  }
  if (useCanvas) {
    resizeCanvas();
    startBackground();
    window.addEventListener('resize', () => {
      if (window.innerWidth <= 760) {
        stopBackground();
      } else {
        resizeCanvas();
        startBackground();
      }
    }, { passive: true });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stopBackground();
      else startBackground();
    });
  }

  /* Pointer-driven glow and photo tilt. This does not run on touch screens. */
  if (finePointer && window.innerWidth > 820 && !reducedMotion) {
    const stage = $('#stage');
    const glow = $('#glow');
    let pointerFrame = 0;
    let lastPointerEvent = null;
    window.addEventListener('pointermove', (event) => {
      lastPointerEvent = event;
      if (pointerFrame) return;
      pointerFrame = window.requestAnimationFrame(() => {
        pointerFrame = 0;
        if (!lastPointerEvent) return;
        const x = lastPointerEvent.clientX;
        const y = lastPointerEvent.clientY;
        if (glow) glow.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        mouseX = x;
        mouseY = y;

        if (stage) {
          const bounds = stage.getBoundingClientRect();
          const clamp = (value) => Math.max(-1, Math.min(1, value));
          stage.style.setProperty('--px', clamp((x - bounds.left - bounds.width / 2) / (window.innerWidth / 2)).toFixed(3));
          stage.style.setProperty('--py', clamp((y - bounds.top - bounds.height / 2) / (window.innerHeight / 2)).toFixed(3));
        }

        const card = lastPointerEvent.target?.closest?.('.card');
        if (card) {
          const bounds = card.getBoundingClientRect();
          card.style.setProperty('--mx', `${x - bounds.left}px`);
          card.style.setProperty('--my', `${y - bounds.top}px`);
        }
      });
    }, { passive: true });
    document.documentElement.addEventListener('mouseleave', () => {
      mouseX = mouseY = -1000;
      stage?.style.setProperty('--px', '0');
      stage?.style.setProperty('--py', '0');
    });
  }

  /* Typing headline. Reduced-motion users receive a stable line immediately. */
  const typingTarget = $('#ty');
  let typingTimer = 0;
  let wordIndex = 0;
  let characterIndex = 0;
  let deleting = false;
  function typeNext() {
    if (!typingTarget || document.hidden) return;
    const word = WORDS[wordIndex];
    characterIndex += deleting ? -1 : 1;
    typingTarget.textContent = word.slice(0, characterIndex);
    let delay = deleting ? 28 : 55;
    if (!deleting && characterIndex >= word.length) {
      deleting = true;
      delay = 1250;
    } else if (deleting && characterIndex <= 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % WORDS.length;
      delay = 240;
    }
    typingTimer = window.setTimeout(typeNext, delay);
  }
  if (typingTarget) {
    if (reducedMotion) typingTarget.textContent = WORDS[0];
    else typingTimer = window.setTimeout(typeNext, 280);
  }
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) window.clearTimeout(typingTimer);
    else if (!reducedMotion && typingTarget) typingTimer = window.setTimeout(typeNext, 180);
  });

  /* Scroll reveal and skill bars. Content remains visible if IntersectionObserver is missing. */
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('go');
        $$('.bar i', entry.target).forEach((bar) => { bar.style.transform = `scaleX(${(bar.dataset.w || 0) / 100})`; });
        observer.unobserve(entry.target);
      });
    }, { threshold: .08 });
    $$('.rv').forEach((element) => revealObserver.observe(element));

    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        const target = Number(entry.target.dataset.n || 0);
        if (reducedMotion) {
          entry.target.textContent = String(target);
          return;
        }
        const start = performance.now();
        const duration = 850;
        const update = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          entry.target.textContent = String(Math.round(target * (1 - (1 - progress) ** 3)));
          if (progress < 1) window.requestAnimationFrame(update);
        };
        window.requestAnimationFrame(update);
      });
    }, { threshold: .55 });
    $$('.cn').forEach((counter) => counterObserver.observe(counter));
  } else {
    $$('.cn').forEach((counter) => { counter.textContent = counter.dataset.n || '0'; });
    $$('.bar i').forEach((bar) => { bar.style.transform = `scaleX(${(bar.dataset.w || 0) / 100})`; });
  }

  /* Scroll progress indicator, throttled to one write per animation frame. */
  const progressBar = $('#bar');
  let progressFrame = 0;
  window.addEventListener('scroll', () => {
    if (!progressBar || progressFrame) return;
    progressFrame = window.requestAnimationFrame(() => {
      progressFrame = 0;
      progressBar.style.transform = `scaleX(${Math.min(1, Math.max(0, window.scrollY / maxScroll))})`;
    });
  }, { passive: true });

  /* Expand/collapse experience details with matching accessibility state. */
  $$('.jh').forEach((button) => {
    const job = button.closest('.job');
    const panel = button.getAttribute('aria-controls') ? $(`#${button.getAttribute('aria-controls')}`) : $('.jb', job);
    const setExpanded = (expanded) => {
      job?.classList.toggle('open', expanded);
      button.setAttribute('aria-expanded', String(expanded));
      if (panel) panel.setAttribute('aria-hidden', String(!expanded));
      window.setTimeout(measure, 320);
    };
    setExpanded(Boolean(job?.classList.contains('open')));
    button.addEventListener('click', () => setExpanded(!job?.classList.contains('open')));
  });

  /* Copy email with a clipboard fallback for non-secure/local previews. */
  const copyButton = $('#copy-email');
  const toast = $('#ts');
  let toastTimer = 0;
  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('s');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('s'), 2100);
  };
  copyButton?.addEventListener('click', async () => {
    let copied = false;
    try {
      if (navigator.clipboard?.writeText && window.isSecureContext) {
        await navigator.clipboard.writeText(EMAIL);
        copied = true;
      } else {
        const field = document.createElement('textarea');
        field.value = EMAIL;
        field.setAttribute('readonly', '');
        field.style.position = 'fixed';
        field.style.opacity = '0';
        field.style.pointerEvents = 'none';
        document.body.appendChild(field);
        field.select();
        copied = document.execCommand('copy');
        field.remove();
      }
    } catch (error) {
      copied = false;
    }
    if (copied) {
      const use = $('use', copyButton);
      use?.setAttribute('href', '#ok');
      copyButton.setAttribute('aria-label', 'Email copied');
      window.clearTimeout(toastTimer);
      toastTimer = window.setTimeout(() => {
        use?.setAttribute('href', '#copy-icon');
        copyButton.setAttribute('aria-label', 'Copy email');
      }, 1800);
    } else {
      window.prompt('Copy this email:', EMAIL);
    }
  });
})();
