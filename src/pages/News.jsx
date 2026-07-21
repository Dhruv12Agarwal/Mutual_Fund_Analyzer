import { useState, useEffect } from "react";
import { FaNewspaper } from "react-icons/fa";
import { fetchMutualFundNews } from "../services/newsService";
import NewsCard from "../Components/NewsCard";
import {
  newsPageContainer,
  newsPageTitle,
  newsPageSubtitle,
  newsGrid,
  loadingContainer,
  loadingText,
  errorContainer,
  errorText,
  retryButton,
  retryButtonHover,
  emptyContainer,
  emptyText
} from "../styles/newsStyles";

function News() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryButtonHovered, setRetryButtonHovered] = useState(false);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);
      const newsArticles = await fetchMutualFundNews();
      setArticles(newsArticles);
    } catch (err) {
      console.error("Failed to fetch news:", err);
      setError(err.message || "Failed to load news articles. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleRetry = () => {
    fetchNews();
  };

  if (loading) {
    return (
      <div style={newsPageContainer}>
        <h1 style={newsPageTitle}>Market News</h1>
        <p style={newsPageSubtitle}>
          Stay updated with the latest mutual fund and investment news
        </p>
        
        <div style={loadingContainer}>
          <FaNewspaper size={60} color="#00C853" className="spin" />
          <p style={loadingText}>Loading news articles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={newsPageContainer}>
        <h1 style={newsPageTitle}>Market News</h1>
        <p style={newsPageSubtitle}>
          Stay updated with the latest mutual fund and investment news
        </p>
        
        <div style={errorContainer}>
          <p style={errorText}>{error}</p>
          <button
            style={{
              ...retryButton,
              ...(retryButtonHovered ? retryButtonHover : {})
            }}
            onMouseEnter={() => setRetryButtonHovered(true)}
            onMouseLeave={() => setRetryButtonHovered(false)}
            onClick={handleRetry}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div style={newsPageContainer}>
        <h1 style={newsPageTitle}>Market News</h1>
        <p style={newsPageSubtitle}>
          Stay updated with the latest mutual fund and investment news
        </p>
        
        <div style={emptyContainer}>
          <FaNewspaper size={60} color="#4B5563" />
          <p style={emptyText}>No news articles available at this time</p>
        </div>
      </div>
    );
  }

  return (
    <div style={newsPageContainer}>
      <h1 style={newsPageTitle}>Market News</h1>
      <p style={newsPageSubtitle}>
        Stay updated with the latest mutual fund and investment news
      </p>
      
      <div style={newsGrid}>
        {articles.map((article, index) => (
          <NewsCard key={index} article={article} />
        ))}
      </div>
    </div>
  );
}

export default News;
