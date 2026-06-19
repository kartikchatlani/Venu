# Venu — Design System Reference

Venu is a live music discovery app. The visual language is **modern music editorial** — think Resident Advisor or The FADER crossed with festival ephemera (wristbands, ticket stubs, passport stamps). The aesthetic is warm, printed, and typographically rigorous: Fraunces serif for headlines, JetBrains Mono for all metadata, and an ink-on-paper color palette.

---

## Color System

All colors are available as CSS custom properties on `:root` and as a `colors` export from `src/theme.jsx`.

| Token | Hex | Use |
|---|---|---|
| `--ink` | `#14110F` | Primary text, backgrounds, buttons |
| `--paper` | `#F4EFE7` | Page/screen background (warm off-white) |
| `--paper-2` | `#ECE5D7` | Secondary surfaces, cards, calendar grid |
| `--burnt` | `#C17F4A` | Primary accent — links, kickers, active states, prices |
| `--marquee` | `#D94F2A` | Alert red — live badges, errors, "Don't Miss" kickers |
| `--faded` | `#8A8278` | Secondary text, metadata, disabled states |
| `--moss` | `#4A5D3A` | Success states (rarely used) |
| `--bruise` | `#2C1F3D` | Deep purple (available, rarely used) |

**Key rules:**
- Backgrounds are always `--paper` or `--paper-2`, never pure white
- Hero/feature sections use `--ink` backgrounds with `--paper` text
- The accent `--burnt` is amber/terracotta — not gold, not orange
- Borders are `rgba(20,17,15,0.12)` — a soft ink tint, never gray
- Active/selected states: ink background + burnt text (stamp style)

---

## Typography

Three fonts loaded via Google Fonts. All three are always in use.

### Fraunces — Display / Headlines
- Variable font with optical sizing (`font-optical-sizing: auto`)
- Always italic (`font-style: italic`) for editorial voice
- Weight 700 for headlines, 600 for subheadings
- Used for: page titles, artist names, article headlines, card titles, pull quotes

| Size class | px | Line height | Letter spacing |
|---|---|---|---|
| Display XL | 56px | 56px | -0.02em |
| Display L | 40px | 44px | -0.01em |
| Display M | 28px | 32px | 0 |
| Display S | 22px | 28px | 0 |

### JetBrains Mono — Metadata / UI Labels
- All uppercase (`text-transform: uppercase`)
- Tracked out (letter-spacing: 0.06em–0.1em)
- Weight 500–700
- Used for: dates, times, venues, prices, genre tags, tab labels, kicker labels, button text, section counters

### Inter — Body (minimal use)
- Only used for longer prose and form inputs
- The app is primarily Fraunces + Mono; Inter appears only in auth forms and review text bodies

---

## Shape & Radius Language

- **Cards / hero blocks:** `borderRadius: 4` — nearly square, editorial feel
- **Buttons:** `borderRadius: 2` — stamp-like, very square
- **Avatars:** `borderRadius: 2` — square, not round
- **Calendar cells:** `borderRadius: 2`
- **Chip filters:** `borderRadius: 2`
- **Phone frame:** `borderRadius: 44` (the outer device shell only)

**Avoid:** `borderRadius: 50%` (circles), `borderRadius: 16–20` (bubbly cards), pill shapes. The app uses corners that feel printed, not digital-soft.

---

## Component Library

### `src/components/index.jsx` — Core UI atoms

**`PhoneFrame`** — 375×812 device shell. All screens render inside this.

**`Screen`** — Scrollable page container. `padding: "48px 20px 100px"`. Accepts `noPad` prop for map/full-bleed views.

**`TabBar`** — Bottom nav with 5 tabs: Home, Explore, Guide, Calendar, Profile. Hand-drawn SVG icons with `strokeLinecap="square"`. Active tab: ink stroke weight 1.75, burnt dot indicator below.

**`Chip`** — Genre filter button. Active: ink background + burnt text. Inactive: transparent + faded border. `borderRadius: 2`, mono uppercase.

**`TagPill`** — Read-only genre tag. Transparent background, faded border, mono uppercase. Smaller than Chip.

**`WishlistButton`** — 28×28 heart button. Active: burnt fill. Inactive: transparent + faded border. Square corners.

**`MatchScore`** — `♫ 91%` badge. Ink background, burnt text, mono font.

**`UserAvatar`** — Square (borderRadius: 2) ink block with burnt italic initial.

**`NotifBell`** — Bell icon with burnt dot indicator for unread.

**`HScroll`** — Horizontal scroll container with hidden scrollbar.

**`SectionHeader`** — Fraunces italic title + mono arrow link (legacy, prefer inline layout in new sections).

**`Divider`** — 1px `rgba(20,17,15,0.12)` hairline, `margin: "24px 0"`.

**`FriendRow`** — Editorial byline: `NAME` (mono caps) + `action` (mono faded) + *event* (Fraunces italic) + ↗.

### `src/components/marks/index.jsx` — Editorial primitives

**`Kicker`** — Small mono-caps label with optional burnt dot. Sits above headlines. Default color: burnt.
```jsx
<Kicker color="var(--marquee)">Don't Miss</Kicker>
<Kicker dot={false}>Under the Radar</Kicker>
```

**`MonoMeta`** — Mono metadata string. Uppercase, tracked. Props: `size` (default 11), `color` (default faded).
```jsx
<MonoMeta size={10} color="var(--burnt)">Stubb's BBQ · 8 PM · $45</MonoMeta>
```

**`HairlineRule`** — 1px editorial divider. Optional centered label.
```jsx
<HairlineRule label="Past Shows" />
```

**`EditorialHeadline`** — Fraunces display headline with optional kicker prop.
```jsx
<EditorialHeadline size="m" kicker="Tonight">The Drop</EditorialHeadline>
```
Sizes: `xl` (56), `l` (40), `m` (28), `s` (22).

**`FlipDigits`** — Flip-clock style numeric display. Ink tiles, burnt digits, fade animation on value change. Props: `value`, `label`, `size` (`md`/`lg`).
```jsx
<FlipDigits value={15} label="days" size="lg" />
```

**`Stamp`** — SVG rubber-stamp circle. `feTurbulence` filter for ink roughness. Props: `label`, `sub`, `rotate`, `size`, `color`, `filled`.

**`TicketStub`** — Perforated-edge ticket component. Dashed left border + dot perforation strip. Props: `artist`, `venue`, `date`, `time`, `price`, `status` (`"going"` | `"wishlist"` | null).

**`LiveBadge`** — Pulsing `● LIVE NOW` badge in marquee red.

---

## Texture & Decoration Classes (`src/styles/textures.css`)

| Class | Effect |
|---|---|
| `.paper-grain` | Subtle SVG feTurbulence noise overlay via `::before` |
| `.baseline-rules` | Faint horizontal rules every 24px (ruled paper) |
| `.perforated-left` | Dashed left edge on ticket stubs |
| `.halftone` | Radial-gradient dot field for hero backgrounds |
| `.stamp-ink` | feTurbulence displacement filter for stamp roughness |
| `.hairline` | 1px `var(--hairline)` border |

**Inline halftone pattern** (used inside ink backgrounds for texture):
```jsx
backgroundImage: "radial-gradient(circle, rgba(193,127,74,0.18) 1px, transparent 1px)",
backgroundSize: "8px 8px",
```

**Stitched binding** (used at top of passport/card sections):
```jsx
background: "repeating-linear-gradient(to right, transparent, transparent 4px, rgba(193,127,74,0.3) 4px, rgba(193,127,74,0.3) 8px)"
```

---

## Layout Patterns

### Page Masthead
Every page opens with a Fraunces italic wordmark + mono subtitle on the same line.
```
[Fraunces 38px italic]  [right: icon/action]
[MonoMeta 10px faded — subtitle or location]
```

### Section Headers (inline, not SectionHeader component)
```jsx
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16 }}>
  <EditorialHeadline size="s" italic>Section Title</EditorialHeadline>
  <MonoMeta size={9} color="var(--burnt)" style={{ cursor: "pointer" }}>See All →</MonoMeta>
</div>
```

### Ink Hero Block
Full-width ink background card. Used for: hero show countdown, festival cards, spotlight articles.
```
background: var(--ink)
borderRadius: 4
padding: 20px
Optional: halftone dot texture on right side
Optional: stitched top border (burnt dashes)
```

### Paper-2 Card
Secondary surface for calendar, passport, crews, weekly picks.
```
background: var(--paper-2)
borderRadius: 4
padding: 16–20px
```

### Editorial List Row
Artist/show rows — no image thumbnail, just text hierarchy.
```
[Fraunces 17px italic — Artist Name]
[MonoMeta 10px faded — Venue · Time]
[TagPill + MatchScore]
[right: price + WishlistButton]
```
Separated by `1px solid rgba(20,17,15,0.08)` borders, not cards.

### Underline Search
```
borderBottom: "1px solid rgba(20,17,15,0.2)"  (no box, no radius)
background: transparent
fontFamily: JetBrains Mono
fontSize: 12px
```

### Underline Tab Toggle (Discover / Map)
```
borderBottom: mode === active ? "2px solid var(--ink)" : "2px solid transparent"
marginBottom: -1  (sits on the container's bottom border)
fontFamily: JetBrains Mono, uppercase, 10px
```

---

## Page Summaries

### Home
- Fraunces masthead + today's date in mono
- **Hero Show**: ink block with `FlipDigits` countdown, kicker "Next up", Fraunces artist name
- **The Drop**: `HScroll` of `TicketStub` components (presale alerts)
- **This Week**: Lead pick full-width (Kicker + Fraunces headline + Fraunces italic blurb), two secondary picks in asymmetric 2-col grid
- **Perfect Matches**: Editorial list rows with MatchScore + TagPill inline
- **Friends**: `FriendRow` bylines (NAME · action · *event* ↗)

### Explore
- Masthead + city label + "Change City" link
- Underline search input
- `Chip` genre filters (horizontal scroll)
- Underline toggle: Discover / Map
- **Discover**: Ink promoted card → Tonight editorial list → Weekend (lead full-width + HScroll for rest) → Festival ink cards
- **Map**: Leaflet map (CartoDB Voyager) + venue list with "Tonight" badge pills

### Guide
- "The Guide" masthead + category `Chip` filters
- Featured article: full-bleed image + gradient overlay + paper-2 text block below
- Spotlight: ink background with image, Fraunces headline, show link
- **The Signal**: editorial bylines with `LiveBadge` for trending items
- More to Read: HScroll of paper-2 cards

### Calendar
- Masthead + month nav arrows (← / →)
- **Grid**: paper-2 background, JetBrains Mono date numbers, burnt dot (going) / burnt outline dot (wishlist) / faded dot (attended)
- **Filter buttons**: stamp-style (ink + burnt when active)
- **Event rows**: left accent stripe (3px burnt) + date block (paper-2) + content (paper) — no images

### Profile
- **Identity card**: ink background, square avatar, burnt handle, stitched top stripe, halftone texture
- **Passport**: paper-2 background, 4-col stats grid (paper background tiles), emoji badges
- Crews: paper-2 cards with stacked square avatars + mono feature tags
- Favorite Artists / Venues: square image thumbnails in HScroll
- Reviews: inline edit/delete, Fraunces italic review text

---

## Interaction Patterns

- **`.pressable`**: All tappable elements get `filter: brightness(0.92); transform: translateY(1px)` on `:active`
- **No hover states** (mobile-first prototype)
- **Focus rings**: `2px solid var(--ink)` via `:focus-visible`
- **Reduced motion**: All animations disabled via `prefers-reduced-motion`
- **Scrollbars**: Always hidden (`scrollbar-width: none`)

---

## What to Avoid

- **Round corners** on cards, buttons, avatars — use `borderRadius: 2–4`
- **White backgrounds** for surfaces — use `--paper` or `--paper-2`
- **Blue links or blue accents** — accent is always `--burnt`
- **Emoji in UI** — only in user-generated content (reviews) and badge icons
- **Drop shadows** — use border (`1px solid rgba(20,17,15,0.1)`) instead
- **Gradient buttons** — buttons are solid ink or transparent with border
- **Card grid layouts** — prefer editorial list rows or asymmetric editorial grids
- **Pill/circular shapes** for buttons or avatars — stamp-style square corners only
