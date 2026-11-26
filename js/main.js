/**
 * Interatividade e Animações — Estilo Vision
 * Projeto: "Consciência Negra, Mulheres Negras e Cultura de Paz"
 * E.E. Carlos Chagas (Lassance/MG) — EMTI
 */

document.addEventListener('DOMContentLoaded', () => {

  // ========================================================================
  // 1. Slider Automático de 3 Slides do Hero (Réplica do Mockup Vision)
  // ========================================================================
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.dot-btn');
  const currentNumEl = document.getElementById('current-slide-num');
  const pauseBtn = document.getElementById('slider-pause');
  const heroSection = document.querySelector('.hero-slider-section');

  let currentSlide = 0;
  const totalSlides = slides.length;
  const slideIntervalTime = 5000; // ~5 segundos conforme especificado
  let slideTimer = null;
  let isPausedByUser = false;
  let isHovered = false;

  function goToSlide(index) {
    if (index === currentSlide) return;

    // Desativa slide atual
    slides[currentSlide].classList.remove('active');
    if (dots[currentSlide]) {
      dots[currentSlide].classList.remove('active');
      dots[currentSlide].setAttribute('aria-selected', 'false');
    }

    // Ativa novo slide
    currentSlide = (index + totalSlides) % totalSlides;
    slides[currentSlide].classList.add('active');

    if (dots[currentSlide]) {
      dots[currentSlide].classList.add('active');
      dots[currentSlide].setAttribute('aria-selected', 'true');
    }

    // Atualiza contador numérico (01, 02, 03)
    if (currentNumEl) {
      currentNumEl.textContent = String(currentSlide + 1).padStart(2, '0');
    }
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function startAutoplay() {
    stopAutoplay();
    if (!isPausedByUser && !isHovered) {
      slideTimer = setInterval(nextSlide, slideIntervalTime);
    }
  }

  function stopAutoplay() {
    if (slideTimer) {
      clearInterval(slideTimer);
      slideTimer = null;
    }
  }

  // Cliques nos indicadores
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const target = parseInt(dot.getAttribute('data-target'), 10);
      goToSlide(target);
      startAutoplay();
    });
  });

  // Pausa ao passar o mouse e ao focar o teclado
  if (heroSection) {
    heroSection.addEventListener('mouseenter', () => {
      isHovered = true;
      stopAutoplay();
    });

    heroSection.addEventListener('mouseleave', () => {
      isHovered = false;
      startAutoplay();
    });

    heroSection.addEventListener('focusin', () => {
      isHovered = true;
      stopAutoplay();
    });

    heroSection.addEventListener('focusout', () => {
      isHovered = false;
      startAutoplay();
    });

    // Suporte a swipe no mobile
    let touchStartX = 0;
    let touchEndX = 0;

    heroSection.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    heroSection.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const diff = touchEndX - touchStartX;
      if (Math.abs(diff) > 50) {
        if (diff < 0) {
          nextSlide(); // swipe esquerda
        } else {
          goToSlide(currentSlide - 1); // swipe direita
        }
        startAutoplay();
      }
    }
  }

  // Botão de Pausa / Reprodução para acessibilidade
  if (pauseBtn) {
    pauseBtn.addEventListener('click', () => {
      isPausedByUser = !isPausedByUser;
      const icon = pauseBtn.querySelector('.playback-icon');

      if (isPausedByUser) {
        stopAutoplay();
        pauseBtn.setAttribute('aria-label', 'Retomar alternância automática de slides');
        if (icon) icon.textContent = '▶';
      } else {
        startAutoplay();
        pauseBtn.setAttribute('aria-label', 'Pausar alternância automática de slides');
        if (icon) icon.textContent = '⏸';
      }
    });
  }

  // Inicia o timer inicial
  startAutoplay();

  // ========================================================================
  // 2. Barra Superior e Menu Mobile
  // ========================================================================
  const topBar = document.getElementById('barra-superior');
  const mobileToggle = document.getElementById('mobile-toggle');
  const mainMenu = document.getElementById('menu-principal');
  const navItems = document.querySelectorAll('.nav-item');

  // Adiciona fundo mais sólido ao rolar
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      topBar.classList.add('scrolled');
    } else {
      topBar.classList.remove('scrolled');
    }
  }, { passive: true });

  // Alternância do menu mobile
  if (mobileToggle && mainMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mainMenu.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', !isOpen);
      mainMenu.classList.toggle('open');
    });

    // Fecha ao clicar em qualquer item
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        if (mainMenu.classList.contains('open')) {
          mobileToggle.setAttribute('aria-expanded', 'false');
          mainMenu.classList.remove('open');
        }
      });
    });

    // Fecha ao pressionar Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mainMenu.classList.contains('open')) {
        mobileToggle.setAttribute('aria-expanded', 'false');
        mainMenu.classList.remove('open');
      }
    });
  }

  // ========================================================================
  // 3. Scroll Spy para o Menu Ativo
  // ========================================================================
  const sections = document.querySelectorAll('section[id], footer[id]');
  
  function updateActiveMenu() {
    const scrollPos = window.scrollY + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navItems.forEach(item => {
          if (item.getAttribute('href') === `#${id}`) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveMenu, { passive: true });
  updateActiveMenu();

  // ========================================================================
  // 4. Animação dos Contadores Numéricos (com IntersectionObserver)
  // ========================================================================
  const statBoxes = document.querySelectorAll('.stat-box');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function formatarNumero(val, isPercent) {
    if (isPercent) {
      return val.toFixed(1).replace('.', ',');
    }
    return Math.round(val).toLocaleString('pt-BR');
  }

  function animarContador(box) {
    const target = parseFloat(box.getAttribute('data-target'));
    const isPercent = box.getAttribute('data-format') === 'percent';
    const valEl = box.querySelector('.stat-val');

    if (!valEl || isNaN(target)) return;

    if (prefersReduced) {
      valEl.textContent = formatarNumero(target, isPercent);
      return;
    }

    const duration = 1800; // 1.8 segundos
    const startTime = performance.now();

    function frame(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Easing suave (ease-out cubic)
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = target * ease;

      valEl.textContent = formatarNumero(current, isPercent);

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        valEl.textContent = formatarNumero(target, isPercent);
      }
    }

    requestAnimationFrame(frame);
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animarContador(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });

    statBoxes.forEach(box => observer.observe(box));
  } else {
    statBoxes.forEach(box => animarContador(box));
  }

});
