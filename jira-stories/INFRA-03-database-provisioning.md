# INFRA-03 — Database Provisioning & Migration Tooling

**Type:** Infra Story · **Epic:** Cloud & Platform · **Depends on:** SPIKE-01 (RDS vs Aurora decision)

## Deliverable

A PostgreSQL instance per environment (baseline: RDS Postgres) with schema-migration tooling (Flyway or Liquibase) wired into the Java service, plus the initial baseline migration containing the core tables (users, events, saved_events).

## Purpose

Give the backend a real database with disciplined schema evolution from day one — every API story adds migrations rather than hand-run SQL.

## Description

- RDS PostgreSQL (small instance, storage autoscaling) in private subnets; credentials in Secrets Manager; automated backups + retention policy.
- Flyway/Liquibase integrated into the Spring Boot service (runs on startup in dev; pipeline-gated for prod per SPIKE-03).
- Baseline migration V1: `users`, `events`, `venues`, `artists`, `saved_events` tables matching the models the prototype already uses (`saved_events` with `status: wishlist|going` mirrors the Supabase table).
- Local development story: docker-compose Postgres so devs run the full stack locally.
- Document the Supabase → RDS data migration procedure (export/import) for when we cut over — actual cutover is a later story.

## Notes / Questions

- Flyway vs Liquibase: dev team preference; Flyway is simpler, recommend it absent strong feelings.
- Single DB shared by all domains for MVP (recommended) — revisit only if scale demands.
- Do we need staging data seeding (fake users/events) for QA? Recommend a seed migration/profile for dev+staging only.

## Acceptance Criteria

- [ ] Dev and prod databases exist in private subnets, reachable only from backend tasks (and a documented bastion/tunnel path for engineers).
- [ ] Spring Boot connects via Secrets Manager credentials; no credentials in config files.
- [ ] Baseline migration creates the core tables; a second dummy migration proves the evolution flow.
- [ ] `docker-compose up` gives a working local Postgres the service connects to.
- [ ] Backups enabled with tested restore procedure documented.
