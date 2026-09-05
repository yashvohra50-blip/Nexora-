/**
 * ROAM City-Scale Impact Calculator
 * Dynamic macro simulation with interactive inputs (in-place updates)
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
    this.attachEvents();
  }

  render() {
    const data = calculateMacroImpact(this.tourists, this.redirect, this.spend, 82);
    const r = data.results;

    this.container.innerHTML = `
      <div style="text-align:center;">
        <div style="font-size:0.75rem; text-transform:uppercase; color:var(--roam-accent); font-weight:800; letter-spacing:0.12em; margin-bottom:4px;">
          Macro Simulation Engine
        </div>
        <h2 style="font-size:1.8rem; font-weight:800; color:#fff;">CITY-SCALE IMPACT CALCULATOR</h2>
        <p style="color:var(--text-secondary); max-width:640px; margin:0 auto;">
          Simulate how shifting a percentage of travelers across a destination redistributes revenue and reduces infrastructure friction.
        </p>
      </div>

      <div class="calc-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:var(--space-lg); margin-top:var(--space-lg);">
        <!-- Sliders -->
        <div class="calc-inputs" style="background:var(--roam-card); border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:var(--space-lg); display:flex; flex-direction:column; gap:16px;">
          <div>
            <div style="display:flex; justify-content:space-between; font-size:0.85rem; font-weight:600; margin-bottom:4px;">
              <span>Monthly Destination Visitors:</span>
              <span id="label-calc-tourists" style="font-family:var(--font-mono); color:var(--roam-accent); font-weight:700;">${this.tourists.toLocaleString()}</span>
            </div>
            <input id="calc-tourists-input" type="range" min="20000" max="150000" step="5000" value="${this.tourists}" class="policy-slider">
          </div>

          <div>
            <div style="display:flex; justify-content:space-between; font-size:0.85rem; font-weight:600; margin-bottom:4px;">
              <span>Redistribution Target:</span>
              <span id="label-calc-redirect" style="font-family:var(--font-mono); color:var(--roam-accent); font-weight:700;">${this.redirect}%</span>
            </div>
            <input id="calc-redirect-input" type="range" min="5" max="35" step="1" value="${this.redirect}" class="policy-slider">
          </div>

          <div>
            <div style="display:flex; justify-content:space-between; font-size:0.85rem; font-weight:600; margin-bottom:4px;">
              <span>Average Daily Tourist Spend (₹):</span>
              <span id="label-calc-spend" style="font-family:var(--font-mono); color:var(--roam-accent); font-weight:700;">₹${this.spend.toLocaleString()}</span>
            </div>
            <input id="calc-spend-input" type="range" min="1000" max="10000" step="500" value="${this.spend}" class="policy-slider">
          </div>
        </div>

        <!-- Output Metric Dashboard -->
        <div class="calc-output-box" style="background:var(--roam-card); border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:var(--space-lg); display:flex; flex-direction:column; justify-content:space-around;">
          <div class="calc-output-row" style="display:flex; justify-content:space-between; align-items:center; padding:10px 0; border-bottom:1px solid var(--border-subtle);">
            <span class="calc-output-label" style="font-size:0.85rem; color:var(--text-secondary);">Visitors Intelligently Redistributed</span>
            <span id="out-calc-redistributed" class="calc-output-value" style="font-size:1.15rem; font-weight:800; font-family:var(--font-mono); color:#fff;">${r.touristsRedistributed.toLocaleString()} / mo</span>
          </div>

          <div class="calc-output-row" style="display:flex; justify-content:space-between; align-items:center; padding:10px 0; border-bottom:1px solid var(--border-subtle);">
            <span class="calc-output-label" style="font-size:0.85rem; color:var(--text-secondary);">Revenue Injected into Local Economy</span>
            <span id="out-calc-revenue" class="calc-output-value" style="font-size:1.15rem; font-weight:800; font-family:var(--font-mono); color:var(--brand-cyan);">₹${r.additionalLocalSpendCrores} Crores</span>
          </div>

          <div class="calc-output-row" style="display:flex; justify-content:space-between; align-items:center; padding:10px 0; border-bottom:1px solid var(--border-subtle);">
            <span class="calc-output-label" style="font-size:0.85rem; color:var(--text-secondary);">Total Tourist Queue Hours Saved</span>
            <span id="out-calc-hours" class="calc-output-value" style="font-size:1.15rem; font-weight:800; font-family:var(--font-mono); color:#fff;">${r.queueHoursSavedTotal.toLocaleString()} hrs</span>
          </div>

          <div class="calc-output-row" style="display:flex; justify-content:space-between; align-items:center; padding:10px 0;">
            <span class="calc-output-label" style="font-size:0.85rem; color:var(--text-secondary);">Peak Monument Congestion Relieved</span>
            <span id="out-calc-congestion" class="calc-output-value" style="font-size:1.15rem; font-weight:800; font-family:var(--font-mono); color:var(--load-optimal);">-${r.congestionReductionPct}%</span>
          </div>
        </div>
      </div>
    `;
  }

  attachEvents() {
    const tInput = document.getElementById('calc-tourists-input');
    const rInput = document.getElementById('calc-redirect-input');
    const sInput = document.getElementById('calc-spend-input');

    if (tInput) tInput.addEventListener('input', (e) => {
      this.tourists = parseInt(e.target.value, 10);
      this.updateInPlace();
    });
    if (rInput) rInput.addEventListener('input', (e) => {
      this.redirect = parseInt(e.target.value, 10);
      this.updateInPlace();
    });
    if (sInput) sInput.addEventListener('input', (e) => {
      this.spend = parseInt(e.target.value, 10);
      this.updateInPlace();
    });
  }

  updateInPlace() {
    const elT = document.getElementById('label-calc-tourists');
    const elR = document.getElementById('label-calc-redirect');
    const elS = document.getElementById('label-calc-spend');
    if (elT) elT.textContent = this.tourists.toLocaleString();
    if (elR) elR.textContent = `${this.redirect}%`;
    if (elS) elS.textContent = `₹${this.spend.toLocaleString()}`;

    const data = calculateMacroImpact(this.tourists, this.redirect, this.spend, 82);
    const r = data.results;

    const outRed = document.getElementById('out-calc-redistributed');
    const outRev = document.getElementById('out-calc-revenue');
    const outHrs = document.getElementById('out-calc-hours');
    const outCng = document.getElementById('out-calc-congestion');

    if (outRed) outRed.textContent = `${r.touristsRedistributed.toLocaleString()} / mo`;
    if (outRev) outRev.textContent = `₹${r.additionalLocalSpendCrores} Crores`;
    if (outHrs) outHrs.textContent = `${r.queueHoursSavedTotal.toLocaleString()} hrs`;
    if (outCng) outCng.textContent = `-${r.congestionReductionPct}%`;
  }
}
