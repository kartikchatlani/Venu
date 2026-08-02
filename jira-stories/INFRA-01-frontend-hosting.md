# INFRA-01 — Frontend Hosting on AWS

**Type:** Infra Story · **Epic:** Cloud & Platform · **Depends on:** SPIKE-01 (architecture), SPIKE-03 (IaC choice)

## Deliverable

The React app served from AWS at a real domain over HTTPS in dev and prod (baseline: S3 + CloudFront + Route 53 + ACM, defined in IaC) — replacing local-only Vite serving.

## Purpose

Get the Vite build off laptops and onto AWS so every merged change is viewable at a stable URL by the team and stakeholders.

## Description

- S3 bucket (private, CloudFront origin-access) per environment holding the `npm run build` output.
- CloudFront distribution with SPA routing (404/403 → `index.html` rewrite so React Router deep links work), compression, and sensible cache headers (hashed assets long-lived; `index.html` no-cache).
- Domain + TLS: Route 53 records and ACM certificate for the chosen domain (dev subdomain + prod).
- Environment configuration: `VITE_*` values injected at build time per environment (and confirm no secrets are among them — see SPIKE-04 note on the Ticketmaster key).
- All defined in the IaC tool chosen in SPIKE-03.

## Notes / Questions

- Domain to use? Needs a purchased/available domain decision from the team.
- Basic-auth or IP-restrict the dev environment, or leave it public-but-unlisted?
- CloudFront invalidation on deploy is handled in INFRA-04's pipeline — this story can deploy manually.

## Acceptance Criteria

- [ ] `npm run build` output loads at the dev URL over HTTPS with a valid certificate.
- [ ] Deep links (e.g., `/calendar`) load correctly on hard refresh (SPA rewrite works).
- [ ] Hashed assets are cached long-term; new deploys show up without users hard-refreshing.
- [ ] Infrastructure is fully reproducible from IaC (no console-only resources).
- [ ] No secret values are present in the shipped JS bundle.
