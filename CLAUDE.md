# Venu

Music event discovery & booking app, launching in Austin, TX. The wireframe/POC phase is done;
the team is now rebuilding for production from the Jira stories. `src/` is a bare placeholder
scaffold awaiting the rebuild — the full prototype lives in `archived-src/` as reference only
(excluded from ESLint; don't extend it, but do consult it as the visual/behavioral spec).

## Team & how to work with us

- Three people: **Aaron** (product lead / PO), **Kartik** and **Jake** (devs). All devs are junior
  (a few years' experience); Jake comes from Angular and is learning React.
- Claude's role: technical advisor, reviewer, idea generator, and acting stakeholder. When
  discussing any design decision, **explain the feature's impact on Venu and what the choice costs
  or enables down the road** — not just what to do, but why and what happens if we're wrong.
- Prefer industry-standard, transferable patterns over clever ones; this codebase is also how the
  team levels up.

## Current phase

Sprint 1 (Aug 3–17, 2026): close the architecture spikes. SPIKE-01 (AWS architecture, VENU-66)
and SPIKE-06 (web vs native app, VENU-76) are both **In Review** — research drafts in
`docs/spikes/`, awaiting team sign-off. SPIKE-06 recommends React Native + Expo; if adopted,
UI story specs get re-pointed before UI-01 starts. Story sequencing and the full index:
`jira-stories/README.md`.

- **Jira:** https://aeweinbach.atlassian.net — project key `VENU` (14 epics, ~61 stories mirroring
  the `jira-stories/` folder; spikes are issue type "Spike").
- Planned production stack: React SPA (S3 + CloudFront) · Java Spring Boot API (ECS Fargate) ·
  Postgres (Supabase now, RDS later) · Supabase Auth (JWT validation in Spring) · Ticketmaster
  ingested server-side. Pending team sign-off on SPIKE-01.

## Key documents

- `Venu-Feature-List.md` — product intent doc + phased feature list (Phase 1 = core loop)
- `INTENT.md` — product vision, problems, guiding principles
- `jira-stories/` — all 61 story specs (UI/API/INFRA/SPIKE), ready-to-copy into Jira (already imported)
- `venu_frontend_technical_list.md` — global vs page-specific component inventory
- `docs/architecture.md` — prototype UI map + screenshots + React-for-Angular-devs primer
- `docs/spikes/` — spike research docs / ADR drafts
- `DESIGN_SYSTEM.md` — After Dark design system reference
- `CLAUDE_CONTEXT.md` — detailed prototype behavior notes (describes `archived-src/`, not `src/`)

## Stack (current scaffold)

- **React 19** + **Vite 8** (README says React 18 — stale)
- **React Router DOM 7** installed; production shell uses real routes (UI-01)
- Styling: inline CSS-in-JS (no framework)

## Commands

- `npm run dev` — start Vite dev server (http://localhost:5173)
- `npm run build` — production build
- `npm run preview` — preview production build
- `npm run lint` — ESLint (ignores `dist/` and `archived-src/`)

## Environment

Requires a `.env` at repo root (gitignored — never commit it):

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_TICKETMASTER_API_KEY` (prototype-era; production moves this server-side — never add new
  secrets as `VITE_` vars, they ship to the browser)

## Conventions

- Saved events have `status` of `"wishlist"` or `"going"` — two mutually exclusive intent states.
- All source files use `.jsx`, not `.js`.

## Design System

Full reference: `DESIGN_SYSTEM.md`. Key rules for any UI work:

- **borderRadius spec:** cards → `4`, buttons/chips/tags/avatars → `2`, phone frame → `44` (only exception). No pills (`16–30`), no circles (`"50%"`).
- **Fonts:** Fraunces (headlines/artist names, always italic at display sizes), JetBrains Mono (all metadata, prices, labels, buttons — uppercase + tracked), Inter (body prose and form inputs only).
- **Colors:** `#14110F` ink, `#F4EFE7` paper, `#C17F4A` burnt amber (accent), `#D94F2A` marquee red (live/urgent), `#8A8278` faded (secondary text).
- **No hover states** (mobile-first). Tappable elements use `.pressable` class for `:active` feedback.
- **Profile display name** is derived from `session.user.user_metadata.full_name` or parsed from the email prefix — not hardcoded.
