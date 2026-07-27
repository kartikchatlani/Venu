# VENU-011 — Soundcheck (Daily Trivia Card)

**Suggested epic:** Pages / Home · **Depends on:** VENU-009 (Home layout) · **Wireframe ref:** `docs/screenshots/tab-home-scroll.png` / `tab-home-bottom.png` (Soundcheck section) · **Prototype ref:** `src/pages/Home.jsx` (Soundcheck section)

## Purpose

Build the daily music-trivia card that gives users a reason to open Venu every day — one question, a streak to protect, and city-wide stats that make it social without requiring friends.

## Description

- **Soundcheck Card** on Home containing:
  - Daily question (one per day, resets at a fixed local time) with multiple-choice answers.
  - Answer flow: user selects → correct answer revealed with visual feedback (correct = amber/green treatment, wrong pick = ember) → city-wide stats footer ("64% of Austin got this right").
  - Streak counter (🔥 N-day streak) with a tappable streak detail view.
  - Reset timer showing time until the next question.
  - Answered state persists — reopening the app shows the answered card, not a fresh question.
- Streak rules: consecutive days answered (regardless of correctness? see Questions); missing a day resets to 0.

## Notes / Questions

- Product decision needed: does the streak count *answering* daily or *answering correctly*? (Recommend answering — keeps the habit loop forgiving.)
- Question source: who authors questions — editorial team via CMS/backend table? Needs at least ~90 seeded questions for MVP; auto-repeat policy after the pool is exhausted?
- Reset time: midnight local (per-user timezone) or a fixed city time (midnight CT for Austin)? City-wide stats are simpler with a fixed city time — recommend midnight CT for the Austin-only MVP.
- City-wide stats require server-side aggregation of answers (VENU-020 API) — client shows percentages only after the user answers (no spoilers).
- Anti-cheat is a non-goal for MVP (it's for fun), but the correct answer shouldn't ship in the initial payload — fetch it on submit.

## Acceptance Criteria

- [ ] One question renders per day; the same question shows for all users that day.
- [ ] Selecting an answer locks the choice, reveals the correct answer with distinct correct/incorrect treatments, and shows city-wide stats.
- [ ] Answered state persists across sessions/devices for that day; the card shows the countdown to the next question.
- [ ] Streak increments on consecutive-day answers, resets after a missed day, and displays on the card.
- [ ] Tapping the streak opens a streak detail view (current streak, best streak, days played).
- [ ] Correct answer is not present in the client payload before submission.
