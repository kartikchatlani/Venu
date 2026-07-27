# UI-10 — Editorial Cards (Article, Author Credit, Bookmark, Sponsored)

**Type:** UI Story · **Epic:** Foundation · **Depends on:** UI-03, UI-08 (toast), UI-09 (avatar) · **Refs:** `docs/screenshots/tab-guide.png`, `tab-explore.png` (promoted card)

## Deliverable

Shared editorial components: `<ArticleCard>` (standard + hero sizes), `<AuthorCredit>`, `<BookmarkButton>`, `<SponsoredCard>` wrapper with disclosure label — consumed by The Guide (UI-22/23) and Home's editorial sections (UI-16).

## Purpose

Editorial content appears on two tabs; shared cards keep The Guide and Home visually identical and put the sponsored-disclosure treatment in exactly one place.

## Description

- **ArticleCard** — cover image, category tag ("SCENE REPORT"), title (Fraunces), italic description, AuthorCredit row, read time, BookmarkButton; hero size per the Guide's featured slot, standard size for lists ("More to Read", Home).
- **AuthorCredit** — Avatar (non-navigating mode ok) + name + role in Mono uppercase ("ELENA RUIZ / AUSTIN SCENE EDITOR").
- **BookmarkButton** — toggle icon, persists via the articles service (API-09; stub allowed), success toast on toggle.
- **SponsoredCard** — wrapper applying distinct treatment (diagonal-texture background per wireframes) + mandatory "SPONSORED"/"PROMOTED" label + tap tracking callback; wraps article or event content (Explore's promoted event uses it in UI-20).
- Card tap → article reader (UI-24) or linked event sheet.

## Notes / Questions

- Disclosure label copy ("SPONSORED" vs "PROMOTED" vs "PAID") — one ruling from product/legal, applied here only.
- Bookmark state store: mirror UI-08's pattern (small `useBookmarks` hook) — include in this story.
- Hero card image ratio: fix a ratio (16:10?) with design so covers are cropped consistently.

## Acceptance Criteria

- [ ] ArticleCard renders both sizes per wireframe with category, author, read time, bookmark.
- [ ] Bookmark toggles optimistically with toast, persists, and syncs across surfaces showing the same article.
- [ ] SponsoredCard always displays the disclosure label and fires its tracking callback on tap — impossible to render without the label.
- [ ] Cards navigate correctly (reader vs event sheet for event-linked content).
- [ ] Missing cover images and long titles degrade gracefully.
