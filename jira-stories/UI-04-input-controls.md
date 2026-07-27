# UI-04 — Input Controls (Search Bar, Filter Pills, Segmented Toggle)

**Type:** UI Story · **Epic:** Foundation · **Depends on:** — · **Refs:** `docs/screenshots/tab-explore.png`, `tab-calendar.png`, `tab-guide.png`; `src/components/index.jsx` (`Chip`, `HScroll`)

## Deliverable

Three shared input components: `<SearchBar>`, `<FilterPills>` (horizontally scrolling single-select chip row, optional per-chip counts), `<SegmentedToggle>` — used across Explore, Guide, Calendar, Profile, and Add Friends.

## Purpose

Every filtering/search surface in the wireframes uses these three controls; building them once keeps interaction behavior (selection, scroll, clearing) identical app-wide.

## Description

- **SearchBar** — controlled input, search icon, clear (×) button when non-empty, Inter font for input text (design-system rule: inputs are Inter, not Mono), context placeholder ("Search artists or venues…").
- **FilterPills** — horizontal scroll row (no visible scrollbar), single-select, amber active state; optional count badge per pill (Calendar's "ALL 0 / GOING 0 / WISHLIST 0" in the wireframe); radius 2 per design system.
- **SegmentedToggle** — two segments in a bordered track (DISCOVER / MAP per wireframe), full-width, amber active segment.
- All three: keyboard accessible, `.pressable` active feedback, no hover states.

## Notes / Questions

- FilterPills multi-select variant needed anywhere? Tech list implies single-select everywhere — build single-select only (YAGNI).
- Debounce lives with consumers, not in SearchBar — document that contract.
- SegmentedToggle: support >2 segments now or exactly 2? Wireframes only show 2; build 2-n cheaply if trivial, else 2.

## Acceptance Criteria

- [ ] SearchBar: typing fires onChange, clear button empties and refocuses, matches wireframe styling.
- [ ] FilterPills: selection state renders amber, scrolls horizontally without a scrollbar, count badges render when provided.
- [ ] SegmentedToggle: active segment styled per wireframe, change callback fires, works with keyboard.
- [ ] All controls usable at 375px with touch-target sizes ≥44px.
- [ ] Reused (not copied) by at least the Explore mock page in review.
