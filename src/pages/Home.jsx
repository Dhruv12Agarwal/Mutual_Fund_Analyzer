import { Link } from "react-router-dom";
import SearchSection from "../Components/SearchSection";
import {
    FaChartLine,
    FaBalanceScale,
    FaCompass,
    FaWallet,
    FaTrophy
} from "react-icons/fa";

import "../styles/Home.css";

import {
    heroStyle,
    heroTitle,
    heroSubtitle,
    heroDescription,
    heroButtonContainer,
    heroButton,

    summaryContainer,
    summaryCard,
    cardTitle,
    cardValue,
    cardSubtitle,
    guidelineContainer,
    guidelineTitle,
    guidelineText
} from "../styles/homeStyles";



function Home({
    funds,

    apiSearch,
    setApiSearch,
    searchFunds,

    searchCategory,
    setSearchCategory,

    searchPlan,
    setSearchPlan,

    searchOption,
    setSearchOption,

    searchResults,

    addingFund,

    addFund,

    buttonStyle,
    selectStyle

})


{
    let totalFunds = funds.length;

let averageReturn = 0;

if (funds.length > 0) {
    let sum = 0;

    for (let fund of funds) {
        sum += parseFloat(fund.returns1Y);
    }

    averageReturn = (
        sum / funds.length
    ).toFixed(2);
}

let bestFund = null;

if (funds.length > 0) {
    bestFund = funds[0];

    for (let fund of funds) {
        if (
            parseFloat(fund.returns1Y) >
            parseFloat(bestFund.returns1Y)
        ) {
            bestFund = fund;
        }
    }
}

let bestFundName = "No Funds Added";
let bestFundReturn = "--";

if (bestFund !== null) {
    bestFundName = bestFund.name;
    bestFundReturn = bestFund.returns1Y;
}

const shortBestFundName = bestFundName
    .replace(" - Direct Plan - Growth", "")
    .replace(" - Regular Plan - Growth", "")
    .replace(" - Investment Plan", "")
    .replace(" - Direct Plan", "")
    .replace(" - Growth", "");

    return (
    <div>

        <div style={heroStyle}>

            <h1 style={heroTitle}>
            Mutual Fund Analyzer
        </h1>


        <h3 style={heroSubtitle}>
            Analyze • Compare • Track Investments
        </h3>

        <p style={heroDescription}>
            Make smarter investment decisions using
            historical NAV trends, risk analytics,
            portfolio tracking and fund comparison.
        </p>
            <div style={heroButtonContainer}>

                <Link
                    to="/portfolio"
                    style={heroButton}
                >
                    View Portfolio
                </Link>

                <Link
                    to="/compare"
                    style={heroButton}
                >
                    Compare Funds
                </Link>

            </div>

        </div>

        <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    gap: "25px",
    margin: "60px 0",
    flexWrap: "wrap"
  }}
>

  <div
  className="featureCard"
    style={{
      flex: 1,
      minWidth: "250px",
      background: "#111827",
      border: "1px solid #333",
      borderRadius: "16px",
      padding: "30px",
      textAlign: "center",
      display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    }}
  >
    <FaChartLine
    size={42}
    color="#00C853"
    style={{
        marginBottom: "10px"
    }}
/>
    <h2
style={{
    marginBottom:"14px",
    fontSize:"34px",
    fontWeight:"600"
}}
>
Analyze
</h2>

    <p style={{
    color:"#9CA3AF",
    fontSize:"18px",
    lineHeight:"1.6",
    maxWidth:"260px"
}}>
      Historical NAV trends,
      returns and CAGR.
    </p>
  </div>

  <div
  className="featureCard"
    style={{
      flex: 1,
      minWidth: "250px",
      background: "#111827",
      border: "1px solid #333",
      borderRadius: "16px",
      padding: "30px",
      textAlign: "center",
      display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    }}
  >
    <FaBalanceScale
    size={42}
    color="#00C853"
    style={{
        marginBottom: "10px"
    }}
/>
    <h2
    style={{
        marginBottom:"14px",
        fontSize:"34px",
        fontWeight:"600"
    }}
    >
    Compare
    </h2>

    <p style={{
    color:"#9CA3AF",
    fontSize:"18px",
    lineHeight:"1.6",
    maxWidth:"260px"
}}>
      Compare multiple
      mutual funds.
    </p>
  </div>

  <div
  className="featureCard"
  style={{
    flex: 1,
    minWidth: "250px",
    background: "#111827",
    border: "1px solid #333",
    borderRadius: "16px",
    padding: "30px",
    textAlign: "center",
    minHeight: "220px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  }}
>
  <FaCompass
    size={42}
    color="#00C853"
    style={{
        marginBottom: "10px"
    }}
/>

  <h2
    style={{
      marginBottom: "14px",
      fontSize: "34px",
      fontWeight: "600"
    }}
  >
    Discover
  </h2>

  <p
    style={{
    color:"#9CA3AF",
    fontSize:"18px",
    lineHeight:"1.6",
    maxWidth:"260px"
}}
  >
    Search and discover mutual funds.
  </p>
</div>

</div>

<div
style={{
// marginBottom:"10px",
textAlign:"center"
}}
>

<span
style={{
color:"#00C853",
fontWeight:"600",
letterSpacing:"2px",
fontSize:"20px",

}}
>
DISCOVER FUNDS
</span>



<p
style={{
color:"#d7cfcfff",
fontSize:"20px",
maxWidth:"750px",
margin:"0 auto"
}}
>
Search from thousands of mutual fund schemes and compare their performance.
</p>

</div>

    <div style={summaryContainer}>


    <div className="summaryCard" style={summaryCard}>

        <div
            style={{
                display: "flex",
                alignItems: "center",
                gap: "20px"
            }}
        >

            <div
                style={{
                    width: "75px",
                    height: "75px",
                    borderRadius: "50%",
                    background: "#1F2937",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <FaWallet
                    size={34}
                    color="#00C853"
                />
            </div>

            <div>
                <div style={cardTitle}>
                    Funds Added
                </div>

                <div style={cardValue}>
                    {totalFunds}
                </div>
            </div>

        </div>

    </div>



    <div className="summaryCard" style={summaryCard}>

        <div
            style={{
                display: "flex",
                alignItems: "center",
                gap: "20px"
            }}
        >

            <div
                style={{
                    width: "75px",
                    height: "75px",
                    borderRadius: "50%",
                    background: "#1F2937",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <FaChartLine
                    size={34}
                    color="#00C853"
                />
            </div>

            <div>

                <div style={cardTitle}>
                    Average Return
                </div>

                <div style={cardValue}>
                    {averageReturn}%
                </div>

            </div>

        </div>

    </div>



    <div className="summaryCard" style={summaryCard}>

        <div
            style={{
                display: "flex",
                alignItems: "center",
                gap: "20px"
            }}
        >

            <div
                style={{
                    width: "75px",
                    height: "75px",
                    borderRadius: "50%",
                    background: "#1F2937",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <FaTrophy
                    size={34}
                    color="#00C853"
                />
            </div>

            <div>

                <div style={cardTitle}>
                    Best Performer
                </div>

                <div style={cardSubtitle}>
                    {shortBestFundName}
                </div>

                <div style={cardValue}>
                    {bestFundReturn}%
                </div>

            </div>

        </div>

    </div>

</div>





<div style={guidelineContainer}>

    <p
style={{
    fontSize: "20px",
    color:"#00C853",
    letterSpacing:"2px",
    fontWeight:"600",
    marginBottom:"8px"
}}
>
IMPORTANT
</p>

<h2 style={guidelineTitle}>
   📙 SEBI Investor Guidelines
</h2>

    <p style={guidelineText}>
        ⚠️ Mutual fund investments are subject to market risks.
    </p>

    <p style={guidelineText}>
        📄 Read all scheme related documents carefully.
    </p>

    <p style={guidelineText}>
        📊 Diversify investments across different categories.
    </p>

    <p style={guidelineText}>
        📈 Past performance does not guarantee future returns.
    </p>

</div>
    </div>

);
}

export default Home;