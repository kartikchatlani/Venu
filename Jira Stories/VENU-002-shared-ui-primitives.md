# VENU-002 — Shared UI Primitives Library

**Suggested epic:** Foundation / Shared Components · **Depends on:** — · **Wireframe ref:** `docs/screenshots/tab-home.png`, `tab-explore.png` · **Prototype ref:** `src/components/index.jsx` (`SectionHeader`, `Chip`, `TagPill`, `MatchScore`), `src/theme.jsx`, `DESIGN_SYSTEM.md`

## Purpose

Extract the small, reused visual primitives into a single shared component library so pages compose from one source of truth instead of re-implementing styles. The technical list flags these as "build first" global components.

## Description

Build the following as standalone, prop-driven components with theme tokens from `src/theme.jsx`:

- **Section Header** — serif-italic title + right-aligned action link ("See All →", "View All", "Manage"). Used on Home, Explore, The Guide, Profile.
- **Genre Tag** — small cream label on event cards (Home, Explore).
- **Match Badge** — "🎵 X%" indicator (Home "On Your Radar", Explore "Festivals For You").
- **Price/Status Indicator** — renders one of: `From $X`, `TBA`, `Sold Out`, `Presale` with appropriate color treatment (amber for price, ember for urgency states).
- **Filter Pills (horizontal scroll)** — single-select chip row used for Explore genres, Guide categories, Calendar All/Going/Wishlist tabs, Add Friends search methods. Support an optional count badge per chip (Calendar needs "ALL 3 · GOING 1 · WISHLIST 2").
- **Segmented View Toggle** — two-option toggle (Explore Discover/Map), reusable for any dual-view context.
- **Search Bar** — input with search icon and clear affordance; used on Explore (events), Profile (friends), Add Friends sheet.

## Notes / Questions

- Naming clash: the technical list calls several of these "pills," but `DESIGN_SYSTEM.md` explicitly bans pill radii (16–30) — everything renders as radius-2 rectangles per the After Dark system (the wireframes confirm this). Keep the Jira names but build to the design system.
- All labels/metadata use JetBrains Mono, uppercase and letter-spaced; only form inputs (Search Bar) use Inter.
- Question: do we want Storybook (or similar) set up as part of this story so the team can develop/QA shared components in isolation? Recommended, but it's a scope add.
- The Filter Pills component needs to handle overflow with horizontal scroll and no visible scrollbar (see `HScroll` in the prototype).

## Acceptance Criteria

- [ ] Each primitive exists as an exported, documented component with props for content, active state, and callbacks — no page-local copies remain.
- [ ] Price/Status Indicator renders all four states with distinct, design-system-compliant treatments.
- [ ] Filter Pills support single-select state, optional per-pill counts, and horizontal overflow scrolling.
- [ ] Segmented Toggle animates/styles the active segment (amber) and fires a change callback.
- [ ] Search Bar exposes controlled value, clear button, and placeholder text per context.
- [ ] All components use theme tokens (no hardcoded hex values) and follow the borderRadius spec (cards 4, buttons/chips/tags 2).
- [ ] Components render correctly at 375px width (mobile baseline).
