import { LitElement, html, css, CSSResultGroup, TemplateResult, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, LovelaceCardEditor, fireEvent } from 'custom-card-helpers';
import { Lang, detectLang, t } from './translations';

const CARD = 'ha-shelly-smart-meter-card';
const VERSION = '3.0.0';
console.info(
  `%c ⚡ SHELLY-SMART-METER-CARD %c v${VERSION} `,
  'color:#fff;background:#f59e0b;font-weight:700;border-radius:4px 0 0 4px;padding:2px 6px;',
  'color:#fff;background:#6b7280;font-weight:700;border-radius:0 4px 4px 0;padding:2px 6px;'
);

// ── Config ──────────────────────────────────────────────────────────────────
interface MeterConfig {
  type: string;
  title?: string;
  language?: string;
  show_header?: boolean;
  show_flow?: boolean;
  show_phases?: boolean;
  show_totals?: boolean;
  show_energy?: boolean;
  show_costs?: boolean;
  show_device?: boolean;
  show_controls?: boolean;
  cost_per_kwh?: number;
  cost_currency?: string;
  entities?: Record<string, string>;
  phase_labels?: Record<string, string>;
}

// ── Auto-discovery ─────────────────────────────────────────────────────────
const DISCOVER_SENSOR: Record<string, string> = {
  phase_a_power: '_phase_a_active_power', phase_a_apparent: '_phase_a_apparent_power',
  phase_a_voltage: '_phase_a_voltage', phase_a_current: '_phase_a_current',
  phase_a_pf: '_phase_a_power_factor', phase_a_freq: '_phase_a_frequency',
  phase_a_energy: '_phase_a_total_active_energy', phase_a_returned: '_phase_a_total_active_returned_energy',
  phase_b_power: '_phase_b_active_power', phase_b_apparent: '_phase_b_apparent_power',
  phase_b_voltage: '_phase_b_voltage', phase_b_current: '_phase_b_current',
  phase_b_pf: '_phase_b_power_factor', phase_b_freq: '_phase_b_frequency',
  phase_b_energy: '_phase_b_total_active_energy', phase_b_returned: '_phase_b_total_active_returned_energy',
  phase_c_power: '_phase_c_active_power', phase_c_apparent: '_phase_c_apparent_power',
  phase_c_voltage: '_phase_c_voltage', phase_c_current: '_phase_c_current',
  phase_c_pf: '_phase_c_power_factor', phase_c_freq: '_phase_c_frequency',
  phase_c_energy: '_phase_c_total_active_energy', phase_c_returned: '_phase_c_total_active_returned_energy',
  total_power: '_total_active_power', total_apparent: '_total_apparent_power',
  total_current: '_total_current', total_energy: '_total_active_energy',
  total_returned: '_total_active_returned_energy', total_cost: '_total_active_energy_cost',
  temperature: '_temperature', rssi: '_rssi', uptime: '_uptime',
};
const DISCOVER_BINARY: Record<string, string> = { cloud: '_cloud', restart_required: '_restart_required' };
const DISCOVER_UPDATE: Record<string, string> = { firmware: '_firmware_update', beta_firmware: '_beta_firmware_update' };
const DISCOVER_SWITCH: Record<string, string> = { ble_integration: '_aioshelly_ble_integration', monitor_production: '_monitor_production_js' };
const DISCOVER_BUTTON: Record<string, string> = { reboot: '_reboot' };

let _cache: Record<string, string> | null = null;
function discover(hass: HomeAssistant): Record<string, string> {
  if (_cache) return _cache;
  const ents = Object.keys(hass.states);
  const m = ents.find((e) => e.startsWith('sensor.') && e.endsWith('_phase_a_active_power'));
  if (!m) return {};
  const pfx = m.replace('sensor.', '').replace('_phase_a_active_power', '');
  const d: Record<string, string> = {};
  for (const [k, s] of Object.entries(DISCOVER_SENSOR)) { const id = `sensor.${pfx}${s}`; if (hass.states[id]) d[k] = id; }
  for (const [k, s] of Object.entries(DISCOVER_BINARY)) { const id = `binary_sensor.${pfx}${s}`; if (hass.states[id]) d[k] = id; }
  for (const [k, s] of Object.entries(DISCOVER_UPDATE)) { const id = `update.${pfx}${s}`; if (hass.states[id]) d[k] = id; }
  for (const [k, s] of Object.entries(DISCOVER_SWITCH)) { const id = `switch.${pfx}${s}`; if (hass.states[id]) d[k] = id; }
  for (const [k, s] of Object.entries(DISCOVER_BUTTON)) { const id = `button.${pfx}${s}`; if (hass.states[id]) d[k] = id; }
  const tid = `device_tracker.${pfx}`; if (hass.states[tid]) d.device_tracker = tid;
  _cache = d;
  return d;
}

// ── Card ────────────────────────────────────────────────────────────────────
@customElement(CARD)
export class ShellySmartMeterCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ attribute: false }) public config!: MeterConfig;
  @state() private _showPhaseDetails = false;
  @state() private _showTotals = false;

  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import('./editor/ha-shelly-smart-meter-editor');
    return document.createElement('ha-shelly-smart-meter-editor') as LovelaceCardEditor;
  }

  public static getStubConfig(): MeterConfig {
    return {
      type: CARD, title: '⚡ Smart Meter', show_header: true, show_flow: true,
      show_phases: true, show_totals: true, show_energy: true, show_costs: true,
      show_device: true, show_controls: false, cost_per_kwh: 0.85, cost_currency: 'RON',
      entities: {}, phase_labels: {},
    };
  }

  setConfig(config: MeterConfig): void {
    if (!config) throw new Error('Invalid config');
    _cache = null;
    this.config = {
      ...config, type: CARD,
      title: config.title || '⚡ Smart Meter',
      show_header: config.show_header ?? true, show_flow: config.show_flow ?? true,
      show_phases: config.show_phases ?? true, show_totals: config.show_totals ?? true,
      show_energy: config.show_energy ?? true, show_costs: config.show_costs ?? true,
      show_device: config.show_device ?? true, show_controls: config.show_controls ?? false,
      cost_per_kwh: config.cost_per_kwh ?? 0.85, cost_currency: config.cost_currency || 'RON',
      entities: config.entities || {}, phase_labels: config.phase_labels || {},
    };
  }

  private get L(): Lang { return detectLang(this.hass, this.config?.language); }

  private _r(k: string): string { return this.config.entities?.[k] || (this.hass ? discover(this.hass)[k] || '' : ''); }
  private _s(k: string): string | undefined { const e = this._r(k); return e ? this.hass?.states[e]?.state : undefined; }
  private _n(k: string): number { const v = parseFloat(this._s(k) || ''); return isNaN(v) ? 0 : v; }
  private _e(k: string): string { return this._r(k); }
  private _changed(k: string): string {
    const eid = this._r(k); if (!eid) return '';
    const s = this.hass?.states[eid]; if (!s?.last_changed) return '';
    const m = Math.floor((Date.now() - new Date(s.last_changed).getTime()) / 60000);
    if (m < 1) return 'acum'; if (m < 60) return `${m} min`;
    const h = Math.floor(m / 60); return h < 24 ? `${h}h ${m % 60}min` : `${Math.floor(h / 24)}d ${h % 24}h`;
  }
  private _more(eid: string) { if (eid) fireEvent(this, 'hass-more-info', { entityId: eid }); }
  private _fmt(v: number, d = 1): string { return Math.abs(v) >= 1000 ? (v / 1000).toFixed(d) + 'k' : v.toFixed(d); }
  private _fmtDate(iso: string): string {
    try {
      const diff = Date.now() - new Date(iso).getTime();
      const days = Math.floor(diff / 86400000); const hours = Math.floor((diff % 86400000) / 3600000);
      if (days > 0) return `${days}d ${hours}h`;
      return `${hours}h ${Math.floor((diff % 3600000) / 60000)}min`;
    } catch { return iso; }
  }

  getCardSize() { return 8; }

  protected render(): TemplateResult | typeof nothing {
    if (!this.config || !this.hass) return nothing;
    const L = this.L;
    const disc = discover(this.hass);
    const hasData = Object.keys(disc).length > 0 || Object.keys(this.config.entities || {}).length > 0;

    if (!hasData) {
      return html`<ha-card>
        <div class="header importing"><div class="header-icon">⚡</div>
          <div class="header-text"><div class="header-title">${t(L, 'no_device.title')}</div>
            <div class="header-sub">${t(L, 'no_device.msg')}</div></div></div>
        <div class="content"><div class="no-device">
          <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
          <p>${t(L, 'no_device.msg')}</p><p>${t(L, 'no_device.hint')}</p>
        </div></div></ha-card>`;
    }

    const totalPower = this._n('total_power');
    const isExp = totalPower < 0;
    const abs = Math.abs(Math.round(totalPower));
    const totalApp = this._n('total_apparent');
    const totalPF = totalApp > 0 ? (Math.abs(totalPower) / totalApp) : 0;
    const cur = this.config.cost_currency || 'RON';
    const cpk = this.config.cost_per_kwh || 0.85;
    const dailyGrid = this._n('daily_grid');
    const dailyCost = dailyGrid * cpk;
    const temp = this._s('temperature');
    const rssi = this._n('rssi');
    const uptime = this._s('uptime');
    const isOnline = this._s('cloud') === 'on';
    const restartNeeded = this._s('restart_required') === 'on';
    const hasUpdate = this._s('firmware') === 'on';
    const hasBeta = this._s('beta_firmware') === 'on';
    const isHome = this._s('device_tracker') === 'home';
    const bleOn = this._s('ble_integration') === 'on';
    const monOn = this._s('monitor_production') === 'on';

    const phases = (['a', 'b', 'c'] as const).map((p) => ({
      key: p.toUpperCase(),
      label: this.config.phase_labels?.[p.toUpperCase()] || t(L, `phase.${p.toUpperCase()}`),
      power: this._n(`phase_${p}_power`), apparent: this._n(`phase_${p}_apparent`),
      voltage: this._n(`phase_${p}_voltage`), current: this._n(`phase_${p}_current`),
      pf: this._n(`phase_${p}_pf`), freq: this._n(`phase_${p}_freq`),
      energy: this._n(`phase_${p}_energy`), returned: this._n(`phase_${p}_returned`),
    }));

    const statusText = isExp
      ? t(L, 'status.export', { power: abs })
      : totalPower > 50
        ? t(L, 'status.import', { power: abs })
        : t(L, 'status.balanced');

    return html`
      <ha-card>
        ${this.config.show_header !== false ? html`
          <div class="header ${isExp ? 'exporting' : 'importing'}">
            <div class="header-icon">⚡</div>
            <div class="header-text">
              <div class="header-title">${this.config.title}</div>
              <div class="header-sub">${statusText}
                ${restartNeeded ? ` · ⚠️ ${t(L, 'status.restart')}` : ''}
                ${hasUpdate ? ` · 🔄 ${t(L, 'status.update')}` : ''}
              </div>
            </div>
            <div class="power-badge ${isExp ? 'export' : 'import'}">${isExp ? '↗' : '↙'} ${abs}W</div>
          </div>` : nothing}

        <div class="content">
          ${this.config.show_flow !== false ? html`
          <div class="flow">
            <div class="flow-node solar ${isExp ? 'active' : ''}">
              <ha-icon icon="mdi:solar-power-variant"></ha-icon>
              <span class="flow-val">${isExp ? abs : 0}W</span>
              <small>${t(L, 'flow.solar')}</small>
            </div>
            <div class="flow-arrow"><div class="arrow-line ${isExp ? 'export' : totalPower > 50 ? 'import' : 'idle'}">
              <ha-icon icon=${isExp ? 'mdi:arrow-right-bold' : totalPower > 50 ? 'mdi:arrow-left-bold' : 'mdi:swap-horizontal'}></ha-icon></div></div>
            <div class="flow-node house">
              <ha-icon icon="mdi:home-lightning-bolt"></ha-icon>
              <span class="flow-val">${Math.round(totalApp || abs)}W</span>
              <small>${t(L, 'flow.house')}</small>
            </div>
            <div class="flow-arrow"><div class="arrow-line ${!isExp && totalPower > 50 ? 'import' : isExp ? 'export' : 'idle'}">
              <ha-icon icon=${!isExp && totalPower > 50 ? 'mdi:arrow-left-bold' : 'mdi:arrow-right-bold'}></ha-icon></div></div>
            <div class="flow-node grid ${!isExp && totalPower > 50 ? 'active' : ''}">
              <ha-icon icon="mdi:transmission-tower"></ha-icon>
              <span class="flow-val">${!isExp && totalPower > 50 ? abs : isExp ? abs : 0}W</span>
              <small>${t(L, 'flow.grid')}</small>
            </div>
          </div>` : nothing}

          ${this.config.show_phases !== false ? html`
          <div class="sh" @click=${() => { this._showPhaseDetails = !this._showPhaseDetails; }}>
            <span class="st">⚡ ${t(L, 'section.phases')}</span>
            <ha-icon .icon=${this._showPhaseDetails ? 'mdi:chevron-up' : 'mdi:chevron-down'}></ha-icon>
          </div>
          <div class="phases">${phases.map((p) => {
            const pw = Math.round(p.power); const exp = pw < 0;
            return html`<div class="pc" @click=${() => this._more(this._e(`phase_${p.key.toLowerCase()}_power`))}>
              <div class="ph"><span class="pl">${p.key}</span><span class="pn">${p.label}</span>
                <span class="pp ${exp ? 'export' : 'import'}">${exp ? '↗' : '↙'} ${Math.abs(pw)}W</span></div>
              ${this._showPhaseDetails ? html`
                <div class="pd">
                  <div class="di"><ha-icon icon="mdi:flash"></ha-icon><span>${p.voltage.toFixed(1)}V</span></div>
                  <div class="di"><ha-icon icon="mdi:current-ac"></ha-icon><span>${p.current.toFixed(2)}A</span></div>
                  <div class="di"><ha-icon icon="mdi:cosine-wave"></ha-icon><span>${t(L, 'phase.pf')} ${p.pf.toFixed(2)}</span></div>
                  <div class="di"><ha-icon icon="mdi:sine-wave"></ha-icon><span>${p.freq.toFixed(1)}Hz</span></div>
                  <div class="di"><ha-icon icon="mdi:lightning-bolt"></ha-icon><span>${Math.round(p.apparent)}VA</span></div>
                  <div class="di"><ha-icon icon="mdi:counter"></ha-icon><span>${(p.pf * 100).toFixed(0)}%</span></div>
                </div>
                <div class="pe">
                  <span class="ein"><ha-icon icon="mdi:transmission-tower-import"></ha-icon>${p.energy.toFixed(1)} kWh</span>
                  <span class="eout"><ha-icon icon="mdi:transmission-tower-export"></ha-icon>${p.returned.toFixed(1)} kWh</span>
                </div>` : nothing}
            </div>`;
          })}</div>` : nothing}

          ${this.config.show_totals !== false ? html`
          <div class="sh" @click=${() => { this._showTotals = !this._showTotals; }}>
            <span class="st">📊 ${t(L, 'section.totals')}</span>
            <ha-icon .icon=${this._showTotals ? 'mdi:chevron-up' : 'mdi:chevron-down'}></ha-icon>
          </div>
          ${this._showTotals ? html`
          <div class="tg">
            <div class="ti" @click=${() => this._more(this._e('total_power'))}><ha-icon icon="mdi:flash"></ha-icon><span class="tl">${t(L, 'total.active_power')}</span><span class="tv">${this._fmt(totalPower)}W</span></div>
            <div class="ti" @click=${() => this._more(this._e('total_apparent'))}><ha-icon icon="mdi:lightning-bolt"></ha-icon><span class="tl">${t(L, 'total.apparent_power')}</span><span class="tv">${this._fmt(totalApp)}VA</span></div>
            <div class="ti" @click=${() => this._more(this._e('total_current'))}><ha-icon icon="mdi:current-ac"></ha-icon><span class="tl">${t(L, 'total.current')}</span><span class="tv">${this._n('total_current').toFixed(2)}A</span></div>
            <div class="ti"><ha-icon icon="mdi:cosine-wave"></ha-icon><span class="tl">${t(L, 'total.power_factor')}</span><span class="tv">${totalPF.toFixed(2)}</span></div>
            <div class="ti" @click=${() => this._more(this._e('total_energy'))}><ha-icon icon="mdi:meter-electric"></ha-icon><span class="tl">${t(L, 'total.energy_in')}</span><span class="tv">${this._fmt(this._n('total_energy'))} kWh</span></div>
            <div class="ti" @click=${() => this._more(this._e('total_returned'))}><ha-icon icon="mdi:flash-outline"></ha-icon><span class="tl">${t(L, 'total.energy_out')}</span><span class="tv">${this._fmt(this._n('total_returned'))} kWh</span></div>
            <div class="ti" @click=${() => this._more(this._e('total_cost'))}><ha-icon icon="mdi:cash"></ha-icon><span class="tl">${t(L, 'total.cost')}</span><span class="tv">${this._n('total_cost').toFixed(2)} ${cur}</span></div>
          </div>` : nothing}` : nothing}

          ${this.config.show_energy !== false && (this._e('daily_consumed') || this._e('daily_return') || this._e('daily_grid')) ? html`
          <div class="sh"><span class="st">📈 ${t(L, 'section.daily')}</span></div>
          <div class="eg">
            ${this._e('daily_consumed') ? html`<div class="ec consumed" @click=${() => this._more(this._e('daily_consumed'))}><ha-icon icon="mdi:counter"></ha-icon><div class="ei"><span class="el">${t(L, 'daily.house')}</span><span class="ev">${this._n('daily_consumed').toFixed(2)} kWh</span></div></div>` : nothing}
            ${this._e('daily_grid') ? html`<div class="ec grid-in" @click=${() => this._more(this._e('daily_grid'))}><ha-icon icon="mdi:transmission-tower-import"></ha-icon><div class="ei"><span class="el">${t(L, 'daily.grid_import')}</span><span class="ev">${dailyGrid.toFixed(2)} kWh</span></div></div>` : nothing}
            ${this._e('daily_return') ? html`<div class="ec returned" @click=${() => this._more(this._e('daily_return'))}><ha-icon icon="mdi:solar-power"></ha-icon><div class="ei"><span class="el">${t(L, 'daily.grid_export')}</span><span class="ev">${this._n('daily_return').toFixed(2)} kWh</span></div></div>` : nothing}
            ${this._e('daily_hp') ? html`<div class="ec hp" @click=${() => this._more(this._e('daily_hp'))}><ha-icon icon="mdi:heat-pump"></ha-icon><div class="ei"><span class="el">${t(L, 'daily.heat_pump')}</span><span class="ev">${this._n('daily_hp').toFixed(2)} kWh</span></div></div>` : nothing}
          </div>` : nothing}

          ${this.config.show_costs !== false && this._e('daily_grid') ? html`
          <div class="sh"><span class="st">💰 ${t(L, 'section.costs')}</span></div>
          <div class="costs">
            <div class="cr"><ha-icon icon="mdi:cash"></ha-icon><span>${t(L, 'cost.daily')}</span><span class="cv">${dailyCost.toFixed(2)} ${cur}</span></div>
            <div class="cr small"><span></span><span class="cn">${t(L, 'cost.rate', { kwh: dailyGrid.toFixed(2), rate: `${cpk} ${cur}` })}</span>
              ${this._n('total_cost') ? html`<span class="cn">${t(L, 'total.cost')}: ${this._n('total_cost').toFixed(2)} ${cur}</span>` : nothing}</div>
          </div>` : nothing}

          ${this.config.show_device !== false ? html`
          <div class="sh"><span class="st">📡 ${t(L, 'section.device')}</span></div>
          <div class="dg">
            ${temp ? html`<div class="dv"><ha-icon icon="mdi:thermometer"></ha-icon><span>${temp}°C</span></div>` : nothing}
            ${rssi ? html`<div class="dv ${rssi < -75 ? 'weak' : rssi < -60 ? 'ok' : 'good'}"><ha-icon icon="mdi:wifi"></ha-icon><span>${rssi} dBm</span></div>` : nothing}
            ${this._e('cloud') ? html`<div class="dv"><ha-icon icon=${isOnline ? 'mdi:cloud-check' : 'mdi:cloud-off-outline'}></ha-icon><span>${isOnline ? t(L, 'device.cloud') : t(L, 'device.local')}</span></div>` : nothing}
            ${this._e('device_tracker') ? html`<div class="dv ${isHome ? 'good' : 'weak'}"><ha-icon icon=${isHome ? 'mdi:access-point-network' : 'mdi:access-point-off'}></ha-icon><span>${isHome ? t(L, 'device.online') : t(L, 'device.offline')}</span></div>` : nothing}
            ${uptime ? html`<div class="dv"><ha-icon icon="mdi:clock-outline"></ha-icon><span>${t(L, 'device.uptime')}: ${this._fmtDate(uptime)}</span></div>` : nothing}
            ${restartNeeded ? html`<div class="dv warn"><ha-icon icon="mdi:alert"></ha-icon><span>${t(L, 'device.restart_needed')}</span></div>` : nothing}
            ${hasUpdate ? html`<div class="dv warn"><ha-icon icon="mdi:update"></ha-icon><span>${t(L, 'device.update_avail')}</span></div>` : nothing}
            ${hasBeta ? html`<div class="dv"><ha-icon icon="mdi:test-tube"></ha-icon><span>${t(L, 'device.beta_update')}</span></div>` : nothing}
          </div>` : nothing}

          ${this.config.show_controls ? html`
          <div class="sh"><span class="st">🎮 ${t(L, 'section.control')}</span></div>
          <div class="ct">
            ${this._e('reboot') ? html`<div class="ctrl" @click=${() => this._more(this._e('reboot'))}><ha-icon icon="mdi:restart"></ha-icon><span>${t(L, 'ctrl.reboot')}</span></div>` : nothing}
            ${this._e('ble_integration') ? html`<div class="ctrl ${bleOn ? 'on' : ''}" @click=${() => this._more(this._e('ble_integration'))}><ha-icon icon="mdi:bluetooth"></ha-icon><span>${t(L, 'ctrl.ble')}: ${bleOn ? t(L, 'ctrl.on') : t(L, 'ctrl.off')}</span></div>` : nothing}
            ${this._e('monitor_production') ? html`<div class="ctrl ${monOn ? 'on' : ''}" @click=${() => this._more(this._e('monitor_production'))}><ha-icon icon="mdi:script-text"></ha-icon><span>${t(L, 'ctrl.monitor')}: ${monOn ? t(L, 'ctrl.on') : t(L, 'ctrl.off')}</span></div>` : nothing}
          </div>` : nothing}
        </div>

        <div class="footer"><span>${t(L, 'footer.update')} ${this._changed('total_power')}</span></div>
      </ha-card>`;
  }

  static get styles(): CSSResultGroup {
    return css`
      :host { display: block; }
      ha-card { border-radius: 16px; overflow: hidden; background: var(--card-background-color, #1c1c1e); }
      .header { display: flex; align-items: center; gap: 12px; padding: 18px 20px; border-bottom: 1px solid rgba(255,255,255,0.06); }
      .header.exporting { background: linear-gradient(135deg, rgba(34,197,94,0.08), rgba(234,179,8,0.06)); }
      .header.importing { background: linear-gradient(135deg, rgba(239,68,68,0.06), rgba(245,158,11,0.04)); }
      .header-icon { font-size: 28px; }
      .header-text { flex: 1; }
      .header-title { font-size: 16px; font-weight: 600; color: var(--primary-text-color); }
      .header-sub { font-size: 12px; color: var(--secondary-text-color); margin-top: 2px; }
      .power-badge { padding: 6px 14px; border-radius: 14px; font-size: 16px; font-weight: 700; }
      .power-badge.export { background: rgba(34,197,94,0.15); color: #22c55e; }
      .power-badge.import { background: rgba(239,68,68,0.12); color: #ef4444; }
      .content { padding: 14px; }
      .no-device { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 24px 16px; text-align: center; }
      .no-device ha-icon { --mdc-icon-size: 40px; color: var(--secondary-text-color); }
      .no-device p { margin: 0; font-size: 13px; color: var(--secondary-text-color); }
      .flow { display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 16px; padding: 8px 0; }
      .flow-node { display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 12px 14px; border-radius: 14px; min-width: 76px; transition: all 0.3s; }
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
      .arrow-line { display: flex; align-items: center; padding: 4px 6px; border-radius: 8px; opacity: 0.3; }
      .arrow-line.export { color: #22c55e; opacity: 1; animation: fp 2s infinite; }
      .arrow-line.import { color: #ef4444; opacity: 1; animation: fp 2s infinite; }
      .arrow-line.idle { color: var(--secondary-text-color); }
      .arrow-line ha-icon { --mdc-icon-size: 20px; }
      @keyframes fp { 0%,100% { opacity: 0.5; } 50% { opacity: 1; } }
      .sh { display: flex; align-items: center; justify-content: space-between; padding: 6px 4px; cursor: pointer; margin-bottom: 6px; }
      .sh:hover { opacity: 0.8; }
      .st { font-size: 13px; font-weight: 600; color: var(--secondary-text-color); text-transform: uppercase; letter-spacing: 0.5px; }
      .sh ha-icon { --mdc-icon-size: 18px; color: var(--secondary-text-color); }
      .phases { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 14px; }
      .pc { padding: 10px; border-radius: 12px; background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.06); cursor: pointer; transition: all 0.2s; }
      .pc:hover { background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.12); }
      .ph { display: flex; align-items: center; gap: 6px; margin-bottom: 4px; }
      .pl { width: 22px; height: 22px; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; background: rgba(59,130,246,0.15); color: #60a5fa; }
      .pn { flex: 1; font-size: 11px; color: var(--secondary-text-color); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .pp { font-size: 14px; font-weight: 700; white-space: nowrap; }
      .pp.export { color: #22c55e; }
      .pp.import { color: #ef4444; }
      .pd { display: grid; grid-template-columns: 1fr 1fr; gap: 3px 8px; margin-top: 8px; padding-top: 8px; border-top: 1px solid rgba(255,255,255,0.05); }
      .di { display: flex; align-items: center; gap: 4px; }
      .di ha-icon { --mdc-icon-size: 14px; color: var(--secondary-text-color); }
      .di span { font-size: 11px; color: var(--secondary-text-color); }
      .pe { display: flex; justify-content: space-between; margin-top: 6px; padding-top: 6px; border-top: 1px solid rgba(255,255,255,0.04); }
      .ein, .eout { display: flex; align-items: center; gap: 3px; font-size: 10px; color: var(--secondary-text-color); }
      .pe ha-icon { --mdc-icon-size: 12px; }
      .ein ha-icon { color: #ef4444; }
      .eout ha-icon { color: #22c55e; }
      .tg { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 14px; }
      .ti { display: flex; align-items: center; gap: 8px; padding: 8px 10px; border-radius: 8px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.04); cursor: pointer; }
      .ti:hover { background: rgba(255,255,255,0.05); }
      .ti ha-icon { --mdc-icon-size: 16px; color: var(--secondary-text-color); flex-shrink: 0; }
      .tl { flex: 1; font-size: 11px; color: var(--secondary-text-color); }
      .tv { font-size: 13px; font-weight: 600; color: var(--primary-text-color); }
      .eg { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 14px; }
      .ec { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 10px; cursor: pointer; }
      .ec:hover { opacity: 0.85; }
      .ec.consumed { background: rgba(239,68,68,0.06); border: 1px solid rgba(239,68,68,0.1); }
      .ec.consumed ha-icon { color: #ef4444; }
      .ec.grid-in { background: rgba(245,158,11,0.06); border: 1px solid rgba(245,158,11,0.1); }
      .ec.grid-in ha-icon { color: #f59e0b; }
      .ec.returned { background: rgba(34,197,94,0.06); border: 1px solid rgba(34,197,94,0.1); }
      .ec.returned ha-icon { color: #22c55e; }
      .ec.hp { background: rgba(6,182,212,0.06); border: 1px solid rgba(6,182,212,0.1); }
      .ec.hp ha-icon { color: #06b6d4; }
      .ec ha-icon { --mdc-icon-size: 20px; flex-shrink: 0; }
      .ei { display: flex; flex-direction: column; }
      .el { font-size: 11px; color: var(--secondary-text-color); }
      .ev { font-size: 14px; font-weight: 700; color: var(--primary-text-color); }
      .costs { padding: 10px 14px; border-radius: 10px; background: rgba(34,197,94,0.05); border: 1px solid rgba(34,197,94,0.1); margin-bottom: 14px; cursor: pointer; }
      .costs:hover { background: rgba(34,197,94,0.08); }
      .cr { display: flex; align-items: center; gap: 8px; }
      .cr ha-icon { --mdc-icon-size: 18px; color: #22c55e; }
      .cr span:first-of-type { flex: 1; font-size: 13px; color: var(--secondary-text-color); }
      .cv { font-size: 16px; font-weight: 700; color: #22c55e; }
      .cr.small { margin-top: 4px; }
      .cr.small ha-icon { display: none; }
      .cn { font-size: 11px; color: var(--secondary-text-color); }
      .dg { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 14px; }
      .dv { display: flex; align-items: center; gap: 4px; padding: 4px 10px; border-radius: 8px; background: rgba(255,255,255,0.03); }
      .dv ha-icon { --mdc-icon-size: 14px; color: var(--secondary-text-color); }
      .dv span { font-size: 11px; color: var(--secondary-text-color); }
      .dv.good ha-icon { color: #22c55e; }
      .dv.ok ha-icon { color: #f59e0b; }
      .dv.weak ha-icon { color: #ef4444; }
      .dv.warn { background: rgba(245,158,11,0.08); }
      .dv.warn ha-icon { color: #f59e0b; }
      .dv.warn span { color: #f59e0b; }
      .ct { display: flex; gap: 8px; margin-bottom: 14px; }
      .ctrl { display: flex; align-items: center; gap: 6px; padding: 8px 14px; border-radius: 10px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); cursor: pointer; }
      .ctrl:hover { background: rgba(255,255,255,0.08); }
      .ctrl.on { border-color: rgba(34,197,94,0.3); }
      .ctrl ha-icon { --mdc-icon-size: 18px; color: var(--secondary-text-color); }
      .ctrl span { font-size: 12px; color: var(--secondary-text-color); }
      .footer { display: flex; justify-content: flex-end; padding: 8px 16px; border-top: 1px solid rgba(255,255,255,0.04); font-size: 11px; color: var(--secondary-text-color); }
      @media (max-width: 420px) { .phases { grid-template-columns: 1fr; } .eg, .tg { grid-template-columns: 1fr; } .flow { flex-wrap: wrap; } }
    `;
  }
}

declare global { interface HTMLElementTagNameMap { 'ha-shelly-smart-meter-card': ShellySmartMeterCard; } }
