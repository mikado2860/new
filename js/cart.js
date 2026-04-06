// ===== CART STATE =====
let cart = JSON.parse(localStorage.getItem('te_cart') || '[]');

function saveCart() {
  localStorage.setItem('te_cart', JSON.stringify(cart));
}

function addToCartById(id, qty = 1) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  const ex = cart.find(x => x.id === id);
  if (ex) ex.qty += qty;
  else cart.push({ ...p, qty });
  saveCart();
  updateCartUI();
  showToast('✓ ' + p.name + ' added to cart!');
}

function changeQty(id, delta) {
  const item = cart.find(x => x.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(x => x.id !== id);
  saveCart();
  updateCartUI();
}

function removeFromCart(id) {
  cart = cart.filter(x => x.id !== id);
  saveCart();
  updateCartUI();
}

function updateCartUI() {
  const total = cart.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cart.reduce((s, i) => s + i.price * i.qty, 0);

  document.querySelectorAll('.cart-badge').forEach(el => el.textContent = total);
  document.querySelectorAll('.cart-count-label').forEach(el => el.textContent = total);
  document.querySelectorAll('.cart-total-price').forEach(el => el.textContent = '₦' + totalPrice.toLocaleString());

  const ci = document.getElementById('cartItems');
  const cf = document.getElementById('cartFooter');
  if (!ci) return;

  if (cart.length === 0) {
    ci.innerHTML = '<div class="cart-empty"><div>🛍️</div><p>Your cart is empty</p></div>';
    if (cf) cf.style.display = 'none';
  } else {
    if (cf) cf.style.display = 'block';
    ci.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="ci-img">${item.emoji}</div>
        <div class="ci-info">
          <div class="ci-name">${item.name}</div>
          <div class="ci-price">₦${item.price.toLocaleString()}</div>
          <div class="ci-qty">
            <button class="qty-btn" onclick="changeQty(${item.id},-1)">−</button>
            <span>${item.qty}</span>
            <button class="qty-btn" onclick="changeQty(${item.id},1)">+</button>
          </div>
        </div>
        <button class="ci-remove" onclick="removeFromCart(${item.id})">✕</button>
      </div>
    `).join('');
  }
}

function toggleCart() {
  const panel = document.getElementById('cartPanel');
  const overlay = document.getElementById('cartOverlay');
  if (panel) panel.classList.toggle('open');
  if (overlay) overlay.classList.toggle('open');
}

function checkout() {
  if (cart.length === 0) return showToast('Your cart is empty!');
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const items = cart.map(i => `${i.qty}x ${i.name}`).join(', ');
  const msg = `Hello Tricia Empire! I'd like to order:\n${items}\nTotal: ₦${total.toLocaleString()}`;
  window.open('https://wa.me/2348000000000?text=' + encodeURIComponent(msg), '_blank');
}

function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// Modal state
let modalProduct = null;
let modalQtyVal = 1;

function openModal(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  modalProduct = p;
  modalQtyVal = 1;
  document.getElementById('modalImg').textContent = p.emoji;
  document.getElementById('modalName').textContent = p.name;
  document.getElementById('modalStars').textContent = '★'.repeat(p.stars) + '☆'.repeat(5 - p.stars);
  document.getElementById('modalPrice').textContent = '₦' + p.price.toLocaleString();
  document.getElementById('modalDesc').textContent = p.desc;
  document.getElementById('modalQty').textContent = '1';
  document.getElementById('modalNotes').innerHTML = p.notes.map(n => `<span class="note-tag">${n}</span>`).join('');
  document.getElementById('modalOverlay').classList.add('open');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  modalProduct = null;
}

function changeModalQty(d) {
  modalQtyVal = Math.max(1, modalQtyVal + d);
  document.getElementById('modalQty').textContent = modalQtyVal;
}

function addFromModal() {
  if (!modalProduct) return;
  addToCartById(modalProduct.id, modalQtyVal);
  closeModal();
}

function addToWishlist() {
  closeModal();
  showToast('Added to wishlist! ♡');
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartUI();
});
