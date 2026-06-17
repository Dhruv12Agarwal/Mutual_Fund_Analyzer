import { useState , useEffect} from "react";
import FundCard from "./Components/FundCard";
import CompareFunds from "./Components/CompareFunds";

import { categories, sortOptions } from "./data/constants";

import { getRisk } from "./utils/getRisk";
import { calculateReturn } from "./utils/calculateReturn";
import { calculateScore } from "./utils/calculateScore";
import {getFunds,getAllSchemes} from "./services/fundService";
import PortfolioControls from "./Components/PortfolioControls";
import SIPCalculator from "./Components/SIPCalculator";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Compare from "./pages/Compare";
import Calculator from "./pages/Calculator";

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

  async function loadFunds() {
  try {

    const transformedFunds = await getFunds();

    setFunds(transformedFunds);

  } catch (error) {

    setError(
      "Failed to load funds. Please try again."
    );

  } finally {

    setLoading(false);
  }
}

async function loadAllSchemes() {
  try {
    const uniqueSchemes = await getAllSchemes();

    setAllSchemes(uniqueSchemes);
  }
  catch (error) {
    console.log(error);
  }
}

useEffect(() => {
  loadFunds();
  loadAllSchemes();
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
    calculateScore(b.schemeName, query) -calculateScore(a.schemeName, query)
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

//     <BrowserRouter>

//     <Routes>

//       <Route path="/" element={<Home />} />

//       <Route path="/portfolio" element={<Portfolio />} />

//       <Route path="/compare" element={<Compare />} />

//       <Route path="/calculator" element={<Calculator />} />

//     </Routes>

//   </BrowserRouter>
// );

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
<SIPCalculator funds={funds} />
<br />

<PortfolioControls
  categories={categories}
  selectedCategory={selectedCategory}
  setSelectedCategory={setSelectedCategory}
  sortOptions={sortOptions}
  sortOrder={sortOrder}
  setSortOrder={setSortOrder}
  buttonStyle={buttonStyle}
  selectStyle={selectStyle}
  searchTerm={searchTerm}
  setSearchTerm={setSearchTerm}
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