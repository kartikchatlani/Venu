# VENU-010 — The Drop (Presale Intelligence Card)

**Suggested epic:** Pages / Home · **Depends on:** VENU-009 (Home layout), VENU-008 (notifications for reminders) · **Wireframe ref:** `docs/screenshots/tab-home.png` / `tab-home-scroll.png` ("The Drop" section) · **Prototype ref:** `src/pages/Home.jsx` (Drop section), `INTENT.md` ("The Drop" is the flagship feature)

## Purpose

Build Venu's most differentiated feature: a Home section surfacing upcoming presales with countdowns, access codes, and reminders — so users never miss a drop. Per INTENT.md, this is the feature that makes users feel like insiders.

## Description

- **The Drop Card** — dark card variant with a live/presale status treatment (ember red accents for urgency). Horizontally scrollable strip under the "● The Drop" section header with an "ALL PRESALES →" link.
- Card contents per drop: artist/event, venue, presale status (`UPCOMING` with countdown / `LIVE NOW` / `ON SALE`), countdown timer to the exact sale moment, presale access code (revealed/copyable), and a CTA.
- **Tap behavior:** live presale → open the presale/ticket flow (external link); upcoming → open the event bottom sheet with a "Remind Me" action.
- **Remind Me** — registers a reminder that surfaces as a notification (VENU-008 type `presale_reminder`); push delivery is a later story, in-app is MVP.
- Countdown ticks in real time (mm:ss under an hour; d/h above).

## Notes / Questions

- Data source: presale data is hardcoded/mocked in the prototype. INTENT.md's near-term goal is pulling from real sources (Ticketmaster presale windows, Bandsintown, artist newsletters). MVP question for backend: is there a curated `drops` table maintained manually until ingestion exists? (Recommended — editorial curation is fine at Austin-only scale.)
- Presale codes are sensitive/exclusive content — should codes be visible only to logged-in users, or gated further (e.g., revealed on tap with a copy action + tracking)?
- Countdown timezone correctness matters (sale times are venue-local) — store UTC + venue timezone, render local.
- "ALL PRESALES →" destination isn't in the wireframes — is there a full Drops list page, or does it filter Explore? Needs design.

## Acceptance Criteria

- [ ] Drop section renders a horizontal strip of dark presale cards with status treatments per state (upcoming / live / on sale).
- [ ] Countdown displays and updates in real time, rendering correctly across timezones, and flips the card to LIVE state at zero without a reload.
- [ ] Presale code is displayed with one-tap copy and a confirmation toast.
- [ ] Remind Me creates an in-app notification scheduled ahead of the sale time; the action reflects a registered state (e.g., "REMINDER SET").
- [ ] Live drops link out to the presale/ticket URL; upcoming drops open the event bottom sheet.
- [ ] Section hides entirely when no active or upcoming drops exist.
