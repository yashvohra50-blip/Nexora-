/**
 * ROAM Tourist Mode (Explore View) Component
 * Destination Health Telemetry, Alternative Recommendations, and Dynamic Rerouting
 * Dynamically adapts to active Indian destination
 */

import { scoreAlternative } from '../engine/scoring.js';
import { calculateRerouteImpact } from '../engine/router.js';

export class TouristModeController {
  constructor(mapInstance) {
    this.map = mapInstance;
    this.locationData = null;
    this.isRerouted = false;
  }

  setDestination(locationData) {
    this.locationData = locationData;
    this.isRerouted = false;

    if (this.map) {
      this.map.setDestination(locationData);
    }

    this.render();
  }

  render() {
    if (!this.locationData) return;

    if (this.locationData.intelligenceTier === 'PARTIAL') {
      this.renderPartialIntelligence();
      return;
    }

    this.renderHealthBar();
    this.renderRecommendations();
    this.renderRerouteBanner();
    this.renderItinerary();
    this.attachRerouteButton();
  }

  renderPartialIntelligence() {
    const loc = this.locationData;
    const stage = document.getElementById('tourist-main-stage');
    const healthBar = document.getElementById('tourist-health-bar');
    const rerouteBanner = document.querySelector('.reroute-banner');
    const itineraryContainer = document.getElementById('itinerary-container');

    if (healthBar) {
      healthBar.innerHTML = `
        <div class="health-stat">
          <span class="health-label">District Status</span>
          <div class="health-value" style="font-size:1.1rem; color:#f59e0b;">
            PARTIAL TELEMETRY
          </div>
        </div>
        <div class="health-stat">
          <span class="health-label">Region</span>
          <div class="health-value" style="font-size:1.1rem; color:#fff;">
            ${loc.state} (${loc.region})
          </div>
        </div>
        <div class="health-stat">
          <span class="health-label">Nearby Primary Hub</span>
          <div class="health-value" style="font-size:1.1rem; color:var(--roam-accent);">
            ${loc.nearbyHub || 'Jaipur'}
          </div>
        </div>
        <div class="health-stat">
          <span class="health-label">Expansion Phase</span>
          <div class="health-value" style="font-size:1.1rem; color:#10b981;">
            PILOT MAPPING
          </div>
        </div>
      `;
    }

    if (rerouteBanner) {
      rerouteBanner.style.display = 'none';
    }

    if (itineraryContainer) {
      itineraryContainer.innerHTML = `
        <div class="partial-intelligence-card">
          <span class="partial-badge">PARTIAL LOCATION INTELLIGENCE</span>
          <h3 class="partial-title">${loc.name} Demand Telemetry Underway</h3>
          <p class="partial-sub">
            ${loc.notes || 'This location is currently being indexed into the ROAM national grid. Cultural DNA and regional connectivity are fully mapped below.'}
          </p>
          <div style="margin-bottom:var(--space-md); font-size:0.88rem; color:var(--text-secondary);">
            Nearest Fully Modeled Ecosystem: <strong style="color:#fff;">${loc.nearbyHub || 'Jaipur'}</strong>
          </div>
          <button class="partial-hub-jump-btn" id="jump-to-hub-btn" data-hub="${(loc.nearbyHub || 'Jaipur').toLowerCase()}">
            SWITCH TO ${(loc.nearbyHub || 'JAIPUR').toUpperCase()} FULL INTELLIGENCE ➔
          </button>
        </div>
      `;

      const jumpBtn = document.getElementById('jump-to-hub-btn');
      if (jumpBtn) {
        jumpBtn.addEventListener('click', (e) => {
          const hub = e.currentTarget.dataset.hub;
          if (window.ROAM) window.ROAM.setLocation(hub);
        });
      }
    }
  }

  renderHealthBar() {
    const metrics = this.locationData.metrics;
    const bar = document.getElementById('tourist-health-bar');
    if (!bar) return;

    bar.innerHTML = `
      <div class="health-stat">
        <span class="health-label">Visitor Concentration</span>
        <div class="health-value">
          <span style="color: ${this.isRerouted ? 'var(--load-optimal)' : 'var(--load-critical)'}">
            ${this.isRerouted ? '52%' : metrics.visitorConcentration + '%'}
          </span>
          <span style="font-size:0.75rem; color:var(--text-muted); font-weight:400;">
            ${this.isRerouted ? 'Balanced Flow' : 'Top Hotspots'}
          </span>
        </div>
        <div class="health-meter-track">
          <div class="health-meter-fill" style="width:${this.isRerouted ? '52%' : metrics.visitorConcentration + '%'}; background:${this.isRerouted ? 'var(--load-optimal)' : 'var(--load-critical)'};"></div>
        </div>
      </div>

      <div class="health-stat">
        <span class="health-label">Average Attraction Load</span>
        <div class="health-value">
          <span style="color: #f59e0b;">${this.isRerouted ? '44%' : metrics.averageAttractionLoad + '%'}</span>
        </div>
        <div class="health-meter-track">
          <div class="health-meter-fill" style="width:${this.isRerouted ? '44%' : metrics.averageAttractionLoad + '%'}; background:#f59e0b;"></div>
        </div>
      </div>

      <div class="health-stat">
        <span class="health-label">Tourism Distribution</span>
        <div class="health-value" style="font-size:1.05rem;">
          ${this.isRerouted 
            ? '<span class="badge badge-optimal">✓ OPTIMALLY BALANCED</span>'
            : '<span class="badge badge-critical">⚠ CRITICALLY CONCENTRATED</span>'
          }
        </div>
      </div>

      <div class="health-stat">
        <span class="health-label">Local Business Opportunity</span>
        <div class="health-value" style="font-size:1.05rem;">
          <span class="badge badge-optimal">${metrics.localBusinessOpportunity || 'HIGH (ACTIVE HUBS)'}</span>
        </div>
      </div>
    `;
  }

  renderRecommendations() {
    const stack = document.getElementById('recommendations-stack');
    if (!stack) return;

    const attractions = this.locationData.attractions || [];
    const overloaded = attractions.filter(a => a.status === 'critical');
    const optimal = attractions.filter(a => a.status === 'optimal');

    if (overloaded.length === 0 || optimal.length === 0) {
      stack.innerHTML = `<div style="color:var(--text-muted); font-size:0.85rem;">All sites in ${this.locationData.name} are currently operating at balanced loads.</div>`;
      return;
    }

    const cardsHtml = optimal.slice(0, 2).map((opt, idx) => {
      const src = overloaded[idx % overloaded.length];
      const score = scoreAlternative(opt, src, { priority: 'culture' });

      return `
        <div class="alternative-card">
          <div class="alt-pair-header">
            <div>
              <div class="alt-site-category">Curated Demand Surrogate</div>
              <div class="alt-site-name">${opt.name}</div>
            </div>
            <span class="badge badge-optimal">${opt.loadPercentage}% Load (Optimal)</span>
          </div>

          <div class="alt-comparison-row">
            <div class="comparison-from">
              ${src.name}: <strong>${src.loadPercentage}%</strong> (${src.waitTimeMinutes}m wait)
            </div>
            <span style="color:var(--text-muted);">➔</span>
            <div class="comparison-to">
              ${opt.name}: <strong>${opt.loadPercentage}%</strong> (${opt.waitTimeMinutes}m wait)
            </div>
          </div>

          <p style="font-size:0.82rem; color:var(--text-secondary); margin-bottom:8px; line-height:1.4;">
            ${opt.alternativeReason || 'Spacious heritage grounds with pristine architecture and immediate uncrowded access.'}
          </p>

          <div class="alt-metrics-grid">
            <div class="alt-metric-cell">
              <div class="alt-metric-val" style="color:var(--load-optimal);">-${Math.max(0, src.waitTimeMinutes - opt.waitTimeMinutes)} min</div>
              <div class="alt-metric-lbl">Queue Saved</div>
            </div>
            <div class="alt-metric-cell">
              <div class="alt-metric-val">${score.score}/100</div>
              <div class="alt-metric-lbl">ROAM Match</div>
            </div>
            <div class="alt-metric-cell">
              <div class="alt-metric-val" style="color:var(--brand-cyan);">₹${opt.ticketPriceINR}</div>
              <div class="alt-metric-lbl">Admission</div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    stack.innerHTML = cardsHtml;
  }

  renderRerouteBanner() {
    const banner = document.querySelector('.reroute-banner');
    if (!banner) return;
    banner.style.display = 'flex';

    const attractions = this.locationData.attractions || [];
    const topOverloaded = attractions.find(a => a.status === 'critical') || attractions[0];

    const textEl = banner.querySelector('.reroute-text');
    if (textEl && topOverloaded) {
      textEl.innerHTML = `
        <div style="display:flex; align-items:center; gap:8px;">
          <span style="font-size:1.2rem;">⚡</span>
          <h3>${topOverloaded.name} is experiencing severe congestion (${topOverloaded.loadPercentage}% load • ${topOverloaded.waitTimeMinutes} min wait)</h3>
        </div>
        <p>Click below to simulate real-time dynamic rerouting. ROAM restructures your schedule to avoid peak crowds.</p>
      `;
    }
  }

  renderItinerary() {
    const container = document.getElementById('itinerary-container');
    if (!container) return;

    const attractions = this.locationData.attractions || [];
    const items = this.isRerouted 
      ? attractions.filter(a => a.status === 'optimal').slice(0, 4)
      : attractions.slice(0, 4);

    const times = ['09:00 AM', '11:30 AM', '02:00 PM', '04:30 PM'];

    container.innerHTML = `
      <div class="card-header">
        <div>
          <div style="font-size:0.75rem; text-transform:uppercase; color:var(--roam-accent); font-weight:700;">
            ${this.isRerouted ? '✓ DYNAMICALLY OPTIMIZED DAY ROUTE' : 'STANDARD CROWDED ITINERARY'}
          </div>
          <h3 class="card-title">${this.locationData.name} Day Schedule</h3>
        </div>
        <span class="badge ${this.isRerouted ? 'badge-optimal' : 'badge-critical'}">
          ${this.isRerouted ? 'BALANCED FLOW' : 'HIGH CONGESTION'}
        </span>
      </div>

      <div class="timeline-container">
        ${items.map((item, idx) => `
          <div class="timeline-node">
            <div class="timeline-time">${times[idx]}</div>
            <div class="timeline-name">${item.name}</div>
            <div class="timeline-wait" style="color: ${item.status === 'critical' ? 'var(--load-critical)' : 'var(--load-optimal)'}">
              ${item.waitTimeMinutes}m wait (${item.loadPercentage}% load)
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  attachRerouteButton() {
    const btn = document.getElementById('reroute-trigger-btn');
    if (!btn) return;

    btn.onclick = () => {
      this.isRerouted = !this.isRerouted;
      btn.innerHTML = this.isRerouted 
        ? '<span>✓ REROUTE ACTIVE (RESET)</span>' 
        : '<span>⚡ REROUTE MY DAY</span>';
      
      this.renderHealthBar();
      this.renderItinerary();
      if (this.map) {
        this.map.setRerouteState(this.isRerouted);
      }
    };
  }
}
