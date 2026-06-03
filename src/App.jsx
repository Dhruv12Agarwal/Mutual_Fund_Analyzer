import FundCard from "./FundCard";
import { useState } from "react";

function App() {

  const funds = [
    {
      name: "Axis Bluechip",
      category: "Equity",
      returns: 14.5,
      risk: "Medium"
    },

    {
      name: "PPFAS Flexi Cap",
      category: "Flexi Cap",
      returns: 18.2,
      risk: "Medium"
    },

    {
      name: "HDFC Small Cap",
      category: "Small Cap",
      returns: 22.1,
      risk: "High"
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");

  const [sortOrder, setSortOrder] = useState("high");
  const [searchTerm, setSearchTerm] = useState("");
  const [fund1, setFund1] = useState("");
  const [fund2, setFund2] = useState("");

  const filteredFunds = funds.filter((fund) => {

  const categoryMatch =
    selectedCategory === "All" ||
    fund.category === selectedCategory;

  const searchMatch =
    fund.name.toLowerCase().includes(searchTerm.toLowerCase())

  return categoryMatch && searchMatch;

});
const selectedFund1 = funds.find(
  (fund) => fund.name === fund1
);

const selectedFund2 = funds.find(
  (fund) => fund.name === fund2
);

  filteredFunds.sort((a, b) => {

    if (sortOrder === "high") {
      return b.returns - a.returns;
    }

    return a.returns - b.returns;

  });

const buttonStyle = {
  border: "1px solid gray",
  marginRight: "10px",
  padding: "8px 15px",
  borderRadius: "5px",
  cursor: "pointer"
};
const selectStyle = {
  padding: "10px",
  width: "250px",
  borderRadius: "5px",
  border: "1px solid gray",
  marginBottom: "10px"
};

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
      border: "5px solid black",
      margin: "25px",
    padding: "40px",
    fontFamily: "Arial"
  }}
    >

      <h1>Mutual Fund Analyzer</h1>

      <input
  type="text"
  style={selectStyle}
  placeholder="Type to search funds..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>
<br />
<h3
  style={{
    marginTop: "20px",
    marginBottom: "10px"
  }}
>
  Select Funds to Compare
</h3>
<select
  style={selectStyle}
  value={fund1}
  onChange={(e) => setFund1(e.target.value)}
>

  <option value="">
    Select First Fund
  </option>

  {
    funds.map((fund) => (

      <option value={fund.name}>
        {fund.name}
      </option>

    ))
  }

</select>
<br />
<select
  value={fund2}
  style={selectStyle}
  onChange={(e) => setFund2(e.target.value)}
>

  <option value="">
    Select Second Fund
  </option>

  {
    funds.map((fund) => (

      <option value={fund.name}>
        {fund.name}
      </option>

    ))
  }

</select>

<br />
<br />
      <button
      style={{
  ...buttonStyle,

  backgroundColor:
    selectedCategory === "All"
      ? "#000000ff"
      : "#464646ff",

  color: "white"
}}
      onClick={() => setSelectedCategory("All")}>
        All
      </button>

      <button
    style={{
  ...buttonStyle,

  backgroundColor:
    selectedCategory === "Equity"
      ? "#000000ff"
      : "#464646ff",

  color: "white"
}}
      onClick={() => setSelectedCategory("Equity")}>
        Equity
      </button>

      <button
    style={{
  ...buttonStyle,

  backgroundColor:
    selectedCategory === "Small Cap"
      ? "#000000ff"
      : "#464646ff",

  color: "white"
}}
      onClick={() => setSelectedCategory("Small Cap")}>
        Small Cap
      </button>
      <button
    style={{
  ...buttonStyle,

  backgroundColor:
    selectedCategory === "Flexi Cap"
      ? "#000000ff"
      : "#464646ff",

  color: "white"
}}
      onClick={() => setSelectedCategory("Flexi Cap")}>
        Flexi Cap
      </button>
      <br /><br />

      <button
      style={{
  ...buttonStyle,

  backgroundColor:
    sortOrder === "high"
      ? "#000000ff"
      : "#464646ff",

  color: "white"
}}
      onClick={() => setSortOrder("high")}>
        Highest Returns
      </button>

      <button
      style={{
  ...buttonStyle,

  backgroundColor:
    sortOrder === "low"
      ? "#000000ff"
      : "#464646ff",

  color: "white"
}}
      onClick={() => setSortOrder("low")}>
        Lowest Returns
      </button>

{selectedFund1 && selectedFund2 && (
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
  {selectedFund1.name} VS {selectedFund2.name}
</p>
      <p>
  Category: {selectedFund1.category} vs {selectedFund2.category}
</p>
<p>
  Returns: {selectedFund1.returns}% vs {selectedFund2.returns}%
</p>
<p>
  Risk:

  <span
    style={{
      color: getRiskColor(selectedFund1.risk)
    }}
  >
    {" "}{selectedFund1.risk}
  </span> vs <span
    style={{
      color: getRiskColor(selectedFund2.risk)
    }}
  >
    {selectedFund2.risk}
  </span>
</p>
  </div>
)}

      {
  filteredFunds.map((fund) => (
    <FundCard fund={fund} />
  ))
}

    </div>
  );
}

export default App;