import { getScoreColorV2, getScoreRatingV2 } from "../utils/calculateInvestorScoreV2";
import { calculateXIRR } from "../utils/calculateXIRR";
import { calculateSharpe, calculateSimpleBeta } from "../utils/financialMetrics";

function getRiskColor(risk) {

  if (risk === "High") {
    return "red";
  }

  if (risk === "Medium") {
    return "yellow";
  }

  return "green";
}

function CompareFunds(props) {

  return (
    <div>

      {props.selectedFund1 && props.selectedFund2 && (

        <div
          style={{
            border: "1px solid #333",
            padding: "20px",
            margin: "20px auto",
            borderRadius: "12px",
            width: "100%",
            maxWidth: "900px",
            backgroundColor: "#161616",
            boxShadow: "0 0 20px rgba(0,0,0,0.5)",
            overflowX: "auto",
            boxSizing: "border-box"
          }}
        >

        <h2
  style={{
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: "42px",
    marginBottom: "35px",
    fontWeight: "700"
  }}
>
   Fund Comparison
</h2>

          <div
            style={{
              display: "flex",
              gap: "20px",
              marginBottom: "30px"
            }}
          >

            <div
              style={{
                flex: 1,
                border: "1px solid #333",
                borderRadius: "10px",
                padding: "15px",
                backgroundColor: "#1b1b1b"
              }}
            >
              <h3
              style={{
                textAlign: "center",
                color: "#00C853",
                fontSize: "28px",
                marginBottom: "15px"
              }}
            >
              Fund 1
            </h3>
              <p
                style={{
                  textAlign: "center",
                  lineHeight: "1.5"
                }}
              >
                {props.selectedFund1.name}
              </p>

            </div>

            <div
              style={{
                flex: 1,
                border: "1px solid #333",
                borderRadius: "10px",
                padding: "15px",
                backgroundColor: "#1b1b1b"
              }}
            >
              <h3
            style={{
              textAlign: "center",
              color: "#00C853",
              fontSize: "28px",
              marginBottom: "15px"
            }}
          >
            Fund 2
          </h3>

              <p
                style={{
                  textAlign: "center",
                  lineHeight: "1.5"
                }}
              >
                {props.selectedFund2.name}
              </p>

            </div>

          </div>

          <table
  style={{
    width: "100%",
    marginTop: "20px",
    borderCollapse: "collapse",
    textAlign: "center"
  }}
>

  <thead>

    <tr>

      <th
        style={{
          padding: "16px",
          color: "#FFFFFF",
          fontSize: "22px",
          fontWeight: "700"
        }}
      >
        Metric
      </th>

      <th
        style={{
          padding: "16px",
          color: "#FFFFFF",
          fontSize: "22px",
          fontWeight: "700"
        }}
      >
        Fund 1
      </th>

      <th
        style={{
          padding: "16px",
          color: "#FFFFFF",
          fontSize: "22px",
          fontWeight: "700"
        }}
      >
        Fund 2
      </th>

    </tr>

  </thead>

  <tbody>

    <tr>

      <td
        style={{
          padding: "16px",
          color: "#E5E7EB",
          fontWeight: "600",
          borderBottom: "1px solid #2A2A2A"
        }}
      >
        Category
      </td>

      <td
        style={{
          padding: "16px",
          color: "#B8BDC9",
          borderBottom: "1px solid #2A2A2A"
        }}
      >
        {props.selectedFund1.category}
      </td>

      <td
        style={{
          padding: "16px",
          color: "#B8BDC9",
          borderBottom: "1px solid #2A2A2A"
        }}
      >
        {props.selectedFund2.category}
      </td>

    </tr>

    <tr>

      <td
        style={{
          padding: "16px",
          color: "#E5E7EB",
          fontWeight: "600",
          borderBottom: "1px solid #2A2A2A"
        }}
      >
        XIRR (1Y)
      </td>

      <td
        style={{
          padding: "16px",
          color: "#B8BDC9",
          borderBottom: "1px solid #2A2A2A"
        }}
      >
        {calculateXIRR(props.selectedFund1.historicalData, 10000) ?? "N/A"}%
      </td>

      <td
        style={{
          padding: "16px",
          color: "#B8BDC9",
          borderBottom: "1px solid #2A2A2A"
        }}
      >
        {calculateXIRR(props.selectedFund2.historicalData, 10000) ?? "N/A"}%
      </td>

    </tr>

    <tr>

      <td
        style={{
          padding: "16px",
          color: "#E5E7EB",
          fontWeight: "600"
        }}
      >
        Risk
      </td>

      <td
        style={{
          padding: "16px",
          color: getRiskColor(props.selectedFund1.risk),
          fontWeight: "bold"
        }}
      >
        {props.selectedFund1.risk}
      </td>

      <td
        style={{
          padding: "16px",
          color: getRiskColor(props.selectedFund2.risk),
          fontWeight: "bold"
        }}
      >
        {props.selectedFund2.risk}
      </td>

    </tr>

    <tr>

      <td
        style={{
          padding: "16px",
          color: "#E5E7EB",
          fontWeight: "600",
          borderBottom: "1px solid #2A2A2A"
        }}
      >
        Investor Score
      </td>

      <td
        style={{
          padding: "16px",
          color: getScoreColorV2(props.selectedFund1.investorScore),
          fontWeight: "bold",
          borderBottom: "1px solid #2A2A2A"
        }}
      >
        {props.selectedFund1.investorScore}/100 ({getScoreRatingV2(props.selectedFund1.investorScore)})
      </td>

      <td
        style={{
          padding: "16px",
          color: getScoreColorV2(props.selectedFund2.investorScore),
          fontWeight: "bold",
          borderBottom: "1px solid #2A2A2A"
        }}
      >
        {props.selectedFund2.investorScore}/100 ({getScoreRatingV2(props.selectedFund2.investorScore)})
      </td>

    </tr>

    <tr>

      <td
        style={{
          padding: "16px",
          color: "#E5E7EB",
          fontWeight: "600",
          borderBottom: "1px solid #2A2A2A"
        }}
      >
        Sharpe Ratio
      </td>

      <td
        style={{
          padding: "16px",
          color: "#B8BDC9",
          borderBottom: "1px solid #2A2A2A"
        }}
      >
        {calculateSharpe(props.selectedFund1.historicalData) ? parseFloat(calculateSharpe(props.selectedFund1.historicalData).toFixed(2)) : "N/A"}
      </td>

      <td
        style={{
          padding: "16px",
          color: "#B8BDC9",
          borderBottom: "1px solid #2A2A2A"
        }}
      >
        {calculateSharpe(props.selectedFund2.historicalData) ? parseFloat(calculateSharpe(props.selectedFund2.historicalData).toFixed(2)) : "N/A"}
      </td>

    </tr>

    <tr>

      <td
        style={{
          padding: "16px",
          color: "#E5E7EB",
          fontWeight: "600",
          borderBottom: "1px solid #2A2A2A"
        }}
      >
        Beta
      </td>

      <td
        style={{
          padding: "16px",
          color: "#B8BDC9",
          borderBottom: "1px solid #2A2A2A"
        }}
      >
        {calculateSimpleBeta(props.selectedFund1.historicalData, props.selectedFund1.category) ?? "N/A"}
      </td>

      <td
        style={{
          padding: "16px",
          color: "#B8BDC9",
          borderBottom: "1px solid #2A2A2A"
        }}
      >
        {calculateSimpleBeta(props.selectedFund2.historicalData, props.selectedFund2.category) ?? "N/A"}
      </td>

    </tr>

  </tbody>

</table>

          <div
            style={{
              display: "flex",
              justifyContent: "center"
            }}
          >

            <button
              onClick={() => props.openCompareChart()}
              style={{
                marginTop: "25px",
                padding: "12px 24px",
                backgroundColor: "#00C853",
                color: "black",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "16px"
              }}
            >
              📊 Open Comparison Chart
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default CompareFunds;