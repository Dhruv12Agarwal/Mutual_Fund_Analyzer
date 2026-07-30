import NAVChart from "./NAVChart";
import { getScoreColorV2, getScoreRatingV2 } from "../utils/calculateInvestorScoreV2";
import { useState } from "react";

function FundCard(props) {
  const [isHovered, setIsHovered] = useState(false);

  function getRiskColor(risk) {
    if (risk === "High") {
      return "red";
    }

    if (risk === "Medium") {
      return "orange";
    }

    return "green";
  }

  const scoreColor = getScoreColorV2(props.fund.investorScore);
  const scoreRating = getScoreRatingV2(props.fund.investorScore);

  return (
    <div
      style={{
        border: isHovered ? "2px solid #00C853" : "2px solid #333",
        padding: "20px",
        borderRadius: "12px",
        backgroundColor: isHovered ? "#242424" : "#1a1a1a",
        boxSizing: "border-box",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        transition: "all 0.3s ease",
        boxShadow: isHovered ? "0 0 20px rgba(0, 200, 83, 0.3)" : "none",
        cursor: "pointer"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={() => props.removeFund(props.fund.name)}
        style={{
          float: "right",
          border: "none",
          background: "none",
          cursor: "pointer",
          fontSize: "20px",
          color: isHovered ? "#FF5252" : "#ec0f0f",
          transition: "all 0.2s ease",
          padding: "5px 10px"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.2)";
          e.currentTarget.style.color = "#FF1744";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.color = isHovered ? "#FF5252" : "#ec0f0f";
        }}
      >
        ✕
      </button>
      <h2 style={{ marginTop: "0", color: isHovered ? "#00C853" : "#fff", transition: "color 0.2s ease" }}>
        {props.fund.name}
      </h2>

      <p>Category: {props.fund.category}</p>

      <p>1Y Returns: {props.fund.returns1Y}%</p>
      <p>
        Risk:
        <span style={{
          color: getRiskColor(props.fund.risk)
        }}>
          {" "}{props.fund.risk}
        </span>
      </p>

      <p
        style={{
          fontSize: "18px",
          fontWeight: "bold",
          color: scoreColor,
          marginTop: "10px",
          padding: "8px 12px",
          backgroundColor: isHovered ? "rgba(0, 200, 83, 0.1)" : "transparent",
          borderRadius: "6px",
          transition: "all 0.2s ease"
        }}
      >
        📊 Investo Score: {props.fund.investorScore}/100 ({scoreRating})
      </p>

      {/* <NAVChart historicalData={props.fund.historicalData} /> */}

      <button
        onClick={() => props.openChart(props.fund)}
        style={{
          backgroundColor: isHovered ? "#00C853" : "#000000",
          color: isHovered ? "#000" : "#fff",
          marginTop: "auto",
          padding: "12px 20px",
          cursor: "pointer",
          borderRadius: "6px",
          border: isHovered ? "1px solid #00C853" : "1px solid #444",
          fontWeight: "600",
          transition: "all 0.2s ease",
          fontSize: "14px"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 0 15px rgba(0, 200, 83, 0.4)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        📈 View NAV History
      </button>

    </div>
  );
}

export default FundCard;