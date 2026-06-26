import PortfolioControls from "../Components/PortfolioControls";
import FundCard from "../Components/FundCard";
import ChartPopup from "../Components/ChartPopup";
import NAVChart from "../Components/NAVChart";

function Portfolio({
    categories,
    selectedCategory,
    setSelectedCategory,
    sortOptions,
    sortOrder,
    setSortOrder,
    buttonStyle,
    selectStyle,
    searchTerm,
    setSearchTerm,

    filteredFunds,

    selectedFund,
    setSelectedFund,

    removeFund
}) {

    return (
    <div>
        <h1>My Portfolio</h1>
<br />
        <PortfolioControls
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            sortOptions={sortOptions}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            buttonStyle={buttonStyle}
            selectStyle={selectStyle}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
        />

        {
            filteredFunds.map((fund) => (
                <FundCard
                    key={fund.name}
                    fund={fund}
                    removeFund={removeFund}
                    openChart={setSelectedFund}
                />
            ))
        }

        <ChartPopup
            isOpen={selectedFund !== null}
            title={selectedFund?.name}
            onClose={() => setSelectedFund(null)}
        >
            {selectedFund && (
                <NAVChart
                    historicalData={selectedFund.historicalData}
                />
            )}
        </ChartPopup>
    </div>
);
}

export default Portfolio;