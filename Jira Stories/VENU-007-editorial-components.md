# VENU-007 — Editorial Components (Article Card, Author Credit, Bookmark, Sponsored Card)

**Suggested epic:** Foundation / Shared Components · **Depends on:** VENU-002, VENU-006 (author avatar) · **Wireframe ref:** `docs/screenshots/tab-guide.png` · **Prototype ref:** `src/pages/Guide.jsx`, `src/pages/Home.jsx` (editorial sections)

## Purpose

Build the shared content/editorial components used by The Guide and Home's editorial sections ("This Week in [City]", "Don't Miss"), including the sponsored-content treatment required for disclosure compliance.

## Description

- **Article Card** — cover image, category tag, title (Fraunces), description (Inter), author row (avatar + name + role), read time, bookmark icon. Size variants: standard (Home, Guide lists) and hero/featured (Guide top slot — VENU-014 consumes it).
- **Author Avatar with Credit Line** — avatar + name + role (e.g., "Elena Ruiz — Austin Scene Editor"); composes VENU-006's Avatar.
- **Bookmark Icon Button** — toggle with persisted state; triggers the confirmation toast (VENU-005's toast). Usable on any long-form content.
- **Sponsored/Promoted Card** — visually distinct treatment with an explicit disclosure label ("SPONSORED" / "PROMOTED"). Used on The Guide (sponsored content) and Explore (promoted event). Tap-through must fire a tracking event with disclosure metadata.

## Notes / Questions

- Where do bookmarks persist? Recommend a `saved_articles` table/endpoint mirroring the `saved_events` pattern so the service layer stays symmetrical (coordinate with VENU-020).
- Read time: computed at publish time by the backend/CMS, or client-side from body length? Recommend backend so cards never need the full article body.
- Question: what CMS/source feeds articles for MVP — hand-authored JSON, Supabase table, or the future Java API? Cards should consume a stable `Article` model either way (id, title, description, cover, category, author, publishDate, readTime, linkedEventId?).
- Sponsored disclosure wording/placement may have legal requirements — flag to product before finalizing the label.

## Acceptance Criteria

- [ ] Article Card renders both size variants from one `Article` model, with category tag, author row, and read time.
- [ ] Bookmark toggles persist per user, survive reload, and fire the confirmation toast.
- [ ] Author credit line renders avatar + name + role and navigates to an author view (or is inert if authors have no profile — confirm with product).
- [ ] Sponsored/Promoted Card is visually distinct from organic cards and always displays the disclosure label.
- [ ] Tapping a sponsored card fires a tracking event including the sponsor metadata.
- [ ] Cards with a linked event open the event bottom sheet from the card's event CTA.
