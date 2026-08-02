# UI-07 — Event Bottom Sheet

**Type:** UI Story · **Epic:** Foundation · **Depends on:** UI-03, UI-06 (heart), UI-08 (toggles), UI-09 (avatar stack; can stub) · **Refs:** `docs/screenshots/overlay-bottom-sheet.png`; `src/components/EventBottomSheet.jsx`

## Deliverable

The global `<EventBottomSheet>` mounted once at shell level + a `useEventSheet()` hook (`openEventSheet(event)`) any component can call — the single event-detail surface for the whole app.

## Purpose

Every event tap in the app resolves to this sheet. Mounting it once at the shell (instead of the prototype's prop-threading from `App.jsx`) keeps pages decoupled and guarantees consistent behavior.

## Description

- Sheet content per wireframe/prototype: hero image with live/status badge, artist (Fraunces), openers, date/doors/venue block, GenreTag + PriceStatus, **Get Tickets** CTA (external link), WishlistHeart + Going toggle, Share button, "Friends going" AvatarStack (stub until API-11), Scout Tips section (API-09 data).
- Presentation: slides over the active page with scrim; dismiss via scrim tap, close button, drag-down; background scroll locked.
- State via context/store (`useEventSheet`), no props through pages.
- Share: Web Share API with copy-link fallback (link format depends on UI-01's `/events/:id` decision).

## Notes / Questions

- If `/events/:id` routing was approved (UI-01), the sheet should also open from a direct URL and update the URL when opened — confirm implementation here vs a follow-up story (recommend here; it's the natural place).
- Friends-going strip when empty: hide entirely (recommended) or show "Be the first" — design call.
- Openers/support acts parsing already exists in the prototype's Ticketmaster normalization — verify the API (API-01) preserves it.

## Acceptance Criteria

- [ ] `openEventSheet(event)` works from any component; exactly one sheet instance exists.
- [ ] All content blocks render per wireframe; missing data (no openers, no tips, no friends) collapses sections without gaps.
- [ ] Wishlist/Going toggle from the sheet updates cards on the page behind it (visible on dismiss).
- [ ] Get Tickets opens externally; Share shares/copies a working link.
- [ ] Dismiss works via scrim, button, and drag; background never scrolls while open.
- [ ] (If routed) direct `/events/:id` URL opens the sheet over the Home page.
