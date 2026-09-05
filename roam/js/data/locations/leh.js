/**
 * ROAM — Leh Ladakh Destination Intelligence
 * Full Intelligence Tier: 6 Attractions, 2 Businesses, Cultural DNA
 */

export const LEH_DATA = {
  id: 'leh',
  name: 'Leh Ladakh',
  type: 'CITY',
  state: 'Ladakh',
  district: 'Leh',
  region: 'NORTH',
  culturalRegion: 'Trans-Himalayan Tibetan Buddhist Plateau',
  tagline: 'Land of High Mountain Passes',
  intelligenceTier: 'FULL',
  heroCopy: {
    headline: 'COLD ALPINE PASSES DEMAND STEWARDSHIP.',
    subheadline: 'ROAM detected 2 congested high-altitude hotspots and 4 tranquil monastery sanctuaries across the Indus Valley.',
    overloadedCount: 2,
    underutilizedCount: 4
  },
  metrics: {
    totalDailyTourists: 14200,
    averageAttractionLoad: 68,
    visitorConcentration: 85,
    tourismDistributionStatus: 'Pass & Pangong Corridor Overload',
    localBusinessOpportunity: 'High Pashmina & Apricot Potential',
    monumentsAtRisk: 2,
    avgWaitTimeMinutes: 40,
    localEconomyCapturePct: 24
  },
  culturalDNA: {
    knownFor: [
      'Centuries-Old Tibetan Buddhist Monasteries (Gompas)',
      'World\'s Highest Motorable Mountain Passes (Khardung La, Chang La)',
      'Pure Ladakhi Cashmere Pashmina Wool & Apricot Orchards',
      'Pristine High-Altitude Saline Lakes (Pangong Tso & Tso Moriri)'
    ],
    taste: [
      'Ladakhi Skyu (Traditional pasta stew with root vegetables)',
      'Steamed Momos with fiery red chili paste',
      'Thukpa (Warm hand-rolled noodle broth)',
      'Butter Tea (Gur Gur Chai) with Roasted Tsampa'
    ],
    landscape: [
      'High-Altitude Cold Desert 3,500m above sea level',
      'Snow-Capped Zanskar & Ladakh Mountain Ranges',
      'Turquoise Glacial Meltwater Streams in Indus Basin'
    ],
    festivals: [
      'Hemis Festival (Sacred Cham masked dances of Guru Padmasambhava)',
      'Ladakh Harvest Festival & Archery Tournaments',
      'Losar (Tibetan New Year celebrations)'
    ]
  },
  attractions: [
    {
      id: 'shanti-stupa',
      name: 'Shanti Stupa',
      category: 'heritage',
      coords: { x: 480, y: 280, lat: 34.164, lng: 77.575 },
      capacityMax: 2000,
      currentVisitors: 1820,
      loadPercentage: 91,
      status: 'critical',
      averageVisitMinutes: 60,
      entryFeeINR: 0,
      currentWaitMinutes: 35,
      openHours: '05:00 — 21:00',
      description: 'White-domed Buddhist stupa atop Chanspa hill, inaugurated by the 14th Dalai Lama, with panoramic sunset views of Leh.',
      whyCongested: 'Sunset vehicular gridlock along narrow 500-step stairs; high visitor density on small upper platform.',
      roamResponse: 'Visit Thiksey Monastery (31% load) or Tsemo Fort in morning sunlight.',
      crowdTrend: 'peaking',
      pairedAlternativeId: 'thiksey-monastery',
      secondaryAlternativeId: 'leh-old-town',
      nearbyBusinessIds: ['ladakh-pashmina-guild']
    },
    {
      id: 'thiksey-monastery',
      name: 'Thiksey Monastery (Mini Potala)',
      category: 'heritage',
      coords: { x: 580, y: 380, lat: 34.058, lng: 77.666 },
      capacityMax: 2500,
      currentVisitors: 775,
      loadPercentage: 31,
      status: 'optimal',
      averageVisitMinutes: 90,
      entryFeeINR: 50,
      currentWaitMinutes: 0,
      openHours: '07:00 — 18:00 • Morning Puja 07:00',
      description: 'Majestic 12-story monastery complex resembling Potala Palace of Lhasa, housing a 49-foot statue of Maitreya Buddha.',
      whyCongested: 'Expansive multi-tier complex across a cliffside hillside; peaceful chanting halls absorb visitors effortlessly.',
      roamResponse: 'Top spiritual & scenic alternative. Complete peace, magnificent Indus valley views.',
      crowdTrend: 'steady',
      pairedAlternativeId: null,
      isAlternativeFor: 'shanti-stupa',
      nearbyBusinessIds: ['ladakh-pashmina-guild']
    }
  ],
  localBusinesses: [
    {
      id: 'ladakh-pashmina-guild',
      name: 'Nomadic Changthang Pashmina Cooperative',
      owner: 'Tundup Dorje & Changpa Herders',
      category: 'handicraft',
      zone: 'Leh Main Bazaar Old Town',
      coords: { x: 500, y: 310, lat: 34.162, lng: 77.584 },
      distanceToHotspotKm: 0.9,
      touristsNearby: 1800,
      potentialVisitorsToday: 240,
      currentZoneSharePct: 22,
      popularZoneSharePct: 78,
      opportunityText: 'Shanti Stupa sunset plateau is bottlenecked. Authentic Changthang handspun cashmere spinners are 900m away.',
      recommendedAction: 'Offer warm butter tea and 15-minute handloom spinning demo in traditional mud-brick atelier.',
      rating: 5.0,
      reviewsCount: 310,
      specialty: 'GI-Certified raw Changthangi Pashmina shawls',
      priceRange: '₹2,500 — ₹24,000'
    }
  ]
};
