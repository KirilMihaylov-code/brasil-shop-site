// ----- Helpers -----
function el(tag, attrs = {}, children = []) {
  const e = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === 'class') e.className = v;
    else if (k === 'html') e.innerHTML = v;
    else e.setAttribute(k, v);
  });
  ([]).concat(children).forEach(c => c && e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c));
  return e;
}

function currency(v) {
  if (typeof v !== 'number') return v;
  return `${v.toFixed(2)} лв.`;
}

// ----- Load products & populate UI -----
(async function init() {
  try {
    const res = await fetch('/products.json', { cache: 'no-cache' });
    const products = res.ok ? await res.json() : [];
    // Save to global for later use
    window.__PRODUCTS = {};
    products.forEach(p => { window.__PRODUCTS[p.id] = p; });

    // 1) Populate order <select>
    const select = document.getElementById('productSelect');
    if (select) {
      products.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p.id;
        opt.textContent = `${p.name} — ${currency(p.price)}`;
        select.appendChild(opt);
      });
    }

    // 2) Render product cards
    const grid = document.getElementById('productsGrid');
    if (grid) {
      grid.innerHTML = '';
      products.forEach(p => {
        const imgNode = p.image
          ? el('img', { src: p.image, alt: p.name, class: 'card-img-top', loading: 'lazy' })
          : el('div', { class: 'ratio ratio-4x3 bg-secondary-subtle' });

        const title = el('h3', { class: 'h6 mb-1' }, p.name);
        const desc = el('div', { class: 'text-muted small mb-2' }, p.desc || '');
        const price = el('span', { class: 'fw-semibold' }, currency(p.price));
        const orderBtn = el('a', { href: '#order', class: 'btn btn-sm btn-outline-primary', 'data-product': p.id }, 'Поръчай');

        const body = el('div', { class: 'card-body' }, [
          title, desc,
          el('div', { class: 'd-flex justify-content-between align-items-center' }, [price, orderBtn])
        ]);

        const card = el('div', { class: 'card h-100' }, [
          imgNode,
          body
        ]);
        const col = el('div', { class: 'col-md-4' }, [card]);
        grid.appendChild(col);
      });

      // Delegate clicks on "Поръчай" buttons
      grid.addEventListener('click', (ev) => {
        const a = ev.target.closest('a[data-product]');
        if (!a) return;
        const id = a.getAttribute('data-product');
        const sel = document.getElementById('productSelect');
        if (sel && id) {
          sel.value = id;
          sel.dispatchEvent(new Event('change', { bubbles: true }));
        }
        // Smooth scroll to form
        const orderSection = document.getElementById('order');
        if (orderSection) orderSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }

  } catch (e) {
    // fail silently
  }

  setupForm();
  cookiesBanner();
})();

// ----- Form logic -----
const phonePattern = /^\+?\d{7,15}$/;

function setupForm() {
  const form = document.getElementById('orderForm');
  if (!form) return;

  // Context fields
  const pageUrl = document.getElementById('page_url');
  const submittedAt = document.getElementById('submitted_at');
  if (pageUrl) pageUrl.value = location.href;

  form.addEventListener('submit', (e) => {
    const hp = form.querySelector('input[name="website"]'); // honeypot
    if (hp && hp.value.trim() !== '') {
      e.preventDefault();
      alert('Submission blocked.');
      return;
    }

    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const phone = form.querySelector('#phone');
    const product = form.querySelector('#productSelect');
    const consent = form.querySelector('#consent');

    // Validations
    if (!name.value.trim() || !email.validity.valid || !phonePattern.test(phone.value.trim()) || !product.value || !consent.checked) {
      e.preventDefault();
      alert('Моля, попълни всички полета коректно.');
      return;
    }

    // Fill hidden fields for nicer CSV
    const hiddenName = document.getElementById('product_name');
    const hiddenPrice = document.getElementById('product_price');
    const prod = window.__PRODUCTS ? window.__PRODUCTS[product.value] : null;
    if (prod) {
      if (hiddenName) hiddenName.value = prod.name;
      if (hiddenPrice) hiddenPrice.value = (typeof prod.price === 'number' ? prod.price.toFixed(2) : prod.price);
    }
    if (submittedAt) submittedAt.value = new Date().toISOString();
  });
}

// ----- Cookie banner -----
function cookiesBanner() {
  const KEY = 'cookie_consent_v1';
  if (localStorage.getItem(KEY)) return;
  const bar = document.getElementById('cookieBanner');
  if (!bar) return;
  bar.style.display = 'flex';
  const btn = bar.querySelector('#cookieAccept');
  if (btn) btn.addEventListener('click', () => {
    localStorage.setItem(KEY, 'yes');
    bar.style.display = 'none';
  });
}
