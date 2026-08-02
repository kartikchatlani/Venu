# UI-33 — Crew Detail: Roster, Events, Polls & Photos

**Type:** UI Story · **Epic:** Social · **Depends on:** UI-32, API-12, API-13 · **Refs:** `INTENT.md` Crews (roster w/ RSVP, tracked events, polls, photo grid, playlist)

## Deliverable

The crew detail screen (`/crews/:id`): cover header, member roster with RSVP status, tracked events, polls (create + vote + results), photo grid, playlist link, and crew management actions.

## Purpose

The working surface of a crew — where the group decides which show, sees who's in, and keeps shared photos — turning Venu from personal tracker into group tool.

## Description

- **Header** — cover photo, crew name, member count; admin: edit (name/cover/playlist); member: leave.
- **Roster** — member rows (Avatar + name; profiles tappable) with per-tracked-event RSVP marks (✓ going / ♡ wishlist / — none) from API-12's RSVP matrix.
- **Tracked events** — event rows (UI-05) the crew follows; members add events (search/pick); tap → event sheet.
- **Polls** — poll cards: question, options with vote counts (after voting per API-13 rules), your-vote highlight, closed state; create-poll flow (question + 2–6 options, optional close time).
- **Photo grid** — API-13 photos with add (upload via API-16) and delete (own/admin); lightbox reuse from UI-31.
- **Playlist link** — chip opening the stored URL externally (Spotify/Apple/YouTube).
- Invite more members (friends multi-select) for any member per the permission model.

## Notes / Questions

- Screen is dense — design doesn't exist beyond the tech list's description. **Request a wireframe for this screen before build**; sections are clear but layout/order is not.
- RSVP matrix display for crews tracking many events: default to the next upcoming event's RSVPs with a per-event switcher.
- Activity feed (INTENT.md mentions one): defer — polls/photos/roster are MVP; note as follow-up.

## Acceptance Criteria

- [ ] Detail renders roster (tappable profiles) with accurate RSVP marks against tracked events.
- [ ] Members add/remove tracked events; event taps open the sheet.
- [ ] Poll lifecycle works: create, vote (switch until close), results per visibility rule, closed rendering.
- [ ] Photos add/delete with permissions enforced; lightbox works.
- [ ] Admin edit and member leave flows work per API-12 rules (incl. last-admin succession).
- [ ] Non-members cannot access the route (redirect + message on 404).
