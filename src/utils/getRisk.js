export function getRisk(category) {

  if (
    category.includes("Flexi Cap") ||
    category.includes("Sectoral") ||
    category.includes("Thematic")
  ) {
    return "High";
  }

  if (
    category.includes("Liquid") ||
    category.includes("Money Market") ||
    category.includes("Overnight")
  ) {
    return "Low";
  }

  return "Medium";
}