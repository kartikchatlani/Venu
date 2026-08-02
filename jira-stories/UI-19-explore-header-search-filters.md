# UI-19 — Explore: Header, City Picker, Search & Genre Filters

**Type:** UI Story · **Epic:** Explore · **Depends on:** UI-02, UI-04, API-02 (search) · **Refs:** `docs/screenshots/tab-explore.png`; `src/pages/Explore.jsx`

## Deliverable

Explore's control deck: page header with city pill + tagline, working search (results view), genre filter pills, and the Discover/Map segmented toggle — the frame the two Explore content stories (UI-20/21) plug into.

## Purpose

Explore's value is controllable discovery; this story delivers the controls and their state wiring so content sections just consume `{query, genre, viewMode, city}`.

## Description

- **Header** — "Explore" (Fraunces) + "◎ AUSTIN, TX · CHANGE CITY" pill + tagline subheader; city pill opens the location picker (modal/sheet: Austin selectable, "More cities coming soon" list per product decision).
- **SearchBar** — debounced (~300ms) calls to API-02; active search replaces the browse sections with a results list (`EventCardRow`s) + result count; clearing restores browse. Empty results state ("No shows found for 'X'").
- **Genre FilterPills** — ALL/ROCK/ELECTRONIC/HIP-HOP/… from the fixed genre set; selection feeds both browse sections and search queries.
- **SegmentedToggle** — DISCOVER/MAP controlling which content story renders below.
- All four states live in Explore's container (URL search params recommended so filters survive refresh/back).

## Notes / Questions

- Persist filters in URL params (`?q=&genre=&view=`)? Recommend yes — shareable filtered views for free and back-button correctness.
- Genre list source: hardcode the product-approved set or fetch from API? Hardcode at MVP (it's a design decision, not data).
- Search scope: events only per API-02 MVP; artist/venue result groups come later with the API's v2 shape.

## Acceptance Criteria

- [ ] Header, city pill, tagline render per wireframe; picker opens and selects (Austin only, expansion-ready list).
- [ ] Typing searches after debounce; results view with count replaces browse; clear restores browse exactly.
- [ ] Genre selection filters browse content and combines with active search.
- [ ] Toggle switches Discover/Map, preserving filters across the switch.
- [ ] Filter state survives refresh and back-navigation (URL params).
- [ ] Empty search results render the designed message.
