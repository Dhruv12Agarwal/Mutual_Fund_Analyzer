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

            <div style={{ marginTop: "60px", padding: "30px", backgroundColor: "#111827", borderRadius: "12px", border: "1px solid #333" }}>
                <h2 style={{ color: "#FFFFFF", marginBottom: "20px", textAlign: "center", fontSize: "24px" }}>
                    📊 Investor Score Methodology
                </h2>
                
                <p style={{ color: "#B8BDC9", marginBottom: "20px", lineHeight: "1.6", textAlign: "center", fontSize: "14px" }}>
                    The Investor Score is calculated using a weighted combination of 7 financial metrics, each normalized to a 0-100 scale before applying weights. This ensures the total score always ranges from 0-100, providing a comprehensive evaluation of fund quality.
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", marginTop: "20px" }}>
                    
                    <div style={{ background: "#0d1320", padding: "15px", borderRadius: "8px", border: "1px solid #333" }}>
                        <h4 style={{ color: "#00C853", margin: "0 0 10px 0", fontSize: "16px" }}>35% • Sharpe Ratio</h4>
                        <p style={{ color: "#888", margin: "0", fontSize: "13px" }}>
                            Measures risk-adjusted returns. Higher values indicate better returns relative to volatility.
                        </p>
                    </div>

                    <div style={{ background: "#0d1320", padding: "15px", borderRadius: "8px", border: "1px solid #333" }}>
                        <h4 style={{ color: "#4CAF50", margin: "0 0 10px 0", fontSize: "16px" }}>20% • 5-Year CAGR</h4>
                        <p style={{ color: "#888", margin: "0", fontSize: "13px" }}>
                            Compound Annual Growth Rate over 5 years. Range: -10% to +20% maps to 0-20 points.
                        </p>
                    </div>

                    <div style={{ background: "#0d1320", padding: "15px", borderRadius: "8px", border: "1px solid #333" }}>
                        <h4 style={{ color: "#8BC34A", margin: "0 0 10px 0", fontSize: "16px" }}>15% • Alpha</h4>
                        <p style={{ color: "#888", margin: "0", fontSize: "13px" }}>
                            Outperformance vs expected return based on market risk. Positive alpha indicates fund beating expectations.
                        </p>
                    </div>

                    <div style={{ background: "#0d1320", padding: "15px", borderRadius: "8px", border: "1px solid #333" }}>
                        <h4 style={{ color: "#FFC107", margin: "0 0 10px 0", fontSize: "16px" }}>10% • Consistency</h4>
                        <p style={{ color: "#888", margin: "0", fontSize: "13px" }}>
                            Percentage of positive trading days in the last year. Higher consistency = more stable returns.
                        </p>
                    </div>

                    <div style={{ background: "#0d1320", padding: "15px", borderRadius: "8px", border: "1px solid #333" }}>
                        <h4 style={{ color: "#FF9800", margin: "0 0 10px 0", fontSize: "16px" }}>10% • Expense Ratio</h4>
                        <p style={{ color: "#888", margin: "0", fontSize: "13px" }}>
                            Estimated annual fees. Lower expense ratios result in higher scores. Range: 0% to 2% maps to 10-0 points.
                        </p>
                    </div>

                    <div style={{ background: "#0d1320", padding: "15px", borderRadius: "8px", border: "1px solid #333" }}>
                        <h4 style={{ color: "#F44336", margin: "0 0 10px 0", fontSize: "16px" }}>5% • Maximum Drawdown</h4>
                        <p style={{ color: "#888", margin: "0", fontSize: "13px" }}>
                            Largest peak-to-trough decline. Lower drawdown indicates less volatility. Range: 0% to 50% maps to 5-0 points.
                        </p>
                    </div>

                    <div style={{ background: "#0d1320", padding: "15px", borderRadius: "8px", border: "1px solid #333" }}>
                        <h4 style={{ color: "#E91E63", margin: "0 0 10px 0", fontSize: "16px" }}>5% • Benchmark Performance</h4>
                        <p style={{ color: "#888", margin: "0", fontSize: "13px" }}>
                            1-year fund return compared to market benchmark. Shows short-term outperformance potential.
                        </p>
                    </div>

                </div>

                <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "#161616", borderRadius: "8px", border: "1px solid #2A2A2A" }}>
                    <p style={{ color: "#888", margin: "0", fontSize: "13px", lineHeight: "1.6" }}>
                        <strong style={{ color: "#B8BDC9" }}>Scoring Process:</strong> Each component is calculated individually, then normalized to a 0-100 scale. The weighted sum of all normalized components produces the final Investor Score (0-100).
                        <br /><br />
                        <strong style={{ color: "#B8BDC9" }}>Rating Scale:</strong> 80-100 = Excellent | 65-79 = Very Good | 50-64 = Good | 35-49 = Average | 20-34 = Below Average | 0-19 = Poor
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Portfolio;