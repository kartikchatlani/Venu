# API-06 — Notifications Endpoints

**Type:** API Story · **Epic:** Notifications · **Depends on:** API-04

## Deliverable

`GET /api/v1/me/notifications`, `POST /api/v1/me/notifications/{id}/read`, `POST /api/v1/me/notifications/read-all` — the data source for the bell badge and notifications panel (UI-11).

## Purpose

Store and serve per-user notifications (show reminders, presale alerts, friend activity, new matches) with read/unread state, so the in-app panel reflects reality across devices.

## Description

- Table: `notifications(id, user_id, type, title, body, target_type, target_id, read_at, created_at)`.
- Types from the wireframe: `show_reminder`, `friend_going`, `presale_alert`, `new_match`, `friend_wishlisted`, `week_ahead`. `target_*` lets the client deep-link (event sheet, profile).
- `GET` returns newest-first, paginated (cursor), with `unreadCount` in the envelope; default window 30 days.
- Read endpoints set `read_at`; read-all is a single bulk update.
- Internal creation API (service-layer, not public REST) that other domains call when they generate notifications (API-07 reminders, API-11 friend activity).

## Notes / Questions

- Delivery beyond in-app (push/email) is SPIKE-05's scope — this story is storage + retrieval only, but the schema should carry a `delivered_channels` field so it extends cleanly.
- Should `GET` auto-mark fetched items read? No — wireframe has explicit unread dots + "MARK ALL READ"; keep explicit.
- Retention/cleanup job for notifications older than 90 days?

## Acceptance Criteria

- [ ] GET returns the caller's notifications newest-first with pagination and correct `unreadCount`.
- [ ] Marking one/all read persists and is reflected in subsequent fetches.
- [ ] Each type serializes with the target reference the client needs to deep-link.
- [ ] Users cannot read or mutate another user's notifications.
- [ ] Service-layer creation API exists with tests (used by at least one seeded example per type).
- [ ] OpenAPI documented.
