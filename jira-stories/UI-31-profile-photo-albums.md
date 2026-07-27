# UI-31 — Profile: Photo Albums

**Type:** UI Story · **Epic:** Profile & Passport · **Depends on:** UI-28, API-16 (uploads) + album registration endpoint (see Notes) · **Refs:** tech list Profile components ("Photo Albums Section — cover + photo count chip")

## Deliverable

The Photo Albums section on Profile: album grid (cover + photo-count chip + date/event association), album detail view, and the upload flow.

## Purpose

Show memories from shows — albums tied to events close the loop from "going" to "went and here's proof," and make profiles personal.

## Description

- **Albums grid** — SectionHeader ("Photo Albums" / "View All") + album tiles: cover photo (radius 4), photo-count chip ("12 PHOTOS", Mono), album title, date, optional linked event line.
- **Album detail** — full-screen/sheet: photo grid, tap-to-view (simple lightbox: swipe/arrow between photos), linked event chip → event sheet.
- **Create/upload flow** — new album: title, optional event association (from attendance history), multi-photo picker uploading via API-16's presigned flow with per-photo progress; add photos to existing albums; delete photos/albums (own only).
- Public visibility per the privacy decision (API-05); friends-only default recommended for photos.

## Notes / Questions

- Backend gap: API-16 covers raw uploads, but album metadata (albums + album_photos tables/endpoints) isn't in any API story — smallest path: add albums endpoints to API-16's scope or spin a small API follow-up. **Flag when sizing this story; don't start UI until the contract exists.**
- Multi-upload UX on mobile web: browsers support multi-select file input — keep it simple, no drag-drop needed.
- Image processing (thumbnails) pending API-16's follow-up — render CSS-sized originals meanwhile, accept the bandwidth cost at MVP.

## Acceptance Criteria

- [ ] Albums grid renders covers, count chips, dates, and event associations per the tech list description.
- [ ] Album detail shows the photo grid with working lightbox navigation.
- [ ] Creating an album with multiple photos works end-to-end (progress shown, failures per-photo retryable).
- [ ] Photos/albums can be deleted by their owner only.
- [ ] Event-associated albums link to the event sheet.
- [ ] Empty state prompts the first album; visibility respects the privacy setting.
