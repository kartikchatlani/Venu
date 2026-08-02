# UI-28 — Profile: Profile Card, Stats Row, Edit & Share

**Type:** UI Story · **Epic:** Profile & Passport · **Depends on:** UI-02, UI-09, API-05, API-16 (uploads) · **Refs:** `docs/screenshots/tab-profile.png`; `src/pages/Profile.jsx`

## Deliverable

The top of the Profile tab: banner + avatar profile card, stats row, Edit Profile flow (with image uploads), settings entry, and Share Profile — plus the public read-only profile view other users see.

## Purpose

The user's identity card — customizable banner (INTENT.md: "like LinkedIn"), name/username/city/bio — and the stats that summarize their scene life; doubles as the public profile every avatar tap lands on.

## Description

- **Profile Card** — banner image with "📷 EDIT BANNER" (own profile), gold-framed lg Avatar overlapping the banner, display name (Fraunces), @username (amber Mono), city, italic bio quote, EDIT PROFILE button — per wireframe.
- **Stats Row** — SHOWS / VENUES / FRIENDS / REVIEWS with dividers (wireframe's four), from API-05's stats block; taps navigate where sensible (FRIENDS → Friends page).
- **Edit Profile** — sheet/screen editing display name, username (availability feedback from API's 409), bio, city, avatar + banner (API-16 presigned upload flow); optimistic preview, save/cancel.
- **Public view** — same layout at `/users/:id` minus edit affordances, using API-05's public projection; header shows back arrow instead of settings gear.
- **Share Profile** — share util with the public profile URL.
- Settings gear → settings screen stub containing working Logout (UI-13).

## Notes / Questions

- Bio quote styling: wireframe wraps it in quotes — decide if quotes are auto-applied styling or user-typed (recommend styling, strip user quotes).
- Banner defaults: themed texture placeholder until user uploads (wireframe shows the diagonal texture).
- Username edit cooldown surfacing (per API-05 policy) — show "changeable again on X" copy when locked.

## Acceptance Criteria

- [ ] Own profile renders per wireframe: banner, overlapping gold-framed avatar, name/username/city/bio, edit affordances.
- [ ] Edit flow saves each field with validation errors surfaced inline (username conflicts show a clear message); avatar/banner upload end-to-end via presigned URLs.
- [ ] Stats row shows live counts; FRIENDS navigates to the Friends page.
- [ ] `/users/:id` renders the read-only public variant with correct data and no edit controls.
- [ ] Share Profile shares/copies a URL that opens that public view.
- [ ] Settings opens with a working logout.
