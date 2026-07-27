# UI-15 — Home: "On Your Radar" & "Your Shows" Sections

**Type:** UI Story · **Epic:** Home · **Depends on:** UI-05, UI-06, UI-08, API-01 · **Refs:** `docs/screenshots/tab-home.png` ("On Your Radar"); `src/pages/Home.jsx`

## Deliverable

Two Home sections: "On Your Radar" (horizontal strip of compact poster cards with match badges) and "Your Shows" (row cards for the user's Going events).

## Purpose

Radar is the personalized discovery moment (Perfect Matches); Your Shows keeps confirmed plans one glance away — together they're Home's middle band between the hero and editorial.

## Description

- **On Your Radar** — SectionHeader ("On Your Radar" / "SEE ALL →") + horizontal scroll of `EventCardPoster` in compact mode (match badge, artist, venue, price — per wireframe, no images); data: recommendation feed (MVP: upcoming events with stubbed match scores from the API; treat scores as optional).
- **Your Shows** — SectionHeader + vertical list of `EventCardRow` for Going events (from UI-08's store joined with event data), soonest first, capped (~3) with "SEE ALL" → Calendar; hidden entirely when the user has no Going events (Radar fills the space).
- SEE ALL destinations: Radar → Explore; Your Shows → Calendar (Going tab preselected).
- Both sections refresh with Home's pull-to-refresh/refetch cycle.

## Notes / Questions

- Radar data source at MVP: until a real recommendations endpoint exists, use the weekend feed sorted by stubbed match — make the service call sites explicit so swapping in a real `/recommendations` endpoint later is one change.
- Can a Going event also appear in Radar? Dedupe: exclude saved events from Radar (they're already on the user's radar by definition).

## Acceptance Criteria

- [ ] Radar renders compact cards with match badges per wireframe, horizontally scrollable, hearts functional.
- [ ] Radar excludes events the user already saved.
- [ ] Your Shows lists Going events soonest-first, updates instantly when Going toggles anywhere, hides at zero.
- [ ] SEE ALL links navigate to Explore and Calendar (Going tab) respectively.
- [ ] Skeletons on load; sections never render empty shells.
