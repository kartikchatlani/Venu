# UI-26 — Calendar: Filtered Event List, Status Controls & Past Shows

**Type:** UI Story · **Epic:** Calendar · **Depends on:** UI-25 (month state), UI-05 (calendar card variant), UI-04 (filter pills), API-03 · **Refs:** `docs/screenshots/tab-calendar.png`

## Deliverable

The "My Shows" list: All/Going/Wishlist filter tabs with counts, date-grouped event cards with status badges and dismiss, wishlist↔going switching, past-shows section with attendance confirmation.

## Purpose

This is where saved intentions become a plan — everything the user hearted or committed to, grouped by date, with the controls to upgrade, dismiss, or confirm they went.

## Description

- **Filter tabs** — ALL / GOING / WISHLIST FilterPills with live counts (API-03's counts) filtering the list.
- **List** — grouped by date with Date Group Headers (FRI / 19 / JUN + status dot per wireframe); cards are UI-05's calendar variant (amber left border, ✓ GOING / ♡ WISHLIST badge, dismiss X); soonest first for the viewed month; responds to UI-25's date-tap scroll signal.
- **Status controls** — from the card or its sheet: toggle wishlist↔going (in-place upgrade via UI-08); dismiss X removes (future events; per API-03, past events archive).
- **Past shows** — "PAST SHOWS" divider + muted cards with PASSED badge; going-status past events prompt attendance ("Did you go?" → ✓ WENT badge via API-14) per the wireframe's PASSED/WENT distinction.
- **Empty state** — "NO UPCOMING SHOWS — EXPLORE TO FIND SOMETHING!" linking to Explore (wireframe copy).

## Notes / Questions

- Attendance prompt UX: inline on the passed card (YES/NO buttons) vs a periodic prompt sheet — recommend inline; product/design confirm. WENT feeds Passport (API-14) — this is the loop's start.
- Dismiss confirmation: silent for wishlist, confirm-dialog for going events (user committed)? Recommend that split.
- Month scoping: list shows viewed month only (grid-linked) or all upcoming? Wireframe suggests month-scoped with past below — confirm.

## Acceptance Criteria

- [ ] Tabs filter with correct live counts; counts update on any toggle/dismiss.
- [ ] List groups by venue-local date with wireframe-styled headers; date tap from the grid scrolls to the group.
- [ ] Status badge, amber border, and dismiss render per wireframe; dismiss removes/archives per API-03 semantics.
- [ ] Wishlist↔going switching updates card, badge, counts, and grid markers immediately.
- [ ] Past shows render muted with PASSED; confirming attendance flips to ✓ WENT and persists.
- [ ] Empty state renders with a working Explore link.
