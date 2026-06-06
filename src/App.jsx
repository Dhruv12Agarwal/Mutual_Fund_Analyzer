import FundCard from "./Components/FundCard";
import CompareFunds from "./Components/CompareFunds";
import { useState , useEffect} from "react";
import funds from "./data/funds";
import { categories, sortOptions } from "./data/constants";
// import TestAPI from "./TestAPI";

function App() {

  // return <TestAPI />;
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [sortOrder, setSortOrder] = useState("high");
  const [searchTerm, setSearchTerm] = useState("");
  const [fund1, setFund1] = useState("");
  const [fund2, setFund2] = useState("");
  const [loading, setLoading] = useState(true);

useEffect(() => {
  setTimeout(() => {

    setLoading(false);
  }, 3000);
}, []);
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

if (loading) {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "100px"
      }}
    >
      <h1>Loading Funds...</h1>
    </div>
  );
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

      <option
      key={fund.name}
      value={fund.name}>
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

      <option
      key={fund.name}
      value={fund.name}>
        {fund.name}
      </option>

    ))
  }

</select>

<br />
<br />
{
  categories.map((category) => (
    <button
    key={category}
      style={{
        ...buttonStyle,
        backgroundColor:
          selectedCategory === category
            ? "#000000ff"
            : "#464646ff",
        color: "white"
      }}
      onClick={() => setSelectedCategory(category)}>
      {category}
    </button>
  ))
}
      <br /><br />
      {
  sortOptions.map((option) => (
    <button
    key={option.value}
      style={{
        ...buttonStyle,
        backgroundColor:
          sortOrder === option.value
            ? "#000000ff"
            : "#464646ff",

        color: "white"
      }}
      onClick={() => setSortOrder(option.value)}>
      {option.label}
    </button>
  ))
}


<CompareFunds
  selectedFund1={selectedFund1}
  selectedFund2={selectedFund2}
/>
      {
  filteredFunds.map((fund) => (
    <FundCard
    key={fund.name}
    fund={fund} />
  ))
}

    </div>
  );
}

export default App;