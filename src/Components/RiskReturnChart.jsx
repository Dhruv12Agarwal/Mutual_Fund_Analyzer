import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function RiskReturnChart({ funds }) {
  if (!funds || funds.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "40px",
          color: "#888"
        }}
      >
        <p>Add funds to your portfolio to see the Risk Distribution chart</p>
      </div>
    );
  }

  // Count funds by risk level
  const riskCounts = {
    Low: 0,
    Medium: 0,
    High: 0
  };

  funds.forEach((fund) => {
    if (fund.risk === "Low") riskCounts.Low++;
    else if (fund.risk === "Medium") riskCounts.Medium++;
    else if (fund.risk === "High") riskCounts.High++;
  });

  // Calculate portfolio statistics
  const totalFunds = funds.length;
  const avgReturn =
    funds.reduce((sum, f) => sum + (parseFloat(f.returns1Y) || 0), 0) / totalFunds;
  const avgScore =
    funds.reduce((sum, f) => sum + (f.investorScore || 0), 0) / totalFunds;

  const data = {
    labels: [
      `Low Risk (${riskCounts.Low})`,
      `Medium Risk (${riskCounts.Medium})`,
      `High Risk (${riskCounts.High})`
    ],
    datasets: [
      {
        data: [riskCounts.Low, riskCounts.Medium, riskCounts.High],
        backgroundColor: ["#00C853", "#FFC107", "#FF5252"],
        borderColor: ["#00A835", "#E6A800", "#E63838"],
        borderWidth: 2,
        hoverOffset: 8
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#fff",
          font: {
            size: 14,
            weight: "500"
          },
          padding: 20,
          usePointStyle: true
        }
      },
      tooltip: {
        backgroundColor: "rgba(0,0,0,0.8)",
        padding: 12,
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "#00C853",
        borderWidth: 1,
        callbacks: {
          label: (context) => {
            const value = context.parsed;
            const percentage = ((value / totalFunds) * 100).toFixed(1);
            return `${value} fund${value !== 1 ? "s" : ""} (${percentage}%)`;
          }
        }
      }
    }
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1000px",
        margin: "50px auto",
        padding: "30px",
        backgroundColor: "#0d1320",
        border: "1px solid #333",
        borderRadius: "16px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)"
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginTop: 0,
          marginBottom: "30px",
          fontSize: "24px",
          fontWeight: "600",
          color: "#fff"
        }}
      >
        📊 Portfolio Risk Distribution
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "30px",
          alignItems: "center"
        }}
      >
        {/* Pie Chart */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "300px",
              height: "300px"
            }}
          >
            <Pie data={data} options={options} />
          </div>
        </div>

        {/* Portfolio Statistics */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px"
          }}
        >
          <div
            style={{
              padding: "15px",
              backgroundColor: "#1a1f2e",
              borderRadius: "8px",
              border: "1px solid #333"
            }}
          >
            <p
              style={{
                margin: "0 0 8px 0",
                color: "#888",
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "0.5px"
              }}
            >
              Total Funds
            </p>
            <p
              style={{
                margin: 0,
                color: "#00C853",
                fontSize: "28px",
                fontWeight: "bold"
              }}
            >
              {totalFunds}
            </p>
          </div>

          <div
            style={{
              padding: "15px",
              backgroundColor: "#1a1f2e",
              borderRadius: "8px",
              border: "1px solid #333"
            }}
          >
            <p
              style={{
                margin: "0 0 8px 0",
                color: "#888",
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "0.5px"
              }}
            >
              Avg 1Y Return
            </p>
            <p
              style={{
                margin: 0,
                color: "#00C853",
                fontSize: "28px",
                fontWeight: "bold"
              }}
            >
              {avgReturn.toFixed(2)}%
            </p>
          </div>

          <div
            style={{
              padding: "15px",
              backgroundColor: "#1a1f2e",
              borderRadius: "8px",
              border: "1px solid #333"
            }}
          >
            <p
              style={{
                margin: "0 0 8px 0",
                color: "#888",
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "0.5px"
              }}
            >
              Avg Investo Score
            </p>
            <p
              style={{
                margin: 0,
                color: "#00C853",
                fontSize: "28px",
                fontWeight: "bold"
              }}
            >
              {avgScore.toFixed(1)}/100
            </p>
          </div>


        </div>
      </div>

      {/* Key Insights */}
      <div
        style={{
          marginTop: "25px",
          padding: "15px",
          backgroundColor: "#1a1f2e",
          borderRadius: "8px",
          border: "1px solid #333"
        }}
      >
        <h3
          style={{
            margin: "0 0 12px 0",
            color: "#00C853",
            fontSize: "16px"
          }}
        >
          Key Insights
        </h3>
        <ul
          style={{
            margin: 0,
            paddingLeft: "20px",
            color: "#ccc",
            fontSize: "14px",
            lineHeight: "1.6"
          }}
        >
          <li>
            Your portfolio has {riskCounts.Low} low-risk, {riskCounts.Medium} medium-risk, and {riskCounts.High} high-risk funds.
          </li>
          <li>
            Average portfolio return over 1 year is {avgReturn.toFixed(2)}%
          </li>
          <li>
            Overall portfolio Investo Score: {avgScore.toFixed(1)}/100
          </li>
        </ul>
      </div>
    </div>
  );
}

export default RiskReturnChart;
