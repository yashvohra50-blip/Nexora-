/**
 * ROAM — Varanasi Destination Intelligence
 * Full Intelligence Tier: 10 Attractions, 4 Businesses, Cultural DNA
 */

export const VARANASI_DATA = {
  id: 'varanasi',
  name: 'Varanasi',
  type: 'CITY',
  state: 'Uttar Pradesh',
  district: 'Varanasi',
  region: 'NORTH',
  culturalRegion: 'Kashi Riverfront & Bhojpuri Belt',
  tagline: 'The Eternal River City',
  intelligenceTier: 'FULL',
  heroCopy: {
    headline: 'THE ANCIENT RIVER NEVER STOPS MOVING.',
    subheadline: 'ROAM detected 2 critical riverfront bottlenecks and 5 peaceful sacred sanctuaries along the Ganga corridor.',
    overloadedCount: 2,
    underutilizedCount: 5
  },
  metrics: {
    totalDailyTourists: 62000,
    averageAttractionLoad: 71,
    visitorConcentration: 86, // % concentrated at Dashashwamedh & Kashi Vishwanath
    tourismDistributionStatus: 'Severe Riverfront Bottleneck',
    localBusinessOpportunity: 'High Artisan Potential',
    monumentsAtRisk: 2,
    avgWaitTimeMinutes: 55,
    localEconomyCapturePct: 16
  },
  culturalDNA: {
    knownFor: [
      '84 Ancient Stone Riverfront Ghats',
      'Kashi Vishwanath Jyotirlinga Temple Corridor',
      'Banarasi Pure Zari Silk Brocade Weaving',
      'Evening Ganga Maha Aarti Rituals'
    ],
    taste: [
      'Banarasi Paan (Betel leaf with gulkand & silver foil)',
      'Kachori Sabzi & Jalebi at Thatheri Bazaar',
      'Malaiyo (Foamy winter milk dessert with saffron)',
      'Thandai with Rabri & Pistachio'
    ],
    landscape: [
      'Crescent-shaped sacred Ganga Riverfront',
      'Labyrinthine Medieval Galis (stone alleyways)',
      'Alluvial Indo-Gangetic Plains'
    ],
    festivals: [
      'Dev Deepawali (Million earthen lamps lighting all 84 ghats)',
      'Maha Shivaratri (Night-long Kashi Vishwanath procession)',
      'Ganga Mahotsav (Classical music & boat races)'
    ]
  },
  attractions: [
    {
      id: 'dashashwamedh-ghat',
      name: 'Dashashwamedh Ghat',
      category: 'heritage',
      coords: { x: 520, y: 340, lat: 25.3075, lng: 83.0105 },
      capacityMax: 8000,
      currentVisitors: 7600,
      loadPercentage: 95,
      status: 'critical',
      averageVisitMinutes: 90,
      entryFeeINR: 0,
      currentWaitMinutes: 50,
      openHours: 'Open 24 Hours • Aarti at 18:30',
      description: 'The most sacred and active ghat in Kashi, world-famous for its synchronized evening brass-lamp Ganga Aarti.',
      whyCongested: 'Between 17:30 and 19:30, thousands of pilgrims and boat tour groups cram the stone steps, blocking lane access.',
      roamResponse: 'Experience the evening prayers in tranquility from Assi Ghat (38% load) or Panchganga Ghat (24% load).',
      crowdTrend: 'peaking',
      pairedAlternativeId: 'assi-ghat',
      secondaryAlternativeId: 'sarnath',
      nearbyBusinessIds: ['varanasi-silk-guild', 'blue-lassi-shop']
    },
    {
      id: 'kashi-vishwanath',
      name: 'Kashi Vishwanath Temple',
      category: 'heritage',
      coords: { x: 490, y: 310, lat: 25.3109, lng: 83.0107 },
      capacityMax: 9000,
      currentVisitors: 8200,
      loadPercentage: 91,
      status: 'critical',
      averageVisitMinutes: 100,
      entryFeeINR: 0,
      currentWaitMinutes: 75,
      openHours: '03:00 — 23:00',
      description: 'One of the twelve revered Jyotirlingas, reconstructed in a monumental corridor opening directly to the Ganga.',
      whyCongested: 'Morning Sparsh Darshan and weekend pilgrims from across India queue for up to 2 hours through security barricades.',
      roamResponse: 'Shift entry to late afternoon lull (15:00); visit Sarnath Buddhist Deer Park (28% load, 10km north) in the morning.',
      crowdTrend: 'peaking',
      pairedAlternativeId: 'sarnath',
      secondaryAlternativeId: 'ramnagar-fort',
      nearbyBusinessIds: ['thatheri-brass-works', 'keshav-tambool']
    },
    {
      id: 'assi-ghat',
      name: 'Assi Ghat',
      category: 'nature',
      coords: { x: 440, y: 480, lat: 25.2885, lng: 83.0062 },
      capacityMax: 4500,
      currentVisitors: 1710,
      loadPercentage: 38,
      status: 'optimal',
      averageVisitMinutes: 70,
      entryFeeINR: 0,
      currentWaitMinutes: 0,
      openHours: 'Open 24 Hours • Morning Yoga 06:00',
      description: 'Southernmost sacred confluence of River Assi and Ganga, favored by scholars, sunrise yoga practitioners, and poets.',
      whyCongested: 'Spacious terraced steps absorb large gatherings gently without bottlenecks.',
      roamResponse: 'Ideal sunrise destination: Subah-e-Banaras morning music and tea by the river.',
      crowdTrend: 'steady',
      pairedAlternativeId: null,
      isAlternativeFor: 'dashashwamedh-ghat',
      nearbyBusinessIds: ['assi-river-cafe', 'varanasi-silk-guild']
    },
    {
      id: 'sarnath',
      name: 'Sarnath Buddhist Deer Park',
      category: 'heritage',
      coords: { x: 620, y: 130, lat: 25.3811, lng: 83.0214 },
      capacityMax: 5000,
      currentVisitors: 1400,
      loadPercentage: 28,
      status: 'optimal',
      averageVisitMinutes: 120,
      entryFeeINR: 300,
      currentWaitMinutes: 0,
      openHours: '09:00 — 17:00',
      description: 'Sacred grove where Gautama Buddha preached his first sermon; features Dhamek Stupa and Ashoka Pillar Lion Capital.',
      whyCongested: 'Located 10km outside the dense old city; vast green landscaped lawns ensure serene contemplation.',
      roamResponse: 'Premier peace surrogate. 67% less crowded than Vishwanath corridor.',
      crowdTrend: 'easing',
      pairedAlternativeId: null,
      isAlternativeFor: 'kashi-vishwanath',
      nearbyBusinessIds: ['sarnath-terracotta', 'thatheri-brass-works']
    },
    {
      id: 'ramnagar-fort',
      name: 'Ramnagar Fort & Museum',
      category: 'heritage',
      coords: { x: 670, y: 490, lat: 25.2694, lng: 83.0253 },
      capacityMax: 3000,
      currentVisitors: 780,
      loadPercentage: 26,
      status: 'optimal',
      averageVisitMinutes: 80,
      entryFeeINR: 150,
      currentWaitMinutes: 0,
      openHours: '10:00 — 17:00',
      description: '18th-century red sandstone fort across the Ganga housing vintage royal cars, antique clock towers, and armory.',
      whyCongested: 'East bank location requires pontoon/bridge crossing; receives less than 15% of old city crowds.',
      roamResponse: 'Excellent heritage surrogate for families and history lovers.',
      crowdTrend: 'steady',
      pairedAlternativeId: null,
      isAlternativeFor: 'kashi-vishwanath',
      nearbyBusinessIds: ['assi-river-cafe', 'keshav-tambool']
    }
  ],
  localBusinesses: [
    {
      id: 'varanasi-silk-guild',
      name: 'Peeli Kothi Master Weavers Guild',
      owner: 'Haji Mohammad Ismail & Weavers Co-op',
      category: 'handicraft',
      zone: 'Madanpura & Peeli Kothi',
      coords: { x: 500, y: 280, lat: 25.312, lng: 83.005 },
      distanceToHotspotKm: 0.7,
      touristsNearby: 3800,
      potentialVisitorsToday: 420,
      currentZoneSharePct: 11,
      popularZoneSharePct: 82,
      opportunityText: 'Kashi Vishwanath corridor has 8,200 tourists waiting in barricades. Authentic pit-loom silk weavers are only 700m away.',
      recommendedAction: 'Dispatch ROAM craft pass: 20-minute jacquard handloom demonstration with mint tea.',
      rating: 5.0,
      reviewsCount: 512,
      specialty: 'Pure Katan Silk Tanchoi & Zari Sarees',
      priceRange: '₹1,200 — ₹18,000'
    },
    {
      id: 'blue-lassi-shop',
      name: 'Heritage Clay-Pot Lassi & Cream Kitchen',
      owner: 'Balaji Yadav (Since 1925)',
      category: 'food',
      zone: 'Manikarnika Lane',
      coords: { x: 510, y: 320, lat: 25.309, lng: 83.011 },
      distanceToHotspotKm: 0.2,
      touristsNearby: 4100,
      potentialVisitorsToday: 580,
      currentZoneSharePct: 19,
      popularZoneSharePct: 77,
      opportunityText: 'Dashashwamedh tea stalls are completely overwhelmed. Hand-whisked pomegranate curd lassi sits 200m away.',
      recommendedAction: 'Feature rest-break token during hot afternoon pilgrimage hours.',
      rating: 4.8,
      reviewsCount: 1240,
      specialty: 'Hand-Churned Malai Pomegranate & Saffron Lassi',
      priceRange: '₹50 — ₹140'
    }
  ]
};
