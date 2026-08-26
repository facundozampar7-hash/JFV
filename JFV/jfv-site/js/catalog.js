document.addEventListener('DOMContentLoaded', () => {

  /* =========================================================
     CONFIGURACIÓN — reemplazá por el número real del negocio
     en formato internacional, sin +, espacios ni guiones.
     Ej: Argentina, código de área 342, número 4123456 -> 5493424123456
     ========================================================= */
  const WHATSAPP_NUMBER = "543400000000";

  const money = (n) => "$" + n.toLocaleString("es-AR");

  /* ---------------------------------------------------------
     Estado del carrito (persistido en localStorage)
     --------------------------------------------------------- */
  let cart = JSON.parse(localStorage.getItem("jfv-cart") || "{}");
  let activeCategory = "todos";

  const saveCart = () => localStorage.setItem("jfv-cart", JSON.stringify(cart));

  const cartCount = () => Object.values(cart).reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = () => Object.values(cart).reduce((sum, item) => sum + item.qty * item.price, 0);

  /* ---------------------------------------------------------
     Filtros por categoría
     --------------------------------------------------------- */
  const filtersEl = document.getElementById('filters');
  CATEGORIES.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'chip' + (cat.id === 'todos' ? ' is-active' : '');
    btn.textContent = cat.label;
    btn.dataset.cat = cat.id;
    btn.addEventListener('click', () => {
      activeCategory = cat.id;
      filtersEl.querySelectorAll('.chip').forEach(c => c.classList.toggle('is-active', c === btn));
      renderProducts();
    });
    filtersEl.appendChild(btn);
  });

  /* ---------------------------------------------------------
     Grilla de productos
     --------------------------------------------------------- */
  const grid = document.getElementById('productGrid');

  function productPhoto(p) {
    if (p.image) return `<img src="${p.image}" alt="${p.name}">`;
    return `<div class="photo-slot">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="28" height="28"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8.5" cy="10.5" r="1.5"/><path d="M21 15l-5-5-9 9"/></svg>
      <span>Foto pendiente</span>
    </div>`;
  }

  function renderProducts() {
    const items = activeCategory === 'todos' ? PRODUCTS : PRODUCTS.filter(p => p.category === activeCategory);
    grid.innerHTML = items.map(p => {
      const catLabel = CATEGORIES.find(c => c.id === p.category)?.label || '';
      const qty = cart[p.id]?.qty || 0;
      return `
      <div class="product-card reveal is-visible" data-id="${p.id}">
        <div class="product-photo">
          <span class="product-cat">${catLabel}</span>
          ${productPhoto(p)}
        </div>
        <div class="product-body">
          <h3>${p.name}</h3>
          <p class="desc">${p.desc}</p>
          <p class="product-price">${money(p.price)}</p>
          <div class="product-actions">
            <div class="qty">
              <button class="qty-minus" aria-label="Restar">–</button>
              <span class="qty-value">${qty}</span>
              <button class="qty-plus" aria-label="Sumar">+</button>
            </div>
            <button class="btn btn-primary btn-small add-btn">${qty ? 'Actualizar' : 'Agregar'}</button>
          </div>
        </div>
      </div>`;
    }).join('');

    grid.querySelectorAll('.product-card').forEach(card => {
      const id = card.dataset.id;
      const product = PRODUCTS.find(p => p.id === id);
      const qtyEl = card.querySelector('.qty-value');
      let localQty = cart[id]?.qty || 1;
      if (!cart[id]) qtyEl.textContent = localQty;

      card.querySelector('.qty-plus').addEventListener('click', () => {
        localQty++;
        qtyEl.textContent = localQty;
      });
      card.querySelector('.qty-minus').addEventListener('click', () => {
        localQty = Math.max(1, localQty - 1);
        qtyEl.textContent = localQty;
      });
      card.querySelector('.add-btn').addEventListener('click', () => {
        cart[id] = { id, name: product.name, price: product.price, image: product.image, qty: localQty };
        saveCart();
        renderCart();
        openCart();
        card.querySelector('.add-btn').textContent = 'Actualizar';
      });
    });
  }

  /* ---------------------------------------------------------
     Carrito (drawer)
     --------------------------------------------------------- */
  const cartFab = document.getElementById('cartFab');
  const cartBadge = document.getElementById('cartBadge');
  const cartDrawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('overlay');
  const cartItemsEl = document.getElementById('cartItems');
  const cartTotalEl = document.getElementById('cartTotal');
  const checkoutBtn = document.getElementById('checkoutBtn');

  function renderCart() {
    cartBadge.textContent = cartCount();
    const items = Object.values(cart);
    if (!items.length) {
      cartItemsEl.innerHTML = `<div class="cart-empty">Todavía no agregaste nada.<br>Elegí algo del catálogo ✂️</div>`;
      checkoutBtn.disabled = true;
    } else {
      cartItemsEl.innerHTML = items.map(item => `
        <div class="cart-line" data-id="${item.id}">
          <div class="thumb">${item.image ? `<img src="${item.image}" alt="${item.name}">` : '🖨️'}</div>
          <div class="info">
            <h4>${item.name}</h4>
            <div class="unit">${item.qty} x ${money(item.price)}</div>
          </div>
          <button class="remove" aria-label="Quitar">✕</button>
        </div>
      `).join('');
      checkoutBtn.disabled = false;

      cartItemsEl.querySelectorAll('.remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.target.closest('.cart-line').dataset.id;
          delete cart[id];
          saveCart();
          renderCart();
          renderProducts();
        });
      });
    }
    cartTotalEl.textContent = money(cartTotal());
  }

  function openCart() {
    cartDrawer.classList.add('is-open');
    overlay.classList.add('is-open');
    cartDrawer.setAttribute('aria-hidden', 'false');
  }
  function closeCart() {
    cartDrawer.classList.remove('is-open');
    overlay.classList.remove('is-open');
    cartDrawer.setAttribute('aria-hidden', 'true');
  }

  cartFab.addEventListener('click', openCart);
  document.getElementById('closeCart').addEventListener('click', closeCart);
  overlay.addEventListener('click', () => { closeCart(); closeModal(); });

  /* ---------------------------------------------------------
     Modal de pedido
     --------------------------------------------------------- */
  const modal = document.getElementById('orderModal');
  const formView = document.getElementById('formView');
  const successView = document.getElementById('successView');
  const orderForm = document.getElementById('orderForm');
  const formError = document.getElementById('formError');

  function openModal() {
    closeCart();
    modal.classList.add('is-open');
    overlay.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
  }
  function closeModal() {
    modal.classList.remove('is-open');
    overlay.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    formView.style.display = 'block';
    successView.style.display = 'none';
    orderForm.reset();
    document.querySelectorAll('.pay-option').forEach(o => o.classList.remove('is-selected'));
    formError.classList.remove('is-visible');
  }

  checkoutBtn.addEventListener('click', openModal);
  document.getElementById('closeModal').addEventListener('click', closeModal);
  document.getElementById('closeSuccess').addEventListener('click', closeModal);

  document.querySelectorAll('.pay-option').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.pay-option').forEach(o => o.classList.remove('is-selected'));
      opt.classList.add('is-selected');
      opt.querySelector('input').checked = true;
    });
  });

  orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(orderForm);
    const firstName = data.get('firstName')?.trim();
    const lastName = data.get('lastName')?.trim();
    const phone = data.get('phone')?.trim();
    const email = data.get('email')?.trim();
    const payment = data.get('payment');

    if (!firstName || !lastName || !phone || !email || !payment) {
      formError.classList.add('is-visible');
      return;
    }
    formError.classList.remove('is-visible');

    const lines = Object.values(cart).map(i => `• ${i.qty} x ${i.name} — ${money(i.price * i.qty)}`).join('%0A');
    const message =
      `¡Hola JFV! Quiero hacer este pedido:%0A%0A${lines}%0A%0A` +
      `*Total:* ${money(cartTotal())}%0A%0A` +
      `*Nombre:* ${firstName} ${lastName}%0A` +
      `*Teléfono:* ${phone}%0A` +
      `*Email:* ${email}%0A` +
      `*Pago:* ${payment}`;

    formView.style.display = 'none';
    successView.style.display = 'block';

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');

    cart = {};
    saveCart();
    renderCart();
    renderProducts();
  });

  /* ---------------------------------------------------------
     Init
     --------------------------------------------------------- */
  renderProducts();
  renderCart();
});
