// ===== I18N with online JSON + fallback =====
const I18N = {
  current: 'bg',
  dict: {},
  supported: ['bg', 'pt', 'es', 'en'],
  fallback: { /* минимални стойности при офлайн JSON; може да оставиш празно */ }
};

async function i18nLoad(lang) {
  if (!I18N.supported.includes(lang)) lang = 'bg';
  try {
    const res = await fetch(`/lang/${lang}.json`, { cache: 'no-cache' });
    I18N.dict = res.ok ? await res.json() : (I18N.fallback[lang] || {});
  } catch {
    I18N.dict = I18N.fallback[lang] || {};
  }
  I18N.current = lang;
}

function i18nApply() {
  document.documentElement.setAttribute('lang', I18N.current);
  document.querySelectorAll('[data-i18n]').forEach(node => {
    const key = node.getAttribute('data-i18n');
    const val = I18N.dict[key];
    if (typeof val !== 'string') return;
    if (node.matches('input[placeholder]')) node.placeholder = val;
    else node.textContent = val;
  });

  // consent label with link
  const consentLabel = document.querySelector('label[for="consent"]');
  if (consentLabel) {
    const prefix = I18N.dict['order.consent'] || 'I agree with the';
    const linkText =
      I18N.current === 'bg' ? 'Политиката за поверителност' :
      I18N.current === 'pt' ? 'Política de Privacidade' :
      I18N.current === 'es' ? 'Política de Privacidad' : 'Privacy Policy';
    const a = consentLabel.querySelector('a') || document.createElement('a');
    a.href = '/privacy'; a.target = '_blank'; a.textContent = linkText;
    consentLabel.innerHTML = ''; consentLabel.append(prefix + ' '); consentLabel.append(a); consentLabel.append('.');
  }
}

async function i18nSet(lang) {
  await i18nLoad(lang);
  localStorage.setItem('lang', lang);
  i18nApply();
}
async function i18nInit() {
  const saved = localStorage.getItem('lang');
  await i18nSet(I18N.supported.includes(saved) ? saved : 'bg');
  document.querySelectorAll('[data-lang]').forEach(btn => {
    btn.addEventListener('click', () => i18nSet(btn.getAttribute('data-lang')));
  });
}

// ===== Helpers =====
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
function currency(v) { return (typeof v === 'number') ? `${v.toFixed(2)} лв.` : v; }

// ===== Init: i18n + products + UI =====
(async function init() {
  await i18nInit();

  try {
    const res = await fetch('/products.json', { cache: 'no-cache' });
    const products = res.ok ? await res.json() : [];
    window.__PRODUCTS = {}; products.forEach(p => { window.__PRODUCTS[p.id] = p; });

    // Populate order select
    const select = document.getElementById('productSelect');
    if (select) {
      products.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p.id;
        opt.textContent = `${p.name} — ${currency(p.price)}`;
        select.appendChild(opt);
      });
    }

    // Render product cards
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
        const orderText = (I18N.current === 'en') ? 'Order' : (I18N.current === 'pt' || I18N.current === 'es') ? 'Pedir' : 'Поръчай';
        const orderBtn = el('a', { href: '#order', class: 'btn btn-sm btn-outline-primary', 'data-product': p.id }, orderText);

        const body = el('div', { class: 'card-body' }, [
          title, desc,
          el('div', { class: 'd-flex justify-content-between align-items-center' }, [price, orderBtn])
        ]);

        const card = el('div', { class: 'card h-100' }, [imgNode, body]);
        grid.appendChild(el('div', { class: 'col-md-4' }, [card]));
      });

      grid.addEventListener('click', (ev) => {
        const a = ev.target.closest('a[data-product]');
        if (!a) return;
        const id = a.getAttribute('data-product');
        const sel = document.getElementById('productSelect');
        if (sel && id) { sel.value = id; sel.dispatchEvent(new Event('change', { bubbles: true })); }
        const orderSection = document.getElementById('order');
        if (orderSection) orderSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  } catch {}

  setupForm();
  cookiesBanner();
})();

// ===== Form logic =====
const phonePattern = /^\+?\d{7,15}$/;
function setupForm() {
  const form = document.getElementById('orderForm'); if (!form) return;
  const pageUrl = document.getElementById('page_url'); const submittedAt = document.getElementById('submitted_at');
  if (pageUrl) pageUrl.value = location.href;

  form.addEventListener('submit', (e) => {
    const hp = form.querySelector('input[name="website"]');
    if (hp && hp.value.trim() !== '') { e.preventDefault(); alert('Submission blocked.'); return; }

    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const phone = form.querySelector('#phone');
    const product = form.querySelector('#productSelect');
    const consent = form.querySelector('#consent');

    if (!name.value.trim() || !email.validity.valid || !phonePattern.test(phone.value.trim()) || !product.value || !consent.checked) {
      e.preventDefault(); alert('Моля, попълни всички полета коректно.'); return;
    }

    const hiddenName = document.getElementById('product_name');
    const hiddenPrice = document.getElementById('product_price');
    const prod = window.__PRODUCTS ? window.__PRODUCTS[product.value] : null;
    if (prod) { if (hiddenName) hiddenName.value = prod.name; if (hiddenPrice) hiddenPrice.value = (typeof prod.price === 'number' ? prod.price.toFixed(2) : prod.price); }
    if (submittedAt) submittedAt.value = new Date().toISOString();
  });
}

// ===== Cookie banner =====
function cookiesBanner() {
  const KEY = 'cookie_consent_v1';
  if (localStorage.getItem(KEY)) return;
  const bar = document.getElementById('cookieBanner'); if (!bar) return;
  bar.style.display = 'flex';
  const btn = bar.querySelector('#cookieAccept');
  if (btn) btn.addEventListener('click', () => { localStorage.setItem(KEY, 'yes'); bar.style.display = 'none'; });
}
