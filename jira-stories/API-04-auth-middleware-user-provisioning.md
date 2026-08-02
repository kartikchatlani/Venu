# API-04 — Auth Middleware & User Provisioning

**Type:** API Story · **Epic:** Authentication · **Depends on:** SPIKE-02 (provider decision), INFRA-02, INFRA-03

## Deliverable

Backend auth is functional: every protected endpoint validates the bearer token (per SPIKE-02's chosen provider), and a first-time authenticated user automatically gets a `users` row — the security layer all `/me/*` endpoints build on.

## Purpose

Establish one authentication path through the Java service so individual API stories inherit "who is calling" for free and no endpoint hand-rolls token logic.

## Description

- Spring Security filter validating JWTs against the provider's JWKS (Supabase or Cognito per SPIKE-02): signature, expiry, issuer, audience.
- Resolved identity exposed to controllers as a typed `CurrentUser` (internal user id + provider subject).
- **Provisioning:** on first valid token with no matching `users` row, create one (provider subject id, email, display name from token metadata — display name falls back to email prefix, matching the existing frontend convention).
- Standard error contract: 401 (missing/invalid/expired token) vs 403 (valid but not permitted), consistent JSON error body.
- Public-route allowlist (event feeds, health check); everything else authenticated by default.

## Notes / Questions

- Username generation at provision time: derive from email prefix with collision suffix, or leave null until the user sets one in Edit Profile? Recommend the latter — usernames are user-facing identity (see @-handles in wireframes).
- Clock-skew tolerance and JWKS cache/rotation handling — small but easy to get wrong; include in tests.
- Rate limiting on auth failures to blunt token-guessing noise.

## Acceptance Criteria

- [ ] A valid token from the chosen provider reaches a protected echo endpoint and returns the resolved user; tampered/expired tokens get 401 with the standard error body.
- [ ] First authenticated call from a new user creates exactly one `users` row (idempotent under parallel first-requests).
- [ ] Public allowlist routes work without a token; all other routes reject anonymous calls by default (verified by a route-scan test).
- [ ] JWKS rotation is handled (cache with refresh on unknown key id).
- [ ] Auth setup documented for backend devs (how to add a protected endpoint, how to get `CurrentUser`).
