# API-14 — Passport, Attendance & Badges Endpoints

**Type:** API Story · **Epic:** Profile & Passport · **Depends on:** API-03 (saved events history), API-04

## Deliverable

`POST /api/v1/me/attendance/{eventId}` (confirm "I went"), `GET /api/v1/me/passport` (season stats: shows/venues/festivals/badges), `GET /api/v1/me/badges` + `GET /api/v1/badges` (catalog) — the data behind Profile's Passport section (UI-29).

## Purpose

Turn saved-event history into the Passport: confirmed attendance drives show/venue/festival counts and unlocks badges — the gamified identity layer INTENT.md describes.

## Description

- **Attendance:** past `going` events prompt "did you go?" (UI-26); this endpoint records confirmation (`attendance(user_id, event_id, attended: bool, confirmed_at)`). Only past events; going-status not strictly required (user could attend spontaneously — allow confirming any past event).
- **Passport:** aggregates per season (year): distinct shows attended, distinct venues, festivals, badges earned; plus all-time totals. Powers the stats grid and Profile stats row.
- **Badges:** `badges` catalog (id, name, icon, criteria_type, threshold, description) + `user_badges(user_id, badge_id, earned_at)`. Unlock evaluation runs server-side on attendance writes (e.g., 5-show streak, night owl = late shows, 3 venues in a month, festival vet). Wireframe examples: 5-SHOW STREAK, 3 STATES, NIGHT OWL, FESTIVAL VET + locked states.
- Locked badges appear in the catalog with criteria so the UI can render the locked grid.

## Notes / Questions

- Badge criteria engine: keep criteria simple/declarative (type + threshold) — resist a rules DSL at MVP. The initial badge set needs product sign-off; seed ~8–10.
- Retroactive computation: when this ships, existing attended events should trigger evaluation (one-off backfill job).
- "3 STATES" implies multi-city/state data on venues — TM venue data has state; ensure ingestion keeps it (SPIKE-04 note).
- Season boundary: calendar year assumed.

## Acceptance Criteria

- [ ] Confirming attendance is idempotent, only allowed for past events, and immediately reflected in passport aggregates.
- [ ] Passport endpoint returns correct season + all-time counts (distinct venue counting verified).
- [ ] Badge evaluation awards exactly-once on threshold crossing; catalog endpoint exposes locked badges with criteria text.
- [ ] Backfill job computes badges from pre-existing attendance.
- [ ] Profile stats row (API-05) counts update from this data.
- [ ] OpenAPI documented.
