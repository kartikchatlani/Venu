# UI-03 — Display Primitives (Section Header, Genre Tag, Match Badge, Price/Status)

**Type:** UI Story · **Epic:** Foundation · **Depends on:** — · **Refs:** `docs/screenshots/tab-home.png`, `tab-explore.png`; `src/components/index.jsx` (`SectionHeader`, `TagPill`, `MatchScore`)

## Deliverable

Four small shared components in the component library: `<SectionHeader>`, `<GenreTag>`, `<MatchBadge>`, `<PriceStatus>` — the labels and badges every card story composes from.

## Purpose

These four appear on nearly every surface; extracting them first means the card and page stories never re-implement a label style.

## Description

- **SectionHeader** — Fraunces italic title + optional right action link ("SEE ALL →", "MANAGE") in Mono uppercase with arrow; link is a router link or callback.
- **GenreTag** — small cream label (radius 2 despite the "pill" name — design-system rule), Mono uppercase.
- **MatchBadge** — "♫ 91%" indicator (wireframe shows music-note glyph + percent); renders nothing when match data is absent (scores are mocked until the taste engine exists).
- **PriceStatus** — one component, four states: `From $X` (amber), `TBA` (faded), `Sold Out` (faded/struck), `Presale` (ember) — states from the tech list.

## Notes / Questions

- Exact match-badge glyph: wireframe uses ♫, tech list writes 🎵 — pick one with design (recommend the ♫ text glyph for font-consistency).
- Should PriceStatus also handle "FREE"? Austin has free shows; recommend yes, treat as price variant.

## Acceptance Criteria

- [ ] All four components render pixel-consistent with the wireframes at their usage sites (verified against Home + Explore screenshots).
- [ ] PriceStatus renders all states from a single `status`/`price` prop contract with correct colors.
- [ ] MatchBadge is absent from the DOM when no score is provided.
- [ ] SectionHeader action link navigates (router) or calls back, and is omitted cleanly when not passed.
- [ ] No hardcoded colors — theme tokens only; radius-2 compliance.
