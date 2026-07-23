import { NavLink } from "react-router-dom";
import { useState } from "react";
import { FaArrowTrendUp } from "react-icons/fa6";
import SearchModal from "./SearchModal";
import {
    navbarStyle,
    logoStyle,
    linksContainer,
    linkStyle,
    activeLinkStyle
} from "../styles/navbarStyles";

function Navbar({

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

const [showSearch, setShowSearch] = useState(false);

    return (

        <>

        <div style={navbarStyle}>

   <NavLink
    to="/"
    style={{
        textDecoration: "none"
    }}
>
    <div
        style={{
            ...logoStyle,
            display: "flex",
            alignItems: "center",
            gap: "10px"
        }}
    >
        <FaArrowTrendUp
            size={30}
            color="#00C853"
        />

        <span
            style={{
                color: "white",
                fontWeight: "700"
            }}
        > 
            Investo
        </span>
    </div>
</NavLink>

            <div style={linksContainer}>

                <NavLink
                    to="/" 
                    style={({ isActive }) => ({
                        ...linkStyle,
                        ...(isActive
                            ? activeLinkStyle
                            : {})
                    })}
                >
                    Home
                </NavLink>

                <NavLink
                    to="/portfolio"
                    style={({ isActive }) => ({
                        ...linkStyle,
                        ...(isActive
                            ? activeLinkStyle
                            : {})
                    })}
                >
                    Portfolio
                </NavLink>

                <NavLink
                    to="/compare"
                    style={({ isActive }) => ({
                        ...linkStyle,
                        ...(isActive
                            ? activeLinkStyle
                            : {})
                    })}
                >
                    Compare
                </NavLink>

                <NavLink
                    to="/calculator"
                    style={({ isActive }) => ({
                        ...linkStyle,
                        ...(isActive
                            ? activeLinkStyle
                            : {})
                    })}
                >
                    Calculator
                </NavLink>

                <NavLink
                to="/news"
                style={({ isActive }) => ({
                    ...linkStyle,
                    ...(isActive
                        ? activeLinkStyle
                        : {})
                })}
            >
                News
            </NavLink>

            </div>

            <div
                onClick={() => setShowSearch(true)}
                style={{
                    background: "#111827",
                    border: "1px solid #333",
                    borderRadius: "999px",
        padding: "10px 18px",
        cursor: "pointer",
        color: "#9CA3AF",
        display: "flex",
        alignItems: "center",
        gap: "8px"
    }}
>
    🔍 Search
</div>

        </div>

        {
            showSearch &&
            <SearchModal
    setShowSearch={setShowSearch}

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
        }

        </>

    );
}

export default Navbar;