import PortfolioControls from "../Components/PortfolioControls";
import FundCard from "../Components/FundCard";
import ChartPopup from "../Components/ChartPopup";
import NAVChart from "../Components/NAVChart";
import RiskReturnChart from "../Components/RiskReturnChart";

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
        <div style={{ padding: "20px", maxWidth: "1400px", margin: "0 auto" }}>
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

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
                    gap: "20px",
                    marginTop: "30px",
                    marginBottom: "40px"
                }}
            >
                {filteredFunds.length > 0 ? (
                    filteredFunds.map((fund) => (
                        <FundCard
                            key={fund.name}
                            fund={fund}
                            removeFund={removeFund}
                            openChart={setSelectedFund}
                        />
                    ))
                ) : (
                    <div
                        style={{
                            gridColumn: "1 / -1",
                            textAlign: "center",
                            padding: "40px",
                            color: "#888"
                        }}
                    >
                        <p style={{ fontSize: "18px" }}>
                            No funds in your portfolio yet. Search and add funds to get started!
                        </p>
                    </div>
                )}
            </div>

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

            <RiskReturnChart funds={filteredFunds} />
        </div>
    );
}

export default Portfolio;