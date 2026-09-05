/**
 * ROAM 90-Second Hackathon Demo Tour Guide
 * Interactive walkthrough guiding judges through the complete thesis & platform.
 */

export class HackathonGuide {
  constructor(appController) {
    this.app = appController;
    this.currentStep = 0;
    this.steps = [
      {
        step: 1,
        title: 'Step 1: The Core Thesis & Load Map',
        badge: 'PROBLEM DEMONSTRATION',
        desc: 'Observe the Destination Load Map. In Jaipur, Amber Fort (94%), City Palace (78%), and Hawa Mahal (91%) suffer severe overcrowding while magnificent heritage sites like Albert Hall Museum (34%) and Panna Meena Kund (18%) sit underutilized.',
        actionLabel: 'Next: Inspect Alternative Recommendations ➔',
        run: () => {
          this.app.switchMode('tourist');
          window.scrollTo({ top: 350, behavior: 'smooth' });
        }
      },
      {
        step: 2,
        title: 'Step 2: Deterministic Alternative Scoring',
        badge: 'INTELLIGENT RECOMMENDATIONS',
        desc: 'ROAM doesn\'t just show what\'s popular. It calculates multi-factor transparent scores (Preference Match 92%, Crowd Relief 60%, Distance Efficiency) to recommend Albert Hall and Royal Gaitor instead of congested bottlenecks.',
        actionLabel: 'Next: Experience \'Reroute My Day\' ➔',
        run: () => {
          this.app.switchMode('tourist');
          const recEl = document.getElementById('recommendations-stack');
          if (recEl) recEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      },
      {
        step: 3,
        title: 'Step 3: The \'Reroute My Day\' Engine',
        badge: 'DYNAMIC DEMAND ROUTING',
        desc: 'When Amber Fort spikes to 96% congestion, the traveler taps \'REROUTE MY DAY\'. ROAM restructures their sequence: 47 minutes of waiting saved, ₹280 saved, crowding reduced by 36%, and 2 local workshops supported!',
        actionLabel: 'Next: Switch to Local Business Mode ➔',
        run: () => {
          this.app.switchMode('tourist');
          const rerouteBtn = document.getElementById('reroute-trigger-btn');
          if (rerouteBtn) rerouteBtn.click();
        }
      },
      {
        step: 4,
        title: 'Step 4: Local Business Intelligence',
        badge: 'COMMUNITY VALUE CREATION',
        desc: 'Local businesses like Rajasthan Handicraft Studio can see nearby tourist concentration (2,430 tourists 300m away) and activate \'Redirection Pulses\' to invite visitors toward authentic workshops.',
        actionLabel: 'Next: Switch to Destination Authority Mode ➔',
        run: () => {
          this.app.switchMode('business');
          window.scrollTo({ top: 400, behavior: 'smooth' });
        }
      },
      {
        step: 5,
        title: 'Step 5: City Tourism Control Center',
        badge: 'POLICY WHAT-IF SIMULATOR',
        desc: 'Destination Authorities test policy interventions. Shifting 15% of peak visitors drops monument bottleneck congestion by 23%, cuts transit delays by 11%, and boosts local artisan revenues by 18%.',
        actionLabel: 'Next: See City-Scale Macro Impact ➔',
        run: () => {
          this.app.switchMode('authority');
          window.scrollTo({ top: 400, behavior: 'smooth' });
        }
      },
      {
        step: 6,
        title: 'Step 6: Tourism Demand Equilibrium',
        badge: 'FINAL THESIS',
        desc: 'Tourism should not mean following the crowd. ROAM is the missing software layer that balances demand for travelers, local businesses, and sustainable cities.',
        actionLabel: 'Complete Tour & Explore Freely ✓',
        run: () => {
          this.app.switchMode('tourist');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    ];
  }

  start() {
    this.currentStep = 0;
    this.render();
  }

  next() {
    this.currentStep++;
    if (this.currentStep >= this.steps.length) {
      this.close();
    } else {
      this.render();
    }
  }

  close() {
    const modal = document.getElementById('tour-modal-backdrop');
    if (modal) modal.classList.remove('active');
  }

  render() {
    const modal = document.getElementById('tour-modal-backdrop');
    if (!modal) return;

    const step = this.steps[this.currentStep];
    step.run();

    modal.innerHTML = `
      <div class="tour-modal-card">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span class="tour-step-pill">${step.badge} • STEP ${step.step} OF ${this.steps.length}</span>
          <button id="tour-close-x" style="background:none; border:none; color:var(--text-muted); font-size:1.4rem; cursor:pointer;">✕</button>
        </div>
        <h3 class="tour-step-title">${step.title}</h3>
        <p class="tour-step-desc">${step.desc}</p>
        <div class="tour-actions">
          <span style="font-size:0.75rem; color:var(--text-muted); font-family:var(--font-mono);">
            90-Sec Hackathon Walkthrough
          </span>
          <button id="tour-next-btn" class="config-submit-btn" style="padding:10px 20px;">
            ${step.actionLabel}
          </button>
        </div>
      </div>
    `;

    modal.classList.add('active');

    document.getElementById('tour-close-x')?.addEventListener('click', () => this.close());
    document.getElementById('tour-next-btn')?.addEventListener('click', () => this.next());
  }
}
