import { language, t } from './locale.js';

// Product-specific facts for this landing page. Shared components read these instead of hard-coding a brand.
export const productProfile = Object.freeze({
  brand: 'CALIBRATION GAS',
  catalogueURL: 'assets/calibration-gas-catalogue-en.pdf',
  catalogueFile: 'Handyman-Calibration-Gas-Catalogue.pdf',
  productImage: './src/assets/products/calibration-gas/product.webp',
});

/** Cylinder description in the current language, e.g. "3 L carbon steel cylinder". */
export const productCylinder = product => product[`cylinder_${language}`] ?? product.dimensions_display;

/** Product code line, e.g. "Product code 23.3.4.1.77". */
export const productCode = product => `${t('Product code')} ${product.barcode}`;
