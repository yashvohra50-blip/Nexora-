/**
 * ROAM — Location Visual Identity System
 * Atmospheric Palettes & Architectural Silhouettes (sitting at 5–15% opacity)
 */

export const LOCATION_THEMES = {
  jaipur: {
    id: 'jaipur',
    name: 'Jaipur',
    colors: {
      bg: '#0f0a0d',
      bgSurface: '#160f14',
      bgCard: '#1d141b',
      bgElevated: '#271b25',
      accent: '#f472b6',        // Rose pink
      accentSoft: 'rgba(244, 114, 182, 0.12)',
      accentBorder: 'rgba(244, 114, 182, 0.35)',
      activeGlow: 'rgba(244, 114, 182, 0.25)',
      textPrimary: '#fcfaf7',
      textSecondary: '#a89aa5',
      mapGlow: 'rgba(244, 114, 182, 0.18)'
    },
    atmosphere: 'Dusty Rose • Terracotta Sandstone • Royal Rajputana',
    silhouetteSvg: `
      <!-- Hawa Mahal Honeycomb Jharokhas Silhouette -->
      <g opacity="0.09" stroke="#f472b6" stroke-width="1.5" fill="none">
        <path d="M 400,600 L 400,320 Q 400,300 420,300 L 580,300 Q 600,300 600,320 L 600,600 Z" />
        <path d="M 440,300 L 440,240 Q 440,220 460,220 L 540,220 Q 560,220 560,240 L 560,300" />
        <path d="M 470,220 L 470,180 Q 470,165 485,165 L 515,165 Q 530,165 530,180 L 530,220" />
        <!-- Jharokha window arches -->
        <path d="M 430,360 C 430,340 470,340 470,360 L 470,400 L 430,400 Z" />
        <path d="M 530,360 C 530,340 570,340 570,360 L 570,400 L 530,400 Z" />
        <path d="M 480,350 C 480,330 520,330 520,350 L 520,390 L 480,390 Z" />
        <!-- Rampart battlements -->
        <path d="M 150,550 Q 250,500 350,530 T 550,500 T 750,530 T 950,500" stroke-width="2" />
        <circle cx="500" cy="150" r="8" fill="#f472b6" opacity="0.12" />
      </g>
    `
  },
  varanasi: {
    id: 'varanasi',
    name: 'Varanasi',
    colors: {
      bg: '#070a13',
      bgSurface: '#0d1222',
      bgCard: '#13192f',
      bgElevated: '#1a223e',
      accent: '#f59e0b',        // Sacred Saffron
      accentSoft: 'rgba(245, 158, 11, 0.12)',
      accentBorder: 'rgba(245, 158, 11, 0.35)',
      activeGlow: 'rgba(245, 158, 11, 0.25)',
      textPrimary: '#faf8f4',
      textSecondary: '#94a0b8',
      mapGlow: 'rgba(245, 158, 11, 0.18)'
    },
    atmosphere: 'Sacred Saffron • Deep River Indigo • Ancient Temples',
    silhouetteSvg: `
      <!-- Varanasi River Ghats & Temple Spires Silhouette -->
      <g opacity="0.10" stroke="#f59e0b" stroke-width="1.5" fill="none">
        <!-- River surface waves -->
        <path d="M 50,580 Q 200,570 350,585 T 650,575 T 950,585" stroke-width="2" />
        <path d="M 80,600 Q 250,590 420,605 T 720,595 T 980,605" stroke-width="1.5" />
        <!-- Ghat stone steps -->
        <path d="M 120,560 L 220,560 L 220,520 L 320,520 L 320,480 L 420,480" />
        <!-- Temple Shikhara Spires -->
        <path d="M 450,480 L 480,240 Q 485,220 490,240 L 520,480 Z" />
        <path d="M 540,490 L 565,280 Q 570,265 575,280 L 600,490 Z" />
        <path d="M 370,500 L 390,320 Q 395,305 400,320 L 420,500 Z" />
        <!-- Wooden Riverboat -->
        <path d="M 680,560 Q 740,580 800,560 L 780,545 L 700,545 Z" fill="#f59e0b" opacity="0.06" />
        <line x1="740" y1="545" x2="740" y2="490" stroke-width="1.5" />
      </g>
    `
  },
  mumbai: {
    id: 'mumbai',
    name: 'Mumbai',
    colors: {
      bg: '#070c12',
      bgSurface: '#0d1620',
      bgCard: '#131e2c',
      bgElevated: '#1a283b',
      accent: '#38bdf8',        // Marine Sky / Coastal Amber
      accentSoft: 'rgba(56, 189, 248, 0.12)',
      accentBorder: 'rgba(56, 189, 248, 0.35)',
      activeGlow: 'rgba(56, 189, 248, 0.25)',
      textPrimary: '#f7faff',
      textSecondary: '#94a5b8',
      mapGlow: 'rgba(56, 189, 248, 0.18)'
    },
    atmosphere: 'Coastal Midnight • Marine Horizon • Victorian Deco',
    silhouetteSvg: `
      <!-- Gateway of India & Coastal Skyline Silhouette -->
      <g opacity="0.10" stroke="#38bdf8" stroke-width="1.5" fill="none">
        <!-- Gateway Arch Pillar -->
        <path d="M 380,560 L 380,320 L 420,320 L 420,560" />
        <path d="M 580,560 L 580,320 L 620,320 L 620,560" />
        <!-- Central Romanesque Arch -->
        <path d="M 420,440 C 420,340 580,340 580,440 L 580,560 L 420,560 Z" />
        <!-- Dome & Turrets -->
        <path d="M 440,320 C 440,240 560,240 560,320" />
        <circle cx="500" cy="240" r="10" />
        <!-- Marine Drive C-Curve -->
        <path d="M 100,580 Q 260,540 380,560 T 700,550 T 920,580" stroke-width="2" />
        <!-- Skyline towers -->
        <rect x="740" y="380" width="30" height="180" />
        <rect x="780" y="340" width="35" height="220" />
        <rect x="830" y="410" width="28" height="150" />
      </g>
    `
  },
  kochi: {
    id: 'kochi',
    name: 'Kochi',
    colors: {
      bg: '#050f0c',
      bgSurface: '#0a1a15',
      bgCard: '#102620',
      bgElevated: '#17342b',
      accent: '#10b981',        // Emerald Palms
      accentSoft: 'rgba(16, 185, 129, 0.12)',
      accentBorder: 'rgba(16, 185, 129, 0.35)',
      activeGlow: 'rgba(16, 185, 129, 0.25)',
      textPrimary: '#f7faf8',
      textSecondary: '#94b8aa',
      mapGlow: 'rgba(16, 185, 129, 0.18)'
    },
    atmosphere: 'Deep Emerald • Arabian Sea Estuary • Spice Heritage',
    silhouetteSvg: `
      <!-- Chinese Fishing Nets & Coconut Canopy Silhouette -->
      <g opacity="0.10" stroke="#10b981" stroke-width="1.5" fill="none">
        <!-- Cantilevered Fishing Net Arms -->
        <line x1="260" y1="560" x2="480" y2="300" stroke-width="2" />
        <line x1="480" y1="300" x2="620" y2="440" stroke-width="2" />
        <line x1="480" y1="300" x2="400" y2="520" />
        <path d="M 400,520 Q 510,540 620,440" stroke-width="1.5" />
        <line x1="260" y1="560" x2="210" y2="460" stroke-width="2" />
        <!-- Counterweights hanging -->
        <circle cx="210" cy="470" r="8" fill="#10b981" opacity="0.15" />
        <circle cx="205" cy="490" r="10" fill="#10b981" opacity="0.15" />
        <!-- Water ripple lines -->
        <path d="M 80,590 Q 300,575 520,595 T 920,585" stroke-width="2" />
      </g>
    `
  },
  leh: {
    id: 'leh',
    name: 'Leh Ladakh',
    colors: {
      bg: '#080c14',
      bgSurface: '#0e1422',
      bgCard: '#151d30',
      bgElevated: '#1e2942',
      accent: '#38bdf8',        // Glacier Ice / Cold Gold
      accentSoft: 'rgba(56, 189, 248, 0.12)',
      accentBorder: 'rgba(56, 189, 248, 0.35)',
      activeGlow: 'rgba(56, 189, 248, 0.25)',
      textPrimary: '#f8faff',
      textSecondary: '#94a5be',
      mapGlow: 'rgba(56, 189, 248, 0.18)'
    },
    atmosphere: 'Cold Alpine Stone • Glacier Blue • High Himalayan Passes',
    silhouetteSvg: `
      <!-- High Himalayan Ridges & Thiksey Monastery Silhouette -->
      <g opacity="0.10" stroke="#38bdf8" stroke-width="1.5" fill="none">
        <!-- Mountain peaks -->
        <path d="M 50,560 L 220,260 L 380,440 L 520,180 L 680,410 L 850,220 L 980,560" stroke-width="2" />
        <!-- Tiered monastery suites -->
        <rect x="470" y="380" width="60" height="25" />
        <rect x="480" y="350" width="40" height="20" />
        <rect x="490" y="325" width="20" height="15" />
        <!-- Stupa Dome -->
        <path d="M 280,460 C 280,420 320,420 320,460 Z" />
        <line x1="300" y1="420" x2="300" y2="390" stroke-width="2" />
      </g>
    `
  },
  delhi: {
    id: 'delhi',
    name: 'Delhi',
    colors: {
      bg: '#0f0a0a',
      bgSurface: '#171010',
      bgCard: '#211717',
      bgElevated: '#2d1f1f',
      accent: '#ef4444',        // Red Sandstone
      accentSoft: 'rgba(239, 68, 68, 0.12)',
      accentBorder: 'rgba(239, 68, 68, 0.35)',
      activeGlow: 'rgba(239, 68, 68, 0.25)',
      textPrimary: '#fcf8f8',
      textSecondary: '#a89898',
      mapGlow: 'rgba(239, 68, 68, 0.18)'
    },
    atmosphere: 'Red Sandstone • Imperial History • Grand Gateways',
    silhouetteSvg: `
      <!-- India Gate & Qutub Minar Silhouette -->
      <g opacity="0.10" stroke="#ef4444" stroke-width="1.5" fill="none">
        <!-- India Gate Arch -->
        <rect x="360" y="240" width="280" height="320" rx="8" />
        <path d="M 420,560 L 420,380 C 420,300 580,300 580,380 L 580,560" />
        <path d="M 330,240 L 670,240 L 650,210 L 350,210 Z" />
        <!-- Qutub Minar Minaret -->
        <path d="M 780,560 L 805,160 L 825,160 L 850,560 Z" />
        <line x1="790" y1="460" x2="840" y2="460" stroke-width="2" />
        <line x1="795" y1="360" x2="835" y2="360" stroke-width="2" />
        <line x1="800" y1="260" x2="830" y2="260" stroke-width="2" />
      </g>
    `
  },
  default: {
    id: 'india',
    name: 'India',
    colors: {
      bg: '#08090c',
      bgSurface: '#0e1117',
      bgCard: '#141822',
      bgElevated: '#1a202e',
      accent: '#c8ff32',        // Chartreuse / Lime
      accentSoft: 'rgba(200, 255, 50, 0.12)',
      accentBorder: 'rgba(200, 255, 50, 0.35)',
      activeGlow: 'rgba(200, 255, 50, 0.25)',
      textPrimary: '#f4f3ee',
      textSecondary: '#a1a09a',
      mapGlow: 'rgba(200, 255, 50, 0.18)'
    },
    atmosphere: 'Spatial Demand Intelligence • India Sovereign Grid',
    silhouetteSvg: `
      <!-- Spatial Grid Lines -->
      <g opacity="0.05" stroke="#c8ff32" stroke-width="1" fill="none">
        <circle cx="500" cy="350" r="180" />
        <circle cx="500" cy="350" r="320" />
        <line x1="0" y1="350" x2="1000" y2="350" stroke-dasharray="4 8" />
        <line x1="500" y1="0" x2="500" y2="700" stroke-dasharray="4 8" />
      </g>
    `
  }
};
