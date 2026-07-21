# Requirements Document

## Introduction

This document specifies the requirements for adding a News Tab feature to the Mutual Fund Analyzer application. The News Tab will display relevant mutual fund news articles to help users stay informed about market trends, fund performance, and investment insights.

## Glossary

- **News_Tab**: A new navigation page in the application dedicated to displaying news articles
- **Navbar**: The navigation component that provides links to different pages in the application
- **News_Article**: A news item containing a title, description, source, publication date, and link to the full article
- **News_Feed**: The collection of news articles displayed on the News Tab
- **News_API**: An external service that provides news articles related to mutual funds and investments
- **News_Card**: A UI component that displays a single news article with its metadata
- **Loading_State**: The visual state shown while news articles are being fetched from the API
- **Error_State**: The visual state shown when news articles fail to load
- **Empty_State**: The visual state shown when no news articles are available

## Requirements

### Requirement 1: News Tab Navigation

**User Story:** As a user, I want to access the news section from the navigation bar, so that I can quickly view mutual fund related news.

#### Acceptance Criteria

1. THE Navbar SHALL include a "News" navigation link
2. WHEN the user clicks the "News" link, THE Application SHALL navigate to the "/news" route
3. WHEN the user is on the News Tab, THE Navbar SHALL highlight the "News" link as active
4. THE News_Tab SHALL be positioned in the Navbar after the "Calculator" link

### Requirement 2: News Feed Display

**User Story:** As a user, I want to see a list of mutual fund related news articles, so that I can stay informed about market trends.

#### Acceptance Criteria

1. WHEN the News Tab loads, THE News_Feed SHALL display news articles in a grid or list layout
2. THE News_Card SHALL display the article title, description, source, publication date, and thumbnail image
3. THE News_Feed SHALL display articles in reverse chronological order (newest first)
4. THE News_Card SHALL be clickable and open the full article in a new browser tab
5. THE News_Feed SHALL display a minimum of 10 articles when available

### Requirement 3: News Data Fetching

**User Story:** As a user, I want news articles to be automatically loaded when I visit the News Tab, so that I can immediately see current information.

#### Acceptance Criteria

1. WHEN the News Tab component mounts, THE Application SHALL fetch news articles from the News_API
2. THE Application SHALL request news articles with keywords related to "mutual funds", "investment", or "stock market"
3. WHEN the News_API returns articles, THE Application SHALL store them in component state
4. IF the News_API request fails, THEN THE Application SHALL retry the request once after 2 seconds
5. THE Application SHALL fetch news articles only when the News Tab is visited, not on application startup

### Requirement 4: Loading State

**User Story:** As a user, I want to see a loading indicator while news is being fetched, so that I know the application is working.

#### Acceptance Criteria

1. WHILE news articles are being fetched, THE News_Tab SHALL display a Loading_State
2. THE Loading_State SHALL include a spinner or loading animation
3. THE Loading_State SHALL include text indicating "Loading news articles..."
4. WHEN news articles are successfully loaded, THE News_Tab SHALL replace the Loading_State with the News_Feed

### Requirement 5: Error Handling

**User Story:** As a user, I want to see a clear error message if news fails to load, so that I understand what went wrong.

#### Acceptance Criteria

1. IF the News_API request fails after retry attempts, THEN THE News_Tab SHALL display an Error_State
2. THE Error_State SHALL include a user-friendly error message explaining that news could not be loaded
3. THE Error_State SHALL include a "Retry" button that allows the user to manually trigger another fetch attempt
4. WHEN the user clicks the "Retry" button, THE Application SHALL attempt to fetch news articles again

### Requirement 6: Empty State

**User Story:** As a user, I want to see a message when no news articles are available, so that I know the page is working but there is no content.

#### Acceptance Criteria

1. WHEN the News_API returns zero articles, THE News_Tab SHALL display an Empty_State
2. THE Empty_State SHALL include a message indicating "No news articles available at this time"
3. THE Empty_State SHALL maintain consistent styling with the rest of the application

### Requirement 7: Responsive Design

**User Story:** As a user, I want the news page to work well on different screen sizes, so that I can read news on any device.

#### Acceptance Criteria

1. THE News_Feed SHALL display articles in a responsive grid layout that adapts to screen width
2. WHEN the screen width is less than 768 pixels, THE News_Feed SHALL display one article per row
3. WHEN the screen width is between 768 and 1024 pixels, THE News_Feed SHALL display two articles per row
4. WHEN the screen width is greater than 1024 pixels, THE News_Feed SHALL display three articles per row
5. THE News_Card SHALL resize appropriately to maintain readability on all screen sizes

### Requirement 8: News Card Styling

**User Story:** As a user, I want news cards to be visually appealing and consistent with the application design, so that the news section feels integrated.

#### Acceptance Criteria

1. THE News_Card SHALL use consistent color scheme with the existing application design
2. THE News_Card SHALL include hover effects to indicate interactivity
3. THE News_Card SHALL display the article thumbnail image at the top, followed by title, description, source, and date
4. THE News_Card SHALL truncate long titles to a maximum of 2 lines
5. THE News_Card SHALL truncate long descriptions to a maximum of 3 lines
6. THE News_Card SHALL display the publication date in a human-readable format (e.g., "2 hours ago", "Yesterday", "Mar 15, 2024")

### Requirement 9: External Link Handling

**User Story:** As a user, I want to open full news articles in a new tab, so that I don't lose my place in the application.

#### Acceptance Criteria

1. WHEN the user clicks on a News_Card, THE Application SHALL open the article URL in a new browser tab
2. THE Application SHALL use `target="_blank"` and `rel="noopener noreferrer"` for security when opening external links
3. THE Application SHALL maintain the user's position on the News Tab after opening an external link

### Requirement 10: News API Integration

**User Story:** As a developer, I want to integrate with a news API service, so that the application can fetch real-time news data.

#### Acceptance Criteria

1. THE Application SHALL use a news API service (such as NewsAPI, GNews API, or similar) to fetch articles
2. THE Application SHALL store the API key securely (in environment variables, not hardcoded)
3. THE Application SHALL include the API key in request headers as required by the chosen news service
4. THE Application SHALL handle API rate limiting by displaying appropriate messages to users
5. THE Application SHALL parse the API response and extract title, description, source, publication date, URL, and image URL for each article
