/**
 * ROAM Destination Authority Mode (Control View)
 * City Tourism Control Center & Interactive Policy Simulator
 * Slider updates in-place smoothly WITHOUT re-rendering the DOM container
 */

import { simulatePolicyImpact } from '../engine/simulator.js';

export class AuthorityModeController {
  constructor() {
    this.locationData = null;
    this.redirectPct = 15;
    this.incentiveTier = 'standard';
  }

  setDestination(locationData) {
    this.locationData = locationData;
    this.render();
  }

  render() {
    const container = document.getElementById('authority-mode-container');
    if (!container) return;

    if (!this.locationData || this.locationData.intelligenceTier === 'PARTIAL') {
      container.innerHTML = `
        <div class="partial-intelligence-card">
          <span class="partial-badge">MUNICIPAL SENSOR INTEGRATION</span>
          <h3 class="partial-title">Destination Authority Grid for ${this.locationData?.name || 'this District'}</h3>
          <p class="partial-sub">
            Heritage strain telemetry and municipal turnstile integrations are active in primary hubs. In ${this.locationData?.name || 'this area'}, predictive policy simulations will launch alongside regional sensor deployment.
          </p>
        </div>
      `;
      return;
    }

    const simulation = simulatePolicyImpact(this.redirectPct, this.incentiveTier);
    const m = simulation.metrics;
    const attractions = this.locationData.attractions || [];
    const criticalCount = attractions.filter(a => a.status === 'critical').length;

    container.innerHTML = `
      <div class="authority-grid">
        <!-- Left Column: City Tourism Control Center Telemetry -->
        <div class="card">
          <div class="card-header">
            <div>
              <div style="font-size:0.75rem; text-transform:uppercase; color:var(--roam-accent); font-weight:700;">Municipal Destination Control</div>
              <h3 class="card-title">${this.locationData.name} Heritage Grid Utilization</h3>
            </div>
            <span class="badge badge-critical">🚨 ${criticalCount} Critical Overloads</span>
          </div>

          <div style="display:flex; flex-direction:column; gap:10px; margin-top:12px;">
            ${attractions.slice(0, 6).map(att => {
              const color = att.status === 'critical' ? 'var(--load-critical)' : att.status === 'elevated' ? 'var(--load-elevated)' : 'var(--load-optimal)';
              return `
                <div>
                  <div style="display:flex; justify-content:space-between; font-size:0.82rem; margin-bottom:3px;">
                    <span style="font-weight:600;">${att.name}</span>
                    <span style="font-family:var(--font-mono); color:${color}; font-weight:700;">
                      ${att.currentVisitors.toLocaleString()} / ${att.capacityMax.toLocaleString()} (${att.loadPercentage}%)
                    </span>
                  </div>
                  <div class="health-meter-track" style="height:6px;">
                    <div class="health-meter-fill" style="width:${att.loadPercentage}%; background:${color};"></div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <div style="margin-top:18px; padding:12px; background:rgba(239,68,68,0.06); border-left:3px solid var(--load-critical); border-radius:0 6px 6px 0; font-size:0.82rem; color:#fca5a5;">
            <strong>Heritage Preservation Alert:</strong> Key monuments in ${this.locationData.name} are operating above optimal structural throughput. Dynamic demand redistribution prevents stone degradation and excessive queue overcrowding.
          </div>
        </div>

        <!-- Right Column: Interactive 'What If?' Policy Simulator -->
        <div class="card" style="background:linear-gradient(135deg, #111827, #0d121e); border-color:var(--border-medium);">
          <div class="card-header">
            <div>
              <div style="font-size:0.75rem; text-transform:uppercase; color:var(--brand-purple); font-weight:700;">Intervention Testing Sandbox</div>
              <h3 class="card-title">Simulate Demand Redistribution Policy</h3>
            </div>
            <span class="badge" style="background:rgba(139,92,246,0.15); color:#c4b5fd; border:1px solid rgba(139,92,246,0.3);">
              PREDICTIVE ENGINE
            </span>
          </div>

          <!-- Policy Slider Box -->
          <div class="policy-slider-box">
            <div style="display:flex; justify-content:space-between; font-size:0.85rem; font-weight:600;">
              <span>Target Visitor Redistribution:</span>
              <span id="slider-val-label" style="font-family:var(--font-mono); color:var(--roam-accent); font-size:1.1rem; font-weight:800;">
                ${this.redirectPct}%
              </span>
            </div>
            <input id="policy-slider-input" type="range" min="5" max="35" step="1" value="${this.redirectPct}" class="policy-slider">
            <div style="display:flex; justify-content:space-between; font-size:0.7rem; color:var(--text-muted); font-family:var(--font-mono);">
              <span>5% (Nudge)</span>
              <span>15% (Recommended)</span>
              <span>35% (Aggressive)</span>
            </div>
          </div>

          <!-- Policy Impact Output Cards (Updated in-place) -->
          <div class="policy-impact-cards">
            <div class="policy-stat-card">
              <div id="stat-congestion" class="policy-stat-val">↓ ${m.peakCongestionReductionPct}%</div>
              <div style="font-size:0.72rem; text-transform:uppercase; color:var(--text-muted); font-weight:600; margin-top:2px;">
                Peak Congestion Reduction
              </div>
            </div>
            <div class="policy-stat-card">
              <div id="stat-delays" class="policy-stat-val">↓ ${m.travelTimeReductionPct}%</div>
              <div style="font-size:0.72rem; text-transform:uppercase; color:var(--text-muted); font-weight:600; margin-top:2px;">
                Average Transit Delays
              </div>
            </div>
            <div class="policy-stat-card">
              <div id="stat-uplift" class="policy-stat-val" style="color:var(--load-optimal);">↑ ${m.underutilizedVisitsUpliftPct}%</div>
              <div style="font-size:0.72rem; text-transform:uppercase; color:var(--text-muted); font-weight:600; margin-top:2px;">
                Lesser-Known Site Visits
              </div>
            </div>
            <div class="policy-stat-card">
              <div id="stat-revenue" class="policy-stat-val" style="color:var(--brand-cyan);">↑ ${m.localBusinessExposureUpliftPct}%</div>
              <div style="font-size:0.72rem; text-transform:uppercase; color:var(--text-muted); font-weight:600; margin-top:2px;">
                Local Merchant Revenue
              </div>
            </div>
          </div>

          <div id="simulation-insight-text" style="margin-top:16px; font-size:0.82rem; color:var(--text-secondary); line-height:1.45;">
            <strong>Simulation Insight:</strong> Shifting ${this.redirectPct}% of peak visitors in ${this.locationData.name} toward underutilized cultural surrogates eliminates over ${Math.round(this.redirectPct * 210)} tourist delay hours daily.
          </div>
        </div>
      </div>
    `;

    this.attachEvents();
  }

  attachEvents() {
    const slider = document.getElementById('policy-slider-input');
    if (slider) {
      // Update in-place smoothly without re-rendering the DOM container!
      slider.addEventListener('input', (e) => {
        this.redirectPct = parseInt(e.target.value, 10);
        this.updateInPlace();
      });
    }
  }

  updateInPlace() {
    const label = document.getElementById('slider-val-label');
    if (label) label.textContent = `${this.redirectPct}%`;

    const simulation = simulatePolicyImpact(this.redirectPct, this.incentiveTier);
    const m = simulation.metrics;

    const elCongestion = document.getElementById('stat-congestion');
    const elDelays = document.getElementById('stat-delays');
    const elUplift = document.getElementById('stat-uplift');
    const elRevenue = document.getElementById('stat-revenue');
    const elInsight = document.getElementById('simulation-insight-text');

    if (elCongestion) elCongestion.textContent = `↓ ${m.peakCongestionReductionPct}%`;
    if (elDelays) elDelays.textContent = `↓ ${m.travelTimeReductionPct}%`;
    if (elUplift) elUplift.textContent = `↑ ${m.underutilizedVisitsUpliftPct}%`;
    if (elRevenue) elRevenue.textContent = `↑ ${m.localBusinessExposureUpliftPct}%`;

    if (elInsight && this.locationData) {
      elInsight.innerHTML = `<strong>Simulation Insight:</strong> Shifting ${this.redirectPct}% of peak visitors in ${this.locationData.name} toward underutilized cultural surrogates eliminates over ${Math.round(this.redirectPct * 210)} tourist delay hours daily.`;
    }
  }
}
