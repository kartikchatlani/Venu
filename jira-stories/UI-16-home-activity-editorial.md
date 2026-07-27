# UI-16 — Home: Friend Activity & Editorial Sections

**Type:** UI Story · **Epic:** Home · **Depends on:** UI-09, UI-10, API-09 (articles), API-11 (activity; stub ok) · **Refs:** `docs/screenshots/tab-home-scroll.png`, `tab-home-bottom.png`; `src/pages/Home.jsx`

## Deliverable

Home's lower band: friend activity feed rows, "This Week in Austin" editorial section (with editor attribution), and the "Don't Miss" hero card.

## Purpose

Close the Home scroll with the social pulse (what friends are doing) and editorial curation that keeps the page feeling alive beyond listings.

## Description

- **Friend activity** — SectionHeader + up to ~4 `FriendActivityRow`s from the activity feed (API-11; mock service until live); "SEE ALL" → Profile/Friends page; section hidden when the user has no friends (no begging module — INTENT.md: social is a layer, not a requirement).
- **This Week in Austin** — SectionHeader with editor attribution (AuthorCredit under the header per tech list) + 2–3 standard `ArticleCard`s from the articles feed filtered to the weekly curation.
- **Don't Miss** — single hero-size `ArticleCard` (editorial pick), full-width at the bottom of the scroll.
- Article taps → reader (UI-24); event-linked cards → event sheet.

## Notes / Questions

- "This Week" curation flag: API-09's articles need a `weekly_pick`/category marker — align the contract (may just be `category=THIS_WEEK`).
- Don't Miss selection: featured flag from API-09 — confirm only one is featured at a time or take the latest.
- Section order in the full Home scroll (hero → Drop → Radar → Soundcheck → Your Shows → activity → This Week → Don't Miss?) — lock the final order with design; the three Home stories compose in one container.

## Acceptance Criteria

- [ ] Activity rows render real/mocked friend actions with working avatar and event tap-targets; section absent for friendless users.
- [ ] This Week renders curated articles with the editor attribution row per wireframe.
- [ ] Don't Miss renders the hero card and navigates to its article/event.
- [ ] All content flows through the shared cards (no local variants) and respects loading/empty states.
- [ ] Full Home page scroll order matches the design-approved sequence.
