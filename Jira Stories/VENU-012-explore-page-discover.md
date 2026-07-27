# VENU-012 — Explore Page (Discover View)

**Suggested epic:** Pages · **Depends on:** VENU-001–VENU-005, VENU-007 (promoted card) · **Wireframe ref:** `docs/screenshots/tab-explore.png` · **Prototype ref:** `src/pages/Explore.jsx`, `src/hooks/useAustinEvents.js`, `src/lib/ticketmaster.js`

## Purpose

Build the Explore tab's Discover view — the browse-and-search surface for finding shows by search, genre, tonight, weekend, and taste-matched festivals, with the city selector that will later unlock multi-city support.

## Description

Top-to-bottom per the wireframe:

- **Header** — "Explore" title + "◎ AUSTIN, TX · CHANGE CITY" city pill; tapping opens a location picker (Austin-only list for MVP, designed for expansion) + tagline subheader.
- **Search Bar** (VENU-002) — searches artists and venues; results replace the browse sections while active; clear restores browse.
- **Genre Filter Pills** — ALL / ROCK / ELECTRONIC / HIP-HOP / … single-select; filters all event sections below.
- **Segmented Toggle** — DISCOVER / MAP (Map view is VENU-013).
- **Promoted Event Card** — hero variant with "PROMOTED" disclosure, event headline, meta, "From $X", Get Tickets CTA (VENU-007's sponsored treatment).
- **Tonight in [City]** — row-variant event cards with wishlist hearts + "SEE ALL →".
- **This Weekend** — poster-variant cards, deduped against tonight's listings (dedup logic exists in `useAustinEvents`).
- **Festivals For You** — dark Festival Cards: cover, name, city, date range, match %, artist lineup chips.
- Pull-to-refresh refetches all sections.

## Notes / Questions

- Search: client-side filter over fetched events for MVP, or a backend/Ticketmaster search endpoint? Client-side is fine at Austin scale; flag the switchover point for VENU-020.
- Genre filtering against Ticketmaster's genre taxonomy is messy (their classifications are inconsistent) — the normalizer in `ticketmaster.js` should map TM genres to Venu's fixed pill set; unmapped genres fall into ALL only.
- Festival data (lineup, match %) is mocked — same optional-data treatment as match badges (VENU-003).
- Question: does selecting a genre filter also apply to Festivals For You, or only event sections? Recommend events only.
- City picker for MVP: static list with Austin enabled and "More cities soon" — confirm with product.

## Acceptance Criteria

- [ ] All sections render in wireframe order; every event card opens the shared bottom sheet.
- [ ] Search filters artists/venues live, shows an empty-results state, and clearing restores the browse layout.
- [ ] Genre pill selection filters Tonight and This Weekend sections; ALL restores everything.
- [ ] Promoted card always shows its disclosure label and fires tracking on tap (VENU-007).
- [ ] This Weekend never duplicates an event already shown in Tonight.
- [ ] Festival cards render match % and lineup chips; tap opens festival detail (bottom sheet variant or external — per design decision).
- [ ] City pill opens the picker; selecting Austin (only option) closes it; layout is ready for a multi-city list.
