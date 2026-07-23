export async function getNews() {

    const response = await fetch(
        `https://api.marketaux.com/v1/news/all?api_token=${import.meta.env.VITE_NEWS_API_KEY}&countries=in&limit=10`
    );

    const data = await response.json();

    return data.data;
}