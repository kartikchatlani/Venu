# API-13 — Crew Polls & Photos Endpoints

**Type:** API Story · **Epic:** Social · **Depends on:** API-12, API-16 (photo uploads)

## Deliverable

Poll and photo functionality inside crews: `POST /api/v1/crews/{id}/polls`, `POST /api/v1/polls/{id}/votes`, `GET /api/v1/crews/{id}/polls`, plus `POST/GET /api/v1/crews/{id}/photos` — completing the crew detail screen (UI-33).

## Purpose

Give crews their coordination tools — "which night are we going?" polls and a shared photo grid — the features that make a crew more than a group chat pointer.

## Description

- **Polls:** `polls(id, crew_id, question, created_by, closes_at?, created_at)`, `poll_options(id, poll_id, label)`, `poll_votes(option_id, user_id)` (one vote per user per poll, changeable until close).
- Any member creates a poll (2–6 options); voting returns updated counts; results visible after voting (or to the creator always — see Questions).
- **Photos:** `crew_photos(id, crew_id, uploaded_by, s3_key, created_at)`; upload via API-16's presigned flow, then register here; grid endpoint paginates newest-first; uploader or admin can delete.
- All endpoints enforce crew membership.

## Notes / Questions

- Results visibility: hidden until the member votes (engagement) vs always visible — product call; default: visible after voting.
- Poll close semantics: manual close by creator, optional `closes_at`, or never? Recommend optional close time + creator close.
- Photo moderation: crew-private reduces risk, but deletion/reporting basics still needed — deletion in scope here, reporting flagged for pre-launch.
- Vote changes allowed until close — confirm.

## Acceptance Criteria

- [ ] Members create polls with options; non-members are rejected.
- [ ] One active vote per member per poll; re-voting switches the vote; counts are accurate under concurrent votes.
- [ ] Closed polls reject new votes and serve final results.
- [ ] Photo registration links an uploaded S3 object to the crew; grid returns paginated photos with uploader info.
- [ ] Uploader and admins can delete photos; others cannot.
- [ ] OpenAPI documented.
