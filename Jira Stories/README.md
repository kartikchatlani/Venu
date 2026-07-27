# Venu — Jira Stories Index

20 stories generated from `venu_frontend_technical_list.md`, the wireframe screenshots in `docs/screenshots/`, and `INTENT.md`. Each file has the four Jira fields (Purpose, Description, Notes/Questions, Acceptance Criteria) ready to copy over, plus a header line with suggested epic, dependencies, and wireframe/prototype references.

## Suggested build order

| # | Story | Epic |
|---|-------|------|
| VENU-001 | App Shell, Routing & Navigation Chrome | Foundation |
| VENU-002 | Shared UI Primitives Library | Foundation |
| VENU-003 | Event Card Components (Row + Poster) | Foundation |
| VENU-004 | Event Bottom Sheet | Foundation |
| VENU-005 | Wishlist/Going State + Confirmation Toast | Foundation |
| VENU-006 | Avatar, Avatar Stack & Friend Activity Row | Foundation |
| VENU-007 | Editorial Components | Foundation |
| VENU-008 | Notifications (Bell + Panel) | Foundation |
| VENU-009 | Home Page Assembly | Pages |
| VENU-010 | The Drop (Presale Card) | Pages |
| VENU-011 | Soundcheck (Daily Trivia) | Pages |
| VENU-012 | Explore Page (Discover View) | Pages |
| VENU-013 | Explore Map View | Pages |
| VENU-014 | The Guide Page | Pages |
| VENU-015 | Calendar Page (My Shows) | Pages |
| VENU-016 | Calendar External Sync | Integrations |
| VENU-017 | Profile Page (Passport & Collections) | Pages |
| VENU-018 | Crews | Social |
| VENU-019 | Friends & Add Friends Flow | Social |
| VENU-020 | Global Data Layer & Backend API Contract | Platform |

Foundation stories (001–008) map to the tech list's "build these first" summary. VENU-020 should start in parallel with VENU-001 since it unblocks the backend team.

## Backend language note (AWS hosting)

Java (Spring Boot) is a solid, safe choice for this backend on AWS — mature ecosystem, first-class AWS SDK, easy hiring. Nothing in Venu's workload (REST CRUD, third-party API proxying, feeds, notifications) *requires* the JVM, so the honest answer is: **team familiarity should decide.**

- **If the backend developers already know Java** → keep Java + Spring Boot. Recommended deployment: ECS Fargate (containers) rather than Lambda — JVM cold starts make Java awkward for serverless.
- **Worth considering: TypeScript + Node (NestJS)** — one language across the whole stack, shared type definitions for the event/user models in VENU-020, faster iteration for a small team, and cheap Lambda deploys if you go serverless. This is the strongest alternative given the team is already writing React.
- **Middle path: Kotlin + Spring Boot** — keeps the JVM/Spring ecosystem with far less boilerplate than Java.

Either way, two AWS-migration facts from the current prototype matter more than the language choice:

1. **The Ticketmaster API key currently ships to every browser** (`VITE_` env vars are public) — the backend's first job is proxying Ticketmaster (VENU-020).
2. **Supabase is Postgres** — keep Supabase Auth + DB through MVP and migrate the schema to RDS/Aurora Postgres later; don't rewrite auth mid-build.
