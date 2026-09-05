/**
 * ROAM Cultural Canvas Component
 * Manages dynamic CSS variable overrides and ambient SVG silhouettes (at 5%–15% opacity)
 */

import { LOCATION_THEMES } from '../data/themes/locationThemes.js';

export class CulturalCanvasController {
  constructor() {
    this.bgLayer = document.getElementById('cultural-bg-layer');
    this.currentThemeId = 'jaipur';
  }

  applyTheme(themeId) {
    const theme = LOCATION_THEMES[themeId] || LOCATION_THEMES.default;
    this.currentThemeId = themeId;

    // 1. Update CSS Variables on Root Document Element
    const root = document.documentElement;
    root.style.setProperty('--roam-bg', theme.colors.bg);
    root.style.setProperty('--roam-surface', theme.colors.bgSurface);
    root.style.setProperty('--roam-card', theme.colors.bgCard);
    root.style.setProperty('--roam-elevated', theme.colors.bgElevated);
    root.style.setProperty('--roam-accent', theme.colors.accent);
    root.style.setProperty('--roam-accent-soft', theme.colors.accentSoft);
    root.style.setProperty('--roam-accent-border', theme.colors.accentBorder);
    root.style.setProperty('--roam-accent-glow', theme.colors.activeGlow);
    root.style.setProperty('--roam-text-primary', theme.colors.textPrimary);
    root.style.setProperty('--roam-text-secondary', theme.colors.textSecondary);

    // 2. Crossfade Background Architectural Silhouette (5%-15% opacity)
    if (this.bgLayer) {
      this.bgLayer.style.opacity = '0';
      setTimeout(() => {
        this.bgLayer.innerHTML = `
          <svg viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            ${theme.silhouetteSvg}
          </svg>
        `;
        this.bgLayer.style.opacity = '1';
      }, 250);
    }
  }
}
