/**
 * ROAM — Mumbai Destination Intelligence
 * Full Intelligence Tier: 10 Attractions, 4 Businesses, Cultural DNA
 */

export const MUMBAI_DATA = {
  id: 'mumbai',
  name: 'Mumbai',
  type: 'CITY',
  state: 'Maharashtra',
  district: 'Mumbai City & Suburban',
  region: 'WEST',
  culturalRegion: 'Konkan Coast & Salsette Archipelago',
  tagline: 'The City of Dreams',
  intelligenceTier: 'FULL',
  heroCopy: {
    headline: 'THE ARABIAN SEA METROPOLIS UNDER HIGH PRESSURE.',
    subheadline: 'ROAM detected 4 congested coastal corridors and 6 tranquil heritage & craft enclaves across South Mumbai.',
    overloadedCount: 4,
    underutilizedCount: 6
  },
  metrics: {
    totalDailyTourists: 85000,
    averageAttractionLoad: 76,
    visitorConcentration: 84,
    tourismDistributionStatus: 'Critical Waterfront Concentration',
    localBusinessOpportunity: 'High Urban Craft Potential',
    monumentsAtRisk: 3,
    avgWaitTimeMinutes: 50,
    localEconomyCapturePct: 18
  },
  culturalDNA: {
    knownFor: [
      'Victorian Gothic & Art Deco Ensemble (UNESCO)',
      'Historic Gateway of India Waterfront',
      'Dabbawala Precision Logistics Network',
      'Bollywood Film Studios & Bandra Promenade'
    ],
    taste: [
      'Vada Pav with Dry Garlic Chutney & Fried Green Chili',
      'Parsi Mutton Dhansak with Caramelized Rice',
      'Bombay Duck (Bombil fry) & Malvani Fish Curry',
      'Girgaon Chowpatty Bhel Puri & Kulfi'
    ],
    landscape: [
      'Natural Deep-Water Harbour on the Arabian Sea',
      'Seven Reclaimed Islands connected by causeways',
      'Sanjay Gandhi National Park & Kanheri Caves'
    ],
    festivals: [
      'Ganesh Chaturthi (Spectacular Lalbaugcha Raja immersion)',
      'Kala Ghoda Arts Festival (South Mumbai pedestrian fair)',
      'Bandra Feast & Mount Mary Carnival'
    ]
  },
  attractions: [
    {
      id: 'gateway-of-india',
      name: 'Gateway of India',
      category: 'heritage',
      coords: { x: 500, y: 460, lat: 18.922, lng: 72.8347 },
      capacityMax: 9500,
      currentVisitors: 8900,
      loadPercentage: 94,
      status: 'critical',
      averageVisitMinutes: 60,
      entryFeeINR: 0,
      currentWaitMinutes: 50,
      openHours: 'Open 24 Hours • Jetty 09:00 — 17:00',
      description: 'Yellow basalt ceremonial arch overlooking Mumbai harbour, built to commemorate King George V.',
      whyCongested: 'Elephanta ferry queues cross pedestrian tourists; vehicle security checks cause long foot queues on Apollo Bunder.',
      roamResponse: 'Redirect toward Banganga Tank heritage sanctuary (24% load, ancient fresh water reservoir in Walkeshwar).',
      crowdTrend: 'peaking',
      pairedAlternativeId: 'banganga-tank',
      secondaryAlternativeId: 'kanheri-caves',
      nearbyBusinessIds: ['colaba-artisan-guild', 'britannia-parsi-cafe']
    },
    {
      id: 'marine-drive',
      name: 'Marine Drive & Chowpatty',
      category: 'nature',
      coords: { x: 440, y: 410, lat: 18.9432, lng: 72.823 },
      capacityMax: 12000,
      currentVisitors: 10400,
      loadPercentage: 87,
      status: 'critical',
      averageVisitMinutes: 90,
      entryFeeINR: 0,
      currentWaitMinutes: 30,
      openHours: 'Open 24 Hours • Best at Sunset',
      description: 'The iconic 3.6km C-shaped boulevard arc curved along the coast, famous as the Queen’s Necklace.',
      whyCongested: 'Evening sunset rush bottlenecks pedestrian walkways between Nariman Point and Chowpatty.',
      roamResponse: 'Visit Worli Sea Face & Fort (36% load) for identical sea views without dense crowding.',
      crowdTrend: 'rising',
      pairedAlternativeId: 'worli-fort',
      secondaryAlternativeId: 'banganga-tank',
      nearbyBusinessIds: ['colaba-artisan-guild', 'britannia-parsi-cafe']
    },
    {
      id: 'banganga-tank',
      name: 'Banganga Sacred Tank',
      category: 'heritage',
      coords: { x: 410, y: 360, lat: 18.945, lng: 72.793 },
      capacityMax: 2500,
      currentVisitors: 600,
      loadPercentage: 24,
      status: 'optimal',
      averageVisitMinutes: 60,
      entryFeeINR: 0,
      currentWaitMinutes: 0,
      openHours: '06:00 — 20:00',
      description: 'Ancient 12th-century rectangular freshwater spring tank surrounded by step shrines and Brahmin temple houses.',
      whyCongested: 'Quiet residential pilgrimage enclave in Malabar Hill; untouched by large tour buses.',
      roamResponse: 'Top cultural oasis in Mumbai. 70% lower crowding than Gateway.',
      crowdTrend: 'steady',
      pairedAlternativeId: null,
      isAlternativeFor: 'gateway-of-india',
      nearbyBusinessIds: ['colaba-artisan-guild', 'britannia-parsi-cafe']
    },
    {
      id: 'kanheri-caves',
      name: 'Kanheri Rock-Cut Caves',
      category: 'nature',
      coords: { x: 520, y: 140, lat: 19.2056, lng: 72.9067 },
      capacityMax: 4000,
      currentVisitors: 1120,
      loadPercentage: 28,
      status: 'optimal',
      averageVisitMinutes: 140,
      entryFeeINR: 300,
      currentWaitMinutes: 0,
      openHours: '08:00 — 17:30 (Closed Mondays)',
      description: 'Over 100 basalt Buddhist cave monasteries and prayer halls carved into forest hills from 1st century BC.',
      whyCongested: 'Situated deep inside lush national park; spacious forest canopy naturally diffuses footfall.',
      roamResponse: 'Ultimate nature & heritage escape from South Mumbai concrete congestion.',
      crowdTrend: 'steady',
      pairedAlternativeId: null,
      isAlternativeFor: 'gateway-of-india',
      nearbyBusinessIds: ['colaba-artisan-guild', 'britannia-parsi-cafe']
    }
  ],
  localBusinesses: [
    {
      id: 'colaba-artisan-guild',
      name: 'Colaba Heritage Leather & Brass Collective',
      owner: 'Ashok Parmar & Craftsmen Guild',
      category: 'handicraft',
      zone: 'Colaba Causeway Side Alley',
      coords: { x: 490, y: 470, lat: 18.921, lng: 72.831 },
      distanceToHotspotKm: 0.4,
      touristsNearby: 5200,
      potentialVisitorsToday: 640,
      currentZoneSharePct: 15,
      popularZoneSharePct: 81,
      opportunityText: 'Gateway plaza has 8,900 tourists queuing in sun. Handcrafted leather bookbinders are 400m away.',
      recommendedAction: 'Dispatch ROAM alternative cultural pulse: 15-minute brass stamp tooling demo with ice-lemon tea.',
      rating: 4.9,
      reviewsCount: 780,
      specialty: 'Hand-stitched leather journals & solid brass marine artifacts',
      priceRange: '₹300 — ₹2,400'
    }
  ]
};
