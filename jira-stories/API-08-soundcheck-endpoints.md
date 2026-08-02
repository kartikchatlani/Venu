# API-08 — Soundcheck (Daily Trivia) Endpoints

**Type:** API Story · **Epic:** Soundcheck · **Depends on:** API-04

## Deliverable

`GET /api/v1/soundcheck/today`, `POST /api/v1/soundcheck/today/answer`, `GET /api/v1/me/soundcheck/streak` — question serving, answer grading, streaks, and city-wide stats for the Home trivia card (UI-18).

## Purpose

Run the daily-trivia loop server-side: one question per day for everyone, answers graded without shipping the correct answer to the client, streaks tracked, and "X% of Austin got this right" aggregated.

## Description

- Tables: `soundcheck_questions(id, question, options[4], correct_index, active_date)`, `soundcheck_answers(user_id, question_id, chosen_index, correct, answered_at)` (unique user+question).
- `GET /today`: today's question (city-fixed day boundary: midnight America/Chicago per product note) *without* `correct_index`; includes the caller's answer state if already answered (so reopening shows the answered card) and seconds-until-reset.
- `POST /answer`: accepts `chosen_index`, grades, stores, returns correct index + per-option answer distribution + updated streak. Second submission → 409.
- Streak: consecutive days answered (correctness not required — pending product confirmation); computed on write, returned via the streak endpoint with current/best/days-played.
- Seed content: import an initial question bank (~90 questions) via migration/admin path.

## Notes / Questions

- Confirm streak rule (answering vs answering correctly) with product — implementation differs by one column either way; default: answering.
- Who authors questions long-term, and does auto-repeat kick in when the pool empties? Flag to editorial.
- Time zone: fixed city time keeps "% of Austin" coherent — revisit per-user timezones only with multi-city.

## Acceptance Criteria

- [ ] Today's question payload never contains the correct answer before submission (verified in contract test).
- [ ] First answer grades and persists; repeat submission returns 409 and the original result.
- [ ] Answered-state comes back on GET so the client can render the completed card.
- [ ] Streak increments across consecutive days, resets after a gap, and best-streak is retained (time-travel tests).
- [ ] Stats distribution reflects all users' answers for that question.
- [ ] Question rolls over exactly at the configured boundary; OpenAPI documented.
