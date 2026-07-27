# SPIKE-05 — Push Notification & Reminder Delivery

**Type:** Spike (timeboxed, e.g. 2 days) · **Epic:** Cloud & Platform · **Depends on:** SPIKE-01, SPIKE-02

## Deliverable

A decision doc on how Venu delivers time-critical notifications (presale "Remind Me" alerts, show-tomorrow reminders) beyond the in-app panel — Web Push vs email vs SMS vs native-app-later — with a scheduling architecture sketch (e.g., EventBridge Scheduler → SNS/SES → user).

## Purpose

The Drop's core promise (INTENT.md) is "never miss a presale" — an in-app notification the user sees *after* the presale started is a broken promise. We need to know what delivery channel is feasible for a web app before committing API-07's reminder feature.

## Description

- **Web Push** (Service Worker + Push API): free, works on Android/desktop; iOS Safari requires the app be installed to home screen (PWA) — assess real-world reach for our audience.
- **Email** (SES): universally reachable, weakest urgency; fine fallback for "presale tomorrow", weak for "presale in 15 minutes".
- **SMS** (SNS/Twilio): high urgency, costs per message, needs phone collection + consent.
- **Scheduling architecture**: how a reminder registered in API-07 becomes a delivery at T-minus-X (EventBridge Scheduler, SQS delay queues, or a cron sweep).
- PWA question: is Venu shipping as an installable PWA at MVP (affects Web Push viability and the pull-to-refresh/native-feel stories)?

## Notes / Questions

- Recommend deciding the *channel matrix* per notification type, not one channel for all (e.g., presale alerts → push + email fallback; social notifications → in-app only).
- Consent/opt-in UX and unsubscribe handling are product + legal questions — flag early.
- If the roadmap includes native mobile apps, don't over-invest in Web Push plumbing now — the scheduling backend is the durable part either way.

## Acceptance Criteria

- [ ] Doc assesses reach/cost/effort for Web Push, email, SMS for our user base (iOS-heavy assumption should be validated).
- [ ] Scheduling architecture is sketched end-to-end (reminder row → scheduled trigger → delivery → status tracking).
- [ ] PWA-at-MVP question answered with product.
- [ ] Recommendation with per-notification-type channels; follow-up implementation stories drafted.
