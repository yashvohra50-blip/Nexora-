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
          this.app.switchMode('explore');
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
          this.app.switchMode('explore');
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
          this.app.switchMode('explore');
          const rerouteBtn = document.getElementById('reroute-trigger-btn');
          if (rerouteBtn) rerouteBtn.click();
        }
      },
      {
        step: 4,
        title: 'Step 4: Local Business Intelligence',
        badge: 'COMMUNITY VALUE CREATION',
        desc: 'Local businesses like Blue Pottery & Miniature Painting Studio see nearby tourist concentration and activate \'Redirection Pulses\' to invite visitors toward authentic workshops.',
        actionLabel: 'Next: Switch to Destination Authority Mode ➔',
        run: () => {
          this.app.switchMode('market');
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
          this.app.switchMode('control');
          window.scrollTo({ top: 400, behavior: 'smooth' });
        }
      },
      {
        step: 6,
        title: 'Step 6: Tourism Demand Equilibrium',
        badge: 'FINAL THESIS',
        desc: 'Tourism should not mean following the crowd. ROAM is India\'s living digital layer that balances demand for travelers, local businesses, and sustainable heritage destinations.',
        actionLabel: 'Complete Tour & Explore Freely ✓',
        run: () => {
          this.app.switchMode('explore');
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
      <div class="tour-modal-card" style="background:var(--roam-card); border:1px solid var(--roam-accent-border); border-radius:var(--radius-lg); padding:var(--space-xl); max-width:540px; margin:10vh auto; box-shadow:var(--shadow-lg);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
          <span class="badge badge-optimal">${step.badge} • STEP ${step.step} OF ${this.steps.length}</span>
          <button id="tour-close-x" style="background:none; border:none; color:var(--text-muted); font-size:1.4rem; cursor:pointer;">✕</button>
        </div>
        <h3 style="font-size:1.3rem; font-weight:800; color:#fff; margin-bottom:8px;">${step.title}</h3>
        <p style="font-size:0.9rem; color:var(--text-secondary); line-height:1.5; margin-bottom:18px;">${step.desc}</p>
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span style="font-size:0.75rem; color:var(--text-muted); font-family:var(--font-mono);">
            90-Sec Hackathon Walkthrough
          </span>
          <button id="tour-next-btn" class="reroute-btn" style="padding:8px 18px; font-size:0.85rem;">
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
