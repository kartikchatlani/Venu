# UI-24 — Article Reader Screen

**Type:** UI Story · **Epic:** The Guide · **Depends on:** UI-02 (back header), UI-10 (author credit, bookmark), API-09 · **Refs:** typography rules in `DESIGN_SYSTEM.md` (Inter for body prose)

## Deliverable

A full-screen article reading route (`/articles/:id`): cover, title, author, body, linked-event CTA, bookmark and share — the destination for every article card tap.

## Purpose

The Guide and Home editorial cards need somewhere to go; this is the app's long-form reading surface, and opening it is what marks an article read (feeding view history and FOR YOU).

## Description

- Route with back-arrow PageHeader; content: cover image, category tag, title (Fraunces display), AuthorCredit + publish date + read time, body (Inter prose — the design system's only body-prose context), optional linked-event CTA block (opens event sheet).
- On open: `POST /articles/{id}/read` (API-09) + view tracking (API-17 batch).
- Bookmark button in header/footer (state shared with cards); Share (same share util as events).
- Body rendering: articles come as structured/markdown content from API-09 — render headings, paragraphs, images, pull quotes minimally; no arbitrary HTML injection (sanitize).
- Reading experience: comfortable line length/leading per design system; scroll progress is a nice-to-have (skip MVP).

## Notes / Questions

- Body format contract with API-09 (markdown vs structured blocks) — decide together before either side builds; recommend markdown with a whitelist renderer.
- Deep-linkable and shareable → confirm this route is public-shell (still behind auth wall at MVP; public marketing pages later?).
- Inline images in body need dimensions/aspect data to avoid layout shift — add to the content contract.

## Acceptance Criteria

- [ ] Any article card opens the reader with full content rendered per typography rules.
- [ ] Opening marks the article read (persisted) and records a view event.
- [ ] Bookmark and share work from the reader; bookmark state matches the card the user came from.
- [ ] Linked-event articles show the event CTA; tapping opens the event sheet over the reader.
- [ ] Body content is sanitized; malformed content degrades to plain text, never breaks the page.
- [ ] Back returns to the exact scroll position in the feed the user left.
