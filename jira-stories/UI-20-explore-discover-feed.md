# UI-20 — Explore: Discover Feed Sections

**Type:** UI Story · **Epic:** Explore · **Depends on:** UI-19, UI-05, UI-06, UI-10 (sponsored), API-01, API-10 (festivals) · **Refs:** `docs/screenshots/tab-explore.png`; `src/pages/Explore.jsx`

## Deliverable

The Discover view's content: Promoted Event hero card, "Tonight in Austin" rows, "This Weekend" posters, and "Festivals For You" dark cards — all responsive to the genre filter.

## Purpose

Fill Explore's browse mode with the four content bands from the wireframe, wired to the real feeds.

## Description

- **Promoted Event Card** — hero variant wrapped in UI-10's SponsoredCard: "PROMOTED · THIS FRIDAY · APR 4" badge, artist headline (Fraunces), "VENUE · DOORS 7 PM" + "From $42", GET TICKETS CTA, "SPONSORED" disclosure below; tap tracking; sourced from promoted-event data (API-10/API-09 sponsor pattern — align contract).
- **Tonight in [City]** — SectionHeader + `EventCardRow` list from API-01 tonight feed + "SEE ALL →" expanding to the full list.
- **This Weekend** — SectionHeader + `EventCardPoster` grid/strip from API-01 weekend feed (already deduped server-side).
- **Festivals For You** — dark Festival Cards: cover, name, city, date range (Mono), MatchBadge, artist lineup chips (GenreTag-style); data from API-10; tap → event sheet or festival treatment per the API-10 design question.
- Genre filter (from UI-19) applies to Tonight and This Weekend; festivals exempt (product note).
- Pull-to-refresh/refetch-on-focus for all bands.

## Notes / Questions

- Promoted inventory: with no ad system, promoted slots are editorially assigned — confirm the data source contract (recommend drops-style curated table) before build.
- Festival tap-through target still open (API-10 question) — build the card now, point it at the event sheet with festival fields as interim.
- SEE ALL for Tonight: inline expansion vs dedicated list route — recommend inline expansion at MVP.

## Acceptance Criteria

- [ ] All four bands render per wireframe order and styling, using shared components only.
- [ ] Promoted card always shows disclosure, fires tracking on tap, and its CTA opens the ticket URL.
- [ ] Tonight/Weekend respond to the genre filter and never show duplicate events across bands.
- [ ] Festival cards render lineup chips, dates, and match badges; tap opens the interim detail.
- [ ] Hearts work on every card; sheet opens from every card.
- [ ] Each band has skeleton and empty states.
