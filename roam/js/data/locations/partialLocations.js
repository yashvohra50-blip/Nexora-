/**
 * ROAM — Partial Location Intelligence Registry
 * Graceful handling for smaller towns, sacred villages, and rural regions.
 * When searched, ROAM recognizes the place with "PARTIAL LOCATION INTELLIGENCE".
 */

export const PARTIAL_LOCATIONS = [
  {
    id: 'pushkar',
    name: 'Pushkar',
    type: 'TOWN',
    state: 'Rajasthan',
    district: 'Ajmer',
    region: 'NORTH',
    culturalRegion: 'Thar Desert Fringe & Sacred Lake',
    tagline: 'The Sacred Lotus Lake & Brahma Sanctuary',
    intelligenceTier: 'PARTIAL',
    heroCopy: {
      headline: 'THE SACRED LAKE MEETS DESERT DUNES.',
      subheadline: 'ROAM has mapped partial demand data: 52 sacred bathing ghats, one of the world rare Brahma Temples, and nomadic camel fairs.',
      overloadedCount: 1,
      underutilizedCount: 4
    },
    metrics: {
      totalDailyTourists: 12500,
      averageAttractionLoad: 58,
      visitorConcentration: 74,
      tourismDistributionStatus: 'Moderate Brahma Temple Concentration',
      localBusinessOpportunity: 'High Rose Water & Leather Potential',
      monumentsAtRisk: 1,
      avgWaitTimeMinutes: 25,
      localEconomyCapturePct: 35
    },
    culturalDNA: {
      knownFor: [
        'World\'s Primary 14th-Century Jagatpita Brahma Temple',
        '52 Sacred Bathing Ghats ringing Pushkar Lake',
        'Annual Pushkar Camel & Livestock Fair (Kartik Purnima)',
        'Pure Organic Damask Rose Water (Gulab Jal) Distilleries'
      ],
      taste: [
        'Pushkar Malpua fried in desi ghee at Halwai Gali',
        'Rabdi with Pistachio & Saffron',
        'Falafel & Lassi in Desert Rooftop Cafes'
      ],
      landscape: [
        'Sacred Lake surrounded by Whitewashed Haveli Ghats',
        'Surrounding Nag Pahar (Snake Mountain) Sand Hills',
        'Semi-Arid Desert scrubland'
      ],
      festivals: [
        'Pushkar Fair (Kartik Purnima camel trading & folk races)',
        'Maha Aarti at Varaha Ghat'
      ]
    }
  },
  {
    id: 'khimsar',
    name: 'Khimsar',
    type: 'VILLAGE',
    state: 'Rajasthan',
    district: 'Nagaur',
    region: 'NORTH',
    culturalRegion: 'Heart of the Thar Desert',
    tagline: 'Oasis in the Great Thar Desert',
    intelligenceTier: 'PARTIAL',
    heroCopy: {
      headline: 'A DESERT OASIS OF TRANQUIL DUNES.',
      subheadline: 'ROAM has mapped partial demand data: 16th-century fortress ramparts, mini desert sand dunes, and Blackbuck antelope trails.',
      overloadedCount: 0,
      underutilizedCount: 3
    },
    metrics: {
      totalDailyTourists: 2100,
      averageAttractionLoad: 24,
      visitorConcentration: 38,
      tourismDistributionStatus: 'Tranquil & Balanced',
      localBusinessOpportunity: 'High Nomadic Craft Potential',
      monumentsAtRisk: 0,
      avgWaitTimeMinutes: 0,
      localEconomyCapturePct: 42
    },
    culturalDNA: {
      knownFor: [
        '16th-Century Khimsar Fort & Heritage Palace',
        'Khimsar Dunes Village secluded around an oasis',
        'Bishnoi community sacred blackbuck protection',
        'Camel safaris across undisturbed undulating sand dunes'
      ],
      taste: ['Ker Sangri desert bean delicacy', 'Bajra Roti with white butter', 'Gatte Ki Sabzi'],
      landscape: ['Golden shifting sand dunes', 'Desert oasis water body', 'Arid thorny scrub'],
      festivals: ['Nagaur Cattle Fair', 'Desert Folk Camp Evenings']
    }
  },
  {
    id: 'chopta',
    name: 'Chopta',
    type: 'RURAL_AREA',
    state: 'Uttarakhand',
    district: 'Rudraprayag',
    region: 'NORTH',
    culturalRegion: 'Garhwal Himalayas & Kedarnath Sanctuary',
    tagline: 'The Mini Switzerland of Uttarakhand',
    intelligenceTier: 'PARTIAL',
    heroCopy: {
      headline: 'PINE MEADOWS BELOW HIGH SNOW PEAKS.',
      subheadline: 'ROAM has mapped partial demand data: Gateway to Tungnath (highest Shiva temple at 3,680m) and Chandrashila summit.',
      overloadedCount: 1,
      underutilizedCount: 3
    },
    metrics: {
      totalDailyTourists: 3400,
      averageAttractionLoad: 42,
      visitorConcentration: 62,
      tourismDistributionStatus: 'Tungnath Trail Bottleneck at Sunrise',
      localBusinessOpportunity: 'Eco-Guide & Homestay Potential',
      monumentsAtRisk: 1,
      avgWaitTimeMinutes: 10,
      localEconomyCapturePct: 50
    },
    culturalDNA: {
      knownFor: [
        'Tungnath Temple (Highest Shiva temple in the world at 3,680m)',
        'Chandrashila Peak 360-degree Himalayan panorama',
        'Alpine Bugyals (velvety green high meadows)',
        'Kedarnath Wildlife Sanctuary birdwatching (Himalayan Monal)'
      ],
      taste: ['Garhwali Kafuli (spinach fenugreek curry)', 'Chainsoo', 'Fresh Rhododendron (Buransh) juice'],
      landscape: ['Alpine evergreen meadows (Bugyals)', 'Dense deodar and rhododendron forests', 'Trishul and Nanda Devi peaks'],
      festivals: ['Tungnath Opening Ceremonies (Akshaya Tritiya)', 'Autumn Trekking Window']
    }
  },
  {
    id: 'hampi',
    name: 'Hampi',
    type: 'TOURIST_SITE',
    state: 'Karnataka',
    district: 'Vijayanagara',
    region: 'SOUTH',
    culturalRegion: 'Tungabhadra River & Vijayanagara Empire',
    tagline: 'The City of Boulders & Ruined Empires',
    intelligenceTier: 'PARTIAL',
    heroCopy: {
      headline: 'A BOULDER-STREWN MONUMENTAL REALM.',
      subheadline: 'ROAM has mapped partial demand data: UNESCO World Heritage stone chariot, Virupaksha Temple, and royal elephant stables.',
      overloadedCount: 1,
      underutilizedCount: 5
    },
    metrics: {
      totalDailyTourists: 16500,
      averageAttractionLoad: 52,
      visitorConcentration: 78,
      tourismDistributionStatus: 'Virupaksha & Vittala Concentration',
      localBusinessOpportunity: 'Bicycle Tour & Artisan Potential',
      monumentsAtRisk: 1,
      avgWaitTimeMinutes: 20,
      localEconomyCapturePct: 28
    },
    culturalDNA: {
      knownFor: [
        '14th-Century Vijayanagara Empire Capital Ruins',
        'Vittala Temple Stone Chariot & Musical Pillars',
        'Virupaksha Temple functioning continuously for 700+ years',
        'Coracle boat rides across Tungabhadra River rapids'
      ],
      taste: ['Karnataka Bisi Bele Bath', 'Crisp Benne Dosa', 'South Indian Filter Coffee'],
      landscape: ['Ancient granite boulder heaps', 'Tungabhadra River valley', 'Banana plantations and paddy fields'],
      festivals: ['Hampi Utsav (November cultural dance and light festival)', 'Purandara Dasa Aradhana']
    }
  },
  {
    id: 'khejarli',
    name: 'Khejarli',
    type: 'VILLAGE',
    state: 'Rajasthan',
    district: 'Jodhpur',
    region: 'NORTH',
    culturalRegion: 'Marwar Desert & Bishnoi Heart',
    tagline: 'Birthplace of the World’s First Ecological Movement',
    intelligenceTier: 'PARTIAL',
    heroCopy: {
      headline: 'A SACRED CRADLE OF ENVIRONMENTAL DEFIANCE.',
      subheadline: 'ROAM has mapped partial demand data: Historic 1730 site where Amrita Devi and 363 Bishnois sacrificed their lives to protect Khejri trees.',
      overloadedCount: 0,
      underutilizedCount: 2
    },
    metrics: {
      totalDailyTourists: 650,
      averageAttractionLoad: 12,
      visitorConcentration: 15,
      tourismDistributionStatus: 'Completely Tranquil Sanctuary',
      localBusinessOpportunity: 'Eco-Education Potential',
      monumentsAtRisk: 0,
      avgWaitTimeMinutes: 0,
      localEconomyCapturePct: 60
    },
    culturalDNA: {
      knownFor: [
        'Historic Amrita Devi Bishnoi Tree Martyr Monument (1730 AD)',
        'Sacred Khejri (Prosopis cineraria) Grove Conservation',
        'Bishnoi 29 Principles of Non-violence and Nature Protection',
        'Wildlife Sanctuary with roaming Chinkaras and Peacocks'
      ],
      taste: ['Sangri sabzi', 'Bajre ki khichdi with chaas', 'Marwari Kadhi'],
      landscape: ['Semi-arid scrubland with green Khejri trees', 'Protected deer sanctuary', 'Rural mud-plastered Bishnoi homes'],
      festivals: ['Khejarli Shaheedi Mela (Annual martyrdom tribute mela in Bhadrapad)']
    }
  }
];
