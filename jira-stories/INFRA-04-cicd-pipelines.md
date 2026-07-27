# INFRA-04 — CI/CD Pipelines (Frontend + Backend)

**Type:** Infra Story · **Epic:** Cloud & Platform · **Depends on:** SPIKE-03 (design), INFRA-01, INFRA-02

## Deliverable

GitHub Actions pipelines that take both apps from PR to production: PR checks (lint/test/build) and deploy workflows (frontend → S3/CloudFront, backend → ECR/ECS) with a manual prod gate.

## Purpose

Make deployment boring: every merge to main lands in dev automatically, and prod releases are a button press — no laptop deploys, no snowflake steps.

## Description

- **PR workflow (both apps):** ESLint + build for the frontend (`npm run lint`, `npm run build`); tests + build for the Java service. Failing checks block merge.
- **Frontend deploy:** on merge to main — build with dev env vars → sync to S3 → CloudFront invalidation of `index.html`; prod deploy on manual approval/release tag with prod env vars.
- **Backend deploy:** on merge — test → build image → push ECR → update ECS service (rolling); prod behind the same manual gate; DB migrations run per SPIKE-03's decision.
- AWS auth from Actions via OIDC role assumption (no long-lived keys in GitHub secrets).
- Deploy notifications to the team channel with version/commit links.

## Notes / Questions

- Monorepo vs split repos for frontend/backend? Current repo is frontend-only — decide before the Java service scaffolds (monorepo keeps the API contract close; separate repos keep pipelines simpler). Needs a team decision.
- Add a Playwright smoke test post-deploy to dev (login + load Home)? Recommended small addition.
- Rollback: document/redeploy-previous-image path for backend; S3 versioning or re-run for frontend.

## Acceptance Criteria

- [ ] A failing lint/test/build blocks PR merge on both apps.
- [ ] Merge to main auto-deploys both apps to dev with no manual steps.
- [ ] Prod deploy requires explicit approval and completes with zero-downtime rolling update (backend) and cache-correct swap (frontend).
- [ ] GitHub authenticates to AWS via OIDC; no static AWS keys exist in repo secrets.
- [ ] A rollback of each app is demonstrated and documented.
