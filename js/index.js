document.addEventListener('DOMContentLoaded', () => {
  initHorizontalScroll();
  initHeaderScroll();
  initWhatsAppCart();
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
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

function initWhatsAppCart() {

  const TELEFONE_VENDEDORA = 'numero';

  let carrinho = JSON.parse(localStorage.getItem('nipponflex_carrinho')) || [];

  const whatsappBtn = document.createElement('a');
  whatsappBtn.id = 'whatsapp-float-btn';
  whatsappBtn.href = '#';
  whatsappBtn.target = '_blank';
  whatsappBtn.rel = 'noopener noreferrer';
  whatsappBtn.setAttribute('aria-label', 'Falar no WhatsApp');
  whatsappBtn.style.cssText = `
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 92px;
    height: 92px;
    background-color: #25D366;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
    z-index: 9999;
    transition: transform 0.2s ease;
    text-decoration: none;
  `;

  whatsappBtn.innerHTML = `
    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824z"/>
    </svg>
    <span id="whatsapp-badge" style="
      position: absolute;
      top: -2px;
      right: -2px;
      background-color: #ef4444;
      color: white;
      font-family: Arial, sans-serif;
      font-size: 13px;
      font-weight: bold;
      min-width: 24px;
      height: 24px;
      padding: 0 5px;
      border-radius: 999px;
      display: none;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
    ">0</span>
  `;

  whatsappBtn.addEventListener('mouseenter', () => (whatsappBtn.style.transform = 'scale(1.08)'));
  whatsappBtn.addEventListener('mouseleave', () => (whatsappBtn.style.transform = 'scale(1)'));


  
  whatsappBtn.addEventListener('click', () => {
    if (carrinho.length > 0) {
      setTimeout(() => {
        carrinho = [];
        localStorage.removeItem('nipponflex_carrinho');
        atualizarWhatsApp();
      }, 150);
    }
  });

  document.body.appendChild(whatsappBtn);

  const badge = document.getElementById('whatsapp-badge');

  function atualizarWhatsApp() {
    localStorage.setItem('nipponflex_carrinho', JSON.stringify(carrinho));

    const totalItens = carrinho.reduce((acc, item) => acc + item.qtd, 0);

    if (totalItens > 0) {
      badge.style.display = 'flex';
      badge.textContent = totalItens;

      let mensagem = 'Olá! Gostaria de saber mais informações sobre os seguintes produtos Nipponflex:\n\n';
      carrinho.forEach((item) => {
        mensagem += `• ${item.qtd}x ${item.nome}\n`;
      });
      mensagem += '\nAguardo seu atendimento!';

      whatsappBtn.href = `https://wa.me/${TELEFONE_VENDEDORA}?text=${encodeURIComponent(mensagem)}`;
    } else {
      badge.style.display = 'none';
      const msgPadrao = 'Olá! Vim pelo site da Nipponflex e gostaria de atendimento.';
      whatsappBtn.href = `https://wa.me/${TELEFONE_VENDEDORA}?text=${encodeURIComponent(msgPadrao)}`;
    }
  }

  const botoesAdicionar = document.querySelectorAll(
    'button[aria-label="Adicionar ao carrinho"], button[aria-label="Adicionar à sacola"]'
  );

  botoesAdicionar.forEach((btn) => {
    btn.removeAttribute('onclick');

    btn.addEventListener('click', (e) => {
      e.preventDefault();

      const card = btn.closest('article');
      const tituloEl = card ? card.querySelector('h2, h3') : null;
      const nomeProduto = tituloEl ? tituloEl.textContent.trim() : 'Produto Nipponflex';

      const itemExistente = carrinho.find((item) => item.nome === nomeProduto);
      if (itemExistente) {
        itemExistente.qtd += 1;
      } else {
        carrinho.push({ nome: nomeProduto, qtd: 1 });
      }

      atualizarWhatsApp();

      const conteudoOriginal = btn.innerHTML;
      btn.innerHTML = '✓';
      btn.style.backgroundColor = '#16a34a';
      setTimeout(() => {
        btn.innerHTML = conteudoOriginal;
        btn.style.backgroundColor = '';
      }, 800);
    });
  });

  atualizarWhatsApp();
}