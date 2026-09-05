/**
 * ROAM Tourist Mode Component
 * Destination Health Telemetry, Alternative Recommendations, and Dynamic Rerouting
 */

import { JAIPUR_DESTINATION } from '../data/jaipur.js';
import { scoreAlternative, findBestAlternatives } from '../engine/scoring.js';
import { INITIAL_ITINERARY, REROUTED_ITINERARY, calculateRerouteImpact } from '../engine/router.js';

export class TouristModeController {
  constructor(mapInstance) {
    this.map = mapInstance;
    this.isRerouted = false;
    this.init();
  }

  init() {
    this.renderHealthBar();
    this.renderRecommendations();
    this.renderItinerary();
    this.attachRerouteButton();
  }

  renderHealthBar() {
    const metrics = JAIPUR_DESTINATION.metrics;
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
            ${this.isRerouted ? 'Balanced Flow' : 'Top 3 Monuments'}
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
          <span class="badge badge-optimal">HIGH (4 ACTIVE HUBS)</span>
        </div>
      </div>
    `;
  }

  renderRecommendations() {
    const stack = document.getElementById('recommendations-stack');
    if (!stack) return;

    const amberFort = JAIPUR_DESTINATION.attractions.find(a => a.id === 'amber-fort');
    const hawaMahal = JAIPUR_DESTINATION.attractions.find(a => a.id === 'hawa-mahal');
    const albertHall = JAIPUR_DESTINATION.attractions.find(a => a.id === 'albert-hall');
    const royalGaitor = JAIPUR_DESTINATION.attractions.find(a => a.id === 'royal-gaitor');

    const scoreAlbert = scoreAlternative(albertHall, amberFort, { priority: 'culture' });
    const scoreGaitor = scoreAlternative(royalGaitor, hawaMahal, { priority: 'culture' });

    stack.innerHTML = `
      <!-- Recommendation Card 1 -->
      <div class="alternative-card">
        <div class="alt-pair-header">
          <div>
            <div class="alt-site-category">Curated Demand Surrogate</div>
            <div class="alt-site-name">${albertHall.name}</div>
          </div>
          <span class="badge badge-optimal">${albertHall.loadPercentage}% Load (Optimal)</span>
        </div>

        <div class="alt-comparison-row">
          <div class="comparison-from">
            Amber Fort: <strong>94%</strong> (65m wait)
          </div>
          <div style="color:var(--text-muted); font-size:1rem;">➔</div>
          <div class="comparison-to">
            Albert Hall: <strong>34%</strong> (0m wait)
          </div>
        </div>

        <div class="alt-reasoning-box">
          <strong>Why this recommendation?</strong><br>
          ${scoreAlbert.reasoning}
        </div>

        <div class="breakdown-bars">
          <div class="breakdown-bar-item">
            <span>Cultural Match: ${scoreAlbert.breakdown.preferenceMatch}%</span>
            <div class="breakdown-bar-fill" style="width:${scoreAlbert.breakdown.preferenceMatch}%"></div>
          </div>
          <div class="breakdown-bar-item">
            <span>Crowd Relief: ${scoreAlbert.breakdown.crowdingReduction}%</span>
            <div class="breakdown-bar-fill" style="width:${scoreAlbert.breakdown.crowdingReduction}%; background:var(--load-optimal);"></div>
          </div>
          <div class="breakdown-bar-item">
            <span>Local Benefit: ${scoreAlbert.breakdown.localOpportunity}%</span>
            <div class="breakdown-bar-fill" style="width:${scoreAlbert.breakdown.localOpportunity}%; background:var(--brand-cyan);"></div>
          </div>
        </div>
      </div>

      <!-- Recommendation Card 2 -->
      <div class="alternative-card">
        <div class="alt-pair-header">
          <div>
            <div class="alt-site-category">Tranquil Heritage Alternative</div>
            <div class="alt-site-name">${royalGaitor.name}</div>
          </div>
          <span class="badge badge-optimal">${royalGaitor.loadPercentage}% Load (Optimal)</span>
        </div>

        <div class="alt-comparison-row">
          <div class="comparison-from">
            Hawa Mahal: <strong>91%</strong> (45m wait)
          </div>
          <div style="color:var(--text-muted); font-size:1rem;">➔</div>
          <div class="comparison-to">
            Royal Gaitor: <strong>26%</strong> (0m wait)
          </div>
        </div>

        <div class="alt-reasoning-box">
          <strong>Why this recommendation?</strong><br>
          ${scoreGaitor.reasoning}
        </div>

        <div class="breakdown-bars">
          <div class="breakdown-bar-item">
            <span>Cultural Match: ${scoreGaitor.breakdown.preferenceMatch}%</span>
            <div class="breakdown-bar-fill" style="width:${scoreGaitor.breakdown.preferenceMatch}%"></div>
          </div>
          <div class="breakdown-bar-item">
            <span>Crowd Relief: ${scoreGaitor.breakdown.crowdingReduction}%</span>
            <div class="breakdown-bar-fill" style="width:${scoreGaitor.breakdown.crowdingReduction}%; background:var(--load-optimal);"></div>
          </div>
          <div class="breakdown-bar-item">
            <span>Local Benefit: ${scoreGaitor.breakdown.localOpportunity}%</span>
            <div class="breakdown-bar-fill" style="width:${scoreGaitor.breakdown.localOpportunity}%; background:var(--brand-cyan);"></div>
          </div>
        </div>
      </div>
    `;
  }

  renderItinerary() {
    const container = document.getElementById('itinerary-container');
    if (!container) return;

    const list = this.isRerouted ? REROUTED_ITINERARY : INITIAL_ITINERARY;
    const impact = calculateRerouteImpact(INITIAL_ITINERARY, REROUTED_ITINERARY);

    container.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
        <span style="font-weight:700; font-size:0.95rem; color:#fff;">
          ${this.isRerouted ? '⚡ ROAM Demand-Optimized Schedule' : '⚠ Standard Tourist Schedule (Congested)'}
        </span>
        <span class="badge ${this.isRerouted ? 'badge-optimal' : 'badge-critical'}">
          ${this.isRerouted ? '36% LOWER CROWD EXPOSURE' : 'PEAK CONGESTION DETECTED'}
        </span>
      </div>

      <div class="itinerary-timeline">
        ${list.map(item => {
          const attraction = item.attractionId ? JAIPUR_DESTINATION.attractions.find(a => a.id === item.attractionId) : null;
          const name = attraction ? attraction.name : item.title;
          const isCongested = item.crowdPct > 70;

          return `
            <div class="timeline-row ${isCongested ? 'congested' : 'optimized'}">
              <div style="font-family:var(--font-mono); font-size:0.8rem; color:var(--text-muted);">
                ${item.time}
              </div>
              <div>
                <div style="font-weight:700; color:#fff;">${name}</div>
                <div style="font-size:0.75rem; color:var(--text-secondary); margin-top:2px;">
                  ${item.note}
                </div>
              </div>
              <div style="text-align:right;">
                <span class="badge ${isCongested ? 'badge-critical' : 'badge-optimal'}">
                  ${item.crowdPct}% Load
                </span>
                <div style="font-size:0.72rem; color:var(--text-muted); margin-top:3px; font-family:var(--font-mono);">
                  Wait: ${item.waitMin}m • ₹${item.costINR}
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      ${this.isRerouted ? `
        <div class="impact-metrics-grid">
          <div class="impact-metric-pill">
            <div class="impact-metric-val">${impact.timeSavedMin} min</div>
            <div class="impact-metric-lbl">Queue Time Saved</div>
          </div>
          <div class="impact-metric-pill">
            <div class="impact-metric-val">₹${impact.costSavedINR}</div>
            <div class="impact-metric-lbl">Direct Cost Saved</div>
          </div>
          <div class="impact-metric-pill">
            <div class="impact-metric-val">${impact.crowdingExposureReductionPct}%</div>
            <div class="impact-metric-lbl">Crowd Exposure Reduced</div>
          </div>
          <div class="impact-metric-pill">
            <div class="impact-metric-val">+${impact.localPartnersSupported}</div>
            <div class="impact-metric-lbl">Local Guilds Supported</div>
          </div>
        </div>
      ` : ''}
    `;
  }

  attachRerouteButton() {
    const btn = document.getElementById('reroute-trigger-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      this.isRerouted = !this.isRerouted;
      btn.innerHTML = this.isRerouted 
        ? '<span>↺ RESTORE ORIGINAL PATH</span>'
        : '<span>⚡ REROUTE MY DAY</span>';
      
      this.renderHealthBar();
      this.renderItinerary();
      if (this.map) {
        this.map.setRerouteState(this.isRerouted);
      }
    });
  }
}
