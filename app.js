// ==========================================================================
// NEW YORK LIFE · CORE GAME CLIENT LOGIC
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // --- State ---
  let playerCash = 2500;
  let isSoundMuted = false;
  let isDrawerOpen = true;

  // --- Elements ---
  const cashDisplay = document.getElementById('cashDisplay');
  const addCashBtn = document.getElementById('addCashBtn');
  const soundBtn = document.getElementById('soundBtn');
  const downloadBtn = document.getElementById('downloadBtn');
  const navTabs = document.querySelectorAll('.nav-dock-tab');
  const centerNavDock = document.getElementById('centerNavDock');
  const characterVitalsCard = document.getElementById('characterVitalsCard');
  const catPills = document.querySelectorAll('.cat-pill');
  const searchInput = document.getElementById('searchInput');
  const productCards = document.querySelectorAll('.product-card');
  const productCardsRow = document.getElementById('productCardsRow');
  const carouselNextBtn = document.getElementById('carouselNextBtn');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const buyModeDrawer = document.getElementById('buyModeDrawer');
  const playerStage = document.getElementById('playerStage');
  const toastContainer = document.getElementById('toastContainer');
  const questCards = document.querySelectorAll('.hud-card');

  // --- Helper: Format Cash ---
  function formatCash(num) {
    return '$' + num.toLocaleString('en-US');
  }

  // --- Helper: Show Game Toast ---
  function showToast(message, icon = '🛒') {
    const toast = document.createElement('div');
    toast.className = 'game-toast';
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.25s ease';
      setTimeout(() => toast.remove(), 250);
    }, 2800);
  }

  // --- Open / Close Drawer Helper ---
  function setDrawerOpen(open) {
    isDrawerOpen = open;
    if (open) {
      buyModeDrawer.classList.remove('minimized');
      centerNavDock.classList.remove('dock-at-bottom');
      characterVitalsCard.classList.remove('vitals-at-bottom');
      document.querySelectorAll('.nav-dock-tab').forEach(t => t.classList.remove('active'));
      document.getElementById('navBuyTab')?.classList.add('active');
    } else {
      buyModeDrawer.classList.add('minimized');
      centerNavDock.classList.add('dock-at-bottom');
      characterVitalsCard.classList.add('vitals-at-bottom');
    }
  }

  // --- Add Cash Interaction ---
  if (addCashBtn) {
    addCashBtn.addEventListener('click', () => {
      playerCash += 1000;
      cashDisplay.textContent = formatCash(playerCash);
      showToast('Added $1,000 to your bank account!', '💵');
    });
  }

  // --- Audio Toggle ---
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      isSoundMuted = !isSoundMuted;
      soundBtn.style.color = isSoundMuted ? '#94a3b8' : '#0f172a';
      showToast(isSoundMuted ? 'Game Audio Muted' : 'Game Audio Active', isSoundMuted ? '🔇' : '🔊');
    });
  }

  // --- Quick Save / Download ---
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      showToast('Apartment layout saved successfully!', '💾');
    });
  }

  // --- Nav Dock Tab Switching ---
  navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      navTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const tabText = tab.querySelector('span')?.textContent.trim();
      if (tabText === 'Buy') {
        setDrawerOpen(true);
      } else {
        setDrawerOpen(false);
        showToast(`Switched view to ${tabText}`, '📍');
      }
    });
  });

  // --- Drawer Close / Minimize Button ---
  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', () => {
      setDrawerOpen(false);
      document.getElementById('navBuyTab')?.classList.remove('active');
      document.getElementById('navHomeTab')?.classList.add('active');
      showToast('Buy Mode closed. View cleared!', '✨');
    });
  }

  // --- Category Filtering ---
  catPills.forEach(pill => {
    pill.addEventListener('click', () => {
      catPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const selectedCat = pill.dataset.category.toLowerCase();
      const currentQuery = (searchInput?.value || '').toLowerCase().trim();

      filterCards(selectedCat, currentQuery);
    });
  });

  // --- Search Filtering ---
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const activePill = document.querySelector('.cat-pill.active');
      const selectedCat = (activePill?.dataset.category || 'all').toLowerCase();
      const query = e.target.value.toLowerCase().trim();

      filterCards(selectedCat, query);
    });
  }

  function filterCards(cat, query) {
    productCards.forEach(card => {
      const cardCat = (card.dataset.cat || '').toLowerCase();
      const cardName = (card.dataset.name || '').toLowerCase();

      const matchesCat = (cat === 'all') || (cardCat === cat);
      const matchesSearch = !query || cardName.includes(query);

      if (matchesCat && matchesSearch) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  // --- Purchase Interaction ---
  document.querySelectorAll('.card-cart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.product-card');
      const name = card.dataset.name;
      const price = parseInt(card.dataset.price, 10);

      if (playerCash >= price) {
        playerCash -= price;
        cashDisplay.textContent = formatCash(playerCash);
        showToast(`Purchased ${name} for ${formatCash(price)}! Placed in apartment.`, '✨');
      } else {
        showToast(`Insufficient funds for ${name}! Need ${formatCash(price)}.`, '⚠️');
      }
    });
  });

  // --- Product Card Click Preview ---
  productCards.forEach(card => {
    card.addEventListener('click', () => {
      const name = card.dataset.name;
      const price = parseInt(card.dataset.price, 10);
      showToast(`Selected ${name} (${formatCash(price)}) for preview`, '🛋️');
    });
  });

  // --- Carousel Scroll Right Button ---
  if (carouselNextBtn && productCardsRow) {
    carouselNextBtn.addEventListener('click', () => {
      productCardsRow.scrollBy({ left: 380, behavior: 'smooth' });
    });
  }

  // --- Interactive Player Ring / Stage ---
  if (playerStage) {
    playerStage.addEventListener('click', () => {
      showToast('Alex · Brooklyn Resident · Level 14 Designer', '⭐');
    });
  }

  // --- Quest Card Clicks ---
  questCards.forEach(card => {
    card.addEventListener('click', () => {
      const title = card.querySelector('.card-title')?.textContent;
      showToast(`Quest: ${title} tracked`, '📋');
    });
  });
});
