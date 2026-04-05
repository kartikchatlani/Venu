# Venu — Interactive Prototype

A React-based interactive prototype for a music event discovery and booking app, built with Vite.

## Features

- **Home Page**: Booked shows, perfect matches, friends' activity, weekly picks, soundcheck quiz
- **Explore Page**: Search genres, promoted events, tonight/weekend shows, festivals, interactive map
- **The Guide**: Featured articles, spotlights, signal (real-time updates), more articles
- **Calendar Page**: Grid view with dots, event cards, filters
- **Profile Page**: User stats, badges, crews, favorites, albums, reviews

## Tech Stack

- React 18
- Vite
- React Router DOM
- Custom CSS-in-JS styling

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
src/
├── main.js          # App entry point
├── App.js           # Root component with tab navigation
├── theme.js         # Brand colors and fonts
├── data/
│   └── index.js     # Mock data for all pages
├── components/
│   └── index.js     # Shared UI components
└── pages/
    ├── index.js     # Page component exports
    ├── Home.js
    ├── Explore.js
    ├── Guide.js
    ├── Calendar.js
    └── Profile.js
```

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run preview` — Preview production build
- `npm run lint` — Run ESLint
