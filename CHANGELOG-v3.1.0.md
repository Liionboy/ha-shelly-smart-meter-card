# Changelog - v3.1.0 (2026-11-14)

## 🆕 Features Added

### 1. **Monthly Forecast (Prognoză Lunară)**
- Estimates end-of-month consumption and cost based on daily average
- Shows projected kWh, cost, and daily average
- Smart calculation using current day of month and days in month
- Bilingual support (English/Romanian)

### 2. **Daily Comparison (Comparație Zilnică)**
- Real-time comparison of current power vs estimated average
- Visual trend indicators (📈📉➡️) with color coding
- Shows difference in watts with +/- prefix
- Helps identify abnormal consumption patterns

### 3. **Text Scaling Fix**
- New `fitText()` helper function for automatic text scaling
- Prevents text truncation in flow nodes (Solar/House/Grid)
- Automatic compact notation for values ≥ 1000W (e.g., "1.2kW")
- Maintains readability across different screen sizes

## 🎨 UI Improvements
- New forecast card with blue accent color
- New comparison section with purple accent color
- Consistent styling with existing card elements
- Responsive grid layout for comparison metrics

## 🌍 Translations
- Added English translations for forecast section
- Added Romanian translations for forecast section
- Maintained all existing language support (EN/RO/DE/FR/ES/IT/PL/HU)

## 🔧 Technical
- Version bump: 3.0.0 → 3.1.0
- TypeScript strict mode compatible
- Zero breaking changes
- Backward compatible with existing configurations

## 📊 Dashboard Enhancements
- Better data visualization with trend indicators
- Predictive analytics for energy planning
- Improved readability with smart text formatting
- Enhanced user experience with contextual comparisons

---

**Upgrade Path:** Seamless upgrade from v3.0.0 - no configuration changes required.

**Testing:** Verified on Home Assistant 2026.11.1 with Shelly Pro 3EM integration.
