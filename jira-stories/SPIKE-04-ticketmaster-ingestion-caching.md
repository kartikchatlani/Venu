# SPIKE-04 — Ticketmaster Ingestion & Caching Strategy

**Type:** Spike (timeboxed, e.g. 2 days) · **Epic:** Cloud & Platform · **Depends on:** SPIKE-01

## Deliverable

A written strategy for how event data flows from Ticketmaster into Venu — proxy vs ingest-and-store, cache TTLs, rate-limit budget, and the event ID/dedup model — feeding directly into API-01/API-02 implementation.

## Purpose

Today the browser calls Ticketmaster directly with an exposed API key (`VITE_TICKETMASTER_API_KEY` ships in the bundle — a security problem production must fix). The backend will own this integration; this spike decides *how* before we build API-01.

## Description

Evaluate two models against Ticketmaster's Discovery API rate limits (default ~5 req/s, 5k/day) and data-freshness needs:

1. **Read-through proxy + cache** — backend calls TM per request, caches responses (in-memory/Redis/DB) with short TTLs. Simple, always fresh-ish, rate-limit-exposed at scale.
2. **Scheduled ingestion** — a job pulls Austin events on a schedule into our Postgres `events` table; the API serves only our DB. Stable IDs, enables joins with saved events/reviews/passport, rate-limit-safe — but needs sync/update/cancellation handling.

Also settle: canonical event ID strategy (internal ID mapped to TM ID — saved events and reviews must survive TM data quirks), genre normalization mapping (TM classifications → Venu's genre pills), venue coordinate extraction for the map, and what happens when events are rescheduled/cancelled.

## Notes / Questions

- Recommendation to validate: scheduled ingestion (option 2) — the product roadmap (passport, reviews, multi-source presales per INTENT.md) needs events as first-class rows, not passthrough JSON.
- The normalization logic already exists client-side in `src/lib/ticketmaster.js` — port it to the backend as the ingestion transform.
- How often to sync for freshness (tonight's feed matters most)? Suggest hourly full-city sync + on-demand refresh hook.
- Future sources (Bandsintown, artist newsletters for The Drop) should slot into the same ingestion model — design the event table source-agnostic.

## Acceptance Criteria

- [ ] Strategy doc chooses proxy vs ingestion with rationale and rate-limit math.
- [ ] Event ID, dedup, genre-mapping, and reschedule/cancellation handling are specified.
- [ ] Proof-of-concept fetch + normalize of Austin events runs server-side (Java or script) against the real API.
- [ ] API-01 and API-02 stories updated with the chosen design.
