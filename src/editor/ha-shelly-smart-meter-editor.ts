import { LitElement, html, css, TemplateResult, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, fireEvent } from 'custom-card-helpers';

@customElement('ha-shelly-smart-meter-editor')
export class ShellySmartMeterEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ attribute: false }) public config!: Record<string, unknown>;
  @state() private _config!: Record<string, unknown>;
  @state() private _section = 'general';

  public setConfig(config: Record<string, unknown>): void {
    this._config = { ...config };
  }

  private _update(key: string, value: unknown): void {
    this._config = { ...this._config, [key]: value };
    fireEvent(this, 'config-changed', { config: this._config });
  }

  private _updateEntity(key: string, value: string): void {
    const ents = { ...((this._config.entities as Record<string, string>) || {}) };
    if (value) {
      ents[key] = value;
    } else {
      delete ents[key]; // remove empty to allow auto-discovery
    }
    this._update('entities', ents);
  }

  private _updatePhaseLabel(key: string, value: string): void {
    const labels = { ...((this._config.phase_labels as Record<string, string>) || {}) };
    labels[key] = value;
    this._update('phase_labels', labels);
  }

  // Auto-discover Shelly 3EM device name from hass
  private _getDeviceHint(): string {
    if (!this.hass) return '';
    const entities = Object.keys(this.hass.states);
    const match = entities.find((e) =>
      e.startsWith('sensor.') && e.endsWith('_phase_a_active_power')
    );
    if (match) {
      return match.replace('sensor.', '').replace('_phase_a_active_power', '');
    }
    return '';
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) return nothing;

    const deviceHint = this._getDeviceHint();
    const sections = [
      { key: 'general', label: 'General', icon: 'mdi:cog' },
      { key: 'phases', label: 'Faze', icon: 'mdi:flash' },
      { key: 'energy', label: 'Energie', icon: 'mdi:counter' },
      { key: 'device', label: 'Device', icon: 'mdi:chip' },
    ];

    const currentEntities = (this._config.entities as Record<string, string>) || {};

    return html`
      <div class="tabs">
        ${sections.map((s) => html`
          <div class="tab ${this._section === s.key ? 'active' : ''}" @click=${() => { this._section = s.key; }}>
            <ha-icon .icon=${s.icon}></ha-icon>
            <span>${s.label}</span>
          </div>
        `)}
      </div>

      ${deviceHint ? html`
        <div class="discovery-hint">
          <ha-icon icon="mdi:magnify"></ha-icon>
          <span>Device detectat: <strong>${deviceHint}</strong> — entitățile se completează automat</span>
        </div>
      ` : html`
        <div class="discovery-hint warn">
          <ha-icon icon="mdi:alert"></ha-icon>
          <span>Nu s-a detectat automat un Shelly Pro 3EM. Completează entitățile manual.</span>
        </div>
      `}

      <div class="config">
        ${this._section === 'general' ? html`
          <ha-textfield label="Titlu" .value=${(this._config.title as string) || ''} @input=${(e: Event) => this._update('title', (e.target as HTMLInputElement).value)}></ha-textfield>
          <div class="row"><ha-switch .checked=${this._config.show_header !== false} @change=${(e: Event) => this._update('show_header', (e.target as HTMLInputElement).checked)}></ha-switch><span>Header</span></div>
          <div class="row"><ha-switch .checked=${this._config.show_flow !== false} @change=${(e: Event) => this._update('show_flow', (e.target as HTMLInputElement).checked)}></ha-switch><span>Flow Diagram</span></div>
          <div class="row"><ha-switch .checked=${this._config.show_phases !== false} @change=${(e: Event) => this._update('show_phases', (e.target as HTMLInputElement).checked)}></ha-switch><span>Faze</span></div>
          <div class="row"><ha-switch .checked=${this._config.show_energy !== false} @change=${(e: Event) => this._update('show_energy', (e.target as HTMLInputElement).checked)}></ha-switch><span>Energie</span></div>
          <div class="row"><ha-switch .checked=${this._config.show_costs !== false} @change=${(e: Event) => this._update('show_costs', (e.target as HTMLInputElement).checked)}></ha-switch><span>Costuri</span></div>
          <div class="row"><ha-switch .checked=${this._config.show_device !== false} @change=${(e: Event) => this._update('show_device', (e.target as HTMLInputElement).checked)}></ha-switch><span>Device Info</span></div>
          <ha-textfield label="Cost kWh (RON)" type="number" .value=${String(this._config.cost_per_kwh || 0.85)} @input=${(e: Event) => this._update('cost_per_kwh', parseFloat((e.target as HTMLInputElement).value))}></ha-textfield>
        ` : nothing}

        ${this._section === 'phases' ? html`
          <div class="section-title">Etichete faze</div>
          ${['A', 'B', 'C'].map((k) => html`
            <ha-textfield label="Faza ${k}" .value=${((this._config.phase_labels as Record<string, string>) || {})[k] || ''} @input=${(e: Event) => this._updatePhaseLabel(k, (e.target as HTMLInputElement).value)}></ha-textfield>
          `)}
          <div class="section-title">Entități faze <span class="hint">(lasă gol pentru auto-discovery)</span></div>
          ${['a', 'b', 'c'].flatMap((p) => [
            `phase_${p}_power`, `phase_${p}_voltage`, `phase_${p}_current`,
            `phase_${p}_pf`, `phase_${p}_freq`, `phase_${p}_energy`, `phase_${p}_returned`,
          ]).map((k) => html`
            <ha-textfield label=${k} .value=${currentEntities[k] || ''} placeholder="auto" @input=${(e: Event) => this._updateEntity(k, (e.target as HTMLInputElement).value)}></ha-textfield>
          `)}
        ` : nothing}

        ${this._section === 'energy' ? html`
          <div class="section-title">Totaluri</div>
          ${['total_power', 'total_apparent', 'total_current', 'total_energy', 'total_returned'].map((k) => html`
            <ha-textfield label=${k} .value=${currentEntities[k] || ''} placeholder="auto" @input=${(e: Event) => this._updateEntity(k, (e.target as HTMLInputElement).value)}></ha-textfield>
          `)}
          <div class="section-title">Contoare zilnice <span class="hint">(helper entities — necesită config manual)</span></div>
          ${['daily_consumed', 'daily_grid', 'daily_return', 'total_cost'].map((k) => html`
            <ha-textfield label=${k} .value=${currentEntities[k] || ''} placeholder="opțional" @input=${(e: Event) => this._updateEntity(k, (e.target as HTMLInputElement).value)}></ha-textfield>
          `)}
        ` : nothing}

        ${this._section === 'device' ? html`
          <div class="section-title">Device Info <span class="hint">(lasă gol pentru auto-discovery)</span></div>
          ${['temperature', 'rssi', 'uptime', 'cloud', 'firmware'].map((k) => html`
            <ha-textfield label=${k} .value=${currentEntities[k] || ''} placeholder="auto" @input=${(e: Event) => this._updateEntity(k, (e.target as HTMLInputElement).value)}></ha-textfield>
          `)}
        ` : nothing}
      </div>
    `;
  }

  static get styles() {
    return css`
      .tabs { display: flex; gap: 4px; margin-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 8px; }
      .tab { display: flex; align-items: center; gap: 4px; padding: 6px 12px; border-radius: 8px; cursor: pointer; font-size: 13px; color: var(--secondary-text-color); transition: all 0.2s; }
      .tab:hover { background: rgba(255,255,255,0.05); }
      .tab.active { background: rgba(59,130,246,0.15); color: #60a5fa; }
      .tab ha-icon { --mdc-icon-size: 16px; }
      .config { display: flex; flex-direction: column; gap: 12px; padding: 4px 0; }
      .section-title { font-size: 14px; font-weight: 600; color: var(--primary-text-color); margin-top: 8px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 4px; }
      .section-title .hint { font-size: 11px; font-weight: 400; color: var(--secondary-text-color); }
      .row { display: flex; align-items: center; gap: 12px; }
      .row span { font-size: 14px; color: var(--primary-text-color); }
      ha-textfield { width: 100%; }
      .discovery-hint { display: flex; align-items: center; gap: 8px; padding: 8px 12px; border-radius: 8px; background: rgba(34,197,94,0.08); font-size: 12px; color: #22c55e; margin-bottom: 8px; }
      .discovery-hint.warn { background: rgba(245,158,11,0.08); color: #f59e0b; }
      .discovery-hint ha-icon { --mdc-icon-size: 16px; flex-shrink: 0; }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ha-shelly-smart-meter-editor': ShellySmartMeterEditor;
  }
}
