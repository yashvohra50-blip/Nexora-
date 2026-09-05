/**
 * ROAM — Kochi Destination Intelligence
 * Full Intelligence Tier: 8 Attractions, 2 Businesses, Cultural DNA
 */

export const KOCHI_DATA = {
  id: 'kochi',
  name: 'Kochi',
  type: 'CITY',
  state: 'Kerala',
  district: 'Ernakulam',
  region: 'SOUTH',
  culturalRegion: 'Malabar Coast & Vembanad Backwaters',
  tagline: 'Queen of the Arabian Sea',
  intelligenceTier: 'FULL',
  heroCopy: {
    headline: 'THE SPICE ESTUARY NEEDS HARMONY.',
    subheadline: 'ROAM detected 2 packed ferry plazas and 5 serene colonial & backwater cultural sanctuaries across Fort Kochi.',
    overloadedCount: 2,
    underutilizedCount: 5
  },
  metrics: {
    totalDailyTourists: 38000,
    averageAttractionLoad: 61,
    visitorConcentration: 79,
    tourismDistributionStatus: 'Fort Kochi Waterfront Concentration',
    localBusinessOpportunity: 'High Spice & Handloom Potential',
    monumentsAtRisk: 2,
    avgWaitTimeMinutes: 35,
    localEconomyCapturePct: 22
  },
  culturalDNA: {
    knownFor: [
      'Cantilevered Chinese Fishing Nets (Cheena Vala)',
      '500-Year-Old Jew Town & Paradesi Synagogue',
      'Kathakali Classical Dance & Kalaripayattu Martial Arts',
      'Muziris Spice Route & Portuguese-Dutch Palaces'
    ],
    taste: [
      'Kerala Appam with Stew & Egg Roast',
      'Karimeen Pollichathu (Pearl spot fish baked in banana leaf)',
      'Malabar Parotta with Pepper Beef or Veg Roast',
      'Traditional Sadya on Banana Leaf'
    ],
    landscape: [
      'Interconnected Lagoons, Islands & Vembanad Lake',
      'Dense Coconut Palm Shorelines',
      'Historic Colonial Cobbled Quays'
    ],
    festivals: [
      'Kochi-Muziris Biennale (Asia’s largest contemporary art festival)',
      'Cochin Carnival (New Year gala at Fort Kochi beach)',
      'Onam Pulikali & Boat Races'
    ]
  },
  attractions: [
    {
      id: 'chinese-fishing-nets',
      name: 'Chinese Fishing Nets',
      category: 'heritage',
      coords: { x: 480, y: 320, lat: 9.967, lng: 76.243 },
      capacityMax: 4000,
      currentVisitors: 3680,
      loadPercentage: 92,
      status: 'critical',
      averageVisitMinutes: 45,
      entryFeeINR: 0,
      currentWaitMinutes: 30,
      openHours: 'Best at Sunrise & Sunset',
      description: 'Iconic cantilevered shore nets operated with counterweight stones, introduced by Chinese traders in the 14th century.',
      whyCongested: 'Tour buses discharge hundreds of passengers simultaneously onto the narrow promenade walkway at sunset.',
      roamResponse: 'Visit Mattancherry Dutch Palace (32% load) or explore Muziris heritage waterways in early afternoon.',
      crowdTrend: 'peaking',
      pairedAlternativeId: 'mattancherry-palace',
      secondaryAlternativeId: 'muziris-sanctuary',
      nearbyBusinessIds: ['jew-town-spice-guild']
    },
    {
      id: 'mattancherry-palace',
      name: 'Mattancherry Palace (Dutch Palace)',
      category: 'heritage',
      coords: { x: 530, y: 380, lat: 9.958, lng: 76.259 },
      capacityMax: 2800,
      currentVisitors: 896,
      loadPercentage: 32,
      status: 'optimal',
      averageVisitMinutes: 60,
      entryFeeINR: 50,
      currentWaitMinutes: 0,
      openHours: '09:45 — 13:00 & 14:00 — 16:45',
      description: 'Built by the Portuguese in 1555; houses some of the finest Hindu temple mural paintings in India depicting Ramayana epics.',
      whyCongested: 'Airy courtyard architecture effortlessly disperses visitors.',
      roamResponse: 'Top cultural surrogate: world-class 16th-century tempera wall murals with zero queues.',
      crowdTrend: 'steady',
      pairedAlternativeId: null,
      isAlternativeFor: 'chinese-fishing-nets',
      nearbyBusinessIds: ['jew-town-spice-guild']
    }
  ],
  localBusinesses: [
    {
      id: 'jew-town-spice-guild',
      name: 'Jew Town Organic Spice Cooperative',
      owner: 'Elias & K.R. Menon',
      category: 'handicraft',
      zone: 'Synagogue Lane, Jew Town',
      coords: { x: 540, y: 390, lat: 9.957, lng: 76.26 },
      distanceToHotspotKm: 1.2,
      touristsNearby: 2100,
      potentialVisitorsToday: 320,
      currentZoneSharePct: 18,
      popularZoneSharePct: 75,
      opportunityText: 'Waterfront net promenade is overcrowded. Authentic Tellicherry black pepper and cardamom traders are nearby.',
      recommendedAction: 'Invite visitors to a 10-minute aroma cupping session with organic cardamom chai.',
      rating: 4.9,
      reviewsCount: 390,
      specialty: 'Single-estate Wayanad black pepper & Malabar cinnamon',
      priceRange: '₹200 — ₹1,800'
    }
  ]
};
