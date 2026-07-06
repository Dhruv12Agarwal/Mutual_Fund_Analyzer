import { NavLink } from "react-router-dom";

import { FaArrowTrendUp } from "react-icons/fa6";
import { FiTrendingUp } from "react-icons/fi";
import {
    navbarStyle,
    logoStyle,
    linksContainer,
    linkStyle,
    activeLinkStyle
} from "../styles/navbarStyles";

function Navbar() {
    return (
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

            </div>

        </div>
    );
}

export default Navbar;