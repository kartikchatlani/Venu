# UI-27 — Calendar Export (.ics / Google Calendar Link)

**Type:** UI Story · **Epic:** Calendar · **Depends on:** UI-26, UI-07 (sheet action placement) · **Refs:** tech list Calendar functions ("Sync Going events to device/Google Calendar")

## Deliverable

An "Add to Calendar" action for Going events — client-generated `.ics` download and a pre-filled Google Calendar link — no OAuth, no backend changes.

## Purpose

Get Venu shows into the calendar users actually live by. This is the client-only tier of calendar sync (full OAuth Google sync is a future backend story per the earlier scoping note).

## Description

- Action surfaced on Going events: in the event bottom sheet (primary) and/or the Calendar card's overflow — placement with design.
- **.ics generation** (client-side): VEVENT with artist + venue title, venue address location, venue-local start time (TZID), ticket URL in description; downloads/opens for device calendar import. TBA times → all-day event titled "(Time TBA)".
- **Google link** — `calendar.google.com/render?action=TEMPLATE&...` URL with the same fields, opened in new tab.
- Both tracked (analytics event) to gauge demand for real sync.
- Going-only: the action never appears on wishlist events.

## Notes / Questions

- iOS Safari .ics handling is the fiddly platform — test the download-open flow on real iOS; a `webcal`/data-URL fallback may be needed.
- Static exports go stale if events reschedule — acceptable MVP limitation (documented); OAuth sync story solves it later.
- Multi-day festivals: emit DTSTART/DTEND spanning the range once the event model carries end dates (API-10 festivals) — events without end dates default to 3-hour duration.

## Acceptance Criteria

- [ ] Going events show the action; wishlist events never do.
- [ ] Generated .ics imports into Apple Calendar and Outlook with correct local time, location, and ticket link.
- [ ] Google link opens pre-filled with matching details.
- [ ] TBA-time events export as all-day with the TBA marker.
- [ ] Works on iOS Safari, Android Chrome, desktop browsers (tested).
- [ ] Export taps fire the analytics event.
