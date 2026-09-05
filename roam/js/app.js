/**
 * ROAM — Tourism Demand Intelligence Platform
 * Main Controller & Orchestrator
 */

import { DestinationLoadMap } from './components/map.js';
import { TouristModeController } from './components/touristMode.js';
import { BusinessModeController } from './components/businessMode.js';
import { AuthorityModeController } from './components/authorityMode.js';
import { BeforeAfterController } from './components/beforeAfter.js';
import { ImpactCalcController } from './components/impactCalc.js';
import { HackathonGuide } from './components/hackathonGuide.js';

class RoamApplication {
  constructor() {
    this.activeMode = 'tourist'; // 'tourist' | 'business' | 'authority'
    this.map = null;
    this.touristController = null;
    this.businessController = null;
    this.authorityController = null;
    this.hackathonGuide = null;
  }

  init() {
    console.log('[ROAM] Initializing Tourism Demand Intelligence Platform...');
    
    // Initialize Map on Tourist View
    this.map = new DestinationLoadMap('map-canvas-container', {
      onNodeClick: (attraction) => {
        console.log('[ROAM] Selected attraction:', attraction.name);
        // Scroll to recommendations if mobile
        if (window.innerWidth <= 1024) {
          const recs = document.getElementById('recommendations-stack');
          if (recs) recs.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });

    // Initialize Controllers
    this.touristController = new TouristModeController(this.map);
    this.businessController = new BusinessModeController();
    this.authorityController = new AuthorityModeController();
    new BeforeAfterController('difference-section-container');
    new ImpactCalcController('calc-section-container');

    // Initialize Hackathon Tour Guide
    this.hackathonGuide = new HackathonGuide(this);

    this.attachNavEvents();
    this.attachHeroForm();
  }

  switchMode(modeId) {
    this.activeMode = modeId;

    // Update Mode Buttons
    document.querySelectorAll('.mode-btn').forEach(btn => {
      if (btn.dataset.mode === modeId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update Mode Views
    document.querySelectorAll('.mode-view').forEach(view => {
      view.classList.remove('active');
    });

    const targetView = document.getElementById(`mode-view-${modeId}`);
    if (targetView) {
      targetView.classList.add('active');
    }

    if (modeId === 'tourist' && this.map) {
      setTimeout(() => this.map.render(), 50);
    }
  }

  attachNavEvents() {
    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const mode = e.currentTarget.dataset.mode;
        this.switchMode(mode);
      });
    });

    // Guided Tour Trigger Button
    const tourBtn = document.getElementById('launch-tour-btn');
    if (tourBtn) {
      tourBtn.addEventListener('click', () => {
        this.hackathonGuide.start();
      });
    }

    // Hero secondary CTA
    const howItWorksBtn = document.getElementById('hero-how-it-works-btn');
    if (howItWorksBtn) {
      howItWorksBtn.addEventListener('click', () => {
        const target = document.getElementById('difference-section-container');
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }

  attachHeroForm() {
    const form = document.getElementById('hero-config-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const city = document.getElementById('input-destination')?.value || 'Jaipur';
      const priority = document.getElementById('input-priority')?.value || 'Culture';

      // Visual button feedback
      const submitBtn = form.querySelector('.config-submit-btn');
      if (submitBtn) {
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>✓ OPTIMIZING DEMAND FLOWS...</span>';
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          // Smooth scroll to Load Map
          const mapSection = document.getElementById('tourist-main-stage');
          if (mapSection) {
            mapSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 300);
      }
    });
  }
}

// Instantiate on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.ROAM = new RoamApplication();
  window.ROAM.init();
});
