# UI-29 — Profile: Passport & Badges

**Type:** UI Story · **Epic:** Profile & Passport · **Depends on:** UI-28 (page frame), API-14 · **Refs:** `docs/screenshots/tab-profile.png` ("Passport" / "2026 SEASON · EARNED BADGES")

## Deliverable

The Passport section on Profile: season stats grid, earned-badges grid with locked states, badge detail view, and Share Passport.

## Purpose

Gamified proof of scene life — shows/venues/festivals counts and collectible badges (5-SHOW STREAK, NIGHT OWL, FESTIVAL VET per wireframe) that reward going out.

## Description

- **Section** — SectionHeader ("Passport" / "FULL HISTORY →") + season label ("2026 SEASON · EARNED BADGES", Mono).
- **Stats Grid** — Shows / Venues / Festivals / Badges counts from API-14's passport endpoint (season scope).
- **Badges Grid** — earned badges as emoji-icon tiles with Mono labels per wireframe; locked badges rendered with padlock/dimmed treatment; grid from API-14's catalog + user badges.
- **Badge detail** — tap any badge → small sheet: icon, name, description, earned date (earned) or unlock criteria (locked).
- **Share Passport** — share util with a passport summary (link to public profile's passport section for MVP).
- **FULL HISTORY →** — stub route ("Full history coming soon" screen) — the complete show-history view is a future story; the link exists per wireframe.

## Notes / Questions

- Badge tile icons are emoji in the wireframe (🔥 🌙 ⭐ 🎪) — confirm emoji-as-icon is the intended production treatment (consistent cross-platform rendering varies) or design wants custom glyphs.
- Share Passport as an image (generated card) is the delightful version — out of MVP scope; link-share now, note the enhancement.
- New-badge celebration moment (toast/modal on unlock) — recommend a simple toast at MVP when a badge appears since last visit.

## Acceptance Criteria

- [ ] Passport section renders season stats and badge grid per wireframe, with earned and locked treatments.
- [ ] Counts and badges come live from API-14 and reflect newly confirmed attendance (UI-26 loop verified end-to-end).
- [ ] Badge tap opens detail with criteria (locked) or earned date (earned).
- [ ] Share Passport shares a working link; FULL HISTORY routes to the stub.
- [ ] Zero-state (new user: 0 stats, all locked) renders encouragingly, not broken.
