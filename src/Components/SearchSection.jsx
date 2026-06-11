function SearchSection({
  apiSearch,
  setApiSearch,
  searchFunds
}) {
  return (
    <div>

      <h2>Add Mutual Fund</h2>

      <input
        type="text"
        placeholder="Type to search funds..."
        value={apiSearch}
        onChange={(e) => {
          const value = e.target.value;

          setApiSearch(value);

          searchFunds(value);
        }}
      />

    </div>
  );
}

export default SearchSection;