# VENU-014 — The Guide Page (Editorial Hub)

**Suggested epic:** Pages · **Depends on:** VENU-007 (editorial components), VENU-008 (bell) · **Wireframe ref:** `docs/screenshots/tab-guide.png` · **Prototype ref:** `src/pages/Guide.jsx`

## Purpose

Build The Guide — Venu's editorial hub ("Stories · Spotlights · Signals") that deepens the insider feel with scene reports, artist spotlights, and a live news ticker, and feeds readers back into events via linked CTAs.

## Description

Top-to-bottom per the wireframe:

- **Header** — "The Guide" title + subtitle ("STORIES · SPOTLIGHTS · SIGNALS") + notification bell with unread dot.
- **Category Filter Pills** — FOR YOU / SCENE REPORTS / SPOTLIGHTS / … ; filters the article feed. FOR YOU is personalized via the taste profile (mocked ranking for MVP).
- **Featured Article Card** — hero-size Article Card (VENU-007 hero variant): full-width cover, category tag, title, italic description, author credit, read time, bookmark.
- **Spotlight** — Artist Spotlight Card: dark variant with "ARTIST SPOTLIGHT" tag, "PLAYING THIS WEEK" meta, and an embedded event CTA that opens the linked event's bottom sheet.
- **Signal** — section header with "Updated live" status + Signal Feed Items: news-ticker-style rows (icon, headline, meta, trending badge, source).
- **Sponsored Content** — VENU-007 sponsored card with disclosure.
- **More to Read** — standard Article Card list.
- Behaviors: mark article as read on open (feeds view history), bookmark toggling, pull-to-refresh.

## Notes / Questions

- Article reader view: the tech list covers cards but not the full-article reading screen — is that in scope here or a separate story? Assume in scope as a simple full-screen route (title, cover, body, author) unless design says otherwise; flag for sizing.
- "Updated live" on Signal: real-time (websocket/poll) or just fetched-on-load with a timestamp? Recommend poll-on-focus + timestamp for MVP; true live is a later enhancement.
- Signal feed source: editorial CMS? Aggregated from external feeds? Backend question for VENU-020 — MVP can be a curated table.
- Read/bookmark state both persist per user — same service-layer pattern as saved events (VENU-005).
- Question: does FOR YOU personalization need view-history tracking live in MVP (see VENU-020 content-view tracking), or launch with recency ordering?

## Acceptance Criteria

- [ ] Page renders header, category pills, featured article, spotlight, Signal feed, sponsored card, and More to Read per the wireframe.
- [ ] Category pill selection filters the feed; FOR YOU shows the personalized (or recency-fallback) ordering.
- [ ] Opening an article marks it read (persisted) and renders the article view.
- [ ] Bookmark toggles persist and fire the confirmation toast; bookmarked articles are retrievable (saved list).
- [ ] Artist Spotlight's event CTA opens the shared event bottom sheet for the linked event.
- [ ] Signal items render icon, headline, meta, trending badge, and source; the section shows its last-updated status.
- [ ] Sponsored card carries the disclosure label and tap tracking.
