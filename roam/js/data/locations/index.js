/**
 * ROAM — Master Indian Locations Index & Resolver
 * 100% India-Only: States, UTs, Cities, Towns, Villages
 */

import { JAIPUR_DATA } from './jaipur.js';
import { VARANASI_DATA } from './varanasi.js';
import { MUMBAI_DATA } from './mumbai.js';
import { KOCHI_DATA } from './kochi.js';
import { LEH_DATA } from './leh.js';
import { DELHI_DATA } from './delhi.js';
import { PARTIAL_LOCATIONS } from './partialLocations.js';

export const PRIMARY_LOCATIONS = {
  jaipur: JAIPUR_DATA,
  varanasi: VARANASI_DATA,
  mumbai: MUMBAI_DATA,
  kochi: KOCHI_DATA,
  leh: LEH_DATA,
  delhi: DELHI_DATA
};

// Comprehensive list of searchable Indian locations
export const ALL_INDIAN_LOCATIONS = [
  // Primary Tier
  { id: 'jaipur', name: 'Jaipur', type: 'CITY', state: 'Rajasthan', region: 'NORTH', tier: 'FULL', tags: ['pink city', 'hawa mahal', 'amber fort', 'rajasthan'] },
  { id: 'varanasi', name: 'Varanasi', type: 'CITY', state: 'Uttar Pradesh', region: 'NORTH', tier: 'FULL', tags: ['kashi', 'banaras', 'ghats', 'ganga', 'aarti'] },
  { id: 'mumbai', name: 'Mumbai', type: 'CITY', state: 'Maharashtra', region: 'WEST', tier: 'FULL', tags: ['bombay', 'gateway of india', 'marine drive', 'bollywood'] },
  { id: 'kochi', name: 'Kochi', type: 'CITY', state: 'Kerala', region: 'SOUTH', tier: 'FULL', tags: ['cochin', 'fort kochi', 'chinese fishing nets', 'backwaters'] },
  { id: 'leh', name: 'Leh Ladakh', type: 'CITY', state: 'Ladakh', region: 'NORTH', tier: 'FULL', tags: ['ladakh', 'pangong', 'himalayas', 'monastery', 'thiksey'] },
  { id: 'delhi', name: 'Delhi', type: 'CITY', state: 'Delhi (NCT)', region: 'NORTH', tier: 'FULL', tags: ['new delhi', 'red fort', 'qutub minar', 'india gate'] },

  // Partial Intelligence Tier
  { id: 'pushkar', name: 'Pushkar', type: 'TOWN', state: 'Rajasthan', region: 'NORTH', tier: 'PARTIAL', tags: ['brahma temple', 'lake ghats', 'camel fair', 'desert'] },
  { id: 'khimsar', name: 'Khimsar', type: 'VILLAGE', state: 'Rajasthan', region: 'NORTH', tier: 'PARTIAL', tags: ['sand dunes', 'oasis', 'fort', 'thar desert'] },
  { id: 'chopta', name: 'Chopta', type: 'RURAL_AREA', state: 'Uttarakhand', region: 'NORTH', tier: 'PARTIAL', tags: ['tungnath', 'chandrashila', 'meadows', 'himalayas'] },
  { id: 'hampi', name: 'Hampi', type: 'TOURIST_SITE', state: 'Karnataka', region: 'SOUTH', tier: 'PARTIAL', tags: ['vijayanagara', 'stone chariot', 'boulders', 'unesco'] },
  { id: 'khejarli', name: 'Khejarli', type: 'VILLAGE', state: 'Rajasthan', region: 'NORTH', tier: 'PARTIAL', tags: ['bishnoi', 'amrita devi', 'khejri', 'eco martyrdom'] },

  // Broad Indian Regional Network (Scalable stubs)
  { id: 'udaipur', name: 'Udaipur', type: 'CITY', state: 'Rajasthan', region: 'NORTH', tier: 'PARTIAL', tags: ['lake pichola', 'city palace', 'city of lakes'] },
  { id: 'jodhpur', name: 'Jodhpur', type: 'CITY', state: 'Rajasthan', region: 'NORTH', tier: 'PARTIAL', tags: ['blue city', 'mehrangarh fort', 'marwar'] },
  { id: 'amritsar', name: 'Amritsar', type: 'CITY', state: 'Punjab', region: 'NORTH', tier: 'PARTIAL', tags: ['golden temple', 'harmandir sahib', 'wagah border'] },
  { id: 'rishikesh', name: 'Rishikesh', type: 'TOWN', state: 'Uttarakhand', region: 'NORTH', tier: 'PARTIAL', tags: ['yoga capital', 'ganga rafting', 'laxman jhula'] },
  { id: 'agra', name: 'Agra', type: 'CITY', state: 'Uttar Pradesh', region: 'NORTH', tier: 'PARTIAL', tags: ['taj mahal', 'agra fort', 'mughal'] },
  { id: 'shimla', name: 'Shimla', type: 'CITY', state: 'Himachal Pradesh', region: 'NORTH', tier: 'PARTIAL', tags: ['mall road', 'ridge', 'colonial summer capital'] },
  { id: 'manali', name: 'Manali', type: 'TOWN', state: 'Himachal Pradesh', region: 'NORTH', tier: 'PARTIAL', tags: ['rohtang pass', 'solang valley', 'spiti gateway'] },
  { id: 'dharamshala', name: 'Dharamshala & McLeodGanj', type: 'TOWN', state: 'Himachal Pradesh', region: 'NORTH', tier: 'PARTIAL', tags: ['dalai lama', 'tibetan', 'kangra valley'] },
  { id: 'spiti', name: 'Spiti Valley', type: 'RURAL_AREA', state: 'Himachal Pradesh', region: 'NORTH', tier: 'PARTIAL', tags: ['key monastery', 'kaza', 'cold desert'] },

  // West
  { id: 'goa', name: 'Goa (Panaji & Old Goa)', type: 'STATE', state: 'Goa', region: 'WEST', tier: 'PARTIAL', tags: ['churches', 'beaches', 'bom jesus', 'mandovi'] },
  { id: 'ahmedabad', name: 'Ahmedabad', type: 'CITY', state: 'Gujarat', region: 'WEST', tier: 'PARTIAL', tags: ['sabarmati ashram', 'adalaj stepwell', 'unesco walled city'] },
  { id: 'kutch', name: 'Rann of Kutch', type: 'RURAL_AREA', state: 'Gujarat', region: 'WEST', tier: 'PARTIAL', tags: ['white desert', 'rann utsav', 'handicrafts'] },
  { id: 'pune', name: 'Pune', type: 'CITY', state: 'Maharashtra', region: 'WEST', tier: 'PARTIAL', tags: ['shaniwar wada', 'maratha', 'sinhagad fort'] },

  // South
  { id: 'bengaluru', name: 'Bengaluru', type: 'CITY', state: 'Karnataka', region: 'SOUTH', tier: 'PARTIAL', tags: ['bangalore', 'lalbagh', 'cubbon park'] },
  { id: 'mysuru', name: 'Mysuru', type: 'CITY', state: 'Karnataka', region: 'SOUTH', tier: 'PARTIAL', tags: ['mysore palace', 'chamundi hill', 'dasara'] },
  { id: 'chennai', name: 'Chennai', type: 'CITY', state: 'Tamil Nadu', region: 'SOUTH', tier: 'PARTIAL', tags: ['madras', 'marina beach', 'kapaleeshwarar'] },
  { id: 'madurai', name: 'Madurai', type: 'CITY', state: 'Tamil Nadu', region: 'SOUTH', tier: 'PARTIAL', tags: ['meenakshi temple', 'vaigai river', 'temple city'] },
  { id: 'hyderabad', name: 'Hyderabad', type: 'CITY', state: 'Telangana', region: 'SOUTH', tier: 'PARTIAL', tags: ['charminar', 'golconda fort', 'biryani'] },

  // East & Northeast
  { id: 'kolkata', name: 'Kolkata', type: 'CITY', state: 'West Bengal', region: 'EAST', tier: 'PARTIAL', tags: ['calcutta', 'victoria memorial', 'howrah bridge'] },
  { id: 'darjeeling', name: 'Darjeeling', type: 'TOWN', state: 'West Bengal', region: 'EAST', tier: 'PARTIAL', tags: ['toy train', 'tea estates', 'kanchenjunga'] },
  { id: 'puri', name: 'Puri', type: 'CITY', state: 'Odisha', region: 'EAST', tier: 'PARTIAL', tags: ['jagannath temple', 'konark sun temple', 'golden beach'] },
  { id: 'kaziranga', name: 'Kaziranga National Park', type: 'RURAL_AREA', state: 'Assam', region: 'NORTHEAST', tier: 'PARTIAL', tags: ['one-horned rhino', 'brahmaputra', 'unesco'] },
  { id: 'gangtok', name: 'Gangtok', type: 'CITY', state: 'Sikkim', region: 'NORTHEAST', tier: 'PARTIAL', tags: ['rumtek monastery', 'tsomgo lake', 'himalayas'] },
  { id: 'shillong', name: 'Shillong', type: 'CITY', state: 'Meghalaya', region: 'NORTHEAST', tier: 'PARTIAL', tags: ['living root bridges', 'scotland of the east', 'cherrapunji'] }
];

/**
 * Resolves a location by search query. Returns the full profile if available,
 * or the partial profile with graceful fallback.
 */
export function resolveLocation(query) {
  if (!query) return PRIMARY_LOCATIONS.jaipur;
  const q = query.trim().toLowerCase();

  // 1. Direct key match in primary
  if (PRIMARY_LOCATIONS[q]) return PRIMARY_LOCATIONS[q];

  // 2. Search primary locations by name
  for (const key of Object.keys(PRIMARY_LOCATIONS)) {
    const loc = PRIMARY_LOCATIONS[key];
    if (loc.name.toLowerCase().includes(q) || q.includes(loc.name.toLowerCase())) {
      return loc;
    }
  }

  // 3. Search partial locations
  const partial = PARTIAL_LOCATIONS.find(p => p.id === q || p.name.toLowerCase().includes(q) || q.includes(p.name.toLowerCase()));
  if (partial) return partial;

  // 4. Search all index entries
  const indexMatch = ALL_INDIAN_LOCATIONS.find(l => l.id === q || l.name.toLowerCase().includes(q) || l.tags.some(t => t.includes(q)));
  if (indexMatch) {
    // Generate an automatic partial profile
    return {
      id: indexMatch.id,
      name: indexMatch.name,
      type: indexMatch.type,
      state: indexMatch.state,
      region: indexMatch.region,
      tagline: `${indexMatch.name}, ${indexMatch.state}`,
      intelligenceTier: 'PARTIAL',
      heroCopy: {
        headline: `${indexMatch.name.toUpperCase()} IS MAPPED ON THE ROAM GRID.`,
        subheadline: `ROAM recognized ${indexMatch.name} in ${indexMatch.state}. Detailed spatial demand telemetry is actively being compiled for this location.`,
        overloadedCount: 0,
        underutilizedCount: 2
      },
      metrics: {
        totalDailyTourists: 5000,
        averageAttractionLoad: 35,
        visitorConcentration: 45,
        tourismDistributionStatus: 'Partial Data Mapped',
        localBusinessOpportunity: 'Community Discovery',
        monumentsAtRisk: 0,
        avgWaitTimeMinutes: 0,
        localEconomyCapturePct: 30
      },
      culturalDNA: {
        knownFor: [`Cultural heritage of ${indexMatch.state}`, 'Traditional regional crafts', 'Historic monuments'],
        taste: [`Traditional ${indexMatch.state} cuisine`, 'Locally harvested specialties'],
        landscape: [`Geographic terrain of ${indexMatch.state}`],
        festivals: [`Regional celebrations of ${indexMatch.state}`]
      }
    };
  }

  return null;
}

/**
 * Filter autocomplete suggestions based on user input.
 * Excludes all foreign queries and non-Indian destinations.
 */
export function autocompleteLocations(query, limit = 8) {
  if (!query || query.trim().length === 0) {
    return ALL_INDIAN_LOCATIONS.slice(0, limit);
  }
  const q = query.trim().toLowerCase();
  
  // Reject obvious non-Indian terms
  const nonIndianKeywords = ['kyoto', 'florence', 'paris', 'london', 'tokyo', 'new york', 'rome', 'bali'];
  if (nonIndianKeywords.some(k => q.includes(k))) {
    return [];
  }

  const matches = ALL_INDIAN_LOCATIONS.filter(item => {
    return item.name.toLowerCase().includes(q) ||
           item.state.toLowerCase().includes(q) ||
           item.tags.some(t => t.includes(q));
  });

  return matches.slice(0, limit);
}
