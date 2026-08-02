# UI-18 — Soundcheck Card (Daily Trivia on Home)

**Type:** UI Story · **Epic:** Soundcheck · **Depends on:** UI-14 (Home container), API-08 · **Refs:** `docs/screenshots/tab-home-bottom.png` (Soundcheck section); `src/pages/Home.jsx`

## Deliverable

The interactive Soundcheck card on Home: daily question, answer selection with reveal, streak flame, city stats footer, and next-question countdown.

## Purpose

The daily ritual that brings users back — answer one music question, keep the streak, see how Austin did.

## Description

- **Unanswered state** — "SOUNDCHECK" label + streak indicator (🔥 N), question text (Fraunces), 4 multiple-choice answer buttons (Mono, radius 2), stats footer teaser.
- **Answering** — tap locks selection, submits to API-08; correct answer highlights (amber/positive), wrong pick marked (ember); per-option city-wide percentages render on the options.
- **Answered state** (persists via API) — revealed card with your result, stats, streak (updated), and "NEXT QUESTION IN 07:42:10" countdown to the reset boundary.
- **Streak detail** — tapping the streak opens a small detail view/sheet: current streak, best streak, days played (API-08 streak endpoint).
- Double-submit prevented client-side; 409 from API resolves to the answered state.

## Notes / Questions

- Streak-at-risk nudge (unanswered late in the day) — nice-to-have notification type; out of scope here, note for the notifications backlog.
- Animation budget: reveal transition adds delight — keep it CSS-only, respect `prefers-reduced-motion`.
- Wireframe shows the card between Drop and lower sections — final position per UI-16's order decision.

## Acceptance Criteria

- [ ] Fresh users see today's question and can answer exactly once; the reveal shows correctness + city percentages.
- [ ] Reloading shows the answered card (state from API), never a re-answerable question.
- [ ] Streak displays and updates on answer; streak detail opens with current/best/days played.
- [ ] Reset countdown displays and rolls to the new question at the boundary (verified with a near-boundary test).
- [ ] Correct answer never appears in network payloads before submission (client respects API-08's contract).
- [ ] Reduced-motion users get an instant reveal.
