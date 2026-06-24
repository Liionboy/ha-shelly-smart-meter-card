import { LitElement, html, css, CSSResultGroup, TemplateResult, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, LovelaceCardEditor, fireEvent } from 'custom-card-helpers';

const CARD = 'ha-shelly-smart-meter-card';
console.info(
  `%c ⚡ SHELLY-SMART-METER-CARD %c v1.0.0 `,
  'color:#fff;background:#f59e0b;font-weight:700;border-radius:4px 0 0 4px;padding:2px 6px;',
  'color:#fff;background:#6b7280;font-weight:700;border-radius:0 4px 4px 0;padding:2px 6px;'
);

// ── Config ──────────────────────────────────────────────────────────────────
interface MeterConfig {
  type: string;
  title?: string;
  show_header?: boolean;
  show_phases?: boolean;
  show_energy?: boolean;
  show_costs?: boolean;
  show_device?: boolean;
  show_flow?: boolean;
  cost_per_kwh?: number;
  entities?: Record<string, string>;
  phase_labels?: Record<string, string>;
}

const DEFAULT_ENTITIES: Record<string, string> = {
  // Phase A — Casa
  phase_a_power: 'sensor.smartmetersolar_phase_a_active_power',
  phase_a_voltage: 'sensor.smartmetersolar_phase_a_voltage',
  phase_a_current: 'sensor.smartmetersolar_phase_a_current',
  phase_a_pf: 'sensor.smartmetersolar_phase_a_power_factor',
  phase_a_freq: 'sensor.smartmetersolar_phase_a_frequency',
  phase_a_energy: 'sensor.smartmetersolar_phase_a_total_active_energy',
  phase_a_returned: 'sensor.smartmetersolar_phase_a_total_active_returned_energy',
  // Phase B — Pompa Caldura
  phase_b_power: 'sensor.smartmetersolar_phase_b_active_power',
  phase_b_voltage: 'sensor.smartmetersolar_phase_b_voltage',
  phase_b_current: 'sensor.smartmetersolar_phase_b_current',
  phase_b_pf: 'sensor.smartmetersolar_phase_b_power_factor',
  phase_b_freq: 'sensor.smartmetersolar_phase_b_frequency',
  phase_b_energy: 'sensor.smartmetersolar_phase_b_total_active_energy',
  phase_b_returned: 'sensor.smartmetersolar_phase_b_total_active_returned_energy',
  // Phase C — Plita
  phase_c_power: 'sensor.smartmetersolar_phase_c_active_power',
  phase_c_voltage: 'sensor.smartmetersolar_phase_c_voltage',
  phase_c_current: 'sensor.smartmetersolar_phase_c_current',
  phase_c_pf: 'sensor.smartmetersolar_phase_c_power_factor',
  phase_c_freq: 'sensor.smartmetersolar_phase_c_frequency',
  phase_c_energy: 'sensor.smartmetersolar_phase_c_total_active_energy',
  phase_c_returned: 'sensor.smartmetersolar_phase_c_total_active_returned_energy',
  // Totals
  total_power: 'sensor.smartmetersolar_total_active_power',
  total_apparent: 'sensor.smartmetersolar_total_apparent_power',
  total_current: 'sensor.smartmetersolar_total_current',
  total_energy: 'sensor.smartmetersolar_total_active_energy',
  total_returned: 'sensor.smartmetersolar_total_active_returned_energy',
  // Daily
  daily_consumed: 'sensor.consum_zilnic_energy_casa',
  daily_grid: 'sensor.consum_zilnic_grid',
  daily_return: 'sensor.shelly_daily_return_grid',
  // Cost
  total_cost: 'sensor.smartmetersolar_total_active_energy_cost',
  // Device
  temperature: 'sensor.smartmetersolar_temperature',
  rssi: 'sensor.smartmetersolar_rssi',
  uptime: 'sensor.smartmetersolar_uptime',
  cloud: 'binary_sensor.smartmetersolar_cloud',
  firmware: 'update.smartmetersolar_firmware_update',
};

const DEFAULT_PHASE_LABELS: Record<string, string> = {
  A: 'Casa',
  B: 'Pompă Căldură',
  C: 'Plită',
};

// ── Card ────────────────────────────────────────────────────────────────────
@customElement(CARD)
export class ShellySmartMeterCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ attribute: false }) public config!: MeterConfig;
  @state() private _showAllPhases = false;

  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import('./editor/ha-shelly-smart-meter-editor');
    return document.createElement('ha-shelly-smart-meter-editor') as LovelaceCardEditor;
  }

  public static getStubConfig(): MeterConfig {
    return {
      type: CARD,
      title: '⚡ Smart Meter Solar',
      show_header: true,
      show_phases: true,
      show_energy: true,
      show_costs: true,
      show_device: true,
      show_flow: true,
      cost_per_kwh: 0.85,
      entities: DEFAULT_ENTITIES,
      phase_labels: DEFAULT_PHASE_LABELS,
    };
  }

  setConfig(config: MeterConfig): void {
    if (!config) throw new Error('Invalid config');
    this.config = {
      ...config,
      type: CARD,
      title: config.title || '⚡ Smart Meter Solar',
      show_header: config.show_header ?? true,
      show_phases: config.show_phases ?? true,
      show_energy: config.show_energy ?? true,
      show_costs: config.show_costs ?? true,
      show_device: config.show_device ?? true,
      show_flow: config.show_flow ?? true,
      cost_per_kwh: config.cost_per_kwh ?? 0.85,
      entities: { ...DEFAULT_ENTITIES, ...config.entities },
      phase_labels: { ...DEFAULT_PHASE_LABELS, ...config.phase_labels },
    };
  }

  // ── Helpers ──────────────────────────────────────────────────────────────
  private _s(id: string): string | undefined {
    return this.hass?.states[this.config.entities?.[id] || '']?.state;
  }
  private _n(id: string): number {
    const v = parseFloat(this._s(id) || '');
    return isNaN(v) ? 0 : v;
  }
  private _e(id: string): string {
    return this.config.entities?.[id] || '';
  }
  private _unit(id: string): string {
    return this.hass?.states[this.config.entities?.[id] || '']?.attributes?.unit_of_measurement || '';
  }
  private _changed(id: string): string {
    const s = this.hass?.states[this.config.entities?.[id] || ''];
    if (!s?.last_changed) return '';
    const mins = Math.floor((Date.now() - new Date(s.last_changed).getTime()) / 60000);
    if (mins < 1) return 'acum';
    if (mins < 60) return `${mins} min`;
    const h = Math.floor(mins / 60);
    return h < 24 ? `${h}h ${mins % 60}min` : `${Math.floor(h / 24)}z ${h % 24}h`;
  }
  private _handleMore(entityId: string) {
    fireEvent(this, 'hass-more-info', { entityId });
  }
  private _fmt(v: number, decimals = 1): string {
    if (Math.abs(v) >= 1000) return (v / 1000).toFixed(decimals) + 'k';
    return v.toFixed(decimals);
  }

  getCardSize(): number {
    return 6;
  }

  // ── Render ───────────────────────────────────────────────────────────────
  protected render(): TemplateResult | typeof nothing {
    if (!this.config || !this.hass) return nothing;

    const totalPower = this._n('total_power');
    const isExporting = totalPower < 0;
    const absPower = Math.abs(Math.round(totalPower));

    // Phase data
    const phases = (['a', 'b', 'c'] as const).map((p) => ({
      key: p.toUpperCase(),
      label: this.config.phase_labels?.[p.toUpperCase()] || p.toUpperCase(),
      power: this._n(`phase_${p}_power`),
      voltage: this._n(`phase_${p}_voltage`),
      current: this._n(`phase_${p}_current`),
      pf: this._n(`phase_${p}_pf`),
      freq: this._n(`phase_${p}_freq`),
      energy: this._n(`phase_${p}_energy`),
      returned: this._n(`phase_${p}_returned`),
    }));

    // Energy
    const dailyConsumed = this._n('daily_consumed');
    const dailyGrid = this._n('daily_grid');
    const dailyReturn = this._n('daily_return');
    const totalEnergy = this._n('total_energy');
    const totalReturned = this._n('total_returned');

    // Cost
    const costPerKwh = this.config.cost_per_kwh || 0.85;
    const dailyCost = dailyGrid * costPerKwh;

    // Device
    const temp = this._s('temperature');
    const rssi = this._n('rssi');
    const isOnline = this._s('cloud') === 'on';

    return html`
      <ha-card>
        <!-- HEADER -->
        ${this.config.show_header !== false ? html`
          <div class="header ${isExporting ? 'exporting' : 'importing'}">
            <div class="header-icon">⚡</div>
            <div class="header-text">
              <div class="header-title">${this.config.title || 'Smart Meter Solar'}</div>
              <div class="header-sub">
                ${isExporting
                  ? `↗ Export ${absPower}W în rețea`
                  : totalPower > 50
                    ? `↙ Import ${absPower}W din rețea`
                    : '⚖ Consum echilibrat'}
              </div>
            </div>
            <div class="power-badge ${isExporting ? 'export' : 'import'}">
              ${isExporting ? '↗' : '↙'} ${absPower}W
            </div>
          </div>
        ` : nothing}

        <div class="content">
          <!-- FLOW DIAGRAM -->
          ${this.config.show_flow !== false ? html`
            <div class="flow">
              <div class="flow-node solar ${isExporting ? 'active' : ''}">
                <ha-icon icon="mdi:solar-power-variant"></ha-icon>
                <span class="flow-val">${isExporting ? absPower : 0}W</span>
                <small>Solar</small>
              </div>

              <div class="flow-arrow ${isExporting ? 'to-grid' : 'from-grid'}">
                <div class="arrow-line ${isExporting ? 'export' : (totalPower > 50 ? 'import' : 'idle')}">
                  <ha-icon icon=${isExporting ? 'mdi:arrow-right-bold' : (totalPower > 50 ? 'mdi:arrow-left-bold' : 'mdi:swap-horizontal')}></ha-icon>
                </div>
              </div>

              <div class="flow-node house">
                <ha-icon icon="mdi:home-lightning-bolt"></ha-icon>
                <span class="flow-val">${Math.round(this._n('total_apparent') || absPower)}W</span>
                <small>Consum</small>
              </div>

              <div class="flow-arrow ${!isExporting && totalPower > 50 ? 'from-grid' : 'to-grid'}">
                <div class="arrow-line ${!isExporting && totalPower > 50 ? 'import' : (isExporting ? 'export' : 'idle')}">
                  <ha-icon icon=${!isExporting && totalPower > 50 ? 'mdi:arrow-left-bold' : 'mdi:arrow-right-bold'}></ha-icon>
                </div>
              </div>

              <div class="flow-node grid ${!isExporting && totalPower > 50 ? 'active' : ''}">
                <ha-icon icon="mdi:transmission-tower"></ha-icon>
                <span class="flow-val">${!isExporting && totalPower > 50 ? absPower : (isExporting ? absPower : 0)}W</span>
                <small>Rețea</small>
              </div>
            </div>
          ` : nothing}

          <!-- PHASE CARDS -->
          ${this.config.show_phases !== false ? html`
            <div class="phases-header" @click=${() => { this._showAllPhases = !this._showAllPhases; }}>
              <span class="phases-title">Faze</span>
              <ha-icon .icon=${this._showAllPhases ? 'mdi:chevron-up' : 'mdi:chevron-down'}></ha-icon>
            </div>
            <div class="phases">
              ${phases.map((p) => {
                const pwr = Math.round(p.power);
                const isPhaseExporting = pwr < 0;
                return html`
                  <div class="phase-card" @click=${() => this._handleMore(this._e(`phase_${p.key.toLowerCase()}_power`))}>
                    <div class="phase-header">
                      <span class="phase-label">${p.key}</span>
                      <span class="phase-name">${p.label}</span>
                      <span class="phase-power ${isPhaseExporting ? 'export' : 'import'}">
                        ${isPhaseExporting ? '↗' : '↙'} ${Math.abs(pwr)}W
                      </span>
                    </div>
                    ${this._showAllPhases ? html`
                      <div class="phase-details">
                        <div class="phase-detail">
                          <ha-icon icon="mdi:flash"></ha-icon>
                          <span>${p.voltage.toFixed(1)}V</span>
                        </div>
                        <div class="phase-detail">
                          <ha-icon icon="mdi:current-ac"></ha-icon>
                          <span>${p.current.toFixed(2)}A</span>
                        </div>
                        <div class="phase-detail">
                          <ha-icon icon="mdi:cosine-wave"></ha-icon>
                          <span>PF ${p.pf.toFixed(2)}</span>
                        </div>
                        <div class="phase-detail">
                          <ha-icon icon="mdi:sine-wave"></ha-icon>
                          <span>${p.freq.toFixed(1)}Hz</span>
                        </div>
                      </div>
                      <div class="phase-energy">
                        <span class="energy-in">
                          <ha-icon icon="mdi:transmission-tower-import"></ha-icon>
                          ${p.energy.toFixed(1)} kWh
                        </span>
                        <span class="energy-out">
                          <ha-icon icon="mdi:transmission-tower-export"></ha-icon>
                          ${p.returned.toFixed(1)} kWh
                        </span>
                      </div>
                    ` : nothing}
                  </div>
                `;
              })}
            </div>
          ` : nothing}

          <!-- ENERGY COUNTERS -->
          ${this.config.show_energy !== false ? html`
            <div class="energy-section">
              <div class="energy-grid">
                <div class="energy-card consumed" @click=${() => this._handleMore(this._e('daily_consumed'))}>
                  <ha-icon icon="mdi:counter"></ha-icon>
                  <div class="energy-info">
                    <span class="energy-label">Consum azi</span>
                    <span class="energy-val">${dailyConsumed.toFixed(2)} kWh</span>
                  </div>
                </div>
                <div class="energy-card returned" @click=${() => this._handleMore(this._e('daily_return'))}>
                  <ha-icon icon="mdi:solar-power"></ha-icon>
                  <div class="energy-info">
                    <span class="energy-label">Returnat azi</span>
                    <span class="energy-val">${dailyReturn.toFixed(2)} kWh</span>
                  </div>
                </div>
                <div class="energy-card total-in" @click=${() => this._handleMore(this._e('total_energy'))}>
                  <ha-icon icon="mdi:meter-electric"></ha-icon>
                  <div class="energy-info">
                    <span class="energy-label">Total consumat</span>
                    <span class="energy-val">${this._fmt(totalEnergy)} kWh</span>
                  </div>
                </div>
                <div class="energy-card total-out" @click=${() => this._handleMore(this._e('total_returned'))}>
                  <ha-icon icon="mdi:flash-outline"></ha-icon>
                  <div class="energy-info">
                    <span class="energy-label">Total returnat</span>
                    <span class="energy-val">${this._fmt(totalReturned)} kWh</span>
                  </div>
                </div>
              </div>
            </div>
          ` : nothing}

          <!-- COSTS -->
          ${this.config.show_costs !== false ? html`
            <div class="costs" @click=${() => this._handleMore(this._e('daily_grid'))}>
              <div class="cost-row">
                <ha-icon icon="mdi:cash"></ha-icon>
                <span>Cost estimat azi (rețea)</span>
                <span class="cost-val">${dailyCost.toFixed(2)} RON</span>
              </div>
              <div class="cost-row small">
                <span></span>
                <span class="cost-note">${dailyGrid.toFixed(2)} kWh × ${costPerKwh} RON/kWh</span>
                <span class="cost-note">Total: ${this._s('total_cost') ? parseFloat(this._s('total_cost')!).toFixed(2) + ' RON' : '—'}</span>
              </div>
            </div>
          ` : nothing}

          <!-- DEVICE INFO -->
          ${this.config.show_device !== false ? html`
            <div class="device">
              <div class="device-item">
                <ha-icon icon="mdi:thermometer"></ha-icon>
                <span>${temp || '?'}°C</span>
              </div>
              <div class="device-item ${rssi < -75 ? 'weak' : rssi < -60 ? 'ok' : 'good'}">
                <ha-icon icon="mdi:wifi"></ha-icon>
                <span>${rssi} dBm</span>
              </div>
              <div class="device-item">
                <ha-icon icon=${isOnline ? 'mdi:cloud-check' : 'mdi:cloud-off-outline'}></ha-icon>
                <span>${isOnline ? 'Cloud' : 'Local'}</span>
              </div>
            </div>
          ` : nothing}
        </div>

        <div class="footer">
          <span>Update: ${this._changed('total_power')}</span>
        </div>
      </ha-card>
    `;
  }

  // ── Styles ───────────────────────────────────────────────────────────────
  static get styles(): CSSResultGroup {
    return css`
      :host { display: block; }
      ha-card {
        border-radius: 16px;
        overflow: hidden;
        background: var(--card-background-color, #1c1c1e);
      }

      /* Header */
      .header {
        display: flex; align-items: center; gap: 12px;
        padding: 18px 20px;
        border-bottom: 1px solid rgba(255,255,255,0.06);
      }
      .header.exporting { background: linear-gradient(135deg, rgba(34,197,94,0.08), rgba(234,179,8,0.06)); }
      .header.importing { background: linear-gradient(135deg, rgba(239,68,68,0.06), rgba(245,158,11,0.04)); }
      .header-icon { font-size: 28px; }
      .header-text { flex: 1; }
      .header-title { font-size: 16px; font-weight: 600; color: var(--primary-text-color); }
      .header-sub { font-size: 12px; color: var(--secondary-text-color); margin-top: 2px; }
      .power-badge {
        padding: 6px 14px; border-radius: 14px;
        font-size: 16px; font-weight: 700;
        letter-spacing: -0.5px;
      }
      .power-badge.export { background: rgba(34,197,94,0.15); color: #22c55e; }
      .power-badge.import { background: rgba(239,68,68,0.12); color: #ef4444; }

      .content { padding: 14px; }

      /* Flow Diagram */
      .flow {
        display: flex; align-items: center; justify-content: center;
        gap: 8px; margin-bottom: 16px; padding: 8px 0;
      }
      .flow-node {
        display: flex; flex-direction: column; align-items: center;
        gap: 4px; padding: 12px 14px; border-radius: 14px;
        min-width: 76px; transition: all 0.3s;
      }
      .flow-node ha-icon { --mdc-icon-size: 26px; }
      .flow-node.solar { background: rgba(234,179,8,0.08); border: 1px solid rgba(234,179,8,0.15); }
      .flow-node.solar.active { background: rgba(234,179,8,0.15); border-color: rgba(234,179,8,0.3); box-shadow: 0 0 12px rgba(234,179,8,0.15); }
      .flow-node.solar ha-icon { color: #eab308; }
      .flow-node.house { background: rgba(59,130,246,0.08); border: 1px solid rgba(59,130,246,0.15); }
      .flow-node.house ha-icon { color: #3b82f6; }
      .flow-node.grid { background: rgba(139,92,246,0.08); border: 1px solid rgba(139,92,246,0.15); }
      .flow-node.grid.active { background: rgba(139,92,246,0.15); border-color: rgba(139,92,246,0.3); }
      .flow-node.grid ha-icon { color: #8b5cf6; }
      .flow-val { font-size: 17px; font-weight: 700; color: var(--primary-text-color); }
      .flow-node small { font-size: 11px; color: var(--secondary-text-color); }

      .flow-arrow { display: flex; align-items: center; }
      .arrow-line {
        display: flex; align-items: center; padding: 4px 6px;
        border-radius: 8px; opacity: 0.3;
      }
      .arrow-line.export { color: #22c55e; opacity: 1; animation: flowPulse 2s infinite; }
      .arrow-line.import { color: #ef4444; opacity: 1; animation: flowPulse 2s infinite; }
      .arrow-line.idle { color: var(--secondary-text-color); }
      .arrow-line ha-icon { --mdc-icon-size: 20px; }
      @keyframes flowPulse { 0%,100% { opacity: 0.5; } 50% { opacity: 1; } }

      /* Phases */
      .phases-header {
        display: flex; align-items: center; justify-content: space-between;
        padding: 6px 4px; cursor: pointer; margin-bottom: 6px;
      }
      .phases-header:hover { opacity: 0.8; }
      .phases-title { font-size: 13px; font-weight: 600; color: var(--secondary-text-color); text-transform: uppercase; letter-spacing: 0.5px; }
      .phases-header ha-icon { --mdc-icon-size: 18px; color: var(--secondary-text-color); }

      .phases { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 14px; }
      .phase-card {
        padding: 10px; border-radius: 12px;
        background: rgba(255,255,255,0.025);
        border: 1px solid rgba(255,255,255,0.06);
        cursor: pointer; transition: all 0.2s;
      }
      .phase-card:hover { background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.12); }
      .phase-header { display: flex; align-items: center; gap: 6px; margin-bottom: 4px; }
      .phase-label {
        width: 22px; height: 22px; border-radius: 6px;
        display: flex; align-items: center; justify-content: center;
        font-size: 11px; font-weight: 700;
        background: rgba(59,130,246,0.15); color: #60a5fa;
      }
      .phase-name { flex: 1; font-size: 11px; color: var(--secondary-text-color); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .phase-power { font-size: 14px; font-weight: 700; white-space: nowrap; }
      .phase-power.export { color: #22c55e; }
      .phase-power.import { color: #ef4444; }

      .phase-details { display: grid; grid-template-columns: 1fr 1fr; gap: 3px 8px; margin-top: 8px; padding-top: 8px; border-top: 1px solid rgba(255,255,255,0.05); }
      .phase-detail { display: flex; align-items: center; gap: 4px; }
      .phase-detail ha-icon { --mdc-icon-size: 14px; color: var(--secondary-text-color); }
      .phase-detail span { font-size: 11px; color: var(--secondary-text-color); }

      .phase-energy { display: flex; justify-content: space-between; margin-top: 6px; padding-top: 6px; border-top: 1px solid rgba(255,255,255,0.04); }
      .phase-energy .energy-in, .phase-energy .energy-out { display: flex; align-items: center; gap: 3px; font-size: 10px; color: var(--secondary-text-color); }
      .phase-energy ha-icon { --mdc-icon-size: 12px; }
      .energy-in ha-icon { color: #ef4444; }
      .energy-out ha-icon { color: #22c55e; }

      /* Energy Section */
      .energy-section { margin-bottom: 12px; }
      .energy-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
      .energy-card {
        display: flex; align-items: center; gap: 10px;
        padding: 10px 12px; border-radius: 10px;
        cursor: pointer; transition: all 0.2s;
      }
      .energy-card:hover { opacity: 0.85; }
      .energy-card.consumed { background: rgba(239,68,68,0.06); border: 1px solid rgba(239,68,68,0.1); }
      .energy-card.consumed ha-icon { color: #ef4444; }
      .energy-card.returned { background: rgba(34,197,94,0.06); border: 1px solid rgba(34,197,94,0.1); }
      .energy-card.returned ha-icon { color: #22c55e; }
      .energy-card.total-in { background: rgba(245,158,11,0.06); border: 1px solid rgba(245,158,11,0.1); }
      .energy-card.total-in ha-icon { color: #f59e0b; }
      .energy-card.total-out { background: rgba(6,182,212,0.06); border: 1px solid rgba(6,182,212,0.1); }
      .energy-card.total-out ha-icon { color: #06b6d4; }
      .energy-card ha-icon { --mdc-icon-size: 20px; flex-shrink: 0; }
      .energy-info { display: flex; flex-direction: column; }
      .energy-label { font-size: 11px; color: var(--secondary-text-color); }
      .energy-val { font-size: 14px; font-weight: 700; color: var(--primary-text-color); }

      /* Costs */
      .costs {
        padding: 10px 14px; border-radius: 10px;
        background: rgba(34,197,94,0.05);
        border: 1px solid rgba(34,197,94,0.1);
        margin-bottom: 12px; cursor: pointer;
      }
      .costs:hover { background: rgba(34,197,94,0.08); }
      .cost-row { display: flex; align-items: center; gap: 8px; }
      .cost-row ha-icon { --mdc-icon-size: 18px; color: #22c55e; }
      .cost-row span:first-of-type { flex: 1; font-size: 13px; color: var(--secondary-text-color); }
      .cost-val { font-size: 16px; font-weight: 700; color: #22c55e; }
      .cost-row.small { margin-top: 4px; }
      .cost-row.small ha-icon { display: none; }
      .cost-note { font-size: 11px; color: var(--secondary-text-color); }

      /* Device */
      .device {
        display: flex; align-items: center; justify-content: center;
        gap: 16px; padding: 8px 0;
      }
      .device-item { display: flex; align-items: center; gap: 4px; }
      .device-item ha-icon { --mdc-icon-size: 14px; color: var(--secondary-text-color); }
      .device-item span { font-size: 11px; color: var(--secondary-text-color); }
      .device-item.good ha-icon { color: #22c55e; }
      .device-item.ok ha-icon { color: #f59e0b; }
      .device-item.weak ha-icon { color: #ef4444; }

      /* Footer */
      .footer {
        display: flex; justify-content: flex-end;
        padding: 8px 16px;
        border-top: 1px solid rgba(255,255,255,0.04);
        font-size: 11px; color: var(--secondary-text-color);
      }

      /* Responsive */
      @media (max-width: 420px) {
        .phases { grid-template-columns: 1fr; }
        .energy-grid { grid-template-columns: 1fr; }
        .flow { flex-wrap: wrap; }
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ha-shelly-smart-meter-card': ShellySmartMeterCard;
  }
}
