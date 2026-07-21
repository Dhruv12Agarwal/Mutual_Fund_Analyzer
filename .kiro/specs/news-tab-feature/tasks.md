# Implementation Plan: News Tab Feature

## Overview

This implementation plan breaks down the News Tab feature into discrete coding tasks. The feature adds a dedicated news section that fetches and displays mutual fund-related news articles from an external API. The implementation follows the existing project structure and patterns, using React functional components, React Router for navigation, and inline styles consistent with the current codebase.

## Tasks

- [ ] 1. Create utility functions and service layer
  - [ ] 1.1 Create date formatting utility
    - Create `src/utils/formatDate.js` with `formatRelativeTime` function
    - Implement logic to convert ISO 8601 dates to relative time format ("2 hours ago", "Yesterday", etc.)
    - Handle edge cases (current time, past dates, future dates)
    - _Requirements: 8.6_
  
  - [ ]* 1.2 Write unit tests for date formatting
    - Test various time ranges (minutes, hours, days, weeks)
    - Test edge cases and boundary conditions
    - _Requirements: 8.6_
  
  - [ ] 1.3 Create news service module
    - Create `src/services/newsService.js` with `fetchMutualFundNews` and `transformNewsResponse` functions
    - Implement API request logic with proper error handling
    - Implement response transformation to application format
    - Handle missing data (descriptions, images) with fallbacks
    - _Requirements: 3.1, 3.2, 3.3, 10.1, 10.3, 10.5_
  
  - [ ]* 1.4 Write unit tests for news service
    - Test API response transformation
    - Test error handling scenarios
    - Test data fallback logic
    - _Requirements: 10.5_

- [ ] 2. Create NewsCard component
  - [ ] 2.1 Create NewsCard component with props interface
    - Create `src/Components/NewsCard.jsx`
    - Implement component to receive article object as prop
    - Render article title, description, source, date, and image
    - Use `formatRelativeTime` utility for date display
    - _Requirements: 2.2, 2.4, 8.3, 8.6_
  
  - [ ] 2.2 Add styling and truncation to NewsCard
    - Create `src/styles/newsStyles.js` for inline styles
    - Implement CSS for title truncation (2 lines max)
    - Implement CSS for description truncation (3 lines max)
    - Add hover effects for interactivity
    - Match existing application color scheme and design patterns
    - _Requirements: 8.1, 8.2, 8.4, 8.5_
  
  - [ ] 2.3 Implement external link handling
    - Make entire card clickable
    - Open article URL in new tab with `target="_blank"` and `rel="noopener noreferrer"`
    - Handle image fallback for missing thumbnails
    - _Requirements: 2.4, 9.1, 9.2, 9.3_
  
  - [ ]* 2.4 Write integration tests for NewsCard
    - Test component rendering with valid props
    - Test external link attributes
    - Test image fallback behavior
    - _Requirements: 2.2, 9.2_

- [ ] 3. Checkpoint - Verify component foundation
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 4. Create News page component
  - [ ] 4.1 Create News component with state management
    - Create `src/pages/News.jsx`
    - Set up state for articles, loading, and error using `useState`
    - Implement `useEffect` hook to fetch news on component mount
    - _Requirements: 3.1, 3.5, 4.1_
  
  - [ ] 4.2 Implement news fetching logic with retry
    - Create `fetchNews` function that calls `newsService.fetchMutualFundNews`
    - Implement automatic retry logic (retry once after 2 seconds on failure)
    - Update state based on fetch results (articles, loading, error)
    - _Requirements: 3.1, 3.3, 3.4_
  
  - [ ] 4.3 Implement loading state UI
    - Create loading state component with spinner and text
    - Display "Loading news articles..." message
    - Use react-icons for loading spinner (consistent with existing patterns)
    - _Requirements: 4.1, 4.2, 4.3_
  
  - [ ] 4.4 Implement error state UI
    - Create error state component with error message
    - Add "Retry" button that triggers manual fetch attempt
    - Display user-friendly error messages based on error type
    - _Requirements: 5.1, 5.2, 5.3, 5.4_
  
  - [ ] 4.5 Implement empty state UI
    - Create empty state component for zero articles
    - Display "No news articles available at this time" message
    - Maintain consistent styling with application
    - _Requirements: 6.1, 6.2, 6.3_
  
  - [ ] 4.6 Implement news feed rendering
    - Create responsive grid layout for article cards
    - Map over articles array and render NewsCard components
    - Display articles in reverse chronological order
    - Ensure minimum of 10 articles when available
    - _Requirements: 2.1, 2.3, 2.5_

- [ ] 5. Implement responsive design
  - [ ] 5.1 Add responsive grid styling
    - Implement CSS Grid with media queries in `newsStyles.js`
    - 1 column layout for mobile (< 768px)
    - 2 column layout for tablet (768px - 1024px)
    - 3 column layout for desktop (> 1024px)
    - _Requirements: 7.1, 7.2, 7.3, 7.4_
  
  - [ ] 5.2 Ensure NewsCard responsiveness
    - Verify card resizing across breakpoints
    - Test text truncation on different screen sizes
    - Adjust padding and spacing for mobile devices
    - _Requirements: 7.5_

- [ ] 6. Integrate News Tab into application
  - [ ] 6.1 Update Navbar component
    - Add "News" NavLink to `src/Components/Navbar.jsx`
    - Position after "Calculator" link
    - Use existing linkStyle and activeLinkStyle patterns
    - Ensure active state highlighting works correctly
    - _Requirements: 1.1, 1.3, 1.4_
  
  - [ ] 6.2 Add News route to App.jsx
    - Import News component in `src/App.jsx`
    - Add `/news` route to Routes configuration
    - Verify navigation works from Navbar
    - _Requirements: 1.2_
  
  - [ ]* 6.3 Write integration tests for navigation
    - Test Navbar includes News link
    - Test clicking News link navigates to /news route
    - Test active styling applies on /news route
    - _Requirements: 1.1, 1.2, 1.3_

- [ ] 7. Checkpoint - Verify integration
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 8. Configure environment variables
  - [ ] 8.1 Set up API key configuration
    - Create `.env` file in project root (if not exists)
    - Add `VITE_NEWS_API_KEY` variable
    - Add `.env` to `.gitignore` to prevent committing secrets
    - Update README with instructions for API key setup
    - _Requirements: 10.2_
  
  - [ ] 8.2 Implement API key usage in news service
    - Import `import.meta.env.VITE_NEWS_API_KEY` in newsService.js
    - Pass API key in fetch request headers or query parameters
    - Handle missing API key scenario with clear error message
    - _Requirements: 10.2, 10.3_

- [ ] 9. Add error handling enhancements
  - [ ] 9.1 Implement rate limiting detection
    - Detect HTTP 429 status code in news service
    - Display specific message for rate limiting errors
    - Implement temporary retry cooldown (60 seconds)
    - _Requirements: 10.4_
  
  - [ ] 9.2 Add API authentication error handling
    - Detect HTTP 401 status code in news service
    - Display developer-friendly error message
    - Log error to console for debugging
    - _Requirements: 10.2_

- [ ] 10. Performance and security improvements
  - [ ] 10.1 Add image lazy loading
    - Add `loading="lazy"` attribute to NewsCard image elements
    - Verify lazy loading works on scroll
    - _Requirements: 2.2_
  
  - [ ] 10.2 Verify security attributes
    - Confirm all external links use `rel="noopener noreferrer"`
    - Verify API key is not exposed in client-side code
    - Test Content Security Policy compatibility
    - _Requirements: 9.2, 10.2_
  
  - [ ]* 10.3 Write integration tests for News component
    - Test loading state displays initially
    - Test articles render after successful fetch
    - Test error state displays on fetch failure
    - Test empty state displays with zero articles
    - Test retry functionality
    - _Requirements: 4.1, 4.4, 5.1, 6.1_

- [ ] 11. Final checkpoint and verification
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional test tasks and can be skipped for faster MVP delivery
- Each task references specific requirements for traceability
- The implementation uses existing project patterns (React functional components, inline styles, react-router-dom)
- No new dependencies are required beyond what's already installed
- The design uses JavaScript/React JSX (not pseudocode), so all code should be written in JavaScript
- Environment variables follow Vite's convention (`VITE_` prefix and `import.meta.env` access)
- Checkpoints ensure incremental validation at logical breaks

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["1.2", "1.3"] },
    { "id": 2, "tasks": ["1.4", "2.1"] },
    { "id": 3, "tasks": ["2.2"] },
    { "id": 4, "tasks": ["2.3", "2.4"] },
    { "id": 5, "tasks": ["4.1"] },
    { "id": 6, "tasks": ["4.2"] },
    { "id": 7, "tasks": ["4.3", "4.4", "4.5"] },
    { "id": 8, "tasks": ["4.6", "5.1"] },
    { "id": 9, "tasks": ["5.2", "6.1"] },
    { "id": 10, "tasks": ["6.2", "6.3"] },
    { "id": 11, "tasks": ["8.1"] },
    { "id": 12, "tasks": ["8.2", "9.1", "9.2"] },
    { "id": 13, "tasks": ["10.1", "10.2"] },
    { "id": 14, "tasks": ["10.3"] }
  ]
}
```
