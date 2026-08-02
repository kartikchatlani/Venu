# Venu — Jira Stories Index

**61 stories**, each scoped to a single deliverable, split by type: **5 Spikes**, **4 Infra**, **17 API**, **35 UI**. Every file has: header (Type · Epic · Depends on · Refs), **Deliverable**, Purpose, Description, Notes/Questions, Acceptance Criteria — ready to copy into Jira.

Sources: `venu_frontend_technical_list.md`, wireframes in `docs/screenshots/`, `INTENT.md`, `DESIGN_SYSTEM.md`, and the prototype source.

## Recommended sequencing

1. **Spikes first (sprint 0):** SPIKE-01/02/03 unblock everything; SPIKE-04 unblocks the events API; SPIKE-05 can wait.
2. **Platform + foundation in parallel:** INFRA-01..04 (per spike outcomes) while frontend builds UI-01..11 against mocked services and backend builds API-04, API-01..03.
3. **Auth:** API-04 → UI-12/13 — required before any `/me/*` feature works end-to-end.
4. **Pages:** each page's UI stories consume their API stories; pairs are noted in each file's Depends-on line.
5. **Social last:** API-11..13 + UI-32..35 have the most product open-questions (see Notes/Questions in those files).

## Spikes — Cloud & Architecture

| ID | Title |
|----|-------|
| SPIKE-01 | AWS Cloud Architecture Design |
| SPIKE-02 | Authentication Strategy |
| SPIKE-03 | CI/CD, IaC & Environments |
| SPIKE-04 | Ticketmaster Ingestion & Caching Strategy |
| SPIKE-05 | Push Notification & Reminder Delivery |

## Infra

| ID | Title |
|----|-------|
| INFRA-01 | Frontend Hosting on AWS |
| INFRA-02 | Backend Service Deployment (Java API) |
| INFRA-03 | Database Provisioning & Migration Tooling |
| INFRA-04 | CI/CD Pipelines |

## API Stories

| ID | Title | Epic |
|----|-------|------|
| API-01 | Events Feed Endpoints (Tonight/Weekend) | Events |
| API-02 | Event Search & Genre Filter | Events |
| API-03 | Saved Events (Wishlist/Going) | Events |
| API-04 | Auth Middleware & User Provisioning | Authentication |
| API-05 | User Profile Endpoints | Authentication |
| API-06 | Notifications Endpoints | Notifications |
| API-07 | Drops (Presales) & Reminders | The Drop |
| API-08 | Soundcheck (Daily Trivia) | Soundcheck |
| API-09 | Articles (Feed, Bookmarks, Read State) | Editorial |
| API-10 | Signal Feed & Festivals | Editorial/Events |
| API-11 | Friends (Search, Requests, Activity) | Social |
| API-12 | Crews (CRUD & Membership) | Social |
| API-13 | Crew Polls & Photos | Social |
| API-14 | Passport, Attendance & Badges | Profile |
| API-15 | Favorites & Reviews | Profile |
| API-16 | Media Upload (Presigned S3) | Platform |
| API-17 | Content View Tracking | Platform |

## UI Stories

| ID | Title | Epic |
|----|-------|------|
| UI-01 | App Shell: Routing & Bottom Tab Bar | Foundation |
| UI-02 | Page Header Component | Foundation |
| UI-03 | Display Primitives (Section Header, Tags, Badges) | Foundation |
| UI-04 | Input Controls (Search, Filter Pills, Toggle) | Foundation |
| UI-05 | Event Card: Row Variant | Foundation |
| UI-06 | Event Card: Poster Variant + Wishlist Heart | Foundation |
| UI-07 | Event Bottom Sheet | Foundation |
| UI-08 | Saved-Events Store + Confirmation Toast | Foundation |
| UI-09 | Avatar, Avatar Stack & Activity Row | Foundation |
| UI-10 | Editorial Cards (Article, Author, Bookmark, Sponsored) | Foundation |
| UI-11 | Notification Bell & Panel | Notifications |
| UI-12 | Auth Screens (Sign Up / Log In) | Authentication |
| UI-13 | Session, Protected Routes & Password Reset | Authentication |
| UI-14 | Home: Header & "Tonight." Hero | Home |
| UI-15 | Home: On Your Radar & Your Shows | Home |
| UI-16 | Home: Friend Activity & Editorial | Home |
| UI-17 | The Drop Card | The Drop |
| UI-18 | Soundcheck Card | Soundcheck |
| UI-19 | Explore: Header, City Picker, Search & Filters | Explore |
| UI-20 | Explore: Discover Feed | Explore |
| UI-21 | Explore: Map View | Explore |
| UI-22 | Guide: Layout & Article Feed | The Guide |
| UI-23 | Guide: Spotlight & Signal | The Guide |
| UI-24 | Article Reader Screen | The Guide |
| UI-25 | Calendar: Navigator, Grid & Legend | Calendar |
| UI-26 | Calendar: Event List & Status Controls | Calendar |
| UI-27 | Calendar Export (.ics / Google) | Calendar |
| UI-28 | Profile: Card, Stats, Edit & Share | Profile |
| UI-29 | Profile: Passport & Badges | Profile |
| UI-30 | Profile: Favorites & Reviews | Profile |
| UI-31 | Profile: Photo Albums | Profile |
| UI-32 | Crews: Cards & Create | Social |
| UI-33 | Crew Detail | Social |
| UI-34 | Friends Sub-Page | Social |
| UI-35 | Add Friends Sheet | Social |

## Known gaps flagged inside stories

- **Album metadata endpoints** — UI-31 needs a small API addition (albums tables/endpoints); flagged in that story.
- **Contact sync & QR scanning** — privacy/platform work split out of UI-35/API-11; needs product + legal first.
- **Blocking/reporting users, image moderation** — pre-public-launch requirements, flagged in API-11/15/16.
- **Full Passport history view, Drops list page, crew activity feed** — stubbed links; future stories.

## Backend language note (AWS)

Java + Spring Boot is a solid choice — deploy on ECS Fargate (not Lambda; JVM cold starts). Strongest alternative: TypeScript + NestJS for one language across the stack. Middle path: Kotlin + Spring. Team familiarity should decide; nothing in Venu's workload demands a specific runtime. Regardless of language: proxy Ticketmaster server-side (the key currently ships in the client bundle — see SPIKE-04/API-01) and keep Supabase Auth/Postgres through MVP rather than rewriting auth mid-build (SPIKE-02).
