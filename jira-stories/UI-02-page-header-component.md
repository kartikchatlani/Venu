# UI-02 — Page Header Component

**Type:** UI Story · **Epic:** Foundation · **Depends on:** UI-01 · **Refs:** `docs/screenshots/tab-home.png`, `tab-explore.png`, `tab-guide.png`, `tab-calendar.png`

## Deliverable

A shared `<PageHeader>` component: serif-italic title + contextual right-side slot (notification bell / settings gear / city pill / back arrow), used by every page.

## Purpose

Every page opens with the same header pattern in the wireframes — one component keeps typography and spacing identical and gives sub-pages a consistent back affordance.

## Description

- Title in Fraunces italic at display size (per DESIGN_SYSTEM.md), optional subtitle line in JetBrains Mono uppercase (e.g., "STORIES · SPOTLIGHTS · SIGNALS", "YOUR SHOWS AT A GLANCE").
- Right-slot variants: notification bell (UI-11's component drops in), settings gear, city pill ("◎ AUSTIN, TX · CHANGE CITY"), back arrow, or custom node — pass-a-slot API rather than an enum, with the four standard elements exported.
- Left-side variants seen in wireframes: Home uses a location marker row above the title ("● AUSTIN, TX"); Calendar pairs the title with the month navigator — the component must allow a secondary row without forking.
- Back arrow integrates with router history (falls back to parent route if no history).

## Notes / Questions

- Home's header (location + bell + avatar row, then "Tonight." title) is the most different — confirm it composes from this component or is a documented exception.
- Sticky vs scroll-away header on long pages? Wireframes suggest scroll-away; confirm with design.

## Acceptance Criteria

- [ ] Header renders title/subtitle with correct type treatment on all five pages.
- [ ] All four standard right-slot elements render and fire callbacks; custom slot works.
- [ ] Back variant navigates to the logical parent on deep-linked entry (no history).
- [ ] Spacing/typography match wireframes at 375px.
- [ ] Component documented with usage examples for page teams.
