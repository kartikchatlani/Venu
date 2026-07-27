# VENU-009 — Home Page Assembly

**Suggested epic:** Pages · **Depends on:** VENU-001–VENU-008 (shell + shared components) · **Wireframe ref:** `docs/screenshots/tab-home.png`, `tab-home-scroll.png`, `tab-home-bottom.png` · **Prototype ref:** `src/pages/Home.jsx`, `src/hooks/useAustinEvents.js`

## Purpose

Assemble the Home tab — the daily "what's happening tonight" surface that anchors the app. Home composes almost entirely from shared components; this story is the composition plus its two lightweight page-specific sections (the Drop and Soundcheck cards land separately in VENU-010/011).

## Description

Top-to-bottom per the wireframe:

- **Header row** — location marker ("● AUSTIN, TX"), notification bell (VENU-008), user avatar → Profile (VENU-006).
- **"Tonight." hero** — serif headline, meta line ("7 SHOWS WITHIN 25 MILES · SUN JUN 21"), and a hero event card: full-bleed photo, live badge ("● TONIGHT · 8 PM"), artist name, venue/time, Get Tickets CTA, wishlist heart, share. Data from the tonight feed (`useAustinEvents` pattern).
- **On Your Radar** — Section Header + horizontal row of poster cards with match badges (Perfect Matches; mocked match % until the taste engine exists).
- **Your Shows** — row-variant cards for events the user marked Going (from VENU-005 store).
- **Friend activity feed** — Friend Activity Rows (VENU-006), mocked data for MVP.
- **This Week in [City]** — editorial section with editor attribution (Article Cards, VENU-007).
- **Don't Miss** — editorial hero card (VENU-007 hero variant).
- Pull-to-refresh refreshes tonight/radar/editorial data.

## Notes / Questions

- Hero selection logic: which of tonight's shows becomes the hero? Options: highest match %, editorially pinned, or soonest start time. Needs a product decision; recommend match % with editorial override.
- "7 SHOWS WITHIN 25 MILES" implies a radius calculation — does MVP hardcode the metro query (current Ticketmaster Austin query) and just count results, or do we need geolocation? Recommend metro-query count for MVP.
- Empty states needed: no shows tonight, no Going shows, no friend activity. The wireframes don't show these — request designs.
- Pull-to-refresh on web: implement via a scroll-container gesture library or defer to a refresh affordance? Native-feel PTR in mobile browsers is finicky — worth a spike note.

## Acceptance Criteria

- [ ] Page renders all sections in wireframe order using shared components only (no local card implementations).
- [ ] Hero card shows a real tonight event with live badge, Get Tickets link, working wishlist heart and share.
- [ ] "Tonight" meta line reflects the actual count of tonight's events.
- [ ] On Your Radar renders poster cards with match badges; Your Shows lists Going events and updates live when Going is toggled anywhere.
- [ ] This Week / Don't Miss render editorial cards; tapping opens the article (or linked event sheet).
- [ ] Every event surface opens the shared bottom sheet on tap.
- [ ] Each section has a designed empty state; the page never renders a blank gap.
