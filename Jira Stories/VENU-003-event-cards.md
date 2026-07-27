# VENU-003 — Event Card Components (Row + Poster Variants)

**Suggested epic:** Foundation / Shared Components · **Depends on:** VENU-002 (Genre Tag, Match Badge, Price/Status), VENU-005 (wishlist state) · **Wireframe ref:** `docs/screenshots/tab-home.png` ("On Your Radar"), `tab-explore.png` ("Tonight in Austin", "This Weekend") · **Prototype ref:** `src/pages/Home.jsx`, `src/pages/Explore.jsx`, `src/lib/ticketmaster.js` (normalized event shape)

## Purpose

Build the two reusable event card variants that appear across four pages, so every event listing shares one implementation and one data contract.

## Description

- **Show/Event Card (row variant)** — horizontal card: square thumbnail + artist name (Fraunces italic) + venue/date metadata (JetBrains Mono) + chevron/heart on the right. Used on Home "Your Shows", Explore "Tonight in [City]", and the Calendar event list.
- **Event Card (poster variant)** — vertical card: image, artist/title, metadata, genre tag, price, wishlist heart, optional match badge. Used on Explore "This Weekend" and Home "On Your Radar" (Perfect Matches).
- Both variants accept the normalized event model (id, artist, venue, date, time, image, genre, price/TBA, status) already produced by `src/lib/ticketmaster.js`.
- Tapping the card body opens the event bottom sheet (VENU-004); tapping the heart toggles wishlist without opening the sheet.
- Handle image-missing fallback (solid ink block or venue placeholder) and loading skeletons for both variants.

## Notes / Questions

- The wishlist heart tap must `stopPropagation` so it doesn't also open the bottom sheet — this is an easy regression, worth an explicit test.
- Match badge appears only on personalized surfaces (Radar/Festivals). Until the taste-profile engine exists, match % is mocked — the card should treat it as optional data.
- Question: should poster cards show the wishlist heart pre-filled if an event is already wishlisted from another page? (Yes per the global-state model in VENU-005 — calling it out so QA covers cross-page consistency.)
- Long artist names (e.g., "Turnstile + JPEGMafia") need a truncation rule — 2-line clamp suggested.

## Acceptance Criteria

- [ ] Row and poster variants render from the same event model with no per-page forks.
- [ ] Card tap opens the event bottom sheet; heart tap toggles wishlist only.
- [ ] Heart reflects global wishlist state and stays in sync when toggled elsewhere (e.g., from the bottom sheet).
- [ ] Genre tag, price/status, and optional match badge render via the VENU-002 primitives.
- [ ] Missing image and loading states render gracefully (skeleton / fallback, no layout shift).
- [ ] Artist names truncate at 2 lines; metadata truncates at 1 line with ellipsis.
- [ ] Typography and radii match the design system (cards radius 4, Fraunces italic titles, Mono metadata).
