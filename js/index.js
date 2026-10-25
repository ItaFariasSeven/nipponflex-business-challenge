/**
 * Nipponflex — Interatividade
 * Scroll lateral, header dinâmico e efeitos
 */

document.addEventListener('DOMContentLoaded', () => {
  initHorizontalScroll();
  initHeaderScroll();
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
