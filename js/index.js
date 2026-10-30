/**
 * Nipponflex — Interatividade
 * Scroll lateral, header dinâmico e efeitos
 */

document.addEventListener('DOMContentLoaded', () => {
  initHorizontalScroll();
  initHeaderScroll();
  initMobileNavigation();
});

function initHorizontalScroll() {
  const buttons = document.querySelectorAll('.scroll-btn');

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-target');
      const container = document.getElementById(targetId);

      if (!container) return;

      const scrollAmount = 320;
      const direction = button.classList.contains('left') ? -1 : 1;

      container.scrollBy({
        left: scrollAmount * direction,
        behavior: 'smooth',
      });
    });
  });
}

function initHeaderScroll() {
  const header = document.getElementById('header');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

function initMobileNavigation() {
  const menuButton = document.querySelector('[data-mobile-menu-toggle]');
  const navigation = document.getElementById('primary-navigation');

  if (!menuButton || !navigation) return;

  const setMenuOpen = (isOpen) => {
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
    menuButton.classList.toggle('is-open', isOpen);
    navigation.classList.toggle('is-open', isOpen);
  };

  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    setMenuOpen(!isOpen);
  });

  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMenuOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      setMenuOpen(false);
      menuButton.focus();
    }
  });

  window.matchMedia('(min-width: 768px)').addEventListener('change', () => {
    setMenuOpen(false);
  });
}
