# Music Library Project

## Overview
This is a music library application built with Next.js and Material UI. It features a responsive design, infinite scrolling, and user authentication. The application allows users to browse and interact with music cards, each containing detailed information about a specific music track.

## Features
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Infinite Scrolling**: Loads music cards dynamically as the user scrolls
- **User Authentication**: Integrated with Auth0 for secure login/logout functionality
- **Custom Icons**: Includes custom icons for Bilibili and TikTok platforms
- **Dark Mode Support**: Automatically adapts to user's system preferences
- **Skeleton Loading**: Provides smooth loading experience with skeleton placeholders
- **Error Handling**: Implements error boundaries for graceful error recovery
- **Clipboard Integration**: Supports copying song information to clipboard
- **Performance Optimization**: Uses memoization, lazy loading, and request batching
- **Edit Functionality**: Provides modal for editing music card details

## Technologies Used
- **Frontend**: Next.js, React, Material UI
- **Authentication**: Auth0
- **State Management**: React hooks (useState, useEffect, useCallback, useReducer)
- **Styling**: CSS Modules, Material UI's sx prop, styled-components
- **Icons**: Custom icon fonts for Bilibili and TikTok
- **Notifications**: Notistack for toast notifications
- **Performance Monitoring**: Built-in performance tracking using performance API

## Key Components
- **MusicCard**: Main component for displaying music information
- **EditMusicCard**: Modal component for editing music details
- **MusicCardList**: Optimized list component for rendering multiple music cards
- **MusicCardErrorBoundary**: Error boundary component for handling errors
- **ResponsiveLayout**: Handles responsive layout for different screen sizes
- **ActionButtons**: Component for handling music card actions (download, favorite, etc.)

## Performance Features
- Component memoization using React.memo
- Lazy loading of components using dynamic imports
- Request batching using requestAnimationFrame
- Preloading of critical components
- Performance tracking using performance.now()
- Optimized state management using useReducer

## Development Setup
1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (Auth0 credentials, etc.)
4. Run development server: `npm run dev`
5. Build for production: `npm run build`
6. Start production server: `npm start`

## Environment Variables
- `NEXT_PUBLIC_AUTH0_DOMAIN`: Auth0 domain
- `NEXT_PUBLIC_AUTH0_CLIENT_ID`: Auth0 client ID
- `NEXT_PUBLIC_AUTH0_REDIRECT_URI`: Auth0 redirect URI
- `DevelopMode`: Set to 'true' for development mode

## Future Improvements
- Implement user authentication flows
- Add search and filtering functionality
- Integrate with music streaming APIs
- Add playlist creation and management
- Implement offline support using service workers
