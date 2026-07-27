# VENU-013 — Explore Map View

**Suggested epic:** Pages · **Depends on:** VENU-012 (Explore shell, segmented toggle) · **Wireframe ref:** `docs/screenshots/tab-explore.png` (MAP segment) · **Prototype ref:** `src/components/VenuMap.jsx` (Leaflet + react-leaflet already integrated)

## Purpose

Give users a spatial way to browse tonight's shows — an interactive map of venue pins with tap-to-preview, answering "what's happening near me" at a glance.

## Description

- Toggling the Explore segmented control to **MAP** swaps the Discover sections for a full-height interactive map (Leaflet; `react-leaflet` v5 is already in the prototype's dependencies and `VenuMap.jsx` is a working reference).
- **Event pins** at venue coordinates, styled to the After Dark theme (amber markers on dark tiles).
- **Pin clustering** when zoomed out (multiple events at one venue or dense downtown areas collapse into a count badge; tapping a cluster zooms in).
- **Tap pin → event preview** — compact card (artist, venue, time, price) anchored above the map; tapping the preview opens the full event bottom sheet.
- Pan/zoom with sensible bounds around the selected city; genre filter pills (VENU-012) continue to apply to visible pins.
- Map state (viewport, selected pin) resets or persists on toggle — see Questions.

## Notes / Questions

- Dark map tiles: Leaflet needs a dark tile provider (e.g., CARTO Dark Matter — free tier with attribution, or a paid provider). Confirm tile licensing/attribution requirements for a commercial app before launch.
- Venue coordinates come from Ticketmaster's venue data — the normalizer should pass lat/lng through; events missing coordinates are excluded from the map (but still in Discover). Log how many get dropped.
- Clustering: `leaflet.markercluster` vs. `supercluster` — dev's choice; note the bundle-size impact either way.
- Question: when the user toggles Discover → Map → Discover, should the map keep its viewport? Recommend yes within a session.
- Multiple events at the same venue on one night: cluster forever, or show a venue pin that opens a multi-event list? Recommend venue pin with a small event list in the preview card.

## Acceptance Criteria

- [ ] MAP segment renders an interactive dark-themed map centered on the selected city with pins for all tonight/weekend events that have coordinates.
- [ ] Pins cluster at low zoom; tapping a cluster zooms toward its contents.
- [ ] Tapping a pin shows the compact event preview; tapping the preview opens the shared event bottom sheet.
- [ ] Active genre filter applies to map pins in real time.
- [ ] Pan and zoom are smooth on mid-range mobile hardware; map bounds keep the user near the city.
- [ ] Events without coordinates are excluded without errors; a fallback message renders if zero events have coordinates.
- [ ] Tile attribution renders per provider requirements.
