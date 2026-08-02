# API-11 — Friends Endpoints (Search, Requests, List, Activity)

**Type:** API Story · **Epic:** Social · **Depends on:** API-04, API-05, API-06 (request notifications)

## Deliverable

The friend-graph API: `GET /api/v1/users/search?q=&by=name|username`, `POST /api/v1/me/friend-requests` / `POST .../friend-requests/{id}/accept|decline` / `DELETE .../friend-requests/{id}`, `GET /api/v1/me/friends`, `DELETE /api/v1/me/friends/{userId}`, `GET /api/v1/me/friend-activity` — powering UI-34/35 and "friends going".

## Purpose

Implement the mutual-friendship model (send/accept requests) that the Add Friends flow, friends list, activity feed, and event-sheet "friends going" all depend on.

## Description

- Tables: `friend_requests(id, from_user, to_user, status: pending|accepted|declined|cancelled, created_at)`, `friendships(user_a, user_b, created_at)` (canonical ordering, unique pair).
- Search: name/username lookup over users, excluding self; results include `friendStatus` (none/pending_out/pending_in/friends) so the UI renders ADD vs REQUESTED correctly.
- Request lifecycle: send (creates notification via API-06), cancel (sender), accept/decline (recipient); accept creates the friendship atomically and notifies the sender.
- Friend activity feed: recent friend events — X is going to E, X wishlisted E (sourced from saved-event writes), newest-first, paginated. Powers Home's activity section and the Friends page.
- "Friends going" helper: `GET /api/v1/events/{id}/friends` → the caller's friends with saved status for that event (bottom sheet avatar stack).

## Notes / Questions

- Contact sync and QR add flows: excluded here — contact-hash matching is its own privacy-sensitive story once product/legal confirm (UI-35 ships with those methods disabled or "coming soon"). QR resolves to a profile URL, so it may need no backend beyond API-05.
- Privacy: does saving an event automatically publish to friends' activity? Recommend yes for MVP with a future privacy toggle — but confirm with product (INTENT.md: "social as a layer, not a requirement").
- Blocking/reporting: not in scope; flag as a pre-public-launch requirement.

## Acceptance Criteria

- [ ] Search returns matching users with accurate `friendStatus` per caller.
- [ ] Full lifecycle works: send → notification → accept → both users see each other in friends lists; decline/cancel leave no friendship.
- [ ] Duplicate/reverse requests are handled (accepting an incoming instead of erroring on a mirror request).
- [ ] Activity feed returns friends' recent save/going actions, never non-friends'.
- [ ] Event-friends endpoint returns only the caller's friends for that event.
- [ ] Unfriending removes the relationship and both users' visibility into each other's activity; OpenAPI documented.
