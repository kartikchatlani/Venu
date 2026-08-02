# UI-32 — Crews: Cards & Create Flow

**Type:** UI Story · **Epic:** Social · **Depends on:** UI-28 (Profile frame), UI-09 (avatar stack), API-12 · **Refs:** tech list Profile components (Crew Card, Create New Crew Button); `INTENT.md` Crews section

## Deliverable

The Crews section on Profile: crew cards (cover, name, member stack, activity chips, linked event) + the dashed "Create New Crew" button and its creation flow.

## Purpose

Crews are the app's group-coordination anchor; this story makes them visible and creatable — the detail screen's tools land in UI-33.

## Description

- **Crews section** — SectionHeader ("Crews" / "Manage") + vertical stack of Crew Cards per the tech list: cover photo, crew name (Fraunces), member AvatarStack, chips summarizing content (POLLS · LINEUP · PHOTOS), and the linked upcoming event row (tap → event sheet); card tap → crew detail (UI-33).
- **Create New Crew Button** — dashed-outline card variant (per tech list) opening the create flow: crew name, optional cover upload (API-16), invite friends (multi-select from friends list, API-11); creates via API-12 and lands in the new crew's detail.
- Invited users get notifications (API-12/06 wiring) and see pending-invite state.
- Empty state: only the dashed create button with a one-line pitch ("Start a crew for your show squad").

## Notes / Questions

- "Manage" link action: same as scrolling the section (no separate manage screen needed at MVP) — recommend dropping the link or pointing it at the section itself; confirm with design.
- Invite step with zero friends: allow creating an empty crew and prompt Add Friends (UI-35) — don't block creation.
- Crew card chips are summaries, not buttons (detail handles interaction) — confirm.

## Acceptance Criteria

- [ ] Crew cards render cover, name, member stack, chips, and linked event; tap opens crew detail.
- [ ] Create flow: name validation, optional cover upload, friend multi-select invite — completes end-to-end via API-12.
- [ ] Invitees receive the invite (notification + pending state visible to creator).
- [ ] Linked event row opens the event sheet without entering the crew.
- [ ] Empty state renders the dashed create card; users in zero crews aren't shown an empty header.
