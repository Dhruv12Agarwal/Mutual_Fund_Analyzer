import { useEffect } from "react";
import SearchSection from "./SearchSection";

function SearchModal({
    setShowSearch,

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

    useEffect(() => {

    const handleKeyDown = (e) => {

        if (e.key === "Escape") {
            setShowSearch(false);
        }
    };

    window.addEventListener(
        "keydown",
        handleKeyDown
    );

    return () => {
        window.removeEventListener(
            "keydown",
            handleKeyDown
        );
    };

}, []);

    return (
        <div
            onClick={() => setShowSearch(false)}

            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100vh",

                background:
                    "rgba(0,0,0,.65)",

                display: "flex",
                justifyContent: "center",
                alignItems: "center",

                zIndex: 1000
            }}
        >

            <div
    onClick={(e) => e.stopPropagation()}
    style={{
        width: "900px",
        minHeight: "600px",
        background: "#111827",
        borderRadius: "20px",
        padding: "40px"
    }}
>
    <div
    style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    }}
>
    <h1
        style={{
            margin: 0,
            whiteSpace: "nowrap"
        }}
    >
        Search Mutual Funds
    </h1>

    <button
        onClick={() => setShowSearch(false)}
        style={{
            background: "none",
            border: "none",
            color: "white",
            fontSize: "30px",
            cursor: "pointer"
        }}
    >
        ×
    </button>
</div>

<SearchSection
    apiSearch={apiSearch}
    setApiSearch={setApiSearch}
    searchFunds={searchFunds}

    searchCategory={searchCategory}
    setSearchCategory={setSearchCategory}

    searchPlan={searchPlan}
    setSearchPlan={setSearchPlan}

    searchOption={searchOption}
    setSearchOption={setSearchOption}

    searchResults={searchResults}

    addingFund={addingFund}
    addFund={addFund}

    buttonStyle={buttonStyle}
    selectStyle={selectStyle}
/>
</div>
 </div>
    );
}
export default SearchModal;