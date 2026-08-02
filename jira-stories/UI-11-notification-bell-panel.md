# UI-11 — Notification Bell & Notifications Panel

**Type:** UI Story · **Epic:** Notifications · **Depends on:** UI-02 (header slot), API-06 (endpoints; can stub) · **Refs:** `docs/screenshots/overlay-notifications.png`; `src/components/NotificationsPanel.jsx`, `NotifBell`

## Deliverable

`<NotifBell>` (with unread dot) for the Home/Guide headers and the `<NotificationsPanel>` overlay — list, unread indicators, "MARK ALL READ", tap-to-navigate.

## Purpose

Surface time-sensitive activity (reminders, presale alerts, friend actions, matches) in one panel, with an unread signal that makes the bell worth tapping.

## Description

- **Bell** — icon button for the Page Header right slot; ember unread dot when `unreadCount > 0`.
- **Panel** — overlay per wireframe: "Notifications" title (Fraunces), "N UNREAD" subtitle, MARK ALL READ action, close button; rows with type icon (bell/person/bolt/note per type), bold title, description, relative timestamp, unread dot; visually distinct read vs unread.
- Data from API-06 via the client service (mock service until live); fetch on open + on app focus; unread count shared between bell and panel.
- Row tap: mark read + deep-link to target (event sheet via UI-07, profile via UI-09 routes); MARK ALL READ optimistic.
- Empty state ("You're all caught up") and loading skeleton.

## Notes / Questions

- Wireframe deep-link ambiguity: friend-activity rows ("Maya is going") — event or friend profile? Rows carry `target_type` from the API; default to the event, confirm with design.
- Pagination: panel shows ~20 with "load more", or cap at 30 days per API default? Start with the API default window, no infinite scroll.

## Acceptance Criteria

- [ ] Bell shows/hides the unread dot from live unread count; appears on Home and Guide headers.
- [ ] Panel matches the wireframe: header, unread count, typed icons, timestamps, unread dots.
- [ ] Tapping a row marks it read and navigates to the correct target; the dot disappears immediately.
- [ ] MARK ALL READ clears all dots optimistically and persists.
- [ ] Empty and loading states render; panel dismisses via close/scrim.
