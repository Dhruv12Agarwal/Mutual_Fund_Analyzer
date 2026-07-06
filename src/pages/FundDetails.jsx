import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRisk } from "../utils/getRisk";
import { calculateReturn } from "../utils/calculateReturn";
import NAVChart from "../Components/NAVChart";

function FundDetails({addFund, funds, allSchemes}) {

    const { schemeCode } = useParams();
    const navigate = useNavigate();

    const [fund, setFund] = useState(null);
    const [message, setMessage] = useState("");

    async function loadFund() {

        const response = await fetch(
            `https://api.mfapi.in/mf/${schemeCode}`
        );

        const data = await response.json();

        setFund(data);
    }

    useEffect(() => {
        loadFund();
    }, []);

    if (!fund) {
        return <h1>Loading...</h1>;
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
  }
];


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
                marginTop: "30px",
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
    margin: 0
  }}
>
        {stat.value}
      </h2>
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