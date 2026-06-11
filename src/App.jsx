import FundCard from "./Components/FundCard";
import CompareFunds from "./Components/CompareFunds";
import { useState , useEffect} from "react";
// import funds from "./data/funds";
import { categories, sortOptions } from "./data/constants";
// import TestAPI from "./TestAPI";
// import RealFundsAPI from "./RealFundsAPI";
const MAX_RESULTS_TO_SHOW = 20;
function App() {

  // return <TestAPI />;
  // return <RealFundsAPI />;
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [sortOrder, setSortOrder] = useState("high");
  const [searchTerm, setSearchTerm] = useState("");
  const [fund1, setFund1] = useState("");

  const [allSchemes, setAllSchemes] = useState([]);

  const [fund2, setFund2] = useState("");
  const [funds, setFunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchResults, setSearchResults] =useState([]);
  const [apiSearch, setApiSearch] = useState("");
  // const [debouncedSearch, setDebouncedSearch] =useState("");
  const [addingFund, setAddingFund] = useState(false);
  // const [searchingFunds, setSearchingFunds] = useState(false);
  const [searchCategory, setSearchCategory] = useState("All");
const [searchPlan, setSearchPlan] = useState("All");
const [searchOption, setSearchOption] = useState("All");

  const knownCategories = [
  "Flexi Cap",
  "Value Fund",
  "Sectoral",
  "Hybrid",
  "Liquid",
  "Index Funds",
  "ETF"
];


  function getRisk(category) {

  if (
    category.includes("Flexi Cap") ||
    category.includes("Sectoral") ||
    category.includes("Thematic")
  ) {
    return "High";
  }

  if (
    category.includes("Liquid") ||
    category.includes("Money Market") ||
    category.includes("Overnight")
  ) {
    return "Low";
  }

  return "Medium";
}

  function calculateReturn(navData) {

  if (navData.length <= 250) {
    return "N/A";
  }
  const currentNAV =
    parseFloat(navData[0].nav);
  const oldNAV =
    parseFloat(navData[250].nav);

  const returns =
    ((currentNAV - oldNAV) / oldNAV) * 100;

  return returns.toFixed(2);
}

function calculateScore(fundName, query) {

  const words = query
  .toLowerCase()
  .trim()
  .split(/\s+/);
  let score = 0;

  const name = fundName.toLowerCase();

  for (let word of words) {

    if (name.includes(word)) {
      score++;
    }

  }

  return score;
}

  async function getFunds() {//loads the 10 defaukt cards.

  try {

    const schemeCodes = [
149166, // Axis Value Fund - Direct Plan - Growth
  149094, // Nippon India Flexi Cap Fund - Direct Plan - Growth
  122639, // Parag Parikh Flexi Cap Fund - Direct Plan - Growth
  148651, // ICICI Prudential Business Cycle Fund Direct Plan Growth
  148958, // Parag Parikh Conservative Hybrid Fund - Direct Plan - Growth
  148490, // SBI Children's Fund - Investment Plan - Direct Plan - Growth
  149107, // HDFC NIFTY50 Equal Weight Index Fund - Direct Plan - Growth
  147794, // Motilal Oswal Nifty 50 Index Fund - Direct plan - Growth
  148457, // Nippon India Multi Asset Allocation Fund - Direct Plan - Growth
  149156  // Axis NIFTY India Consumption ETF
    ];

    const fundResponses = await Promise.all(

      schemeCodes.map(async (code) => {

        const response = await fetch(
          `https://api.mfapi.in/mf/${code}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch fund");
        }

        return await response.json();

      })

    );

    const transformedFunds = fundResponses.map((fund) => {

  return {

    name: fund.meta.scheme_name,

    category: fund.meta.scheme_category,

    risk: getRisk(
      fund.meta.scheme_category
    ),

    returns1Y: calculateReturn(
      fund.data
    )

  };

});

    setFunds(transformedFunds);

  }
  catch (error) {

    setError(
      "Failed to load funds. Please try again."
    );

  }
  finally {

    setLoading(false);

  }

}

async function getAllSchemes() {//to load all schemes in the background for faster search results when user types in search box.
  try {
    const response = await fetch(
      "https://api.mfapi.in/mf"
    );

    const data = await response.json();
    const uniqueSchemes = [
  ...new Map(
    data.map(fund => [fund.schemeCode, fund])
  ).values()
];

setAllSchemes(uniqueSchemes);




  }
  catch (error) {

  }
}

useEffect(() => {
  getFunds();
  getAllSchemes();
}, []);

// useEffect(() => {

//   const timer = setTimeout(() => {

//     setDebouncedSearch(apiSearch);

//   }, 500);

//   return () => clearTimeout(timer);

// }, [apiSearch]);

// useEffect(() => {
//   searchFunds(debouncedSearch);
// }, [debouncedSearch]);

useEffect(() => {
  searchFunds(apiSearch);
}, [searchCategory, searchPlan, searchOption]);

function removeFund(fundName) {
  setFunds(
    funds.filter(
      (fund) => fund.name !== fundName
    )
  );
}

function searchFunds(query) {

  if (query.trim() === "") {
    setSearchResults([]);

    return;
  }

  const words = query
  .toLowerCase()
  .trim()
  .split(/\s+/);


const filtered = allSchemes.filter((fund) => {

  const name = fund.schemeName.toLowerCase();

  // Name search
  const matchesSearch = words.some((word) =>
    name.includes(word)
  );

  // Category filter
  const matchesCategory =
    searchCategory === "All" ||
    fund.schemeName.includes(searchCategory);

  // Plan filter
  const matchesPlan =
    searchPlan === "All" ||
    fund.schemeName.includes(searchPlan);

  // Option filter
  const matchesOption =
    searchOption === "All" ||
    fund.schemeName.includes(searchOption);

  return (
    matchesSearch &&
    matchesCategory &&
    matchesPlan &&
    matchesOption
  );
});


  filtered.sort((a, b) =>
    calculateScore(b.schemeName, query) -
    calculateScore(a.schemeName, query)
  );

  setSearchResults(filtered.slice(0, MAX_RESULTS_TO_SHOW));


}
async function addFund(schemeCode) {
  try{
    setAddingFund(true);

  const response = await fetch(
    `https://api.mfapi.in/mf/${schemeCode}`
  );

  const fund = await response.json();

  const newFund = {
    name: fund.meta.scheme_name,
    category: fund.meta.scheme_category,
    risk: getRisk(fund.meta.scheme_category),
    returns1Y: calculateReturn(fund.data)
  };
  const alreadyExists = funds.some(
    (f) => f.name === newFund.name
  );

  if (alreadyExists) {
    return;
  }
  setFunds((prevFunds) => [
  ...prevFunds,
  newFund
]);
  setSearchResults([]);
setApiSearch("");
  }catch (error) {
    alert("Failed to add fund. Please try again.");
  }
  finally {
    setAddingFund(false);
  }
}

  const filteredFunds = funds.filter((fund) => {


let categoryMatch;
if (selectedCategory === "All") {
  categoryMatch = true;
}
else if (selectedCategory === "Other") {
  categoryMatch = true;
  for (let category of knownCategories) {
    if (fund.category.includes(category)) {
      categoryMatch = false;
      break;
    }
  }
}
else {
  categoryMatch =
    fund.category.includes(selectedCategory);
}

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
      return parseFloat(b.returns1Y) - parseFloat(a.returns1Y);
    }

    return parseFloat(a.returns1Y) - parseFloat(b.returns1Y);

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
if (error) {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "100px"
      }}
    >
      <h1>{error}</h1>
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
      <div
  style={{
     border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "20px",
    marginBottom: "30px",
    width: "500px",
    marginLeft: "auto",
    marginRight: "auto",
   backgroundColor: "#0f0f0fff"
  }}
>

<h2>Add Mutual Fund</h2>

      <input
  type="text"
  style={selectStyle}
  placeholder="Type to search funds..."
  value={apiSearch}
  onChange={(e) => {
    const value = e.target.value;

    setApiSearch(value);

    searchFunds(value);

  }
  }/>

<br />

<select
  style={selectStyle}
  value={searchCategory}
  onChange={(e) => setSearchCategory(e.target.value)}
>
  <option value="All">All Categories</option>
  <option value="Flexi Cap">Flexi Cap</option>
  <option value="Liquid">Liquid</option>
  <option value="Hybrid">Hybrid</option>
  <option value="Index">Index</option>
  <option value="ETF">ETF</option>
  <option value="Sectoral">Sectoral</option>
</select>

<br />

<select
  style={selectStyle}
  value={searchPlan}
  onChange={(e) => setSearchPlan(e.target.value)}
>
  <option value="All">All Plans</option>
  <option value="Direct">Direct</option>
  <option value="Regular">Regular</option>
</select>

<br />

<select
  style={selectStyle}
  value={searchOption}
  onChange={(e) => setSearchOption(e.target.value)}
>
  <option value="All">All Options</option>
  <option value="Growth">Growth</option>
  <option value="IDCW">IDCW</option>
</select>

{
  apiSearch.trim() !== "" &&
  searchResults.length === 0 && (
    <p><b>No matching funds found.</b></p>
  )
}
<br />
<button
  style={{...buttonStyle,backgroundColor:"#000000ff"}}
  onClick={() => {
    setSearchCategory("All");
    setSearchPlan("All");
    setSearchOption("All");
  }}
>
  Reset Search Filters
</button>

<br />

  {
  addingFund && (
    <p>Adding Fund...</p>
  )
}

{
  searchResults.length > 0 && (
    <h3>Search Results</h3>
  )
}
{
  searchResults.map((fund) => (
    <div
key={fund.schemeCode}
  onClick={() =>
    addFund(fund.schemeCode)
  }
  style={{
     border: "1px solid #ccc",
    padding: "10px",
    marginBottom: "5px",
    marginLeft: "auto",
    marginRight: "auto",
    width: "600px",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#000000ff",
    color: "white",
  }}
>
  ➕ {fund.schemeName}
</div>
  ))
}

<br />
</div>
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
<br />
<br />
<input
  type="text"
  placeholder="Filter current funds..."
    style={selectStyle}
  value={searchTerm}
  onChange={(e) =>

  setSearchTerm(e.target.value)
}

/>
<CompareFunds
  selectedFund1={selectedFund1}
  selectedFund2={selectedFund2}
/>
      {
  filteredFunds.map((fund) => (
    <FundCard
    key={fund.name}
    fund={fund}
    removeFund={removeFund}/>
  ))
}

    </div>
  );
}

export default App;