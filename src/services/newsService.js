export async function getMutualFundNews() {

    const response = await fetch(
        `https://api.marketaux.com/v1/news/all?api_token=${import.meta.env.VITE_NEWS_API_KEY}&countries=in&keywords=mutual fund`
    );

    const data = await response.json();

    return data.data;
}

export async function getStockNews() {

    const response = await fetch(
        `https://api.marketaux.com/v1/news/all?api_token=${import.meta.env.VITE_NEWS_API_KEY}&countries=in&keywords=stock market`
    );

    const data = await response.json();

    return data.data;
}

export async function getBusinessNews() {

    const response = await fetch(
        `https://api.marketaux.com/v1/news/all?api_token=${import.meta.env.VITE_NEWS_API_KEY}&countries=in&keywords=business`
    );

    const data = await response.json();

    return data.data;
}