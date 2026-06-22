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

function NAVChart({ historicalData }) {

    const [selectedRange, setSelectedRange] = useState("1Y");

    const rangeDays = {
  "1M": 22,
  "6M": 125,
  "1Y": 250,
  "3Y": 750,
  "5Y": 1250,
  "MAX": historicalData.length
};

if (!historicalData) {
  return <h2>No Data</h2>;
}

const graphData = historicalData.slice(0,rangeDays[selectedRange]);
    const orderedData = [...graphData].reverse();///...copy bna ra hai

    const labels = orderedData.map((item) => item.date);
    const values = orderedData.map((item) => parseFloat(item.nav));

    const data = {
  labels,
  datasets: [
    {
      label: "NAV",
    data: values,
    borderColor: "#4CAF50",
    backgroundColor: "#4CAF50",

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

  maintainAspectRatio:false,

  interaction: {
  mode: "nearest",
  axis: "x",
  intersect: false
},

  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
  x: {
    ticks: {
      maxTicksLimit: 12,
      maxRotation: 0,
      minRotation: 0
    }
  }
}
};


  console.log(historicalData);

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

  return (
    <div
  style={{
    width: "100%",
    height: "80%"
    // margin: "20px auto"
  }}
>
  <hr />
  <Line
    data={data}
    options={options}
  />

<div
  style={{
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "20px"
  }}
>

  <button
  style={buttonStyle("1M")}
  onClick={() => setSelectedRange("1M")}>
    1M
  </button>

  <button
  style={buttonStyle("6M")}
  onClick={() => setSelectedRange("6M")}>
    6M
  </button>

  <button
  style={buttonStyle("1Y")}
  onClick={() => setSelectedRange("1Y")}>
    1Y
  </button>

  <button
  style={buttonStyle("3Y")}
  onClick={() => setSelectedRange("3Y")}>
    3Y
  </button>

  <button
  style={buttonStyle("5Y")}
  onClick={() => setSelectedRange("5Y")}>
    5Y
  </button>

  <button
  style={buttonStyle("MAX")}
  onClick={() => setSelectedRange("MAX")}>
    MAX
  </button>

</div>

</div>
  );
}

export default NAVChart;