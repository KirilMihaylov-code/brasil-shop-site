(async function loadProducts() {
  try {
    const res = await fetch('/products.json', { cache: 'no-cache' });
    if (!res.ok) return;
    const products = await res.json();
    const select = document.getElementById('productSelect');
    if (!select) return;

    // Записваме products в памет за бърз достъп по-късно
    window.__PRODUCTS = {};
    products.forEach(p => { window.__PRODUCTS[p.id] = p; });

    products.forEach(p => {
      const opt = document.createElement('option');
      opt.value = p.id;
      opt.textContent = `${p.name} — ${p.price.toFixed(2)} лв.`;
      select.appendChild(opt);
    });
  } catch (e) { /* noop */ }
})();

const phonePattern = /^\+?\d{7,15}$/;

const form = document.getElementById('orderForm');
if (form) {
  // Попълваме контекстни скрити полета при зареждане
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

    // Валидации
    if (!name.value.trim() || !email.validity.valid || !phonePattern.test(phone.value.trim()) || !product.value || !consent.checked) {
      e.preventDefault();
      alert('Моля, попълни всички полета коректно.');
      return;
    }

    // Попълваме продукт име/цена в скритите полета за по-полезен CSV
    const hiddenName = document.getElementById('product_name');
    const hiddenPrice = document.getElementById('product_price');
    const prod = window.__PRODUCTS ? window.__PRODUCTS[product.value] : null;
    if (prod) {
      if (hiddenName) hiddenName.value = prod.name;
      if (hiddenPrice) hiddenPrice.value = prod.price.toFixed(2);
    }

    // Локален timestamp (ISO) – полезно при експорт
    if (submittedAt) submittedAt.value = new Date().toISOString();
  });
}

// Cookie banner (без промяна)
(function cookies() {
  const KEY = 'cookie_consent_v1';
  if (localStorage.getItem(KEY)) return;
  const bar = document.getElementById('cookieBanner');
  if (!bar) return;
  bar.style.display = 'flex';
  bar.querySelector('#cookieAccept').addEventListener('click', () => {
    localStorage.setItem(KEY, 'yes');
    bar.style.display = 'none';
  });
})();
