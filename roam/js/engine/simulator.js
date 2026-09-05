/**
 * ROAM — Tourism Demand Intelligence Platform
 * Destination Authority Policy Simulator & Impact Calculator
 * Deterministic macro-economic & infrastructure projections.
 */

/**
 * Simulates policy intervention impact across the city.
 * @param {number} redirectPct Percentage of visitors targeted for redistribution (5 - 30)
 * @param {string} incentiveTier 'standard' | 'boosted' | 'maximum'
 */
export function simulatePolicyImpact(redirectPct = 15, incentiveTier = 'standard') {
  const tierMultiplier = incentiveTier === 'maximum' ? 1.25 : incentiveTier === 'boosted' ? 1.10 : 1.0;

  // 1. Peak Congestion Reduction (% decrease)
  // e.g. 15% redirection leads to ~23% reduction at peak bottlenecks
  const peakCongestionReductionPct = Math.round(redirectPct * 1.55 * tierMultiplier);

  // 2. Average Tourist Travel/Wait Time Reduction
  const travelTimeReductionPct = Math.round(redirectPct * 0.73 * tierMultiplier);

  // 3. Underutilized Attraction Footfall Uplift (% increase)
  const underutilizedVisitsUpliftPct = Math.round(redirectPct * 2.05 * tierMultiplier);

  // 4. Local Business Revenue Exposure Uplift (% increase)
  const localBusinessExposureUpliftPct = Math.round(redirectPct * 1.20 * tierMultiplier);

  // 5. Cultural Heritage Conservation Stress Relief Index (Score out of 100)
  const heritageStressReliefScore = Math.min(98, Math.round(45 + (redirectPct * 1.7 * tierMultiplier)));

  return {
    redirectPct,
    incentiveTier,
    metrics: {
      peakCongestionReductionPct: Math.min(48, peakCongestionReductionPct),
      travelTimeReductionPct: Math.min(35, travelTimeReductionPct),
      underutilizedVisitsUpliftPct: Math.min(85, underutilizedVisitsUpliftPct),
      localBusinessExposureUpliftPct: Math.min(50, localBusinessExposureUpliftPct),
      heritageStressReliefScore
    }
  };
}

/**
 * Macro city impact calculator for customizable hackathon simulation.
 */
export function calculateMacroImpact(totalMonthlyTourists = 65000, redirectPct = 18, avgSpendINR = 3800, currentConcentrationPct = 82) {
  const touristsRedistributed = Math.round(totalMonthlyTourists * (redirectPct / 100));
  
  // Local spending distributed to grassroots community (artisans, local cafes, stepwell guides)
  // Assuming 40% of redirected tourists spend directly with local businesses
  const additionalLocalSpendINR = Math.round(touristsRedistributed * avgSpendINR * 0.45);
  const additionalLocalSpendCrores = (additionalLocalSpendINR / 10000000).toFixed(2);

  // Hours of tourist queuing saved across destination
  // Average 45 minutes saved per redistributed tourist day
  const queueHoursSavedTotal = Math.round(touristsRedistributed * 0.75);

  // Congestion reduction in top 3 historic monuments
  const congestionReductionPct = Math.round(redirectPct * 1.4);

  // New balanced concentration percentage
  const newConcentrationPct = Math.max(45, Math.round(currentConcentrationPct - congestionReductionPct));

  return {
    totalMonthlyTourists,
    redirectPct,
    avgSpendINR,
    currentConcentrationPct,
    results: {
      touristsRedistributed,
      additionalLocalSpendCrores,
      additionalLocalSpendINR,
      queueHoursSavedTotal,
      congestionReductionPct,
      newConcentrationPct
    }
  };
}
