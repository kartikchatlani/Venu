# Venu — Architecture & UI Map

**To render diagrams:** Install these two VSCode extensions:
- `Markdown Preview Mermaid Support` — renders diagrams in `Cmd+Shift+V` preview
- `Mermaid Editor` (by tomoyukim) — opens any diagram in a zoomable/pannable panel

Then press `Cmd+Shift+V` to open the preview.

---

## 1. Full Stack — Data to Screen

Data travels left → right: external APIs → lib → hooks → App → UI.

```mermaid
flowchart LR
    TM(["Ticketmaster API"])
    SB(["Supabase"])

    subgraph LIB["src/lib/"]
        tmLib["ticketmaster.js\nfetch + normalize"]
        sbClient["supabase.js\nauth client"]
        seLib["savedEvents.js\nCRUD"]
    end

    subgraph HOOKS["src/hooks/"]
        useAE["useAustinEvents\ntonight + weekend"]
        useSE["useSavedEvents\nwishlist · going · toggles"]
    end

    App["App.jsx\nSession · activeTab\nselectedEvent · notifsOpen"]

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

    TM --> tmLib --> useAE --> App
    SB --> sbClient --> App
    SB --> seLib --> useSE --> App
    App --> Home & Explore & Guide & Cal & Prof
    App --> PF & EBS & NP
```

---

## 2. Tab-by-Tab UI Map

Each tab is a separate page file. The TabBar in `src/components/index.jsx` switches between them.

```mermaid
flowchart TD
    TabBar["TabBar\nsrc/components/index.jsx"]

    subgraph H["🏠 Home.jsx"]
        H1["Hero Show"]
        H2["On Your Radar\nlive TM events + match %"]
        H3["The Drop\npresale TicketStubs"]
        H4["Friends Activity"]
    end

    subgraph E["🔍 Explore.jsx"]
        E1["Search + Genre Chips"]
        E2["Discover\nTonight · Weekend · Festivals"]
        E3["Map\nLeaflet + venue pins"]
    end

    subgraph G["📖 Guide.jsx"]
        G1["Featured Article"]
        G2["Artist Spotlight"]
        G3["The Signal\nlive updates"]
        G4["More to Read"]
    end

    subgraph C["📅 Calendar.jsx"]
        C1["Month Grid\nwishlist · going · past dots"]
        C2["Filter Strip"]
        C3["Event Rows"]
    end

    subgraph P["👤 Profile.jsx"]
        P1["Identity Card\navatar · handle · bio"]
        P2["Passport + Badges"]
        P3["Crews"]
        P4["Favorite Artists + Venues"]
        P5["Reviews"]
    end

    TabBar --> H & E & G & C & P
```

---

## 3. Shared Components

Which pages use which components from the shared component files.

```mermaid
flowchart LR
    subgraph PAGES["Pages"]
        App["App.jsx"]
        Home["Home"]
        Explore["Explore"]
        Guide["Guide"]
        Cal["Calendar"]
        Prof["Profile"]
    end

    subgraph ATOMS["src/components/index.jsx"]
        Chip["Chip\ngenre filter"]
        WB["WishlistButton\n♡ heart"]
        UA["UserAvatar\nsquare initial"]
        HS["HScroll\nrow scroll"]
        MS["MatchScore\n♫ 91%"]
        NB["NotifBell"]
    end

    subgraph MARKS["src/components/marks/"]
        TS["TicketStub"]
        LB["LiveBadge\n● LIVE NOW"]
        Kicker["Kicker"]
        EH["EditorialHeadline"]
        Stamp["Stamp"]
        FD["FlipDigits"]
    end

    subgraph OVERLAY["Overlays"]
        EBS["EventBottomSheet"]
        NP["NotificationsPanel"]
        VM["VenuMap\nLeaflet map"]
    end

    Home --> Chip & WB & MS & TS & LB
    Explore --> Chip & HS & MS & VM
    Guide --> Kicker & EH & LB
    Cal --> WB
    Prof --> UA & NB & HS & Stamp & FD
    App --> EBS & NP
```

---

## 4. Saved-Event State Flow

How wishlist/going state flows from Supabase down to every interactive element.

```mermaid
flowchart TD
    SB[("Supabase\nsaved_events table")]

    useSE["useSavedEvents\n──────────────\nsavedEvents[]\nwishlistIds Set\ngoingIds Set\ntoggleWishlist\ntoggleGoing"]

    App["App.jsx\npasses all props down"]

    Home["Home"]
    Explore["Explore"]
    Cal["Calendar"]
    Prof["Profile"]
    EBS["EventBottomSheet"]

    SB <-->|"CRUD"| useSE
    useSE --> App

    App -->|"wishlistIds · toggleWishlist\ngoingIds · toggleGoing"| Home
    App -->|"wishlistIds · toggleWishlist\ngoingIds · toggleGoing"| Explore
    App -->|"savedEvents"| Cal
    App -->|"savedEvents"| Prof
    App -->|"wishlistIds · goingIds\ntoggleWishlist · toggleGoing"| EBS

    Home & Explore -->|"onEventSelect"| App
    App -->|"selectedEvent"| EBS
```
