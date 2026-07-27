import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";

import { Line } from "react-chartjs-2";
import { useState } from "react";

const verticalLinePlugin = {
  id: "verticalLine",

  afterDatasetsDraw(chart) {

    const { ctx, tooltip, scales } = chart;

if (!tooltip) return;

const activePoints = tooltip.getActiveElements();

if (activePoints.length === 0) return;

    const x = activePoints[0].element.x;

    ctx.save();

    ctx.beginPath();

    ctx.moveTo(x, scales.y.top);

    ctx.lineTo(x, scales.y.bottom);

    ctx.lineWidth = 2;

    ctx.strokeStyle = "rgba(219, 211, 211, 0.35)";

    ctx.setLineDash([4, 4]);

    ctx.stroke();

    ctx.setLineDash([]);

    ctx.restore();
  }
};


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  verticalLinePlugin
);

function CompareChart({ fund1, fund2 }) {

    const [selectedRange, setSelectedRange] = useState("1Y");
    const [chartType, setChartType] = useState("NAV");

    const rangeDays = {
  "1M": 22,
  "6M": 125,
  "1Y": 250,
  "3Y": 750,
  "5Y": 1250,
"MAX": Math.min(fund1.historicalData.length,
  fund2.historicalData.length
)
};

if (!fund1 || !fund2) {
  return <h2>No Data</h2>;
}

const graphData1 = fund1.historicalData.slice(0,rangeDays[selectedRange]);
const graphData2 = fund2.historicalData.slice(0,rangeDays[selectedRange]);

const orderedData1 = [...graphData1].reverse();
const orderedData2 = [...graphData2].reverse();///...copy bna ra hai

    const labels = orderedData1.map((item) => item.date);//only for x axis dates so no frk ke 1 le ya 2
    const values1 = orderedData1.map(item => parseFloat(item.nav));
    const values2 = orderedData2.map(item =>parseFloat(item.nav));

    const firstNAV1 = values1[0];
    const firstNAV2 = values2[0];

    const growthValues1 = values1.map(nav =>
  ((nav - firstNAV1) / firstNAV1) * 100
);

const growthValues2 = values2.map(nav =>
  ((nav - firstNAV2) / firstNAV2) * 100
);

const displayValues1 =
  chartType === "NAV"
    ? values1
    : growthValues1;

const displayValues2 =
  chartType === "NAV"
    ? values2
    : growthValues2;

    const data = {
  labels,

  datasets: [

    {
      label: fund1.name,
      data: displayValues1,

      borderColor: "#4CAF50",
      backgroundColor: "#4CAF50",

      borderWidth: 2,

      pointRadius: 0,
      pointHitRadius: 20,
      pointHoverRadius: 5,

      tension: 0.3,

      fill: false
    },

    {
      label: fund2.name,
      data: displayValues2,

      borderColor: "#2196F3",
      backgroundColor: "#2196F3",

      borderWidth: 2,

      pointRadius: 0,
      pointHitRadius: 20,
      pointHoverRadius: 5,

      tension: 0.3,

      fill: false
    }

  ]
};


const options = {
  responsive: true,
  maintainAspectRatio: false,

  interaction: {
    mode: "nearest",
    axis: "x",
    intersect: false
  },

  plugins: {
    legend: {
      display: true,
      labels: {
        padding: 15,
        font: {
          size: 13
        }
      }
    },

    tooltip: {
      callbacks: {
        label: function (context) {
          if (chartType === "Growth") {
            return (
              context.dataset.label +
              ": " +
              context.parsed.y.toFixed(2) +
              "%"
            );
          }

          return (
            context.dataset.label +
            ": ₹" +
            context.parsed.y.toFixed(2)
          );
        }
      }
    }
  },
  scales: {
    x: {
      ticks: {
        maxTicksLimit: 12,
        maxRotation: 0,
        minRotation: 0
      },
      grid: {
        display: true,
        drawBorder: true
      }
    },

    y: {
      ticks: {
        callback: function (value) {
          if (chartType === "Growth") {
            return value.toFixed(1) + "%";
          }

          return "₹" + value.toFixed(0);
        }
      },
      grid: {
        display: true,
        drawBorder: true
      }
    }
  }
};


//   console.log(historicalData);

  const buttonStyle = (range) => ({
  padding: "8px 16px",
  borderRadius: "20px",
  border: "none",
  cursor: "pointer",
  fontWeight: "bold",

  backgroundColor:
    selectedRange === range
      ? "#00C853"
      : "#2b2b2b",

  color:
    selectedRange === range
      ? "black"
      : "white"
});

const chartButtonStyle = (type) => ({
  padding: "8px 16px",
  borderRadius: "20px",
  border: "none",
  cursor: "pointer",
  fontWeight: "bold",

  backgroundColor:
    chartType === type
      ? "#00C853"
      : "#2b2b2b",

  color:
    chartType === type
      ? "black"
      : "white"
});

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "15px"
      }}
    >
      <hr style={{ margin: "10px 0" }} />

      <h3
        style={{
          textAlign: "center",
          marginBottom: "0",
          marginTop: "0",
          fontSize: "16px"
        }}
      >
        Compare By
      </h3>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "15px"
        }}
      >
        <button
          style={chartButtonStyle("NAV")}
          onClick={() => setChartType("NAV")}
        >
          NAV
        </button>

        <button
          style={chartButtonStyle("Growth")}
          onClick={() => setChartType("Growth")}
        >
          Growth %
        </button>
      </div>

      <div
        style={{
          position: "relative",
          width: "100%",
          height: "500px",
          minHeight: "500px"
        }}
      >
        <Line data={data} options={options} />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginTop: "0",
          flexWrap: "wrap"
        }}
      >
        <button style={buttonStyle("1M")} onClick={() => setSelectedRange("1M")}>
          1M
        </button>

        <button style={buttonStyle("6M")} onClick={() => setSelectedRange("6M")}>
          6M
        </button>

        <button style={buttonStyle("1Y")} onClick={() => setSelectedRange("1Y")}>
          1Y
        </button>

        <button style={buttonStyle("3Y")} onClick={() => setSelectedRange("3Y")}>
          3Y
        </button>

        <button style={buttonStyle("5Y")} onClick={() => setSelectedRange("5Y")}>
          5Y
        </button>

        <button style={buttonStyle("MAX")} onClick={() => setSelectedRange("MAX")}>
          MAX
        </button>
      </div>
    </div>
  );
}

export default CompareChart;