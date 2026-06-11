function PortfolioControls({
  categories,
  selectedCategory,
  setSelectedCategory,
  sortOptions,
  sortOrder,
  setSortOrder,
  buttonStyle,
  selectStyle,
  searchTerm,
  setSearchTerm
}) {
  return (
    <>
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
            onClick={() => setSelectedCategory(category)}
          >
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
            onClick={() => setSortOrder(option.value)}
          >
            {option.label}
          </button>
        ))
      }

      <br /><br />

      <input
        type="text"
        placeholder="Filter current funds..."
        style={selectStyle}
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(e.target.value)
        }
      />
    </>
  );
}

export default PortfolioControls;