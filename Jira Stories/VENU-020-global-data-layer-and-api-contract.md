# VENU-020 — Global Data Layer & Backend API Contract

**Suggested epic:** Platform · **Depends on:** — (unblocks most stories; start alongside VENU-001) · **Wireframe ref:** — · **Prototype ref:** `src/lib/ticketmaster.js`, `src/lib/supabase.js`, `src/lib/savedEvents.js`, `src/hooks/useAustinEvents.js`

## Purpose

Define the shared data models and the frontend↔backend contract so the React app talks to one typed API layer instead of scattering fetch logic — and so the planned Java backend on AWS can be built against an agreed contract instead of reverse-engineering the UI.

## Description

- **Shared models** (per the tech list's Global Data section): User profile, City, Taste profile, Notification, Event (id, artist, venue, date, time, image, genre, price/TBA, status: announced/presale/on-sale/live/past), Venue, Artist, Festival, SavedEvent (wishlist/going), Article, Author, Scout Tip. Document each as a schema the backend team implements.
- **API client layer** — one module per domain (`events`, `savedEvents`, `social`, `editorial`, `notifications`) wrapping fetch with auth headers, error normalization, and retries. Components/hooks never call `fetch` or Supabase directly.
- **Server-side Ticketmaster proxy** — move Ticketmaster calls behind the backend. Today `VITE_TICKETMASTER_API_KEY` ships to every browser (any `VITE_`-prefixed var is public) — that key must become a backend secret, with the backend exposing `/events/tonight`, `/events/weekend`, `/events/search` and doing the normalization currently in `ticketmaster.js` (plus caching to respect TM rate limits).
- **Shared utilities/hooks** from the tech list: pull-to-refresh wrapper, `openEventSheet`, toggle wishlist/going (VENU-005), share, open notifications, and **content-view tracking** (`trackView(type, id)` fired on article/event/artist views — feeds personalization).
- **Migration posture** — Supabase (auth + saved_events) keeps working during transition; the service layer is the seam where Supabase calls are swapped for Java API calls without touching components.

## Notes / Questions

- Auth on AWS: keep Supabase Auth (works fine with any backend via JWT verification) or migrate to Amazon Cognito? Recommendation: keep Supabase Auth for MVP — the Java backend can verify Supabase JWTs — and revisit Cognito only if consolidating on AWS becomes a hard requirement. Migrating auth mid-build is high-risk, low-reward.
- Database: Supabase is Postgres; the natural AWS target is RDS/Aurora Postgres, making migration a schema move, not a rewrite.
- API style: REST (recommended for this team size) vs GraphQL. The screens are list-heavy and stable; REST + a few composite endpoints (e.g., `/home-feed`) is simpler to build and cache.
- Content-view tracking needs a privacy note in the policy; batch events client-side (flush every N views / on background) rather than one request per tap.
- Decide TypeScript adoption now: the prototype is plain JSX; the API layer is the highest-value place to introduce TS types (models above become `.d.ts`/zod schemas). Recommend yes before pages are built.

## Acceptance Criteria

- [ ] Documented schema for every global model, agreed with the backend team (checked into the repo as the contract).
- [ ] All network I/O flows through the API client layer; no component or page imports Supabase/fetch directly (lint rule enforced).
- [ ] Ticketmaster key no longer ships in the client bundle; tonight/weekend/search come from backend endpoints with caching.
- [ ] Auth token attaches to every API call; 401s route the user to re-auth cleanly.
- [ ] `trackView` batches and sends view events for articles, events, and artists.
- [ ] Pull-to-refresh utility works on Home, Explore, Guide, and Calendar, refetching that page's queries only.
- [ ] Swapping a domain module's backend (Supabase → Java API) requires zero component changes, demonstrated with `savedEvents`.
