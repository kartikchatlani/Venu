**Venu \- Product Intent Document**

**List of UI Features**

- **Authentication.**  
- **Event Discovery.**  
- **Map.**  
- **Save Events (wishlist, going).**  
- **Presale Reminders for liked artist (push notifications).**  
- **Match % Engine.**  
- **Friends Activity Feed.**  
- **Profiles.**  
- **Your Shows.**  
- **Calendar View.**  
- **Crews.**  
- **Artist Cards.**  
- **Editorial/Guide.**  
- **Festival Mode.**  
- **Passport**

## Phase 1

- **Artist Cards**  
- **Profiles**  
  - **User Profile (User view)**  
  - **General Profile Page**  
- **Your Shows**  
  - **Photos**  
  - **Reviews**  
- **Authentication**  
- **Save Events (wishlist, going)**  
- **Event Discovery**   
- **Calendar View**

## Phase 2

- **Map**  
- **Presale Reminders for liked artist(push notifications)**  
- **Friends Activity Feed**  
- **Match % Engine**  
- **Crews**  
- **All Reviews**  
- **Festival Mode**  
- **Passport(?)**

## Phase 3(?)

- **Editorial/Guide**

**Intent Documentation (aaron will do before next meeting \- or else…)**

# **Venu — Product Intent Document**

**Author:** Aaron, Kartik, and Jake **Date:** July 12, 2026 **Status:** Draft \- open for review **Reviewers:** Venu Team

---

## **1\. Problem / Opportunity**

Live music discovery is fragmented and transactional. Ticketing platforms are built for the purchase moment, not for discovery. Streaming apps bury concert recommendations several taps deep. Notification-based trackers (Bandsintown, Songkick) alert but don't engage. Social discovery — arguably the strongest driver of attendance — happens in group chats with no connection to any of the above.

The result: fans routinely miss shows by artists they love, find out about presales after they've closed, and have no single place that holds the full arc of the concert experience — the anticipation **before**, the coordination **during**, and the memory **after**. Our competitive analysis found that every incumbent owns exactly one slice of this arc; none owns the whole thing.

**Why now:** The API landscape finally makes this buildable by a small team — Ticketmaster Discovery and Bandsintown for event supply, Spotify for taste data, setlist.fm for post-show content. Live music demand is at a sustained high, and personalization expectations set by streaming have not yet been met by any concert product.

## **2\. Intent / Goal Statement**

**Help music fans discover and attend more of the live shows they'd genuinely love. Venu should be the default first stop when deciding what to see and the lasting record of what they saw.**

Stated as an outcome: increase the number of shows an active user discovers, saves, and actually attends — not merely the number of features shipped.

## **3\. Non-Goals / Out of Scope**

* **Not a ticketing platform.** Venu deep-links out for purchase; we do not sell or resell tickets.  
* **Not a B2B product.** No artist, venue, or promoter-facing tools in this phase of the product's life.  
* **Not a general social network.** Social features exist only in service of live music discovery and attendance.  
* **Not multi-city.** Launch is Austin only; geographic expansion is a separate future decision.  
* **Not covered by this doc:** detailed UX specs, component architecture, or data models (see the Frontend Components doc), and monetization design beyond directional notes in Risks.

## **4\. Success Criteria**

**Phase 1 definition of done:** a new user can authenticate, build a profile, discover events in Austin, save events (wishlist / going), see them in calendar view, and log attended shows with photos and reviews — end to end, without dead ends.

Signals we'll track once live:

* **Activation:** % of new users who connect a taste profile and save ≥1 event in their first session.  
* **Engagement:** saves per weekly active user; % of users returning weekly to check saved/upcoming shows.  
* **Outcome metric (north star):** % of saved events that convert to attended shows (logged via Your Shows).  
* **Retention:** D30 retention among users with ≥3 saved events.  
* **Qualitative:** users describe Venu as where they "check what's coming up," not just another alerts app.

## **5\. Proposed Approach (High-Level)**

Mobile-first app built on Supabase, aggregating event supply from Ticketmaster Discovery and Bandsintown, with personalization powered by Spotify (PKCE OAuth) and post-show content via setlist.fm. Single-city launch in Austin, seeded by a Founding Guides program for curation and community credibility. Frontend is built as a shared component library first (tab bar, event cards, bottom sheet, avatars, etc.), then composed into pages — enabling later phases to ship faster.

**Phased rollout:**

* **Phase 1 — Core loop:** Authentication, Event Discovery, Save Events (wishlist/going), Calendar View, Artist Cards, Profiles, Your Shows (photos, reviews). *Prove that discovery → save → attend → remember works for one user in one city.*  
* **Phase 2 — Amplify:** Map, Presale Reminders (push), Friends Activity Feed, Match % Engine, Crews, All Reviews, Festival Mode, Passport (placement TBD — see open questions). *Add the social and personalization layers that make the loop compounding.*  
* **Phase 3 — Deepen:** Editorial / The Guide. *Layer in curation once there's an audience to curate for.*

**Key tradeoffs already made:** single-city density over multi-city reach; buying event data via APIs over building ingestion; deferring social features until the solo core loop is validated; deferring editorial until there's retention to build on.

## **6\. Alternatives Considered**

* **Notification-only presale tracker.** Cheapest to build, but no retention surface and no differentiation — it's the Bandsintown model we're trying to beat.  
* **Web-first launch.** Faster to iterate, but concert discovery is a mobile, in-the-moment behavior; push notifications and camera (photos) are core to the loop.  
* **Multi-city or national launch.** Larger addressable market on paper, but dilutes event coverage density and community — the two things that make or break early trust.  
* **Social-first / community-first (Crews before discovery).** Social features have a cold-start problem; discovery delivers value to a user with zero friends on the app.

## **7\. Risks & Open Questions**

**Risks:**

* **API dependency.** Rate limits, coverage gaps (especially small/indie Austin venues on Ticketmaster), and ToS changes — particularly Spotify's developer policy — could constrain core features.  
* **Cold start on personalization.** Match % and recommendations need enough taste data before they feel magical rather than random.  
* **Social cold start.** Friends Feed and Crews are only as good as adoption within a user's real friend group; sequencing them in Phase 2 mitigates but doesn't eliminate this.  
* **Team bandwidth.** The feature list is broad for a side-project team; scope discipline within Phase 1 is the single biggest execution risk.

**Open questions needing input:**

1. Does Passport ship in Phase 2 or Phase 3? (It's a retention/identity feature — argument exists for both.)  
2. What's the directional monetization path — promoted events, affiliate ticketing links, or premium features — and does it constrain any Phase 1 architecture decisions?  
3. When do we stand up push notification infrastructure — built during Phase 1 (dormant) or deferred entirely to Phase 2?  
4. Do "All Reviews" in Phase 2 require moderation tooling we haven't scoped?

## **8\. Stakeholders & Decision Rights**

* **Approver:** Aaron (product lead)  
* **Consulted:** Venu core team (engineering, design) — architecture and phasing decisions reviewed jointly  
* **Informed:** Founding Guides (once program launches), early beta users

## **9\. Timeline / Rough Sizing**

Deliberately unscheduled. Sequencing (Phase 1 → 2 → 3\) is committed; dates are not. Phase 1 is sized to the smallest complete loop — discover, save, attend, remember — and Phase 2 does not start until that loop is validated with real Austin users.
