/**
 * ROAM — Tourism Demand Intelligence Platform
 * Main Controller & Orchestrator (100% India-Only Living Digital Layer)
 */

import { resolveLocation, PRIMARY_LOCATIONS } from './data/locations/index.js';
import { CulturalCanvasController } from './components/culturalCanvas.js';
import { SearchBarController } from './components/searchBar.js';
import { PlaceIdentityController } from './components/placeIdentity.js';
import { DiscoverViewController } from './components/discoverView.js';
import { DestinationLoadMap } from './components/map.js';
import { TouristModeController } from './components/touristMode.js';
import { BusinessModeController } from './components/businessMode.js';
import { AuthorityModeController } from './components/authorityMode.js';
import { BeforeAfterController } from './components/beforeAfter.js';
import { ImpactCalcController } from './components/impactCalc.js';
import { HackathonGuide } from './components/hackathonGuide.js';

class RoamApplication {
  constructor() {
    this.activeMode = 'explore'; // 'discover' | 'explore' | 'market' | 'control' | 'impact'
    this.currentLocation = PRIMARY_LOCATIONS.jaipur;
    
    // Sub-controllers
    this.culturalCanvas = null;
    this.searchBar = null;
    this.placeIdentity = null;
    this.discoverView = null;
    this.map = null;
    this.touristController = null;
    this.businessController = null;
    this.authorityController = null;
    this.hackathonGuide = null;
  }

  init() {
    console.log('[ROAM] Initializing India Living Destination Intelligence Platform...');

    // 1. Cultural Canvas (dynamic styling + SVG silhouettes at 5%-15% opacity)
    this.culturalCanvas = new CulturalCanvasController();

    // 2. Place Identity (Cultural DNA)
    this.placeIdentity = new PlaceIdentityController('place-identity-mount');

    // 3. Search Bar ("WHERE ARE YOU GOING?")
    this.searchBar = new SearchBarController({
      onSelectLocation: (locId) => this.setLocation(locId)
    });

    // 4. Discover View (Regional India Explorer)
    this.discoverView = new DiscoverViewController('discover-view-mount', {
      onSelectLocation: (locId) => {
        this.setLocation(locId);
        this.switchMode('explore');
      }
    });

    // 5. Destination Load Map (Explore View)
    this.map = new DestinationLoadMap('map-canvas-container', {
      onNodeClick: (attraction) => {
        console.log('[ROAM] Selected attraction:', attraction.name);
        if (window.innerWidth <= 1024) {
          const recs = document.getElementById('recommendations-stack');
          if (recs) recs.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });

    // 6. Mode Controllers
    this.touristController = new TouristModeController(this.map);
    this.businessController = new BusinessModeController();
    this.authorityController = new AuthorityModeController();
    new BeforeAfterController('difference-section-container');
    new ImpactCalcController('calc-section-container');

    // 7. Hackathon Guide
    this.hackathonGuide = new HackathonGuide(this);

    // 8. Event Listeners
    this.attachNavEvents();

    // 9. Boot into default location (Jaipur)
    this.setLocation('jaipur');
  }

  setLocation(locId) {
    const location = resolveLocation(locId);
    this.currentLocation = location;
    console.log('[ROAM] Set active Indian location:', location.name, `(${location.type}, ${location.intelligenceTier})`);

    // Update Cultural Visuals
    this.culturalCanvas.applyTheme(location.id);

    // Update Place Identity (Cultural DNA)
    this.placeIdentity.render(location);

    // Update Active Location Indicator Pill in Header
    const pill = document.getElementById('active-location-pill');
    if (pill) {
      pill.innerHTML = `
        <span class="location-indicator-dot"></span>
        <span>${location.name.toUpperCase()} • ${location.state.toUpperCase()}</span>
      `;
    }

    // Update watermark
    const watermark = document.getElementById('demo-watermark-label');
    if (watermark) {
      watermark.textContent = `LOCATION: ${location.name.toUpperCase()} (${location.intelligenceTier})`;
    }

    // Update Search Bar active chip
    if (this.searchBar) {
      this.searchBar.setActive(location.id);
    }

    // Update Sub-Controllers
    this.touristController.setDestination(location);
    this.businessController.setDestination(location);
    this.authorityController.setDestination(location);

    // Update Hero Copy
    const headline = document.getElementById('hero-headline-text');
    const subheadline = document.getElementById('hero-subheadline-text');
    if (headline && location.heroCopy) {
      headline.textContent = location.heroCopy.headline;
    }
    if (subheadline && location.heroCopy) {
      subheadline.textContent = location.heroCopy.subheadline;
    }
  }

  switchMode(modeId) {
    if (modeId === 'tourist') modeId = 'explore';
    if (modeId === 'business') modeId = 'market';
    if (modeId === 'authority') modeId = 'control';
    this.activeMode = modeId;

    // Update Nav Tab Buttons
    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
      if (btn.dataset.mode === modeId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update Views
    document.querySelectorAll('.mode-view').forEach(view => {
      view.classList.remove('active');
    });

    const targetView = document.getElementById(`mode-view-${modeId}`);
    if (targetView) {
      targetView.classList.add('active');
    }

    if (modeId === 'explore' && this.map) {
      setTimeout(() => this.map.render(), 50);
    }
  }

  attachNavEvents() {
    // Mode switcher buttons
    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const mode = e.currentTarget.dataset.mode;
        this.switchMode(mode);
      });
    });

    // Active location pill click opens search
    const pill = document.getElementById('active-location-pill');
    if (pill) {
      pill.addEventListener('click', () => {
        const searchInput = document.getElementById('spatial-search-input');
        if (searchInput) {
          searchInput.focus();
          searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    }

    // Map filters
    document.querySelectorAll('.map-filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.map-filter-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        const filter = e.currentTarget.dataset.filter;
        if (this.map) this.map.setFilter(filter);
      });
    });

    // Hackathon tour button
    const tourBtn = document.getElementById('launch-tour-btn');
    if (tourBtn) {
      tourBtn.addEventListener('click', () => {
        this.hackathonGuide.start();
      });
    }
  }
}

// Instantiate on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.ROAM = new RoamApplication();
  window.ROAM.init();
});
