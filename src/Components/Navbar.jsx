import { Link } from "react-router-dom";

function Navbar() {
    return (
        <div
            style={{
                display: "flex",
                gap: "20px",
                marginBottom: "30px"
            }}
        >
            <Link to="/">Home</Link>

            <Link to="/portfolio">
                Portfolio
            </Link>

            <Link to="/compare">
                Compare
            </Link>

            <Link to="/calculator">
                Calculator
            </Link>
        </div>
    );
}

export default Navbar;