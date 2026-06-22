import { Pie } from "react-chartjs-2";


import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function SIPPieChart({
    totalInvestment,
    estimatedReturns
}) {

const total = totalInvestment + estimatedReturns;

const investmentPercentage = (
  (totalInvestment / total) * 100
).toFixed(1);

const returnsPercentage = (
  (estimatedReturns / total) * 100
).toFixed(1);

const data = {
    labels: [
        "Investment",
        "Returns"
    ],

    datasets: [
        {
            label: "Amount",

            data: [
                totalInvestment,
                estimatedReturns
            ],

            backgroundColor: [
                "#2196F3",
                "#4CAF50"

            ],

            borderWidth: 1
        }
    ]
};

const options = {
    responsive: true,

    plugins: {
        legend: {
            position: "bottom",
            labels: {
        color: "#4b9a92ff",
        font: {
          size: 18,
          weight: "bold"
        },
        padding: 20
      }
    },
    tooltip: {
  backgroundColor: "#222",
  titleColor: "#fff",
  bodyColor: "#fff",
  padding: 12,

  callbacks: {
    label: function (context) {

      const value = context.raw;

      const percentage = (
        (value / total) * 100
      ).toFixed(1);

      return `₹${value.toLocaleString()} (${percentage}%)`;
    }
  }
}

        }
};

  return (
    <div
        style={{
            width: "350px",
            margin: "30px auto"
        }}
    >
        <Pie data={data}
         options={options}
         />
    </div>
);
}

export default SIPPieChart;