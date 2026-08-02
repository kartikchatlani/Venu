# UI-25 — Calendar: Month Navigator, Grid & Legend

**Type:** UI Story · **Epic:** Calendar · **Depends on:** UI-02, UI-08 (saved state) · **Refs:** `docs/screenshots/tab-calendar.png`; `src/pages/Calendar.jsx`

## Deliverable

The calendar's date machinery: month navigator (arrows + month/year picker), the 7-column month grid with all date-cell states, and the legend row.

## Purpose

Give "My Shows" its calendar identity — a month view where going/wishlist dates are visible at a glance and tappable into the list (UI-26 builds the list).

## Description

- **Month Navigator** — ◀ / "JUN 2026" pill / ▶ in the header area per wireframe; tapping the pill opens a month/year picker (simple grid picker sheet); arrows step months.
- **Calendar Grid** — 7-column layout, weekday headers, correct month math (leading/trailing blanks); **date cell states:** default, today (outlined), going (amber dot), wishlist (outline circle/marker), both, empty-other-month. States derive from the saved-events store joined with event dates (venue-local dates — the UI-26/API-03 convention).
- **Legend Row** — explains the going/wishlist markers (Mono uppercase labels).
- Tapping a marked date signals the list (UI-26) to scroll to that date group; unmarked dates no-op.
- Grid ↔ list share the "viewed month" state in the Calendar container.

## Notes / Questions

- Wireframe screenshot shows a list-first layout without a visible grid — the tech list specifies the grid explicitly. Confirm with design: always-visible grid above the list, or collapsible? Build assuming always-visible, collapsible-cheap.
- Date math: use a tiny date lib (date-fns) rather than hand-rolling — sets the app's date convention; timezone rule: event's venue-local date.
- Marker for a date with both going and wishlist events: stacked markers or going-wins? Design call; default going-dot + wishlist-ring combined.

## Acceptance Criteria

- [ ] Navigator steps months correctly (incl. year boundaries); picker jumps to any month/year within a sensible range.
- [ ] Grid renders correct weeks for any month; today is highlighted only in the current month.
- [ ] Cells show going/wishlist/both markers matching the user's saved events for the viewed month, updating live on toggles.
- [ ] Legend matches the markers; date tap scrolls the list to that date (wired in UI-26, event fired here).
- [ ] Month state is shared with the list; switching months updates both.
