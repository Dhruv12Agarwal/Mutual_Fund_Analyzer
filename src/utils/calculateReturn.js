export function calculateReturn(navData) {

  if (navData.length <= 250) {
    return "N/A";
  }

  const currentNAV = parseFloat(navData[0].nav);
  const oldNAV = parseFloat(navData[250].nav);

  const returns =
    ((currentNAV - oldNAV) / oldNAV) * 100;

  return returns.toFixed(2);
}