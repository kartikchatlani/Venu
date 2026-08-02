# API-05 — User Profile Endpoints

**Type:** API Story · **Epic:** Authentication · **Depends on:** API-04, API-16 (avatar/banner images — can stub URLs first)

## Deliverable

`GET /api/v1/me`, `PATCH /api/v1/me`, and `GET /api/v1/users/{id}` — own-profile read/update and public profile view, powering the Profile page, Edit Profile, and every tappable avatar.

## Purpose

Serve user identity (display name, username, avatar, banner, city, bio, member-since) from our backend, with a public variant that respects privacy for viewing other people's profiles.

## Description

- `GET /me`: full own profile including private fields (email) + stats block (shows/venues/friends/reviews counts — counts can be stubbed 0 until API-11/14/15 land).
- `PATCH /me`: partial update of displayName, username, bio, city, avatarUrl, bannerUrl. Username: unique, normalized (lowercase, allowed charset), availability errors return 409 with a clear message.
- `GET /users/{id}`: public projection (no email), used when tapping any avatar; includes public stats and whether the viewer is friends with them (`friendStatus` — stub until API-11).
- Validation: bio length cap, city restricted to supported list (Austin) for now.

## Notes / Questions

- Privacy model: are profiles public to all authenticated users at MVP, or friends-only for some sections (albums/reviews)? MVP recommendation: profile card + stats public, collections visible to friends — needs product confirmation (affects API-15 too).
- Username immutability/change-cooldown policy? Recommend changeable with 30-day cooldown, but product call.
- `city` will become a first-class entity for multi-city — store as code (`atx`) not free text.

## Acceptance Criteria

- [ ] GET /me returns the caller's profile with stats block; never another user's private fields.
- [ ] PATCH validates and persists each editable field; duplicate username returns 409; invalid fields 400 with field-level errors.
- [ ] GET /users/{id} returns the public projection for any user; unknown id → 404.
- [ ] Display name defaults (from provisioning) surface correctly until edited.
- [ ] OpenAPI documented; tests cover username uniqueness race (two simultaneous claims).
