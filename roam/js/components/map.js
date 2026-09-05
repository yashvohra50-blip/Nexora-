/**
 * ROAM Interactive Destination Load Map
 * Vector SVG Canvas with dynamic nodes, radar pulses & demand flow vectors
 * Supports any active Indian destination or graceful partial overview
 */

export class DestinationLoadMap {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.locationData = null;
    this.attractions = [];
    this.flowVectors = [];
    this.currentFilter = 'all'; // 'all' | 'critical' | 'optimal'
    this.onNodeClick = options.onNodeClick || null;
    this.showFlowVectors = true;
    this.activeReroute = false;
  }

  setDestination(locationData) {
    this.locationData = locationData;
    this.attractions = locationData.attractions || [];
    this.flowVectors = locationData.flowVectors || [
      { from: this.attractions[0]?.id, to: this.attractions[2]?.id, color: '#8b5cf6' },
      { from: this.attractions[1]?.id, to: this.attractions[3]?.id, color: '#10b981' }
    ].filter(v => v.from && v.to);
    this.render();
  }

  setFilter(filter) {
    this.currentFilter = filter;
    this.render();
  }

  setRerouteState(active) {
    this.activeReroute = active;
    this.render();
  }

  render() {
    if (!this.container) return;

    // Graceful Partial Intelligence fallback on map
    if (!this.locationData || this.locationData.intelligenceTier === 'PARTIAL') {
      this.renderPartialMap();
      return;
    }

    const width = 860;
    const height = 620;

    let filteredNodes = this.attractions;
    if (this.currentFilter === 'critical') {
      filteredNodes = this.attractions.filter(a => a.status === 'critical' || a.status === 'elevated');
    } else if (this.currentFilter === 'optimal') {
      filteredNodes = this.attractions.filter(a => a.status === 'optimal');
    }

    let svgHtml = `
      <svg class="map-svg" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="glow-critical" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#ef4444" stop-opacity="0.45" />
            <stop offset="100%" stop-color="#ef4444" stop-opacity="0" />
          </radialGradient>
          <radialGradient id="glow-optimal" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#10b981" stop-opacity="0.4" />
            <stop offset="100%" stop-color="#10b981" stop-opacity="0" />
          </radialGradient>
          <radialGradient id="glow-elevated" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.4" />
            <stop offset="100%" stop-color="#f59e0b" stop-opacity="0" />
          </radialGradient>
        </defs>

        <!-- Coordinate Grid -->
        <g class="map-grid">
          ${Array.from({ length: 12 }).map((_, i) => `
            <line x1="${i * 80}" y1="0" x2="${i * 80}" y2="${height}" class="map-grid-line" />
            <line x1="0" y1="${i * 60}" x2="${width}" y2="${i * 60}" class="map-grid-line" />
          `).join('')}
        </g>

        <!-- Dynamic Natural Topography Contours -->
        <path d="M 180,80 Q 320,180 340,330 T 400,560" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="20" stroke-linecap="round" />
        <path d="M 600,100 Q 680,290 620,530" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="16" stroke-linecap="round" />

        <!-- Demand Flow Vectors -->
        <g class="demand-vectors">
          ${this.flowVectors.map(vec => {
            const src = this.attractions.find(a => a.id === vec.from);
            const dst = this.attractions.find(a => a.id === vec.to);
            if (!src || !dst) return '';

            const midX = (src.coords.x + dst.coords.x) / 2 + (src.coords.y < dst.coords.y ? -35 : 35);
            const midY = (src.coords.y + dst.coords.y) / 2;

            return `
              <g opacity="${this.showFlowVectors ? '0.85' : '0.2'}">
                <path d="M ${src.coords.x},${src.coords.y} Q ${midX},${midY} ${dst.coords.x},${dst.coords.y}" 
                      fill="none" 
                      stroke="${vec.color}" 
                      stroke-width="2.5" 
                      stroke-dasharray="6,4" 
                      class="flow-path-animated" />
                <circle cx="${dst.coords.x}" cy="${dst.coords.y}" r="4" fill="${vec.color}" />
              </g>
            `;
          }).join('')}
        </g>

        <!-- Attraction Nodes -->
        <g class="map-nodes">
          ${filteredNodes.map(att => {
            const isCritical = att.status === 'critical';
            const isElevated = att.status === 'elevated';
            const isOptimal = att.status === 'optimal';
            
            const color = isCritical ? '#ef4444' : isElevated ? '#f59e0b' : '#10b981';
            const glowId = isCritical ? 'glow-critical' : isElevated ? 'glow-elevated' : 'glow-optimal';
            const radius = isCritical ? 24 : isElevated ? 20 : 16;

            return `
              <g class="map-node ${isCritical ? 'node-pulse' : ''}" 
                 data-id="${att.id}" 
                 style="cursor:pointer;"
                 transform="translate(${att.coords.x}, ${att.coords.y})">
                
                <circle r="${radius * 2.2}" fill="url(#${glowId})" />
                <circle r="${radius}" fill="#0c121e" stroke="${color}" stroke-width="2.5" />
                <text y="4" text-anchor="middle" fill="#fff" font-size="11" font-weight="800" font-family="var(--font-mono)">
                  ${att.loadPercentage}%
                </text>

                <!-- Label Badge -->
                <g transform="translate(0, ${radius + 16})">
                  <rect x="-65" y="-12" width="130" height="24" rx="4" fill="rgba(12, 18, 30, 0.9)" stroke="${color}" stroke-width="1" />
                  <text y="3" text-anchor="middle" fill="#f8fafc" font-size="10.5" font-weight="700" font-family="var(--font-sans)">
                    ${att.name.length > 17 ? att.name.substring(0, 16) + '…' : att.name}
                  </text>
                </g>
              </g>
            `;
          }).join('')}
        </g>
      </svg>
    `;

    this.container.innerHTML = svgHtml;
    this.attachNodeClickEvents();
  }

  renderPartialMap() {
    const loc = this.locationData;
    this.container.innerHTML = `
      <div style="height:100%; min-height:480px; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:var(--space-xl); text-align:center; background:radial-gradient(circle at center, rgba(245, 158, 11, 0.06) 0%, transparent 70%);">
        <span style="font-size:2.8rem; margin-bottom:12px;">🧭</span>
        <span class="partial-badge">REGIONAL CLUSTER MAPPING ACTIVE</span>
        <h3 style="font-size:1.6rem; font-weight:800; color:#fff; margin-bottom:6px;">${loc.name} Demand Telemetry</h3>
        <p style="color:var(--text-secondary); max-width:560px; font-size:0.9rem; line-height:1.5; margin-bottom:16px;">
          Sensor array and grassroots merchant onboarding are underway in the ${loc.district || loc.state} corridor. Live crowd redistribution will link directly to nearby regional hub: <strong style="color:var(--roam-accent)">${loc.nearbyHub || 'Jaipur'}</strong>.
        </p>
        <div style="display:flex; gap:10px; font-family:var(--font-mono); font-size:0.78rem; color:var(--text-muted);">
          <span>COORDINATES: ${loc.coords?.lat || 26.48}° N, ${loc.coords?.lng || 74.55}° E</span>
          <span>•</span>
          <span>HERITAGE SITES MONITORED: ${(loc.heritagePoints || []).length || 3}</span>
        </div>
      </div>
    `;
  }

  attachNodeClickEvents() {
    const nodes = this.container.querySelectorAll('.map-node');
    nodes.forEach(node => {
      node.addEventListener('click', () => {
        const id = node.dataset.id;
        const attraction = this.attractions.find(a => a.id === id);
        if (attraction && this.onNodeClick) {
          this.onNodeClick(attraction);
        }
      });
    });
  }
}
