# ⚡ Shelly Smart Meter Card

Custom Home Assistant card for Shelly Pro 3EM (SmartMeterSolar) — 3-phase energy monitoring with solar flow visualization.

## Features

- **Energy Flow Diagram** — animated visualization of solar → house → grid power flow
- **3-Phase Monitoring** — per-phase voltage, current, power, power factor, frequency
- **Energy Counters** — daily consumed, daily returned, lifetime totals
- **Cost Tracking** — daily cost estimation based on grid consumption
- **Device Status** — temperature, WiFi signal, cloud connectivity
- **Phase Labels** — customizable phase names (Casa, Pompă Căldură, Plită)
- **Editor UI** — visual config editor with tabbed sections
- **Responsive** — works on mobile and desktop
- **Click for Details** — click any metric for more-info dialog

## Installation

### HACS (Manual)
1. Copy `dist/ha-shelly-smart-meter-card.js` to `/config/www/`
2. Add resource: `/local/ha-shelly-smart_meter-card.js` (type: module)
3. Add card to dashboard

### Manual Build
```bash
npm install
npm run build
```

## Configuration

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
  # ... (see editor for full list)
```

## Default Entities

All entities default to the Shelly SmartMeterSolar device names. Override only if your entities differ.

| Key | Default Entity |
|-----|---------------|
| `phase_a_power` | `sensor.smartmetersolar_phase_a_active_power` |
| `phase_a_voltage` | `sensor.smartmetersolar_phase_a_voltage` |
| `phase_a_current` | `sensor.smartmetersolar_phase_a_current` |
| `phase_a_pf` | `sensor.smartmetersolar_phase_a_power_factor` |
| `total_power` | `sensor.smartmetersolar_total_active_power` |
| `daily_consumed` | `sensor.consum_zilnic_energy_casa` |
| `daily_return` | `sensor.shelly_daily_return_grid` |
| `temperature` | `sensor.smartmetersolar_temperature` |

## Screenshots

_Add screenshot here_

## License

MIT
