<p align="center">
  <img src="brand/logo.svg" alt="Shelly Smart Meter Card" width="400">
</p>

<h1 align="center">⚡ Shelly Smart Meter Card</h1>

<p align="center">
  Custom Home Assistant card for <strong>Shelly Pro 3EM</strong> (SmartMeterSolar)<br>
  3-phase energy monitoring with solar flow visualization
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-amber?style=flat-square" alt="Version">
  <img src="https://img.shields.io/badge/HACS-Custom-orange?style=flat-square" alt="HACS">
  <img src="https://img.shields.io/badge/HA-2024.1+-blue?style=flat-square" alt="HA">
  <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="License">
</p>

---

## ✨ Features

| Feature | Description |
|---------|------------|
| ⚡ **Energy Flow** | Animated diagram: Solar → House → Grid with live power values |
| 🔌 **3-Phase Monitor** | Per-phase voltage, current, power, power factor, frequency |
| 📊 **Energy Counters** | Daily consumed/returned + lifetime totals |
| 💰 **Cost Tracking** | Daily cost estimation in RON (configurable rate) |
| 📡 **Device Status** | Temperature, WiFi RSSI, cloud/local connectivity |
| 🏷️ **Phase Labels** | Custom names (Casa, Pompă Căldură, Plită) |
| 🎨 **Visual Editor** | Tabbed config UI — no YAML needed |
| 📱 **Responsive** | Adapts to mobile & desktop |

## 📦 Installation via HACS

### Custom Repository
1. Go to **HACS → Integrations → ⋮ → Custom repositories**
2. Add URL: `https://github.com/ADRIAN_USER/ha-shelly-smart-meter-card`
3. Category: **Frontend**
4. Click **Install**
5. Refresh browser cache

### Manual
1. Download `ha-shelly-smart-meter-card.js` from [releases](../../releases)
2. Copy to `/config/www/`
3. Add resource in **Settings → Dashboards → Resources**:
   ```
   /local/ha-shelly-smart-meter-card.js
   Type: JavaScript Module
   ```

## ⚙️ Configuration

### Minimal (uses all defaults)
```yaml
type: custom:ha-shelly-smart-meter-card
```

### Full
```yaml
type: custom:ha-shelly-smart-meter-card
title: "⚡ Smart Meter Solar"
show_header: true
show_flow: true
show_phases: true
show_energy: true
show_costs: true
show_device: true
cost_per_kwh: 0.85
phase_labels:
  A: Casa
  B: Pompă Căldură
  C: Plită
entities:
  phase_a_power: sensor.smartmetersolar_phase_a_active_power
  phase_a_voltage: sensor.smartmetersolar_phase_a_voltage
  phase_a_current: sensor.smartmetersolar_phase_a_current
  phase_a_pf: sensor.smartmetersolar_phase_a_power_factor
  phase_a_freq: sensor.smartmetersolar_phase_a_frequency
  phase_a_energy: sensor.smartmetersolar_phase_a_total_active_energy
  phase_a_returned: sensor.smartmetersolar_phase_a_total_active_returned_energy
  # Same for phase_b_*, phase_c_*
  total_power: sensor.smartmetersolar_total_active_power
  total_apparent: sensor.smartmetersolar_total_apparent_power
  total_current: sensor.smartmetersolar_total_current
  total_energy: sensor.smartmetersolar_total_active_energy
  total_returned: sensor.smartmetersolar_total_active_returned_energy
  daily_consumed: sensor.consum_zilnic_energy_casa
  daily_grid: sensor.consum_zilnic_grid
  daily_return: sensor.shelly_daily_return_grid
  total_cost: sensor.smartmetersolar_total_active_energy_cost
  temperature: sensor.smartmetersolar_temperature
  rssi: sensor.smartmetersolar_rssi
  uptime: sensor.smartmetersolar_uptime
  cloud: binary_sensor.smartmetersolar_cloud
  firmware: update.smartmetersolar_firmware_update
```

## 🏷️ Default Entity Map

All entities default to Shelly SmartMeterSolar device names. Override only if yours differ.

| Section | Key | Default Entity |
|---------|-----|---------------|
| **Phase A** | `phase_a_power` | `sensor.smartmetersolar_phase_a_active_power` |
| | `phase_a_voltage` | `sensor.smartmetersolar_phase_a_voltage` |
| | `phase_a_current` | `sensor.smartmetersolar_phase_a_current` |
| **Phase B** | `phase_b_power` | `sensor.smartmetersolar_phase_b_active_power` |
| | `phase_b_voltage` | `sensor.smartmetersolar_phase_b_voltage` |
| **Phase C** | `phase_c_power` | `sensor.smartmetersolar_phase_c_active_power` |
| | `phase_c_voltage` | `sensor.smartmetersolar_phase_c_voltage` |
| **Totals** | `total_power` | `sensor.smartmetersolar_total_active_power` |
| **Daily** | `daily_consumed` | `sensor.consum_zilnic_energy_casa` |
| | `daily_return` | `sensor.shelly_daily_return_grid` |
| **Device** | `temperature` | `sensor.smartmetersolar_temperature` |
| | `rssi` | `sensor.smartmetersolar_rssi` |

## 📸 Screenshots

_Add screenshot here_

## 🛠️ Development

```bash
git clone https://github.com/ADRIAN_USER/ha-shelly-smart-meter-card.git
cd ha-shelly-smart-meter-card
npm install
npm run build
```

Output: `dist/ha-shelly-smart-meter-card.js`

## 📄 License

MIT — made with ⚡ for Home Assistant
