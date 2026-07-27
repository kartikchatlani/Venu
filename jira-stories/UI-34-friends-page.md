# UI-34 — Friends Sub-Page

**Type:** UI Story · **Epic:** Social · **Depends on:** UI-01 (nested routes), UI-04 (search), UI-09, API-11 · **Refs:** tech list Friends sub-page; `src/pages/Profile.jsx`

## Deliverable

The Friends page (`/profile/friends`): friend list with search, friend activity feed, incoming-request handling, and the entry point to Add Friends (UI-35).

## Purpose

One place to see your people — who you're connected to, what they're up to, and who wants to connect — reached from Profile's FRIENDS stat and the Home activity SEE ALL.

## Description

- **Header** — back-arrow PageHeader ("Friends") + friend count subtitle.
- **Add Friends Button** — amber button (radius 2 despite "pill" naming) opening UI-35's sheet.
- **Incoming requests** — section at top when pending requests exist: requester row (Avatar, name, @username) with ACCEPT / DECLINE buttons; accepting adds to the list immediately.
- **Friend list** — searchable (SearchBar filtering locally) rows: Avatar + name + @username; tap → their profile; overflow action: remove friend (confirm dialog).
- **Friend activity** — recent `FriendActivityRow`s below the list (same feed as Home's section, longer window).
- Empty state (no friends): friendly pitch + prominent Add Friends button.

## Notes / Questions

- Remove-friend placement: overflow menu vs swipe action — design call; recommend overflow menu (discoverable, no gesture conflicts).
- Requests: only incoming shown here? Outgoing pending requests visible in UI-35's search results as REQUESTED — sufficient; confirm no separate "sent" list is needed at MVP.
- Should the friend list paginate? At MVP scale, load-all + local search is fine (cap concerns at ~500).

## Acceptance Criteria

- [ ] Page renders friend count, searchable friend list, and activity feed; rows navigate to profiles.
- [ ] Incoming requests appear with working accept/decline; accept updates list and count instantly.
- [ ] Local search filters the list as typed.
- [ ] Remove friend works behind a confirmation and updates both the list and the removed user's view (API-11).
- [ ] Empty state renders with the Add Friends call-to-action.
- [ ] Reached correctly from Profile's FRIENDS stat and Home's activity SEE ALL.
