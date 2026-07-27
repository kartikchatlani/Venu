# VENU-019 — Friends Sub-Page & Add Friends Flow

**Suggested epic:** Social · **Depends on:** VENU-001 (sub-page routing), VENU-002 (search bar, filter pills), VENU-006 (avatars, activity rows), VENU-020 (backend) · **Wireframe ref:** Profile → Friends (sub-page; request wireframe export if not in the shared file) · **Prototype ref:** `src/pages/Profile.jsx`

## Purpose

Build the friend graph's front door: a Friends sub-page under Profile with the user's friend list and activity, plus the Add Friends bottom sheet supporting search by name/username, contact sync, and QR — the growth loop for the social layer.

## Description

- **Friends sub-page** (`/profile/friends`) — back-arrow header, friend count, Search Bar filtering the friend list, Friend Activity Rows (VENU-006), and the **Add Friends Button** (amber, per tech list).
- **Add Friends Bottom Sheet** — search input + **filter pills for search method**: NAME / USERNAME / CONTACTS / QR, plus a "Sync Contacts" promo card.
  - Name/Username: server search with results list; each result row shows avatar, name, @username, and an ADD button → sends friend request (button flips to REQUESTED with cancel).
  - Contacts: permission prompt → match hashed contacts against registered users (see Notes).
  - QR: show my QR code + scan a friend's code → direct add/request.
- **Request lifecycle** — send, cancel, and (recipient side) accept/decline; incoming requests surface as notifications (VENU-008).
- Friend list feeds "friends going" (VENU-004) and the Home activity feed (VENU-009).

## Notes / Questions

- Friendship model: mutual-request (Facebook-style) or follow (Instagram-style)? Tech list says "send friend request / cancel request" → mutual. Confirm with product; it changes the notification and privacy model.
- Contact sync is privacy-sensitive: upload hashed phone numbers/emails only, never raw contact books; document retention policy. On web, the Contact Picker API has very limited support — contacts may be mobile-app-only; for the web MVP the CONTACTS pill may need a "coming soon" state. Product/legal review recommended.
- QR scanning on web requires camera permission + a scanning lib (e.g., barcode-detector API with fallback). Showing your own QR is easy; scanning may be a fast-follow — split if needed.
- Blocking/reporting users is not in the tech list but is table-stakes for a social launch — flag to product; recommend at least "remove friend" here and a block story before public launch.

## Acceptance Criteria

- [ ] Friends sub-page lists friends with search filtering, shows friend activity rows, and a working back arrow to Profile.
- [ ] Add Friends sheet opens with search + method pills; NAME and USERNAME searches return server results.
- [ ] Sending a request flips the row to a cancellable REQUESTED state; canceling reverts it.
- [ ] Recipients see incoming requests (notification + list) and can accept/decline; accepting makes both users appear in each other's friend lists.
- [ ] "Show my QR" renders a scannable code that resolves to my profile/add flow.
- [ ] Contact sync asks permission before any access, sends only hashed identifiers, and shows matched users; unsupported platforms show a graceful fallback state.
- [ ] Friend list changes propagate to "friends going" stacks and the Home activity feed.
