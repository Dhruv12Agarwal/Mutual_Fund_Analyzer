# Mutual Fund Analyzer - Comprehensive Feature Report

**Project Overview**

The Mutual Fund Analyzer is a web-based application designed to help investors analyze, compare, and track Indian mutual fund investments. Built with React and modern web technologies, it provides real-time data from the MFAPI.in API and offers comprehensive analytical tools for informed investment decisions.

---

## Table of Contents

1. [Application Architecture](#1-application-architecture)
2. [Navigation & User Interface](#2-navigation--user-interface)
3. [Home Page](#3-home-page)
4. [Portfolio Management](#4-portfolio-management)
5. [Fund Comparison](#5-fund-comparison)
6. [SIP Calculator](#6-sip-calculator)
7. [Fund Details Page](#7-fund-details-page)
8. [News Feed](#8-news-feed)
9. [Search & Discovery](#9-search--discovery)
10. [Investor Score System](#10-investor-score-system)
11. [Data Visualization](#11-data-visualization)
12. [API Integrations](#12-api-integrations)
13. [Technical Implementation](#13-technical-implementation)

---

## 1. Application Architecture

### Technology Stack
- **Frontend Framework:** React 18 with Vite build system
- **Routing:** React Router v6 for client-side navigation
- **Charting:** Chart.js with react-chartjs-2 for interactive visualizations
- **Icons:** React Icons library for UI elements
- **API Integration:** MFAPI.in (free mutual fund data) and Marketaux (financial news)
- **Styling:** Inline CSS with JavaScript style objects
- **Theme:** Dark mode design with green accent color (#00C853)

### Application Routes
| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Landing page with dashboard and search |
| `/portfolio` | Portfolio | Fund management and analytics |
| `/compare` | Compare | Side-by-side fund comparison |
| `/calculator` | Calculator | SIP investment calculator |
| `/fund/:schemeCode` | FundDetails | Individual fund information |
| `/news` | News | Financial news feed |

### State Management
The application manages global state including:
- Portfolio funds (add/remove functionality)
- Search results from 40,000+ Indian mutual fund schemes
- Category, Plan, and Option filters
- Comparison selections (two funds for side-by-side analysis)

---

## 2. Navigation & User Interface

### Navigation Bar
The application features a persistent navigation bar with the following elements:

**Brand Identity**
- "Investo" logo with trend-up icon
- Green accent color for brand recognition

**Navigation Links**
- Home
- Portfolio
- Compare
- Calculator
- News

**Search Functionality**
- Magnifying glass icon to open search modal
- Pill-shaped design with hover effects
- Active state highlighting with green background

**[Screenshot Placeholder: Navigation Bar]**

### Design Language
- **Color Scheme:** Dark background (#111827) with green accents (#00C853)
- **Typography:** Clean, modern sans-serif fonts
- **Cards:** Rounded corners (16px), subtle borders (#333), shadow effects
- **Interactions:** Smooth transitions, hover effects with glow animations
- **Responsive:** Adapts to various screen sizes with flexible grid layouts

---

## 3. Home Page

The home page serves as the primary landing and discovery interface.

### Hero Section

**Visual Elements**
- Large application title: "Mutual Fund Analyzer"
- Tagline: "Analyze • Compare • Track Investments"
- Descriptive text explaining the application's purpose
- Call-to-action buttons:
  - "View Portfolio" - navigates to portfolio page
  - "Compare Funds" - navigates to comparison page

**[Screenshot Placeholder: Home Page Hero Section]**

### Feature Cards

Three prominently displayed feature cards highlight the core capabilities:

#### Analyze Card
- **Icon:** Chart line icon (FaChartLine)
- **Title:** "Analyze"
- **Description:** Historical NAV trends, returns and CAGR
- **Visual:** Green icon on dark card background

#### Compare Card
- **Icon:** Balance scale icon (FaBalanceScale)
- **Title:** "Compare"
- **Description:** Compare multiple mutual funds
- **Visual:** Green icon on dark card background

#### Discover Card
- **Icon:** Compass icon (FaCompass)
- **Title:** "Discover"
- **Description:** Search and discover mutual funds
- **Visual:** Green icon on dark card background

**[Screenshot Placeholder: Feature Cards Section]**

### Summary Dashboard

The dashboard displays key portfolio metrics in card format:

**Funds Added Card**
- Displays total count of funds in portfolio
- Large number display with descriptive label

**Average Return Card**
- Shows portfolio average 1-year return
- Percentage display with appropriate styling

**Best Performer Card**
- Highlights top-performing fund
- Shows fund name (shortened) and return percentage

**[Screenshot Placeholder: Summary Dashboard]**

### SEBI Investor Guidelines

An informational section provides important investor awareness:
- Market risk warnings
- Document reading reminders
- Diversification advice
- Performance disclaimer

**[Screenshot Placeholder: SEBI Guidelines Section]**

### Integrated Search

The home page embeds the SearchSection component, allowing users to:
- Search across 40,000+ mutual fund schemes
- Filter by category, plan type, and option type
- View and click search results to explore funds

**[Screenshot Placeholder: Home Page Search Section]**

---

## 4. Portfolio Management

The Portfolio page provides comprehensive fund management capabilities.

### Fund Display

**Grid Layout**
- Responsive grid with auto-fill columns (minimum 350px width)
- Equal spacing (20px gap) between cards
- Adapts to screen size automatically

**Fund Cards**
Each fund card displays:
- Fund name
- Category classification
- 1-Year return percentage
- Risk level (color-coded)
- Investor Score with rating
- "View NAV History" button
- Remove button (X icon)

**[Screenshot Placeholder: Portfolio Grid Layout]**

### Empty State

When no funds are added:
- Centered informational message
- Guidance to search and add funds
- Friendly user experience

**[Screenshot Placeholder: Empty Portfolio State]**

### Filtering & Sorting

**Category Filters**
Button group for quick category selection:
- All Funds
- Flexi Cap
- Value Fund
- Sectoral
- Hybrid
- Index Funds
- Liquid
- ETF
- Other

**[Screenshot Placeholder: Category Filter Buttons]**

**Sort Options**
Toggle buttons for sorting:
- Highest Returns (descending)
- Lowest Returns (ascending)

**Search Filter**
- Text input to filter current portfolio funds
- Real-time filtering as user types

**[Screenshot Placeholder: Filter Controls]**

### Interactive Charts

**NAV History Popup**
- Triggered by clicking "View NAV History" button
- Modal overlay with NAVChart component
- Historical data visualization
- Close on X button or click outside

**[Screenshot Placeholder: NAV Chart Popup]**

### Portfolio Analytics

**Risk Distribution Chart**
- Pie chart showing risk breakdown (Low/Medium/High)
- Color-coded segments:
  - Green: Low risk funds
  - Amber: Medium risk funds
  - Red: High risk funds
- Interactive tooltips with fund counts and percentages

**[Screenshot Placeholder: Risk Distribution Pie Chart]**

**Portfolio Statistics Panel**
- Total Funds count
- Average 1-Year Return
- Average Investor Score
- Key insights summary

**[Screenshot Placeholder: Portfolio Statistics]**

### Fund Management Actions

**Add Fund**
- Search and add funds from home page
- One-click addition from fund details page
- Duplicate detection with messaging
- Success/error feedback

**Remove Fund**
- X button on each card
- Hover animation for visibility
- Immediate removal from portfolio

---

## 5. Fund Comparison

The Compare page enables side-by-side analysis of two mutual funds.

### Fund Selection

**Dual Dropdown Selectors**
- Two separate dropdown menus for fund selection
- Lists all portfolio funds
- Real-time selection updates
- Clear visual separation between selectors

**[Screenshot Placeholder: Fund Selection Dropdowns]**

### Comparison Table

Side-by-side comparison displays the following metrics:

| Metric | Fund 1 | Fund 2 |
|--------|--------|--------|
| Category | [Value] | [Value] |
| 1-Year Return | [Value] | [Value] |
| Risk Level | [Value] | [Value] |
| Investor Score | [Value] | [Value] |

**Visual Indicators**
- Color-coded risk levels:
  - Red: High risk
  - Yellow/Amber: Medium risk
  - Green: Low risk
- Color-coded investor scores based on rating

**[Screenshot Placeholder: Comparison Table]**

### Comparison Chart

**Popup Modal**
- Triggered by clicking "View Comparison Chart" button
- Full-width modal with overlay
- CompareChart component visualization

**Chart Features**

**Dual-Line Visualization**
- Overlaid NAV lines for both funds
- Green line (#4CAF50): Fund 1
- Blue line (#2196F3): Fund 2
- Legend displaying fund names

**View Modes**
- **NAV View:** Absolute NAV values on Y-axis
- **Growth % View:** Percentage growth from starting point

**Time Range Selection**
Buttons for different time periods:
- 1M (1 Month)
- 6M (6 Months)
- 1Y (1 Year)
- 3Y (3 Years)
- 5Y (5 Years)
- MAX (All available data)

**[Screenshot Placeholder: Comparison Chart - NAV View]**

**[Screenshot Placeholder: Comparison Chart - Growth % View]**

**Interactive Features**
- Tooltips showing fund values on hover
- Vertical guide line following cursor
- Currency (₹) and percentage formatting
- Synchronized data points for accurate comparison

---

## 6. SIP Calculator

The Calculator page provides a Systematic Investment Plan calculator for projecting investment returns.

### Input Parameters

**Monthly Investment Amount**
- Numerical input field
- Rupee currency indicator
- Validation for positive numbers

**Investment Duration**
- Duration in years
- Slider or numerical input
- Typical range: 1-30 years

**Expected Return Source**

Two options available:

**Option 1: Custom Return Rate**
- Manual entry of expected annual return percentage
- Useful for hypothetical scenarios

**Option 2: Use Fund's Actual Return**
- Dropdown to select any portfolio fund
- Automatically uses the fund's actual 1-year return
- Displays fund details:
  - Fund category
  - Risk level
  - Past 1-year return

**[Screenshot Placeholder: SIP Calculator Input Section]]

### Calculation Results

**Summary Display**
- **Total Investment:** Total amount invested over the period
- **Estimated Returns:** Profit earned on investment
- **Total Maturity Value:** Final amount (Investment + Returns)

**[Screenshot Placeholder: SIP Calculator Results]**

### Investment Breakdown Chart

**Pie Chart Visualization**
- Two segments:
  - **Blue:** Investment amount (principal)
  - **Green:** Returns earned (profit)
- Percentage labels on each segment
- Interactive tooltips with rupee values

**[Screenshot Placeholder: SIP Pie Chart]**

### Formula Used

The SIP calculator uses the standard compound interest formula for systematic investments:

```
M = P × [{(1+r)^n - 1} / r] × (1+r)

Where:
M = Maturity Amount
P = Monthly Investment
r = Monthly Interest Rate (annual rate / 12 / 100)
n = Number of Months (years × 12)
```

---

## 7. Fund Details Page

The Fund Details page provides comprehensive information about an individual mutual fund, accessible by clicking on any fund.

### Dynamic Data Loading

**API Integration**
- Fetches live data from MFAPI.in using the fund's scheme code
- Real-time NAV values
- Complete historical data

**Loading State**
- Loading indicator while data fetches
- Error handling with retry option

**[Screenshot Placeholder: Fund Details Loading State]**

### Fund Header

**Fund Name**
- Large, prominent display (64px font)
- Word-breaking for long names
- Centered alignment

**Fund Information**
- Fund House: AMC name
- Scheme Category: Fund category

**[Screenshot Placeholder: Fund Details Header]**

### Interactive NAV Chart

**Full-Width Chart**
- Comprehensive NAVChart component
- Historical NAV data visualization
- Dark background with border styling

**Time Range Buttons**
- 1M, 6M, 1Y, 3Y, 5Y, MAX options
- Active state highlighting
- Instant chart updates

**Performance Display**
- Percentage gain/loss for selected period
- Color-coded: Green for gains, Red for losses
- Large font size for visibility

**[Screenshot Placeholder: Fund Details NAV Chart]**

### Statistics Cards

Five key metrics displayed in card format:

| Statistic | Description |
|-----------|-------------|
| **NAV** | Current Net Asset Value (₹) |
| **Risk** | Risk level with color coding |
| **52W High** | 52-week high NAV value |
| **52W Low** | 52-week low NAV value |
| **Investor Score** | Comprehensive score (0-100) with rating label |

**[Screenshot Placeholder: Fund Details Statistics Cards]**

### Performance Breakdown

Detailed breakdown of the Investor Score calculation:

**1-Year Return**
- Simple return over past year
- Color-coded based on performance

**3-Year CAGR**
- Compound Annual Growth Rate over 3 years
- Measures medium-term consistency

**5-Year CAGR**
- Compound Annual Growth Rate over 5 years
- Measures long-term growth trajectory

**Volatility %**
- Standard deviation of daily returns
- Lower percentage = more stable fund
- Visual indicator showing lower is better

**Consistency %**
- Percentage of trading days with positive returns (last 12 months)
- Higher percentage = more consistent fund

**[Screenshot Placeholder: Performance Breakdown Section]**

### Add to Portfolio

**Action Button**
- Prominent "Add to Portfolio" button
- One-click addition
- Instant feedback

**Validation**
- Duplicate detection
- Error/success messaging
- Visual feedback on action

**[Screenshot Placeholder: Add to Portfolio Button]**

### Similar Funds Recommendations

**Algorithm-Based Matching**
The application recommends similar funds using a weighted scoring system:

**Category Weights**
- small, mid, large, flexi, multi, value, focused, contra, index, hybrid, elss: 5 points each
- cap: 4 points

**AMC Weights**
- Major AMCs (Axis, HDFC, SBI, ICICI, etc.): 2-3 points each
- Specialized AMCs (Parag, Quant): 4 points

**Recommendation Display**
- Up to 4 similar funds from different AMCs
- Clickable cards navigating to their detail pages
- Hover effects for interactivity

**[Screenshot Placeholder: Similar Funds Recommendations]**

---

## 8. News Feed

The News page provides a curated feed of financial news relevant to Indian markets.

### News Integration

**API Source**
- Marketaux API integration
- India-focused financial news
- Top 10 headlines

**[Screenshot Placeholder: News Page Header]**

### News Cards

**Card Layout**
- Dark background (#111827)
- Rounded corners (15px)
- Subtle border (#333)
- Responsive width (max 1000px)

**Card Content**
- **Title:** Article headline (prominent)
- **Description:** Article summary
- **Publication Date:** Formatted date display

**[Screenshot Placeholder: News Card Example]**

### Page Design

- Centered layout with padding
- "Today's Top Headlines" title
- Vertical stacking of news cards
- Consistent spacing between cards

**[Screenshot Placeholder: Full News Page]**

---

## 9. Search & Discovery

### Search Functionality

**Global Search**
- Access from navbar search button
- Searches across 40,000+ Indian mutual fund schemes
- Real-time search as you type

**[Screenshot Placeholder: Search Modal Open]**

### Advanced Filters

**Category Filter**
Options include:
- All Categories
- Flexi Cap
- Liquid
- Hybrid
- Index
- ETF
- Sectoral

**Plan Type Filter**
- All Plans
- Direct Plan
- Regular Plan

**Option Type Filter**
- All Options
- Growth
- IDCW (Income Distribution cum Capital Withdrawal)

**[Screenshot Placeholder: Search Filters]**

### Search Results

**Result Display**
- Up to 20 results shown
- Clickable result cards
- Hover effects with green border glow
- Clear filters button

**Relevance Scoring**
- Results sorted by query match relevance
- Word-by-word matching algorithm
- Weighted scoring for fund names

**Navigation**
- Click any result to view fund details
- Seamless transition to Fund Details page

**[Screenshot Placeholder: Search Results Display]**

### Search Modal

**Modal Features**
- Full-screen overlay
- Centered content container (max-width 900px)
- ESC key to close
- Click outside to close
- Scrollable for long results

---

## 10. Investor Score System

The Investor Score is a proprietary comprehensive rating system that evaluates mutual fund performance on a 0-100 scale.

### Scoring Methodology

**Five-Factor Analysis (Total 100 points)**

#### 1. 1-Year Return (25 points)
- Measures recent performance over the past 12 months
- Range: -50% to +50%
- Scoring:
  - -50% return = 0 points
  - 0% return = 12.5 points
  - +50% return = 25 points

#### 2. 3-Year CAGR (25 points)
- Compound Annual Growth Rate over 3 years
- Measures medium-term consistency
- Range: -20% to +40%
- Scoring:
  - -20% CAGR = 0 points
  - 0% CAGR = 12.5 points
  - +40% CAGR = 25 points

#### 3. 5-Year CAGR (25 points)
- Compound Annual Growth Rate over 5 years
- Measures long-term growth trajectory
- Range: -20% to +40%
- Same scoring pattern as 3-Year CAGR

#### 4. Volatility (15 points)
- Standard deviation of daily returns
- Lower volatility = more stability = higher score
- Scoring:
  - 0% volatility = 15 points
  - 5% volatility = 10 points
  - 15%+ volatility = 0 points

#### 5. Consistency (10 points)
- Percentage of trading days with positive returns (last 12 months)
- Scoring:
  - 0% positive days = 0 points
  - 50% positive days = 5 points
  - 100% positive days = 10 points

### Score Ratings

| Score Range | Rating | Color | Interpretation |
|-------------|--------|-------|----------------|
| 85-100 | Excellent | #00C853 (Green) | Outstanding performance |
| 70-84 | Very Good | #4CAF50 (Light Green) | Above average performer |
| 55-69 | Good | #8BC34A (Lime) | Acceptable performance |
| 40-54 | Average | #FFC107 (Amber) | Moderate performance |
| 25-39 | Below Average | #FF9800 (Orange) | Underperforming |
| 0-24 | Poor | #F44336 (Red) | Weak performance |

**[Screenshot Placeholder: Investor Score Display Examples]**

### Score Display Locations

**Portfolio Page**
- Each fund card shows: "📊 Investor Score: XX/100 (Rating)"
- Color-coded text for quick identification

**[Screenshot Placeholder: Investor Score on Fund Card]**

**Fund Details Page**
- Large investor score display with rating label
- Detailed performance breakdown section
- Individual metric displays with color coding

**[Screenshot Placeholder: Investor Score on Fund Details]**

**Compare Page**
- Comparison table includes Investor Score row
- Side-by-side display with ratings
- Color-coded for easy comparison

**[Screenshot Placeholder: Investor Score in Comparison]**

### Data Requirements

For a fund to receive a complete score:
- Minimum 250 trading days (1 year) for basic scoring
- 750+ days for 3-Year CAGR component
- 1250+ days for 5-Year CAGR component
- Insufficient data results in N/A for those metrics

---

## 11. Data Visualization

### Chart Types

#### NAV Historical Chart (NAVChart.jsx)

**Purpose:** Visualize fund performance over time

**Features:**
- Line chart with smooth curves
- Time range selection (1M, 6M, 1Y, 3Y, 5Y, MAX)
- Performance percentage display
- Hover interaction with vertical guide line
- Responsive sizing

**Performance Calculation:**
- 1M/6M/1Y: Simple period return
- 3Y/5Y/MAX: CAGR calculation

**[Screenshot Placeholder: NAV Chart Example]**

#### Comparison Chart (CompareChart.jsx)

**Purpose:** Compare two funds side-by-side

**Features:**
- Dual-line overlaid visualization
- Color-coded lines (Green for Fund 1, Blue for Fund 2)
- View modes: NAV or Growth %
- Time range selection
- Tooltips with fund values
- Legend with fund names

**[Screenshot Placeholder: Comparison Chart Example]**

#### Risk Distribution Pie Chart (RiskReturnChart.jsx)

**Purpose:** Show portfolio risk breakdown

**Features:**
- Pie chart with three segments
- Color-coded: Green (Low), Amber (Medium), Red (High)
- Interactive tooltips
- Fund count and percentage display

**[Screenshot Placeholder: Risk Distribution Chart]**

#### SIP Investment Pie Chart (SIPPieChart.jsx)

**Purpose:** Breakdown of SIP investment vs returns

**Features:**
- Two-segment pie chart
- Blue: Investment amount (principal)
- Green: Returns earned (profit)
- Percentage labels
- Rupee value tooltips

**[Screenshot Placeholder: SIP Pie Chart Example]**

### Chart Technology

**Library:** Chart.js with react-chartjs-2 wrapper

**Custom Plugins:**
- Vertical line plugin for hover interaction
- Custom tooltip formatting
- Responsive aspect ratio maintenance

**Styling:**
- Dark theme with grid lines
- Smooth line curves (tension: 0.4)
- Legend positioning
- Axis label formatting

---

## 12. API Integrations

### MFAPI.in Integration

**Overview**
- Free, open API for Indian mutual fund data
- No authentication required
- Real-time NAV data

**Endpoints Used**

**Get All Schemes:**
```
GET https://api.mfapi.in/mf
```
- Returns list of all mutual fund schemes
- Contains schemeCode and schemeName
- ~40,000+ schemes available

**Get Fund Details:**
```
GET https://api.mfapi.in/mf/{schemeCode}
```
- Returns complete fund information
- Includes:
  - Meta data (scheme name, fund house, category)
  - Historical NAV data (date and NAV values)

**Data Transformation**

The application transforms raw API data into standardized format:
```javascript
{
  schemeCode: Number,
  name: String,
  category: String,
  risk: "Low" | "Medium" | "High",
  returns1Y: Number,
  investorScore: Number (0-100),
  scoreDetails: Object,
  historicalData: Array
}
```

### Marketaux Integration

**Overview**
- Financial news API
- Requires API key (environment variable)
- India-focused news

**Endpoint Used:**
```
GET https://api.marketaux.com/v1/news/all
    ?api_token={API_KEY}
    &countries=in
    &limit=10
```

**Returns:**
- Top 10 India market news articles
- Article details:
  - uuid (unique identifier)
  - title
  - description
  - published_at

### Error Handling

**API Error Management**
- Try-catch blocks around all fetch calls
- User-friendly error messages
- Loading states during API calls
- Graceful degradation on failure

---

## 13. Technical Implementation

### Project Structure

```
Mutual_Fund_Analyzer/
├── src/
│   ├── Components/          # Reusable UI components
│   │   ├── ChartPopup.jsx
│   │   ├── CompareChart.jsx
│   │   ├── CompareFunds.jsx
│   │   ├── CompareSelector.jsx
│   │   ├── FundCard.jsx
│   │   ├── NAVChart.jsx
│   │   ├── Navbar.jsx
│   │   ├── PortfolioControls.jsx
│   │   ├── RiskReturnChart.jsx
│   │   ├── SearchModal.jsx
│   │   ├── SearchSection.jsx
│   │   ├── SIPCalculator.jsx
│   │   └── SIPPieChart.jsx
│   ├── data/               # Static data and constants
│   │   ├── constants.js
│   │   └── funds.js
│   ├── pages/              # Page components
│   │   ├── Calculator.jsx
│   │   ├── Compare.jsx
│   │   ├── FundDetails.jsx
│   │   ├── Home.jsx
│   │   ├── News.jsx
│   │   └── Portfolio.jsx
│   ├── services/           # API services
│   │   ├── fundService.js
│   │   └── newsService.js
│   ├── styles/             # Style objects
│   │   ├── Home.css
│   │   ├── homeStyles.js
│   │   ├── navbarStyles.js
│   │   └── styles.js
│   ├── utils/              # Utility functions
│   │   ├── calculateCAGR.js
│   │   ├── calculateInvestorScore.js
│   │   ├── calculatePeriodReturn.js
│   │   ├── calculateReturn.js
│   │   ├── calculateScore.js
│   │   └── getRisk.js
│   ├── App.jsx             # Main application component
│   ├── App.css             # Application styles
│   ├── index.css           # Global styles
│   └── main.jsx            # Entry point
├── public/                 # Static assets
├── .env                    # Environment variables
├── package.json            # Dependencies
└── vite.config.js          # Vite configuration
```

### Key Dependencies

**Frontend Framework:**
- React 18.x
- React DOM
- React Router DOM v6

**Data Visualization:**
- chart.js
- react-chartjs-2

**Icons:**
- react-icons

**Build Tools:**
- Vite
- ESLint

**Routing:**
- react-router-dom

### Utility Functions

#### calculateCAGR.js
```javascript
function calculateCAGR(data, years)
```
- Calculates Compound Annual Growth Rate
- Formula: [(CurrentNAV/OldNAV)^(1/years) - 1] × 100
- Handles partial years for MAX calculation

#### calculateInvestorScore.js
```javascript
function calculateInvestorScore(historicalData)
function getScoreRating(score)
function getScoreColor(score)
```
- Main scoring function returning 0-100 score
- Helper functions for rating and color

#### calculateReturn.js
```javascript
function calculateReturn(navData)
```
- Calculates simple 1-year return
- Returns N/A if insufficient data

#### calculatePeriodReturn.js
```javascript
function calculatePeriodReturn(data, days)
```
- Calculates return for specific time period
- Used for 1M and 6M returns

#### calculateScore.js
```javascript
function calculateScore(fundName, query)
```
- Search relevance scoring
- Counts matching words

#### getRisk.js
```javascript
function getRisk(category)
```
- Determines risk level from fund category
- Returns "Low", "Medium", or "High"

### State Management

**Global State (App.jsx)**
- `funds`: Array of portfolio fund objects
- `allSchemes`: Array of all available schemes
- `fund1`, `fund2`: Selected funds for comparison
- `searchResults`: Current search results
- `loading`, `error`: UI state indicators

**Local State (Page Components)**
- Individual page-specific state
- Form inputs and validation
- Modal visibility toggles

### Performance Optimizations

**API Calls**
- Promise.all for parallel fund fetching
- Debounced search (commented out in current version)
- Efficient data transformation

**Rendering**
- React.memo for component optimization (where needed)
- Efficient filtering and sorting algorithms
- Responsive grid layouts with CSS

**Data Handling**
- In-memory data storage for session
- Efficient array operations
- Optimized chart rendering

---

## Conclusion

The Mutual Fund Analyzer is a comprehensive web application that provides investors with powerful tools for mutual fund analysis and comparison. With features like real-time data integration, sophisticated scoring algorithms, interactive visualizations, and a user-friendly interface, it serves as a valuable tool for both novice and experienced investors looking to make informed investment decisions in the Indian mutual fund market.

### Key Strengths

1. **Comprehensive Data Access:** Integration with MFAPI.in provides access to 40,000+ Indian mutual fund schemes
2. **Proprietary Scoring:** The Investor Score system offers a unique, multi-factor evaluation method
3. **Interactive Visualizations:** Multiple chart types with time range selection and comparison capabilities
4. **User-Friendly Design:** Dark theme with intuitive navigation and clear information hierarchy
5. **Practical Tools:** SIP calculator, portfolio management, and fund comparison features

### Use Cases

- **Portfolio Tracking:** Monitor and analyze investment holdings
- **Fund Discovery:** Search and discover new investment opportunities
- **Comparative Analysis:** Compare funds side-by-side for informed decisions
- **Investment Planning:** Use SIP calculator for future planning
- **Performance Monitoring:** Track fund performance through historical data

---

**Report Generated:** July 2026

**Application Version:** Current Development Build

**Technologies:** React 18, Vite, Chart.js, React Router v6

**APIs:** MFAPI.in, Marketaux
