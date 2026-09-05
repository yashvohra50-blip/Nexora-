/**
 * ROAM Spatial Search Bar & Autocomplete Component
 * "WHERE ARE YOU GOING?"
 * Filters 100% India-Only Locations: Cities, Towns, Villages, Rural Areas, Tourist Sites
 */

import { ALL_INDIAN_LOCATIONS } from '../data/locations/index.js';

export class SearchBarController {
  constructor(options = {}) {
    this.container = document.getElementById('spatial-search-mount');
    this.onSelectLocation = options.onSelectLocation || (() => {});
    this.activeLocationId = 'jaipur';
    this.init();
  }

  init() {
    if (!this.container) return;
    this.render();
    this.attachEvents();
  }

  render() {
    this.container.innerHTML = `
      <div class="spatial-search-container">
        <div class="spatial-search-box">
          <span class="search-icon">🔍</span>
          <input 
            type="text" 
            id="spatial-search-input" 
            class="spatial-search-input" 
            placeholder="Where are you going in India? (e.g. Jaipur, Varanasi, Pushkar, Leh...)" 
            autocomplete="off" 
            spellcheck="false"
          />
          <span class="search-shortcut-hint">/</span>
        </div>

        <!-- Quick selection chips -->
        <div class="search-quick-chips">
          <span style="font-size:0.72rem; color:var(--text-muted); font-weight:600;">POPULAR:</span>
          <button class="quick-chip ${this.activeLocationId === 'jaipur' ? 'active' : ''}" data-id="jaipur">Jaipur (Full)</button>
          <button class="quick-chip ${this.activeLocationId === 'varanasi' ? 'active' : ''}" data-id="varanasi">Varanasi (Full)</button>
          <button class="quick-chip ${this.activeLocationId === 'mumbai' ? 'active' : ''}" data-id="mumbai">Mumbai (Full)</button>
          <button class="quick-chip ${this.activeLocationId === 'kochi' ? 'active' : ''}" data-id="kochi">Kochi (Full)</button>
          <button class="quick-chip ${this.activeLocationId === 'leh' ? 'active' : ''}" data-id="leh">Leh Ladakh (Full)</button>
          <button class="quick-chip ${this.activeLocationId === 'delhi' ? 'active' : ''}" data-id="delhi">Delhi (Full)</button>
          <button class="quick-chip ${this.activeLocationId === 'pushkar' ? 'active' : ''}" data-id="pushkar">Pushkar (Partial)</button>
        </div>

        <!-- Autocomplete Dropdown List -->
        <div id="spatial-search-results" class="search-results-dropdown"></div>
      </div>
    `;
  }

  attachEvents() {
    const input = document.getElementById('spatial-search-input');
    const dropdown = document.getElementById('spatial-search-results');

    if (!input || !dropdown) return;

    // Keyboard shortcut "/" to focus search
    window.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement !== input) {
        e.preventDefault();
        input.focus();
        input.select();
      } else if (e.key === 'Escape') {
        dropdown.classList.remove('visible');
      }
    });

    // Input typeahead search
    input.addEventListener('input', (e) => {
      const q = e.target.value.trim().toLowerCase();
      if (!q) {
        dropdown.classList.remove('visible');
        return;
      }

      const matches = ALL_INDIAN_LOCATIONS.filter(loc => {
        return loc.name.toLowerCase().includes(q) ||
               loc.state.toLowerCase().includes(q) ||
               loc.type.toLowerCase().includes(q) ||
               loc.tags.some(t => t.toLowerCase().includes(q));
      }).slice(0, 8);

      if (matches.length === 0) {
        dropdown.innerHTML = `
          <div style="padding:14px; text-align:center; color:var(--text-muted); font-size:0.85rem;">
            No specific matching Indian location. Try searching for major cities, towns, or heritage districts.
          </div>
        `;
        dropdown.classList.add('visible');
        return;
      }

      dropdown.innerHTML = matches.map(m => {
        const typeClass = 'type-' + m.type.toLowerCase();
        const tierBadge = m.tier === 'FULL' 
          ? '<span style="font-size:0.65rem; color:#6ee7b7; font-weight:700; font-family:var(--font-mono); margin-left:6px;">[FULL INTEL]</span>' 
          : '<span style="font-size:0.65rem; color:#fcd34d; font-weight:700; font-family:var(--font-mono); margin-left:6px;">[PARTIAL]</span>';

        return `
          <div class="search-result-item" data-id="${m.id}">
            <div class="res-main">
              <div class="res-name">${m.name} ${tierBadge}</div>
              <div class="res-state">${m.state} • ${m.region} Region</div>
            </div>
            <span class="res-badge ${typeClass}">${m.type.replace('_', ' ')}</span>
          </div>
        `;
      }).join('');

      dropdown.classList.add('visible');
    });

    // Dropdown selection click
    dropdown.addEventListener('click', (e) => {
      const item = e.target.closest('.search-result-item');
      if (!item) return;
      const locId = item.dataset.id;
      this.selectLocation(locId);
      dropdown.classList.remove('visible');
      input.value = '';
    });

    // Quick chips click
    this.container.addEventListener('click', (e) => {
      const chip = e.target.closest('.quick-chip');
      if (chip) {
        const locId = chip.dataset.id;
        this.selectLocation(locId);
      }
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!this.container.contains(e.target)) {
        dropdown.classList.remove('visible');
      }
    });
  }

  selectLocation(locId) {
    this.activeLocationId = locId;
    this.container.querySelectorAll('.quick-chip').forEach(c => {
      if (c.dataset.id === locId) {
        c.classList.add('active');
      } else {
        c.classList.remove('active');
      }
    });
    this.onSelectLocation(locId);
  }

  setActive(locId) {
    this.activeLocationId = locId;
    this.container.querySelectorAll('.quick-chip').forEach(c => {
      if (c.dataset.id === locId) {
        c.classList.add('active');
      } else {
        c.classList.remove('active');
      }
    });
  }
}
