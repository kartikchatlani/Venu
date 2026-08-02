# UI-14 — Home: Header & "Tonight." Hero Section

**Type:** UI Story · **Epic:** Home · **Depends on:** UI-01, UI-06 (heart), UI-07, API-01 (tonight feed) · **Refs:** `docs/screenshots/tab-home.png`; `src/pages/Home.jsx`, `src/hooks/useAustinEvents.js`

## Deliverable

The top of the Home page: location/bell/avatar header row, the "Tonight." headline with meta line, and the hero event card — the first screen users see every day.

## Purpose

Home's opening view answers "what's happening tonight" in one glance; it's the app's signature moment (per the wireframe: giant Fraunces "Tonight." over a full-bleed show photo).

## Description

- **Header row** — "● AUSTIN, TX" marker (Mono, ember dot), NotifBell (UI-11), own Avatar → Profile (UI-09).
- **Headline block** — "Tonight." in display-size Fraunces italic + meta line "N SHOWS WITHIN 25 MILES · SUN JUN 21" (Mono uppercase) computed from the tonight feed + current date.
- **Hero card** — full-bleed photo, "● TONIGHT · 8 PM" ember badge, artist name overlay (Fraunces), "VENUE · TIME" line, GET TICKETS button (amber), WishlistHeart + share buttons; tap anywhere else opens the event sheet.
- Hero selection: first/top event from the tonight feed (product may refine to match-based later — keep selection in one function).
- Empty state when no shows tonight ("Quiet night in Austin — see this weekend →" linking to Explore).

## Notes / Questions

- "WITHIN 25 MILES" is cosmetic at MVP (feed is metro-wide) — confirm copy is acceptable or change to "IN AUSTIN".
- Share on the hero: same link contract as UI-07's share — reuse it.
- Image quality: hero needs the largest TM image size available — ensure API-01 exposes image variants or the biggest one.

## Acceptance Criteria

- [ ] Header row renders marker, bell (live unread state), and avatar (navigates to Profile).
- [ ] Meta line shows the real tonight count and formatted current date.
- [ ] Hero renders per wireframe with working Get Tickets, heart, share, and tap-to-sheet.
- [ ] Hero updates when the feed changes (e.g., after midnight rollover / refresh).
- [ ] Empty state renders on show-less nights with a working Explore link.
- [ ] Loading skeleton prevents layout shift on first paint.
