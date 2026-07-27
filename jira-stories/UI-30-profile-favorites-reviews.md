# UI-30 — Profile: Favorite Artists/Venues & Reviews

**Type:** UI Story · **Epic:** Profile & Passport · **Depends on:** UI-28, API-15 · **Refs:** `docs/screenshots/tab-profile.png` (sections below fold); tech list Profile components

## Deliverable

Three Profile sections: Favorite Artists (with "Seen Nx"), Favorite Venues (visit counts), and Recent Reviews (star rating + italic quote) — with edit flows and the write-review flow.

## Purpose

The taste-and-opinions half of the profile: what the user loves and what they thought — content that makes profiles worth visiting and feeds future personalization.

## Description

- **Favorite Artists** — SectionHeader + horizontal strip: artist image tiles (square, radius 2 — not circular, design rule) with name + "SEEN 3X" (Mono, from API-15's enriched counts); edit mode (Manage link) to add/remove artists (search from the artists data).
- **Favorite Venues** — same pattern with venue tiles + "VISITED 5X".
- **Recent Reviews** — review cards: star rating (1–5), italic quote (Fraunces italic per wireframe convention), linked event line; latest ~3 with count; **Write a Review** flow: pick from attended events (API-15's eligibility), rate, write, submit.
- Public visibility on `/users/:id` per the API-05 privacy decision (friends-only sections render a lock note for non-friends).
- All lists have tasteful empty states prompting the action ("No favorites yet — add artists you love").

## Notes / Questions

- Artist search for favorites: needs an artist lookup (API-02's future artist groups or a simple `/artists?q=`) — if unavailable at build time, MVP fallback: favorite from event history artists only. Coordinate with backend.
- Review editing UX: allow edit/delete from own profile (API-15 supports) — include.
- Star input: whole stars only (API contract) — tap-to-set, no half stars.

## Acceptance Criteria

- [ ] Favorites strips render with enriched seen/visited counts and follow the square-tile design rule.
- [ ] Add/remove favorites persists and updates immediately; empty states render.
- [ ] Reviews section shows latest reviews with stars, italic quote, and event link (tap → event sheet).
- [ ] Write-review flow enforces eligibility, validates rating + text, and the new review appears on submit.
- [ ] Own reviews can be edited/deleted; public view respects the privacy decision.
