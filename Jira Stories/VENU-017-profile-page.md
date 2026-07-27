# VENU-017 — Profile Page (Identity, Passport & Collections)

**Suggested epic:** Pages · **Depends on:** VENU-001, VENU-002, VENU-006 · **Wireframe ref:** `docs/screenshots/tab-profile.png` · **Prototype ref:** `src/pages/Profile.jsx`

## Purpose

Build the Profile tab — the user's music identity: who they are, where they've been (Passport + badges), what they love (favorite artists/venues), and what they've said (reviews). This is the largest single page; Crews and Friends split into VENU-018/019.

## Description

Top-to-bottom per the wireframe:

- **Profile Card** — customizable banner ("EDIT BANNER"), gold-framed avatar overlapping the banner, display name (Fraunces), @username, city, italic bio quote, EDIT PROFILE button. Display name derives from auth metadata (`full_name`) or email prefix — never hardcoded (existing convention in CLAUDE.md).
- **Stats Row** — SHOWS · VENUES · FRIENDS · REVIEWS with dividers (wireframe shows 4 stats; tech list says Friends/Reviews — build 4 per wireframe).
- **Passport** — Section Header ("Passport" + "FULL HISTORY →"), season label ("2026 SEASON · EARNED BADGES"), **Passport Stats Grid** (Shows / Venues / Festivals / Badges), and the **Earned Badges Grid** — emoji-icon badges with labels ("5-SHOW STREAK", "3 STATES", "NIGHT OWL", "FESTIVAL VET") plus locked states (padlock). Tapping a badge opens badge detail (name, criteria, earned date or how to unlock).
- **Favorite Artists** — images with "Seen Nx" labels; **Favorite Venues** — visit counts; both editable.
- **Photo Albums** — cover + photo-count chip, date, event association; upload flow.
- **Recent Reviews** — star rating + italic quote + associated event; write-new-review flow.
- **Share Profile / Share Passport** buttons (external share sheet).
- Settings gear in header opens settings (logout lives here; full settings screen can be a stub).

## Notes / Questions

- Passport data (shows/venues/festivals counts) derives from attended events — depends on the WENT confirmation decision in VENU-015. Badges need a criteria engine; MVP recommendation: compute badge unlocks server-side on attendance events, keep the catalog in the backend (VENU-020).
- "FULL HISTORY →" (Passport detail with full show history / city map per INTENT.md) — recommend stubbing the route in this story and splitting the full history view into its own ticket later; it's a page of its own.
- Photo uploads need storage (S3 on AWS) + moderation policy question for product. Reviews likewise (public content = moderation surface).
- Share Profile implies profiles are viewable by others — public profile URL scheme and privacy setting needed (who can see albums/reviews?). Backend + product question; MVP can share a read-only profile link.
- Favorite artists "circular images" in the tech list conflicts with the no-circles design rule — wireframe shows squares; build squares.

## Acceptance Criteria

- [ ] Profile card renders banner, overlapping avatar, name (derived, not hardcoded), username, city, bio, and working Edit Profile flow (name, bio, avatar, banner).
- [ ] Stats row shows live counts derived from real data (saved/attended events, friends, reviews).
- [ ] Passport section renders season stats grid and badge grid with earned + locked states; badge tap opens detail with unlock criteria.
- [ ] Favorite Artists/Venues render with seen/visit counts and support edit (add/remove).
- [ ] Photo album upload stores images and renders covers with count chips; reviews can be created with star rating + text + linked event.
- [ ] Share Profile and Share Passport trigger the external share sheet with a working link.
- [ ] Settings opens from the gear icon and includes working logout.
