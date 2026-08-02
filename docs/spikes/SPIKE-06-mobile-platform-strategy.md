# SPIKE-06 — Mobile Platform Strategy: Website, PWA, or Phone App?

**Status:** Draft for team review — this is the decision the intent doc already leaned into but the stories never made
**Feeds:** SPIKE-05 (push delivery), UI-01..35, INFRA-01, INFRA-04 · **Doesn't touch:** every API story, INFRA-02/03, SPIKE-01 backend, SPIKE-04
**Context:** The intent doc (`Venu-Feature-List.md` §6) rejected "web-first launch" because push notifications and camera are core to the loop — yet all 35 UI stories build a React website. This doc analyzes what actually changes if we commit to a phone app, given a team with **zero mobile development experience**.

---

## TL;DR

**Recommendation: React Native with Expo, decided now, before UI-01 starts.** It is the smallest possible step from the React the team already knows into a real installable app with real push notifications — and deciding now costs a week of spec rewrites, while deciding after Phase 1 costs a rewrite of the entire view layer right when we should be building Phase 2.

The honest runner-up is "ship Phase 1 as a website, go native in Phase 2" — faster to first users, but it schedules a UI rewrite for later. The wrap-the-website option (Capacitor) looks like a shortcut but collects the worst costs of both paths.

**What does NOT change under any option:** all 17 API stories, the Spring Boot service, the database, auth strategy, Ticketmaster ingestion, INFRA-02/03 — roughly half the project plan is platform-proof. That's the safety net under this whole decision.

---

## 1. Why "just a website" undermines Venu specifically

This isn't a generic "apps are better" argument — it's about our three load-bearing features:

1. **The Drop.** The promise is *"you find out before the presale opens."* A notification the user sees after the code dropped is a broken promise — the intent doc says exactly this. On the web, push notifications on iPhone only work if the user has installed the site to their home screen as a PWA (supported since iOS 16.4, but the install flow is buried in Safari's share menu and almost no user does it unprompted). Our audience — people who go to shows, mostly 18–34 — is heavily iPhone in the US (teen/young-adult iPhone share is commonly surveyed around ~85%; worth validating, but directionally certain). **A web-only Drop reaches a minority of our own users with its core promise.**
2. **Your Shows photos (Phase 1).** Web camera access via file input works but is clunky; a native camera flow is what makes "log the show you're at" a one-tap habit instead of a chore.
3. **The habit loop itself.** "Default first stop when deciding what to see" (intent doc §2) is a home-screen behavior. Products live where their icon lives.

None of this means the web version is worthless — it means the *differentiators* are muted on the web, and Venu without differentiators is Bandsintown with better fonts.

---

## 2. The four options

| | **A. PWA** (current plan + manifest/service worker) | **B. Capacitor** (wrap the built website in a native shell) | **C. React Native + Expo** ⭐ | **D. Flutter / native Swift+Kotlin** |
|---|---|---|---|---|
| New skills needed | none | native build tooling (Xcode/Android Studio), plugin debugging | RN components + Expo tooling (~2–4 wk ramp from React) | entire new language/paradigm (Dart) or two codebases |
| Reuses team's React knowledge | 100% | 100% | **~80%** — same hooks, props, state, JSX mental model; different primitives | ~0% |
| UI stories (35) impact | unchanged | unchanged | rewritten targets, same deliverables (see §4) | full rewrite |
| Push notifications | ⚠️ Android fine; iPhone only after obscure home-screen install | ✅ real APNs/FCM via plugin | ✅ real APNs/FCM (`expo-notifications`) | ✅ |
| Camera / photos | ⚠️ file-input flow | ✅ plugin | ✅ (`expo-image-picker`) | ✅ |
| App store presence | ❌ | ✅ | ✅ | ✅ |
| Feel | browser scroll/tap quirks | WebView — fine for feeds/cards, but "website in a costume" risk is real and polishing it away is skilled work | native gestures, scroll physics, sheets | native |
| Iteration speed | instant deploys | store review for shell changes; web-speed for content | store review for native changes; **JS-level changes ship instantly via EAS Update (OTA)** | store review |
| Verdict | speed-first fallback | tempting shortcut, rejected (below) | **recommended** | wrong for a 2-dev junior team — throws away the React investment |

**Why not Capacitor, in one paragraph:** it preserves our stories on paper, but the moment we need push, camera, deep links, and store submission — the exact reasons to be an app — we're in Xcode and Gradle anyway, debugging native plugins from inside a WebView, with none of Expo's guardrails and no community pattern to follow when it breaks. We'd be operating native tooling (the thing the team fears) to ship a WebView (the thing users can feel). Teams pick Capacitor to *port an existing mature web app*; we don't have one — we have specs. Rewriting specs is cheap.

**Why not "PWA now, RN in Phase 2":** it's the strongest alternative and deserves a fair hearing at review. For it: fastest to real Austin users, zero new learning while the team is already absorbing Spring/AWS/IaC, and Phase 1 as specced needs no push (presale reminders are Phase 2). Against it: it knowingly builds 35 stories of view code we've already decided (intent doc) doesn't serve the endgame, and schedules the rewrite for exactly when Phase 2's social features should be the focus. Deferring a decision is sometimes wise; deferring a decision *we've already made* is just paying twice.

---

## 3. What Expo actually removes for a team with no mobile experience

This is the crux — "mobile development" fear is mostly fear of the toolchain, and Expo's entire reason to exist is deleting that toolchain:

- **No Xcode/Android Studio to operate.** EAS Build compiles iOS and Android binaries in Expo's cloud; EAS Submit uploads to the stores. Signing certificates — the single most miserable part of mobile dev — are generated and managed by EAS.
- **Development feels like Vite.** `npx expo start`, scan a QR code, the app hot-reloads on your actual phone.
- **`expo-notifications`, `expo-image-picker`, `expo-calendar`, `expo-font`** — the native features we need are first-party modules with docs written for people who've never touched native code.
- **EAS Update (OTA):** JavaScript-level changes (which is nearly everything we'll write) deploy to users' installed apps without app-store review — dev-channel and prod-channel, mirroring our INFRA-04 model.
- **Expo Router:** file-based routing with a built-in tabs layout — UI-01's five-tab shell is nearly a template.

What Expo does *not* remove: store accounts (Apple $99/yr, Google $25 once), store review on first submission and native-level changes (typically ~1–3 days for iOS now), and the discipline of testing on real devices (team members' own phones + TestFlight/internal track for Aaron and beta users). EAS has a free tier (limited cloud builds/month — fine for MVP cadence; verify current limits) with paid tiers if we outgrow it.

**The React→RN translation, concretely, using our own conventions:** our prototype already uses inline style objects, no hover states, a 375px phone frame, and `.pressable` active feedback. That is *already* React Native's idiom: `div`→`View`, `span`→`Text`, `.pressable`→`<Pressable>`, inline styles→`StyleSheet.create` (near 1:1 — the After Dark tokens port unchanged), lists→`FlatList`, and our hand-rolled CSS bottom sheet→`@gorhom/bottom-sheet` (with real drag gestures, an upgrade). The prototype was unknowingly designed as an RN app rendered in a browser.

---

## 4. Project-plan impact, story by story (React Native path)

### Untouched — 28 of 61 issues
All **API-01..17**, **INFRA-02**, **INFRA-03**, **SPIKE-01** (one edit: §2.1 frontend hosting shrinks to a landing page), **SPIKE-02** (supabase-js runs in RN with AsyncStorage session storage — auth strategy identical), **SPIKE-03** (backend pipeline identical), **SPIKE-04**, plus epics. *The entire backend track proceeds regardless — the two of you can split: one on Spring/AWS, one on the RN foundation, meeting at API-01/UI-05.*

### Resolved — SPIKE-05 mostly dissolves
The channel question ("can we even reach iPhones?") disappears: `expo-notifications` → APNs/FCM. What survives of SPIKE-05 is the *scheduling* half (reminder row → EventBridge trigger → delivery at T-minus-X), which was always the durable part. Rescope to "Reminder scheduling & delivery pipeline."

### Rewritten targets, same deliverables — the UI stories
| Story | Change |
|---|---|
| UI-01 App Shell | React Router 7 → **Expo Router** tabs. Deep links → app links/universal links. "Drop the PhoneFrame" becomes literal — the phone is the frame. |
| UI-02..06, 08..10, 14..20, 22..26, 28..30, 32..35 | Same components, RN primitives. Mostly mechanical: View/Text/Pressable/FlatList + StyleSheet. Effort roughly +20–30% first pass, shrinking as patterns solidify. |
| UI-07 Bottom Sheet | Hand-rolled CSS → `@gorhom/bottom-sheet`. **Easier** than the story as written. |
| UI-11 Notifications Panel | Same, plus becomes the in-app surface for real push. |
| UI-12/13 Auth | Same flows; session persistence via AsyncStorage; password-reset deep link → app link. |
| UI-21 Map | Leaflet → `react-native-maps` or MapLibre RN (MapLibre allows a custom dark style matching After Dark). Real rewrite, similar size. |
| UI-27 Calendar Export | .ics gymnastics → `expo-calendar` writes to the device calendar natively. **Easier and better.** |
| UI-31 Photos | File input → `expo-image-picker`/camera. **Easier and better.** |
| Pull-to-refresh, share (global functions doc) | Native `RefreshControl` and `Share` APIs. **Easier.** |

### Replaced / new stories
- **INFRA-01** (S3+CloudFront app hosting) → shrinks to "landing page + link-sharing web presence" (tiny S3+CF, still worth having for `venu.app/e/{event}` share links that deep-link into the app).
- **INFRA-04 frontend half** → "EAS Build/Submit/Update pipeline" (GitHub Actions still orchestrates; dev channel auto, prod behind the same manual gate).
- **New: MOB-01** — Expo project scaffold, EAS setup, store accounts, signing, TestFlight + Play internal track.
- **New: MOB-02** — App icon, splash screen, store listings (After Dark makes for a great store page).
- **New: MOB-03** — Push notification registration + token storage (pairs with API-06/07).

### Design system
`DESIGN_SYSTEM.md` survives nearly intact — colors, type scale, radius spec, no-hover rule (now enforced by physics). Fonts load via `expo-font`. One review pass to restate rules in RN terms.

---

## 5. Costs stated plainly

- **Timeline:** expect a 2–4 week ramp before UI velocity feels normal again, and Phase 1 landing roughly **3–6 weeks later** than the web path for this team. That is the price; the web path pays it back with interest as a Phase 2 rewrite.
- **Money:** Apple $99/yr, Google $25 once, EAS free tier likely sufficient at MVP (verify current limits) — negligible next to the AWS bill.
- **Iteration friction:** first store submission is a rite of passage (review rejections happen; budget a week of buffer). After that, OTA updates make day-to-day iteration web-fast.
- **Risk we accept:** the team's first RN code will have rough edges. Mitigation: the UI-02..10 foundation stories are *small* on purpose — the learning happens on chips and cards, not on the map view.
- **What we give up:** instant zero-install access for curious users. Mitigated by the landing page + store links; genuinely lost for "send someone a link, they're in the app in 5 seconds." Aaron should weigh this for the Founding Guides program specifically.

---

## 6. Decision framework for the team meeting

Say yes to React Native now if you believe **all three**:
1. The Drop's push promise is core to Venu's differentiation (the intent doc already says yes).
2. Our users are meaningfully iPhone-skewed (near-certain for US 18–34 concert-goers; validate with the first beta cohort).
3. We can absorb a ~month of slower frontend progress while the backend track continues in parallel.

Choose "web Phase 1, RN Phase 2" instead if any of these dominate: we need real Austin users in the absolute minimum time (e.g., a date-driven opportunity like a festival season), or we'd rather validate the loop before paying any learning curve, accepting the later rewrite as the fee for earlier evidence.

**Questions for Aaron specifically:** does Founding Guides recruitment need a shareable no-install experience at launch? Is there a hard external date pressuring Phase 1? Is app-store presence part of the credibility story for venue partnerships later?

---

## 7. If approved, the concrete next steps

1. Team reviews this doc; Aaron makes the platform call (it's a product decision wearing a technical costume).
2. Create SPIKE-06 in Jira with this doc as the deliverable; close it with the decision recorded.
3. Re-point the 35 UI story specs (mostly find/replace-level edits per §4 — I can draft these), rescope SPIKE-05, replace INFRA-01, add MOB-01..03.
4. Update SPIKE-01 §0/§2.1 (landing page instead of app hosting; everything else stands).
5. MOB-01 becomes the first frontend story; API track proceeds unchanged in parallel.
