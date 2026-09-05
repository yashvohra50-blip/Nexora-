/**
 * ROAM Destination Authority Mode
 * City Tourism Control Center & Interactive Policy Simulator
 */

import { JAIPUR_DESTINATION } from '../data/jaipur.js';
import { simulatePolicyImpact } from '../engine/simulator.js';

export class AuthorityModeController {
  constructor() {
    this.redirectPct = 15;
    this.incentiveTier = 'standard';
    this.init();
  }

  init() {
    this.render();
  }

  render() {
    const container = document.getElementById('authority-mode-container');
    if (!container) return;

    const simulation = simulatePolicyImpact(this.redirectPct, this.incentiveTier);
    const m = simulation.metrics;

    container.innerHTML = `
      <div class="authority-grid">
        <!-- Left Column: City Tourism Control Center Telemetry -->
        <div class="card">
          <div class="card-header">
            <div>
              <div style="font-size:0.75rem; text-transform:uppercase; color:var(--brand-primary); font-weight:700;">Municipal Destination Control</div>
              <h3 class="card-title">Jaipur Heritage Grid Utilization</h3>
            </div>
            <span class="badge badge-critical">🚨 3 Critical Overloads</span>
          </div>

          <div style="display:flex; flex-direction:column; gap:10px; margin-top:12px;">
            ${JAIPUR_DESTINATION.attractions.slice(0, 6).map(att => {
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
            <strong>Heritage Preservation Alert:</strong> Amber Fort and Hawa Mahal are exceeding daily structural throughput limits by 14%. Unmitigated congestion is increasing masonry wear and security strain.
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

          <div class="policy-slider-box">
            <div style="display:flex; justify-content:space-between; font-size:0.85rem; font-weight:600;">
              <span>Target Visitor Redistribution:</span>
              <span id="slider-val-label" style="font-family:var(--font-mono); color:var(--brand-primary); font-size:1.1rem;">
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

          <!-- Policy Impact Output Cards -->
          <div class="policy-impact-cards">
            <div class="policy-stat-card">
              <div class="policy-stat-val">↓ ${m.peakCongestionReductionPct}%</div>
              <div style="font-size:0.72rem; text-transform:uppercase; color:var(--text-muted); font-weight:600; margin-top:2px;">
                Peak Congestion Reduction
              </div>
            </div>
            <div class="policy-stat-card">
              <div class="policy-stat-val">↓ ${m.travelTimeReductionPct}%</div>
              <div style="font-size:0.72rem; text-transform:uppercase; color:var(--text-muted); font-weight:600; margin-top:2px;">
                Average Transit Delays
              </div>
            </div>
            <div class="policy-stat-card">
              <div class="policy-stat-val" style="color:var(--load-optimal);">↑ ${m.underutilizedVisitsUpliftPct}%</div>
              <div style="font-size:0.72rem; text-transform:uppercase; color:var(--text-muted); font-weight:600; margin-top:2px;">
                Lesser-Known Site Visits
              </div>
            </div>
            <div class="policy-stat-card">
              <div class="policy-stat-val" style="color:var(--brand-cyan);">↑ ${m.localBusinessExposureUpliftPct}%</div>
              <div style="font-size:0.72rem; text-transform:uppercase; color:var(--text-muted); font-weight:600; margin-top:2px;">
                Local Business Revenue
              </div>
            </div>
          </div>

          <div style="margin-top:16px; font-size:0.8rem; color:var(--text-secondary); line-height:1.45;">
            <strong>Simulation Insight:</strong> Shifting ${this.redirectPct}% of peak visitors toward Albert Hall, Panna Meena Kund, and Sisodia Rani Palace saves over 3,200 tourist hours daily while injecting an estimated ₹1.4 Cr monthly into grassroots artisan markets.
          </div>
        </div>
      </div>
    `;

    this.attachEvents();
  }

  attachEvents() {
    const slider = document.getElementById('policy-slider-input');
    if (slider) {
      slider.addEventListener('input', (e) => {
        this.redirectPct = parseInt(e.target.value, 10);
        this.render();
      });
    }
  }
}
