# Venu — Architecture & UI Map

**To render diagrams:** Install these two VSCode extensions:
- `Markdown Preview Mermaid Support` — renders diagrams in `Cmd+Shift+V` preview
- `Mermaid Editor` (by tomoyukim) — opens each diagram in a zoomable/pannable panel

---

## 1. Full Stack — Data to Screen

Data travels left → right: external APIs → lib → hooks → App.jsx → UI.

```mermaid
flowchart LR
    TM(["Ticketmaster API"])
    SB(["Supabase"])

    subgraph LIB["src/lib/"]
        tmLib["ticketmaster.js"]
        sbClient["supabase.js"]
        seLib["savedEvents.js"]
    end

    subgraph HOOKS["src/hooks/"]
        useAE["useAustinEvents"]
        useSE["useSavedEvents"]
    end

    App(["App.jsx"])

    subgraph PAGES["src/pages/"]
        Home["Home"]
        Explore["Explore"]
        Guide["Guide"]
        Cal["Calendar"]
        Prof["Profile"]
    end

    subgraph CHROME["Always Visible"]
        PF["PhoneFrame + TabBar"]
        EBS["EventBottomSheet"]
        NP["NotificationsPanel"]
    end

    TM --> tmLib
    tmLib --> useAE
    useAE --> App
    SB --> sbClient
    sbClient --> App
    SB --> seLib
    seLib --> useSE
    useSE --> App
    App --> Home
    App --> Explore
    App --> Guide
    App --> Cal
    App --> Prof
    App --> PF
    App --> EBS
    App --> NP
```

---

## 2. Tab-by-Tab UI Map

The `TabBar` switches between 5 page files. Each page is fully self-contained.

```mermaid
flowchart TD
    TabBar["TabBar"]

    subgraph H["Home.jsx"]
        H1["Hero Show"]
        H2["On Your Radar"]
        H3["The Drop - Presales"]
        H4["Friends Activity"]
    end

    subgraph E["Explore.jsx"]
        E1["Search + Genre Filters"]
        E2["Discover - Tonight / Weekend / Festivals"]
        E3["Map - Leaflet + Venue List"]
    end

    subgraph G["Guide.jsx"]
        G1["Featured Article"]
        G2["Artist Spotlight"]
        G3["The Signal"]
        G4["More to Read"]
    end

    subgraph C["Calendar.jsx"]
        C1["Month Grid + Dots"]
        C2["Filter Strip"]
        C3["Event Rows"]
    end

    subgraph P["Profile.jsx"]
        P1["Identity Card"]
        P2["Passport + Badges"]
        P3["Crews"]
        P4["Favorite Artists + Venues"]
        P5["Reviews"]
    end

    TabBar --> H
    TabBar --> E
    TabBar --> G
    TabBar --> C
    TabBar --> P
```

---

## 3. Shared Components — Usage by Page

| Component | File | Home | Explore | Guide | Calendar | Profile |
|---|---|:---:|:---:|:---:|:---:|:---:|
| `Chip` | components/index.jsx | ✓ | ✓ | ✓ | | |
| `WishlistButton` | components/index.jsx | ✓ | | | ✓ | |
| `MatchScore` | components/index.jsx | ✓ | ✓ | | | |
| `HScroll` | components/index.jsx | ✓ | ✓ | ✓ | | ✓ |
| `UserAvatar` | components/index.jsx | | | | | ✓ |
| `NotifBell` | components/index.jsx | ✓ | | | | |
| `CountdownBadge` | components/index.jsx | ✓ | | | | |
| `TicketStub` | components/marks/ | ✓ | | | | |
| `LiveBadge` | components/marks/ | ✓ | | ✓ | | |
| `Kicker` | components/marks/ | | | ✓ | | |
| `EditorialHeadline` | components/marks/ | ✓ | | ✓ | | |
| `Stamp` | components/marks/ | | | | | ✓ |
| `FlipDigits` | components/marks/ | ✓ | | | | |
| `EventBottomSheet` | components/ | ← rendered by App.jsx, opens over any tab | | | | |
| `NotificationsPanel` | components/ | ← rendered by App.jsx, slides in from right | | | | |
| `VenuMap` | components/ | | ✓ | | | |

---

## 4. Saved-Event State Flow

How wishlist/going data moves from Supabase to every interactive element.
`Home` and `Explore` also send events back up to `App` via `onEventSelect` to open the bottom sheet.

```mermaid
flowchart TD
    SB[("Supabase")]
    useSE["useSavedEvents"]
    App["App.jsx"]

    subgraph UI["UI Layer"]
        Home["Home"]
        Explore["Explore"]
        Cal["Calendar"]
        Prof["Profile"]
        EBS["EventBottomSheet"]
    end

    SB <-->|"CRUD via savedEvents.js"| useSE
    useSE --> App
    App -->|"wishlistIds + toggleWishlist"| Home
    App -->|"wishlistIds + toggleWishlist"| Explore
    App -->|"savedEvents"| Cal
    App -->|"savedEvents"| Prof
    App -->|"wishlistIds + toggleWishlist"| EBS
    App -->|"selectedEvent"| EBS
```
