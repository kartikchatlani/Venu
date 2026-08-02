# API-09 — Articles Endpoints (Feed, Bookmarks, Read State)

**Type:** API Story · **Epic:** Editorial · **Depends on:** API-04

## Deliverable

`GET /api/v1/articles?category=`, `GET /api/v1/articles/{id}`, `PUT/DELETE /api/v1/me/bookmarks/{articleId}`, `POST /api/v1/articles/{id}/read` — the content backend for The Guide and Home's editorial sections (UI-10, UI-22, UI-24).

## Purpose

Serve editorial content (articles, authors, categories, featured/sponsored flags) with per-user bookmark and read state, so The Guide is data-driven instead of hardcoded.

## Description

- Tables: `articles(id, title, description, body, cover_url, category, author_id, publish_date, read_time_min, linked_event_id?, featured, sponsored, sponsor_meta?)`, `authors(id, name, role, avatar_url, bio)`, `bookmarks(user_id, article_id)`, `article_reads(user_id, article_id, read_at)`.
- Feed endpoint: filter by category tab (`FOR_YOU|SCENE_REPORTS|SPOTLIGHTS|...`), list projection (no body), featured item flagged, sponsored items carrying disclosure metadata. FOR_YOU = recency ordering for MVP (personalization later via API-17 data).
- Detail endpoint returns full body; posting read marks view history.
- Bookmarks: idempotent PUT/DELETE + `GET /me/bookmarks` for the saved-articles list.
- Read time computed at write time from body length.
- Content entry: admin path/seed migrations for the editorial team (same pattern as API-07's drops).

## Notes / Questions

- CMS question: hand-curated DB rows are fine for MVP, but if editorial wants a real authoring workflow, a headless CMS (e.g., admin UI later) is a separate epic — confirm expectations now.
- The Guide "Signal" ticker items are separate (API-10).
- Scout Tips (tech list: tied to artists/events, shown on Home + bottom sheet) — fold into this story's schema (`scout_tips` table + include in event detail responses) or push to a later story? Included here as a small table + `GET /events/{id}/tips`.

## Acceptance Criteria

- [ ] Feed returns list projections filtered by category with featured/sponsored flags; detail returns the full article.
- [ ] Bookmark add/remove is idempotent per user; bookmark list endpoint returns saved articles.
- [ ] Read marks persist and dedupe (one row per user+article, timestamp updated).
- [ ] Sponsored items always include disclosure metadata in the payload.
- [ ] Scout tips are retrievable per event.
- [ ] OpenAPI documented; seed migration provides enough content to build UI-22 against dev.
