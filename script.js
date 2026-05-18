// ===== PRODUCT DATA =====
const products = [
  { id: 1, name: 'Cuddly Bear Plushie', emoji: '🧸', price: 18.99, age: 'baby', ageLabel: '0–2 yrs', desc: 'Softly weighted, machine washable. Your baby\'s first best friend.', badge: 'new', bg: '#FFF3E0' },
  { id: 2, name: 'Rainbow Stacking Rings', emoji: '🔵', price: 14.99, age: 'baby', ageLabel: '0–2 yrs', desc: 'Smooth BPA-free rings in 8 vivid colours. Perfect for tiny hands.', badge: null, bg: '#E8F5E9' },
  { id: 3, name: 'Cloud Mobile', emoji: '☁️', price: 24.99, age: 'baby', ageLabel: '0–2 yrs', desc: 'Gentle music and slow rotation. Drift to dreamland together.', badge: 'hot', bg: '#E3F2FD' },
  { id: 4, name: 'Wooden Shape Sorter', emoji: '🔶', price: 21.99, age: 'toddler', ageLabel: '3–5 yrs', desc: 'FSC-certified oak with 12 bold shapes. Builds logic and dexterity.', badge: null, bg: '#FFF8E1' },
  { id: 5, name: 'Finger Paint Set', emoji: '🎨', price: 12.99, age: 'toddler', ageLabel: '3–5 yrs', desc: '8 washable colours. Mess is the point.', badge: 'sale', bg: '#FCE4EC' },
  { id: 6, name: 'Dino Figurine Pack', emoji: '🦕', price: 19.99, age: 'toddler', ageLabel: '3–5 yrs', desc: '12 detailed prehistoric pals. Sparks storytelling and curiosity.', badge: null, bg: '#E8F5E9' },
  { id: 7, name: 'Space Explorer Kit', emoji: '🚀', price: 34.99, age: 'kids', ageLabel: '6–10 yrs', desc: 'Build a real solar system model with glow-in-the-dark planets.', badge: 'hot', bg: '#EDE7F6' },
  { id: 8, name: 'Strategy Board Game', emoji: '♟️', price: 27.99, age: 'kids', ageLabel: '6–10 yrs', desc: 'Classic chess re-imagined with adventure quests. 2–4 players.', badge: null, bg: '#F3E5F5' },
  { id: 9, name: 'Bug Catcher Lab', emoji: '🐛', price: 16.99, age: 'kids', ageLabel: '6–10 yrs', desc: 'Magnifying habitat, field guide, and tweezers. Science starts here.', badge: 'new', bg: '#E0F7FA' },
  { id: 10, name: 'Coding Robot Rover', emoji: '🤖', price: 54.99, age: 'tween', ageLabel: '11+ yrs', desc: 'Program with blocks or Python. Your first robot friend.', badge: 'new', bg: '#E8F5E9' },
  { id: 11, name: 'Crystal Growing Kit', emoji: '💎', price: 22.99, age: 'tween', ageLabel: '11+ yrs', desc: 'Grow 6 stunning crystals. Real chemistry, real results.', badge: null, bg: '#E3F2FD' },
  { id: 12, name: 'Sketch & Comic Set', emoji: '✏️', price: 29.99, age: 'tween', ageLabel: '11+ yrs', desc: 'Pro-grade markers, stencils, and a guided manga sketchbook.', badge: 'hot', bg: '#FFF3E0' },
];

// ===== CART =====
let cart = [];

function addToCart(product) {
  cart.push(product);
  renderCart();
  updateCartCount();
  showToast(`${product.emoji} ${product.name} added to basket!`);
  animateCartBtn();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
  updateCartCount();
}

function renderCart() {
  const cartItems = document.getElementById('cartItems');
  const cartFooter = document.getElementById('cartFooter');
  const cartTotal = document.getElementById('cartTotal');

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="cart-empty">Your basket is empty.</p>';
    cartFooter.style.display = 'none';
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartTotal.textContent = `£${total.toFixed(2)}`;
  cartFooter.style.display = 'block';

  cartItems.innerHTML = cart.map((item, i) => `
    <div class="cart-item">
      <div class="cart-item-emoji">${item.emoji}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">£${item.price.toFixed(2)}</div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${i})" aria-label="Remove">✕</button>
    </div>
  `).join('');
}

function updateCartCount() {
  const count = document.getElementById('cartCount');
  count.textContent = cart.length;
  if (cart.length > 0) {
    count.classList.add('visible');
  } else {
    count.classList.remove('visible');
  }
}

function animateCartBtn() {
  const btn = document.getElementById('cartBtn');
  btn.style.transform = 'scale(1.3)';
  setTimeout(() => btn.style.transform = '', 200);
}

// ===== CART OPEN/CLOSE =====
function openCart() {
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('cartOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('cartBtn').addEventListener('click', openCart);
document.getElementById('cartOverlay').addEventListener('click', closeCart);

// ===== PRODUCT GRID =====
function renderProducts(filter = 'all') {
  const grid = document.getElementById('productGrid');
  const filtered = filter === 'all' ? products : products.filter(p => p.age === filter);

  grid.innerHTML = filtered.map((p, i) => `
    <div class="product-card" style="animation-delay: ${i * 0.05}s">
      <div class="product-img" style="background: ${p.bg}">
        ${p.badge ? `<span class="product-badge badge-${p.badge}">${p.badge}</span>` : ''}
        <span style="display:block">${p.emoji}</span>
      </div>
      <div class="product-info">
        <div class="product-age">${p.ageLabel}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-desc">${p.desc}</div>
        <div class="product-footer">
          <span class="product-price">£${p.price.toFixed(2)}</span>
          <button class="add-btn" onclick='addToCart(${JSON.stringify({name: p.name, price: p.price, emoji: p.emoji, age: p.age})})' aria-label="Add to cart">+</button>
        </div>
      </div>
    </div>
  `).join('');
}

// ===== FILTER =====
function filterProducts(filter, tabEl) {
  renderProducts(filter);

  // Update active tab
  if (tabEl) {
    document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    tabEl.classList.add('active');
  }

  // Scroll to featured section
  document.getElementById('featured').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ===== SEARCH =====
let searchOpen = false;

document.getElementById('searchBtn').addEventListener('click', () => {
  searchOpen = !searchOpen;
  const modal = document.getElementById('searchModal');
  if (searchOpen) {
    modal.classList.add('open');
    document.getElementById('searchInput').focus();
  } else {
    closeSearch();
  }
});

function closeSearch() {
  searchOpen = false;
  document.getElementById('searchModal').classList.remove('open');
  document.getElementById('searchInput').value = '';
  document.getElementById('searchResults').innerHTML = '';
}

document.getElementById('searchInput').addEventListener('input', function () {
  const query = this.value.trim().toLowerCase();
  const resultsEl = document.getElementById('searchResults');

  if (!query) { resultsEl.innerHTML = ''; return; }

  const matches = products.filter(p =>
    p.name.toLowerCase().includes(query) ||
    p.desc.toLowerCase().includes(query) ||
    p.ageLabel.toLowerCase().includes(query)
  );

  if (matches.length === 0) {
    resultsEl.innerHTML = '<p style="color:var(--ink-light);font-size:14px;padding:16px 0">No toys found.</p>';
    return;
  }

  resultsEl.innerHTML = matches.map(p => `
    <div class="search-result-item" onclick='addToCart(${JSON.stringify({name: p.name, price: p.price, emoji: p.emoji, age: p.age})}); closeSearch();'>
      <span class="search-result-emoji">${p.emoji}</span>
      <div class="search-result-info">
        <div class="search-result-name">${p.name}</div>
        <div class="search-result-price">${p.ageLabel} · £${p.price.toFixed(2)}</div>
      </div>
    </div>
  `).join('');
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeSearch();
    closeCart();
  }
});

// ===== TOAST =====
let toastTimer;
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}

// ===== MOBILE NAV =====
document.getElementById('navToggle').addEventListener('click', function () {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('open');
});

// ===== CONFETTI =====
function spawnConfetti() {
  const container = document.getElementById('confetti');
  const colours = ['#FFD94A', '#FF6B6B', '#2EC4B6', '#FF9F43', '#A29BFE', '#FD79A8'];
  for (let i = 0; i < 24; i++) {
    const el = document.createElement('div');
    el.classList.add('confetti-piece');
    el.style.cssText = `
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 30}%;
      background: ${colours[Math.floor(Math.random() * colours.length)]};
      width: ${6 + Math.random() * 8}px;
      height: ${6 + Math.random() * 8}px;
      border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
      animation-duration: ${4 + Math.random() * 6}s;
      animation-delay: ${Math.random() * 4}s;
    `;
    container.appendChild(el);
  }
}

// ===== SCROLL ANIMATION =====
function observeCards() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.about-card, .cat-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  renderCart();
  spawnConfetti();
  setTimeout(observeCards, 100);
});