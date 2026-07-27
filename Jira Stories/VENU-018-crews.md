# VENU-018 — Crews (Group Coordination)

**Suggested epic:** Social · **Depends on:** VENU-006 (avatar stack), VENU-017 (Profile page hosts the section), VENU-020 (backend) · **Wireframe ref:** Profile section (below visible area of `tab-profile.png`) · **Prototype ref:** `src/pages/Profile.jsx` (Crews section), `INTENT.md` (Crews feature)

## Purpose

Build Crews — persistent friend groups for coordinating shows. Per INTENT.md, each crew ties the social layer to actual events: a roster with RSVP status, tracked events, polls, photos, and a shared playlist. This is the app's stickiest social surface.

## Description

- **Crew Card** (on Profile) — cover photo, crew name, member Avatar Stack, chips summarizing activity (polls, lineup, photos), and a linked upcoming event.
- **Create New Crew Button** — dashed-outline card variant; creation flow: name, cover photo, invite members.
- **Crew detail view** — roster with per-member RSVP status for tracked events, upcoming events the crew is tracking, activity feed, **polls** (create, vote, see results), photo grid, and linked group playlist (Spotify / Apple Music / YouTube URL).
- **Management** — create, edit (name/cover), invite members, leave crew. Invites flow through friends (VENU-019).
- Voting in polls updates results live for other members (or on next refresh — see Questions).

## Notes / Questions

- Scope check: this is the largest net-new backend surface (crews, memberships, polls, votes, crew events, photos). If it doesn't fit a sprint, split into 18a (crew CRUD + card + roster) and 18b (polls, photos, playlist) — the card and roster deliver visible value alone.
- Poll "live" results: websockets are overkill for MVP — refetch on open/focus is fine. Confirm expectation with product.
- Crew photos share the S3 storage + moderation questions from VENU-017's albums.
- Permissions model: can any member invite, or only the creator/admin? Who can edit the crew or delete polls? Needs a product decision — recommend creator-as-admin, any member invites, for MVP.
- Playlist link is just a stored URL (no API integration) for MVP — confirm.

## Acceptance Criteria

- [ ] Profile shows crew cards with cover, name, member stack, activity chips, and linked event; plus the dashed create-new card.
- [ ] Creating a crew (name, cover, invites) works end-to-end and appears for all invited members.
- [ ] Crew detail shows the roster with RSVP status per tracked event and the crew's upcoming events (tap → event bottom sheet).
- [ ] Members can create polls, vote once per poll, and see result counts after voting.
- [ ] Photos can be added to the crew grid; playlist link renders and opens externally.
- [ ] Edit (admin), invite (members), and leave flows work; leaving removes the crew from the leaver's profile.
