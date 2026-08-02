# API-02 — Event Search & Genre Filter Endpoint

**Type:** API Story · **Epic:** Events · **Depends on:** API-01 (event store/model)

## Deliverable

`GET /api/v1/events/search?q=&genre=&city=` returning matching upcoming events — powering Explore's search bar and genre pills from the backend.

## Purpose

Let users search artists and venues and filter by genre against the full upcoming-events window (not just what's already rendered), with genre mapping handled consistently server-side.

## Description

- Text search over artist name and venue name (case-insensitive, prefix + contains; Postgres `ILIKE`/trigram is sufficient at MVP scale).
- `genre` filters by Venu's fixed genre set (ALL/ROCK/ELECTRONIC/HIP-HOP/…) using the TM→Venu genre mapping from SPIKE-04; `q` and `genre` combine.
- Results: upcoming events only, sorted by date, same Event schema as API-01, capped (e.g., 25) with a `limit` param.
- Empty results return `200` with an empty array (frontend renders the empty state).

## Notes / Questions

- Should search also return matching artists/venues as separate result groups (tech list mentions "Artists — referenced by Explore search")? MVP: events only; note a v2 endpoint shape that adds `artists[]`/`venues[]` groups so the response won't break.
- Debouncing is the client's job; still add basic rate limiting per IP.
- Diacritics/casing ("L'Eclair", "Beyoncé") — normalize with `unaccent`.

## Acceptance Criteria

- [ ] Search matches partial artist and venue names regardless of case/accents.
- [ ] Genre filter alone, search alone, and both combined all return correct results.
- [ ] Only upcoming events are returned, date-ascending, respecting `limit`.
- [ ] Documented in OpenAPI; response schema identical to API-01's Event model.
- [ ] Tests cover: no results, combined filters, accent-insensitive match.
