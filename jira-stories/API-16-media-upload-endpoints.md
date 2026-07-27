# API-16 — Media Upload (Presigned S3)

**Type:** API Story · **Epic:** Cloud & Platform · **Depends on:** API-04, SPIKE-01 (S3 design)

## Deliverable

`POST /api/v1/uploads` returning a presigned S3 PUT URL + final CDN URL, with validation and per-context rules — the single upload path for avatars, profile banners, photo albums, and crew photos.

## Purpose

Handle user media once, correctly: clients upload directly to S3 via short-lived presigned URLs (no image bytes through the Java service), and every feature that needs an image reuses this flow.

## Description

- Request declares `context` (avatar | banner | album_photo | crew_photo) and content type/size; server validates (jpeg/png/webp, size caps per context — e.g., 5MB avatar, 10MB photo), generates a namespaced S3 key (`users/{id}/avatar/...`), and returns `{uploadUrl, publicUrl, expiresIn}`.
- Client PUTs the file to S3, then references `publicUrl` in the relevant endpoint (PATCH /me, crew photos registration, etc.).
- Delivery through CloudFront (per SPIKE-01), private bucket with OAC.
- Basic image hygiene: strip-EXIF/resize pipeline is a stretch goal — at minimum enforce content-type on the presigned policy so mislabeled files are rejected by S3.

## Notes / Questions

- Image processing (thumbnails, resizing): recommend a follow-up story (Lambda on S3 event) rather than blocking this one; UI can use CSS sizing meanwhile. Avatars at full-res are wasteful but functional.
- Moderation: user-generated images will eventually need scanning (Rekognition) + reporting — pre-public-launch requirement, flag to product.
- Orphan cleanup: uploads that never get referenced (user abandons edit) — periodic cleanup job or ignore at MVP scale? Recommend a tagged-TTL lifecycle rule.

## Acceptance Criteria

- [ ] Authenticated request yields a presigned URL that accepts a valid file and rejects wrong content types and oversize payloads.
- [ ] Uploaded file is retrievable via the returned public/CDN URL; bucket is not publicly listable.
- [ ] Keys are namespaced per user/context; users cannot craft keys outside their namespace.
- [ ] URLs expire (≤15 min) and are single-context.
- [ ] End-to-end demo: avatar upload → PATCH /me → new avatar served.
- [ ] OpenAPI documented.
