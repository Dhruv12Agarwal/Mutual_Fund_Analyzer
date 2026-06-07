import { useState, useEffect } from "react";

function RealFundsAPI() {

  const [funds, setFunds] = useState([]);

  function getRisk(category) {

  if (category.includes("Small Cap")) {
    return "High";
  }

  if (
    category.includes("Mid Cap") ||
    category.includes("Value")
  ) {
    return "Medium";
  }

  return "Low";

}

  function calculateReturn(navData) {

  if (navData.length <= 250) {
    return "N/A";
  }

  const currentNAV =
    parseFloat(navData[0].nav);

  const oldNAV =
    parseFloat(navData[250].nav);

  const returns =
    ((currentNAV - oldNAV) / oldNAV) * 100;

  return returns.toFixed(2);

}

  async function getFunds() {

  const schemeCodes = [
    149166,
    149167,
    149168
  ];

  const fundResponses = await Promise.all(

    schemeCodes.map(async (code) => {

      const response = await fetch(
        `https://api.mfapi.in/mf/${code}`
      );

      return await response.json();

    })

  );
  const transformedFunds = fundResponses.map((fund) => ({

  name: fund.meta.scheme_name,

  category: fund.meta.scheme_category,

  risk: getRisk(
    fund.meta.scheme_category
  ),

  returns1Y: calculateReturn(
    fund.data
  )

}));

  setFunds(transformedFunds);
}

  useEffect(() => {
    getFunds();
  }, []);

  return (
  <div>
    <h1>Mutual Funds</h1>

    {
      funds.map((fund) => (
        <div key={fund.name}>
          <h3>{fund.name}</h3>

          <p>
            Category: {fund.category}
          </p>

          <p>
            Risk: {fund.risk}
          </p>

          <p>
            1Y Return: {fund.returns1Y}%
          </p>

          <hr />
        </div>
      ))
    }

  </div>
);
}

export default RealFundsAPI;