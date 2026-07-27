# VENU-004 — Event Bottom Sheet (Global Event Detail)

**Suggested epic:** Foundation / Shared Components · **Depends on:** VENU-002, VENU-005 (wishlist/going), VENU-006 (avatar stack) · **Wireframe ref:** `docs/screenshots/overlay-bottom-sheet.png` · **Prototype ref:** `src/components/EventBottomSheet.jsx`

## Purpose

Build the single event-detail surface for the entire app. Every event card on Home, Explore, Calendar, and The Guide opens this sheet, so it must be a global component mounted at the app-shell level, not inside any page.

## Description

A slide-up bottom sheet showing full event detail:

- Hero photo, artist name (Fraunces italic), opener/support acts (parsed from Ticketmaster data in the prototype).
- Metadata block: date, doors time, venue, genre, price range (via Price/Status Indicator).
- Primary actions: **Get Tickets** (external ticket link), **Wishlist** toggle, **Going** toggle, **Share**.
- Social strip: "Friends going" avatar stack with "+N" overflow (VENU-006).
- Scout Tips section: short insider tips linked to the artist/event (data model in the technical list's Editorial section).
- Dismissal: tap scrim, drag down, or close button. Opening is triggered via a shared `openEventSheet(event)` function/hook available to any component.

## Notes / Questions

- The prototype already implements much of this in `EventBottomSheet.jsx` — treat it as the visual spec, but re-mount it at shell level with a context/store so pages don't thread props (current prototype threads via `App.jsx` props).
- "Friends going" is mocked data until the social graph exists (see INTENT.md scope notes) — build against the interface, render gracefully when empty (hide the strip entirely? Confirm with design).
- Question: should the sheet be URL-addressable (`/events/:id`) for shareable deep links? Ties to the VENU-001 routing decision and the Share action here.
- Question: does Share use the native Web Share API with a copy-link fallback on desktop?
- Get Tickets currently deep-links to Ticketmaster. When ticketing partnerships evolve, this becomes a backend-driven URL — keep it a data field, not a hardcoded pattern.

## Acceptance Criteria

- [ ] Any event card on any page opens the sheet via the shared open function; only one sheet instance exists in the tree.
- [ ] Sheet renders hero, artist, openers, date/doors/venue/genre, and price state from the normalized event model.
- [ ] Wishlist and Going toggles work from the sheet, show the confirmation toast, and update all other surfaces (cards, calendar) immediately.
- [ ] Friends-going avatar stack renders when data exists and collapses cleanly when empty.
- [ ] Get Tickets opens the ticket URL in a new tab/browser context.
- [ ] Share triggers the external share sheet (native share API where available).
- [ ] Sheet dismisses via scrim tap, close button, and downward drag; background scroll is locked while open.
