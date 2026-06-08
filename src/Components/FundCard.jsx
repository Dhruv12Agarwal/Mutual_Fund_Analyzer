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

    </div>
  );
}

export default FundCard;