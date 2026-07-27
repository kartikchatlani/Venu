# VENU-016 — Calendar External Sync (Device / Google Calendar)

**Suggested epic:** Pages / Integrations · **Depends on:** VENU-015 (Calendar page), VENU-020 (backend, if using Google OAuth) · **Wireframe ref:** — (function listed in tech list, no wireframe) · **Prototype ref:** —

## Purpose

Let users push their **Going** events into the calendar they actually live by (Google Calendar or their device calendar), so Venu shows appear alongside the rest of their life and they never double-book a show night.

## Description

- A "Sync to Calendar" affordance on the Calendar page (placement TBD with design — likely a settings-style row or per-event action in the bottom sheet).
- **Tier 1 (MVP): per-event add** — generate a standards-based calendar entry for a Going event:
  - `.ics` file download (works with Apple/device calendars), and
  - Google Calendar "add event" template URL (no OAuth needed).
  - Event fields: artist + venue as title, venue address as location, doors/start time in venue-local timezone, ticket link in description.
- **Tier 2 (fast-follow): full Google sync** — OAuth-connected Google Calendar integration that auto-adds/updates/removes events as Going status changes. Requires backend token storage and a sync job (Java backend, VENU-020).
- Wishlist events are never synced — Going only.

## Notes / Questions

- Recommend shipping Tier 1 only in this story and splitting Tier 2 into its own ticket once the backend exists — Tier 2 needs Google Cloud OAuth consent screen review, token refresh handling, and delete/update semantics (what happens in Google when a user un-goes an event?).
- Time changes: Ticketmaster events get rescheduled — Tier 1 (static .ics) will silently go stale. Acceptable for MVP? Recommend yes, with Tier 2 solving it properly.
- Does "sync" include festivals (multi-day date ranges)? .ics supports it; confirm the event model carries end dates.
- All-day vs timed entries when doors time is TBA — recommend all-day entry with "Time TBA" in the title.

## Acceptance Criteria

- [ ] A Going event can be exported as a valid `.ics` file that imports cleanly into Apple Calendar and Outlook with correct local time, venue location, and ticket link.
- [ ] A Google Calendar template link opens Google's add-event screen pre-filled with the same details.
- [ ] The action is available for Going events only (hidden/disabled for wishlist).
- [ ] Events with TBA times export as all-day entries flagged "Time TBA".
- [ ] Timezone is correct for venue-local time regardless of the user's device timezone.
- [ ] Analytics event fires on each export (feeds the "do people use this?" decision for Tier 2).
