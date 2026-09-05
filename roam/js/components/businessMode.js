/**
 * ROAM Local Business Intelligence Mode
 * Real-time Footfall Telemetry & Demand Pulse Dispatcher
 */

import { JAIPUR_DESTINATION } from '../data/jaipur.js';

export class BusinessModeController {
  constructor() {
    this.businesses = JAIPUR_DESTINATION.localBusinesses;
    this.activeBizId = this.businesses[0].id;
    this.pulseActive = false;
    this.init();
  }

  init() {
    this.render();
  }

  render() {
    const container = document.getElementById('business-mode-container');
    if (!container) return;

    const currentBiz = this.businesses.find(b => b.id === this.activeBizId) || this.businesses[0];

    container.innerHTML = `
      <!-- Business Selector Chips -->
      <div class="biz-selector-bar">
        ${this.businesses.map(biz => `
          <button class="biz-select-chip ${biz.id === this.activeBizId ? 'active' : ''}" data-id="${biz.id}">
            🏪 ${biz.name}
          </button>
        `).join('')}
      </div>

      <div class="biz-dashboard-grid">
        <!-- Left: Local Business Telemetry -->
        <div class="card">
          <div class="card-header">
            <div>
              <div style="font-size:0.75rem; text-transform:uppercase; color:var(--brand-cyan); font-weight:700;">
                ${currentBiz.zone}
              </div>
              <h3 class="card-title" style="margin-top:2px;">${currentBiz.name}</h3>
              <div style="font-size:0.85rem; color:var(--text-secondary); margin-top:2px;">
                Managed by ${currentBiz.owner}
              </div>
            </div>
            <span class="badge badge-optimal">⭐ ${currentBiz.rating} (${currentBiz.reviewsCount} reviews)</span>
          </div>

          <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:12px; margin: 16px 0;">
            <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-subtle); padding:10px; border-radius:6px; text-align:center;">
              <div style="font-size:1.4rem; font-weight:800; font-family:var(--font-mono); color:var(--brand-cyan);">
                ${this.pulseActive ? '+32%' : '↑ 18%'}
              </div>
              <div style="font-size:0.7rem; text-transform:uppercase; color:var(--text-muted); font-weight:600;">Nearby Footfall Activity</div>
            </div>
            <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-subtle); padding:10px; border-radius:6px; text-align:center;">
              <div style="font-size:1.4rem; font-weight:800; font-family:var(--font-mono); color:#fff;">
                ${currentBiz.touristsNearby.toLocaleString()}
              </div>
              <div style="font-size:0.7rem; text-transform:uppercase; color:var(--text-muted); font-weight:600;">Tourists in 2km Radius</div>
            </div>
            <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-subtle); padding:10px; border-radius:6px; text-align:center;">
              <div style="font-size:1.4rem; font-weight:800; font-family:var(--font-mono); color:var(--load-optimal);">
                +${this.pulseActive ? currentBiz.potentialVisitorsToday + 120 : currentBiz.potentialVisitorsToday}
              </div>
              <div style="font-size:0.7rem; text-transform:uppercase; color:var(--text-muted); font-weight:600;">Potential Visitors Today</div>
            </div>
          </div>

          <!-- Distribution Skew Bar -->
          <div style="margin-top:16px;">
            <div style="display:flex; justify-content:space-between; font-size:0.78rem; margin-bottom:6px;">
              <span>Congested Monument Zone: <strong>${currentBiz.popularZoneSharePct}%</strong></span>
              <span style="color:var(--brand-cyan);">Your Heritage Sector: <strong>${this.pulseActive ? currentBiz.currentZoneSharePct + 14 : currentBiz.currentZoneSharePct}%</strong></span>
            </div>
            <div class="health-meter-track" style="height:8px; display:flex;">
              <div style="width:${currentBiz.popularZoneSharePct}%; background:var(--load-critical); height:100%;"></div>
              <div style="width:${this.pulseActive ? currentBiz.currentZoneSharePct + 14 : currentBiz.currentZoneSharePct}%; background:var(--brand-cyan); height:100%;"></div>
            </div>
          </div>

          <div style="margin-top:16px; font-size:0.85rem; color:var(--text-secondary);">
            <strong>Artisan Specialty:</strong> ${currentBiz.specialty} • <strong>Price Range:</strong> ${currentBiz.priceRange}
          </div>
        </div>

        <!-- Right: Opportunity Detection & Redirection Action -->
        <div class="opportunity-card">
          <div class="opportunity-badge">
            ⚡ Live Demand Opportunity Detected
          </div>
          <h3 class="opportunity-title">Surge Concentration ${currentBiz.distanceToHotspotKm} km Away</h3>
          <p style="color:#cbd5e1; font-size:0.95rem; line-height:1.55;">
            ${currentBiz.opportunityText}
          </p>

          <div style="margin-top:16px; padding:12px; background:rgba(0,0,0,0.3); border-radius:8px; border:1px solid rgba(6,182,212,0.2);">
            <div style="font-size:0.75rem; text-transform:uppercase; color:var(--brand-cyan); font-weight:700;">Recommended ROAM Action:</div>
            <div style="font-size:0.88rem; color:#fff; margin-top:4px;">
              ${currentBiz.recommendedAction}
            </div>
          </div>

          <button id="pulse-promo-btn" class="pulse-promo-btn">
            ${this.pulseActive 
              ? '✓ PULSE ACTIVE: REDIRECTING QUEUE-WEARY TOURISTS' 
              : '⚡ ACTIVATE REDIRECTION PULSE PROMOTION'
            }
          </button>
          
          <div style="font-size:0.72rem; color:var(--text-muted); text-align:center; margin-top:8px; font-family:var(--font-mono);">
            ${this.pulseActive 
              ? 'Broadcasting curated craft tokens to 340 tourists within 15-minute walking distance'
              : 'Dispatches non-intrusive alternative recommendations to travelers queued nearby'
            }
          </div>
        </div>
      </div>
    `;

    this.attachEvents();
  }

  attachEvents() {
    const chips = document.querySelectorAll('.biz-select-chip');
    chips.forEach(chip => {
      chip.addEventListener('click', (e) => {
        this.activeBizId = e.currentTarget.dataset.id;
        this.pulseActive = false;
        this.render();
      });
    });

    const pulseBtn = document.getElementById('pulse-promo-btn');
    if (pulseBtn) {
      pulseBtn.addEventListener('click', () => {
        this.pulseActive = !this.pulseActive;
        this.render();
      });
    }
  }
}
