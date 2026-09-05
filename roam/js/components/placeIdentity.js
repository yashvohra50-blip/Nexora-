/**
 * ROAM Place Identity Component
 * Renders concise Cultural DNA: KNOWN FOR, TASTE, LANDSCAPE, FESTIVALS
 */

export class PlaceIdentityController {
  constructor(mountId) {
    this.mount = document.getElementById(mountId);
  }

  render(locationData) {
    if (!this.mount || !locationData) return;

    const dna = locationData.culturalDNA || {
      knownFor: ['Regional Cultural Heritage', 'Grassroots Craftsmanship', 'Ancient Community Centers'],
      taste: ['Traditional Regional Delicacies', 'Locally Harvested Spices'],
      landscape: ['Historic Geography', 'Subtropical / Semi-arid terrain'],
      festivals: ['Annual Cultural Fairs', 'Regional Community Celebrations']
    };

    const isPartial = locationData.intelligenceTier === 'PARTIAL';

    this.mount.innerHTML = `
      <div class="place-identity-panel">
        <div class="place-identity-header">
          <div class="place-title-wrap">
            <span class="place-region-badge">
              ${locationData.state || 'India'} • ${locationData.culturalRegion || locationData.region || 'Heritage Zone'}
            </span>
            <div class="place-name">
              <span>${locationData.name}</span>
              ${isPartial 
                ? '<span class="badge badge-elevated">PARTIAL LOCATION INTELLIGENCE</span>'
                : '<span class="badge badge-optimal">FULL INTELLIGENCE ACTIVE</span>'
              }
            </div>
            <div class="place-atmosphere-tag">${locationData.tagline || 'Living Destination Layer'}</div>
          </div>

          <div style="text-align:right;">
            <div style="font-size:0.75rem; color:var(--text-muted); font-weight:600; text-transform:uppercase;">LOCATION TYPE</div>
            <div style="font-size:1.1rem; font-weight:800; font-family:var(--font-mono); color:var(--roam-accent);">
              ${locationData.type || 'DESTINATION'}
            </div>
          </div>
        </div>

        <!-- Cultural DNA Grid -->
        <div class="cultural-dna-grid">
          <!-- 1. Known For -->
          <div class="dna-card">
            <div class="dna-label"><span>🏛️</span> KNOWN FOR</div>
            <ul class="dna-list">
              ${(dna.knownFor || []).map(item => `<li>${item}</li>`).join('')}
            </ul>
          </div>

          <!-- 2. Taste -->
          <div class="dna-card">
            <div class="dna-label"><span>🍲</span> TASTE</div>
            <ul class="dna-list">
              ${(dna.taste || []).map(item => `<li>${item}</li>`).join('')}
            </ul>
          </div>

          <!-- 3. Landscape -->
          <div class="dna-card">
            <div class="dna-label"><span>🌄</span> LANDSCAPE</div>
            <ul class="dna-list">
              ${(dna.landscape || []).map(item => `<li>${item}</li>`).join('')}
            </ul>
          </div>

          <!-- 4. Festivals -->
          <div class="dna-card">
            <div class="dna-label"><span>🪔</span> FESTIVALS</div>
            <ul class="dna-list">
              ${(dna.festivals || []).map(item => `<li>${item}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>
    `;
  }
}
