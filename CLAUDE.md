# Venu

Interactive prototype for a music event discovery & booking app, scoped to Austin, TX.
Presented as a phone mockup (`PhoneFrame`) with a five-tab UI.

## Stack

- **React 19** + **Vite 8** (note: README says React 18 — it's stale)
- **React Router DOM 7** (installed; navigation currently done via tab state in `App.jsx`, not routes)
- **Supabase** — auth + `saved_events` table
- **Ticketmaster Discovery API** — live Austin music events
- Styling: inline CSS-in-JS (no framework); theme in `src/theme.jsx`

## Commands

- `npm run dev` — start Vite dev server (http://localhost:5173)
- `npm run build` — production build
- `npm run preview` — preview production build
- `npm run lint` — ESLint

## Environment

Requires a `.env` at repo root (gitignored — never commit it):

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_TICKETMASTER_API_KEY`

Any `VITE_`-prefixed var is exposed to the browser via `import.meta.env`.

## Architecture

- `src/App.jsx` — root; manages Supabase auth session, active tab, selected event (bottom sheet), notifications panel. Renders `Auth` when logged out, otherwise the active page + shared chrome.
- `src/pages/` — Home, Explore, Guide, Calendar, Profile, Auth.
- `src/components/` — shared UI: `PhoneFrame`, `TabBar`, `EventBottomSheet`, `NotificationsPanel`.
- `src/lib/` — `supabase.js` (client), `ticketmaster.js` (fetch + normalize TM events), `savedEvents.js` (CRUD on `saved_events`).
- `src/hooks/` — `useSavedEvents` (single source of truth for saved events; derives `wishlistIds`/`goingIds`; optimistic updates with rollback), `useAustinEvents` (tonight + weekend shows).

## Conventions

- Saved events have `status` of `"wishlist"` or `"going"`; toggling is threaded from `App` down through pages and the bottom sheet via props.
- All source files use `.jsx`, not `.js`.
