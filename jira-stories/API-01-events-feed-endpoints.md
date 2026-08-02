# API-01 — Events Feed Endpoints (Tonight / This Weekend)

**Type:** API Story · **Epic:** Events · **Depends on:** SPIKE-04 (ingestion strategy), INFRA-02, INFRA-03

## Deliverable

`GET /api/v1/events/tonight?city=` and `GET /api/v1/events/weekend?city=` live in dev, returning normalized Venu event JSON — replacing the browser's direct Ticketmaster calls (and getting the TM key out of the client bundle).

## Purpose

Serve the app's core content — tonight's and this weekend's shows — from our backend with a stable event model, per the ingestion/caching design from SPIKE-04.

## Description

- Implement the SPIKE-04 design (ingestion job + DB read, or cached proxy) behind these two endpoints.
- Response model matches the agreed Event schema: `id, artist, venue{id,name,lat,lng}, date, time, imageUrl, genre, priceMin/TBA, status(announced|presale|on-sale|live|past)` — port the normalization currently in `src/lib/ticketmaster.js`.
- "Tonight" = venue-local date, not UTC (the prototype already does client-side date filtering for timezone accuracy — that logic moves here).
- Weekend feed excludes events already in tonight's feed (dedup rule from `useAustinEvents`).
- `city` param accepts `austin` only for now; unknown city → 400.
- OpenAPI/Swagger documentation generated for frontend consumption.

## Notes / Questions

- Cache TTL / sync freshness per SPIKE-04 — tonight's feed staleness tolerance is ~1 hour max.
- Pagination: feeds are small at Austin scale; cap at 50 with a `limit` param rather than full pagination for MVP?
- Public or authenticated? Feeds are not user-specific — recommend public with rate limiting, so marketing pages could reuse them.

## Acceptance Criteria

- [ ] Both endpoints return normalized events for Austin with correct venue-local "tonight" filtering (verified across a UTC-midnight boundary case).
- [ ] Weekend response contains no event present in tonight's response.
- [ ] Ticketmaster API key is used only server-side; client bundle contains no TM key.
- [ ] Responses match the documented OpenAPI schema; frontend team has access to the docs.
- [ ] p95 response time < 300ms from cache/DB (not proxying TM per request).
- [ ] Integration tests cover empty-night, TBA-price, and missing-image events.
