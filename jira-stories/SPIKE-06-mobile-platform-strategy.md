# SPIKE-06 — Mobile Platform Strategy: Web/PWA vs Native App

**Type:** Spike (timeboxed, 2–3 days) · **Epic:** Cloud & Platform · **Depends on:** SPIKE-01 (aligns) · **Feeds:** SPIKE-05, UI-01..35, INFRA-01, INFRA-04 · **Jira:** VENU-76

## Deliverable

A team decision on what Venu ships as at MVP — website/PWA vs native phone app — with full analysis, story-impact mapping, and recommendation. Draft analysis: `docs/spikes/SPIKE-06-mobile-platform-strategy.md`.

## Purpose

The intent doc rejected "web-first launch" (push notifications and camera are core to the loop), yet all 35 UI stories build a React website. On the web, iPhones only receive push notifications after a manual home-screen install — a web-only Drop can't keep its "never miss a presale" promise for most of our likely users. Must be decided before UI-01 starts: changing direction now costs a week of spec rewrites; after Phase 1 it costs a view-layer rewrite.

## Description

Compare four paths for a team with no mobile experience: PWA (current plan), Capacitor (wrap the web app), React Native + Expo, Flutter/native. Analysis recommends **React Native + Expo, decided now** — RN reuses ~80% of the team's React knowledge and Expo removes the native toolchain (cloud builds, managed signing, first-party push/camera/calendar, OTA updates). ~28 of 61 issues (all API, INFRA-02/03, SPIKE-01 backend, SPIKE-02, SPIKE-04) are unchanged under any option.

## Notes / Questions

- For PO: does Founding Guides need a shareable no-install experience at launch? Any hard Phase 1 date? Is store presence part of venue-partnership credibility?
- Cost if native: ~2–4 wk learning ramp, Phase 1 ~3–6 wks later, Apple $99/yr + Google $25.
- Runner-up (web Phase 1 → RN Phase 2) documented in the analysis doc §2/§6.

## Acceptance Criteria

- [ ] Team reviews the analysis doc; PO makes the platform call.
- [ ] Decision recorded ADR-style in the doc with rationale.
- [ ] If native: UI story specs re-pointed, SPIKE-05 rescoped, INFRA-01 replaced, MOB-01..03 stories created.
- [ ] If web-first: SPIKE-05 proceeds as written; PWA-install story added; revisit trigger for native defined.
