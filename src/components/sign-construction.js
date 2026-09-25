import { element } from '../lib/dom.js';
import { t } from '../lib/locale.js';
import { productProfile } from '../lib/product-profile.js';

const FEATURE_CARDS = [
  {
    icon: 'certificate',
    title: 'Certificate of Analysis',
    body: 'Each cylinder comes with its certified gas composition.',
  },
  {
    icon: 'target',
    title: 'Certified accuracy',
    body: 'Mixtures certified to ±2%, prepared within ±10% of target.',
  },
  {
    icon: 'clock',
    title: '12-month stability',
    body: 'Concentrations stay within specification for 12 months.',
  },
  {
    icon: 'cylinder',
    title: 'Ready-to-use cylinders',
    body: 'Steel or aluminium cylinders from 3 L to 10 L, BS4 valve.',
  },
];

const ICON_PATHS = {
  certificate: '<path d="M6 3h9l4 4v14H6z"/><path d="M15 3v4h4M9 11h7M9 14.5h4"/><circle cx="15.5" cy="17.5" r="1.8"/>',
  target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  cylinder: '<path d="M10 2.8h4M12 2.8v2.4"/><path d="M8.5 8.2a3.5 3 0 0 1 7 0V20a1.2 1.2 0 0 1-1.2 1.2H9.7A1.2 1.2 0 0 1 8.5 20z"/><path d="M8.5 12h7M8.5 16h7"/>',
};

function createFeatureIcon(name) {
  const wrapper = element('span', 'sign-construction-feature-icon');
  wrapper.setAttribute('aria-hidden', 'true');
  wrapper.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${ICON_PATHS[name]}</svg>`;
  return wrapper;
}

function createFeatureCard(feature) {
  const card = element('article', 'sign-construction-feature');
  const copy = element('div', 'sign-construction-feature-copy');
  copy.append(
    element('h3', '', t(feature.title)),
    element('p', '', t(feature.body)),
  );
  card.append(createFeatureIcon(feature.icon), copy);
  return card;
}

/**
 * Marketing section inserted directly after the hero.
 * It is intentionally isolated from catalogue/configurator/cart logic so the
 * existing Phase 16 shopping flow remains unchanged.
 */
export function createSignConstructionSection() {
  const baseURL = import.meta.env?.BASE_URL ?? './';
  const section = element('section', 'sign-construction');
  section.id = 'sign-construction';
  section.setAttribute('aria-labelledby', 'sign-construction-title');

  const inner = element('div', 'container sign-construction-inner');

  const copyColumn = element('div', 'sign-construction-copy');
  const eyebrow = element('p', 'sign-construction-eyebrow', t('GAS QUALITY'));
  const title = element('h2', 'sign-construction-title', t('Built for reliable calibration.'));
  title.id = 'sign-construction-title';
  const intro = element(
    'p',
    'sign-construction-intro',
    t('Certified gas mixtures for bump testing and calibrating fixed and portable gas detectors, onboard and onshore.'),
  );

  const features = element('div', 'sign-construction-features');
  FEATURE_CARDS.forEach(feature => features.append(createFeatureCard(feature)));

  const catalogueLink = element('a', 'sign-construction-catalogue-link');
  catalogueLink.href = `${baseURL}${productProfile.catalogueURL}`;
  catalogueLink.download = productProfile.catalogueFile;
  catalogueLink.append(
    element('span', '', t('View Catalogue')),
    element('span', 'sign-construction-link-arrow', '→'),
  );

  const heading = element('div', 'sign-construction-heading');
  heading.append(eyebrow, title, intro);
  copyColumn.append(heading, features, catalogueLink);

  const visualColumn = element('div', 'sign-construction-visual-column');
  const visualPanel = element('figure', 'sign-construction-visual-panel');
  const visual = element('img', 'sign-construction-visual-image');
  visual.src = productProfile.productImage;
  visual.width = 1920;
  visual.height = 1920;
  visual.alt = t('Handyman calibration gas cylinders: 3 L and 10 L steel, 8 L aluminium');
  visual.loading = 'lazy';
  visual.decoding = 'async';

  visualPanel.append(visual);
  visualColumn.append(visualPanel);

  inner.append(copyColumn, visualColumn);
  section.append(inner);
  return section;
}
