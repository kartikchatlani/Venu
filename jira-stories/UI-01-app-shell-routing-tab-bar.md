# UI-01 — App Shell: Routing & Bottom Tab Bar

**Type:** UI Story · **Epic:** Foundation · **Depends on:** — (build first) · **Refs:** all `docs/screenshots/`, `src/App.jsx`, `src/components/index.jsx` (`TabBar`)

## Deliverable

The production app skeleton: React Router 7 routes for the five tabs (`/home`, `/explore`, `/guide`, `/calendar`, `/profile`) with the persistent Bottom Tab Bar — every subsequent UI story renders inside this shell.

## Purpose

Replace the prototype's `useState` tab switching with real URL routing so tabs are deep-linkable, the browser back button works, and pages develop independently.

## Description

- Route structure with a shared layout route rendering the Tab Bar + an outlet; nested route support for sub-pages (`/profile/friends`) established now.
- Bottom Tab Bar: five icons per the wireframes, amber active state, `.pressable` feedback, no hover states; the prototype's `TabBar` is the visual spec.
- Full-viewport mobile-first layout (dropping the prototype's `PhoneFrame` — production renders as a real app, not a mockup).
- 404 route redirecting to `/home`.

## Notes / Questions

- Scroll restoration: preserve per-tab scroll position (native feel) or reset on switch? Recommend preserve; needs a small scroll-restoration utility.
- Decide now whether event detail gets a URL (`/events/:id`) — affects UI-07 and share links. Recommend yes.
- Keep `PhoneFrame` behind a dev flag for design reviews, or delete? Suggest delete (git history keeps it).

## Acceptance Criteria

- [ ] All five tabs render at their URLs; hard refresh and direct links land on the right tab.
- [ ] Tab Bar highlights the active tab from the URL (including on nested routes) and switches via navigation, not state.
- [ ] Browser back/forward walks navigation history correctly.
- [ ] Layout fills real device viewports (tested at 375px and a modern phone size) with the tab bar safe-area-aware.
- [ ] Unknown URLs redirect to `/home`.
