import { useState , useEffect} from "react";
import FundCard from "./Components/FundCard";
import CompareFunds from "./Components/CompareFunds";

import { categories, sortOptions } from "./data/constants";
import { buttonStyle, selectStyle } from "./styles/styles";

import { getRisk } from "./utils/getRisk";
import { calculateReturn } from "./utils/calculateReturn";
import { calculateScore } from "./utils/calculateScore";
import {getFunds,getAllSchemes} from "./services/fundService";
import SearchSection from "./Components/SearchSection";
import PortfolioControls from "./Components/PortfolioControls";
import SIPCalculator from "./Components/SIPCalculator";
import CompareSelector from "./Components/CompareSelector";

// import SIPPieChart from "./Components/SIPPieChart";
import ChartPopup from "./Components/ChartPopup";
import NAVChart from "./Components/NAVChart";
import CompareChart from "./Components/CompareChart";

import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Compare from "./pages/Compare";
import Calculator from "./pages/Calculator";

import Navbar from "./Components/Navbar";

// import TestAPI from "./TestAPI";
// import RealFundsAPI from "./RealFundsAPI";
const MAX_RESULTS_TO_SHOW = 20;

function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [sortOrder, setSortOrder] = useState("high");
  const [searchTerm, setSearchTerm] = useState("");
  const [fund1, setFund1] = useState("");
  const [fund2, setFund2] = useState("");

  const [allSchemes, setAllSchemes] = useState([]);
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

const [selectedFund, setSelectedFund] = useState(null);//for popup
const [showCompareChart, setShowCompareChart] = useState(false);

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
  console.log(fund.data);
  const newFund = {
    name: fund.meta.scheme_name,
    category: fund.meta.scheme_category,
    risk: getRisk(fund.meta.scheme_category),
    returns1Y: calculateReturn(fund.data),
    historicalData: fund.data
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
    <>
    <Navbar />

    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calculator" element={<Calculator funds={funds}/>} />
        <Route path="/compare" element={<Compare funds={funds}

            fund1={fund1}
            setFund1={setFund1}

            fund2={fund2}
            setFund2={setFund2}

            selectedFund1={selectedFund1}
            selectedFund2={selectedFund2}

            showCompareChart={showCompareChart}
            setShowCompareChart={setShowCompareChart}

            selectStyle={selectStyle}/>} />
        <Route
    path="/portfolio"
    element={
        <Portfolio
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
            filteredFunds={filteredFunds}
            selectedFund={selectedFund}
            setSelectedFund={setSelectedFund}
            removeFund={removeFund}
        />

    }
/>
    </Routes>
    </>
  );

//     <div

//     style={{
//       border: "5px solid black",
//       margin: "25px",
//     padding: "40px",
//     fontFamily: "Arial"
//   }}
//     >
//       <h1>Mutual Fund Analyzer</h1>
//       <SearchSection
//     apiSearch={apiSearch}
//     setApiSearch={setApiSearch}
//     searchFunds={searchFunds}

//     searchCategory={searchCategory}
//     setSearchCategory={setSearchCategory}

//     searchPlan={searchPlan}
//     setSearchPlan={setSearchPlan}

//     searchOption={searchOption}
//     setSearchOption={setSearchOption}

//     searchResults={searchResults}

//     addingFund={addingFund}

//     addFund={addFund}

//     buttonStyle={buttonStyle}
//     selectStyle={selectStyle}
// />



// <CompareSelector
//     funds={funds}

//     fund1={fund1}
//     setFund1={setFund1}

//     fund2={fund2}
//     setFund2={setFund2}

//     selectStyle={selectStyle}
// />

// <CompareFunds
//   selectedFund1={selectedFund1}
//   selectedFund2={selectedFund2}
//   openCompareChart={() => setShowCompareChart(true)}
// />

// <SIPCalculator funds={funds} />
// <br />

// <PortfolioControls
//   categories={categories}
//   selectedCategory={selectedCategory}
//   setSelectedCategory={setSelectedCategory}
//   sortOptions={sortOptions}
//   sortOrder={sortOrder}
//   setSortOrder={setSortOrder}
//   buttonStyle={buttonStyle}
//   selectStyle={selectStyle}
//   searchTerm={searchTerm}
//   setSearchTerm={setSearchTerm}
// />




//       {
//   filteredFunds.map((fund) => (
//     <FundCard
//     key={fund.name}
//     fund={fund}
//     removeFund={removeFund}
//       openChart={setSelectedFund}
// />
//   ))
// }

// <ChartPopup
//   isOpen={selectedFund !== null}
//   title={selectedFund?.name}
//   onClose={() => setSelectedFund(null)}
// >

//   {selectedFund && (
//     <NAVChart
//       historicalData={selectedFund.historicalData}//children parameter
//     />
//   )}

// </ChartPopup>

// <ChartPopup
//     isOpen={showCompareChart}
//     title="Fund Comparison"
//     onClose={() => setShowCompareChart(false)}
// >

//     <CompareChart
//     fund1={selectedFund1}
//     fund2={selectedFund2}
// />

// </ChartPopup>
//     </div>
//   );
}

export default App;