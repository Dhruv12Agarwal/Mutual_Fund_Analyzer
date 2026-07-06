function calculatePeriodReturn(data, days) {
  const index = Math.min(days, data.length - 1);

  const currentNAV = parseFloat(data[0].nav);
  const oldNAV = parseFloat(data[index].nav);

  return (
    ((currentNAV - oldNAV) / oldNAV) * 100
  ).toFixed(2);
}

export default calculatePeriodReturn;