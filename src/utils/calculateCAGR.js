function calculateCAGR(data, years) {

    const days =
        Math.min(
            years * 250,
            data.length - 1
        );

    const actualYears =
        days / 250;

    const currentNAV =
        parseFloat(data[0].nav);

    const oldNAV =
        parseFloat(data[days].nav);

    const cagr =
        (
            Math.pow(
                currentNAV / oldNAV,
                1 / actualYears
            ) - 1
        ) * 100;

    return cagr.toFixed(2);
}

export default calculateCAGR;