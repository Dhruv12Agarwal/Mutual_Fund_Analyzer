import { Link } from "react-router-dom";
import SearchSection from "../Components/SearchSection";

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

    return (
    <div>

        <div style={heroStyle}>

            <h1 style={heroTitle}>
                Mutual Fund Analyzer
            </h1>

            <h3 style={heroSubtitle}>
                Analyze • Compare • Plan
            </h3>

            <p style={heroDescription}>
                Make smarter investment decisions
                using data-driven mutual fund analysis.
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

<h2
    style={{
        textAlign: "center",
        color: "white",
        marginBottom: "20px"
    }}
>
    Search & Add Mutual Funds
</h2>

<SearchSection
    apiSearch={apiSearch}
    setApiSearch={setApiSearch}
    searchFunds={searchFunds}

    searchCategory={searchCategory}
    setSearchCategory={setSearchCategory}

    searchPlan={searchPlan}
    setSearchPlan={setSearchPlan}

    searchOption={searchOption}
    setSearchOption={setSearchOption}

    searchResults={searchResults}

    addingFund={addingFund}

    addFund={addFund}

    buttonStyle={buttonStyle}
    selectStyle={selectStyle}
/>

        <div style={summaryContainer}>

    <div style={summaryCard}>
        <div style={cardTitle}>
            Funds Added
        </div>

        <div style={cardValue}>
            {totalFunds}
        </div>
    </div>

    <div style={summaryCard}>
        <div style={cardTitle}>
            Average Return
        </div>

        <div style={cardValue}>
            {averageReturn}%
        </div>
    </div>

    <div style={summaryCard}>
        <div style={cardTitle}>
            Best Performer
        </div>

        <div style={cardSubtitle}>
    {bestFundName}
</div>

<div style={cardValue}>
    {bestFundReturn}%
</div>
    </div>

</div>


<div style={guidelineContainer}>

    <h2 style={guidelineTitle}>
        SEBI Investor Guidelines
    </h2>

    <p style={guidelineText}>
        • Mutual fund investments are subject to market risks.
    </p>

    <p style={guidelineText}>
        • Read all scheme related documents carefully.
    </p>

    <p style={guidelineText}>
        • Diversify investments across different categories.
    </p>

    <p style={guidelineText}>
        • Past performance does not guarantee future returns.
    </p>

</div>
    </div>

);
}

export default Home;