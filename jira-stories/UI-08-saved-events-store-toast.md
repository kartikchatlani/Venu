# UI-08 — Saved-Events Client Store + Confirmation Toast

**Type:** UI Story · **Epic:** Foundation · **Depends on:** API-03 (endpoints; can develop against Supabase first) · **Refs:** `src/hooks/useSavedEvents.js`, `src/lib/savedEvents.js`

## Deliverable

The client-side saved-events store (`useSavedEvents`: `wishlistIds`, `goingIds`, `toggleWishlist`, `toggleGoing` with optimistic updates + rollback) and a global `<Toast>` component — the state engine behind every heart and Going button.

## Purpose

One store must own wishlist/going state so all surfaces stay in sync, updates feel instant, and failures roll back visibly — the prototype's `useSavedEvents` already proves the pattern; this story productionizes it behind the API client.

## Description

- Port `useSavedEvents` to app-level state (context or store lib — dev choice) with: derived id sets, optimistic toggle + rollback, single-flight per event (debounce double-taps), upgrade-in-place wishlist↔going semantics.
- All persistence through the API client module (`savedEvents` service) — pointing at Supabase today, API-03 when live; components never import the transport.
- **Toast** — charcoal bar with gold checkmark per tech list, radius 2, auto-dismiss ~2s, one visible at a time (replace, don't stack); global `toast(message)` helper; error variant for rollback ("Couldn't save — try again").
- Toast fires on wishlist/going/bookmark successes (bookmark wiring lands in UI-10).

## Notes / Questions

- State library: Context+reducer is enough at this scale; Zustand acceptable if the team prefers — decide once here, it sets the app's state pattern.
- Should toasts be tappable (e.g., "Going ✓ — View Calendar")? Nice-to-have; default no for MVP.

## Acceptance Criteria

- [ ] Toggling from any surface updates all surfaces in the same render; server failure rolls back and shows the error toast.
- [ ] Wishlist↔going switches in place — store never holds an event in both sets.
- [ ] Rapid double-taps result in one consistent final state (no flicker/stuck states).
- [ ] Success toast appears and auto-dismisses on every toggle; only one toast visible at a time.
- [ ] Swapping the service from Supabase to API-03 requires no component changes (demonstrated).
- [ ] State clears on logout.
