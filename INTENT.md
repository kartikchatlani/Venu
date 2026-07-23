# Venu — Product Intent Document

## Purpose

Venu is a music event discovery app built for people who go to shows. The core idea is simple: most people miss concerts they would have loved because they never heard about them in time. Venu fixes that by surfacing the right shows to the right person — before tickets sell out.

The app is designed around Austin, TX as its first city, a market with one of the densest live music scenes in the world. Every feature is built with the assumption that the user goes out regularly, cares about music deeply, and wants to feel like an insider rather than an afterthought.

---

## The Problem We're Solving

1. **Discovery is broken.** Spotify tells you what to listen to. Ticketmaster tells you what's for sale. Nobody tells you *what's happening tonight that you'd actually care about.*
2. **Presales are invisible.** The best seats go to fans who know the presale code and the exact drop time. That information is scattered across fan clubs, Reddit threads, and artist newsletters. Venu centralizes it.
3. **Going to shows is social, but the tools aren't.** People go to concerts with friends and crews, but no product connects the social layer to the ticketing layer in a meaningful way.

---

## Core Features

### The Drop (Presale Intelligence)
The most differentiated feature. Venu surfaces upcoming presales with:
- Countdown timers to the exact sale moment
- Presale access codes so users never have to hunt for them
- Remind Me alerts so users get notified before a sale opens
- On-sale tracking for events already available

### Event Discovery
- **Tonight in Austin** — real-time feed of shows happening tonight, powered by the Ticketmaster API with client-side date filtering to handle timezone accuracy
- **This Weekend** — upcoming shows through the weekend, deduped from tonight's listings
- **Festivals For You** — curated festival cards matched to the user's taste profile
- **On Your Radar** — personalized event recommendations scored by match percentage (♫ %)
- **Map View** — interactive Leaflet map with venue pins, tap-to-preview event info

### Event Detail (Bottom Sheet)
Tapping any event opens a full-screen bottom sheet with:
- Hero photo, artist name, opener(s)
- Date, doors time, venue
- Genre, price range, and ticket link
- Wishlist and Going actions
- Support act info parsed from Ticketmaster data

### Saved Events (Wishlist & Going)
Two distinct intent states:
- **Wishlist** (♥) — interested, want to track
- **Going** (✓) — confirmed, add to calendar
Switching between them upgrades/downgrades in place without duplication. Going events surface in the Home hero card and upcoming show strip.

### Crews
Group coordination built into the profile. Each crew has:
- A cover photo and member roster with RSVP status
- Upcoming events the crew is tracking
- Activity feed, polls, and photo grid
- Linked group playlist (Spotify, Apple Music, or YouTube)

### Profile & Passport
- User banner (customizable, like LinkedIn) with avatar overlap
- Music identity anchored to crews, saved events, and activity
- Passport section (in consideration) — a map of cities and venues the user has attended

### Friends Activity
A lightweight social feed on the Home page showing what friends are saving and going to, without requiring a full social graph build-out.

---

## Design Language — After Dark

Venu uses a custom dark-mode design system called **After Dark**, built for readability in low-light environments (bars, venues, outside at night).

| Token | Value | Role |
|---|---|---|
| Parchment | `#F4EFE7` | Primary text |
| Amber | `#C17F4A` | Accent, CTAs, active states |
| Ember | `#D94F2A` | Presale urgency, live indicators |
| Faded | `#8A8278` | Secondary text, metadata |
| Base | `#0C0A08` | Background |

**Typefaces:**
- *Fraunces* — editorial serif for headings and artist names
- *JetBrains Mono* — monospaced for metadata, codes, labels, and countdowns

The design avoids pure black backgrounds, instead using warm near-blacks that feel organic rather than digital.

---

## Scope (Current Prototype)

The current build is a **React 19 + Vite prototype** — a pixel-accurate interactive mockup running in a simulated phone frame (375px wide). It is not a production application but is designed to be built out to one.

**What is real:**
- Ticketmaster Discovery API integration (live Austin event data)
- Supabase backend for saved events (wishlist/going state persists across sessions)
- Auth via Supabase (email/password)

**What is mocked:**
- Match percentage scores (no ML model yet)
- Friends and their activity
- Presale data (hardcoded representative events)
- Crew members and their activity

---

## Goals

### Near-Term (Prototype → MVP)
- Expand presale data to pull from real sources (Ticketmaster, artist newsletters, Bandsintown)
- Build a real taste profile engine to power the match % score
- Add push notifications for Remind Me alerts
- Support multiple cities beyond Austin

### Medium-Term (MVP → Product)
- Social graph — follow friends, see their going/wishlist activity
- Crew coordination — shared event pages, split-ticket buying
- Passport — visual history of every show a user has attended
- Artist pages — follow artists, get notified of new Austin dates

### Long-Term (Product → Platform)
- Venue partnerships for exclusive presale codes distributed through Venu
- White-label version for venues to run their own fan clubs
- Analytics for venues: who's coming, what's the audience overlap with nearby shows

---

## Guiding Principles

1. **Insiders-first.** Every feature should make the user feel like they have access others don't. Presale codes, early alerts, and match scores should feel like a superpower.
2. **Dark by default.** The product lives at night. Every design decision should work at a bar, a festival, or in a dark car on the way to a show.
3. **No noise.** Surface fewer events better, not more events worse. A 96% match means something. Flooding the feed destroys trust.
4. **Social as a layer, not a requirement.** Users should get full value alone. Social features amplify the experience without gating it.
