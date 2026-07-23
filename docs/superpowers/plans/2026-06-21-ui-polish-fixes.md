# UI Polish Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix borderRadius violations, circle avatars, hardcoded profile name, unwired hero WishlistButton, and hardcoded hero pill text identified in visual analysis.

**Architecture:** All changes are targeted style edits across 5 source files. No new components, no new state. The borderRadius spec is: cards → 4, buttons/chips → 2, avatars → 2. Underline search replaces glass pill in Explore.

**Tech Stack:** React 19, Vite, inline CSS-in-JS

---

### Task 1: components/index.jsx — Chip, UserAvatar, WishlistButton

**Files:**
- Modify: `src/components/index.jsx`

- [ ] **Step 1:** In `Chip` (line ~243), change `borderRadius: 30` → `borderRadius: 2`
- [ ] **Step 2:** In `UserAvatar` (line ~147), change `borderRadius: "50%"` → `borderRadius: 2`
- [ ] **Step 3:** In `WishlistButton` (line ~293), change `borderRadius: "50%"` → `borderRadius: 2`
- [ ] **Step 4:** Commit

---

### Task 2: Home.jsx — borderRadius sweep + hero WishlistButton fix + pill fix

**Files:**
- Modify: `src/pages/Home.jsx`

- [ ] **Step 1:** Add `wishlistIds`, `toggleWishlist` to props destructuring on `Home`
- [ ] **Step 2:** Wire hero WishlistButton — replace local `wishlisted.hero` with `wishlistIds?.has(heroShow?.id)` and `toggleWishlist(heroShow)`
- [ ] **Step 3:** Hero card wrapper: `borderRadius: 22` → `borderRadius: 4`
- [ ] **Step 4:** "Tonight · Doors 8PM" pill: `borderRadius: 30` → `borderRadius: 2`; replace hardcoded "Doors 8PM" with `heroShow?.time || "8 PM"`
- [ ] **Step 5:** "Get Tickets" footer button: `borderRadius: 30` → `borderRadius: 2`
- [ ] **Step 6:** Share button: `borderRadius: "50%"` → `borderRadius: 2`
- [ ] **Step 7:** On Your Radar cards: `borderRadius: 18` → `borderRadius: 4`
- [ ] **Step 8:** Friend rows: `borderRadius: 14` → `borderRadius: 4`
- [ ] **Step 9:** AllPresalesPage — cards `borderRadius: 18` → 4; filter tabs `borderRadius: 20` → 2; thumbnail `borderRadius: 12` → 4; status pill `borderRadius: 30` → 2; presale moment block `borderRadius: 12` → 4; back button `borderRadius: 20` → 2
- [ ] **Step 10:** Commit

---

### Task 3: Explore.jsx — search bar underline + all card radii

**Files:**
- Modify: `src/pages/Explore.jsx`

- [ ] **Step 1:** Search bar — remove glass pill, replace with underline style:
  `background: "transparent", border: "none", borderBottom: "1px solid rgba(244,239,231,0.2)", borderRadius: 0, padding: "10px 0"`
- [ ] **Step 2:** Discover/Map toggle wrapper: `borderRadius: 30` → `borderRadius: 4`; inner active button: `borderRadius: 26` → `borderRadius: 2`
- [ ] **Step 3:** Promoted card: `borderRadius: 18` → `borderRadius: 4`
- [ ] **Step 4:** Tonight event cards: `borderRadius: 16` → `borderRadius: 4`; thumbnail inside: `borderRadius: 12` → `borderRadius: 4`
- [ ] **Step 5:** Weekend lead card: `borderRadius: 18` → `borderRadius: 4`
- [ ] **Step 6:** Weekend scroll cards: `borderRadius: 16` → `borderRadius: 4`
- [ ] **Step 7:** Festival cards: `borderRadius: 18` → `borderRadius: 4`
- [ ] **Step 8:** Commit

---

### Task 4: Profile.jsx — avatar square + display name from auth + other circles

**Files:**
- Modify: `src/pages/Profile.jsx`

- [ ] **Step 1:** Main avatar (line ~624): `borderRadius: "50%"` → `borderRadius: 4`
- [ ] **Step 2:** Derive display name from session — add `const displayName` after `userInitial`:
  ```js
  const rawName = email.split("@")[0].replace(/\d+$/, "").replace(/[._]/g, " ").trim();
  const displayName = session?.user?.user_metadata?.full_name
    || (rawName ? rawName.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") : userProfile.name);
  ```
  Then replace `{userProfile.name}` with `{displayName}`.
- [ ] **Step 3:** Edit Profile button: `borderRadius: 20` → `borderRadius: 2`
- [ ] **Step 4:** Stats strip: `borderRadius: 18` → `borderRadius: 4`
- [ ] **Step 5:** FriendsView friend avatars (line ~130): `borderRadius: "50%"` → `borderRadius: 2`
- [ ] **Step 6:** AddFriendsView friend search results avatars (line ~69): `borderRadius: "50%"` → `borderRadius: 2`
- [ ] **Step 7:** AddFriendsView contacts card avatar (line ~91): `borderRadius: "50%"` → `borderRadius: 2`
- [ ] **Step 8:** CrewDetailView member avatars (line ~264): `borderRadius: "50%"` → `borderRadius: 2`
- [ ] **Step 9:** CrewDetailView activity avatars (line ~315): `borderRadius: "50%"` → `borderRadius: 2`
- [ ] **Step 10:** Commit

---

### Task 5: Guide.jsx — article card, author avatar, bookmark, kicker pill

**Files:**
- Modify: `src/pages/Guide.jsx`

- [ ] **Step 1:** Featured article card (line ~53): `borderRadius: 22` → `borderRadius: 4`
- [ ] **Step 2:** Category kicker pill (line ~57): `borderRadius: 20` → `borderRadius: 2`
- [ ] **Step 3:** Author avatar (line ~76): `borderRadius: "50%"` → `borderRadius: 2`
- [ ] **Step 4:** Bookmark button (line ~91): `borderRadius: "50%"` → `borderRadius: 2`
- [ ] **Step 5:** Commit

---

### Task 6: EventBottomSheet.jsx — Get Tickets button radius

**Files:**
- Modify: `src/components/EventBottomSheet.jsx`

- [ ] **Step 1:** Get Tickets `<a>` (line ~238): `borderRadius: 30` → `borderRadius: 2`
- [ ] **Step 2:** "Tickets Unavailable" fallback div (line ~251): `borderRadius: 30` → `borderRadius: 2`
- [ ] **Step 3:** Commit

---

### Task 7: Update CLAUDE.md

- [ ] **Step 1:** Update CLAUDE.md to reflect the fixes applied and current known-clean state
- [ ] **Step 2:** Final commit
