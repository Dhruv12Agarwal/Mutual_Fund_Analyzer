import { getRisk } from "../utils/getRisk";
import { calculateReturn } from "../utils/calculateReturn";

export async function getAllSchemes() {
  const response = await fetch(
    "https://api.mfapi.in/mf"
  );

  const data = await response.json();

  const uniqueSchemes = [
    ...new Map(
      data.map(fund => [fund.schemeCode, fund])
    ).values()
  ];

  return uniqueSchemes;
}

export async function getFunds() {

  const schemeCodes = [
    149166,
    149094,
    122639,
    148651,
    148958,
    148490,
    149107,
    147794,
    148457,
    149156
  ];

  const fundResponses = await Promise.all(
    schemeCodes.map(async (code) => {

      const response = await fetch(
        `https://api.mfapi.in/mf/${code}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch fund");
      }

      return await response.json();
    })
  );

  const transformedFunds = fundResponses.map((fund) => ({
    name: fund.meta.scheme_name,
    category: fund.meta.scheme_category,
    risk: getRisk(fund.meta.scheme_category),
    returns1Y: calculateReturn(fund.data)
  }));

  return transformedFunds;
}