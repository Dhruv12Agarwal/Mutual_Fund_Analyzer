import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRisk } from "../utils/getRisk";
import { calculateReturn } from "../utils/calculateReturn";
import NAVChart from "../Components/NAVChart";

function FundDetails({addFund}) {

    const { schemeCode } = useParams();

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

    const risk =
    getRisk(
        fund.meta.scheme_category
    );

const returns =
    calculateReturn(
        fund.data
    );

    const portfolioFund = {
        name: fund.meta.scheme_name,
        category: fund.meta.scheme_category,
        risk: risk,
        returns1Y: returns,
        historicalData: fund.data
    };

    return (
    <div>

        <h1>
            {fund.meta.scheme_name}
        </h1>

        <h2>
            {fund.meta.scheme_category}
        </h2>

        <h3>
            Risk: {risk}
        </h3>

        <h3>
            1Y Return:
            {returns}%
        </h3>

        <div
            style={{
                height: "450px",
                marginTop: "30px"
            }}
        >
            <NAVChart
                historicalData={fund.data}
            />
        </div>

        <button
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

    </div>
);
}

export default FundDetails;