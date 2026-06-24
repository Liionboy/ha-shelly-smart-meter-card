import { LitElement, html, css, TemplateResult, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, fireEvent } from 'custom-card-helpers';
import { Lang, detectLang, t, translations } from '../translations';

const LANGUAGES = Object.keys(translations).map((k) => ({ code: k, name: {
  en: 'English', ro: 'Română', de: 'Deutsch', fr: 'Français',
  es: 'Español', it: 'Italiano', pl: 'Polski', hu: 'Magyar',
}[k] || k }));

@customElement('ha-shelly-smart-meter-editor')
export class ShellySmartMeterEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ attribute: false }) public config!: Record<string, unknown>;
  @state() private _config!: Record<string, unknown>;
  @state() private _section = 'general';

  public setConfig(config: Record<string, unknown>): void { this._config = { ...config }; }

  private _u(k: string, v: unknown) {
    this._config = { ...this._config, [k]: v };
    fireEvent(this, 'config-changed', { config: this._config });
  }
  private _ue(k: string, v: string) {
    const e = { ...((this._config.entities as Record<string, string>) || {}) };
    v ? (e[k] = v) : delete e[k];
    this._u('entities', e);
  }
  private _ul(k: string, v: string) {
    const l = { ...((this._config.phase_labels as Record<string, string>) || {}) };
    l[k] = v;
    this._u('phase_labels', l);
  }
  private _hint(): string {
    if (!this.hass) return '';
    const m = Object.keys(this.hass.states).find((e) => e.startsWith('sensor.') && e.endsWith('_phase_a_active_power'));
    return m ? m.replace('sensor.', '').replace('_phase_a_active_power','') : '';
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) return nothing;
    const hint = this._hint();
    const ents = (this._config.entities as Record<string, string>) || {};
    const curLang = detectLang(this.hass, this._config.language as string);

    const tabs = [
      { k: 'general', l: 'General', i: 'mdi:cog' },
      { k: 'phases', l: t(curLang, 'section.phases'), i: 'mdi:flash' },
      { k: 'totals', l: t(curLang, 'section.totals'), i: 'mdi:counter' },
      { k: 'energy', l: t(curLang, 'section.daily'), i: 'mdi:solar-power' },
      { k: 'device', l: t(curLang, 'section.device'), i: 'mdi:chip' },
    ];

    return html`
      <div class="tabs">${tabs.map((tab) => html`
        <div class="tab ${this._section === tab.k ? 'active' : ''}" @click=${() => { this._section = tab.k; }}>
          <ha-icon .icon=${tab.i}></ha-icon><span>${tab.l}</span>
        </div>`)}</div>

      ${hint ? html`<div class="hint ok"><ha-icon icon="mdi:magnify"></ha-icon><span>Device: <strong>${hint}</strong></span></div>`
        : html`<div class="hint warn"><ha-icon icon="mdi:alert"></ha-icon><span>No Shelly Pro 3EM detected. Fill entities manually.</span></div>`}

      <div class="cfg">
        ${this._section === 'general' ? html`
          <ha-textfield label="Title" .value=${(this._config.title as string) || ''} @input=${(e: Event) => this._u('title', (e.target as HTMLInputElement).value)}></ha-textfield>

          <div class="sf">
            <span class="sl">Language</span>
            <select @change=${(e: Event) => this._u('language', (e.target as HTMLSelectElement).value)}>
              <option value="">Auto (${curLang})</option>
              ${LANGUAGES.map((l) => html`<option value=${l.code} .selected=${this._config.language === l.code}>${l.name}</option>`)}
            </select>
          </div>

          ${[
            ['show_header', 'Header'], ['show_flow', 'Flow Diagram'],
            ['show_phases', t(curLang, 'section.phases')], ['show_totals', t(curLang, 'section.totals')],
            ['show_energy', t(curLang, 'section.daily')], ['show_costs', t(curLang, 'section.costs')],
            ['show_device', t(curLang, 'section.device')], ['show_controls', t(curLang, 'section.control')],
          ].map(([k, l]) => html`
            <div class="row"><ha-switch .checked=${k === 'show_controls' ? !!this._config[k] : this._config[k] !== false} @change=${(e: Event) => this._u(k, (e.target as HTMLInputElement).checked)}></ha-switch><span>${l}</span></div>
          `)}

          <ha-textfield label="Cost per kWh" type="number" .value=${String(this._config.cost_per_kwh || 0.85)} @input=${(e: Event) => this._u('cost_per_kwh', parseFloat((e.target as HTMLInputElement).value))}></ha-textfield>
          <ha-textfield label="Currency" .value=${(this._config.cost_currency as string) || 'RON'} @input=${(e: Event) => this._u('cost_currency', (e.target as HTMLInputElement).value)}></ha-textfield>
        ` : nothing}

        ${this._section === 'phases' ? html`
          <div class="st">${t(curLang, 'section.phases')} labels</div>
          ${['A', 'B', 'C'].map((k) => html`<ha-textfield label="Phase ${k}" .value=${((this._config.phase_labels as Record<string, string>) || {})[k] || ''} @input=${(e: Event) => this._ul(k, (e.target as HTMLInputElement).value)}></ha-textfield>`)}
          <div class="st">Entities <span class="h">(leave empty = auto-discovery)</span></div>
          ${['a', 'b', 'c'].flatMap((p) => [
            `phase_${p}_power`, `phase_${p}_apparent`, `phase_${p}_voltage`, `phase_${p}_current`,
            `phase_${p}_pf`, `phase_${p}_freq`, `phase_${p}_energy`, `phase_${p}_returned`,
          ]).map((k) => html`<ha-textfield label=${k} .value=${ents[k] || ''} placeholder="auto" @input=${(e: Event) => this._ue(k, (e.target as HTMLInputElement).value)}></ha-textfield>`)}
        ` : nothing}

        ${this._section === 'totals' ? html`
          <div class="st">${t(curLang, 'section.totals')}</div>
          ${['total_power', 'total_apparent', 'total_current', 'total_energy', 'total_returned', 'total_cost'].map((k) => html`
            <ha-textfield label=${k} .value=${ents[k] || ''} placeholder="auto" @input=${(e: Event) => this._ue(k, (e.target as HTMLInputElement).value)}></ha-textfield>`)}
        ` : nothing}

        ${this._section === 'energy' ? html`
          <div class="st">${t(curLang, 'section.daily')} <span class="h">(helper entities)</span></div>
          ${['daily_consumed', 'daily_grid', 'daily_return', 'daily_hp'].map((k) => html`
            <ha-textfield label=${k} .value=${ents[k] || ''} placeholder="optional" @input=${(e: Event) => this._ue(k, (e.target as HTMLInputElement).value)}></ha-textfield>`)}
        ` : nothing}

        ${this._section === 'device' ? html`
          <div class="st">${t(curLang, 'section.device')} <span class="h">(auto)</span></div>
          ${['temperature', 'rssi', 'uptime', 'cloud', 'restart_required', 'firmware', 'beta_firmware', 'device_tracker'].map((k) => html`
            <ha-textfield label=${k} .value=${ents[k] || ''} placeholder="auto" @input=${(e: Event) => this._ue(k, (e.target as HTMLInputElement).value)}></ha-textfield>`)}
          <div class="st">${t(curLang, 'section.control')} <span class="h">(auto)</span></div>
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
    .sf { display: flex; align-items: center; gap: 12px; }
    .sl { font-size: 14px; color: var(--primary-text-color); min-width: 80px; }
    select { flex: 1; padding: 8px 12px; border-radius: 8px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.12); color: var(--primary-text-color); font-size: 14px; }
    select option { background: #1c1c1e; color: #fff; }
  `; }
}

declare global { interface HTMLElementTagNameMap { 'ha-shelly-smart-meter-editor': ShellySmartMeterEditor; } }
