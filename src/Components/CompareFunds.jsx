function getRiskColor(risk) {

  if (risk === "High") {
    return "red";
  }

  if (risk === "Medium") {
    return "yellow";
  }

  return "green";

}
function CompareFunds(props ) {
  return (
    <div>
      {props.selectedFund1 && props.selectedFund2 && (
  <div  style={{
        border: "3px solid gray",
        padding: "20px",
        margin: "20px auto",
        borderRadius: "10px",
        width: "350px"
      }}>
    <h2>
      Fund Comparison
    </h2>

      <p
  style={{
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "20px"
  }}
>
  {props.selectedFund1.name} VS {props.selectedFund2.name}
</p>
      <p>
  Category: {props.selectedFund1.category} vs {props.selectedFund2.category}
</p>
<p>
  Returns: {props.selectedFund1.returns}% vs {props.selectedFund2.returns}%
</p>
<p>
  Risk:

  <span
    style={{
      color: getRiskColor(props.selectedFund1.risk)
    }}
  >
    {" "}{props.selectedFund1.risk}
  </span> vs <span
    style={{
      color: getRiskColor(props.selectedFund2.risk)
    }}
  >
    {props.selectedFund2.risk}
  </span>
</p>
  </div>
)}
    </div>
  );
}

export default CompareFunds;