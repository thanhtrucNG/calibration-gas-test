import { element } from '../lib/dom.js';
import { language, t } from '../lib/locale.js';
import { scrollToElement } from '../lib/scroll.js';
import { productProfile } from '../lib/product-profile.js';

// The certificate tag shows a real mixture from the catalogue, read from the product data.
const FEATURED_SKU = '23.3.4.1.3286';

function createCertificateTag(products) {
  const product = products.find(item => item.id === FEATURED_SKU);
  if (!product) return null;
  const tag = element('div', 'hero-tag');
  tag.append(element('p', 'hero-tag-title', t('Certified mixture')));
  const rows = element('dl', 'hero-tag-rows');
  // "O₂ 20.9% · CO 500 ppm · …" → one row per gas: name, then concentration.
  for (const part of product[`composition_${language}`].split(' · ')) {
    const [gas, ...value] = part.split(' ');
    const row = element('div', 'hero-tag-row');
    row.append(element('dt', '', gas), element('dd', '', value.join(' ')));
    rows.append(row);
  }
  tag.append(rows, element('p', 'hero-tag-note', t('Balance N₂ · ±2% certified')));
  return tag;
}

export function createHero(products = []) {
  const hero = element('section', 'hero');
  hero.setAttribute('aria-labelledby', 'hero-title');
  const inner = element('div', 'container hero-inner');
  const copy = element('div', 'hero-copy');
  const eyebrow = element('p', 'eyebrow', `${productProfile.brand} BY HANDYMAN`);
  const title = element('h1', '', t('Certified calibration gas'));
  title.id = 'hero-title';
  title.append(element('span', 'hero-title-second', t('for accurate gas detection.')));
  const actions = element('div', 'hero-actions');
  const find = element('a', 'button button-primary hero-action', t('Find your gas'));
  find.href = '#find-your-sign';
  find.addEventListener('click', event => {
    const target = document.querySelector('#find-your-sign');
    if (!target) return;
    event.preventDefault();
    scrollToElement(target, { focus: true });
    history.replaceState(null, '', '#find-your-sign');
  });
  const catalogue = element('a', 'button hero-action hero-action-secondary', t('Download catalogue'));
  catalogue.href = `./${productProfile.catalogueURL}`;
  catalogue.download = productProfile.catalogueFile;
  actions.append(find, catalogue);
  copy.append(eyebrow, title, actions);

  // Product stage: the cylinder photo multiplies onto a light lab panel, so its white backdrop becomes
  // the panel. The panel overhangs into the next section; a certificate tag overlaps its corner.
  // Desktop/tablet only (hidden below 768px).
  const visual = element('figure', 'hero-visual');
  const stage = element('div', 'hero-stage');
  const image = element('img', 'hero-visual-image');
  image.src = productProfile.productImage;
  image.alt = t('Handyman calibration gas cylinders: 3 L and 10 L steel, 8 L aluminium');
  image.width = 1920;
  image.height = 1920;
  image.loading = 'eager';
  image.decoding = 'async';
  stage.append(image);
  visual.append(stage);
  const tag = createCertificateTag(products);
  if (tag) visual.append(tag);

  inner.append(copy, visual);
  hero.append(inner);
  return hero;
}
