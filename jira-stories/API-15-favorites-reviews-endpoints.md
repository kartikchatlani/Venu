# API-15 — Favorites & Reviews Endpoints

**Type:** API Story · **Epic:** Profile & Passport · **Depends on:** API-04, API-14 (attendance for "Seen Nx")

## Deliverable

`GET/PUT/DELETE /api/v1/me/favorites/artists/{id}` and `.../venues/{id}` (+ list endpoints with seen/visit counts), and reviews CRUD: `POST /api/v1/me/reviews`, `GET /api/v1/users/{id}/reviews`, `PATCH/DELETE /api/v1/me/reviews/{id}` — backing Profile's favorites and reviews sections (UI-30).

## Purpose

Let users declare taste (favorite artists/venues) and record opinions (star-rated event reviews) — profile content that also feeds future personalization.

## Description

- **Favorites:** `favorite_artists(user_id, artist_id)`, `favorite_venues(user_id, venue_id)`; list responses enrich with computed counts — "Seen 3x" (attendance joins on artist) and "Visited 5x" (attendance joins on venue).
- **Reviews:** `reviews(id, user_id, event_id, rating 1–5, text, created_at, updated_at)`; one review per user per event; attached event must be past (ideally attended — see Questions).
- Public visibility: reviews and favorites appear on the public profile per the privacy decision in API-05.
- Review list endpoints support the profile's "Recent Reviews" (latest N with event context).

## Notes / Questions

- Must a user have confirmed attendance to review, or is past-event enough? Recommend requiring attendance — keeps reviews credible and feeds the WENT loop. Product call.
- Review moderation: public text needs at minimum a length cap, profanity pass, and a report mechanism eventually — cap + edit/delete now, reporting flagged for pre-launch.
- Favorite artists also inform the future taste engine — no extra work now, just note the signal exists.
- Rating: whole stars (wireframe) — integers 1–5.

## Acceptance Criteria

- [ ] Favorite add/remove is idempotent; lists return enriched seen/visit counts derived from attendance data.
- [ ] Creating a review enforces one-per-event, past-event (and attendance, per decision), and rating bounds.
- [ ] Author can edit/delete own reviews; others get 403.
- [ ] Public profile review/favorites visibility matches the privacy decision.
- [ ] Recent-reviews endpoint returns latest reviews with embedded event summaries.
- [ ] OpenAPI documented.
