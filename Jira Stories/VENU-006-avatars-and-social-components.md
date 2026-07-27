# VENU-006 — Avatar, Avatar Stack & Friend Activity Row

**Suggested epic:** Foundation / Shared Components · **Depends on:** VENU-001 (profile routes) · **Wireframe ref:** `docs/screenshots/tab-home.png` (header avatar), `tab-profile.png`, `overlay-notifications.png` (social rows) · **Prototype ref:** `src/components/index.jsx` (`UserAvatar`, `FriendRow`)

## Purpose

Build the social identity primitives used everywhere a person appears: single avatars, overlapping avatar stacks, and the friend-activity sentence row. The technical list requires any person/account to be tappable into their profile from any page, so these must be global components with navigation built in.

## Description

- **Avatar** — renders a profile photo when available, otherwise a colored square (radius 2, per design system — not a circle) with the user's initial(s). Size variants (header ~30px, list ~40px, profile hero ~88px). Optional name label beside/below depending on context. Tapping navigates to that person's profile.
- **Avatar Stack** — overlapping avatars with a "+N" overflow indicator. Used on Profile (Crews) and the event bottom sheet (friends going). Must be global because the bottom sheet can open anywhere.
- **Friend Activity Row** — avatar + activity sentence with bolded subject/object ("**Maya** is going to **ACL Weekend 1**") + relative timestamp. Used on Home (friend activity feed) and Profile → Friends sub-page.

## Notes / Questions

- Initial-variant background colors should be deterministic (hash of user id → palette color) so a user's avatar is stable across sessions and surfaces.
- Design-system conflict to confirm: the tech list says "circle/square" and Profile "circular images" for favorite artists — `DESIGN_SYSTEM.md` bans circles ("50%"). The wireframes show squares; build squares unless design says otherwise.
- Friends data is mocked until the social graph lands (INTENT.md medium-term) — components take a `user` shape (id, name, avatarUrl) and don't care where it came from.
- Question: what does tapping your *own* avatar in the Home header do — Profile tab (per tech list "Navigate to Profile") — confirm it switches the tab rather than pushing a separate route.

## Acceptance Criteria

- [ ] Avatar renders photo or deterministic-color initial fallback at all size variants.
- [ ] Every avatar (user, friend, crew member, author) navigates to the corresponding profile on tap.
- [ ] Avatar Stack overlaps correctly, caps visible avatars (e.g., 3–4), and shows "+N" for the remainder.
- [ ] Friend Activity Row renders bolded subject/object within the sentence and a relative timestamp (e.g., "2h ago").
- [ ] Home-header avatar tap navigates to the Profile tab.
- [ ] All variants follow the radius-2 rule and render correctly against dark backgrounds.
