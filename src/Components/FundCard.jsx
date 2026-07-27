import NAVChart from "./NAVChart";
import { getScoreColor, getScoreRating } from "../utils/calculateInvestorScore";

function FundCard(props) {
function getRiskColor(risk) {

  if (risk === "High") {
    return "red";
  }

  if (risk === "Medium") {
    return "orange";
  }

  return "green";

}

const scoreColor = getScoreColor(props.fund.investorScore);
const scoreRating = getScoreRating(props.fund.investorScore);

  return (

    <div
      style={{
        border: "4px solid gray",
        padding: "15px",
        margin: "15px",
        borderRadius: "10px"
      }}
    >
      <button
  onClick={() =>
    props.removeFund(props.fund.name)
  }
  style={{
    float: "right",
    border: "none",
    background: "none",
    cursor: "pointer",
    fontSize: "20px",
    color: "#ec0f0fff"
  }}
>
  ✕
</button>
      <h2>{props.fund.name}</h2>

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
          marginTop: "10px"
        }}
      >
        📊 Investor Score: {props.fund.investorScore}/100 ({scoreRating})
      </p>

      {/* <NAVChart historicalData={props.fund.historicalData} /> */}

      <button
        onClick={() => props.openChart(props.fund)}
        style={{
        backgroundColor: "#000000",
        marginTop: "10px",
        padding: "10px 20px",
        cursor: "pointer"
  }}
>
    📈 View NAV History
</button>

    </div>
  );
}

export default FundCard;