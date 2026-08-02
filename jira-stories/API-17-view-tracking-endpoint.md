# API-17 — Content View Tracking Endpoint

**Type:** API Story · **Epic:** Platform · **Depends on:** API-04

## Deliverable

`POST /api/v1/track/views` accepting batched view events (`[{type: event|article|artist, id, viewedAt}]`) — the personalization signal store the tech list's "Track content views" function requires.

## Purpose

Record what users look at (events, articles, artists) so future personalization (Perfect Matches, The Guide FOR YOU, taste profile) has data from day one — the models can come later, but the signal can't be collected retroactively.

## Description

- Batch endpoint: client-side tracker (UI-side responsibility, part of the API client layer) flushes every N views or on page-hide; server validates and bulk-inserts `content_views(user_id, content_type, content_id, viewed_at)`.
- Lightweight by design: fire-and-forget from the client (202 response), tolerant of duplicates, no read API at MVP.
- Retention: raw views kept 12 months (config), aggregation jobs come later with the personalization epic.
- Document what counts as a "view" per surface so data is consistent: bottom sheet opened (event), article opened (article), profile/spotlight opened (artist).

## Notes / Questions

- Privacy: view tracking must appear in the privacy policy; honor a future "personalization off" toggle — store nothing when off (flag on user record, checked server-side).
- Volume is trivial at MVP scale; if it grows, this is the first candidate for a queue (SQS) — note in code, don't build now.
- Do we also track anonymous (logged-out) views? Feeds are public per API-01 — recommend no for MVP (simpler privacy posture).

## Acceptance Criteria

- [ ] Batched events insert correctly; malformed entries are dropped without failing the batch (report count in response).
- [ ] Endpoint responds 202 quickly (<50ms server time) and never blocks user-facing flows.
- [ ] View definitions per content type are documented alongside the OpenAPI spec.
- [ ] Personalization-off users generate no rows.
- [ ] Retention policy is configured and documented.
