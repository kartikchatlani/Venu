# UI-23 — The Guide: Artist Spotlight & Signal Feed

**Type:** UI Story · **Epic:** The Guide · **Depends on:** UI-22 (page frame), UI-07 (event CTA), API-09/API-10 · **Refs:** `docs/screenshots/tab-guide.png` ("Spotlight" section)

## Deliverable

The Guide's two distinctive bands: the dark Artist Spotlight card with embedded event CTA, and the Signal live-news ticker section.

## Purpose

Spotlight converts reading into attendance (article → tonight's show), and Signal delivers the "plugged into the scene" feel with fast-moving news items.

## Description

- **Spotlight** — SectionHeader ("Spotlight" / "ALL SPOTLIGHTS →") + dark card per wireframe: "ARTIST SPOTLIGHT" tag + "PLAYING THIS WEEK" meta, artist imagery/name, blurb, and an embedded event CTA row (event + date + tap → event bottom sheet). Data: spotlight-category articles with `linked_event_id` (API-09).
- **Signal** — Signal SectionHeader variant with "UPDATED LIVE" status (last-updated time from API-10) + ticker-style feed items: type icon, headline (bold), meta line, TRENDING badge (ember) where flagged, source label. Items link out (external `url`) or to linked content.
- Signal refreshes on page focus; timestamp reflects the feed's `updatedAt`.
- Both sections sit in the Guide scroll below the featured article (order per wireframe: Featured → Spotlight → Signal → Sponsored → More to Read; confirm exact order with design).

## Notes / Questions

- "ALL SPOTLIGHTS →" — filters the feed to the SPOTLIGHTS category (no new page needed) — confirm.
- Signal item taps with no URL: inert or hidden chevron? Recommend inert-with-no-affordance.
- Trending logic is editorial (flag from API) — no client heuristics.

## Acceptance Criteria

- [ ] Spotlight card matches the wireframe treatment and its event CTA opens the correct event sheet.
- [ ] ALL SPOTLIGHTS navigates to the category-filtered feed.
- [ ] Signal renders icon/headline/meta/trending/source per item and shows a live last-updated status.
- [ ] External Signal items open in a new context; itemless/empty Signal renders a quiet placeholder.
- [ ] Sections refresh on page focus without full-page reload.
