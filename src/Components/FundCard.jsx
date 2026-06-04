function FundCard(props) {
function getRiskColor(risk) {

  if (risk === "High") {
    return "red";
  }

  if (risk === "Medium") {
    return "yellow";
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

      <h2>{props.fund.name}</h2>

      <p>Category: {props.fund.category}</p>

      <p>3Y Returns: {props.fund.returns}%</p>
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