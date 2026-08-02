# SPIKE-01 — AWS Cloud Architecture Design

**Type:** Spike (timeboxed, e.g. 3–5 days) · **Epic:** Cloud & Platform · **Depends on:** —

## Deliverable

An architecture diagram + written Architecture Decision Record (ADR) covering: frontend hosting, backend compute, database, media storage, networking, and environments — reviewed by the team, with the follow-up INFRA stories confirmed/adjusted from its findings.

## Purpose

We plan to host Venu on AWS (React frontend, Java backend) but have no agreed architecture. This spike produces the blueprint every INFRA story builds from, so we don't provision services ad hoc.

## Description

Research and decide (with cost estimates at MVP scale, ~single-city user base):

- **Frontend hosting** — S3 + CloudFront (baseline assumption) vs AWS Amplify Hosting; domain + TLS via Route 53/ACM.
- **Backend compute** — ECS Fargate containers vs Lambda vs Elastic Beanstalk for a Spring Boot service (note: JVM cold starts make Lambda a poor fit unless we switch language — see README language note).
- **Database** — RDS PostgreSQL vs Aurora Serverless v2; sizing; migration path from Supabase Postgres.
- **Media storage** — S3 buckets for avatars/banners/albums/crew photos; CloudFront delivery; upload pattern (presigned URLs, see API-16).
- **Networking/security** — VPC layout, ALB, security groups, secrets management (Secrets Manager vs Parameter Store) for the Ticketmaster key etc.
- **Environments** — dev / staging / prod strategy and account structure.

## Notes / Questions

- Keep Supabase (auth + DB) during transition? SPIKE-02 owns the auth half; this spike owns the DB migration path.
- Budget constraint? A rough monthly cost ceiling from the team would shape choices (Fargate + RDS ≈ $50–150/mo minimum footprint even idle).
- Does the team want infrastructure-as-code from day one (feeds SPIKE-03)? Recommend yes.

## Acceptance Criteria

- [ ] Diagram shows all components and data flows (browser → CDN → API → DB/S3/Ticketmaster).
- [ ] ADR documents each choice, the alternatives considered, and monthly cost estimate.
- [ ] Supabase → AWS migration path (or keep-Supabase decision) is explicit.
- [ ] Team has reviewed and signed off; INFRA-01..04 stories updated to match decisions.
