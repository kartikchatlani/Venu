# API-07 — Drops (Presales) & Reminder Endpoints

**Type:** API Story · **Epic:** The Drop · **Depends on:** API-04, API-06 (notification creation)

## Deliverable

`GET /api/v1/drops?city=` returning curated presale drops (status, sale time, presale code, linked event) and `PUT/DELETE /api/v1/me/drops/{id}/reminder` for Remind Me — the backend for the Home Drop strip (UI-17).

## Purpose

Centralize presale intelligence — Venu's flagship feature — as structured data with reminder registration, replacing the hardcoded presale content in the prototype.

## Description

- Table: `drops(id, event_id, presale_name, code, sale_starts_at(tz-aware), sale_ends_at, ticket_url, status derived: upcoming|live|on_sale|ended, created_by)`.
- MVP content is editorially curated — include a minimal admin path for the team to insert/edit drops (protected admin endpoint or SQL runbook; see Questions).
- `GET /drops` returns active + upcoming drops for the city, with server-computed status and the linked Event object; codes included only for authenticated users.
- Reminder: `PUT .../reminder` registers, `DELETE` cancels; at T-minus-X (configurable, default 30 min) a `presale_alert` notification is created via API-06's service API (scheduled job; delivery channels per SPIKE-05 later).
- Code reveal tracking: log an event when a user copies/reveals a code (feeds engagement metrics).

## Notes / Questions

- Admin tooling scope: a real admin UI is its own story — MVP recommendation is a protected REST endpoint + Postman collection for the editorial team. Confirm who curates drops.
- Are presale codes ever per-user/limited? Assuming shared public-ish codes for MVP.
- Reminder lead time: fixed 30 min or user-selectable? Recommend fixed for MVP.
- Status must flip upcoming→live server-side based on `sale_starts_at` without a write (computed at read).

## Acceptance Criteria

- [ ] GET returns drops with correct computed status across timezone boundaries (test venue-local vs UTC).
- [ ] Presale codes appear only for authenticated callers.
- [ ] Registering a reminder is idempotent; canceling removes it; the scheduled job creates the notification at lead time (verifiable in test with a short lead).
- [ ] Admin insertion path exists and is locked to admin role.
- [ ] Drops with ended sales drop out of the feed automatically.
- [ ] OpenAPI documented.
