# SPIKE-02 — Authentication Strategy

**Type:** Spike (timeboxed, e.g. 2–3 days) · **Epic:** Authentication · **Depends on:** SPIKE-01 (runs in parallel, decisions must align)

## Deliverable

A written auth decision (ADR) — which identity provider Venu uses, how the Java backend validates tokens, and the session model — plus confirmed scope for UI-12, UI-13, and API-04.

## Purpose

The prototype uses Supabase Auth (email/password). Before building production auth screens and backend middleware, we must decide whether to keep Supabase Auth, move to Amazon Cognito, or run our own Spring Security setup — this decision touches every authenticated request.

## Description

Evaluate three options against: implementation effort, AWS alignment, cost, social-login support (Spotify login is strategically interesting for the taste profile), and migration risk:

1. **Keep Supabase Auth** — frontend keeps `@supabase/supabase-js`; Java backend validates Supabase JWTs (JWKS). Least work, proven in prototype.
2. **Amazon Cognito** — all-AWS; frontend uses Amplify/OIDC libs; backend validates Cognito JWTs. Requires migrating existing users.
3. **Custom Spring Security + JWT** — full control, most work, most security surface to own.

Also settle: token refresh/expiry strategy, password reset flow, email verification, and (future) OAuth providers (Spotify/Google/Apple).

## Notes / Questions

- Recommendation to validate, not assume: keep Supabase Auth for MVP (backend verifies its JWTs), revisit Cognito post-launch. Migrating auth mid-build is high-risk/low-reward.
- Does product want social login at MVP, or email/password only (current prototype behavior)?
- User records: does the Java backend keep its own `users` table keyed by the provider's subject id (recommended), and provision on first authenticated request (API-04)?

## Acceptance Criteria

- [ ] ADR compares the three options with a clear recommendation and rationale.
- [ ] Proof-of-concept: Java service validates a real token from the chosen provider.
- [ ] Token lifetime/refresh, password reset, and email verification flows are specified.
- [ ] UI-12, UI-13, API-04 story details updated to match the decision.
