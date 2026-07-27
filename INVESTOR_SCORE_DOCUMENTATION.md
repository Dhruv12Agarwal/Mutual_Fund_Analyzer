# Investor Score Feature Documentation

## Overview
The Investor Score is a comprehensive rating system (0-100) that evaluates how well each mutual fund is performing based on multiple financial metrics. This helps users quickly identify quality funds without needing to analyze complex data manually.

## Scoring Methodology

The Investor Score combines five key performance metrics:

### 1. **1-Year Return (25 points)**
- Measures recent performance over the past 12 months
- Range: -50% to +50%
- Normalized scoring: -50% = 0 pts, 0% = 12.5 pts, +50% = 25 pts

### 2. **3-Year CAGR (25 points)**
- Compound Annual Growth Rate over 3 years
- Measures medium-term consistency
- Range: -20% to +40%
- Normalized scoring: -20% = 0 pts, 0% = 12.5 pts, +40% = 25 pts

### 3. **5-Year CAGR (25 points)**
- Compound Annual Growth Rate over 5 years
- Measures long-term growth trajectory
- Range: -20% to +40%
- Normalized scoring: -20% = 0 pts, 0% = 12.5 pts, +40% = 25 pts

### 4. **Volatility (15 points)**
- Standard deviation of daily returns
- Lower volatility = more stability = higher score
- Scoring: 0% volatility = 15 pts, 5% = 10 pts, 15%+ = 0 pts
- This rewards steady, predictable performance

### 5. **Consistency (10 points)**
- Percentage of trading days with positive returns (last 12 months)
- Measures how many days the fund performed positively
- Scoring: 0% positive days = 0 pts, 50% = 5 pts, 100% = 10 pts

## Score Ratings

| Score Range | Rating | Symbol | Interpretation |
|-------------|--------|--------|-----------------|
| 85-100 | Excellent | 🟢 | Outstanding performance, strong buy |
| 70-84 | Very Good | 🟢 | Above average, solid performer |
| 55-69 | Good | 🟡 | Acceptable performance |
| 40-54 | Average | 🟠 | Moderate performance, needs caution |
| 25-39 | Below Average | 🟠 | Underperforming, avoid |
| 0-24 | Poor | 🔴 | Weak performance, high risk |

### Color Coding
- **#00C853** (Green): Excellent (85+)
- **#4CAF50** (Light Green): Very Good (70-84)
- **#8BC34A** (Lime Green): Good (55-69)
- **#FFC107** (Amber): Average (40-54)
- **#FF9800** (Orange): Below Average (25-39)
- **#F44336** (Red): Poor (0-24)

## Where the Score Appears

### 1. **Home Page**
- New "Avg Investor Score" card showing the best-performing fund in your portfolio
- Displays the top-scoring fund name and its score with color coding

### 2. **Portfolio Page**
- Each fund card displays: `📊 Investor Score: XX/100 (Rating)`
- Color-coded text for quick visual identification

### 3. **Fund Details Page**
- Large investor score display with rating label in stats section
- "Performance Breakdown" section showing:
  - 1-Year Return (with color indicator)
  - 3-Year CAGR (with color indicator)
  - 5-Year CAGR (with color indicator)
  - Volatility (% - lower is better)
  - Consistency (% of positive days)

### 4. **Compare Funds Page**
- Comparison table includes "Investor Score" row
- Shows both funds' scores side-by-side with ratings
- Color-coded for easy comparison

## Implementation Details

### New File
- **`src/utils/calculateInvestorScore.js`**
  - `calculateInvestorScore(historicalData)` - Main scoring function
  - `getScoreRating(score)` - Returns text rating (Excellent, Very Good, etc.)
  - `getScoreColor(score)` - Returns color hex code based on score

### Modified Files
- **`src/services/fundService.js`**
  - Now calculates Investor Score for each fund when fetched
  - Adds `investorScore` and `scoreDetails` properties to fund objects

- **`src/Components/FundCard.jsx`**
  - Displays score with rating and color coding

- **`src/Components/CompareFunds.jsx`**
  - Added Investor Score row to comparison table
  - Shows both funds' scores for easy comparison

- **`src/pages/FundDetails.jsx`**
  - Displays large investor score with rating
  - Shows detailed performance breakdown with individual metrics

- **`src/pages/Home.jsx`**
  - Added fourth summary card showing average portfolio score
  - Highlights best-performing fund

## Usage Examples

### Finding the Best Fund
1. Go to Portfolio page
2. Look for the highest Investor Score (color-coded green)
3. Sort by score to identify top performers

### Comparing Funds
1. Go to Compare Funds page
2. Select two funds
3. Check their Investor Scores in the comparison table
4. Higher score indicates better overall performance

### Fund Details Analysis
1. Click on any fund to view its details page
2. See the Investor Score prominently displayed
3. Check the Performance Breakdown section for detailed metrics
4. Understand what drives the score (returns, CAGR, volatility, consistency)

## Data Requirements

For a fund to receive a score:
- **Minimum 250 trading days** (1 year) of data required
- 3-Year and 5-Year scores require 750+ and 1250+ days respectively
- If insufficient data, those components return N/A

## Technical Notes

- Score calculation is **real-time** - happens when funds load
- **Non-persistent** - scores update fresh each session based on latest NAV data
- Based on **historical data only** - does not predict future performance
- Calculations are **mathematical** - not influenced by fund house or ratings from other sources

## Future Enhancements

Possible improvements:
- Add Sharpe Ratio (risk-adjusted returns)
- Include Sortino Ratio (downside risk)
- Factor in fund expense ratios
- Add peer comparison within category
- Machine learning-based scoring
- Historical score trends
- User preference weighting

## Disclaimer

⚠️ **Important**: The Investor Score is for informational purposes only:
- Past performance does not guarantee future results
- Scores should be one of many factors in investment decisions
- Always read fund prospectuses before investing
- Consult with financial advisors for personalized advice
- This tool does not constitute financial advice
- Check SEBI regulations and compliance before investing in mutual funds
