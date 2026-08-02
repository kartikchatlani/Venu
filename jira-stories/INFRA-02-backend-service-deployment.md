# INFRA-02 — Backend Service Deployment (Java API)

**Type:** Infra Story · **Epic:** Cloud & Platform · **Depends on:** SPIKE-01, SPIKE-03, INFRA-03 (database to connect to)

## Deliverable

A containerized Spring Boot service running on AWS (baseline: ECS Fargate behind an ALB) reachable at `https://api.<domain>` in dev, with health checks, logs, and secrets wiring — the platform every API story deploys onto.

## Purpose

API stories need somewhere to run. This story stands up the backend runtime once, so subsequent API work is "merge and it deploys," not infrastructure work.

## Description

- Dockerfile for the Spring Boot app; ECR repository per SPIKE-03 conventions.
- ECS Fargate service + task definition (right-sized small for MVP), ALB with HTTPS listener, target-group health check on `/actuator/health`.
- VPC/security groups per SPIKE-01 layout (ALB public, tasks private, DB reachable from tasks only).
- Secrets (DB credentials, Ticketmaster key, JWT/JWKS config) injected from Secrets Manager/Parameter Store — never baked into images.
- CloudWatch log group with structured JSON logs; basic alarms (5xx rate, unhealthy hosts).
- CORS configured for the frontend origins (dev + prod domains).

## Notes / Questions

- Instance count/auto-scaling: fixed 1–2 tasks is fine for MVP; document the scaling knob.
- Spring Boot 3.x + Java 21 assumed — confirm versions with the backend team before the Dockerfile lands.
- If SPIKE-01 chose differently (e.g., App Runner or Lambda+SnapStart), this story's shape changes — re-point before starting.

## Acceptance Criteria

- [ ] A hello-world Spring Boot endpoint responds at `https://api.<dev-domain>` with valid TLS.
- [ ] Health checks gate deployments; a failing container never receives traffic.
- [ ] Secrets are readable by the task at runtime and absent from the image and task definition plaintext.
- [ ] Logs are queryable in CloudWatch; 5xx alarm notifies the team channel.
- [ ] Frontend dev site can call the API cross-origin without CORS errors.
- [ ] All resources defined in IaC.
