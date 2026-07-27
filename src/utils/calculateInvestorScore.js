import calculateCAGR from "./calculateCAGR";

/**
 * Calculates an Investor Score (0-100) based on fund performance metrics
 * 
 * Scoring Breakdown:
 * - 1Y Return: 25 points (recent performance)
 * - 3Y CAGR: 25 points (medium-term consistency)
 * - 5Y CAGR: 25 points (long-term growth)
 * - Volatility: 15 points (stability - lower is better)
 * - Consistency: 10 points (how stable returns are)
 */
export function calculateInvestorScore(historicalData) {
  if (!historicalData || historicalData.length < 250) {
    return { score: 0, breakdown: {} };
  }

  // Extract NAV values
  const navValues = historicalData.map((item) => parseFloat(item.nav));

  // Calculate 1Y return
  let return1Y = 0;
  if (historicalData.length >= 250) {
    const currentNAV = navValues[0];
    const oldNAV = navValues[250];
    return1Y = ((currentNAV - oldNAV) / oldNAV) * 100;
  }

  // Calculate 3Y CAGR
  let cagr3Y = 0;
  if (historicalData.length >= 750) {
    cagr3Y = parseFloat(calculateCAGR(historicalData, 3));
  }

  // Calculate 5Y CAGR
  let cagr5Y = 0;
  if (historicalData.length >= 1250) {
    cagr5Y = parseFloat(calculateCAGR(historicalData, 5));
  }

  // Calculate volatility (standard deviation of daily returns)
  let volatility = 0;
  if (navValues.length > 1) {
    const dailyReturns = [];
    for (let i = 0; i < navValues.length - 1; i++) {
      const dailyReturn =
        ((navValues[i] - navValues[i + 1]) / navValues[i + 1]) * 100;
      dailyReturns.push(dailyReturn);
    }

    const mean =
      dailyReturns.reduce((a, b) => a + b, 0) / dailyReturns.length;
    const variance =
      dailyReturns.reduce((sum, ret) => sum + Math.pow(ret - mean, 2), 0) /
      dailyReturns.length;
    volatility = Math.sqrt(variance);
  }

  // Calculate consistency (percentage of positive daily returns in last year)
  let consistency = 0;
  if (navValues.length > 250) {
    const lastYearData = navValues.slice(0, 250);
    let positiveReturns = 0;
    for (let i = 0; i < lastYearData.length - 1; i++) {
      if (lastYearData[i] > lastYearData[i + 1]) {
        positiveReturns++;
      }
    }
    consistency = (positiveReturns / 249) * 100;
  }

  // Scoring logic (0-100 scale)

  // 1Y Return scoring: normalize to -50% to +50% range
  // -50% = 0 points, 0% = 12.5 points, +50% = 25 points
  let score1Y = Math.min(25, Math.max(0, (return1Y + 50) / 4));

  // 3Y CAGR scoring: normalize to -20% to +40% range
  // -20% = 0 points, 0% = 12.5 points, +40% = 25 points
  let score3Y = Math.min(25, Math.max(0, (cagr3Y + 20) / 2.4));

  // 5Y CAGR scoring: normalize to -20% to +40% range
  let score5Y = Math.min(25, Math.max(0, (cagr5Y + 20) / 2.4));

  // Volatility scoring: lower volatility is better
  // 0% = 15 points, 5% = 10 points, 15%+ = 0 points
  let scoreVolatility = Math.min(15, Math.max(0, 15 - volatility * 1));

  // Consistency scoring: percentage of positive daily returns
  // 0% = 0 points, 50% = 5 points, 100% = 10 points
  let scoreConsistency = (consistency / 100) * 10;

  // Total score
  const totalScore =
    score1Y + score3Y + score5Y + scoreVolatility + scoreConsistency;

  // Normalize to 0-100
  const normalizedScore = Math.min(100, Math.max(0, totalScore));

  return {
    score: parseFloat(normalizedScore.toFixed(2)),
    breakdown: {
      return1Y: parseFloat(return1Y.toFixed(2)),
      cagr3Y: parseFloat(cagr3Y.toFixed(2)),
      cagr5Y: parseFloat(cagr5Y.toFixed(2)),
      volatility: parseFloat(volatility.toFixed(2)),
      consistency: parseFloat(consistency.toFixed(2)),
      scoreBreakdown: {
        score1Y: parseFloat(score1Y.toFixed(2)),
        score3Y: parseFloat(score3Y.toFixed(2)),
        score5Y: parseFloat(score5Y.toFixed(2)),
        scoreVolatility: parseFloat(scoreVolatility.toFixed(2)),
        scoreConsistency: parseFloat(scoreConsistency.toFixed(2)),
      },
    },
  };
}

/**
 * Get rating label based on score
 */
export function getScoreRating(score) {
  if (score >= 85) return "Excellent";
  if (score >= 70) return "Very Good";
  if (score >= 55) return "Good";
  if (score >= 40) return "Average";
  if (score >= 25) return "Below Average";
  return "Poor";
}

/**
 * Get score color based on rating
 */
export function getScoreColor(score) {
  if (score >= 85) return "#00C853"; // Excellent - Green
  if (score >= 70) return "#4CAF50"; // Very Good - Light Green
  if (score >= 55) return "#8BC34A"; // Good - Lime Green
  if (score >= 40) return "#FFC107"; // Average - Amber
  if (score >= 25) return "#FF9800"; // Below Average - Orange
  return "#F44336"; // Poor - Red
}
