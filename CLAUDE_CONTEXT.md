# Venu — Claude Context Document

Feed this file to Claude at the start of any session to restore full context of the prototype. For product intent and goals, see `INTENT.md`. For the design system reference, see `DESIGN_SYSTEM.md`.

---

## What This Is

A React 19 + Vite interactive prototype of **Venu**, a music event discovery app for Austin, TX. It runs in a simulated phone frame (375×812px) in the browser. All styles are inline React styles — no CSS modules, no Tailwind. There is no routing library; navigation is a single `activeTab` state string in `App.jsx`.

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | React 19 + Vite |
| Auth + DB | Supabase (email/password auth, `saved_events` table) |
| Live event data | Ticketmaster Discovery API v2 |
| Map | Leaflet via `react-leaflet` |
| Fonts | Fraunces (serif), JetBrains Mono (mono) — loaded from Google Fonts in `index.html` |
| Env vars | `VITE_TICKETMASTER_API_KEY`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` in `.env` |

---

## Design Tokens — After Dark

These constants are redeclared at the top of every page/component file that needs them (no global import). Always use these exact values — never hardcode colors outside of them.

```js
const P = "#F4EFE7";   // primary text (parchment)
const A = "#C17F4A";   // amber — accent, CTAs, active states
const E = "#D94F2A";   // ember — urgency, presale, live indicators
const F = "#8A8278";   // faded — secondary text, metadata
const D = "'Fraunces', Georgia, serif";
const M = "'JetBrains Mono', monospace";
const glass = "rgba(244,239,231,0.05)";
const glassBorder = "rgba(244,239,231,0.10)";
```

Background: `#0C0A08` (base), `#17120e` (sheet surface), `#14110F` (deepest ink).

---

## File Map

```
src/
├── App.jsx                        # Root: auth gate, tab routing, global overlays
├── theme.jsx                      # Token exports (rarely used — tokens redeclared inline)
├── pages/
│   ├── Home.jsx                   # "Your Stage" home feed
│   ├── Explore.jsx                # Discover + map view
│   ├── Profile.jsx                # User profile, crews, passport
│   ├── Calendar.jsx               # Saved events calendar
│   ├── Guide.jsx                  # Onboarding / style guide
│   └── Auth.jsx                   # Login / signup / password reset
├── components/
│   ├── index.jsx                  # PhoneFrame, Screen, TabBar, HScroll, Chip,
│   │                              #   WishlistButton, GoingButton, NotifBell
│   ├── EventBottomSheet.jsx       # Full event detail sheet (slides up from bottom)
│   ├── NotificationsPanel.jsx     # Notification tray (slides in from right)
│   ├── VenuMap.jsx                # Leaflet map with venue pins
│   └── marks/index.jsx            # Design primitives: Kicker, MonoMeta, HairlineRule,
│                                  #   EditorialHeadline, FlipDigits, Stamp, TicketStub, LiveBadge
├── data/index.jsx                 # All mock data (notifications, perfectMatches, friends,
│                                  #   weeklyPicks, festivals, promotedEvent, crews)
├── hooks/
│   ├── useAustinEvents.js         # Fetches tonight + weekend shows from Ticketmaster
│   └── useSavedEvents.js          # Supabase CRUD for wishlist/going state
└── lib/
    ├── ticketmaster.js            # Ticketmaster API wrapper + event mapper
    ├── supabase.js                # Supabase client init
    └── savedEvents.js             # DB functions: fetchSavedEvents, saveEvent, unsaveEvent, updateEventStatus
```

---

## App Shell (`App.jsx`)

- Renders `PhoneFrame` → `StatusBar` + active page + `TabBar`
- Auth state from Supabase; shows `<Auth />` if no session, password reset form if `resetMode`
- Global overlays: `EventBottomSheet` (zIndex 200), `NotificationsPanel`
- Shared state passed as props to every page:
  - `savedEvents` — raw array from Supabase
  - `wishlistIds` — `Set<event_id>` where status !== "going"
  - `goingIds` — `Set<event_id>` where status === "going"
  - `toggleWishlist(event)` — add/remove/upgrade between states
  - `toggleGoing(event)` — add/remove/upgrade between states
  - `onSelectEvent(event)` — opens EventBottomSheet
  - `session` — Supabase session object

---

## Pages

### Home (`src/pages/Home.jsx`)

**Sections top to bottom:**

1. **Header** — Austin · TX location dot (ember pulse) + notification bell + user avatar initial
2. **"Your Stage."** — Fraunces 48px headline. Subline: show count + today's date
3. **Hero Card** — 230px image with "Tonight · Doors 8PM" ember pill (top-left) + artist name + venue overlaid on gradient. Footer: Get Tickets + WishlistButton + share icon. Dynamically shows the user's soonest "going" event; falls back to Khruangbin placeholder
4. **On Your Radar** — horizontal scroll of `perfectMatches` cards (from `data/index.jsx`): match%, artist, venue, price. No image.
5. **Also on your calendar** — horizontal `TicketStub` scroll of the user's other "going" events (from Supabase). Only renders if `upcomingShows.length > 0`
6. **The Drop** — section header with ember dot + "ALL PRESALES →" link that opens `AllPresalesPage` overlay. Below: marquee ticker of `dropItems` (artist + presale/on-sale label + date). Ticker pauses on hover/touch.
7. **Friends Activity** — list of friend action cards from `friends` mock data

**AllPresalesPage** (rendered as `position: absolute` overlay at `zIndex: 180`):
- Back button, "The Drop" title, filter tabs (All / Presale / On Sale)
- Scrollable list of presale cards — **Variant A "Refined Ledger"** design:
  - Row 1: Status pill (PRESALE ember / ON SALE amber) + pulsing dot + "OPENS IN Xd Yh" countdown
  - Row 2: 58×58 thumbnail with ember radial wash fallback + Fraunces 20 artist name + venue·city on one line + show date below + match chip
  - Row 3: Inset glass block — "PRESALE OPENS" label + Fraunces 17 date + time with amber AM/PM + Remind Me amber pill (bell icon, glow); or "GET TICKETS" for live events
  - Row 4: "ACCESS CODE" label + dashed-border token (presale events only)

**Key data:**
```js
const allPresales = [
  { artist, venue, city, showDate, saleDate, saleTime, status: "presale"|"onsale", code, img, match, ticketUrl }
  // 5 presales (Turnstile, Mdou Moctar, Floating Points, Tyler the Creator, Ethel Cain)
  // 3 onsale  (Caroline Polachek, Billie Eilish, Bon Iver)
];
```
`getCountdown(saleDateStr)` returns `"Xd Yh"` / `"Xh"` / `null` (if past = live).

---

### Explore (`src/pages/Explore.jsx`)

**Sections:**

1. **Header** — city label + change city
2. **Search bar** — glass input, filters `tonightShows` and `weekendShows` by artist/venue
3. **Genre chips** — horizontal scroll from `genres` data; filters both lists
4. **View toggle** — Discover / Map (pill toggle)

**Discover view:**

5. **Promoted card** — 150px image with "Promoted · date" amber pill overlaid top-left. Artist + venue + price below the image gradient
6. **Tonight in Austin** — live from Ticketmaster API. Compact rows: 52×52 thumb + artist + venue·time + price + GoingButton + WishlistButton
7. **This Weekend** — live from Ticketmaster API. Featured card (120px image) + horizontal scroll of additional cards. Deduped from tonight.
8. **Festivals For You** — from `festivals` mock data. Cards with 90px image (opacity 0.7) + left-to-right dark gradient overlay + festival name + date + city + lineup chips + match%
9. **Map view** — Leaflet map (`VenuMap`) centered on Austin with venue pins; tap pin → preview panel

**Props:** `{ wishlistIds, goingIds, toggleWishlist, toggleGoing, onSelectEvent }`

---

### EventBottomSheet (`src/components/EventBottomSheet.jsx`)

Slides up from bottom, covers 95% of frame height. Triggered by `onSelectEvent(event)` from any card.

**Layout:**
- 360px hero image with stripe fallback + ember radial wash + bottom gradient
  - Floating nav: circular back button (←) + share button — both `GlassBtn` (38×38, `borderRadius: "50%"`, blur backdrop)
  - Title block at bottom of image: amber pulsing dot + "ON SALE NOW · MMM DD" + Fraunces 42 artist name + Fraunces 21 opener(s)
- Scrollable content below image:
  - Meta strip: DATE | DOORS cells (top row) + VENUE (full width, bottom row) — ledger-style bordered grid
  - Genre chip row
  - Support acts (if any) — small avatar circles with name + image
  - Description placeholder
- Sticky CTA bar (pinned to bottom):
  - WishlistButton (♥) — 52×52 circle, amber when active
  - GoingButton (✓) — 52×52 circle, sage green (`#5a9e6f`) when active
  - GET TICKETS pill (or TICKETS UNAVAILABLE if no URL)

**Event object shape** (from Ticketmaster mapper):
```js
{
  id, artist, support: [{ name, img }],
  venue, time, date,   // date = "YYYY-MM-DD" (TM localDate)
  price, genre, ticketUrl, img
}
```

---

### Profile (`src/pages/Profile.jsx`)

**Layout:**
- **Banner** — full-bleed 128px, dark crosshatch default. "Edit Banner" label triggers hidden file input → FileReader → base64 data URL
- **Avatar** — overlaps banner at `marginTop: -44`, amber ring
- Display name, handle, bio, location, follower/following counts
- **Crews section** — grid of crew cards with 110px cover photo, name overlay, member avatars, feature chips, next event pill. Tapping → `crewDetail` sub-view
- **CrewDetailView** — replaces main profile content (same pattern as Friends/Reviews sub-views):
  - Back button → returns to `view: "crews"`
  - Cover banner + crew name
  - Members horizontal scroll with RSVP status chips
  - Upcoming events list
  - Activity feed
  - Polls with live vote counts (`pollVotes` state)
  - 3-col photo grid
  - Playlist section: shows platform card (Spotify green / Apple red / YouTube red) with "Open" link + remove; or dashed "Link a Playlist" → paste URL → platform auto-detected from URL
- **Passport section** (stub) — map of attended venues

**Platform detection:**
```js
const detectPlatform = (url) => {
  if (url.includes("spotify.com")) return "spotify";
  if (url.includes("music.apple.com")) return "apple";
  if (url.includes("youtube.com") || url.includes("youtu.be")) return "youtube";
  return "other";
};
```

**Crews data shape** (from `src/data/index.jsx`):
```js
{
  name, cover, memberCount, avatars, members: [{ name, initial, color, status }],
  features, nextEvent,
  upcomingEvents: [{ name, date, venue }],
  activity: [{ user, action, time }],
  polls: [{ id, question, options: [{ label, votes }] }],
  photos: [url, ...],
  playlist: { name, url, platform } | null
}
```

---

### Saved Events State

Two mutually exclusive states, derived from a single `savedEvents` array:
- `status: "wishlist"` → appears in `wishlistIds`
- `status: "going"` → appears in `goingIds` + surfaces on Home hero + upcoming strip

Toggle behavior:
| Current state | toggleWishlist | toggleGoing |
|---|---|---|
| Not saved | Add as wishlist | Add as going |
| Wishlist | Remove | Upgrade to going |
| Going | Downgrade to wishlist | Remove |

---

## Key Patterns

### No-truncation rule
Venue names and city info must never be cut with `text-overflow: ellipsis`. Always allow wrapping or use two lines.

### Timezone-safe date filtering
`toLocalDateStr(date)` uses `getFullYear/getMonth/getDate` — never `.toISOString()` (UTC offset bug). Ticketmaster API is queried with `T00:00:00Z` / `T23:59:59Z` in simple string format (not `.toISOString()`). Tonight events: query `today → tomorrow`, then filter client-side on `e.date === today`. Weekend events: filter out `e.date === today` to avoid duplication.

### Sub-view navigation
Profile uses a `view` state string (`"main"` | `"crews"` | `"crewDetail"` | etc.) with conditional renders at the top of the return. No router.

### Overlay layers
- `AllPresalesPage`: `position: absolute, inset: 0, zIndex: 180`
- `NotificationsPanel`: slides in from right, higher z
- `EventBottomSheet`: `zIndex: 200/201`

### Presale countdown
```js
const getCountdown = (saleDateStr) => {
  const sale = new Date(saleDateStr + "T10:00:00");
  const diff = sale - new Date();
  if (diff <= 0) return null; // null = live/on-sale
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  return days > 0 ? `${days}d ${hours}h` : `${hours}h`;
};
```

### Reminded state
Local `Set` of artist names. Not persisted to Supabase.

### Animations (defined in `src/styles/global.css`)
- `pulse` — opacity 1 → 0.5 → 1, used for live dots
- `breathe` — subtle scale, used on hero card
- `marq` — translateX for the presale ticker

---

## What Is Real vs Mocked

| Feature | Real | Mocked |
|---|---|---|
| Tonight / Weekend shows | ✅ Ticketmaster API | — |
| Saved events (wishlist/going) | ✅ Supabase | — |
| Auth | ✅ Supabase | — |
| Presale data | — | ✅ Hardcoded in `Home.jsx` |
| Match % scores | — | ✅ Static numbers in data |
| Friends + activity | — | ✅ `data/index.jsx` |
| Crew members + activity | — | ✅ `data/index.jsx` |
| Notifications | — | ✅ `data/index.jsx` |
| Festivals | — | ✅ `data/index.jsx` |
| Map venues | — | ✅ `data/index.jsx` |
