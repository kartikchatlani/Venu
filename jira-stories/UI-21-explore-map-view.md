# UI-21 — Explore: Map View

**Type:** UI Story · **Epic:** Explore · **Depends on:** UI-19 (toggle + filters), UI-07 (sheet), API-01 (venue coordinates) · **Refs:** `docs/screenshots/tab-explore.png` (MAP segment); `src/components/VenuMap.jsx` (Leaflet reference)

## Deliverable

The MAP segment of Explore: dark-themed Leaflet map with clustered venue pins, tap-to-preview cards, and full pan/zoom — spatial answer to "what's near me tonight."

## Purpose

Some users think in geography, not lists; the map turns tonight's feed into a city view, reusing the prototype's proven Leaflet integration (`react-leaflet` v5 already in dependencies).

## Description

- Full-height map replacing Discover content when MAP is toggled; centered on Austin with bounded pan; dark tile provider (CARTO Dark Matter baseline — attribution rendered; licensing check from the notes).
- Amber venue pins for events with coordinates (API-01 passes venue lat/lng); events at the same venue merge into one pin with a count.
- Clustering at low zoom (count badges; tap zooms in) — `supercluster` or `leaflet.markercluster`, dev's choice with bundle note.
- **Pin tap → preview card** anchored above the tab bar: artist (or "N shows at {venue}" list), venue, time, price; tap preview → event bottom sheet.
- Genre filter (UI-19) filters pins live; viewport persists across Discover↔Map toggles within the session.
- Events without coordinates: excluded silently (count logged); zero-coordinate fallback message.

## Notes / Questions

- Tile provider commercial licensing must be confirmed before prod (CARTO free tier terms) — flag to whoever owns vendor decisions; OSM default tiles are not styled for After Dark.
- User geolocation ("near me" dot): not in the tech list — skip at MVP, note as enhancement.
- Multi-event venue preview: list within the preview card (recommended per earlier note) — cap at 3 + "more".

## Acceptance Criteria

- [ ] Map renders dark-themed with attribution, bounded to the Austin area, smooth on mid-range mobile.
- [ ] Pins appear for all coordinate-bearing events; same-venue events merge; clusters form/split correctly on zoom.
- [ ] Pin tap shows the preview; preview tap opens the shared event sheet; multi-event venues list their shows.
- [ ] Genre filter updates pins without a map reload.
- [ ] Viewport persists when toggling views in-session.
- [ ] Zero-events and zero-coordinates states render helpful messages.
