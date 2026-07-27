# UI-35 — Add Friends Bottom Sheet

**Type:** UI Story · **Epic:** Social · **Depends on:** UI-34, UI-04, API-11 · **Refs:** tech list ("Add Friends Bottom Sheet — search + filter pills: Name/Username/Contacts/QR, Sync Contacts promo")

## Deliverable

The Add Friends sheet: user search by name/username with request sending, "show my QR" code, and designed placeholders for Contacts/QR-scan methods pending their privacy/platform decisions.

## Purpose

The growth loop's front end — finding and requesting friends must be effortless, with search methods presented per the tech list's filter-pill pattern.

## Description

- **Sheet** — bottom sheet (UI-07's container pattern) with SearchBar + method FilterPills: NAME / USERNAME / CONTACTS / QR.
- **Name/Username search** — debounced API-11 search; result rows: Avatar, name, @username, action button by `friendStatus` — ADD (sends request → flips to REQUESTED, cancellable) / REQUESTED / FRIENDS (inert) / ACCEPT (they already requested you).
- **QR** — "show my QR" renders a QR of the user's public profile URL (client-side generation); scanning arrives later (camera/platform work — see Notes).
- **CONTACTS pill** — renders the Sync Contacts promo card with a "COMING SOON" state until the privacy-reviewed contact-matching story exists (per API-11's exclusion).
- Sent-request state persists across sheet reopens (from API-11's `friendStatus`).

## Notes / Questions

- Contact sync and QR scanning are deliberately out of scope: contacts needs legal/privacy signoff + a hashing endpoint; scanning needs camera permissions and a detection lib. Both become follow-up stories — this sheet ships with their pills present but gated. Confirm product is comfortable with visible-but-gated (recommended: hide CONTACTS entirely if "coming soon" feels bad; keep QR-show since it works one-directionally with any phone camera).
- Rate-limit UX: API throttling on request spam should surface as a gentle "slow down" message.

## Acceptance Criteria

- [ ] Sheet opens from UI-34 with search + method pills per the tech list layout.
- [ ] Name/username searches return results with correct per-user action states; all four states behave correctly.
- [ ] Sending/canceling requests updates optimistically and persists across reopen.
- [ ] Accepting from search (mutual-request case) creates the friendship immediately.
- [ ] My-QR renders a scannable code resolving to my public profile (verified with a phone camera).
- [ ] Gated methods render their decided treatment without dead-end taps.
