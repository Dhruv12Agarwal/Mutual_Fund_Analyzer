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
    <div
      style={{
        width: "100%",
        padding: "20px"
      }}
    >
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "20px",
          padding: "30px 20px",
          marginBottom: "30px",
          width: "100%",
          maxWidth: "600px",
          margin: "0 auto 30px",
          backgroundColor: "#0f0f0f",
          boxShadow: "0 8px 25px rgba(0,0,0,0.35)"
        }}
      >
        <input
          type="text"
          style={{
            ...selectStyle,
            width: "100%",
            maxWidth: "100%"
          }}
          placeholder="Type to search funds..."
          value={apiSearch}
          onChange={(e) => {
            const value = e.target.value;
            setApiSearch(value);
            searchFunds(value);
          }}
        />

        <br />

        <select
          style={{
            ...selectStyle,
            width: "100%",
            maxWidth: "100%"
          }}
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
          style={{
            ...selectStyle,
            width: "100%",
            maxWidth: "100%"
          }}
          value={searchPlan}
          onChange={(e) => setSearchPlan(e.target.value)}
        >
          <option value="All">All Plans</option>
          <option value="Direct">Direct</option>
          <option value="Regular">Regular</option>
        </select>

        <br />

        <select
          style={{
            ...selectStyle,
            width: "100%",
            maxWidth: "100%"
          }}
          value={searchOption}
          onChange={(e) => setSearchOption(e.target.value)}
        >
          <option value="All">All Options</option>
          <option value="Growth">Growth</option>
          <option value="IDCW">IDCW</option>
        </select>
        {apiSearch.trim() !== "" && searchResults.length === 0 && (
          <p>
            <b>No matching funds found.</b>
          </p>
        )}
        <br />
        <button
          style={{ ...buttonStyle, backgroundColor: "#000000ff", width: "100%", maxWidth: "100%" }}
          onClick={() => {
            setSearchCategory("All");
            setSearchPlan("All");
            setSearchOption("All");
          }}
        >
          Clear Filters
        </button>

        <br />
        {addingFund && <p>Adding Fund...</p>}
        {searchResults.length > 0 && <h3>Search Results</h3>}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "600px",
          margin: "0 auto",
          padding: "0 20px"
        }}
      >
        {searchResults.map((fund) => (
          <div
            key={fund.schemeCode}
            onClick={() => navigate(`/fund/${fund.schemeCode}`)}
            style={{
              border: "1px solid #ccc",
              padding: "12px 15px",
              borderRadius: "8px",
              cursor: "pointer",
              backgroundColor: "#000000ff",
              color: "white",
              wordWrap: "break-word",
              wordBreak: "break-word",
              overflow: "hidden",
              textAlign: "left",
              transition: "all 0.2s ease",
              fontSize: "14px"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#1a1a1a";
              e.currentTarget.style.borderColor = "#00C853";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#000000ff";
              e.currentTarget.style.borderColor = "#ccc";
            }}
          >
            ➕ {fund.schemeName}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchSection;