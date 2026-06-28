import { NavLink } from "react-router-dom";

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

            <div style={logoStyle}>
                ↗ Investo
            </div>

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