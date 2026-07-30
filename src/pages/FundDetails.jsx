import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRisk } from "../utils/getRisk";
import { calculateReturn } from "../utils/calculateReturn";
import { calculateInvestorScoreV2, getScoreColorV2, getScoreRatingV2 } from "../utils/calculateInvestorScoreV2";
import { calculateSharpe, calculateBeta, calculateTreynor } from "../utils/financialMetrics";
import NAVChart from "../Components/NAVChart";

function FundDetails({addFund, funds, allSchemes}) {

    const { schemeCode } = useParams();
    const navigate = useNavigate();

    const [fund, setFund] = useState(null);
    const [message, setMessage] = useState("");
    const [sharpe, setSharpe] = useState(NaN);
    const [beta, setBeta] = useState(NaN);
    const [treynor, setTreynor] = useState(NaN);

    async function loadFund() {
        try {
            const response = await fetch(
                `https://api.mfapi.in/mf/${schemeCode}`
            );

            if (!response.ok) {
                throw new Error("Failed to fetch fund data");
            }

            const data = await response.json();
            setFund(data);
        } catch (error) {
            console.error("Error loading fund:", error);
            setMessage("Error loading fund data. Please try again.");
        }
    }

    useEffect(() => {
        if (schemeCode) {
            loadFund();
        }
    }, [schemeCode]);

    useEffect(() => {
      async function computeMetrics() {
        if (!fund) return;
        const riskFreeRate = parseFloat(import.meta.env.VITE_RISK_FREE_RATE || "0.06");

        try {
          const s = calculateSharpe(fund.data, riskFreeRate);
          setSharpe(s);
        } catch {
          setSharpe(NaN);
        }

        // find benchmark from allSchemes (prefer nifty/sensex/index)
        let benchScheme = null;
        if (Array.isArray(allSchemes)) {
          const lower = allSchemes.map(s => ({ ...s, nameLower: (s.schemeName || "").toLowerCase() }));
          benchScheme = lower.find(s => s.nameLower.includes("nifty")) || lower.find(s => s.nameLower.includes("sensex")) || lower.find(s => s.nameLower.includes("index"));
        }

        if (benchScheme && benchScheme.schemeCode) {
          try {
            const res = await fetch(`https://api.mfapi.in/mf/${benchScheme.schemeCode}`);
            if (res.ok) {
              const json = await res.json();
              const benchData = json.data;
              try {
                const b = calculateBeta(fund.data, benchData);
                setBeta(b);
              } catch {
                setBeta(NaN);
              }

              try {
                const t = calculateTreynor(fund.data, benchData, riskFreeRate);
                setTreynor(t);
              } catch {
                setTreynor(NaN);
              }
            }
          } catch {
            setBeta(NaN);
            setTreynor(NaN);
          }
        } else {
          setBeta(NaN);
          setTreynor(NaN);
        }
      }

      computeMetrics();
    }, [fund, allSchemes]);

    if (!fund) {
        return (
            <div
                style={{
                    textAlign: "center",
                    marginTop: "100px",
                    padding: "40px"
                }}
            >
                <h1>Loading fund details...</h1>
                <p style={{ color: "#888" }}>Fetching data from API...</p>
                {message && (
                    <p style={{ color: "#FF5252", marginTop: "20px" }}>
                        {message}
                    </p>
                )}
            </div>
        );
    }

    const currentNAV =
    parseFloat(fund.data[0].nav);

const risk =
    getRisk(
        fund.meta.scheme_category
    );

const returns1Y =
    calculateReturn(
        fund.data
    );

const investorScoreData = calculateInvestorScoreV2(fund.data, fund.meta.scheme_category);
const scoreColor = getScoreColorV2(investorScoreData.score);
const scoreRating = getScoreRatingV2(investorScoreData.score);

    const lastYearData =
    fund.data.slice(0, 250);

const navValues =
    lastYearData.map((item) =>
        parseFloat(item.nav)
    );

const high52W =
    Math.max(...navValues);

const low52W =
    Math.min(...navValues);



const ignoreWords = [
    "equity",
    "scheme",
    "fund",
    "debt",
    "solution",
    "other"
];

const categoryWeight = {
  small: 5,
  mid: 5,
  large: 5,
  flexi: 5,
  multi: 5,
  value: 5,
  focused: 5,
  contra: 5,
  index: 5,
  hybrid: 5,
  elss: 5,
  cap: 4
};

const amcWeight = {
  axis: 3,
  hdfc: 3,
  sbi: 3,
  icici: 3,
  parag: 4,
  quant: 4,
  mirae: 3,
  nippon: 3,
  kotak: 2,
  dsp: 2,
  uti: 2,
  aditya: 2,
  franklin: 2,
  canara: 2,
  tata: 2,
  motilal: 3,
  bandhan: 2,
  hsbc: 2,
  lic: 2
};

const currentText = (
  fund.meta.scheme_name +
  " " +
  fund.meta.scheme_category
).toLowerCase();

const currentAMC =
    fund.meta.fund_house
        .toLowerCase()
        .replace(" mutual fund", "");

const keywords = currentText
  .split(/[\s&-]+/)
  .filter(
    word =>
      word.length > 2 &&
      !ignoreWords.includes(word)
  );



const similarFunds = allSchemes
  .map((scheme) => {

    if (scheme.schemeCode === fund.meta.scheme_code) {
      return null;
    }

    const name = scheme.schemeName.toLowerCase();

if (name.includes(currentAMC)) {
    return null;
}

   let score = 0;

keywords.forEach((word) => {
  if (!name.includes(word)) return;

  if (categoryWeight[word]) {
    score += categoryWeight[word];
  }
  else if (amcWeight[word]) {
    score += amcWeight[word];
  }
  else {
    score += 1;
  }
});

    return {
      ...scheme,
      score
    };

  })
  .filter((scheme) => scheme && scheme.score > 0)
  .sort((a, b) => b.score - a.score);

  const seenAMC = new Set();

const uniqueFunds = similarFunds.filter((scheme) => {


const name = scheme.schemeName.toLowerCase();

    let amc = "";

    if (name.includes("axis")) amc = "axis";
    else if (name.includes("hdfc")) amc = "hdfc";
    else if (name.includes("sbi")) amc = "sbi";
    else if (name.includes("icici")) amc = "icici";
    else if (name.includes("nippon")) amc = "nippon";
    else if (name.includes("quant")) amc = "quant";
    else if (name.includes("parag")) amc = "parag";
    else if (name.includes("dsp")) amc = "dsp";
    else if (name.includes("kotak")) amc = "kotak";
    else if (name.includes("mirae")) amc = "mirae";
    else if (name.includes("aditya birla")) amc = "aditya birla";
    else if (name.includes("franklin")) amc = "franklin";
    else amc = name;

    if (seenAMC.has(amc)) {
        return false;
    }

    seenAMC.add(amc);
    return true;
});

const finalRecommendations = uniqueFunds.slice(0, 4);

    const portfolioFund = {
        schemeCode: fund.meta.scheme_code,
        name: fund.meta.scheme_name,
        category: fund.meta.scheme_category,
        risk: risk,
        returns1Y: returns1Y,
        investorScore: investorScoreData.score,
        scoreDetails: investorScoreData.breakdown,
        historicalData: fund.data
    };



    const stats = [
  {
    label: "NAV",
    value: `₹${currentNAV}`
  },
  {
    label: "Risk",
    value: risk
  },
  {
    label: "52W High",
    value: `₹${high52W.toFixed(2)}`
  },
  {
    label: "52W Low",
    value: `₹${low52W.toFixed(2)}`
  },
  {
    label: "Investor Score",
    value: `${investorScoreData.score}/100`,
    color: scoreColor,
    rating: scoreRating
  }
];

// Append financial metrics
stats.push({
  label: "Sharpe Ratio",
  value: isFinite(sharpe) ? sharpe.toFixed(2) : "N/A",
  color: isFinite(sharpe) ? (sharpe >= 1 ? "#00C853" : sharpe >= 0.5 ? "#FFC107" : "#FF5252") : undefined
});

stats.push({
  label: "Beta",
  value: isFinite(beta) ? beta.toFixed(2) : "N/A",
  color: isFinite(beta) ? (Math.abs(beta) <= 1 ? "#00C853" : "#FFC107") : undefined
});

stats.push({
  label: "Treynor Ratio",
  value: isFinite(treynor) ? treynor.toFixed(2) : "N/A",
  color: isFinite(treynor) ? (treynor >= 0.1 ? "#00C853" : treynor >= 0 ? "#FFC107" : "#FF5252") : undefined
});


console.log(funds);

    return (
    <div
    style={{
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "40px 20px"
    }}
  >

        <h1
        style={{
    textAlign: "center",
    fontSize: "64px",
    fontWeight: "600",
    maxWidth: "1100px",
    margin: "0 auto 30px",
    lineHeight: "1.10",
    wordBreak: "break-word"
  }}
        >
            {fund.meta.scheme_name}
        </h1>

                <h2
        style={{
            textAlign: "center",
            color: "#888",
            marginBottom: "8px"
        }}
        >
        Fund House: {fund.meta.fund_house}
        </h2>

        <h2
        style={{
            textAlign: "center",
            color: "#888",
            marginBottom: "30px"
        }}
        >
        {fund.meta.scheme_category}
        </h2>

        <div
            style={{
                marginTop: "40px",
                backgroundColor: "#0d1320ff",
                border: "1px solid #333",
                borderRadius: "20px",
                padding: "30px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)"
            }}
        >
            <NAVChart
                historicalData={fund.data}
            />
        </div>

        <div
  style={{
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
    marginTop: "30px",
    marginBottom: "50px"

  }}
>
  {stats.map((stat) => (
    <div
      key={stat.label}
      style={{
        background: "#111827",
        padding: "20px",
        borderRadius: "12px",
        minWidth: "160px",
        border: "1px solid #333"
      }}
    >
     <p
  style={{
    color: "#888",
    marginBottom: "15px",
    fontSize: "18px"
  }}
>
        {stat.label}
      </p>

      <h2
  style={{
    margin: 0,
    color: stat.color || "inherit"
  }}
>
        {stat.value}
      </h2>
      {stat.rating && (
        <p
          style={{
            margin: "8px 0 0 0",
            fontSize: "14px",
            color: stat.color
          }}
        >
          {stat.rating}
        </p>
      )}
    </div>
  ))}
</div>

        <button
        style={{
    backgroundColor: "#00C853",
    color: "#000",
    border: "none",
    padding: "14px 30px",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,200,83,0.25)"
  }}
    onClick={() => {
        const added =
            addFund(
                portfolioFund
            );

        if (added) {
            setMessage(
                "✓ Added to Portfolio"
            );
        }
        else {
            setMessage(
                "Fund already in Portfolio"
            );
        }
    }}
>
    Add To Portfolio
</button>
<p>
    {message}
</p>

<h2
  style={{
    marginTop: "50px",
    marginBottom: "25px",
    textAlign: "center"
  }}
>
  📊 Investor Score Breakdown (V2)
</h2>

<div style={{ marginBottom: "40px", padding: "20px", backgroundColor: "#111827", borderRadius: "12px", border: "1px solid #333" }}>
  <p style={{ color: "#888", marginBottom: "15px", textAlign: "center", fontSize: "14px" }}>
    New methodology: 35% Sharpe Ratio • 20% Long-term CAGR • 15% Alpha • 10% Consistency • 10% Expense Ratio • 5% Max Drawdown • 5% Benchmark Performance
  </p>
</div>

<div
  style={{
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
    marginBottom: "40px"
  }}
>
  {/* Sharpe Ratio - 35% */}
  <div
    style={{
      background: "#111827",
      padding: "20px",
      borderRadius: "12px",
      minWidth: "220px",
      border: "1px solid #333"
    }}
  >
    <p style={{ color: "#888", marginBottom: "8px", fontSize: "12px" }}>Sharpe Ratio (35%)</p>
    <h3 style={{ margin: "0 0 8px 0", color: investorScoreData.breakdown.sharpeRatio ? investorScoreData.breakdown.sharpeRatio.value >= 1 ? "#00C853" : investorScoreData.breakdown.sharpeRatio.value >= 0.5 ? "#FFC107" : "#FF5252" : "#888" }}>
      {investorScoreData.breakdown.sharpeRatio?.value?.toFixed(2) || "N/A"}
    </h3>
    <p style={{ fontSize: "12px", color: "#666", margin: "0", maxWidth: "200px" }}>
      {investorScoreData.breakdown.sharpeRatio?.description}
    </p>
    <p style={{ fontSize: "11px", color: "#555", marginTop: "8px" }}>
      Score: {investorScoreData.breakdown.sharpeRatio?.score.toFixed(2)}/{investorScoreData.breakdown.sharpeRatio?.maxPoints}
    </p>
  </div>

  {/* Long-term CAGR - 20% */}
  <div
    style={{
      background: "#111827",
      padding: "20px",
      borderRadius: "12px",
      minWidth: "220px",
      border: "1px solid #333"
    }}
  >
    <p style={{ color: "#888", marginBottom: "8px", fontSize: "12px" }}>CAGR {investorScoreData.breakdown.cagr5Y?.period} (20%)</p>
    <h3 style={{ margin: "0 0 8px 0", color: investorScoreData.breakdown.cagr5Y?.value >= 0 ? "#00C853" : "#FF5252" }}>
      {investorScoreData.breakdown.cagr5Y?.value > 0 ? "+" : ""}{investorScoreData.breakdown.cagr5Y?.value?.toFixed(2) || "N/A"}%
    </h3>
    <p style={{ fontSize: "12px", color: "#666", margin: "0" }}>
      {investorScoreData.breakdown.cagr5Y?.description}
    </p>
    <p style={{ fontSize: "11px", color: "#555", marginTop: "8px" }}>
      Score: {investorScoreData.breakdown.cagr5Y?.score.toFixed(2)}/{investorScoreData.breakdown.cagr5Y?.maxPoints}
    </p>
  </div>

  {/* Alpha - 15% */}
  <div
    style={{
      background: "#111827",
      padding: "20px",
      borderRadius: "12px",
      minWidth: "220px",
      border: "1px solid #333"
    }}
  >
    <p style={{ color: "#888", marginBottom: "8px", fontSize: "12px" }}>Alpha (15%)</p>
    <h3 style={{ margin: "0 0 8px 0", color: investorScoreData.breakdown.alpha?.value >= 0 ? "#00C853" : "#FF5252" }}>
      {investorScoreData.breakdown.alpha?.value > 0 ? "+" : ""}{investorScoreData.breakdown.alpha?.value?.toFixed(2) || "N/A"}%
    </h3>
    <p style={{ fontSize: "12px", color: "#666", margin: "0" }}>
      {investorScoreData.breakdown.alpha?.description}
    </p>
    <p style={{ fontSize: "11px", color: "#555", marginTop: "8px" }}>
      Score: {investorScoreData.breakdown.alpha?.score.toFixed(2)}/{investorScoreData.breakdown.alpha?.maxPoints}
    </p>
  </div>

  {/* Consistency - 10% */}
  <div
    style={{
      background: "#111827",
      padding: "20px",
      borderRadius: "12px",
      minWidth: "220px",
      border: "1px solid #333"
    }}
  >
    <p style={{ color: "#888", marginBottom: "8px", fontSize: "12px" }}>Consistency (10%)</p>
    <h3 style={{ margin: "0 0 8px 0", color: investorScoreData.breakdown.consistency?.value >= 60 ? "#00C853" : investorScoreData.breakdown.consistency?.value >= 50 ? "#FFC107" : "#FF5252" }}>
      {investorScoreData.breakdown.consistency?.value?.toFixed(1) || "N/A"}%
    </h3>
    <p style={{ fontSize: "12px", color: "#666", margin: "0" }}>
      {investorScoreData.breakdown.consistency?.description}
    </p>
    <p style={{ fontSize: "11px", color: "#555", marginTop: "8px" }}>
      Score: {investorScoreData.breakdown.consistency?.score.toFixed(2)}/{investorScoreData.breakdown.consistency?.maxPoints}
    </p>
  </div>

  {/* Expense Ratio - 10% */}
  <div
    style={{
      background: "#111827",
      padding: "20px",
      borderRadius: "12px",
      minWidth: "220px",
      border: "1px solid #333"
    }}
  >
    <p style={{ color: "#888", marginBottom: "8px", fontSize: "12px" }}>Expense Ratio (10%)</p>
    <h3 style={{ margin: "0 0 8px 0", color: investorScoreData.breakdown.expenseRatio?.value <= 0.5 ? "#00C853" : investorScoreData.breakdown.expenseRatio?.value <= 1 ? "#FFC107" : "#FF5252" }}>
      {investorScoreData.breakdown.expenseRatio?.value?.toFixed(2) || "N/A"}%
    </h3>
    <p style={{ fontSize: "12px", color: "#666", margin: "0" }}>
      {investorScoreData.breakdown.expenseRatio?.description}
    </p>
    <p style={{ fontSize: "11px", color: "#555", marginTop: "8px" }}>
      Score: {investorScoreData.breakdown.expenseRatio?.score.toFixed(2)}/{investorScoreData.breakdown.expenseRatio?.maxPoints}
    </p>
  </div>

  {/* Max Drawdown - 5% */}
  <div
    style={{
      background: "#111827",
      padding: "20px",
      borderRadius: "12px",
      minWidth: "220px",
      border: "1px solid #333"
    }}
  >
    <p style={{ color: "#888", marginBottom: "8px", fontSize: "12px" }}>Max Drawdown (5%)</p>
    <h3 style={{ margin: "0 0 8px 0", color: investorScoreData.breakdown.maxDrawdown?.value <= 15 ? "#00C853" : investorScoreData.breakdown.maxDrawdown?.value <= 30 ? "#FFC107" : "#FF5252" }}>
      {investorScoreData.breakdown.maxDrawdown?.value?.toFixed(2) || "N/A"}%
    </h3>
    <p style={{ fontSize: "12px", color: "#666", margin: "0" }}>
      {investorScoreData.breakdown.maxDrawdown?.description} (lower is better)
    </p>
    <p style={{ fontSize: "11px", color: "#555", marginTop: "8px" }}>
      Score: {investorScoreData.breakdown.maxDrawdown?.score.toFixed(2)}/{investorScoreData.breakdown.maxDrawdown?.maxPoints}
    </p>
  </div>

  {/* Benchmark Performance - 5% */}
  <div
    style={{
      background: "#111827",
      padding: "20px",
      borderRadius: "12px",
      minWidth: "220px",
      border: "1px solid #333"
    }}
  >
    <p style={{ color: "#888", marginBottom: "8px", fontSize: "12px" }}>Benchmark Perf. (5%)</p>
    <h3 style={{ margin: "0 0 8px 0", color: investorScoreData.breakdown.benchmarkPerformance?.value >= 0 ? "#00C853" : "#FF5252" }}>
      {investorScoreData.breakdown.benchmarkPerformance?.value > 0 ? "+" : ""}{investorScoreData.breakdown.benchmarkPerformance?.value?.toFixed(2) || "N/A"}%
    </h3>
    <p style={{ fontSize: "12px", color: "#666", margin: "0" }}>
      {investorScoreData.breakdown.benchmarkPerformance?.description}
    </p>
    <p style={{ fontSize: "11px", color: "#555", marginTop: "8px" }}>
      Score: {investorScoreData.breakdown.benchmarkPerformance?.score.toFixed(2)}/{investorScoreData.breakdown.benchmarkPerformance?.maxPoints}
    </p>
  </div>
</div>

<h2
  style={{
    marginTop: "50px",
    marginBottom: "25px",
    textAlign: "center"
  }}
>
  Similar Funds
</h2>

<div
  style={{
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
    marginBottom: "40px"
  }}
>
  {finalRecommendations.length === 0 ? (
    <p>No similar funds found.</p>
  ) : (
    finalRecommendations.map((fund) => (
      <div
        key={fund.schemeCode}
        onClick={() =>
          navigate(`/fund/${fund.schemeCode}`)
        }
        style={{
          width: "280px",
          backgroundColor: "#111827",
          border: "1px solid #333",
          borderRadius: "12px",
          padding: "20px",
          cursor: "pointer"
        }}
      >
        <h3>{fund.schemeName}</h3>

      </div>
    ))
  )}
</div>

    </div>
);
}

export default FundDetails;