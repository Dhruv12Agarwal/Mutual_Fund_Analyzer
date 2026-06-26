import CompareSelector from "../Components/CompareSelector";
import CompareFunds from "../Components/CompareFunds";
import ChartPopup from "../Components/ChartPopup";
import CompareChart from "../Components/CompareChart";

function Compare({
    funds,

    fund1,
    setFund1,

    fund2,
    setFund2,

    selectedFund1,
    selectedFund2,

    showCompareChart,
    setShowCompareChart,

    selectStyle
}) {
    return (
       <div>
        <h1>Compare Funds</h1>

        <CompareSelector
            funds={funds}

            fund1={fund1}
            setFund1={setFund1}

            fund2={fund2}
            setFund2={setFund2}

            selectStyle={selectStyle}
        />

        <CompareFunds
            selectedFund1={selectedFund1}
            selectedFund2={selectedFund2}
            openCompareChart={() =>
                setShowCompareChart(true)
            }
        />

        <ChartPopup
            isOpen={showCompareChart}
            title="Fund Comparison"
            onClose={() =>
                setShowCompareChart(false)
            }
        >
            <CompareChart
                fund1={selectedFund1}
                fund2={selectedFund2}
            />
        </ChartPopup>
    </div>
    );
}

export default Compare;