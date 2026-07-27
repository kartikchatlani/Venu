# VENU-008 — Notifications: Bell, Unread Indicator & Panel

**Suggested epic:** Foundation / Shared Components · **Depends on:** VENU-001 (header slot) · **Wireframe ref:** `docs/screenshots/overlay-notifications.png` · **Prototype ref:** `src/components/NotificationsPanel.jsx`, `src/components/index.jsx` (`NotifBell`)

## Purpose

Give users one place to see time-sensitive activity — show reminders, presale alerts, friend activity, and new matches — surfaced through a bell with an unread indicator in the Home and Guide headers.

## Description

- **Notification Bell + Unread Indicator** — header icon with an unread dot (ember red per wireframe); rendered in the Page Header slot on Home and The Guide.
- **Notifications Panel** — slide-down/overlay panel (see wireframe) with: header ("Notifications", unread count, "Mark all read", close), and a list of notification rows.
- Each row: type icon (reminder bell / social person / presale bolt / match note), bold title, one-line description, relative timestamp, unread dot.
- Notification types from the wireframe: show reminder ("Show tomorrow"), friend going, presale alert, new match %, friend wishlisted, upcoming-week reminder.
- Actions: mark all read; tapping a notification marks it read and deep-links to the relevant surface (event sheet, friend profile).

## Notes / Questions

- MVP is in-app only. Push notifications (The Drop's "Remind Me" alerts, INTENT.md near-term goal) are a separate later story — but the notification type model should already include `presale_reminder` so push can reuse it.
- Unread count source: polled endpoint, or computed client-side from the fetched list? For MVP, fetching the list on app load and computing locally is fine; note it for VENU-020's API contract.
- Question: does tapping a friend-activity notification open the event or the friend's profile? Wireframe implies the event — confirm with design.
- Notification retention/pagination: how far back does the list go? Suggest 30 days for MVP.

## Acceptance Criteria

- [ ] Bell renders in Home and Guide headers; unread dot shows if any notification is unread.
- [ ] Tapping the bell opens the panel; scrim tap or close button dismisses it.
- [ ] Panel lists notifications with correct type icon, title, description, relative time, and unread state, matching the wireframe layout.
- [ ] "Mark all read" clears all unread dots (panel and bell) and persists.
- [ ] Tapping a notification marks it read and navigates to its target (event bottom sheet or profile).
- [ ] Empty state renders a friendly message when there are no notifications.
