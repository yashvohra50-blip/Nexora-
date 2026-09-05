/**
 * ROAM Before / After Demonstration Component
 * "See The Difference" - Side-by-Side Architectural Contrast
 */

export class BeforeAfterController {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.init();
  }

  init() {
    if (!this.container) return;
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="difference-header">
        <div style="font-size:0.75rem; text-transform:uppercase; color:var(--brand-primary); font-weight:700; letter-spacing:0.12em; margin-bottom:4px;">
          Architectural Contrast
        </div>
        <h2>SEE THE DIFFERENCE</h2>
        <p>Why unmanaged tourism fails both travelers and host communities, and how ROAM creates equilibrium.</p>
      </div>

      <div class="split-comparison-container">
        <!-- Left: Without ROAM -->
        <div class="comp-column comp-without">
          <div class="comp-col-title" style="color:#ef4444;">
            <span>❌</span> WITHOUT ROAM
          </div>
          <div style="font-size:0.85rem; color:#fca5a5;">The Default Crowd Bottleneck</div>

          <div style="display:flex; flex-direction:column; gap:12px; margin-top:8px;">
            <div>
              <div style="font-size:0.72rem; text-transform:uppercase; color:var(--text-muted); font-weight:600;">
                Tourist Concentration
              </div>
              <div style="font-size:1.3rem; font-weight:800; font-family:var(--font-mono); color:#ef4444;">
                88% concentrated in top 3 sites
              </div>
            </div>

            <div>
              <div style="font-size:0.72rem; text-transform:uppercase; color:var(--text-muted); font-weight:600;">
                Average Monument Queue
              </div>
              <div style="font-size:1.3rem; font-weight:800; font-family:var(--font-mono); color:#ef4444;">
                42 min wait per entry
              </div>
            </div>

            <div>
              <div style="font-size:0.72rem; text-transform:uppercase; color:var(--text-muted); font-weight:600;">
                Local Artisan Exposure
              </div>
              <div style="font-size:1.3rem; font-weight:800; font-family:var(--font-mono); color:#ef4444;">
                Low (&lt; 8% footfall capture)
              </div>
            </div>

            <div>
              <div style="font-size:0.72rem; text-transform:uppercase; color:var(--text-muted); font-weight:600;">
                Tourist Experience
              </div>
              <div style="font-size:0.9rem; color:#cbd5e1; line-height:1.4;">
                Hot parking lots, endless ticket queues, rushed photos over strangers' shoulders, and missed heritage.
              </div>
            </div>
          </div>
        </div>

        <!-- Right: With ROAM -->
        <div class="comp-column comp-with">
          <div class="comp-col-title" style="color:var(--load-optimal);">
            <span>✓</span> WITH ROAM
          </div>
          <div style="font-size:0.85rem; color:#a7f3d0;">The Balanced Demand Ecosystem</div>

          <div style="display:flex; flex-direction:column; gap:12px; margin-top:8px;">
            <div>
              <div style="font-size:0.72rem; text-transform:uppercase; color:var(--text-muted); font-weight:600;">
                Tourist Concentration
              </div>
              <div style="font-size:1.3rem; font-weight:800; font-family:var(--font-mono); color:var(--load-optimal);">
                52% harmoniously distributed
              </div>
            </div>

            <div>
              <div style="font-size:0.72rem; text-transform:uppercase; color:var(--text-muted); font-weight:600;">
                Average Monument Queue
              </div>
              <div style="font-size:1.3rem; font-weight:800; font-family:var(--font-mono); color:var(--load-optimal);">
                12 min wait (71% faster)
              </div>
            </div>

            <div>
              <div style="font-size:0.72rem; text-transform:uppercase; color:var(--text-muted); font-weight:600;">
                Local Artisan Exposure
              </div>
              <div style="font-size:1.3rem; font-weight:800; font-family:var(--font-mono); color:var(--load-optimal);">
                +31% direct artisan store visits
              </div>
            </div>

            <div>
              <div style="font-size:0.72rem; text-transform:uppercase; color:var(--text-muted); font-weight:600;">
                Tourist Experience
              </div>
              <div style="font-size:0.9rem; color:#cbd5e1; line-height:1.4;">
                Tranquil courtyards, hands-on block printing havelis, authentic street cuisine, and deeper discovery.
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
