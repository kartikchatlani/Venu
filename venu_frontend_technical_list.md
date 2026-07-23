# Venu Frontend — Global & Reused Components, Data, and Functions

This document identifies which components, data models, and functions are **global** (used across the entire app or multiple pages), and how they map to each page. Page-specific items are listed separately.

**Legend:**  
Cyan \- global custom component  
Blue \- global premade component (hopefully)  
Green \- not quite sure what it is but global custom based on the description  
Yellow \- used on multiple pages but not all  
Red \- single page component  
Pink \- is part of another component/insignificant  
Orange \- should be a global object, not component

---

## Global Components

These components appear on multiple pages and should be built once as a shared library, then reused throughout the app.

### Navigation & Structure

- **Bottom Tab Bar** — Home, Explore, The Guide, Calendar, Profile (appears on every main page; active state changes per page)  
- **Page Header** — Serif italic page title \+ contextual right-side element (notification bell, settings gear, city pill, or back arrow)  
- **Section \+ Header** — Serif italic title \+ action link (e.g., "See All," "View All," "Browse All," "Full Guide," "Manage"). Used on Home, Explore, The Guide, Profile.

### Cards & Event Display

- **Bottom Sheet** — The event detail popup. Triggered from any event card across Home, Explore, Calendar, and The Guide.  
- **Show/Event Card (row variant)** — Thumbnail \+ artist name \+ venue/date metadata \+ chevron. Used on Home ("Your Shows"), Explore ("Tonight in"), Calendar event list.  
- **Event Card (poster variant)** — Vertical card with image, title, metadata, genre tag, price, wishlist heart. Used on Explore ("This Weekend"), Home ("Perfect Matches").  
- **Wishlist Heart Button** — Circular icon button with toggle state. Used on Home, Explore, Calendar, event bottom sheet.  
- **Genre Tag Pill** — Small cream rounded label. Used on event cards across Home, Explore.  
- **Match Badge** — "🎵 X%" indicator. Used on Home (Perfect Matches) and Explore (Festivals For You).  
- **Price/Status Indicator** — "From $X" / "TBA" / "Sold Out" / "Presale." Used on Explore, Home, event bottom sheet.

### Social & People

- **Avatar (initial variant)** — Profile picture or colored circle/square with initials, used for user, friends, crew members, authors. Used on Profile (Friends sub-page, Crews), Home (friend activity), event bottom sheet ("friends going"). Can have the option to display name or profile picture depending on the page. Should link to profile.  
- **Avatar Stack** — Overlapping avatars with "+N" overflow indicator. Used on Profile (Crews), event bottom sheet (friends going). Has to be a global component because used anywhere due to bottom sheet.  
- **Friend Activity Row** — Avatar \+ activity sentence with bolded subject/object \+ timestamp. Used on Home, Profile (Friends sub-page).   
- **Profile** — Any person/account should be clickable from any page

### Content & Editorial

- **Article Card** — Cover image, category tag, title, description, author row, read time, bookmark icon. Used on The Guide, Home ("This Week in \[City\]").  
- **Author Avatar with Credit Line** — Avatar \+ name \+ role. Used on The Guide, Home editorial picks.  
- **Bookmark Icon Button** — Toggle state. Used on The Guide, potentially anywhere long-form content appears.  
- **Sponsored/Promoted Card** — Distinct treatment with disclosure label. Used on The Guide (Sponsored Content), Explore (Promoted Event).

### Inputs & Controls

- **Search Bar** — Rounded input with search icon. Used on Explore (events), Profile (friends), Add Friends sheet.  
- **Filter Pills (horizontal scroll)** — Used on Explore (genres), The Guide (categories), Add Friends (search method), Calendar (All/Going/Wishlist tabs).  
- **Segmented View Toggle** — Used on Explore (Discover/Map), could extend to other dual-view contexts.

### Feedback & Status

- **Confirmation Toast** — Charcoal pill with gold checkmark, auto-dismissing. Used after wishlist/going/bookmark toggles across all pages.  
- **Notification Bell \+ Unread Indicator** — Used on Home, The Guide header.

---

## Global Data

These data models are referenced by multiple pages and should live in shared state / global stores.

### User & Session

- **User profile** — Display name, username, avatar, location/city, bio, member since. Referenced by Profile, Home header, event bottom sheet ("friends going" identification).  
- **User's city/location** — Drives "Tonight in \[City\]," "This Week in \[City\]," Explore defaults, festival recommendations.  
- **User's taste profile** — Followed artists, genre preferences, listening history. Powers Perfect Matches (Home), Festivals For You (Explore), The Guide "For You" personalization.  
- **Notifications** — Count, unread state, notification list. Referenced by Home, The Guide.

### Events & Content

- **Events** — Core event model (id, artist, venue, date, time, image, genre, price/TBA state, status: announced/presale/on-sale/live/past). Referenced by Home, Explore, Calendar, The Guide (Spotlight linked events), event bottom sheet.  
- **Venues** — id, name, image, address, capacity, type (indoor/outdoor). Referenced by events, Profile (Favorite Venues), Explore.  
- **Artists** — id, name, image, genre tags. Referenced by events, Profile (Favorite Artists), Explore search.  
- **Festivals** — id, name, city, date range, cover image, artist lineup, match score. Referenced by Explore, potentially Calendar and Profile Passport.

### Social Graph

- **Wishlist state per event** — Boolean per event id. Referenced by Home, Explore, Calendar, event bottom sheet.  
- **Going state per event** — Boolean per event id. Referenced by Calendar, event bottom sheet, Home ("Your Shows"), friend activity feed.

### Editorial

- **Articles** — id, title, description, body, cover, category, author, publish date, read time, linked event (optional). Referenced by The Guide, Home ("This Week," "Don't Miss").  
- **Authors** — name, role, avatar, bio. Referenced by The Guide, Home editorial picks.  
- **Scout Tips** — id, linked artist/event, scout author, tip body. Referenced by Home, event bottom sheet.

---

## Global Functions

These behaviors are used across the app and should be shared utilities or hooks.

- **Navigate between bottom tabs** — Available on every main page (standard routing).  
- **Pull-to-refresh** — Available on Home, Explore, The Guide, Calendar (refreshes page-specific data).  
- **Open event bottom sheet** — Triggered from any event card tap across Home, Explore, Calendar, The Guide.   
- **Toggle wishlist** — Same action surfaced from Home, Explore, Calendar, and event bottom sheet. Triggers confirmation toast.  
- **Toggle going/RSVP** — Same action from event bottom sheet; updates Calendar, Home "Your Shows," and friend activity feed. Triggers confirmation toast.  
- **Share (external share sheet)** — Used for articles, profile, passport, events.  
- **Open notifications panel** — Triggered from bell icon on Home and The Guide.  
- **Navigate to Profile** — From avatar tap in Home header.  
- **Track content views** — Articles, events, artists (feeds personalization across Home, The Guide, Explore).

---

## Page-Specific Components, Data, and Functions

Everything listed here is unique to a single page and does not need to be globalized.

### Home

**Components (page-specific):**

- The Drop Card (dark card with live/presale status)  
- Soundcheck Card (daily trivia with streak, multiple-choice, stats footer)  
- This Week in \[City\] Section (editor attribution)  
- Don't Miss Card (editorial hero)

**Data (page-specific):**

- The Drop (status, presale code, CTA link)  
- Soundcheck (daily question, answer options, correct answer, streak count, reset timer, city-wide stats, user answer state)  
- This Week in \[City\] editorial curation  
- Don't Miss editorial picks

**Functions (page-specific):**

- Answer Soundcheck question → reveal correct answer \+ stats  
- View Soundcheck streak detail  
- Tap The Drop → presale flow or event sheet

---

### Explore

**Components (page-specific):**

- City pill with location picker  
- Tagline subheader  
- Map View (with event pin clustering)  
- Promoted Event Card (hero variant with Get Tickets CTA)  
- Festival Card (dark variant with match % and artist lineup chips)

**Data (page-specific):**

- Search query state  
- Active genre filter  
- Active view mode (Discover vs. Map)  
- Promoted events \+ sponsor metadata  
- Tonight's events in user's city  
- This Weekend's events  
- Map data (coordinates, clustering, viewport bounds)

**Functions (page-specific):**

- Open city/location picker  
- Enter/clear search query  
- Select genre pill → filter events  
- Toggle Discover/Map view  
- In Map view: pan/zoom, tap pin → event preview

---

### The Guide

**Components (page-specific):**

- Featured Article Card (hero size)  
- Artist Spotlight Card (dark variant with embedded event CTA)  
- Signal Section Header ("Updated live" status)  
- Signal Feed Item (news ticker style with icon, trending badge)  
- More to Read Section

**Data (page-specific):**

- Guide categories/tabs  
- Signal feed items (headline, meta, icon type, trending flag, source)  
- Article view history  
- Saved articles list

**Functions (page-specific):**

- Filter articles by category tab  
- Mark article as read  
- Tap sponsored card (with tracking/disclosure)

---

### Calendar

**Components (page-specific):**

- Month Navigator (arrows \+ month/year picker)  
- Calendar Grid (7-column week layout)  
- Date Cell States (default, today, going dot, wishlist circle, empty)  
- Legend Row  
- Filter Tabs (All / Going / Wishlist with counts)  
- Date Group Header  
- Event Card with amber left border, dismiss X, status badge (✓ GOING vs. ♡ WISHLIST)

**Data (page-specific):**

- Current month/year being viewed  
- Events grouped by date for list view  
- Month-level summary (total by type)  
- Event counts per filter tab

**Functions (page-specific):**

- Navigate previous/next month  
- Tap month pill → month/year picker  
- Tap date cell → scroll to that date's events  
- Filter event list by tab  
- Dismiss/remove event (X button)  
- Toggle event status (wishlist ↔ going)  
- Sync Going events to device/Google Calendar

---

### Profile

**Components (page-specific):**

- Profile Card (dark charcoal with gold avatar, bio quote)  
- Stats Row (Friends, Reviews with divider)  
- Edit Profile Button  
- Passport Card  
- Passport Stats Grid (Shows / Venues / Festivals / Badges)  
- Earned Badges Grid (with locked state)  
- Crew Card (with polls, lineup, photos chips, linked event)  
- Create New Crew Button (dashed outline)  
- Favorite Artists Section (circular images with "Seen Nx")  
- Favorite Venues Section  
- Photo Albums Section (cover \+ photo count chip)  
- Recent Reviews Section (star rating, italic quote)  
- Share Profile Button  
- Share Passport Button

**Friends sub-page components:**

- Add Friends Button (amber pill)  
- Add Friends Bottom Sheet (search \+ filter pills: Name/Username/Contacts/QR, Sync Contacts promo)

**Data (page-specific):**

- Passport data (season, total shows/venues/festivals/badges)  
- Badge catalog (id, name, icon, unlock criteria, earned/locked state, earned date)  
- Crews (members, linked event, polls, lineup, photos)  
- Favorite Artists (times seen, last seen)  
- Favorite Venues (times visited)  
- Photo Albums (cover, photo count, date, event association)  
- Reviews (rating, text, associated event)  
- Add Friends search state (query, filter type, results, sent requests)  
- Contact sync permission state

**Functions (page-specific):**

- Open settings  
- Edit profile  
- Tap Passport card → full history view  
- Tap badge → badge detail  
- Manage crews (create, edit, leave, invite)  
- Vote in crew polls  
- Edit favorite artists  
- Upload photo album  
- Write new review  
- Share profile / passport  
- Friends sub-page: Add friends, search friends, send friend request, cancel request, sync contacts, scan QR, show own QR

---

## Summary: Why This Matters

**Build these first, as shared components:** Bottom Tab Bar, Page Header, Section Header, Event Bottom Sheet, Event Cards (row \+ poster variants), Avatar \+ Avatar Stack, Wishlist Heart, Match Badge, Genre Tag Pill, Bottom Sheet container, Confirmation Toast, Search Bar, Filter Pills, Article Card.

**Centralize this data in a shared store:** User profile, user's city, taste profile, events, venues, artists, friends list, wishlist/going state, articles, scout tips.

**Centralize these functions as hooks/utilities:** Navigation, pull-to-refresh, toggle wishlist, toggle going, open event sheet, share, open notifications, ticketing flow.

Page-specific components (Soundcheck, Passport, Calendar grid, Map view, Crew cards) can be built in isolation within their respective page modules.  
