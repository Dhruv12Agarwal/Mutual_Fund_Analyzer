const TRADING_DAYS = 252;

export function getDailyReturns(navData) {
  if (!navData || navData.length < 2) return [];
  const returns = [];
  for (let i = 0; i < navData.length - 1; i++) {
    const today = parseFloat(navData[i].nav);
    const prev = parseFloat(navData[i + 1].nav);
    if (!isFinite(today) || !isFinite(prev) || prev === 0) continue;
    returns.push({ date: navData[i].date, ret: (today - prev) / prev });
  }
  return returns;
}

function mean(arr) {
  if (!arr.length) return 0;
  return arr.reduce((s, v) => s + v, 0) / arr.length;
}

function variance(arr, sample = true) {
  if (!arr.length) return 0;
  const m = mean(arr);
  const sum = arr.reduce((acc, v) => acc + Math.pow(v - m, 2), 0);
  return sum / (arr.length - (sample ? 1 : 0));
}

export function annualizedReturnAndVolatility(navData) {
  const daily = getDailyReturns(navData).map(d => d.ret);
  if (!daily.length) return { annualReturn: NaN, annualVol: NaN };
  const avg = mean(daily);
  const varDaily = variance(daily, true);
  const annualReturn = Math.pow(1 + avg, TRADING_DAYS) - 1;
  const annualVol = Math.sqrt(varDaily) * Math.sqrt(TRADING_DAYS);
  return { annualReturn, annualVol };
}

export function calculateSharpe(navData, riskFreeRate = 0.06) {
  const { annualReturn, annualVol } = annualizedReturnAndVolatility(navData);
  if (!isFinite(annualReturn) || !isFinite(annualVol) || annualVol === 0) return NaN;
  return (annualReturn - riskFreeRate) / annualVol;
}

/**
 * Calculate Beta - simplified version
 * Beta measures how much a fund moves compared to the market
 * Formula: Beta = Covariance(Fund, Market) / Variance(Market)
 * 
 * Since we don't have real market data, we estimate Beta based on fund characteristics
 */

export function calculateBeta(fundNav, benchmarkNav, category = "") {
  // Try to calculate from both fund and benchmark data if available
  if (benchmarkNav && Array.isArray(benchmarkNav) && benchmarkNav.length > 0) {
    try {
      const fundDaily = getDailyReturns(fundNav).map(d => d.ret);
      const benchDaily = getDailyReturns(benchmarkNav).map(d => d.ret);
      
      const minLen = Math.min(fundDaily.length, benchDaily.length);
      if (minLen < 30) return NaN;
      
      const fundDaily_trimmed = fundDaily.slice(0, minLen);
      const benchDaily_trimmed = benchDaily.slice(0, minLen);
      
      const fundMean = mean(fundDaily_trimmed);
      const benchMean = mean(benchDaily_trimmed);
      
      let covariance = 0;
      for (let i = 0; i < minLen; i++) {
        covariance += (fundDaily_trimmed[i] - fundMean) * (benchDaily_trimmed[i] - benchMean);
      }
      covariance /= minLen;
      
      const benchVar = variance(benchDaily_trimmed, false);
      
      if (benchVar === 0) return NaN;
      return covariance / benchVar;
    } catch {
      // Fall back to simple calculation if comparison fails
    }
  }
  
  // Simplified calculation based on fund volatility
  if (!fundNav || !Array.isArray(fundNav) || fundNav.length < 250) {
    return NaN;
  }

  try {
    const navValues = fundNav.map(item => parseFloat(item.nav));
    const dailyReturns = [];
    
    for (let i = 0; i < navValues.length - 1; i++) {
      const dailyReturn = (navValues[i] - navValues[i + 1]) / navValues[i + 1];
      dailyReturns.push(dailyReturn);
    }

    // Calculate volatility of the fund
    const avgReturn = mean(dailyReturns);
    const varDaily = variance(dailyReturns, true);
    const fundVolatility = Math.sqrt(varDaily);

    // Estimate market volatility (typically 1.5-2% daily)
    const marketVolatility = 0.015; // 1.5% daily volatility

    // Beta = Fund Volatility / Market Volatility
    // Adjusted for market correlation (equity funds correlate ~0.8-0.95 with market)
    const categoryLower = (category || "").toLowerCase();
    let correlation = 0.9; // Default for equity funds

    if (categoryLower.includes("debt") || categoryLower.includes("liquid")) {
      correlation = 0.3;
    } else if (categoryLower.includes("hybrid")) {
      correlation = 0.6;
    } else if (categoryLower.includes("index")) {
      correlation = 0.98; // Index funds closely follow market
    }

    const beta = (fundVolatility / marketVolatility) * correlation;

    return isFinite(beta) ? parseFloat(beta.toFixed(2)) : NaN;
  } catch {
    return NaN;
  }
}

export function calculateSimpleBeta(historicalData, category = "") {
  return calculateBeta(historicalData, null, category);
}

export function calculateTreynor(fundNav, benchmarkNav, riskFreeRate = 0.06) {
  const beta = calculateBeta(fundNav, benchmarkNav);
  if (!isFinite(beta) || beta === 0) return NaN;
  const { annualReturn } = annualizedReturnAndVolatility(fundNav);
  if (!isFinite(annualReturn)) return NaN;
  return (annualReturn - riskFreeRate) / beta;
}

export default { getDailyReturns, annualizedReturnAndVolatility, calculateSharpe, calculateBeta, calculateTreynor, calculateSimpleBeta };
