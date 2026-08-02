# UI-13 — Session Handling, Protected Routes & Password Reset

**Type:** UI Story · **Epic:** Authentication · **Depends on:** UI-01, UI-12, SPIKE-02 · **Refs:** `src/App.jsx` (current session handling)

## Deliverable

The client auth plumbing: session persistence + refresh, route protection (auth wall), logout, password-reset flow, and automatic auth headers on every API call.

## Purpose

UI-12 gets users in; this story keeps them in correctly — sessions survive reloads, expired tokens refresh silently, protected pages redirect cleanly, and logout actually clears state.

## Description

- Session bootstrapping on app load (restore from provider SDK/storage), loading gate so protected pages don't flash before auth resolves.
- Route protection in the router: unauthenticated → Auth screen, preserving the intended destination for post-login redirect.
- Token refresh: silent refresh per provider; on unrecoverable 401 from the API, sign out gracefully with a message (coordinate the error contract with API-04).
- API client integration: attach bearer token to every request from one place (the client layer, no per-call header code).
- **Password reset** — request screen (email entry → confirmation message regardless of account existence) and reset completion screen (from email link) per the provider's flow.
- Logout (from Profile settings): clears session, stores (UI-08 etc.), and redirects to Auth.

## Notes / Questions

- "Remember me" / session length: default to the provider's long-lived refresh behavior — confirm product is fine with staying logged in indefinitely on personal devices.
- Multi-tab behavior: logout in one tab should sign out others (storage event listener) — cheap, include it.

## Acceptance Criteria

- [ ] Reload while logged in restores the session without a visible auth flash; reload while logged out lands on Auth.
- [ ] Every protected route redirects unauthenticated users and returns them post-login.
- [ ] Expired access tokens refresh transparently during active use; a dead session signs out with a friendly message.
- [ ] All API calls carry auth automatically; no component sets headers.
- [ ] Password reset works end-to-end via a real email; the request screen doesn't reveal whether an email exists.
- [ ] Logout clears all client state (verified: no stale saved-events after re-login as another user) and syncs across tabs.
