import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  ScatterController
} from "chart.js";
import { Scatter } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  ScatterController
);

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
        <p>Add funds to your portfolio to see the Risk vs Return chart</p>
      </div>
    );
  }

  // Map risk levels to numeric values
  const riskMap = {
    "Low": 1,
    "Medium": 2,
    "High": 3
  };

  // Prepare data points
  const dataPoints = funds.map((fund) => ({
    x: riskMap[fund.risk] || 2,
    y: parseFloat(fund.returns1Y) || 0,
    label: fund.name
      .replace(" - Direct Plan - Growth", "")
      .replace(" - Regular Plan - Growth", "")
      .replace(" - Investment Plan", "")
      .replace(" - Direct Plan", "")
      .replace(" - Growth", ""),
    risk: fund.risk,
    returns: fund.returns1Y,
    investo: fund.investorScore
  }));

  // Calculate average values for reference line
  const avgReturn =
    dataPoints.reduce((sum, p) => sum + p.y, 0) / dataPoints.length;
  const avgRisk =
    dataPoints.reduce((sum, p) => sum + p.x, 0) / dataPoints.length;

  // Color code by risk level
  const colors = dataPoints.map((point) => {
    if (point.risk === "Low") return "#00C853"; // Green
    if (point.risk === "Medium") return "#FFC107"; // Amber
    return "#FF5252"; // Red
  });

  const data = {
    datasets: [
      {
        label: "Funds",
        data: dataPoints,
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 2,
        pointRadius: 8,
        pointHoverRadius: 10,
        tension: 0.1
      },
      {
        label: "Portfolio Average",
        data: [{ x: avgRisk, y: avgReturn }],
        backgroundColor: "#00C853",
        borderColor: "#00C853",
        borderWidth: 3,
        pointRadius: 10,
        pointStyle: "star",
        showLine: false
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "#fff",
          font: {
            size: 14
          }
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
          title: (context) => {
            return context[0].raw.label || "Fund";
          },
          label: (context) => {
            const point = context.raw;
            return [
              `Risk: ${point.risk}`,
              `Return: ${point.returns}%`,
              `Investo Score: ${point.investo}/100`
            ];
          }
        }
      }
    },
    scales: {
      x: {
        type: "linear",
        min: 0.5,
        max: 3.5,
        ticks: {
          callback: (value) => {
            if (value === 1) return "Low Risk";
            if (value === 2) return "Medium Risk";
            if (value === 3) return "High Risk";
            return value;
          },
          color: "#888",
          font: {
            size: 12
          }
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)"
        },
        title: {
          display: true,
          text: "Risk Level",
          color: "#fff",
          font: {
            size: 14,
            weight: "bold"
          }
        }
      },
      y: {
        ticks: {
          callback: (value) => `${value}%`,
          color: "#888",
          font: {
            size: 12
          }
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)"
        },
        title: {
          display: true,
          text: "1-Year Return (%)",
          color: "#fff",
          font: {
            size: 14,
            weight: "bold"
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
          marginBottom: "20px",
          fontSize: "24px",
          fontWeight: "600",
          color: "#fff"
        }}
      >
        📊 Risk vs Return Analysis
      </h2>

      <p
        style={{
          textAlign: "center",
          color: "#888",
          fontSize: "14px",
          marginBottom: "20px"
        }}
      >
        Each dot represents a fund in your portfolio. Higher risk generally correlates with higher returns.
      </p>

      <div
        style={{
          height: "450px",
          width: "100%"
        }}
      >
        <Scatter data={data} options={options} />
      </div>

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
            margin: "0 0 15px 0",
            color: "#00C853",
            fontSize: "16px"
          }}
        >
          Legend
        </h3>
        <div
          style={{
            display: "flex",
            gap: "30px",
            flexWrap: "wrap"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                backgroundColor: "#00C853"
              }}
            />
            <span style={{ color: "#fff" }}>Low Risk</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                backgroundColor: "#FFC107"
              }}
            />
            <span style={{ color: "#fff" }}>Medium Risk</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                backgroundColor: "#FF5252"
              }}
            />
            <span style={{ color: "#fff" }}>High Risk</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "16px",
                height: "16px",
                clip: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)"
              }}
              >
              <div
                style={{
                  backgroundColor: "#00C853",
                  width: "100%",
                  height: "100%"
                }}
              />
            </div>
            <span style={{ color: "#fff" }}>Portfolio Average</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RiskReturnChart;
