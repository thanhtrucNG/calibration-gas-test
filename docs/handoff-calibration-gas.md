# Hand-off — Calibration Gas landing page

Built from the Hyperion reference (`Downloads/hyperion-imo-signs`) following `docs/landing-page-template.md`.

**Run locally:** start `calibration-gas` from `.claude/launch.json`. It uses the bundled node at `Documents/leadpage/IMO-Signs/imo-safety-signs/.tools/…/node.exe tools/serve.mjs . 8095`. Then open http://localhost:8095 (Vietnamese: `?lang=vi`).
**Rebuild product data:** edit `data-source/calibration-gas.json`, then run `node scripts/build-calibration-gas-data.mjs`.
**Translation check:** `node scripts/check-translations.mjs`.

## Changes requested by the business
- **No Product search / lookup section** and no `PRODUCT LOOKUP` nav link. The shop section starts at the configurator. Search components and styles were deleted.
- **No IMPA codes.** Order rows show the product code; the purchase card shows the cylinder.
- All **8 SKUs** from `Calibration Gas.xlsx` are on sale.

## Order flow
Steps: 1 Mixture (all 5) → 2 Cylinder size (3 L / 8 L / 10 L; sizes that don't fit the mixture are disabled) → 3 Cylinder basis (a single value, filled in automatically) + Add to order → 4 Contact & Shipping → 5 Payment.
- **No category step** (at your request, since there are only 8 SKUs). The data has one category, "Calibration gas". `product-configurator.js` skips the category step whenever `taxonomy.json` has a single group, and numbers the steps from 1. This deviates from template §1.1, where step 1 is always "Choose a product category".
- The Hyperion "design" step is skipped automatically because each mixture has only one design.
- Mixtures show as a text list, not picture cards, because they all share one photo.

## Needs your input or review
| # | Item | Detail |
|---|---|---|
| 1 | **Catalogue PDF** | ✅ Supplied on 2026-09-25 (`Calibration-Gas-Catalogue-en.pdf`, 1.1 MB, within the 5 MB limit), saved as `assets/calibration-gas-catalogue-en.pdf`. English only; add `-vi.pdf` if a Vietnamese version is made. |
| 2 | **USD prices are ESTIMATES** | USD = VND ÷ 26,000, rounded: 56M → US$2,154 · 49M → US$1,885 · 35M → US$1,346 · 29.4M → US$1,131. Replace them in `data-source/calibration-gas.json`. |
| 3 | **Deposit** | Kept Hyperion's US$5 / 130,000 ₫. That is very small against orders of US$1,100–2,200, so please set the right amount in `src/checkout/config.js`. |
| 4 | **Spreadsheet check** | 23.3.4.1.79 (10 L, THF 1.0%) says "Content of gas: 12.00 liters", but the other 10 L rows say 40.00. It is kept as supplied in the source data; it is not shown on the page. |
| 5 | **Spreadsheet check** | The 3 L cylinders are priced above the 10 L ones (56M vs 49M VND), and 3 L THF 1.5% is 35M while the other two 3 L cylinders are 56M. Please confirm. |
| 6 | **Vietnamese copy** | Needs review by a Vietnamese speaker: `docs/translation-review-calibration-gas.md`. |

## Deviations from the template
- **Hero:** built to match the approved mockup (2026-09-25):
  - Eyebrow "CALIBRATION GAS **BY HANDYMAN**".
  - Three-line headline "Certified calibration gas / for accurate, reliable / detectors."
  - One-line intro, then ORDER → and DOWNLOAD CATALOGUE ↓ buttons.
  - A facts strip: **5** mixtures available · **3 · 8 · 10 L** cylinder sizes · **BS4 VALVE** supplied · **12 MONTHS** stability / expiry. The first two are computed from the product data.
  - A gas card, top right, showing 23.3.4.1.3286 (O₂ 20.9%, CO 500 ppm, H₂S 50 ppm, CH₄ 60% LEL, CO₂ 2.5%), read from the product data.
  - The intro paragraph, the facts strip and the gas card deliberately break template §1.1 ("no paragraph text, no statistics") because the business asked for this design.
- **Hero photo:** the wide version, supplied 2026-09-25. It is saved as `src/assets/products/calibration-gas/hero.webp` (2000 × 674, about 3 : 1, 177 KB; cylinders at 53–74% of the width) under the §3.3 navy overlay. It has Handyman logos on the cylinders and **no faded edges**.
  - It is below the template's 2400px width, so a larger export would look sharper on very wide screens.
  - **Facts** sit in one glass panel as a 2 × 2 grid (icon, bold value, one-line label).
  - **Gas card** is a compact glass panel (184px wide, 16px text, 42% navy tint with background blur). It sits inside the content column, so its right edge equals the header's CONTACT SALES edge, and it stays 16px clear of the cylinders. It shows from 1280px up.
  - **Photo placement (≥ 1280px):** the photo is zoomed and positioned in CSS (`.hero-backdrop-photo`) so the cylinders end 8px left of the card and the photo still covers the whole hero. Zoom is 0.91 up to about 1700px and rises to 1.13 at 1920px.
  - **Below 1280px:** the photo covers the hero, positioned so the cylinders stay right of the copy.
  - **Measured** at 360–1920px, EN and VI: the photo covers the hero at every width, and no text, facts panel or gas card overlaps a cylinder.
    - The VI headline is capped at 500px and "chính xác" / "tin cậy" are joined with no-break spaces, so it reads "Khí chuẩn có chứng nhận / cho máy đo khí / chính xác, tin cậy."
    - On tablets (768–1023px) some cylinders are partly off the right edge.
  - If the photo file is ever removed, the hero falls back to the navy motif with the cylinder photo on a light panel.
- **Configurator heading** is "ORDER" / "ĐẶT HÀNG" (was "FIND YOUR CALIBRATION GAS"), at your request.
- **One photo for every SKU and the feature visual:** only `HANDYMAN.8L.CALIBRATIONGAS.webp` exists (1920×1920 on white, 86 KB). The feature visual is shown in a white card because the photo has no transparency.
- **Inherited from Hyperion (still open in Appendix A):**
  - The feature section and configurator still use some `clamp()` / non-token font sizes. The new hero uses 40 / 28 / 14px only.
  - Theme backgrounds are still 1.7–2.6 MB PNGs, not WebP.

## Small template fixes made here (worth porting back to Hyperion)
- `src/components/country-select.js`, `region-select.js`: Enter now picks the only remaining match. Before, typing "viet" + Enter did nothing unless ↓ was pressed first, which contradicts spec §12.1 test 8.
- `src/configurator/progressive-flow.js`: the design step is hidden before a concept is chosen when no concept in the category has more than one design.
- `src/components/product-configurator.js`: picture cards only when the options have different images.
- `src/configurator/size-options.js`: sorts one-number sizes like "8 L".
- **Locked-step hint cards** (`src/lib/locked-steps.js`, `marine-theme.css`): several grey "next step" cards could show at once. The "next locked" step is now set in JavaScript, so exactly one card shows. This is recorded as a known defect in the template (§9.5, §15, Appendix A).

## Checklist (§15) — results
- ✅ Section order is header → hero (dark) → feature (light) → shop (light) → footer (dark). No dark sections are adjacent.
- ✅ Images come only from `src/assets/products/calibration-gas/`. The hero photo is missing (see above).
- ✅ Only the 3 breakpoints are used, and every `max-width` ends in `.98`.
- ✅ Every `t()` string has a VI entry. `?lang=vi` shows VND prices (e.g. 29.400.000 ₫).
- ✅ Footer copy is unchanged; it reads "CALIBRATION GAS by DLV CORPORATION" and the year is computed.
- ✅ Hero H1 lines don't wrap at 1024, 1280 or 1440px in EN or VI.
- ✅ No horizontal scroll at 390, 768, 1024 or 1440px.
- ✅ Full order flow tested with real clicks and keyboard in both branches:
  - THF 1.0% + 10 L → 23.3.4.1.79 at US$1,885.
  - Multi-gas O₂ 20.9% + 8 L → 23.3.4.1.3286 at US$1,131.
  - Contact & Shipping by keyboard (Vietnam → Huế) unlocks Payment automatically, with no Continue button.
- ✅ No "IMPA", "ISSA", "lookup" or Hyperion/sign wording in the EN or VI page text.
- ✅ `scrollIntoView` appears only inside the dropdown lists (exempt).
- ⚠️ Screenshots: the hero at 1440px and 390px was checked visually. Screenshots of lower sections could not be captured in this session (the preview pane didn't render them), so layout below the hero was checked by measurement only. Please look over the feature and shop sections at 1440px and 390px.
- ⚠️ Not re-run: the §11.1 glide timing test and the full 10-case §12.1 province suite. That code is unchanged from Hyperion apart from the Enter fix.
