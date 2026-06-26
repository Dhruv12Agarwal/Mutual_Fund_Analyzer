import SIPCalculator from "../Components/SIPCalculator";

function Calculator({ funds }) {
    return (
        <div>
        <h1>Calculator Page</h1>
        <SIPCalculator funds={funds} />
        </div>
    );
}

export default Calculator;