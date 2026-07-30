/**
 * Enhanced Investor Score V2 (0-100)
 * New methodology focusing on risk-adjusted returns and fund quality
 * 
 * Weightage Breakdown:
 * - 35% → Risk-adjusted Return (Sharpe Ratio)
 * - 20% → Long-term CAGR (5-Year)
 * - 15% → Alpha (outperformance)
 * - 10% → Consistency (positive days)
 * - 10% → Expense Ratio
 * - 5% → Maximum Drawdown
 * - 5% → Benchmark Performance
 */

import calculateCAGR from "./calculateCAGR";

/**
 * Calculate Sharpe Ratio Score (0-35 points)
 * Measures risk-adjusted returns
 */
function calculateSharpeScore(historicalData, riskFreeRate = 6.5) {
  if (!historicalData || historicalData.length < 250) {
    return 0;
  }

  const navValues = historicalData.map(item => parseFloat(item.nav));
  const dailyReturns = [];
  
  for (let i = 0; i < navValues.length - 1; i++) {
    const dailyReturn = ((navValues[i] - navValues[i + 1]) / navValues[i + 1]) * 100;
    dailyReturns.push(dailyReturn);
  }

  const avgDailyReturn = dailyReturns.reduce((a, b) => a + b, 0) / dailyReturns.length;
  const annualizedReturn = avgDailyReturn * 250;
  
  const variance = dailyReturns.reduce((sum, ret) => sum + Math.pow(ret - avgDailyReturn, 2), 0) / dailyReturns.length;
  const stdDev = Math.sqrt(variance);
  const annualizedStdDev = stdDev * Math.sqrt(250);

  if (annualizedStdDev === 0) return 0;

  const sharpeRatio = (annualizedReturn - riskFreeRate) / annualizedStdDev;

  // Sharpe Score: 0-3+ range maps to 0-35 points
  // 0 Sharpe = 0 points, 0.5 Sharpe = 5.8 points, 1 Sharpe = 11.7 points, 1.5 Sharpe = 17.5 points, 2+ Sharpe = 35 points
  const sharpeScore = Math.min(35, Math.max(0, sharpeRatio * 11.667));
  
  return {
    score: parseFloat(sharpeScore.toFixed(2)),
    sharpeRatio: parseFloat(sharpeRatio.toFixed(2))
  };
}

/**
 * Calculate Long-term CAGR Score (0-20 points)
 * 5-Year CAGR performance
 */
function calculateCAGRScore(historicalData) {
  if (!historicalData || historicalData.length < 1250) {
    // If 5Y data not available, use 3Y CAGR
    if (historicalData.length >= 750) {
      const cagr3Y = parseFloat(calculateCAGR(historicalData, 3));
      // 3Y CAGR: More reasonable range
      // -10% = 0 pts, 0% = 5 pts, 10% = 15 pts, 20%+ = 20 pts
      const cagrScore = Math.min(20, Math.max(0, (cagr3Y + 10) / 1.5));
      return {
        score: parseFloat(cagrScore.toFixed(2)),
        cagr: cagr3Y,
        period: "3Y"
      };
    }
    return { score: 0, cagr: null, period: null };
  }

  const cagr5Y = parseFloat(calculateCAGR(historicalData, 5));
  
  // 5Y CAGR: More reasonable range
  // -10% = 0 pts, 0% = 5 pts, 10% = 15 pts, 20%+ = 20 pts
  const cagrScore = Math.min(20, Math.max(0, (cagr5Y + 10) / 1.5));
  
  return {
    score: parseFloat(cagrScore.toFixed(2)),
    cagr: cagr5Y,
    period: "5Y"
  };
}

/**
 * Calculate Alpha Score (0-15 points)
 * Measures outperformance vs benchmark
 * Since we don't have actual benchmark data, we use a simulated market proxy
 */
function calculateAlphaScore(historicalData) {
  if (!historicalData || historicalData.length < 250) {
    return { score: 0, alpha: null };
  }

  const navValues = historicalData.map(item => parseFloat(item.nav));
  const dailyReturns = [];
  
  for (let i = 0; i < navValues.length - 1; i++) {
    const dailyReturn = ((navValues[i] - navValues[i + 1]) / navValues[i + 1]);
    dailyReturns.push(dailyReturn);
  }

  const avgDailyReturn = dailyReturns.reduce((a, b) => a + b, 0) / dailyReturns.length;
  const annualizedReturn = Math.pow(1 + avgDailyReturn, 250) - 1;

  // Simulated market return (assume market CAGR of 12%)
  const benchmarkReturn = 0.12;
  
  // Beta approximation: correlation between fund and market (assume 0.85 for equity funds)
  const marketRiskPremium = benchmarkReturn - 0.065; // 0.065 = risk-free rate
  const assumedBeta = 0.85;
  const expectedReturn = 0.065 + (assumedBeta * marketRiskPremium);

  // Alpha = Actual Return - Expected Return
  const alpha = (annualizedReturn - expectedReturn) * 100;

  // Alpha Score: -10% to +20% range maps to 0-15 points
  // More lenient: -10% = 0, 0% = 7.5, +10% = 15
  const alphaScore = Math.min(15, Math.max(0, (alpha + 10) / 1.333));
  
  return {
    score: parseFloat(alphaScore.toFixed(2)),
    alpha: parseFloat(alpha.toFixed(2))
  };
}

/**
 * Calculate Consistency Score (0-10 points)
 * Percentage of positive trading days in the last year
 */
function calculateConsistencyScore(historicalData) {
  if (!historicalData || historicalData.length < 250) {
    return { score: 0, consistency: null };
  }

  const navValues = historicalData.map(item => parseFloat(item.nav));
  let positiveReturns = 0;

  // Check last 250 days (1 year)
  const lastYearData = navValues.slice(0, 250);
  for (let i = 0; i < lastYearData.length - 1; i++) {
    if (lastYearData[i] > lastYearData[i + 1]) {
      positiveReturns++;
    }
  }

  const consistency = (positiveReturns / 249) * 100;
  
  // Consistency Score: 0-100% maps to 0-10 points
  const consistencyScore = (consistency / 100) * 10;
  
  return {
    score: parseFloat(consistencyScore.toFixed(2)),
    consistency: parseFloat(consistency.toFixed(2))
  };
}

/**
 * Calculate Expense Ratio Score (0-10 points)
 * Lower expense ratio = higher score
 * Note: MFAPI doesn't provide expense ratio, so we estimate based on category
 */
function calculateExpenseRatioScore(category = "") {
  // Estimated expense ratios by category (in %)
  const categoryExpenseRatios = {
    "index": 0.20,
    "etf": 0.30,
    "large": 0.50,
    "mid": 0.75,
    "small": 1.00,
    "flexi": 0.80,
    "sectoral": 1.20,
    "hybrid": 0.70,
    "debt": 0.40,
    "liquid": 0.25,
    "money": 0.15
  };

  let estimatedExpenseRatio = 0.75; // Default estimate

  const categoryLower = category.toLowerCase();
  for (const [key, ratio] of Object.entries(categoryExpenseRatios)) {
    if (categoryLower.includes(key)) {
      estimatedExpenseRatio = ratio;
      break;
    }
  }

  // Expense Ratio Score: 0-2% range maps to 10-0 points
  // 0% = 10 pts, 1% = 5 pts, 2% = 0 pts
  const expenseScore = Math.min(10, Math.max(0, 10 - (estimatedExpenseRatio * 5)));
  
  return {
    score: parseFloat(expenseScore.toFixed(2)),
    estimatedExpenseRatio: parseFloat(estimatedExpenseRatio.toFixed(2))
  };
}

/**
 * Calculate Maximum Drawdown Score (0-5 points)
 * Measures the largest peak-to-trough decline
 * Lower drawdown = higher score
 */
function calculateMaxDrawdownScore(historicalData) {
  if (!historicalData || historicalData.length < 2) {
    return { score: 0, maxDrawdown: null };
  }

  const navValues = historicalData.map(item => parseFloat(item.nav));
  
  let maxDrawdown = 0;
  let peakNAV = navValues[0];

  for (let i = 1; i < navValues.length; i++) {
    if (navValues[i] > peakNAV) {
      peakNAV = navValues[i];
    }
    
    const drawdown = ((peakNAV - navValues[i]) / peakNAV) * 100;
    if (drawdown > maxDrawdown) {
      maxDrawdown = drawdown;
    }
  }

  // Maximum Drawdown Score: 0-50% range maps to 5-0 points
  // 0% drawdown = 5 pts, 25% = 2.5 pts, 50%+ = 0 pts
  const drawdownScore = Math.min(5, Math.max(0, 5 - (maxDrawdown / 10)));
  
  return {
    score: parseFloat(drawdownScore.toFixed(2)),
    maxDrawdown: parseFloat(maxDrawdown.toFixed(2))
  };
}

/**
 * Calculate Benchmark Performance Score (0-5 points)
 * Measures performance vs estimated benchmark
 */
function calculateBenchmarkScore(historicalData) {
  if (!historicalData || historicalData.length < 250) {
    return { score: 0, benchmarkPerformance: null };
  }

  const navValues = historicalData.map(item => parseFloat(item.nav));
  
  // Calculate 1-year simple return
  const currentNAV = navValues[0];
  const oneYearAgoNAV = historicalData.length >= 250 ? navValues[250] : navValues[navValues.length - 1];
  const fundReturn = ((currentNAV - oneYearAgoNAV) / oneYearAgoNAV) * 100;

  // Assumed benchmark return (Nifty 50 average: ~12% annually)
  const benchmarkReturn = 12;

  // Performance difference
  const performanceDiff = fundReturn - benchmarkReturn;

  // Benchmark Score: -15% to +15% outperformance maps to 0-5 points
  // -15% = 0 pts, 0% = 2.5 pts, +15% = 5 pts
  const benchmarkScore = Math.min(5, Math.max(0, 2.5 + (performanceDiff / 6)));
  
  return {
    score: parseFloat(benchmarkScore.toFixed(2)),
    fundReturn: parseFloat(fundReturn.toFixed(2)),
    benchmarkReturn: benchmarkReturn,
    outperformance: parseFloat(performanceDiff.toFixed(2))
  };
}

/**
 * Main function: Calculate Investor Score V2
 * Combines all components into a single 0-100 score
 */
export function calculateInvestorScoreV2(historicalData, category = "") {
  if (!historicalData || historicalData.length < 250) {
    return {
      score: 0,
      breakdown: {},
      message: "Insufficient data for scoring"
    };
  }

  // Calculate all components
  const sharpeData = calculateSharpeScore(historicalData);
  const cagrData = calculateCAGRScore(historicalData);
  const alphaData = calculateAlphaScore(historicalData);
  const consistencyData = calculateConsistencyScore(historicalData);
  const expenseData = calculateExpenseRatioScore(category);
  const drawdownData = calculateMaxDrawdownScore(historicalData);
  const benchmarkData = calculateBenchmarkScore(historicalData);

  // Calculate total score (weighted sum = 100)
  // Normalize each component to its max points first, then apply weight
  const totalScore =
    (sharpeData.score / 35 * 100 * 0.35) +      // Normalize sharpe to 0-100, then apply 35% weight
    (cagrData.score / 20 * 100 * 0.20) +         // Normalize CAGR to 0-100, then apply 20% weight
    (alphaData.score / 15 * 100 * 0.15) +        // Normalize alpha to 0-100, then apply 15% weight
    (consistencyData.score / 10 * 100 * 0.10) +  // Normalize consistency to 0-100, then apply 10% weight
    (expenseData.score / 10 * 100 * 0.10) +      // Normalize expense to 0-100, then apply 10% weight
    (drawdownData.score / 5 * 100 * 0.05) +      // Normalize drawdown to 0-100, then apply 5% weight
    (benchmarkData.score / 5 * 100 * 0.05);      // Normalize benchmark to 0-100, then apply 5% weight

  // Ensure score is between 0 and 100
  const finalScore = Math.min(100, Math.max(0, totalScore));

  return {
    score: parseFloat(finalScore.toFixed(2)),
    breakdown: {
      // Component scores (out of their max points)
      sharpeRatio: {
        score: sharpeData.score,
        weight: 0.35,
        value: sharpeData.sharpeRatio,
        maxPoints: 35,
        description: "Risk-adjusted return metric"
      },
      cagr5Y: {
        score: cagrData.score,
        weight: 0.20,
        value: cagrData.cagr,
        period: cagrData.period,
        maxPoints: 20,
        description: "Long-term compound annual growth rate"
      },
      alpha: {
        score: alphaData.score,
        weight: 0.15,
        value: alphaData.alpha,
        maxPoints: 15,
        description: "Outperformance vs expected return"
      },
      consistency: {
        score: consistencyData.score,
        weight: 0.10,
        value: consistencyData.consistency,
        maxPoints: 10,
        description: "% of positive trading days"
      },
      expenseRatio: {
        score: expenseData.score,
        weight: 0.10,
        value: expenseData.estimatedExpenseRatio,
        maxPoints: 10,
        description: "Estimated expense ratio (lower is better)"
      },
      maxDrawdown: {
        score: drawdownData.score,
        weight: 0.05,
        value: drawdownData.maxDrawdown,
        maxPoints: 5,
        description: "Maximum peak-to-trough decline"
      },
      benchmarkPerformance: {
        score: benchmarkData.score,
        weight: 0.05,
        value: benchmarkData.outperformance,
        maxPoints: 5,
        description: "Performance vs market benchmark"
      }
    },
    scoreDetails: {
      totalWeight: 1.00, // Should always be 1.0 (100%)
      calculatedAt: new Date().toISOString()
    }
  };
}

/**
 * Get rating label based on new V2 score
 */
export function getScoreRatingV2(score) {
  if (score >= 80) return "Excellent";
  if (score >= 65) return "Very Good";
  if (score >= 50) return "Good";
  if (score >= 35) return "Average";
  if (score >= 20) return "Below Average";
  return "Poor";
}

/**
 * Get score color based on V2 rating
 */
export function getScoreColorV2(score) {
  if (score >= 80) return "#00C853"; // Excellent - Green
  if (score >= 65) return "#4CAF50"; // Very Good - Light Green
  if (score >= 50) return "#8BC34A"; // Good - Lime Green
  if (score >= 35) return "#FFC107"; // Average - Amber
  if (score >= 20) return "#FF9800"; // Below Average - Orange
  return "#F44336"; // Poor - Red
}

// Keep the old function for backward compatibility
export { calculateInvestorScore } from "./calculateInvestorScore";
