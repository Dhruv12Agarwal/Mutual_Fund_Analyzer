import { useState } from "react";
import { formatRelativeTime } from "../utils/formatDate";
import {
  newsCard,
  newsCardHover,
  newsCardImage,
  newsCardContent,
  newsCardTitle,
  newsCardDescription,
  newsCardMeta,
  newsCardSource
} from "../styles/newsStyles";

function NewsCard({ article }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleClick = () => {
    window.open(article.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      style={{
        ...newsCard,
        ...(isHovered ? newsCardHover : {})
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {article.imageUrl && !imageError ? (
        <img
          src={article.imageUrl}
          alt={article.title}
          style={newsCardImage}
          onError={() => setImageError(true)}
          loading="lazy"
        />
      ) : (
        <div
          style={{
            ...newsCardImage,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "48px",
            color: "#4B5563"
          }}
        >
          📰
        </div>
      )}
      
      <div style={newsCardContent}>
        <h3 style={newsCardTitle}>
          {article.title}
        </h3>
        
        <p style={newsCardDescription}>
          {article.description}
        </p>
        
        <div style={newsCardMeta}>
          <span style={newsCardSource}>
            {article.source}
          </span>
          <span>
            {formatRelativeTime(article.publishedAt)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;
