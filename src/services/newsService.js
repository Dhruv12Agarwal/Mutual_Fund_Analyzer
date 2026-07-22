// News API service for fetching mutual fund related news
// Using NewsAPI.org - https://newsapi.org/
// Get your free API key at: https://newsapi.org/register

export async function fetchMutualFundNews() {
  const apiKey = import.meta.env.VITE_NEWS_API_KEY;
  
  if (!apiKey) {
    throw new Error('API key not configured. Please set VITE_NEWS_API_KEY in your .env file.');
  }
  
  return await fetchFromNewsAPI(apiKey);
}

async function fetchFromNewsAPI(apiKey) {
  // NewsAPI.org free tier limitations:
  // - /v2/everything requires paid plan for country filtering
  // - Use /v2/top-headlines instead with country=in for free tier
  
  const sortBy = 'publishedAt';
  const language = 'en';
  const pageSize = 20;
  const country = 'in'; // India
  const category = 'business'; // Business news includes mutual funds
  
  // Using top-headlines endpoint (works with free tier)
  const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&pageSize=${pageSize}&apiKey=${apiKey}`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Invalid API key. Please check your VITE_NEWS_API_KEY in the .env file.');
    }
    if (response.status === 429) {
      throw new Error('API rate limit exceeded. Please try again later.');
    }
    if (response.status === 426) {
      throw new Error('Your NewsAPI plan does not support this request. Please upgrade your plan.');
    }
    throw new Error(`Failed to fetch news: ${response.statusText}`);
  }
  
  const data = await response.json();
  
  // Check for API-level errors
  if (data.status === 'error') {
    throw new Error(data.message || 'News API returned an error');
  }
  
  if (!data.articles || data.articles.length === 0) {
    throw new Error('No India-specific business news found. Please try again later.');
  }
  
  return transformNewsResponse(data);
}

export function transformNewsResponse(apiResponse) {
  // Transform NewsAPI.org response to our application format
  if (!apiResponse || !apiResponse.articles) {
    return [];
  }
  
  return apiResponse.articles.map(article => ({
    title: article.title || 'No title available',
    description: article.description || article.content || 'No description available.',
    source: article.source?.name || 'Unknown Source',
    publishedAt: article.publishedAt || new Date().toISOString(),
    url: article.url || '#',
    imageUrl: article.urlToImage || null
  }));
}
