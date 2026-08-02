# UI-05 — Event Card: Row Variant

**Type:** UI Story · **Epic:** Foundation · **Depends on:** UI-03, UI-08 (heart state; can stub) · **Refs:** `docs/screenshots/tab-explore.png` ("Tonight in Austin"), `tab-calendar.png` (list cards)

## Deliverable

A shared `<EventCardRow>` component — thumbnail + artist + venue/time metadata + trailing heart or chevron — used by Explore "Tonight in", Home "Your Shows", and the Calendar list.

## Purpose

The horizontal event row is the app's most repeated event display; one component with slots for its per-page differences (trailing control, status accents) prevents three diverging copies.

## Description

- Layout per wireframe: square thumbnail (radius 4), artist name in Fraunces, "VENUE · TIME" metadata line in Mono uppercase faded, trailing slot (wishlist heart, chevron, or dismiss X for Calendar).
- Calendar variant needs: amber left border, status badge (✓ GOING / ♡ WISHLIST), muted "passed" styling — expose as props/variant, not a fork (UI-26 consumes).
- Card tap opens the event bottom sheet (via UI-07's `openEventSheet`); trailing-control taps do not propagate to the card.
- Image fallback (ink block) and text truncation (artist 1 line, meta 1 line).

## Notes / Questions

- One flexible component vs base + Calendar wrapper: recommend base card + thin `<CalendarEventCard>` wrapper so the base stays simple.
- Skeleton loading state included here or in the section stories? Include a `loading` skeleton variant here — every consumer needs it.

## Acceptance Criteria

- [ ] Renders artist/venue/time from the normalized Event model, matching the Explore wireframe.
- [ ] Trailing slot supports heart (toggle state), chevron, and dismiss X; their taps don't open the sheet.
- [ ] Calendar variant renders amber border, status badge, and passed styling via props.
- [ ] Missing images fall back cleanly; long text truncates without layout shift.
- [ ] Skeleton variant renders for loading lists.
- [ ] Card tap invokes the shared open-event-sheet function.
