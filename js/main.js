/**
 * Ann Maria Sunil - Main Interactive Portfolio Engine
 */

(function () {
  'use strict';

  // --- 1. Theme Management (Dark / Light Mode) ---
  const THEME_KEY = 'ann_portfolio_theme';
  const themeToggleBtns = document.querySelectorAll('.theme-toggle');

  const getPreferredTheme = () => {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  };

  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);

    themeToggleBtns.forEach((btn) => {
      const sunIcon = btn.querySelector('.theme-icon-sun');
      const moonIcon = btn.querySelector('.theme-icon-moon');
      if (theme === 'light') {
        if (sunIcon) sunIcon.style.display = 'none';
        if (moonIcon) moonIcon.style.display = 'block';
        btn.setAttribute('aria-label', 'Switch to dark theme');
      } else {
        if (sunIcon) sunIcon.style.display = 'block';
        if (moonIcon) moonIcon.style.display = 'none';
        btn.setAttribute('aria-label', 'Switch to light theme');
      }
    });
  };

  // Initial theme application
  applyTheme(getPreferredTheme());

  themeToggleBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });
  });

  // --- 2. Mobile Hamburger Navigation ---
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      navMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close when clicking outside or on a link
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('open')) {
        hamburger.classList.remove('open');
        navMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });

    navMenu.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- 3. Header Scrolled State ---
  const header = document.querySelector('.site-header');
  const handleScroll = () => {
    if (!header) return;
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // --- 4. Animated Typing Effect in Hero ---
  const typingElement = document.querySelector('.typing-text');
  if (typingElement) {
    const words = [
      'Computer Science Student',
      'Aspiring Software Engineer',
      'Developer',
      'AI & ML Enthusiast',
      'Creative Problem Solver'
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 90;
    const deletingSpeed = 45;
    const pauseDelay = 1800;

    const typeLoop = () => {
      const currentWord = words[wordIndex];

      if (isDeleting) {
        typingElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }

      let speed = isDeleting ? deletingSpeed : typingSpeed;

      if (!isDeleting && charIndex === currentWord.length) {
        speed = pauseDelay;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 400;
      }

      setTimeout(typeLoop, speed);
    };

    setTimeout(typeLoop, 500);
  }

  // --- 5. Scroll-Triggered Reveal Animations ---
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback if observer unsupported
    reveals.forEach((el) => el.classList.add('revealed'));
  }

  // --- 6. 3D Card Tilt Micro-Interaction ---
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

  if (!isReducedMotion && !isTouchDevice) {
    const tiltCards = document.querySelectorAll('.tilt-card, .project-card, .skill-card');

    tiltCards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -6; // max 6 deg
        const rotateY = ((x - centerX) / centerX) * 6;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });
    });
  }

  // --- 7. Custom Cursor (Desktop Only) ---
  if (!isTouchDevice && !isReducedMotion) {
    const cursorDot = document.createElement('div');
    const cursorRing = document.createElement('div');
    cursorDot.className = 'custom-cursor-dot';
    cursorRing.className = 'custom-cursor-ring';
    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorRing);

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    }, { passive: true });

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
      requestAnimationFrame(animateRing);
    };
    requestAnimationFrame(animateRing);

    // Expand cursor over interactive elements
    const hoverTargets = 'a, button, input, textarea, .filter-btn, .prompt-chip, .skill-card, .project-card, .chat-trigger';
    document.querySelectorAll(hoverTargets).forEach((el) => {
      el.addEventListener('mouseenter', () => cursorRing.classList.add('active'));
      el.addEventListener('mouseleave', () => cursorRing.classList.remove('active'));
    });
  }

  // --- 8. Back to Top Button ---
  const backToTopBtn = document.querySelector('.back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --- 9. Skills Filter Interaction (Skills Page) ---
  const filterBtns = document.querySelectorAll('.skills-filter .filter-btn');
  const skillCategories = document.querySelectorAll('.skills-category-group');

  if (filterBtns.length > 0 && skillCategories.length > 0) {
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        skillCategories.forEach((group) => {
          const cat = group.getAttribute('data-category');
          if (filter === 'all' || filter === cat) {
            group.style.display = 'block';
            group.classList.add('revealed');
          } else {
            group.style.display = 'none';
          }
        });
      });
    });
  }

  // --- 10. Contact Form Validation & Submission ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    const validateEmail = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const showError = (input, message) => {
      input.classList.add('error');
      const feedback = input.parentElement.querySelector('.form-feedback');
      if (feedback) {
        feedback.textContent = message;
        feedback.classList.add('error');
      }
    };

    const clearError = (input) => {
      input.classList.remove('error');
      const feedback = input.parentElement.querySelector('.form-feedback');
      if (feedback) {
        feedback.textContent = '';
        feedback.classList.remove('error');
      }
    };

    [nameInput, emailInput, subjectInput, messageInput].forEach((inp) => {
      if (!inp) return;
      inp.addEventListener('input', () => clearError(inp));
    });

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      let isValid = true;

      if (!nameInput.value.trim()) {
        showError(nameInput, 'Please enter your full name.');
        isValid = false;
      }

      if (!emailInput.value.trim()) {
        showError(emailInput, 'Please enter your email address.');
        isValid = false;
      } else if (!validateEmail(emailInput.value.trim())) {
        showError(emailInput, 'Please provide a valid email format.');
        isValid = false;
      }

      if (!subjectInput.value.trim()) {
        showError(subjectInput, 'Please provide a subject.');
        isValid = false;
      }

      if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
        showError(messageInput, 'Message must be at least 10 characters long.');
        isValid = false;
      }

      if (!isValid) return;

      const endpoint = contactForm.getAttribute('action') || '';
      const isPlaceholder = endpoint.includes('your-formspree-id') || endpoint === '#';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Sending...</span>`;
      }

      if (isPlaceholder) {
        // Honest notification as required: do not pretend frontend form magically works without real endpoint
        setTimeout(() => {
          showToast('Form ready! Replace the placeholder action URL with your Formspree/Web3Forms endpoint to receive real emails.', 'info');
          contactForm.reset();
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = `<span>Send Message</span> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`;
          }
        }, 800);
      } else {
        try {
          const formData = new FormData(contactForm);
          const response = await fetch(endpoint, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
          });

          if (response.ok) {
            showToast('Thank you! Your message has been sent successfully.', 'success');
            contactForm.reset();
          } else {
            showToast('Oops! There was an issue submitting the form. Please try again or email directly.', 'error');
          }
        } catch (error) {
          showToast('Network error while sending. Please contact via direct email.', 'error');
        } finally {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = `<span>Send Message</span>`;
          }
        }
      }
    });
  }

  // --- 11. Copy to Clipboard Utility ---
  window.copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`${label || 'Copied'} to clipboard!`, 'success');
    }).catch(() => {
      showToast('Could not copy automatically.', 'info');
    });
  };

  // --- 12. Toast Notification System ---
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  window.showToast = (message, type = 'info') => {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let iconColor = '#22D3EE';
    if (type === 'success') iconColor = '#10B981';
    if (type === 'error') iconColor = '#EF4444';

    toast.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="2">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4500);
  };

  // --- 13. Initialize Lucide Icons if available ---
  document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
      lucide.createIcons();
    }
  });

})();

