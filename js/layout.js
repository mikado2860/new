// ===== SHARED LAYOUT =====
function getBasePath() {
  // Detect if we're in /pages/ subfolder
  return window.location.pathname.includes('/pages/') ? '../' : './';
}

function renderLayout() {
  const base = getBasePath();
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  // TOPBAR + HEADER + NAV
  const headerHTML = `
  <a href="${base}pages/category.html?cat=all&gender=all" class="whatsapp-fab" style="background:#25d366;" title="WhatsApp">💬</a>

  <div class="cart-overlay" id="cartOverlay" onclick="toggleCart()"></div>
  <div class="cart-panel" id="cartPanel">
    <div class="cart-header">
      <h3>🛒 Cart (<span class="cart-count-label">0</span>)</h3>
      <button class="cart-close" onclick="toggleCart()">✕</button>
    </div>
    <div class="cart-items" id="cartItems">
      <div class="cart-empty"><div>🛍️</div><p>Your cart is empty</p></div>
    </div>
    <div class="cart-footer" id="cartFooter" style="display:none">
      <div class="cart-total-row"><span>Total</span><span class="cart-total-price">₦0</span></div>
      <button class="checkout-btn" onclick="checkout()">Checkout via WhatsApp</button>
    </div>
  </div>

  <div class="modal-overlay" id="modalOverlay">
    <div class="modal">
      <button class="modal-close" onclick="closeModal()">✕</button>
      <div class="modal-body">
        <div class="modal-img" id="modalImg">🌹</div>
        <div class="modal-info">
          <h2 id="modalName"></h2>
          <div class="stars" id="modalStars"></div>
          <div class="modal-price" id="modalPrice"></div>
          <p class="modal-desc" id="modalDesc"></p>
          <div class="modal-notes" id="modalNotes"></div>
          <div class="modal-qty">
            <span>Qty:</span>
            <div class="modal-qty-ctrl">
              <button onclick="changeModalQty(-1)">−</button>
              <span id="modalQty">1</span>
              <button onclick="changeModalQty(1)">+</button>
            </div>
          </div>
          <button class="modal-add" onclick="addFromModal()">Add to Cart</button>
          <button class="modal-wish" onclick="addToWishlist()">♡ Add to Wishlist</button>
        </div>
      </div>
    </div>
  </div>

  <div id="toast" class="toast"></div>

  <div class="topbar">
    <div class="topbar-left">📞 Call Us: Weekdays 9am–5pm &nbsp;|&nbsp; 08034XXXXXX</div>
    <div class="topbar-right">
      <span>🇳🇬 Nigeria (₦)</span>
      <a href="#" onclick="showToast('Sign in coming soon!')">Sign In</a>
      <a href="#" onclick="showToast('Register coming soon!')">Register</a>
    </div>
  </div>

  <header>
    <div class="header-main">
      <div class="logo" onclick="location.href='${base}index.html'">Tricia<span>Empire</span></div>
      <div class="search-bar">
        <input type="text" id="searchInput" placeholder="Search fragrances, brands, notes…" onkeydown="if(event.key==='Enter')doSearch()"/>
        <button onclick="doSearch()">🔍</button>
      </div>
      <div class="header-icons">
        <button class="icon-btn" onclick="showToast('Wishlist coming soon!')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          <span>Wishlist</span>
        </button>
        <button class="icon-btn" onclick="toggleCart()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          <span>Cart</span>
          <span class="cart-badge">0</span>
        </button>
        <button class="icon-btn" onclick="showToast('Account coming soon!')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          <span>Account</span>
        </button>
        <button class="hamburger" id="hamburger" onclick="toggleMobileNav()">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
    <nav>
      <div class="nav-inner" id="desktopNav">
        <div class="nav-item"><a href="${base}index.html" class="nav-link ${currentPage==='index.html'?'active':''}">Home</a></div>
        <div class="nav-item has-drop">
          <a href="${base}pages/category.html?cat=all&gender=women" class="nav-link ${currentPage==='category.html'?'active':''}">For Women ▾</a>
          <div class="dropdown">
            <a href="${base}pages/category.html?cat=all&gender=women">All Women's</a>
            <a href="${base}pages/category.html?cat=new&gender=women">New Arrivals</a>
            <a href="${base}pages/category.html?cat=bestseller&gender=women">Bestsellers</a>
            <a href="${base}pages/category.html?note=floral&gender=women">Floral</a>
            <a href="${base}pages/category.html?note=sweet&gender=women">Sweet & Fruity</a>
            <a href="${base}pages/category.html?note=oriental&gender=women">Oriental</a>
          </div>
        </div>
        <div class="nav-item has-drop">
          <a href="${base}pages/category.html?cat=all&gender=men" class="nav-link">For Men ▾</a>
          <div class="dropdown">
            <a href="${base}pages/category.html?cat=all&gender=men">All Men's</a>
            <a href="${base}pages/category.html?cat=new&gender=men">New Arrivals</a>
            <a href="${base}pages/category.html?cat=bestseller&gender=men">Bestsellers</a>
            <a href="${base}pages/category.html?note=woody&gender=men">Woody & Earthy</a>
            <a href="${base}pages/category.html?note=fresh&gender=men">Fresh & Aquatic</a>
          </div>
        </div>
        <div class="nav-item has-drop">
          <a href="${base}pages/category.html?cat=all&gender=all" class="nav-link">Collections ▾</a>
          <div class="dropdown">
            <a href="${base}pages/category.html?cat=new&gender=all">New Arrivals</a>
            <a href="${base}pages/category.html?cat=bestseller&gender=all">Bestsellers</a>
            <a href="${base}pages/category.html?cat=gift&gender=all">Gift Sets</a>
            <a href="${base}pages/category.html?cat=niche&gender=all">Niche Perfumes</a>
          </div>
        </div>
        <div class="nav-item nav-offer">
          <a href="${base}pages/offers.html" class="nav-link">🔥 Offers</a>
        </div>
        <div class="nav-item"><a href="${base}pages/about.html" class="nav-link ${currentPage==='about.html'?'active':''}">About Us</a></div>
        <div class="nav-item"><a href="${base}pages/contact.html" class="nav-link ${currentPage==='contact.html'?'active':''}">Contact</a></div>
      </div>
      <div class="mobile-nav" id="mobileNav" style="display:none">
        <a href="${base}index.html">🏠 Home</a>
        <a href="${base}pages/category.html?cat=all&gender=women">👩 For Women</a>
        <a href="${base}pages/category.html?cat=all&gender=men">👨 For Men</a>
        <a href="${base}pages/category.html?cat=new&gender=all">✨ New Arrivals</a>
        <a href="${base}pages/category.html?cat=bestseller&gender=all">🏆 Bestsellers</a>
        <a href="${base}pages/category.html?cat=gift&gender=all">🎁 Gift Sets</a>
        <a href="${base}pages/category.html?cat=niche&gender=all">👑 Niche Perfumes</a>
        <a href="${base}pages/offers.html">🔥 Offers</a>
        <a href="${base}pages/about.html">ℹ️ About Us</a>
        <a href="${base}pages/contact.html">📞 Contact</a>
      </div>
    </nav>
  </header>

  <div class="contact-bar">
    <div class="contact-item"><span class="icon">🎧</span><div><p class="label">Customer Support</p><p class="sub">Weekdays 9am–5pm</p></div></div>
    <div class="contact-item"><span class="icon">🚚</span><div><p class="label">Nationwide Delivery</p><p class="sub">Fast & Reliable</p></div></div>
    <div class="contact-item"><span class="icon">✅</span><div><p class="label">100% Authentic</p><p class="sub">Genuine Products</p></div></div>
    <div class="contact-item"><span class="icon">↩️</span><div><p class="label">Easy Returns</p><p class="sub">Hassle-free policy</p></div></div>
  </div>`;

  const footerHTML = `
  <footer>
    <div class="footer-top">
      <div class="footer-grid">
        <div class="footer-col">
          <div class="footer-logo">Tricia Empire</div>
          <p>Luxury fragrances that leave a lasting impression. Define your scent.</p>
          <div class="footer-social">
            <a href="#" class="soc-btn">📸</a>
            <a href="#" class="soc-btn">🎵</a>
            <a href="#" class="soc-btn">✖</a>
            <a href="#" class="soc-btn">📘</a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="${base}index.html">Home</a></li>
            <li><a href="${base}pages/about.html">About Us</a></li>
            <li><a href="${base}pages/category.html?cat=new&gender=all">New Arrivals</a></li>
            <li><a href="${base}pages/category.html?cat=bestseller&gender=all">Bestsellers</a></li>
            <li><a href="${base}pages/contact.html">Contact</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Information</h4>
          <ul>
            <li><a href="#" onclick="showToast('Coming soon!')">Privacy Policy</a></li>
            <li><a href="#" onclick="showToast('Coming soon!')">Terms & Conditions</a></li>
            <li><a href="#" onclick="showToast('Coming soon!')">Returns Policy</a></li>
            <li><a href="#" onclick="showToast('Coming soon!')">Track Your Order</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Newsletter</h4>
          <p>Subscribe for exclusive deals and fragrance tips.</p>
          <div class="newsletter-form">
            <input type="email" id="newsletterEmail" placeholder="Your email"/>
            <button onclick="subscribeNewsletter()">Subscribe</button>
          </div>
          <div style="margin-top:1rem">
            <p style="font-size:.72rem;color:#888;margin-bottom:.5rem">Shipping Partners</p>
            <div class="footer-partners">
              <span class="partner-badge">GIG Logistics</span>
              <span class="partner-badge">DHL</span>
              <span class="partner-badge">Kwik</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-bottom">© 2025 <span>Tricia Empire</span>. All rights reserved. Luxury Fragrance Store — Nigeria.</div>
  </footer>`;

  // Inject header before body content
  document.getElementById('site-header').innerHTML = headerHTML;
  document.getElementById('site-footer').innerHTML = footerHTML;
}

function toggleMobileNav() {
  const mn = document.getElementById('mobileNav');
  if (mn) mn.style.display = mn.style.display === 'none' ? 'block' : 'none';
}

function doSearch() {
  const q = document.getElementById('searchInput').value.trim();
  if (!q) return showToast('Please enter a search term');
  const base = getBasePath();
  window.location.href = base + 'pages/category.html?search=' + encodeURIComponent(q);
}

function subscribeNewsletter() {
  const e = document.getElementById('newsletterEmail');
  if (!e || !e.value) return showToast('Please enter your email');
  showToast('✓ Subscribed! Welcome to Tricia Empire.');
  e.value = '';
}

function renderProductCard(p, base = './') {
  const badgeClass = p.badge === 'New' ? 'new-badge' : p.badge === 'Sale' ? 'sale-badge' : p.badge === 'Niche' ? 'niche-badge' : '';
  return `
    <div class="product-card">
      ${p.badge ? `<span class="product-badge ${badgeClass}">${p.badge}</span>` : ''}
      <div class="product-img-wrap" onclick="openModal(${p.id})">
        <div class="product-emoji">${p.emoji}</div>
        <div class="product-actions">
          <button class="act-btn" onclick="event.stopPropagation();openModal(${p.id})" title="Quick View">👁️</button>
          <button class="act-btn" onclick="event.stopPropagation();addToCartById(${p.id})" title="Add to Cart">🛒</button>
          <button class="act-btn" onclick="event.stopPropagation();showToast('Added to wishlist!')" title="Wishlist">♡</button>
        </div>
      </div>
      <div class="product-info">
        <div class="product-stars">${'★'.repeat(p.stars)}${'☆'.repeat(5 - p.stars)}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-price">
          <span class="price-now">₦${p.price.toLocaleString()}</span>
          ${p.oldPrice ? `<span class="price-old">₦${p.oldPrice.toLocaleString()}</span>` : ''}
        </div>
        <button class="add-cart-btn" onclick="addToCartById(${p.id})">Add to Cart</button>
      </div>
    </div>`;
}
