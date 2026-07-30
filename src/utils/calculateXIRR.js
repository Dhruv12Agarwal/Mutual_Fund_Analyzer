/**
 * Calculate XIRR (Extended Internal Rate of Return)
 * For mutual funds, we approximate XIRR by calculating annualized return
 * This is simpler and more robust than complex XIRR calculation
 */

/**
 * Calculate approximate XIRR for a mutual fund based on NAV history
 * Uses a simpler approach: calculate total return and annualize it
 * 
 * @param {Array} historicalData - Array of NAV data objects with date and nav
 * @returns {number} XIRR as percentage (e.g., 12.5 for 12.5%)
 */
export function calculateXIRR(historicalData) {
  if (!historicalData || historicalData.length < 2) {
    return null;
  }

  try {
    // Get current NAV and oldest NAV
    const currentNAV = parseFloat(historicalData[0].nav);
    const oldestNAV = parseFloat(historicalData[historicalData.length - 1].nav);

    if (!isFinite(currentNAV) || !isFinite(oldestNAV) || oldestNAV === 0) {
      return null;
    }

    // Calculate total return
    const totalReturn = (currentNAV - oldestNAV) / oldestNAV;

    // Estimate period in years (using 252 trading days per year - more accurate)
    const tradingDays = historicalData.length;
    const yearsElapsed = tradingDays / 252;

    if (yearsElapsed <= 0) {
      return null;
    }

    // Calculate annualized return using CAGR formula
    const xirr = (Math.pow(1 + totalReturn, 1 / yearsElapsed) - 1) * 100;

    return isFinite(xirr) ? parseFloat(xirr.toFixed(2)) : null;
  } catch {
    return null;
  }
}

/**
 * Calculate XIRR for a specific period
 * @param {Array} historicalData - NAV history
 * @param {number} years - Number of years to calculate XIRR for
 */
export function calculateXIRRForPeriod(historicalData, years = 1) {
  if (!historicalData || historicalData.length < years * 252) {
    return null;
  }

  const periodData = historicalData.slice(0, Math.min(years * 252, historicalData.length));
  return calculateXIRR(periodData);
}

export default { calculateXIRR, calculateXIRRForPeriod };
