# API-10 — Signal Feed & Festivals Endpoints

**Type:** API Story · **Epic:** Editorial / Events · **Depends on:** API-01 (event model), API-09 (editorial patterns)

## Deliverable

`GET /api/v1/signal?city=` (news-ticker items for The Guide) and `GET /api/v1/festivals?city=` (festival cards for Explore) — two small read endpoints completing the content surfaces.

## Purpose

Serve the two remaining content feeds: Signal's live music-news ticker (headline, icon, trending, source) and the festival list (lineup, dates, match score placeholder) that Explore's "Festivals For You" renders.

## Description

- **Signal:** `signal_items(id, headline, meta, icon_type, trending, source, url?, city, created_at)`; endpoint returns newest-first, capped (e.g., 20), with a feed-level `updatedAt` for the "Updated live" header. Curated rows for MVP (admin path like API-07/09).
- **Festivals:** `festivals(id, name, city, start_date, end_date, cover_url, lineup: artist list)`; endpoint returns upcoming festivals for the city. `matchScore` is included in the response but **stubbed** (static/random-stable per user) until a taste-profile engine exists — document it as such in OpenAPI.
- Festival lineup references artist records where they exist so lineup chips can link later.

## Notes / Questions

- Signal ambition check: automated aggregation from external news sources is a real project — MVP is manual curation, confirm the editorial team accepts that workload.
- Festival detail view (tap-through target) isn't designed yet — is a festival just a special event in the bottom sheet, or its own screen? Frontend blocked question for UI-20; API returns enough for either.
- Match score contract: agree the stub semantics now so swapping in real scores later changes no schema.

## Acceptance Criteria

- [ ] Signal endpoint returns curated items with icon/trending/source fields and feed `updatedAt`.
- [ ] Festivals endpoint returns upcoming festivals with date ranges, lineup arrays, and a stable stubbed `matchScore`.
- [ ] Past festivals are excluded automatically.
- [ ] Both documented in OpenAPI with the stub clearly annotated.
- [ ] Seed data exists in dev for UI-20/UI-23 development.
