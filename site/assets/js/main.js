// Load products.json -> populate select
(async function loadProducts() {
  try {
    const res = await fetch('/products.json', { cache: 'no-cache' });
    if (!res.ok) return;
    const products = await res.json();
    const select = document.getElementById('productSelect');
    if (!select) return;

    products.forEach(p => {
      const opt = document.createElement('option');
      opt.value = p.id;
      opt.textContent = `${p.name} — ${p.price.toFixed(2)} лв.`;
      select.appendChild(opt);
    });
  } catch (e) { /* noop */ }
})();

// Simple phone pattern for BG; adjust if needed
const phonePattern = /^\+?\d{7,15}$/;

// Netlify Forms: client-side validation + honeypot
const form = document.getElementById('orderForm');
if (form) {
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

    if (!name.value.trim() || !email.validity.valid || !phonePattern.test(phone.value.trim()) || !product.value || !consent.checked) {
      e.preventDefault();
      alert('Моля, попълни всички полета коректно.');
    }
  });
}

// Minimal cookie banner
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
