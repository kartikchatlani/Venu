# API-03 — Saved Events Endpoints (Wishlist / Going)

**Type:** API Story · **Epic:** Events · **Depends on:** API-04 (auth middleware), INFRA-03

## Deliverable

Authenticated CRUD for the user's saved events: `GET /api/v1/me/saved-events`, `PUT /api/v1/me/saved-events/{eventId}` (body: `{"status": "wishlist"|"going"}`), `DELETE /api/v1/me/saved-events/{eventId}` — the backend for every heart and Going toggle in the app.

## Purpose

Persist the two core intent states server-side with upgrade-in-place semantics (one row per user+event, status switches without duplication) — replacing the Supabase `saved_events` table the prototype uses.

## Description

- Table: `saved_events(user_id, event_id, status, created_at, updated_at)` with a unique constraint on `(user_id, event_id)`.
- `PUT` is idempotent upsert: creating or switching status is the same call (mirrors the prototype's toggle semantics in `useSavedEvents`/`savedEvents.js`).
- `GET` returns saved records joined with full event data (single round-trip for the Calendar page), optionally filtered by `?status=`.
- `DELETE` removes the record (Calendar's dismiss X). Consider soft-delete for attended history — see Notes.
- All endpoints require auth; users can only touch their own records.

## Notes / Questions

- Past attended shows feed Passport stats (API-14) — hard-deleting a past "going" event would erase history. Recommend: `DELETE` hard-deletes only future events; past events get an `archived` flag instead. Confirm with product.
- Event references: internal event IDs per SPIKE-04. What happens if a saved event is cancelled upstream — keep the row with `status: past/cancelled` event state so the UI can badge it.
- Response should include per-status counts (`{"counts": {"going": 1, "wishlist": 2}}`) so Calendar tabs don't compute client-side across pages.

## Acceptance Criteria

- [ ] PUT creates a record, and a second PUT with the other status switches it in place — never two rows for one user+event.
- [ ] GET returns the user's saved events with embedded event objects and status counts; `?status=` filter works.
- [ ] DELETE removes (or archives, per decision) the record; other users' records are unreachable (403/404).
- [ ] Unauthenticated requests get 401.
- [ ] Concurrent toggles on the same event resolve consistently (last-write-wins, no constraint violation errors).
- [ ] OpenAPI documented; integration tests cover the upgrade/downgrade path.
