# VENU-015 — Calendar Page (My Shows)

**Suggested epic:** Pages · **Depends on:** VENU-003 (row cards), VENU-005 (saved-events store) · **Wireframe ref:** `docs/screenshots/tab-calendar.png` · **Prototype ref:** `src/pages/Calendar.jsx`

## Purpose

Build the "My Shows" tab — the user's personal show calendar where wishlist and going events live on a timeline, with month navigation, status filtering, and past-show history.

## Description

Per the wireframe and technical list:

- **Header** — "My Shows" title + subtitle ("YOUR SHOWS AT A GLANCE") + **Month Navigator** (◀ / "JUN 2026" / ▶; tapping the month opens a month/year picker).
- **Filter Tabs** — ALL / GOING / WISHLIST with live counts (VENU-002 filter pills with count badges).
- **Calendar Grid** — 7-column month layout with **date cell states**: default, today, going dot, wishlist circle/outline, empty. Includes a **Legend Row** explaining the markers. Tapping a marked date scrolls the list to that date's events.
- **Event list** — grouped by date with **Date Group Headers** (day-of-week, date number, month, status dot); event cards with amber left border, status badge (✓ GOING vs ♡ WISHLIST), and a dismiss **X** that removes the event from saved.
- **Status toggle** — from the calendar card, an event can move wishlist ↔ going (upgrades in place, VENU-005).
- **Past shows** — separated section ("PAST SHOWS") with muted styling and PASSED / ✓ WENT badges (wireframe shows both).
- Empty state: "NO UPCOMING SHOWS — EXPLORE TO FIND SOMETHING!" linking to Explore.

## Notes / Questions

- The wireframe's calendar grid isn't visible in the current screenshot (list-first layout) — confirm with design whether the grid is always visible, collapsible, or only in a month-picker context.
- PASSED vs ✓ WENT distinction: WENT appears to be a user-confirmed attendance state (feeds Passport stats, VENU-017). Is "did you go?" a prompt after the show date, or automatic for Going events? Product decision — recommend a lightweight post-show prompt since attendance powers Passport/badges.
- Dismissing (X) a past show: does it delete the record or just hide it from the list? Passport needs history — recommend hide/archive, never hard-delete attended shows.
- Timezone: date grouping must use the event's venue-local date, not UTC (a 00:30 UTC show is "tonight" in Austin).

## Acceptance Criteria

- [ ] Month navigator moves between months; month pill opens a month/year picker; the grid and list reflect the viewed month.
- [ ] Date cells render all five states correctly and the legend matches; tapping a marked date scrolls to that date group.
- [ ] Filter tabs show live counts and filter the list (ALL / GOING / WISHLIST).
- [ ] Event cards show amber left border, correct status badge, dismiss X, and open the bottom sheet on tap.
- [ ] Status toggle moves an event between wishlist and going in place; counts and grid markers update immediately.
- [ ] Past shows render in their own muted section with PASSED/WENT badges.
- [ ] Empty state renders with a working link to Explore.
