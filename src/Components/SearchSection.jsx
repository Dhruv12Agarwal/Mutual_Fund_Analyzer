import { useNavigate } from "react-router-dom";

function SearchSection({
  apiSearch,
  setApiSearch,
  searchFunds,
  searchCategory,
  setSearchCategory,

  searchPlan,
  setSearchPlan,

  searchOption,
  setSearchOption,

  searchResults,

  addingFund,

  addFund,

  buttonStyle,
  selectStyle
}) {

  const navigate = useNavigate();

  return (
    <div>


           <div
  style={{
     border: "1px solid #ccc",
    borderRadius: "20px",
    padding: "30px",
    marginBottom: "30px",
    width: "500px",
    marginLeft: "auto",
    marginRight: "auto",
   backgroundColor: "#0f0f0fff",
   boxShadow:"0 8px 25px rgba(0,0,0,0.35)"
  }}
>

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
  Clear Filters
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
     navigate(
        `/fund/${fund.schemeCode}`
    )
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


    </div>
  );
}

export default SearchSection;