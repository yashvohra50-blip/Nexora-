/**
 * ROAM City-Scale Impact Calculator
 * Dynamic macro simulation with interactive inputs
 */

import { calculateMacroImpact } from '../engine/simulator.js';

export class ImpactCalcController {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.tourists = 60000;
    this.redirect = 18;
    this.spend = 3500;
    this.init();
  }

  init() {
    if (!this.container) return;
    this.render();
  }

  render() {
    const data = calculateMacroImpact(this.tourists, this.redirect, this.spend, 82);
    const r = data.results;

    this.container.innerHTML = `
      <div style="text-align:center;">
        <div style="font-size:0.75rem; text-transform:uppercase; color:var(--brand-cyan); font-weight:700; letter-spacing:0.12em; margin-bottom:4px;">
          Macro Simulation
        </div>
        <h2 style="font-size:1.8rem; font-weight:800;">CITY-SCALE IMPACT CALCULATOR</h2>
        <p style="color:var(--text-secondary); max-width:640px; margin:0 auto;">
          Simulate how shifting a percentage of travelers across a destination redistributes revenue and reduces infrastructure friction.
        </p>
      </div>

      <div class="calc-grid">
        <!-- Sliders -->
        <div class="calc-inputs">
          <div>
            <div style="display:flex; justify-content:space-between; font-size:0.85rem; font-weight:600; margin-bottom:4px;">
              <span>Monthly Destination Visitors:</span>
              <span style="font-family:var(--font-mono); color:var(--brand-primary);">${this.tourists.toLocaleString()}</span>
            </div>
            <input id="calc-tourists-input" type="range" min="20000" max="150000" step="5000" value="${this.tourists}" class="policy-slider">
          </div>

          <div>
            <div style="display:flex; justify-content:space-between; font-size:0.85rem; font-weight:600; margin-bottom:4px;">
              <span>Redistribution Target:</span>
              <span style="font-family:var(--font-mono); color:var(--brand-primary);">${this.redirect}%</span>
            </div>
            <input id="calc-redirect-input" type="range" min="5" max="35" step="1" value="${this.redirect}" class="policy-slider">
          </div>

          <div>
            <div style="display:flex; justify-content:space-between; font-size:0.85rem; font-weight:600; margin-bottom:4px;">
              <span>Average Daily Tourist Spend (₹):</span>
              <span style="font-family:var(--font-mono); color:var(--brand-primary);">₹${this.spend.toLocaleString()}</span>
            </div>
            <input id="calc-spend-input" type="range" min="1500" max="8000" step="250" value="${this.spend}" class="policy-slider">
          </div>
        </div>

        <!-- Output Metric Dashboard -->
        <div class="calc-output-box">
          <div class="calc-output-row">
            <span class="calc-output-label">Visitors Intelligently Redistributed</span>
            <span class="calc-output-value">${r.touristsRedistributed.toLocaleString()} / mo</span>
          </div>

          <div class="calc-output-row">
            <span class="calc-output-label">Revenue Injected into Local Economy</span>
            <span class="calc-output-value" style="color:var(--brand-cyan);">₹${r.additionalLocalSpendCrores} Crores</span>
          </div>

          <div class="calc-output-row">
            <span class="calc-output-label">Total Tourist Queue Hours Saved</span>
            <span class="calc-output-value">${r.queueHoursSavedTotal.toLocaleString()} hrs</span>
          </div>

          <div class="calc-output-row" style="border-bottom:none;">
            <span class="calc-output-label">Peak Monument Congestion Relieved</span>
            <span class="calc-output-value" style="color:var(--load-optimal);">-${r.congestionReductionPct}%</span>
          </div>
        </div>
      </div>
    `;

    this.attachEvents();
  }

  attachEvents() {
    const tInput = document.getElementById('calc-tourists-input');
    const rInput = document.getElementById('calc-redirect-input');
    const sInput = document.getElementById('calc-spend-input');

    if (tInput) tInput.addEventListener('input', (e) => { this.tourists = parseInt(e.target.value, 10); this.render(); });
    if (rInput) rInput.addEventListener('input', (e) => { this.redirect = parseInt(e.target.value, 10); this.render(); });
    if (sInput) sInput.addEventListener('input', (e) => { this.spend = parseInt(e.target.value, 10); this.render(); });
  }
}
