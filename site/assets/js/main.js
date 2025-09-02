// ===== I18N with fallback dictionaries =====
const I18N = {
  current: 'bg',
  dict: {},
  supported: ['bg', 'pt', 'es', 'en'],
  // Fallbacks (ще се ползват, ако fetch към /lang/*.json се провали)
  fallback: {
    bg: {
      "nav.offer":"Оферта","nav.products":"Продукти","nav.credibility":"Доверие","nav.faq":"FAQ","nav.order":"Поръчай","nav.terms":"Условия","nav.privacy":"Поверителност",
      "hero.title":"Бразилски вкус у дома","hero.subtitle":"Подбрани продукти от Бразилия, доставени бързо в България.","hero.ctaPrimary":"Поръчай сега","hero.ctaSecondary":"Виж продуктите","hero.bullet1":"Поръчка без регистрация","hero.bullet2":"Поддръжка BG/PT/ES/EN","hero.bullet3":"14 дни право на отказ (ЗЗП)",
      "offer.title":"Специална оферта","offer.line1":"Само тази седмица: -10% при поръчка над 49 лв.","offer.line2":"Безплатна доставка над 99 лв.","offer.ctaPrimary":"Вземи офертата","offer.ctaSecondary":"Разгледай още","offer.downsellTitle":"Алтернативна оферта","offer.downsellText":"Тествай с 1 продукт + подарък проба (ограничени бройки).","offer.downsellCta":"Поръчай тест комплект",
      "cred.title":"Доверие","cred.stat1":"1000+ поръчки изпратени","cred.stat2":"4.9/5 среден рейтинг","cred.stat3":"48ч среден срок на доставка","cred.guarantee":"14 дни право на отказ по ЗЗП. Замяна или връщане.","cred.partners":"Работим само с проверени доставчици и куриери.",
      "desire.title":"Избрани продукти","desire.note":"Пълният списък е наличен в падащото меню на поръчката.",
      "faq.title":"Често задавани въпроси","faq.q1":"Как доставяте?","faq.a1":"Доставка с куриер в цялата страна; подробности в Общи условия.","faq.q2":"Мога ли да върна?","faq.a2":"Да, според Общи условия и ЗЗП (14 дни за дистанционни продажби).",
      "order.title":"Бърза поръчка","order.name":"Име и фамилия","order.email":"Имейл","order.phone":"Телефон","order.product":"Продукт","order.consent":"Съгласен/на съм с","order.marketing":"Желая да получавам оферти и новини.","order.submit":"Изпрати поръчка","order.note":"След изпращане наш представител ще се свърже с теб за потвърждение.",
      "cookie.text":"Използваме бисквитки за по-добро изживяване.","cookie.btn":"Разбрах"
    },
    pt: {
      "nav.offer":"Oferta","nav.products":"Produtos","nav.credibility":"Confiança","nav.faq":"FAQ","nav.order":"Pedir","nav.terms":"Termos","nav.privacy":"Privacidade",
      "hero.title":"Sabor do Brasil em casa","hero.subtitle":"Produtos selecionados do Brasil, entregues rapidamente na Bulgária.","hero.ctaPrimary":"Peça agora","hero.ctaSecondary":"Ver produtos","hero.bullet1":"Pedido sem cadastro","hero.bullet2":"Suporte BG/PT/ES/EN","hero.bullet3":"Direito de devolução em 14 dias",
      "offer.title":"Oferta especial","offer.line1":"Somente esta semana: -10% acima de 49 leva.","offer.line2":"Envio grátis acima de 99 leva.","offer.ctaPrimary":"Aproveitar oferta","offer.ctaSecondary":"Explorar mais","offer.downsellTitle":"Oferta alternativa","offer.downsellText":"Teste com 1 produto + brinde (quantidades limitadas).","offer.downsellCta":"Pedir kit de teste",
      "cred.title":"Confiança","cred.stat1":"1000+ pedidos enviados","cred.stat2":"4.9/5 avaliação média","cred.stat3":"48h prazo médio de entrega","cred.guarantee":"14 dias para devolução conforme legislação.","cred.partners":"Somente fornecedores e transportadoras certificados.",
      "desire.title":"Produtos em destaque","desire.note":"A lista completa está no menu do pedido.",
      "faq.title":"Perguntas frequentes","faq.q1":"Como é a entrega?","faq.a1":"Entrega por transportadora em todo o país; detalhes nos Termos.","faq.q2":"Posso devolver?","faq.a2":"Sim, conforme os Termos (14 dias para compras à distância).",
      "order.title":"Pedido rápido","order.name":"Nome e sobrenome","order.email":"E-mail","order.phone":"Telefone","order.product":"Produto","order.consent":"Concordo com a","order.marketing":"Desejo receber ofertas e novidades.","order.submit":"Enviar pedido","order.note":"Entraremos em contato para confirmar os detalhes.",
      "cookie.text":"Usamos cookies para melhorar sua experiência.","cookie.btn":"OK"
    },
    es: {
      "nav.offer":"Oferta","nav.products":"Productos","nav.credibility":"Confianza","nav.faq":"FAQ","nav.order":"Pedir","nav.terms":"Términos","nav.privacy":"Privacidad",
      "hero.title":"Sabor de Brasil en casa","hero.subtitle":"Productos seleccionados de Brasil, entregados rápidamente en Bulgaria.","hero.ctaPrimary":"Pedir ahora","hero.ctaSecondary":"Ver productos","hero.bullet1":"Pedido sin registro","hero.bullet2":"Soporte BG/PT/ES/EN","hero.bullet3":"Derecho de devolución en 14 días",
      "offer.title":"Oferta especial","offer.line1":"Solo esta semana: -10% a partir de 49 leva.","offer.line2":"Envío gratis a partir de 99 leva.","offer.ctaPrimary":"Aprovechar oferta","offer.ctaSecondary":"Explorar más","offer.downsellTitle":"Oferta alternativa","offer.downsellText":"Prueba con 1 producto + muestra de regalo (unidades limitadas).","offer.downsellCta":"Pedir kit de prueba",
      "cred.title":"Confianza","cred.stat1":"1000+ pedidos enviados","cred.stat2":"4.9/5 valoración media","cred.stat3":"48h plazo medio de entrega","cred.guarantee":"14 días para devoluciones según la ley.","cred.partners":"Solo proveedores y transportistas verificados.",
      "desire.title":"Productos destacados","desire.note":"La lista completa está en el menú del pedido.",
      "faq.title":"Preguntas frecuentes","faq.q1":"¿Cómo es la entrega?","faq.a1":"Entrega por mensajería en todo el país; detalles en Términos.","faq.q2":"¿Puedo devolver?","faq.a2":"Sí, según los Términos (14 días para compras a distancia).",
      "order.title":"Pedido rápido","order.name":"Nombre y apellido","order.email":"Correo electrónico","order.phone":"Teléfono","order.product":"Producto","order.consent":"Acepto la","order.marketing":"Deseo recibir ofertas y novedades.","order.submit":"Enviar pedido","order.note":"Nos pondremos en contacto para confirmar los detalles.",
      "cookie.text":"Usamos cookies para mejorar su experiencia.","cookie.btn":"Vale"
    },
    en: {
      "nav.offer":"Offer","nav.products":"Products","nav.credibility":"Trust","nav.faq":"FAQ","nav.order":"Order","nav.terms":"Terms","nav.privacy":"Privacy",
      "hero.title":"Brazilian taste at home","hero.subtitle":"Selected products from Brazil, delivered fast in Bulgaria.","hero.ctaPrimary":"Order now","hero.ctaSecondary":"See products","hero.bullet1":"Order without registration","hero.bullet2":"Support BG/PT/ES/EN","hero.bullet3":"14-day return right",
      "offer.title":"Special offer","offer.line1":"This week only: -10% above 49 leva.","offer.line2":"Free shipping above 99 leva.","offer.ctaPrimary":"Get the offer","offer.ctaSecondary":"Explore more","offer.downsellTitle":"Alternative offer","offer.downsellText":"Try 1 product + free sample (limited units).","offer.downsellCta":"Order test kit",
      "cred.title":"Trust","cred.stat1":"1000+ orders shipped","cred.stat2":"4.9/5 average rating","cred.stat3":"48h average delivery time","cred.guarantee":"14-day right of withdrawal by law.","cred.partners":"We work only with verified suppliers and couriers.",
      "desire.title":"Featured products","desire.note":"Full list is in the order dropdown.",
      "faq.title":"Frequently Asked Questions","faq.q1":"How do you deliver?","faq.a1":"Courier delivery nationwide; details in Terms.","faq.q2":"Can I return?","faq.a2":"Yes, per Terms (14 days for distance sales).",
      "order.title":"Quick order","order.name":"Full name","order.email":"Email","order.phone":"Phone","order.product":"Product","order.consent":"I agree with the","order.marketing":"I wish to receive offers and news.","order.submit":"Send order","order.note":"We will contact you to confirm details.",
      "cookie.text":"We use cookies to improve your experience.","cookie.btn":"Got it"
    }
  }
};

async function i18nLoad(lang) {
  if (!I18N.supported.includes(lang)) lang = 'bg';
  try {
    const res = await fetch(`/lang/${lang}.json`, { cache: 'no-cache' });
    if (res.ok) {
      I18N.dict = await res.json();
    } else {
      I18N.dict = I18N.fallback[lang];
    }
  } catch {
    I18N.dict = I18N.fallback[lang];
  }
  I18N.current = lang;
}

function i18nApply() {
  // смени lang атрибута на <html>
  document.documentElement.setAttribute('lang',
    I18N.current === 'bg' ? 'bg' :
    I18N.current === 'pt' ? 'pt' :
    I18N.current === 'es' ? 'es' : 'en'
  );

  document.querySelectorAll('[data-i18n]').forEach(node => {
    const key = node.getAttribute('data-i18n');
    if (!key) return;
    const val = I18N.dict[key];
    if (typeof val !== 'string') return;

    if (node.matches('input[placeholder]')) {
      node.placeholder = val;
    } else {
      node.textContent = val;
    }
  });

  // Специален случай: редът с чекбокса има <a> вътре – ще инжектираме „Privacy Policy“/„Политиката...“
  const consentLabel = document.querySelector('label[for="consent"]');
  if (consentLabel) {
    const link = consentLabel.querySelector('a') || document.createElement('a');
    link.href = '/privacy';
    link.target = '_blank';

    // текст преди линка (например "Съгласен/на съм с")
    const prefix = I18N.dict['order.consent'] || consentLabel.textContent.trim();
    const policyText =
      I18N.current === 'bg' ? 'Политиката за поверителност' :
      I18N.current === 'pt' ? 'Política de Privacidade' :
      I18N.current === 'es' ? 'Política de Privacidad' :
      'Privacy Policy';

    consentLabel.innerHTML = '';
    consentLabel.append(prefix + ' ');
    link.textContent = policyText;
    consentLabel.append(link);
  }
}

async function i18nSet(lang) {
  await i18nLoad(lang);
  localStorage.setItem('lang', lang);
  i18nApply();
}

async function i18nInit() {
  const saved = localStorage.getItem('lang');
  const lang = I18N.supported.includes(saved) ? saved : 'bg';
  await i18nSet(lang);
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

// ===== Init: products + UI =====
(async function init() {
  await i18nInit();

  try {
    const res = await fetch('/products.json', { cache: 'no-cache' });
    const products = res.ok ? await res.json() : [];
    window.__PRODUCTS = {};
    products.forEach(p => { window.__PRODUCTS[p.id] = p; });

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
        const orderBtn = el('a', { href: '#order', class: 'btn btn-sm btn-outline-primary', 'data-product': p.id }, I18N.current === 'en' ? 'Order' :
          I18N.current === 'pt' ? 'Pedir' :
          I18N.current === 'es' ? 'Pedir' : 'Поръчай');

        const body = el('div', { class: 'card-body' }, [
          title, desc,
          el('div', { class: 'd-flex justify-content-between align-items-center' }, [price, orderBtn])
        ]);

        const card = el('div', { class: 'card h-100' }, [ imgNode, body ]);
        const col = el('div', { class: 'col-md-4' }, [card]);
        grid.appendChild(col);
      });

      grid.addEventListener('click', (ev) => {
        const a = ev.target.closest('a[data-product]');
        if (!a) return;
        const id = a.getAttribute('data-product');
        const sel = document.getElementById('productSelect');
        if (sel && id) {
          sel.value = id;
          sel.dispatchEvent(new Event('change', { bubbles: true }));
        }
        const orderSection = document.getElementById('order');
        if (orderSection) orderSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }

  } catch (e) { /* noop */ }

  setupForm();
  cookiesBanner();
})();

// ===== Form logic =====
const phonePattern = /^\+?\d{7,15}$/;
function setupForm() {
  const form = document.getElementById('orderForm');
  if (!form) return;

  const pageUrl = document.getElementById('page_url');
  const submittedAt = document.getElementById('submitted_at');
  if (pageUrl) pageUrl.value = location.href;

  form.addEventListener('submit', (e) => {
    const hp = form.querySelector('input[name="website"]');
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
      return;
    }

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

// ===== Cookie banner =====
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
