# SPIKE-03 — CI/CD, Infrastructure-as-Code & Environments

**Type:** Spike (timeboxed, e.g. 2–3 days) · **Epic:** Cloud & Platform · **Depends on:** SPIKE-01 (target architecture)

## Deliverable

A decision doc: IaC tool (Terraform vs AWS CDK vs CloudFormation), CI/CD design (build → test → deploy for both frontend and backend), branching/environment promotion model — with a walking-skeleton pipeline proving it (deploy a hello-world to dev).

## Purpose

Before the team ships INFRA stories, we need to agree how infrastructure is defined and how code reaches AWS. Deciding this late means hand-built consoles nobody can reproduce.

## Description

- **IaC choice** — Terraform vs CDK (CDK-TypeScript pairs well if the team leans TS; Terraform is the most portable/hireable). Repository layout for infra code.
- **CI/CD** — the repo already has `.github/` — assume GitHub Actions: frontend pipeline (lint → build → deploy to S3/CloudFront invalidation), backend pipeline (test → build image → push ECR → deploy ECS), plus PR preview strategy if cheap.
- **Environments & promotion** — dev/staging/prod; auto-deploy dev on merge to main, manual gate to prod; secrets handling per environment.
- **Walking skeleton** — prove the pipeline end-to-end with a trivial app before real workloads.

## Notes / Questions

- Single AWS account with env prefixes vs multi-account (Organizations)? Multi-account is best practice but heavier — right-size for team maturity.
- Where do database migrations run in the pipeline (Flyway/Liquibase step for the Java service)? Ties to INFRA-03.
- Do we want automated frontend tests (Playwright smoke) gating deploys from day one? Recommend a minimal smoke suite.

## Acceptance Criteria

- [ ] Decision doc covers IaC tool, pipeline design, environment/promotion model, and secrets strategy.
- [ ] Walking-skeleton pipeline deploys a hello-world frontend and backend to a dev environment from a merge to main.
- [ ] Rollback procedure documented for both frontend and backend deploys.
- [ ] INFRA-04 story updated with the concrete implementation plan.
