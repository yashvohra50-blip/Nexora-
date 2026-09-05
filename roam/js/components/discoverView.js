/**
 * ROAM Discover View Component
 * Interactive Regional Explorer for India: North, South, West, East, Northeast
 */

import { ALL_INDIAN_LOCATIONS } from '../data/locations/index.js';

export class DiscoverViewController {
  constructor(mountId, options = {}) {
    this.mount = document.getElementById(mountId);
    this.onSelectLocation = options.onSelectLocation || (() => {});
    this.activeFilter = 'ALL';
    this.init();
  }

  init() {
    if (!this.mount) return;
    this.render();
  }

  setFilter(region) {
    this.activeFilter = region;
    this.render();
  }

  render() {
    let filtered = ALL_INDIAN_LOCATIONS;
    if (this.activeFilter !== 'ALL') {
      filtered = ALL_INDIAN_LOCATIONS.filter(l => l.region === this.activeFilter);
    }

    this.mount.innerHTML = `
      <div style="margin-bottom: var(--space-xl);">
        <div style="font-size:0.75rem; text-transform:uppercase; color:var(--roam-accent); font-weight:800; letter-spacing:0.12em; margin-bottom:4px;">
          National Destination Network
        </div>
        <h2 style="font-size:2rem; font-weight:900; color:#fff; letter-spacing:-0.02em;">REGIONAL INDIA EXPLORER</h2>
        <p style="color:var(--text-secondary); max-width:720px; margin-top:4px;">
          Explore live tourism demand telemetry, cultural DNA, and spatial dispersion across India's premier destinations, historic towns, and artisan villages.
        </p>
      </div>

      <!-- Regional Filter Tabs -->
      <div class="discover-filter-bar">
        ${['ALL', 'NORTH', 'SOUTH', 'WEST', 'EAST', 'NORTHEAST'].map(reg => `
          <button class="discover-filter-btn ${this.activeFilter === reg ? 'active' : ''}" data-region="${reg}">
            ${reg === 'ALL' ? 'All Regions (India)' : reg + ' India'}
          </button>
        `).join('')}
      </div>

      <!-- Grid of Indian Destinations -->
      <div class="discover-cards-grid">
        ${filtered.map(loc => {
          const isFull = loc.tier === 'FULL';
          const typeClass = 'type-' + loc.type.toLowerCase();

          return `
            <div class="discover-card">
              <div>
                <div class="discover-card-top">
                  <div>
                    <div class="discover-city-name">${loc.name}</div>
                    <div class="discover-state-name">${loc.state} • ${loc.region}</div>
                  </div>
                  <span class="res-badge ${typeClass}">${loc.type.replace('_', ' ')}</span>
                </div>

                <div style="margin-top:6px;">
                  ${isFull 
                    ? '<span class="badge badge-optimal">✓ FULL TELEMETRY</span>'
                    : '<span class="badge badge-elevated">PARTIAL INTELLIGENCE</span>'
                  }
                </div>

                <div class="discover-tagline">
                  Tags: ${loc.tags.slice(0, 3).join(' • ')}
                </div>
              </div>

              <button class="discover-action-btn" data-id="${loc.id}">
                <span>EXPLORE DEMAND FLOWS ➔</span>
              </button>
            </div>
          `;
        }).join('')}
      </div>
    `;

    this.attachEvents();
  }

  attachEvents() {
    this.mount.querySelectorAll('.discover-filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.setFilter(e.currentTarget.dataset.region);
      });
    });

    this.mount.querySelectorAll('.discover-action-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        this.onSelectLocation(id);
      });
    });
  }
}
