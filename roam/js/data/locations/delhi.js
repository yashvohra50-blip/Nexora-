/**
 * ROAM — Delhi Destination Intelligence
 * Full Intelligence Tier: 8 Attractions, 2 Businesses, Cultural DNA
 */

export const DELHI_DATA = {
  id: 'delhi',
  name: 'Delhi',
  type: 'CITY',
  state: 'Delhi (NCT)',
  district: 'Central, South & Old Delhi',
  region: 'NORTH',
  culturalRegion: 'Mughal & Lutyens National Capital',
  tagline: 'The Seven Cities of Empire',
  intelligenceTier: 'FULL',
  heroCopy: {
    headline: 'THE HISTORIC CAPITAL DESERVES BALANCE.',
    subheadline: 'ROAM detected 3 severe transit bottlenecks in Old Delhi and 5 tranquil heritage parks across South Delhi.',
    overloadedCount: 3,
    underutilizedCount: 5
  },
  metrics: {
    totalDailyTourists: 92000,
    averageAttractionLoad: 78,
    visitorConcentration: 87,
    tourismDistributionStatus: 'Critical Old Delhi & India Gate Congestion',
    localBusinessOpportunity: 'High Zari & Culinary Potential',
    monumentsAtRisk: 3,
    avgWaitTimeMinutes: 55,
    localEconomyCapturePct: 15
  },
  culturalDNA: {
    knownFor: [
      'Monumental Mughal Forts & Tombs (Red Fort, Humayun’s Tomb)',
      'Qutub Complex with 4th-Century Rustless Iron Pillar',
      'Chandni Chowk 300-Year-Old Bazaars & Spice Alley (Khari Baoli)',
      'Lutyens Grand Axial Rajpath & Rashtrapati Bhavan'
    ],
    taste: [
      'Old Delhi Nihari & Seekh Kebabs with Roomali Roti',
      'Chandni Chowk Stuffed Paranthas with Pumpkin Pickle',
      'Daulat Ki Chaat (Cloud-like winter saffron froth)',
      'Natraj Dahi Bhalla & Rabri Falooda'
    ],
    landscape: [
      'Yamuna River Floodplains & Aravalli Northern Ridge',
      'Historic Walled Shajahanabad Grid',
      'Lush Central Monument Parklands'
    ],
    festivals: [
      'Phoolwalon Ki Sair (Historic communal festival of flower sellers)',
      'Qutub Music Festival under illuminated minarets',
      'International Mango Festival'
    ]
  },
  attractions: [
    {
      id: 'india-gate',
      name: 'India Gate & Kartavya Path',
      category: 'heritage',
      coords: { x: 510, y: 390, lat: 28.6129, lng: 77.2295 },
      capacityMax: 12000,
      currentVisitors: 11160,
      loadPercentage: 93,
      status: 'critical',
      averageVisitMinutes: 60,
      entryFeeINR: 0,
      currentWaitMinutes: 45,
      openHours: 'Open 24 Hours • Best at Dusk',
      description: '42m high triumphal sandstone arch war memorial at the eastern end of New Delhi’s ceremonial axis.',
      whyCongested: 'Evening picnic crowds and ice cream vendor carts pack lawns between C-Hexagon and Man Singh Road.',
      roamResponse: 'Redirect to Humayun’s Tomb Gardens (35% load) or National Crafts Museum tranquil open courtyards.',
      crowdTrend: 'peaking',
      pairedAlternativeId: 'humayuns-tomb',
      secondaryAlternativeId: 'crafts-museum',
      nearbyBusinessIds: ['dilli-craft-weavers']
    },
    {
      id: 'humayuns-tomb',
      name: 'Humayun’s Tomb Gardens',
      category: 'heritage',
      coords: { x: 550, y: 440, lat: 28.5933, lng: 77.2507 },
      capacityMax: 5000,
      currentVisitors: 1750,
      loadPercentage: 35,
      status: 'optimal',
      averageVisitMinutes: 90,
      entryFeeINR: 300,
      currentWaitMinutes: 0,
      openHours: '06:00 — 18:00',
      description: 'Magnificent 16th-century Mughal garden tomb that inspired the Taj Mahal, set within 30 acres of charbagh water channels.',
      whyCongested: 'Vast symmetrical garden layout diffuses hundreds of visitors serenely.',
      roamResponse: 'Premier architectural surrogate: peaceful water channels, zero crowds.',
      crowdTrend: 'steady',
      pairedAlternativeId: null,
      isAlternativeFor: 'india-gate',
      nearbyBusinessIds: ['dilli-craft-weavers']
    }
  ],
  localBusinesses: [
    {
      id: 'dilli-craft-weavers',
      name: 'Nizamuddin Heritage Calligraphy & Zari Studio',
      owner: 'Mirza Shakeel & Guild Artisans',
      category: 'handicraft',
      zone: 'Nizamuddin Basti',
      coords: { x: 540, y: 430, lat: 28.591, lng: 77.248 },
      distanceToHotspotKm: 0.6,
      touristsNearby: 4800,
      potentialVisitorsToday: 520,
      currentZoneSharePct: 14,
      popularZoneSharePct: 83,
      opportunityText: 'India Gate lawns are jammed with 11,000 visitors. Historic Urdu calligraphy and brass lamp ateliers are 600m away.',
      recommendedAction: 'Dispatch cultural detour: complimentary mint sulaimani chai and live calligraphy bookmark stamping.',
      rating: 4.9,
      reviewsCount: 460,
      specialty: 'Hand-carved Arabic & Urdu wooden calligraphy blocks',
      priceRange: '₹150 — ₹3,200'
    }
  ]
};
