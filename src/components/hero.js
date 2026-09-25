import { element, icon } from '../lib/dom.js';
import { language, t } from '../lib/locale.js';
import { scrollToElement } from '../lib/scroll.js';
import { productProfile } from '../lib/product-profile.js';

// Hero background photo (offshore scene with the cylinders). Until the file exists the hero keeps the
// designed navy backdrop and shows the cylinder photo on a light panel instead.
const HERO_PHOTO = './src/assets/products/calibration-gas/hero.webp';
// The gas card shows a real mixture from the catalogue, read from the product data.
const FEATURED_SKU = '23.3.4.1.3286';

const FACT_ICONS = {
  flask: '<path d="M9.5 3h5M10.5 3v6L5 19a1.5 1.5 0 0 0 1.3 2h11.4a1.5 1.5 0 0 0 1.3-2L13.5 9V3"/><path d="M7.5 15h9"/>',
  cylinder: '<path d="M10 2.8h4M12 2.8v2.4"/><path d="M8 9a4 3.5 0 0 1 8 0v11a1.2 1.2 0 0 1-1.2 1.2H9.2A1.2 1.2 0 0 1 8 20z"/><path d="M10.5 13.5h3v3h-3z"/>',
  valve: '<path d="M9 4h6M12 4v4"/><rect x="8.5" y="8" width="7" height="5" rx="1"/><path d="M3 11.5h5.5M15.5 11.5H21M3 9v5M21 9v5M12 13v3"/><circle cx="12" cy="18" r="2"/>',
  shield: '<path d="M12 2.8 5.4 5.3v5.1c0 4.6 2.8 8.6 6.6 10.8 3.8-2.2 6.6-6.2 6.6-10.8V5.3L12 2.8Z"/><path d="m9 12 2.2 2.2L15.5 10"/>',
};

function factIcon(name) {
  const box = element('span', 'hero-fact-icon');
  box.setAttribute('aria-hidden', 'true');
  box.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${FACT_ICONS[name]}</svg>`;
  return box;
}

function createFacts(products) {
  const mixtures = new Set(products.map(product => product.product_family_id)).size;
  const sizes = [...new Set(products.map(product => parseFloat(product.dimensions_display)))].sort((a, b) => a - b);
  const facts = [
    ['flask', String(mixtures), t('mixtures available')],
    ['cylinder', `${sizes.join(' · ')} L`, t('cylinder sizes')],
    ['valve', t('BS4 valve'), t('supplied')],
    ['shield', t('12 months'), t('stability / expiry')],
  ];
  const list = element('ul', 'hero-facts');
  for (const [name, value, label] of facts) {
    const item = element('li', 'hero-fact');
    const text = element('span', 'hero-fact-text');
    text.append(element('strong', 'hero-fact-value', value), element('span', 'hero-fact-label', label));
    item.append(factIcon(name), text);
    list.append(item);
  }
  return list;
}

function createGasCard(products) {
  const product = products.find(item => item.id === FEATURED_SKU);
  if (!product) return null;
  const card = element('dl', 'hero-gas-card');
  card.setAttribute('aria-label', product[`display_name_${language}`]);
  // "O₂ 20.9% · CO 500 ppm · …" → one row per gas: name, then concentration.
  for (const part of product[`composition_${language}`].split(' · ')) {
    const [gas, ...value] = part.split(' ');
    const row = element('div', 'hero-gas-row');
    row.append(element('dt', '', gas), element('dd', '', value.join(' ')));
    card.append(row);
  }
  return card;
}

function createStage() {
  const stage = element('figure', 'hero-stage');
  const image = element('img', 'hero-stage-image');
  image.src = productProfile.productImage;
  image.alt = t('Handyman calibration gas cylinders: 3 L and 10 L steel, 8 L aluminium');
  image.width = 1920;
  image.height = 1920;
  image.loading = 'eager';
  image.decoding = 'async';
  stage.append(image);
  return stage;
}

export function createHero(products = []) {
  const hero = element('section', 'hero');
  hero.setAttribute('aria-labelledby', 'hero-title');
  const probe = new Image();
  probe.addEventListener('load', () => {
    // Absolute URL: a relative url() inside a custom property resolves against the stylesheet, not the page.
    hero.style.setProperty('--hero-photo', `url('${new URL(HERO_PHOTO, document.baseURI).href}')`);
    hero.classList.add('hero-has-photo');
  });
  probe.src = HERO_PHOTO;

  // Photo layer (shown once the photo loads) under the navy overlay.
  const backdrop = element('div', 'hero-backdrop');
  backdrop.setAttribute('aria-hidden', 'true');
  backdrop.append(element('div', 'hero-backdrop-photo'));
  hero.append(backdrop);

  const inner = element('div', 'container hero-inner');
  const copy = element('div', 'hero-copy');
  const eyebrow = element('p', 'eyebrow');
  eyebrow.append(`${productProfile.brand} `, element('span', 'eyebrow-accent', 'BY HANDYMAN'));
  const title = element('h1', '', t('Certified calibration gas'));
  title.id = 'hero-title';
  title.append(element('span', 'hero-title-second', t('for accurate, reliable detectors.')));
  const intro = element('p', 'hero-intro', t('Certified mixtures for bump testing, calibration and gas detector verification.'));

  const actions = element('div', 'hero-actions');
  const order = element('a', 'button button-primary hero-action');
  order.append(element('span', '', t('Order')), icon('arrow'));
  order.href = '#find-your-sign';
  order.addEventListener('click', event => {
    const target = document.querySelector('#find-your-sign');
    if (!target) return;
    event.preventDefault();
    scrollToElement(target, { focus: true });
    history.replaceState(null, '', '#find-your-sign');
  });
  const catalogue = element('a', 'button hero-action hero-action-secondary');
  catalogue.append(element('span', '', t('Download catalogue')), icon('download'));
  catalogue.href = `./${productProfile.catalogueURL}`;
  catalogue.download = productProfile.catalogueFile;
  actions.append(order, catalogue);
  copy.append(eyebrow, title, intro, actions, createFacts(products));

  const card = createGasCard(products);
  inner.append(copy, createStage());
  // The card sits in the content column, so its right edge lines up with the header (CONTACT SALES).
  if (card) inner.append(card);
  hero.append(inner);
  return hero;
}
