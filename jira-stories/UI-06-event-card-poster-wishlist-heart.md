# UI-06 — Event Card: Poster Variant + Wishlist Heart Button

**Type:** UI Story · **Epic:** Foundation · **Depends on:** UI-03, UI-08 (heart state; can stub) · **Refs:** `docs/screenshots/tab-home.png` ("On Your Radar"), `tab-explore.png` ("This Weekend")

## Deliverable

Two shared components: `<EventCardPoster>` (vertical card: image, title, metadata, genre tag, price, heart, optional match badge) and the standalone `<WishlistHeart>` toggle button both variants and the bottom sheet reuse.

## Purpose

The poster card powers the app's discovery moments (Radar, This Weekend); the wishlist heart is its own reusable control because it appears on cards, hero units, and the bottom sheet.

## Description

- **WishlistHeart** — icon button (square, radius 2 — "circular" in the tech list, but design system bans circles), outline ♡ / filled state, optimistic toggle via UI-08's store, `.pressable` feedback, stops propagation.
- **EventCardPoster** — per wireframes: image top (radius 4 card), optional MatchBadge overlay (Radar) , artist/title in Fraunces, venue metadata Mono, GenreTag + PriceStatus row, heart top-right or in footer per design.
- Fixed card width for horizontal scroll strips (Radar) and fluid width for grid contexts (This Weekend) — support both via prop.
- Tap-to-sheet, image fallback, 2-line title clamp, skeleton variant (same conventions as UI-05).

## Notes / Questions

- Wireframe shows Radar cards *without* images (text-only with match badge) while This Weekend has image posters — confirm whether imageless is a display mode of this component (recommended: `compact` prop) or a separate card.
- Heart placement differs subtly between surfaces in the wireframes — get one ruling from design to avoid per-page pixel pushing.

## Acceptance Criteria

- [ ] Poster card renders image, title, metadata, genre, price, heart, and optional match badge per the This Weekend wireframe.
- [ ] Compact (imageless) mode matches the On Your Radar wireframe.
- [ ] WishlistHeart toggles optimistically, reflects global state everywhere it appears, and never triggers the card tap.
- [ ] Fixed-width strip mode and fluid mode both lay out correctly.
- [ ] Skeletons, image fallback, and truncation behave as in UI-05.
