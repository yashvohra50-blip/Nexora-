/**
 * ROAM — Tourism Demand Intelligence Platform
 * Deterministic Recommendation Engine
 * Multi-factor transparent scoring with configurable weights.
 */

export const DEFAULT_WEIGHTS = {
  preference: 0.30,
  crowdingReduction: 0.20,
  distanceEfficiency: 0.15,
  attractionQuality: 0.15,
  localOpportunity: 0.10,
  availability: 0.10
};

/**
 * Computes deterministic score for a potential alternative destination.
 */
export function scoreAlternative(candidate, primaryAttraction, userPreferences, weights = DEFAULT_WEIGHTS) {
  // 1. Preference Match Score (0 - 100)
  const userPriority = (userPreferences?.priority || 'culture').toLowerCase();
  let preferenceScore = 60;
  if (candidate.category === 'heritage' && (userPriority === 'culture' || userPriority === 'local')) {
    preferenceScore = 95;
  } else if (candidate.category === 'museum' && userPriority === 'culture') {
    preferenceScore = 92;
  } else if (candidate.category === 'craft' && (userPriority === 'local' || userPriority === 'culture')) {
    preferenceScore = 98;
  } else if (candidate.category === 'nature' && (userPriority === 'relaxation' || userPriority === 'adventure')) {
    preferenceScore = 94;
  } else if (userPriority === 'local') {
    preferenceScore = candidate.nearbyBusinessIds.length > 0 ? 96 : 80;
  }

  // 2. Crowding Reduction Score (0 - 100)
  // The lower the candidate load, the higher the relief score
  const loadDelta = Math.max(0, primaryAttraction.loadPercentage - candidate.loadPercentage);
  const crowdingScore = Math.min(100, Math.round(100 - candidate.loadPercentage + (loadDelta * 0.25)));

  // 3. Distance & Transit Efficiency Score (0 - 100)
  // Distance between candidate and primary/center coords
  const dx = Math.abs(candidate.coords.x - primaryAttraction.coords.x);
  const dy = Math.abs(candidate.coords.y - primaryAttraction.coords.y);
  const distanceEuclidean = Math.sqrt(dx * dx + dy * dy);
  // Scale so that <= 150px distance is high efficiency
  const distanceScore = Math.max(30, Math.min(100, Math.round(100 - (distanceEuclidean * 0.18))));

  // 4. Quality & Heritage Value (0 - 100)
  let qualityScore = 85;
  if (candidate.id === 'albert-hall') qualityScore = 96;
  if (candidate.id === 'panna-meena') qualityScore = 91;
  if (candidate.id === 'anokhi-museum') qualityScore = 94;
  if (candidate.id === 'sisodia-rani') qualityScore = 89;
  if (candidate.id === 'royal-gaitor') qualityScore = 92;
  if (candidate.id === 'chand-baori') qualityScore = 97;

  // 5. Local Economic Opportunity (0 - 100)
  const localBusinessesCount = candidate.nearbyBusinessIds.length;
  const localOpportunityScore = localBusinessesCount >= 2 ? 95 : localBusinessesCount === 1 ? 82 : 60;

  // 6. Availability & Queue Avoidance (0 - 100)
  const queueRelief = primaryAttraction.currentWaitMinutes - candidate.currentWaitMinutes;
  const availabilityScore = candidate.currentWaitMinutes === 0 
    ? Math.min(100, 85 + Math.round(queueRelief * 0.2)) 
    : Math.max(50, 80 - candidate.currentWaitMinutes);

  // Total Weighted Composite Score
  const totalScore = Math.round(
    (preferenceScore * weights.preference) +
    (crowdingScore * weights.crowdingReduction) +
    (distanceScore * weights.distanceEfficiency) +
    (qualityScore * weights.attractionQuality) +
    (localOpportunityScore * weights.localOpportunity) +
    (availabilityScore * weights.availability)
  );

  const costSavedINR = Math.max(0, primaryAttraction.entryFeeINR - candidate.entryFeeINR);
  const waitSavedMinutes = Math.max(0, primaryAttraction.currentWaitMinutes - candidate.currentWaitMinutes);

  return {
    candidateId: candidate.id,
    candidateName: candidate.name,
    totalScore,
    breakdown: {
      preferenceMatch: Math.min(100, preferenceScore),
      crowdingReduction: Math.min(100, crowdingScore),
      distanceEfficiency: Math.min(100, distanceScore),
      attractionQuality: Math.min(100, qualityScore),
      localOpportunity: Math.min(100, localOpportunityScore),
      availability: Math.min(100, availabilityScore)
    },
    metrics: {
      loadReductionPct: Math.round(primaryAttraction.loadPercentage - candidate.loadPercentage),
      waitSavedMinutes,
      costSavedINR,
      localBusinessesCount
    },
    reasoning: generateReasoningText(candidate, primaryAttraction, {
      loadDelta: Math.round(primaryAttraction.loadPercentage - candidate.loadPercentage),
      costSavedINR,
      waitSavedMinutes,
      localBusinessesCount
    })
  };
}

function generateReasoningText(candidate, primary, delta) {
  const parts = [];
  parts.push(`${delta.loadDelta}% lower visitor concentration than ${primary.name}`);
  if (delta.waitSavedMinutes > 0) {
    parts.push(`saves ${delta.waitSavedMinutes} min of queue time`);
  }
  if (delta.costSavedINR > 0) {
    parts.push(`₹${delta.costSavedINR} cheaper`);
  } else if (candidate.entryFeeINR === 0) {
    parts.push('free entry heritage site');
  }
  if (delta.localBusinessesCount > 0) {
    parts.push(`directly connects to ${delta.localBusinessesCount} local artisan workshops`);
  }
  return `Recommended because it offers ${parts.join(', ')}.`;
}

/**
 * Evaluates all candidates and returns ranked alternatives for an overloaded site.
 */
export function findBestAlternatives(primaryAttraction, allAttractions, userPreferences, limit = 3) {
  const candidates = allAttractions.filter(a => a.id !== primaryAttraction.id && a.loadPercentage < 65);
  const scored = candidates.map(c => scoreAlternative(c, primaryAttraction, userPreferences));
  scored.sort((a, b) => b.totalScore - a.totalScore);
  return scored.slice(0, limit);
}
