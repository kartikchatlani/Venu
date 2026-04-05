// ============================================================
// HOME PAGE DATA
// ============================================================

export const bookedShows = [
  {
    id: 1, artist: "Khruangbin", venue: "Stubb's BBQ", date: "Apr 12",
    day: "Sat", time: "8 PM", price: "$45", daysUntil: 15, booked: true,
    tags: ["Psychedelic", "Funk"],
    img: "https://images.unsplash.com/photo-1501386761578-0a55d938946b?w=400&h=400&fit=crop",
  },
  {
    id: 2, artist: "Toro y Moi", venue: "Mohawk", date: "Apr 18",
    day: "Fri", time: "9 PM", price: "$38", daysUntil: 21, booked: true,
    tags: ["Chillwave", "Indie"],
    img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
  },
];

export const perfectMatches = [
  {
    id: 3, artist: "Floating Points", venue: "The Parish", date: "Apr 25",
    price: "$30", match: 91, genre: "Electronic", booked: false,
    img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop",
  },
  {
    id: 4, artist: "L'Eclair", venue: "Cheer Up Charlies", date: "May 3",
    price: "$22", match: 89, genre: "Psych-Funk", booked: false,
    img: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&h=400&fit=crop",
  },
  {
    id: 5, artist: "Nala Sinephro", venue: "Cactus Cafe", date: "May 10",
    price: "$25", match: 86, genre: "Jazz", booked: false,
    img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop",
  },
];

export const friends = [
  { name: "Maya", action: "bought tix", event: "ACL Wknd 1", time: "2h", color: "#E07A5F" },
  { name: "Jordan", action: "wishlisted", event: "Floating Pts", time: "4h", color: "#81B29A" },
  { name: "Nico", action: "rated ★★★★★", event: "Soccer Mommy", time: "6h", color: "#F2CC8F" },
];

export const weeklyPicks = [
  {
    id: 1, label: "Don't miss", artist: "Mdou Moctar",
    venue: "Mohawk (Outdoor)", date: "Tue, Apr 1",
    blurb: "Tuareg guitar god in an intimate outdoor setting. This won't happen twice.",
    img: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=250&fit=crop",
  },
  {
    id: 2, label: "Under the radar", artist: "Mabe Fratti",
    venue: "Cactus Cafe", date: "Thu, Apr 3",
    blurb: "Experimental cellist from Guatemala City. 60-cap room. Go early.",
    img: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=400&h=250&fit=crop",
  },
  {
    id: 3, label: "Weekend move", artist: "Mannequin Pussy",
    venue: "Emo's", date: "Sat, Apr 5",
    blurb: "Punk energy meets pop hooks. Expect a packed room and crowd surfers.",
    img: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=250&fit=crop",
  },
];

export const soundcheckQuestion = {
  question: "Which iconic Austin venue opened its doors in 1955 on South Congress?",
  options: ["Antone's", "Continental Club", "Broken Spoke", "Cactus Cafe"],
  correctIndex: 1,
  stat: "68% of Austin users got this right",
};

// ============================================================
// EXPLORE PAGE DATA
// ============================================================

export const genres = ["All", "Rock", "Electronic", "Hip-Hop", "Jazz", "Country", "R&B", "Punk", "Latin"];

export const promotedEvent = {
  venue: "Stubb's BBQ",
  event: "Turnstile + JPEGMafia",
  date: "This Friday · Apr 4",
  time: "Doors 7 PM",
  price: "From $42",
  img: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&h=300&fit=crop",
};

export const tonightShows = [
  { id: 10, artist: "Surf Curse", venue: "Emo's", time: "9 PM", price: "$28", genre: "Indie Rock", match: 88, img: "https://images.unsplash.com/photo-1501386761578-0a55d938946b?w=200&h=200&fit=crop" },
  { id: 11, artist: "Khruangbin DJ Set", venue: "The Concourse Project", time: "10 PM", price: "$35", genre: "Funk", match: 94, img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop" },
  { id: 12, artist: "Iron & Wine", venue: "ACL Live", time: "8 PM", price: "$55", genre: "Folk", match: 72, img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&h=200&fit=crop" },
];

export const weekendShows = [
  { id: 20, artist: "Black Pumas", venue: "Moody Amphitheater", date: "Sat, Apr 5", price: "$48", genre: "Soul", venuUsers: 84, img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=250&fit=crop" },
  { id: 21, artist: "Mannequin Pussy", venue: "Mohawk", date: "Sat, Apr 5", price: "$25", genre: "Punk", venuUsers: 37, img: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=400&h=250&fit=crop" },
  { id: 22, artist: "Norah Jones", venue: "Bass Concert Hall", date: "Sun, Apr 6", price: "$65", genre: "Jazz", venuUsers: 52, img: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&h=250&fit=crop" },
];

export const festivals = [
  { name: "Lollapalooza", city: "Chicago, IL", dates: "Jul 31 – Aug 3", matchArtists: ["Tame Impala", "Charli XCX", "Khruangbin"], match: 87, img: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=200&fit=crop" },
  { name: "Bonnaroo", city: "Manchester, TN", dates: "Jun 12 – 15", matchArtists: ["Tyler, the Creator", "LCD Soundsystem"], match: 82, img: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&h=200&fit=crop" },
  { name: "Primavera Sound LA", city: "Los Angeles, CA", dates: "Sep 12 – 14", matchArtists: ["Floating Points", "Bicep", "bar italia"], match: 79, img: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=400&h=200&fit=crop" },
];

export const mapVenues = [
  { name: "Stubb's BBQ", x: 52, y: 38, type: "venue", tonight: true },
  { name: "Mohawk", x: 55, y: 35, type: "venue", tonight: true },
  { name: "Emo's", x: 57, y: 40, type: "venue", tonight: true },
  { name: "The Parish", x: 54, y: 42, type: "venue", tonight: false },
  { name: "ACL Live", x: 48, y: 50, type: "venue", tonight: true },
  { name: "Cheer Up Charlies", x: 56, y: 37, type: "venue", tonight: false },
  { name: "Moody Amphitheater", x: 44, y: 55, type: "venue", tonight: false },
  { name: "Concourse Project", x: 68, y: 62, type: "venue", tonight: true },
  { name: "Cactus Cafe", x: 42, y: 28, type: "venue", tonight: false },
  { name: "Continental Club", x: 48, y: 56, type: "venue", tonight: true },
  { name: "Zilker Park", x: 38, y: 60, type: "festival", tonight: false },
  { name: "Bass Concert Hall", x: 44, y: 26, type: "venue", tonight: false },
];

// ============================================================
// GUIDE PAGE DATA
// ============================================================

export const guideCategories = ["For You", "Scene Reports", "Spotlights", "The Signal"];

export const featuredArticle = {
  category: "Scene Report",
  title: "The 5 Austin Venues Where Sound Actually Matters",
  subtitle: "From the Parish's wooden warmth to Stubb's open-air thunder — a guide to hearing music the way it was meant to be heard.",
  author: "Elena Ruiz",
  authorRole: "Austin Scene Editor",
  readTime: "7 min read",
  img: "https://images.unsplash.com/photo-1501386761578-0a55d938946b?w=600&h=350&fit=crop",
};

export const spotlightArticle = {
  artist: "Mdou Moctar",
  title: "Mdou Moctar is Playing a 300-Cap Room Tuesday — Here's Why You Should Care",
  excerpt: "The Tuareg guitar revolutionary brings the Saharan desert to Red River. This is not a show you sit through — it's one that changes how you hear the instrument.",
  author: "James Okonkwo",
  authorRole: "Contributing Writer",
  readTime: "5 min read",
  showLink: "Mohawk (Outdoor) · Tue, Apr 1 · $28",
  img: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&h=300&fit=crop",
};

export const signalItems = [
  { icon: "⚡", title: "Secret show alert: Bartees Strange at Cheer Up Charlies", detail: "Tonight · Doors 9 PM · $15 at the door", time: "1h ago", hot: true },
  { icon: "🎤", title: "Billie Eilish announces fall arena tour", detail: "Moody Center, Austin · Oct 18 · Presale Apr 7", time: "2h ago", hot: true },
  { icon: "🎪", title: "ACL 2026 adds Tame Impala, SZA to headliners", detail: "Weekend 1 & 2 · Zilker Park", time: "5h ago", hot: true },
  { icon: "🏠", title: "Hotel Vegas announces summer residency series", detail: "Every Thursday · Jun–Aug · Free admission", time: "8h ago", hot: false },
  { icon: "📝", title: "Last night at Stubb's: Black Pumas delivered", detail: "Rated 4.8 by 127 Venu users", time: "12h ago", hot: false },
];

export const moreArticles = [
  { category: "Scene Report", title: "A First-Timer's Guide to ACL: What Nobody Tells You", author: "Maya Chen", readTime: "8 min", img: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&h=200&fit=crop" },
  { category: "Spotlight", title: "Nala Sinephro Turns Jazz Inside Out", author: "James Okonkwo", readTime: "4 min", img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=200&fit=crop" },
  { category: "Scene Report", title: "What's Happening on Red River This Spring", author: "Elena Ruiz", readTime: "6 min", img: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=400&h=200&fit=crop" },
];

// ============================================================
// CALENDAR PAGE DATA
// ============================================================

export const calendarDots = {
  booked: [12, 18, 25],
  wishlist: [1, 5, 25],
};

export const calendarEvents = [
  { artist: "Mdou Moctar", venue: "Mohawk (Outdoor)", time: "8 PM", price: "$28", month: "Apr", day: 1, weekday: "Tue", type: "wish", img: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=200&h=200&fit=crop" },
  { artist: "Mannequin Pussy", venue: "Mohawk", time: "9 PM", price: "$25", month: "Apr", day: 5, weekday: "Sat", type: "wish", img: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=200&h=200&fit=crop" },
  { artist: "Khruangbin", venue: "Stubb's BBQ", time: "8 PM", price: "$45", month: "Apr", day: 12, weekday: "Sat", type: "booked", img: "https://images.unsplash.com/photo-1501386761578-0a55d938946b?w=200&h=200&fit=crop" },
  { artist: "Toro y Moi", venue: "Mohawk", time: "9 PM", price: "$38", month: "Apr", day: 18, weekday: "Fri", type: "booked", img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop" },
  { artist: "Floating Points", venue: "The Parish", time: "10 PM", price: "$30", month: "Apr", day: 25, weekday: "Fri", type: "booked", img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&h=200&fit=crop" },
  { artist: "L'Eclair", venue: "Cheer Up Charlies", time: "9 PM", price: "$22", month: "Apr", day: 25, weekday: "Fri", type: "wish", img: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=200&h=200&fit=crop" },
  { artist: "Nala Sinephro", venue: "Cactus Cafe", time: "8 PM", price: "$25", month: "May", day: 10, weekday: "Sat", type: "wish", img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&h=200&fit=crop" },
];

// ============================================================
// PROFILE PAGE DATA
// ============================================================

export const userProfile = {
  name: "Alex Rivera",
  handle: "@alexrivera",
  location: "Austin, TX",
  bio: '"Chasing the perfect setlist. If the bass shakes the floor, I\'m there."',
  following: 247,
  followers: 183,
  reviews: 34,
};

export const passportStats = { shows: 18, venues: 11, festivals: 3, badges: 6 };

export const badges = [
  { icon: "🔥", name: "5-Show Streak", tier: "gold" },
  { icon: "🗺️", name: "3 States", tier: "amber" },
  { icon: "🌙", name: "Night Owl", tier: "gold" },
  { icon: "🎪", name: "Festival Vet", tier: "silver" },
  { icon: "⭐", name: "Top Reviewer", tier: "amber" },
  { icon: "🔒", name: "Locked", tier: "locked" },
];

export const crews = [
  {
    name: "The Stubb's Squad", memberCount: 5,
    avatars: [
      { initial: "A", color: "#E07A5F" }, { initial: "M", color: "#81B29A" },
      { initial: "J", color: "#F2CC8F" }, { initial: "N", color: "#C17F4A" },
      { initial: "S", color: "#C4B8A8" },
    ],
    features: [{ icon: "📊", label: "2 open polls" }, { icon: "📸", label: "48 photos" }, { icon: "🎵", label: "Shared playlist" }],
    nextEvent: "Khruangbin @ Stubb's · Apr 12",
  },
  {
    name: "ACL Crew 2026", memberCount: 8,
    avatars: [
      { initial: "A", color: "#E07A5F" }, { initial: "M", color: "#81B29A" },
      { initial: "J", color: "#F2CC8F" }, { initial: "K", color: "#5C4F3D" },
      { initial: "+4", color: "#C4B8A8" },
    ],
    features: [{ icon: "📊", label: "1 open poll" }, { icon: "📋", label: "Custom lineup" }],
    nextEvent: "ACL Weekend 1 · Oct 3–5",
  },
];

export const favoriteArtists = [
  { name: "Khruangbin", seen: 6, img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop" },
  { name: "Toro y Moi", seen: 3, img: "https://images.unsplash.com/photo-1501386761578-0a55d938946b?w=200&h=200&fit=crop" },
  { name: "Floating Points", seen: 2, img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&h=200&fit=crop" },
  { name: "Turnstile", seen: 4, img: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=200&h=200&fit=crop" },
  { name: "JPEG", seen: 2, img: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=200&h=200&fit=crop" },
];

export const favoriteVenues = [
  { name: "Stubb's BBQ", shows: 7, img: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=200&h=200&fit=crop" },
  { name: "Mohawk", shows: 5, img: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=200&h=200&fit=crop" },
  { name: "The Parish", shows: 3, img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&h=200&fit=crop" },
  { name: "ACL Live", shows: 2, img: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&h=200&fit=crop" },
];

export const photoAlbums = [
  { title: "Khruangbin @ Stubb's", date: "Mar 15, 2026", count: 24, img: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=250&fit=crop" },
  { title: "SXSW 2026", date: "Mar 7–15, 2026", count: 67, img: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&h=250&fit=crop" },
  { title: "Turnstile @ Mohawk", date: "Feb 22, 2026", count: 12, img: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=400&h=250&fit=crop" },
];

export const recentReviews = [
  { artist: "Black Pumas @ Moody Amphitheater", stars: "★★★★★", date: "Mar 22, 2026", text: '"The horns on Colors hit different live. Adrian Quesada\'s guitar tone in that room is unmatched. Encore was Fire — crowd lost it."' },
  { artist: "Soccer Mommy @ Emo's", stars: "★★★★☆", date: "Mar 8, 2026", text: '"Intimate and raw. New songs sounded massive. Only ding — sound mix was a bit muddy for the first three songs."' },
];
