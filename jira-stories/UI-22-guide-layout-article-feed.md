# UI-22 — The Guide: Layout, Category Tabs & Article Feed

**Type:** UI Story · **Epic:** The Guide · **Depends on:** UI-02, UI-04, UI-10, API-09 · **Refs:** `docs/screenshots/tab-guide.png`; `src/pages/Guide.jsx`

## Deliverable

The Guide page frame and its article content: header with bell, category filter pills, the featured (hero) article, sponsored slot, and the "More to Read" list.

## Purpose

Assemble the editorial tab's reading surface from the shared editorial components, driven by the articles API — the Spotlight/Signal bands land separately in UI-23.

## Description

- **Header** — "The Guide" (Fraunces) + "STORIES · SPOTLIGHTS · SIGNALS" subtitle (Mono) + NotifBell per wireframe.
- **Category FilterPills** — FOR YOU / SCENE REPORTS / SPOTLIGHTS / … from API-09's category set; selection filters the feed below (FOR YOU = personalized/recency ordering per API contract).
- **Featured Article** — hero `ArticleCard` (top item flagged featured by the API) with category tag, italic description, author credit, read time, bookmark — per wireframe.
- **Sponsored Content slot** — `SponsoredCard` in-feed placement with disclosure.
- **More to Read** — standard `ArticleCard` list, paginated/load-more from the feed.
- Article taps → reader (UI-24); bookmark toggles with toast; pull-to-refresh.

## Notes / Questions

- Tab-switch behavior for featured: does each category have its own featured item, or only FOR YOU? Align with API-09's `featured` semantics — recommend featured only on FOR YOU, plain lists elsewhere.
- Read-state styling: do read articles render dimmed in lists (helps "what's new"), per "mark as read" existing in the tech list? Recommend subtle read-dim; confirm with design.

## Acceptance Criteria

- [ ] Page matches the wireframe: header, pills, hero article with all metadata, sponsored slot, More to Read.
- [ ] Category selection refetches/filters the feed; FOR YOU ordering comes from the API untouched.
- [ ] Bookmarks toggle with toast and persist; read articles render their read state.
- [ ] Sponsored slot always carries disclosure and tracking.
- [ ] Loading skeletons and per-category empty states render.
- [ ] Pull-to-refresh (or refresh affordance per platform decision) refetches the active category.
