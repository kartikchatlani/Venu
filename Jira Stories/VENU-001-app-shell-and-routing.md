# VENU-001 — App Shell, Routing & Navigation Chrome

**Suggested epic:** Foundation / Shared Components · **Depends on:** — (build first) · **Wireframe ref:** all screenshots in `docs/screenshots/` · **Prototype ref:** `src/App.jsx`, `src/components/index.jsx` (`TabBar`, `PhoneFrame`, `Screen`)

## Purpose

Establish the production app shell: the five-tab structure (Home, Explore, The Guide, Calendar, Profile), URL-based routing, and the shared page-header chrome. Every other story renders inside this shell, so it must land first.

## Description

Build the global navigation and structure layer defined in the technical list:

- **Bottom Tab Bar** — persistent on every main page; five tabs with active-state styling (amber highlight, as shown in the wireframes). The prototype's `TabBar` component is the visual reference.
- **Routing** — replace the prototype's `useState` tab switching in `App.jsx` with real React Router DOM 7 routes (`/home`, `/explore`, `/guide`, `/calendar`, `/profile`, plus nested routes for sub-pages like `/profile/friends`). React Router 7 is already installed but unused.
- **Page Header** — shared component with a serif-italic (Fraunces) page title and a contextual right-side slot: notification bell (Home, Guide), settings gear (Profile), city pill (Explore), or back arrow (sub-pages).
- Auth-gated shell: unauthenticated users see the Auth page; authenticated users see the shell + active route (mirrors current `App.jsx` behavior).

## Notes / Questions

- React Router DOM 7 is installed in the prototype but navigation is currently tab state — this story is the migration point. Do we want the event bottom sheet to be URL-addressable too (e.g., `/events/:id`)? That decision affects VENU-004 and shareable links (VENU-017's Share Profile has the same question).
- Should scroll position be preserved per tab when switching (native-app feel) or reset to top?
- The wireframes show the app inside a phone mockup frame (`PhoneFrame`). For production, confirm we drop the frame and render full-viewport mobile-first.
- Browser back button behavior: back should navigate tab history, but should it also close an open bottom sheet/notifications panel first?

## Acceptance Criteria

- [ ] Five routes exist and render their page components; direct URL entry (deep link) loads the correct tab.
- [ ] Bottom Tab Bar is visible on all five main pages, highlights the active tab, and switches routes on tap.
- [ ] Page Header renders the serif-italic title and the correct contextual right-side element per page (bell / gear / city pill / back arrow).
- [ ] Sub-pages (e.g., Friends) render a back arrow that returns to the parent page.
- [ ] Logged-out users are redirected to the Auth screen; logging in lands on Home.
- [ ] Browser back/forward navigates between previously visited tabs correctly.
- [ ] Tab bar and header follow the After Dark design system (JetBrains Mono labels, radius-2 buttons, no pills/circles).
