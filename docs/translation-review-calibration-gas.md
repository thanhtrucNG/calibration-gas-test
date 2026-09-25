# Translation review — Calibration Gas (EN ↔ VI)

Scope: every string that is **new or changed** for the calibration gas page. Strings shared with Hyperion (checkout, payment, order summary, contact, footer) are unchanged and were reviewed in `hyperion-imo-signs/docs/translation-review-hyperion.md`.
Source: `src/lib/locale.js` (UI) and `data-source/calibration-gas.json` (product data).
`node scripts/check-translations.mjs` reports every `t()` string has a VI entry.
**Status: needs review by a Vietnamese speaker before launch (§8.1 rule 9).**

## UI strings (`src/lib/locale.js`)

| Area | EN | VI | Issue |
|---|---|---|---|
| Hero H1 line 1 | Certified calibration gas | Khí chuẩn có chứng nhận | — |
| Hero H1 line 2 | for accurate gas detection. | cho phép đo khí chính xác. | — |
| Hero CTA | Find your gas | Tìm khí chuẩn | CTA, uppercased by CSS |
| Hero CTA | Download catalogue | Tải catalogue | shared |
| Feature eyebrow | GAS QUALITY | CHẤT LƯỢNG KHÍ | — |
| Feature H2 | Built for reliable calibration. | Hiệu chuẩn đáng tin cậy. | — |
| Feature intro | Certified gas mixtures for bump testing and calibrating fixed and portable gas detectors, onboard and onshore. | Hỗn hợp khí có chứng nhận để kiểm tra nhanh và hiệu chuẩn máy đo khí cố định, cầm tay, trên tàu và trên bờ. | "kiểm tra nhanh" for "bump test": please confirm the trade term |
| Feature card | Certificate of Analysis | Giấy chứng nhận phân tích | — |
| Feature card | Each cylinder comes with its certified gas composition. | Mỗi bình đi kèm thành phần khí đã được chứng nhận. | — |
| Feature card | Certified accuracy | Độ chính xác được chứng nhận | — |
| Feature card | Mixtures certified to ±2%, prepared within ±10% of target. | Hỗn hợp chứng nhận ±2%, pha chế trong ±10% giá trị mục tiêu. | — |
| Feature card | 12-month stability | Ổn định 12 tháng | — |
| Feature card | Concentrations stay within specification for 12 months. | Nồng độ giữ đúng thông số trong 12 tháng. | — |
| Feature card | Ready-to-use cylinders | Bình sẵn sàng sử dụng | — |
| Feature card | Steel or aluminium cylinders from 3 L to 10 L, BS4 valve. | Bình thép hoặc nhôm từ 3 L đến 10 L, van BS4. | — |
| Feature image alt | Handyman calibration gas cylinders: 3 L and 10 L steel, 8 L aluminium | Bình khí chuẩn Handyman: bình thép 3 L và 10 L, bình nhôm 8 L | — |
| Configurator heading | ORDER | ĐẶT HÀNG | same key as the header nav link (glossary) |
| Hero certificate tag | Certified mixture | Hỗn hợp được chứng nhận | desktop only |
| Hero certificate tag | Balance N₂ · ±2% certified | Nền N₂ · chứng nhận ±2% | — |
| Step title | Choose a mixture | Chọn hỗn hợp khí | — |
| Step title | Choose cylinder size | Chọn dung tích bình | — |
| Step title | Cylinder basis | Hình thức bình | — |
| Unlock hint | Select a mixture first | Vui lòng chọn hỗn hợp khí trước | — |
| Size disabled tooltip | Not available for this mixture | Không có dung tích này cho hỗn hợp đã chọn | — |
| Filter (shown only if > 8 mixtures) | Filter these mixtures / Type a gas or product code / No matching mixtures. Try another gas or code. | Lọc hỗn hợp khí / Nhập tên khí hoặc mã sản phẩm / Không có hỗn hợp phù hợp. Vui lòng thử tên khí hoặc mã khác. | not visible with 5 mixtures |
| Product code label | Product code | Mã sản phẩm | glossary: SKU → mã sản phẩm |
| Edition values | Outright cylinder / Refillable cylinder | Bình mua đứt / Bình nạp lại được | please confirm "mua đứt" |
| Skip link | Skip to order | Chuyển đến phần đặt hàng | — |

## Product data (`data-source/calibration-gas.json`)

| Area | EN | VI | Issue |
|---|---|---|---|
| Category | THF / Octane mixtures | Hỗn hợp THF / Octane | — |
| Category | Multi-gas detector mixtures | Hỗn hợp cho máy đo đa khí | — |
| Mixture | THF 0.5% · Octane 0.05% (also 1.0/0.1, 1.5/0.15) | THF 0,5% · Octane 0,05% … | VI uses decimal comma |
| Mixture | O₂ 18% · CO 100 ppm · H₂S 25 ppm · CH₄ 50% LEL · CO₂ 2,500 ppm | … CO₂ 2.500 ppm | VI thousands dot |
| Mixture | O₂ 20.9% · CO 500 ppm · H₂S 50 ppm · CH₄ 60% LEL · CO₂ 2.5% | O₂ 20,9% · … · CO₂ 2,5% | — |
| Mixture detail | Balance N₂ · 3 L or 10 L steel cylinder / 8 L aluminium cylinder | Nền N₂ · bình thép 3 L hoặc 10 L / bình nhôm 8 L | — |
| Product name | Calibration gas <mixture>, balance N₂ | Khí chuẩn <mixture>, nền N₂ | — |
| Cylinder | 3 L / 10 L carbon steel cylinder, 8 L aluminium cylinder | bình thép carbon 3 L / 10 L, bình nhôm 8 L | — |

## Removed (Hyperion-only)
Sign, IMPA/ISSA, and product-search/lookup strings were removed from `locale.js`, because the page no longer has a search section or IMPA codes.
