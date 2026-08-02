# UI-09 — Avatar, Avatar Stack & Friend Activity Row

**Type:** UI Story · **Epic:** Foundation · **Depends on:** UI-01 (profile routes) · **Refs:** `docs/screenshots/tab-home.png` (header avatar), `tab-profile.png`, `overlay-notifications.png`; `src/components/index.jsx` (`UserAvatar`, `FriendRow`)

## Deliverable

Three shared social components: `<Avatar>` (photo or deterministic-color initials, size variants, taps to profile), `<AvatarStack>` (overlapping with "+N"), `<FriendActivityRow>` (avatar + bolded activity sentence + timestamp).

## Purpose

People appear on nearly every surface, and the tech list requires any account to be clickable to its profile from anywhere — so avatars must be one component with navigation built in, not per-page images.

## Description

- **Avatar** — photo, else colored square (radius 2, no circles) with initial(s); background color deterministic from user id; sizes: sm (~30, header/rows), md (~40, lists), lg (~88, profile hero); optional name label; tap navigates to `/users/:id` (own avatar → `/profile`).
- **AvatarStack** — overlap with cap (show 3–4, then "+N"); used by crews and the bottom sheet's friends-going strip.
- **FriendActivityRow** — Avatar + sentence with bolded subject/object ("**Maya** is going to **ACL Weekend 1**") + relative time ("2h ago"); tap targets: avatar → profile, event name → event sheet.
- Relative-time formatting as a shared util (also used by notifications).

## Notes / Questions

- Author avatars (Guide) reuse `<Avatar>` but authors may not have profiles — support a non-navigating mode.
- Deterministic palette: pick 6–8 theme-compatible colors with design so initials stay readable on dark.
- Own-avatar tap behavior confirmed as Profile tab switch (per tech list "Navigate to Profile").

## Acceptance Criteria

- [ ] Avatar renders photo/initials at all sizes; the same user always gets the same fallback color.
- [ ] Avatar tap navigates to the right profile everywhere it's used; non-navigating mode works for authors.
- [ ] AvatarStack overlaps correctly and renders "+N" for overflow at various counts (0, 1, 4, 12).
- [ ] FriendActivityRow bolds subject/object, shows relative time, and both tap targets navigate correctly.
- [ ] All variants meet contrast requirements on the dark background.
