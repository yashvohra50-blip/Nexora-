/**
 * ROAM Local Business Intelligence Mode (Market View)
 * Real-time Footfall Telemetry & Demand Pulse Dispatcher
 * Adapts to active Indian destination
 */

export class BusinessModeController {
  constructor() {
    this.locationData = null;
    this.businesses = [];
    this.activeBizId = null;
    this.pulseActive = false;
  }

  setDestination(locationData) {
    this.locationData = locationData;
    this.businesses = locationData.businesses || locationData.localBusinesses || [];
    this.activeBizId = this.businesses[0]?.id || null;
    this.pulseActive = false;
    this.render();
  }

  render() {
    const container = document.getElementById('business-mode-container');
    if (!container) return;

    if (!this.locationData || this.locationData.intelligenceTier === 'PARTIAL' || this.businesses.length === 0) {
      container.innerHTML = `
        <div class="partial-intelligence-card">
          <span class="partial-badge">LOCAL MERCHANT NETWORK EXPANSION</span>
          <h3 class="partial-title">Grassroots Merchant Onboarding in ${this.locationData?.name || 'this District'}</h3>
          <p class="partial-sub">
            ROAM is currently cataloging local artisan guilds, heritage eateries, and handloom cooperatives in this zone to receive footfall diversions when nearby monuments bottleneck.
          </p>
        </div>
      `;
      return;
    }

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
                ${this.pulseActive ? '+34%' : '↑ 18%'}
              </div>
              <div style="font-size:0.7rem; text-transform:uppercase; color:var(--text-muted); font-weight:600;">Nearby Footfall</div>
            </div>
            <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-subtle); padding:10px; border-radius:6px; text-align:center;">
              <div style="font-size:1.4rem; font-weight:800; font-family:var(--font-mono); color:#fff;">
                ${currentBiz.touristsNearby.toLocaleString()}
              </div>
              <div style="font-size:0.7rem; text-transform:uppercase; color:var(--text-muted); font-weight:600;">Tourists Within 1km</div>
            </div>
            <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-subtle); padding:10px; border-radius:6px; text-align:center;">
              <div style="font-size:1.4rem; font-weight:800; font-family:var(--font-mono); color:var(--load-optimal);">
                ${this.pulseActive ? currentBiz.potentialVisitorsToday + 120 : currentBiz.potentialVisitorsToday}
              </div>
              <div style="font-size:0.7rem; text-transform:uppercase; color:var(--text-muted); font-weight:600;">Potential Visitors</div>
            </div>
          </div>

          <div style="margin-top:14px; font-size:0.85rem; color:var(--text-secondary); line-height:1.5;">
            <strong>Specialty:</strong> ${currentBiz.specialty}<br/>
            <strong>Average Spend:</strong> ${currentBiz.priceRange}
          </div>
        </div>

        <!-- Right: Demand Opportunity & ROAM Pulse Dispatch -->
        <div class="card" style="border-color:var(--brand-cyan);">
          <div class="card-header">
            <div>
              <div style="font-size:0.75rem; text-transform:uppercase; color:var(--brand-cyan); font-weight:700;">
                Spillover Optimization Engine
              </div>
              <h3 class="card-title">Footfall Capture Opportunity</h3>
            </div>
            <span class="badge" style="background:rgba(6,182,212,0.15); color:var(--brand-cyan); border:1px solid rgba(6,182,212,0.3);">
              HIGH POTENTIAL
            </span>
          </div>

          <div style="background:rgba(6,182,212,0.05); border-left:3px solid var(--brand-cyan); padding:14px; border-radius:0 6px 6px 0; margin-bottom:16px;">
            <p style="font-size:0.88rem; color:#e0f2fe; line-height:1.5;">
              ${currentBiz.opportunityText}
            </p>
          </div>

          <div style="margin-bottom:16px;">
            <div style="font-size:0.75rem; text-transform:uppercase; color:var(--text-muted); font-weight:700; margin-bottom:4px;">
              RECOMMENDED INTERVENTION
            </div>
            <div style="font-size:0.85rem; color:var(--text-primary); font-weight:600;">
              ${currentBiz.recommendedAction}
            </div>
          </div>

          <button id="dispatch-pulse-btn" class="reroute-btn" style="width:100%; justify-content:center; background:linear-gradient(135deg, var(--brand-cyan), #0284c7);">
            <span>${this.pulseActive ? '✓ ROAM CRAFT PASS ACTIVE' : '⚡ DISPATCH ROAM CRAFT PASS'}</span>
          </button>
        </div>
      </div>
    `;

    this.attachEvents();
  }

  attachEvents() {
    const container = document.getElementById('business-mode-container');
    if (!container) return;

    container.querySelectorAll('.biz-select-chip').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.activeBizId = e.currentTarget.dataset.id;
        this.render();
      });
    });

    const pulseBtn = document.getElementById('dispatch-pulse-btn');
    if (pulseBtn) {
      pulseBtn.addEventListener('click', () => {
        this.pulseActive = !this.pulseActive;
        this.render();
      });
    }
  }
}
