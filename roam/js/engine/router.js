/**
 * ROAM — Tourism Demand Intelligence Platform
 * Dynamic Itinerary Router & Reroute Simulator
 * Waze-style demand intelligence for tourist days.
 */

import { JAIPUR_DESTINATION } from '../data/jaipur.js';
import { scoreAlternative } from './scoring.js';

export const INITIAL_ITINERARY = [
  {
    time: '09:00 — 11:30',
    attractionId: 'amber-fort',
    type: 'primary',
    crowdLevel: 'Overloaded',
    crowdPct: 94,
    waitMin: 65,
    costINR: 500,
    note: 'Severely congested. Queue wraps around Suraj Pol courtyard.'
  },
  {
    time: '12:00 — 14:00',
    attractionId: 'city-palace',
    type: 'primary',
    crowdLevel: 'Elevated',
    crowdPct: 78,
    waitMin: 40,
    costINR: 700,
    note: 'Midday peak crowd entering Mubarak Mahal museum courtyards.'
  },
  {
    time: '15:00 — 16:30',
    attractionId: 'hawa-mahal',
    type: 'primary',
    crowdLevel: 'Overloaded',
    crowdPct: 91,
    waitMin: 45,
    costINR: 200,
    note: 'Street traffic and narrow staircases bottlenecked with tour groups.'
  }
];

export const REROUTED_ITINERARY = [
  {
    time: '09:00 — 10:30',
    attractionId: 'albert-hall',
    type: 'alternative',
    replacesId: 'amber-fort',
    crowdLevel: 'Serene',
    crowdPct: 34,
    waitMin: 0,
    costINR: 300,
    localPartnerId: 'jaipur-blue-pottery',
    note: 'Calm morning light in Ram Niwas Gardens. 0 min wait. Persian metalcraft & mummy exhibits.'
  },
  {
    time: '11:00 — 12:30',
    attractionId: 'anokhi-museum',
    type: 'local_experience',
    replacesId: null,
    crowdLevel: 'Optimal',
    crowdPct: 29,
    waitMin: 0,
    costINR: 100,
    localPartnerId: 'anokhi-handblock',
    note: 'Hands-on block printing workshop in restored haveli courtyard. Direct artisan exposure.'
  },
  {
    time: '13:00 — 14:15',
    attractionId: null,
    type: 'dining_rest',
    localPartnerId: 'laxmi-misthan',
    title: 'Heritage Spicery & Local Kitchen',
    crowdLevel: 'Comfortable',
    crowdPct: 32,
    waitMin: 5,
    costINR: 180,
    note: 'Authentic midday lunch break: freshly fried Pyaz Kachori and cool Masala Chaas away from tourist heat.'
  },
  {
    time: '14:45 — 16:30',
    attractionId: 'city-palace',
    type: 'shifted_primary',
    crowdLevel: 'Moderate',
    crowdPct: 52, // decreased during afternoon lull
    waitMin: 15,
    costINR: 700,
    note: 'Rescheduled to afternoon lull window. Group tour buses have departed.'
  },
  {
    time: '17:00 — 18:30',
    attractionId: 'royal-gaitor',
    type: 'alternative',
    replacesId: 'hawa-mahal',
    crowdLevel: 'Peaceful',
    crowdPct: 26,
    waitMin: 0,
    costINR: 50,
    localPartnerId: 'rajasthan-handicraft',
    note: 'Golden hour marble cenotaphs with zero crowds. Magnificent peaceful canyon light.'
  }
];

export function calculateRerouteImpact(initialItinerary = INITIAL_ITINERARY, reroutedItinerary = REROUTED_ITINERARY) {
  const initialWaitTotal = initialItinerary.reduce((acc, item) => acc + (item.waitMin || 0), 0);
  const reroutedWaitTotal = reroutedItinerary.reduce((acc, item) => acc + (item.waitMin || 0), 0);
  const timeSavedMin = Math.max(0, initialWaitTotal - reroutedWaitTotal);

  const initialCostTotal = initialItinerary.reduce((acc, item) => acc + (item.costINR || 0), 0);
  const reroutedCostTotal = reroutedItinerary.reduce((acc, item) => acc + (item.costINR || 0), 0);
  const costSavedINR = Math.max(0, initialCostTotal - reroutedCostTotal);

  const initialAvgCrowd = Math.round(initialItinerary.reduce((acc, item) => acc + item.crowdPct, 0) / initialItinerary.length);
  const reroutedAvgCrowd = Math.round(reroutedItinerary.reduce((acc, item) => acc + item.crowdPct, 0) / reroutedItinerary.length);
  const crowdingExposureReductionPct = Math.max(0, initialAvgCrowd - reroutedAvgCrowd);

  const localPartnersSupported = reroutedItinerary.filter(i => i.localPartnerId).length;

  return {
    timeSavedMin,
    costSavedINR,
    crowdingExposureReductionPct,
    localPartnersSupported,
    initialAvgCrowd,
    reroutedAvgCrowd,
    initialWaitTotal,
    reroutedWaitTotal
  };
}
