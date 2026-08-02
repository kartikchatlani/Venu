# UI-12 — Auth Screens (Sign Up / Log In)

**Type:** UI Story · **Epic:** Authentication · **Depends on:** SPIKE-02 (provider decision) · **Refs:** `src/pages/Auth.jsx` (prototype), `DESIGN_SYSTEM.md`

## Deliverable

Production sign-up and log-in screens for the chosen auth provider — the front door of the app, replacing the prototype's basic Auth page.

## Purpose

Every user starts here; the screens must handle the full happy path plus the real-world failure modes (wrong password, existing account, weak password, unverified email) with After Dark styling.

## Description

- **Log in** — email + password (Inter inputs per design system), submit with loading state, provider error mapping to human messages ("Wrong email or password", not raw API errors), link to sign up + forgot password (flow in UI-13).
- **Sign up** — email, password (+ confirm or show-password toggle — design call), display name field (feeds `full_name` metadata the app derives names from — existing convention), client-side validation before submit, duplicate-account error handling.
- Email verification handling per SPIKE-02's decision (blocked-until-verified vs soft prompt).
- Post-auth redirect to `/home` (or the deep link that triggered the auth wall).
- Venu branding treatment (wordmark, Fraunces) consistent with the app's tone.

## Notes / Questions

- Social login (Spotify/Google/Apple) at MVP? Per SPIKE-02 — buttons are easy to add later; layout should reserve space if planned.
- Password policy: mirror the provider's rules client-side so users aren't rejected server-side with vague errors.
- Terms/privacy links must exist before public launch — include placeholder row now.

## Acceptance Criteria

- [ ] New users can sign up, (verify email per policy,) and land authenticated on Home.
- [ ] Existing users log in; wrong credentials show a human error without clearing the email field.
- [ ] Validation errors render per-field, inline, before network calls where possible.
- [ ] Deep-linked visitors return to their original destination after auth.
- [ ] Screens match the design system (fonts, radii, dark palette) at 375px.
- [ ] Display name is captured at signup and appears in the Home header/Profile immediately.
