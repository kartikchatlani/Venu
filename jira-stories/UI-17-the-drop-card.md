# UI-17 — The Drop Card (Presale Strip on Home)

**Type:** UI Story · **Epic:** The Drop · **Depends on:** UI-14 (Home container), API-07 (drops; stub ok) · **Refs:** `docs/screenshots/tab-home.png` ("The Drop" section header), `tab-home-scroll.png`; `INTENT.md`

## Deliverable

The Drop section on Home: dark presale cards with live countdown timers, copyable presale codes, Remind Me, and status-driven CTAs — the UI for Venu's flagship feature.

## Purpose

Presale intelligence is the app's differentiator; this card must communicate urgency (countdowns, ember accents) and deliver the insider payoff (the code) flawlessly.

## Description

- Section: "● The Drop" SectionHeader (ember dot) + "ALL PRESALES →" link; horizontal strip of dark Drop Cards.
- Card per state (from API-07's computed status):
  - **Upcoming** — artist/event, venue, "PRESALE IN 02:14:33" live countdown (Mono), REMIND ME button (→ registered state "REMINDER SET ✓").
  - **Live** — "● PRESALE LIVE" ember badge, presale code displayed with tap-to-copy (toast "Code copied"), GET TICKETS CTA (external).
  - **On sale** — standard on-sale treatment with ticket CTA.
- Countdown ticks per second, flips to Live at zero without refetch (then reconciles with the server on next poll/focus).
- Card tap (outside buttons) opens the event bottom sheet.
- Section hidden when no drops.

## Notes / Questions

- "ALL PRESALES →" destination doesn't exist in wireframes — needs a design decision (dedicated Drops list page = small follow-up story, or hide the link at MVP).
- Codes for logged-out users can't occur (app is auth-walled) — but confirm codes render only after API returns them (no client-side gating).
- Copy affordance: tap the code itself vs a copy icon — design call, default: tap code, icon hint.

## Acceptance Criteria

- [ ] All three card states render per their spec with correct color treatments.
- [ ] Countdown is accurate across timezones, updates every second, and transitions to Live at zero.
- [ ] Tap-to-copy puts the code on the clipboard and shows the toast.
- [ ] Remind Me registers/unregisters via API-07 and reflects registered state on reload.
- [ ] Get Tickets opens the presale URL externally; card tap opens the event sheet.
- [ ] Section hides with zero drops; skeleton while loading.
