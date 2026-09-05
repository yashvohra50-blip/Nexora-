/**
 * ROAM Interactive Destination Load Map
 * Vector SVG Canvas with dynamic nodes, radar pulses & demand flow vectors
 */

import { JAIPUR_DESTINATION } from '../data/jaipur.js';

export class DestinationLoadMap {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.attractions = JAIPUR_DESTINATION.attractions;
    this.currentFilter = 'all'; // 'all' | 'critical' | 'optimal'
    this.onNodeClick = options.onNodeClick || null;
    this.showFlowVectors = true;
    this.activeReroute = false;
    this.init();
  }

  init() {
    if (!this.container) return;
    this.render();
    this.attachEvents();
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
    const width = 860;
    const height = 620;

    let filteredNodes = this.attractions;
    if (this.currentFilter === 'critical') {
      filteredNodes = this.attractions.filter(a => a.status === 'critical' || a.status === 'elevated');
    } else if (this.currentFilter === 'optimal') {
      filteredNodes = this.attractions.filter(a => a.status === 'optimal');
    }

    // Generate flow vectors connecting overloaded nodes to alternative nodes
    const flowVectors = [
      { from: 'amber-fort', to: 'albert-hall', color: '#8b5cf6' },
      { from: 'amber-fort', to: 'panna-meena', color: '#10b981' },
      { from: 'hawa-mahal', to: 'royal-gaitor', color: '#10b981' },
      { from: 'city-palace', to: 'sisodia-rani', color: '#10b981' },
      { from: 'jantar-mantar', to: 'anokhi-museum', color: '#8b5cf6' }
    ];

    let svgHtml = `
      <svg class="map-svg" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <!-- Radial glow gradients -->
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

        <!-- Background Coordinate Grid lines -->
        <g class="map-grid">
          ${Array.from({ length: 12 }).map((_, i) => `
            <line x1="${i * 80}" y1="0" x2="${i * 80}" y2="${height}" class="map-grid-line" />
            <line x1="0" y1="${i * 60}" x2="${width}" y2="${i * 60}" class="map-grid-line" />
          `).join('')}
        </g>

        <!-- Topography / Aravalli Ridge Silhouettes -->
        <path d="M 280,60 Q 420,160 380,310 T 360,540" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="18" stroke-linecap="round" />
        <path d="M 640,90 Q 720,280 660,510" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="14" stroke-linecap="round" />

        <!-- Demand Flow Vectors (Arrows & dashed animations) -->
        <g class="demand-vectors">
          ${flowVectors.map(vec => {
            const src = this.attractions.find(a => a.id === vec.from);
            const dst = this.attractions.find(a => a.id === vec.to);
            if (!src || !dst) return '';

            // Curved quadratic Bezier control point
            const midX = (src.coords.x + dst.coords.x) / 2 + (src.coords.y < dst.coords.y ? -40 : 40);
            const midY = (src.coords.y + dst.coords.y) / 2;

            return `
              <g opacity="${this.showFlowVectors ? '0.85' : '0.2'}">
                <path d="M ${src.coords.x},${src.coords.y} Q ${midX},${midY} ${dst.coords.x},${dst.coords.y}" 
                      fill="none" 
                      stroke="${vec.color}" 
                      stroke-width="${this.activeReroute ? '2.5' : '1.8'}" 
                      class="demand-flow-vector" />
                <circle cx="${midX}" cy="${midY}" r="3" fill="${vec.color}" opacity="0.8" />
              </g>
            `;
          }).join('')}
        </g>

        <!-- Attraction Nodes -->
        <g class="map-nodes">
          ${filteredNodes.map(node => {
            const isCrit = node.status === 'critical';
            const isElev = node.status === 'elevated';
            const color = isCrit ? '#ef4444' : isElev ? '#f59e0b' : '#10b981';
            const glowId = isCrit ? 'glow-critical' : isElev ? 'glow-elevated' : 'glow-optimal';
            const radius = isCrit ? 14 : isElev ? 12 : 10;

            return `
              <g class="map-node-group" data-id="${node.id}" transform="translate(${node.coords.x}, ${node.coords.y})">
                <!-- Outer Ambient Glow -->
                <circle cx="0" cy="0" r="${radius * 2.8}" fill="url(#${glowId})" />

                <!-- Radar Pulse for critical & elevated nodes -->
                ${isCrit ? `<circle cx="0" cy="0" r="14" fill="none" stroke="#ef4444" class="radar-ring-critical" />` : ''}
                ${isElev ? `<circle cx="0" cy="0" r="12" fill="none" stroke="#f59e0b" class="radar-ring-elevated" />` : ''}

                <!-- Base Node Circle -->
                <circle cx="0" cy="0" r="${radius}" fill="#0d131f" stroke="${color}" stroke-width="2.5" />
                <circle cx="0" cy="0" r="${radius - 4}" fill="${color}" />

                <!-- Load percentage badge label -->
                <rect x="18" y="-12" width="48" height="20" rx="4" fill="#0c121e" stroke="${color}" stroke-width="1" opacity="0.95" />
                <text x="42" y="2" fill="${color}" font-size="10" font-family="monospace" font-weight="700" text-anchor="middle" dominant-baseline="middle">
                  ${node.loadPercentage}%
                </text>

                <!-- Name Label -->
                <text x="18" y="-18" fill="#f8fafc" font-size="11" font-weight="700" letter-spacing="0.02em" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.9))">
                  ${node.name}
                </text>
              </g>
            `;
          }).join('')}
        </g>
      </svg>
      <div id="map-tooltip" class="map-node-tooltip"></div>
    `;

    this.container.innerHTML = svgHtml;
    this.attachNodeListeners();
  }

  attachEvents() {
    // Filter controls
    const filterBtns = document.querySelectorAll('.map-filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        filterBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        this.setFilter(e.target.dataset.filter);
      });
    });
  }

  attachNodeListeners() {
    const tooltip = this.container.querySelector('#map-tooltip');
    const nodes = this.container.querySelectorAll('.map-node-group');

    nodes.forEach(nodeGroup => {
      const id = nodeGroup.dataset.id;
      const attraction = this.attractions.find(a => a.id === id);
      if (!attraction) return;

      nodeGroup.addEventListener('mouseenter', (e) => {
        if (!tooltip) return;
        const rect = this.container.getBoundingClientRect();
        tooltip.style.display = 'block';
        tooltip.style.left = `${attraction.coords.x}px`;
        tooltip.style.top = `${attraction.coords.y - 10}px`;
        tooltip.innerHTML = `
          <div style="font-weight:700; color:#fff; font-size:0.9rem;">${attraction.name}</div>
          <div style="color:var(--text-muted); font-size:0.75rem; text-transform:uppercase;">${attraction.category} • ${attraction.openHours}</div>
          <div style="margin-top:4px; display:flex; gap:10px; font-family:monospace; font-size:0.8rem;">
            <span style="color:${attraction.status === 'critical' ? '#ef4444' : attraction.status === 'elevated' ? '#f59e0b' : '#10b981'}; font-weight:700;">
              Load: ${attraction.loadPercentage}%
            </span>
            <span>Wait: ${attraction.currentWaitMinutes} min</span>
            <span>Fee: ₹${attraction.entryFeeINR}</span>
          </div>
        `;
      });

      nodeGroup.addEventListener('mouseleave', () => {
        if (tooltip) tooltip.style.display = 'none';
      });

      nodeGroup.addEventListener('click', () => {
        if (typeof this.onNodeClick === 'function') {
          this.onNodeClick(attraction);
        }
      });
    });
  }
}
