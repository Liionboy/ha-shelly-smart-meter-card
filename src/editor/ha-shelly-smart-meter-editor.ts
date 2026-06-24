import { LitElement, html, css, TemplateResult, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, fireEvent } from 'custom-card-helpers';

@customElement('ha-shelly-smart-meter-editor')
export class ShellySmartMeterEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ attribute: false }) public config!: Record<string, unknown>;
  @state() private _config!: Record<string, unknown>;
  @state() private _section = 'general';

  public setConfig(config: Record<string, unknown>): void { this._config = { ...config }; }

  private _u(key: string, value: unknown) {
    this._config = { ...this._config, [key]: value };
    fireEvent(this, 'config-changed', { config: this._config });
  }
  private _ue(key: string, value: string) {
    const ents = { ...((this._config.entities as Record<string, string>) || {}) };
    value ? (ents[key] = value) : delete ents[key];
    this._u('entities', ents);
  }
  private _ul(key: string, value: string) {
    const labels = { ...((this._config.phase_labels as Record<string, string>) || {}) };
    labels[key] = value;
    this._u('phase_labels', labels);
  }
  private _getDeviceHint(): string {
    if (!this.hass) return '';
    const m = Object.keys(this.hass.states).find((e) => e.startsWith('sensor.') && e.endsWith('_phase_a_active_power'));
    return m ? m.replace('sensor.', '').replace('_phase_a_active_power','') : '';
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) return nothing;
    const hint = this._getDeviceHint();
    const ents = (this._config.entities as Record<string, string>) || {};

    const tabs = [
      { k: 'general', l: 'General', i: 'mdi:cog' },
      { k: 'phases', l: 'Faze', i: 'mdi:flash' },
      { k: 'totals', l: 'Totaluri', i: 'mdi:counter' },
      { k: 'energy', l: 'Energie', i: 'mdi:solar-power' },
      { k: 'device', l: 'Device', i: 'mdi:chip' },
    ];

    return html`
      <div class="tabs">${tabs.map((t) => html`
        <div class="tab ${this._section === t.k ? 'active' : ''}" @click=${() => { this._section = t.k; }}>
          <ha-icon .icon=${t.i}></ha-icon><span>${t.l}</span>
        </div>`)}</div>

      ${hint ? html`<div class="hint ok"><ha-icon icon="mdi:magnify"></ha-icon><span>Device detectat: <strong>${hint}</strong></span></div>`
        : html`<div class="hint warn"><ha-icon icon="mdi:alert"></ha-icon><span>Nu s-a detectat un Shelly Pro 3EM. Completează manual.</span></div>`}

      <div class="cfg">
        ${this._section === 'general' ? html`
          <ha-textfield label="Titlu" .value=${(this._config.title as string) || ''} @input=${(e: Event) => this._u('title', (e.target as HTMLInputElement).value)}></ha-textfield>
          ${[
            ['show_header', 'Header'], ['show_flow', 'Flow Diagram'], ['show_phases', 'Faze'],
            ['show_totals', 'Totaluri detaliate'], ['show_energy', 'Energie zilnică'],
            ['show_costs', 'Costuri'], ['show_device', 'Device Info'], ['show_controls', 'Control (reboot, BLE)'],
          ].map(([k, l]) => html`
            <div class="row"><ha-switch .checked=${this._config[k] !== false && k !== 'show_controls' ? true : !!this._config[k]} @change=${(e: Event) => this._u(k, (e.target as HTMLInputElement).checked)}></ha-switch><span>${l}</span></div>
          `)}
          <ha-textfield label="Cost kWh (RON)" type="number" .value=${String(this._config.cost_per_kwh || 0.85)} @input=${(e: Event) => this._u('cost_per_kwh', parseFloat((e.target as HTMLInputElement).value))}></ha-textfield>
        ` : nothing}

        ${this._section === 'phases' ? html`
          <div class="st">Etichete faze</div>
          ${['A', 'B', 'C'].map((k) => html`<ha-textfield label="Faza ${k}" .value=${((this._config.phase_labels as Record<string, string>) || {})[k] || ''} @input=${(e: Event) => this._ul(k, (e.target as HTMLInputElement).value)}></ha-textfield>`)}
          <div class="st">Entități per fază <span class="h">(lasă gol = auto)</span></div>
          ${['a', 'b', 'c'].flatMap((p) => [
            `phase_${p}_power`, `phase_${p}_apparent`, `phase_${p}_voltage`, `phase_${p}_current`,
            `phase_${p}_pf`, `phase_${p}_freq`, `phase_${p}_energy`, `phase_${p}_returned`,
          ]).map((k) => html`<ha-textfield label=${k} .value=${ents[k] || ''} placeholder="auto" @input=${(e: Event) => this._ue(k, (e.target as HTMLInputElement).value)}></ha-textfield>`)}
        ` : nothing}

        ${this._section === 'totals' ? html`
          <div class="st">Totaluri Shelly</div>
          ${['total_power', 'total_apparent', 'total_current', 'total_energy', 'total_returned', 'total_cost'].map((k) => html`
            <ha-textfield label=${k} .value=${ents[k] || ''} placeholder="auto" @input=${(e: Event) => this._ue(k, (e.target as HTMLInputElement).value)}></ha-textfield>`)}
        ` : nothing}

        ${this._section === 'energy' ? html`
          <div class="st">Contoare zilnice <span class="h">(helper entities)</span></div>
          ${['daily_consumed', 'daily_grid', 'daily_return', 'daily_hp'].map((k) => html`
            <ha-textfield label=${k} .value=${ents[k] || ''} placeholder="opțional" @input=${(e: Event) => this._ue(k, (e.target as HTMLInputElement).value)}></ha-textfield>`)}
        ` : nothing}

        ${this._section === 'device' ? html`
          <div class="st">Device Info <span class="h">(auto)</span></div>
          ${['temperature', 'rssi', 'uptime', 'cloud', 'restart_required', 'firmware', 'beta_firmware', 'device_tracker'].map((k) => html`
            <ha-textfield label=${k} .value=${ents[k] || ''} placeholder="auto" @input=${(e: Event) => this._ue(k, (e.target as HTMLInputElement).value)}></ha-textfield>`)}
          <div class="st">Control <span class="h">(auto)</span></div>
          ${['reboot', 'ble_integration', 'monitor_production'].map((k) => html`
            <ha-textfield label=${k} .value=${ents[k] || ''} placeholder="auto" @input=${(e: Event) => this._ue(k, (e.target as HTMLInputElement).value)}></ha-textfield>`)}
        ` : nothing}
      </div>
    `;
  }

  static get styles() { return css`
    .tabs { display: flex; gap: 4px; margin-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 8px; flex-wrap: wrap; }
    .tab { display: flex; align-items: center; gap: 4px; padding: 6px 12px; border-radius: 8px; cursor: pointer; font-size: 13px; color: var(--secondary-text-color); transition: all 0.2s; }
    .tab:hover { background: rgba(255,255,255,0.05); }
    .tab.active { background: rgba(59,130,246,0.15); color: #60a5fa; }
    .tab ha-icon { --mdc-icon-size: 16px; }
    .cfg { display: flex; flex-direction: column; gap: 12px; padding: 4px 0; }
    .st { font-size: 14px; font-weight: 600; color: var(--primary-text-color); margin-top: 8px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 4px; }
    .st .h { font-size: 11px; font-weight: 400; color: var(--secondary-text-color); }
    .row { display: flex; align-items: center; gap: 12px; }
    .row span { font-size: 14px; color: var(--primary-text-color); }
    ha-textfield { width: 100%; }
    .hint { display: flex; align-items: center; gap: 8px; padding: 8px 12px; border-radius: 8px; font-size: 12px; margin-bottom: 8px; }
    .hint.ok { background: rgba(34,197,94,0.08); color: #22c55e; }
    .hint.warn { background: rgba(245,158,11,0.08); color: #f59e0b; }
    .hint ha-icon { --mdc-icon-size: 16px; flex-shrink: 0; }
  `; }
}

declare global { interface HTMLElementTagNameMap { 'ha-shelly-smart-meter-editor': ShellySmartMeterEditor; } }
