# API-12 — Crews Endpoints (CRUD & Membership)

**Type:** API Story · **Epic:** Social · **Depends on:** API-11 (friends for invites), API-16 (cover photos — can stub)

## Deliverable

Crew management API: `POST /api/v1/crews`, `GET /api/v1/me/crews`, `GET /api/v1/crews/{id}`, `PATCH /api/v1/crews/{id}`, `POST /api/v1/crews/{id}/invites`, `POST /api/v1/crews/{id}/leave` — the backbone for UI-32/33 (polls & photos come in API-13).

## Purpose

Create the crew entity — persistent friend groups with a roster, linked events, and admin rules — as the foundation the richer crew features (polls, photos, playlist) attach to.

## Description

- Tables: `crews(id, name, cover_url, playlist_url?, created_by, created_at)`, `crew_members(crew_id, user_id, role: admin|member, joined_at)`, `crew_events(crew_id, event_id, added_by)`, `crew_invites(crew_id, from_user, to_user, status)`.
- Create: name + optional cover; creator becomes admin.
- Detail: roster with roles, tracked events (embedded event objects + each member's going/wishlist status for those events — the RSVP view), playlist URL.
- Invites: members invite friends only; invite → notification → accept joins. Admin can edit crew (PATCH name/cover/playlist) and add/remove tracked events.
- Leave: member exits; if the last admin leaves, promote oldest member (or delete crew if empty).

## Notes / Questions

- Permission model per earlier product note: creator-as-admin, any member invites — confirm.
- Crew size cap (avatar stacks and polls assume smallish groups)? Suggest 20 for MVP.
- Can one event be tracked by multiple crews the user belongs to? Yes — no constraint needed, but the Calendar/UI doesn't currently show crew context; note for design.
- Playlist URL is a plain validated URL (Spotify/Apple/YouTube) — no API integration at MVP.

## Acceptance Criteria

- [ ] Create/read/update flows work with role enforcement (only admins PATCH; only members read detail).
- [ ] Invite lifecycle: invite friend → notification → accept → appears in roster; non-friends cannot be invited.
- [ ] Crew detail includes tracked events with per-member saved-status (RSVP matrix).
- [ ] Leave works, last-admin succession behaves as specified, empty crews are cleaned up.
- [ ] Users cannot see crews they're not members of (404, not 403 leak).
- [ ] OpenAPI documented with seed data for UI development.
