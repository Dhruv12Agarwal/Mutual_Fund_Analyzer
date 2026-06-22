import { useState } from "react";
import "./SIPCalculator.css";
import SIPPieChart from "./SIPPieChart";

function SIPCalculator({ funds }) {

  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [years, setYears] = useState(1);
  const [expectedReturn, setExpectedReturn] = useState(10);
  const [returnType, setReturnType] = useState("custom");
  const [selectedFund, setSelectedFund] = useState("");

  const selectedFundData = funds.find(
  (fund) => fund.name === selectedFund
);

  const containerStyle = {
  width: "450px",
  margin: "40px auto",
  padding: "25px",
  border: "1px solid gray",
  borderRadius: "12px",
  backgroundColor: "#151515",
  textAlign: "center"
};

const inputStyle = {
  width: "250px",
  padding: "10px",
  marginTop: "8px",
  borderRadius: "5px",
  border: "1px solid gray"
};

let annualReturn;

if (returnType === "custom") {
  annualReturn = expectedReturn;
}
else if (selectedFundData) {
  annualReturn = selectedFundData.returns1Y;
}
else {
  annualReturn = 0;
}

const monthlyRate = annualReturn / 12 / 100;

const totalMonths = years * 12;

const maturityAmount =
  monthlyInvestment *
  (((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) *
    (1 + monthlyRate));

const totalInvestment = monthlyInvestment * totalMonths;

const estimatedReturns = maturityAmount - totalInvestment;



  return (
     <div className="sip-container">

      <h2>SIP Calculator</h2>
      <br />

      <div>

        <label>Choose Mutual Fund (Optional)</label>

            <select
              className="sip-input"
              value={selectedFund}
              onChange={(e) => setSelectedFund(e.target.value)}
            >
              <option value="">
                Select a Fund
              </option>

              {
                funds.map((fund) => (
                  <option
                    key={fund.name}
                    value={fund.name}
                  >
                    {fund.name}
                  </option>
                ))
              }
            </select>

            {selectedFundData && (
              <div style={{ marginTop: "15px" }}>
                <p>
                  <strong>Category:</strong> {selectedFundData.category}
                </p>

                <p>
                  <strong>Risk:</strong> {selectedFundData.risk}
                </p>

                <p>
                  <strong>Past 1-Year Return:</strong> {selectedFundData.returns1Y}%
                </p>
              </div>
)}

            <br />
            <br />

        <label>Monthly Investment (₹)</label>
        <br />

        <input
         style={inputStyle}
          type="number"
          value={monthlyInvestment}
          onChange={(e) =>
            setMonthlyInvestment(e.target.value)
          }
        />

      </div>

      <br />

      <div>

        <label>Investment Duration (Years)</label>
        <br />

        <input
         style={inputStyle}
          type="number"
          value={years}
          onChange={(e) =>
            setYears(e.target.value)
          }
        />

      </div>

      <br />

      <div>

<h3>Expected Return Source</h3>

<label>
  <input
    type="radio"
    value="custom"
    checked={returnType === "custom"}
    onChange={(e) => setReturnType(e.target.value)}
  />
  Enter Custom Return
</label>

<br />

<label>
  <input
    type="radio"
    value="fund"
    checked={returnType === "fund"}
    // disabled={selectedFund === ""}
    onChange={(e) => setReturnType(e.target.value)}
  />
  Use Selected Fund's 1-Year Return
</label>

<br />
<br />

{returnType === "custom" && (
  <div>
    <label>Expected Annual Return (%)</label>
    <br />

    <input
      style={inputStyle}
      type="number"
      value={expectedReturn}
      onChange={(e) =>
        setExpectedReturn(e.target.value)
      }
    />
  </div>
)}

{returnType === "fund" && !selectedFundData && (
  <p style={{ color: "red" }}>
    Please select a mutual fund first.
  </p>
)}

{returnType === "fund" && selectedFundData && (
  <p>
    <strong>Expected Return Used:</strong> {selectedFundData.returns1Y}%
  </p>
)}

<br />


        <hr />

<h3>Results</h3>

<div className="result-card">
    <p className="result-title">
        💰 Total Investment
    </p>

    <p className="result-value">
        ₹{Math.round(totalInvestment).toLocaleString("en-IN")}
    </p>
</div>

<div className="result-card">
    <p className="result-title">
        📈 Estimated Returns
    </p>

    <p className="result-value">
        ₹{Math.round(estimatedReturns).toLocaleString("en-IN")}
    </p>
</div>

<div className="result-card">
    <p className="result-title">
        💎 Total Value
    </p>

    <p className="result-value">
        ₹{Math.round(maturityAmount).toLocaleString("en-IN")}
    </p>


</div>
<h3><strong><u>Investment Breakdown</u></strong></h3>
    <SIPPieChart
    totalInvestment={totalInvestment}
    estimatedReturns={estimatedReturns}
/>
       </div>
       <br />
       <hr />
       <br />
       <strong>Note: SIP calculations are estimates. Historical returns do not guarantee future performance.</strong>
    </div>
  );
}

export default SIPCalculator;