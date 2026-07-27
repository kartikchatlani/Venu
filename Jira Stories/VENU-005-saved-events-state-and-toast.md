# VENU-005 — Wishlist/Going Global State + Confirmation Toast

**Suggested epic:** Foundation / Data & State · **Depends on:** — (pairs with VENU-020 API contract) · **Wireframe ref:** heart/going states visible in `overlay-bottom-sheet.png`, `tab-calendar.png` · **Prototype ref:** `src/hooks/useSavedEvents.js`, `src/lib/savedEvents.js`

## Purpose

Centralize the two core user-intent states — **Wishlist** (interested) and **Going** (confirmed) — in one shared store with optimistic updates, so every surface (Home, Explore, Calendar, bottom sheet) reads and writes the same source of truth. This is the single most cross-cutting piece of state in the app.

## Description

- One store/hook exposing: `wishlistIds`, `goingIds`, `toggleWishlist(event)`, `toggleGoing(event)`, and loading/error state. The prototype's `useSavedEvents` hook (optimistic updates with rollback, derived id sets) is the reference implementation.
- **Upgrade/downgrade in place:** an event moves between wishlist ↔ going without duplication (per INTENT.md — a single saved record with a `status` of `"wishlist"` or `"going"`).
- Persistence through the data-access layer (currently Supabase `saved_events`; will become the Java API — keep all I/O behind `savedEvents.js`-style service functions so the swap is isolated).
- **Confirmation Toast** — charcoal pill with gold/amber checkmark, auto-dismissing (~2s), triggered on every wishlist/going/bookmark toggle. Global singleton rendered at shell level; queue or replace on rapid toggles.

## Notes / Questions

- Failure handling: optimistic update rolls back on API failure — should the toast then show an error variant, or silently revert? Recommend an error toast ("Couldn't save — try again").
- Question for backend (VENU-020): are saved events keyed by external (Ticketmaster) event id, internal event id, or both? Affects dedup logic when the same event arrives from multiple feeds.
- The toast is described as a "pill" in the tech list but must follow the radius-2 design rule — same naming caveat as VENU-002.
- Rapid double-tap on a heart should debounce or serialize — avoid a stuck intermediate state.

## Acceptance Criteria

- [ ] Toggling wishlist/going from any surface updates every other surface in the same render cycle (optimistic), with rollback on API failure.
- [ ] An event can hold only one status at a time; switching statuses never creates a duplicate record.
- [ ] State survives reload (persisted per user) and clears on logout.
- [ ] Confirmation toast appears on every successful toggle, auto-dismisses, and never stacks more than one visible toast.
- [ ] Calendar filter-tab counts (All/Going/Wishlist) derive from this store and update live.
- [ ] All persistence calls go through a single service module — no component talks to the backend directly.
