export const newsPageContainer = {
  maxWidth: "1400px",
  margin: "0 auto",
  padding: "20px"
};

export const newsPageTitle = {
  fontSize: "48px",
  fontWeight: "700",
  marginBottom: "15px",
  textAlign: "center",
  color: "white"
};

export const newsPageSubtitle = {
  fontSize: "20px",
  color: "#9CA3AF",
  textAlign: "center",
  marginBottom: "50px"
};

export const newsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
  gap: "25px",
  marginTop: "30px"
};

export const newsCard = {
  background: "#111827",
  border: "1px solid #2B3444",
  borderRadius: "16px",
  overflow: "hidden",
  cursor: "pointer",
  transition: "all 0.3s ease",
  textDecoration: "none",
  color: "inherit",
  display: "flex",
  flexDirection: "column",
  height: "100%"
};

export const newsCardHover = {
  transform: "translateY(-4px)",
  boxShadow: "0 8px 24px rgba(0,200,83,0.15)",
  borderColor: "#00C853"
};

export const newsCardImage = {
  width: "100%",
  height: "200px",
  objectFit: "cover",
  backgroundColor: "#1F2937"
};

export const newsCardContent = {
  padding: "20px",
  flex: 1,
  display: "flex",
  flexDirection: "column"
};

export const newsCardTitle = {
  fontSize: "20px",
  fontWeight: "600",
  color: "white",
  marginBottom: "12px",
  lineHeight: "1.4",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis"
};

export const newsCardDescription = {
  fontSize: "15px",
  color: "#9CA3AF",
  marginBottom: "16px",
  lineHeight: "1.6",
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  flex: 1
};

export const newsCardMeta = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: "14px",
  color: "#6B7280",
  marginTop: "auto"
};

export const newsCardSource = {
  fontWeight: "600",
  color: "#00C853"
};

export const loadingContainer = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "400px",
  gap: "20px"
};

export const loadingText = {
  fontSize: "20px",
  color: "#9CA3AF"
};

export const errorContainer = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "400px",
  gap: "20px",
  padding: "40px"
};

export const errorText = {
  fontSize: "20px",
  color: "#EF4444",
  textAlign: "center",
  maxWidth: "600px"
};

export const retryButton = {
  padding: "12px 30px",
  backgroundColor: "#00C853",
  color: "#000",
  border: "none",
  borderRadius: "8px",
  fontSize: "16px",
  fontWeight: "600",
  cursor: "pointer",
  transition: "all 0.3s ease"
};

export const retryButtonHover = {
  backgroundColor: "#00A843",
  transform: "scale(1.05)"
};

export const emptyContainer = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "400px",
  gap: "20px"
};

export const emptyText = {
  fontSize: "20px",
  color: "#9CA3AF",
  textAlign: "center"
};

// Responsive styles via media queries (inline approach)
export const responsiveNewsGrid = (width) => {
  if (width < 768) {
    return {
      ...newsGrid,
      gridTemplateColumns: "1fr"
    };
  } else if (width < 1024) {
    return {
      ...newsGrid,
      gridTemplateColumns: "repeat(2, 1fr)"
    };
  }
  return {
    ...newsGrid,
    gridTemplateColumns: "repeat(3, 1fr)"
  };
};
