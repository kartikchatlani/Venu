import React, { useState } from "react";
import { Screen, HScroll, NotifBell, WishlistButton } from "../components/index.jsx";
import { MonoMeta, HairlineRule, TicketStub } from "../components/marks/index.jsx";
import { perfectMatches, friends, weeklyPicks } from "../data/index.jsx";

const P = "#F4EFE7";   // primary text
const A = "#C17F4A";   // amber
const E = "#D94F2A";   // ember
const F = "#8A8278";   // faded
const D = "'Fraunces', Georgia, serif";
const M = "'JetBrains Mono', monospace";

const getDaysUntil = (dateStr) => {
  if (!dateStr) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const event = new Date(dateStr + "T12:00:00");
  const diff = Math.round((event - today) / (1000 * 60 * 60 * 24));
  return diff >= 0 ? diff : null;
};

const TODAY_LABEL = (() => {
  const d = new Date();
  const day = d.toLocaleString("en-US", { weekday: "short" }).toUpperCase();
  const mon = d.toLocaleString("en-US", { month: "short" }).toUpperCase();
  return `${day} ${mon} ${d.getDate()}`;
})();

// Canonical presales data — marquee derives from this
const allPresales = [
  {
    artist: "Turnstile", venue: "Stubb's Outdoor", city: "Austin, TX",
    showDate: "Aug 9, 2026", saleDate: "2026-06-25", saleTime: "10:00 AM",
    status: "presale", code: "VENU",
    img: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=200&h=200&fit=crop",
    match: 96, ticketUrl: null,
  },
  {
    artist: "Mdou Moctar", venue: "Mohawk", city: "Austin, TX",
    showDate: "Aug 14, 2026", saleDate: "2026-06-28", saleTime: "10:00 AM",
    status: "presale", code: "DESERT",
    img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop",
    match: 91, ticketUrl: null,
  },
  {
    artist: "Floating Points", venue: "Concourse Project", city: "Austin, TX",
    showDate: "Aug 22, 2026", saleDate: "2026-07-05", saleTime: "10:00 AM",
    status: "presale", code: "FLOAT",
    img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&h=200&fit=crop",
    match: 89, ticketUrl: null,
  },
  {
    artist: "Tyler, the Creator", venue: "Moody Center", city: "Austin, TX",
    showDate: "Sep 20, 2026", saleDate: "2026-07-14", saleTime: "10:00 AM",
    status: "presale", code: "GOLF",
    img: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=200&h=200&fit=crop",
    match: 94, ticketUrl: null,
  },
  {
    artist: "Ethel Cain", venue: "ACL Live", city: "Austin, TX",
    showDate: "Sep 27, 2026", saleDate: "2026-07-22", saleTime: "12:00 PM",
    status: "presale", code: "PREACHER",
    img: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=200&h=200&fit=crop",
    match: 87, ticketUrl: null,
  },
  {
    artist: "Caroline Polachek", venue: "Stubb's Outdoor", city: "Austin, TX",
    showDate: "Jul 30, 2026", saleDate: "2026-06-01", saleTime: "10:00 AM",
    status: "onsale", code: null,
    img: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=200&h=200&fit=crop",
    match: 92, ticketUrl: null,
  },
  {
    artist: "Billie Eilish", venue: "Moody Center", city: "Austin, TX",
    showDate: "Oct 18, 2026", saleDate: "2026-05-10", saleTime: "10:00 AM",
    status: "onsale", code: null,
    img: "https://images.unsplash.com/photo-1501386761578-0a55d938946b?w=200&h=200&fit=crop",
    match: 85, ticketUrl: null,
  },
  {
    artist: "Bon Iver", venue: "ACL Live", city: "Austin, TX",
    showDate: "Nov 4, 2026", saleDate: "2026-05-20", saleTime: "10:00 AM",
    status: "onsale", code: null,
    img: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=200&h=200&fit=crop",
    match: 88, ticketUrl: null,
  },
];

// Slim version for the marquee ticker
const dropItems = allPresales.map((p) => ({
  artist: p.artist,
  date: new Date(p.saleDate + "T12:00:00") > new Date() ? p.saleDate.slice(5).replace("-", " / ") : "On Sale",
  status: p.status,
}));

const getCountdown = (saleDateStr) => {
  const now = new Date();
  const sale = new Date(saleDateStr + "T10:00:00");
  const diff = sale - now;
  if (diff <= 0) return null;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  if (days > 0) return `${days}d ${hours}h`;
  return `${hours}h`;
};

// ── All Presales Overlay ──────────────────────────────────────────────────────

const glass = "rgba(244,239,231,0.05)";
const glassBorder = "rgba(244,239,231,0.10)";

const AllPresalesPage = ({ onClose }) => {
  const [filter, setFilter] = useState("All");
  const [reminded, setReminded] = useState(new Set());

  const filtered = allPresales.filter((p) =>
    filter === "All" ? true : filter === "Presale" ? p.status === "presale" : p.status === "onsale"
  );

  return (
    <div style={{
      position: "absolute", inset: 0, zIndex: 180,
      background: "#0C0A08",
      display: "flex", flexDirection: "column",
    }}>
      {/* Header */}
      <div style={{ padding: "52px 22px 0", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
          <button onClick={onClose} style={{
            background: glass, border: `1px solid ${glassBorder}`,
            borderRadius: 2, padding: "7px 14px", cursor: "pointer",
            display: "flex", alignItems: "center", gap: 6,
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={P} strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
            <span style={{ fontFamily: M, fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: P }}>Back</span>
          </button>
          <div>
            <div style={{ fontFamily: D, fontSize: 28, fontWeight: 700, color: P, lineHeight: "28px" }}>The Drop</div>
            <div style={{ fontFamily: M, fontSize: 9, color: F, textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 3 }}>
              {allPresales.filter((p) => p.status === "presale").length} presales · {allPresales.filter((p) => p.status === "onsale").length} on sale
            </div>
          </div>
        </div>

        {/* Filter tabs */}
        <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
          {["All", "Presale", "On Sale"].map((tab) => (
            <button key={tab} onClick={() => setFilter(tab)} style={{
              padding: "7px 16px", cursor: "pointer",
              fontFamily: M, fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
              border: filter === tab ? "none" : `1px solid ${glassBorder}`,
              background: filter === tab ? A : glass,
              color: filter === tab ? "#14110F" : F,
              borderRadius: 2,
            }}>{tab}</button>
          ))}
        </div>
      </div>

      {/* Scrollable list */}
      <div style={{ flex: 1, overflowY: "auto", scrollbarWidth: "none", padding: "0 22px 40px" }}>
        {filtered.map((p, i) => {
          const countdown = getCountdown(p.saleDate);
          const isLive = !countdown;
          const hasReminder = reminded.has(p.artist);

          const saleLabel = new Date(p.saleDate + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" });
          const salePeriod = p.saleTime.match(/AM|PM/)?.[0] ?? "";
          const saleTimeNum = p.saleTime.replace(/ (AM|PM)$/, "");
          const toggleRemind = () => setReminded((prev) => { const s = new Set(prev); s.has(p.artist) ? s.delete(p.artist) : s.add(p.artist); return s; });

          return (
            <div key={i} style={{
              background: "linear-gradient(165deg, #1a1410, #0c0a08)",
              border: "1px solid rgba(244,239,231,0.09)",
              borderRadius: 4, padding: "14px 16px", marginBottom: 10,
              boxShadow: "0 16px 36px -16px rgba(20,17,15,0.6)",
              display: "flex", flexDirection: "column", gap: 12,
            }}>

              {/* Row 1: Status pill + countdown */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  background: isLive ? A : E,
                  borderRadius: 2, padding: "5px 10px",
                }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#fff", animation: "pulse 1.5s ease-in-out infinite" }} />
                  <span style={{ fontFamily: M, fontSize: 9, fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: "0.12em" }}>
                    {isLive ? "On Sale" : "Presale"}
                  </span>
                </div>
                {!isLive && countdown && (
                  <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                    <span style={{ fontFamily: M, fontSize: 8, fontWeight: 600, color: F, textTransform: "uppercase", letterSpacing: "0.08em" }}>Opens In</span>
                    <span style={{ fontFamily: M, fontSize: 11, fontWeight: 700, color: A }}>{countdown}</span>
                  </div>
                )}
              </div>

              {/* Row 2: Thumbnail + artist info + match chip */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <div style={{
                  width: 58, height: 58, borderRadius: 4, flexShrink: 0,
                  overflow: "hidden", position: "relative",
                  boxShadow: "0 0 0 1px rgba(244,239,231,0.1)",
                  background: "repeating-linear-gradient(135deg, #2a221a 0 10px, #201913 10px 20px)",
                }}>
                  <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 30%, rgba(217,79,42,0.18), transparent 62%)" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 50%, rgba(193,127,74,0.1))" }} />
                  {p.img && <img src={p.img} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: D, fontSize: 20, fontWeight: 700, color: P, lineHeight: "22px", marginBottom: 4 }}>{p.artist}</div>
                  <div style={{ fontFamily: M, fontSize: 8.5, fontWeight: 500, color: F, textTransform: "uppercase", letterSpacing: "0.06em", lineHeight: "13px", marginBottom: 2 }}>
                    {p.venue} · {p.city}
                  </div>
                  <div style={{ fontFamily: M, fontSize: 8.5, fontWeight: 500, color: F, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    Show: {p.showDate}
                  </div>
                </div>
                <div style={{
                  fontFamily: M, fontSize: 9, fontWeight: 700, color: A,
                  background: "rgba(193,127,74,0.14)", border: "1px solid rgba(193,127,74,0.32)",
                  padding: "4px 8px", borderRadius: 2, flexShrink: 0,
                }}>♫ {p.match}%</div>
              </div>

              {/* Row 3: Presale moment block */}
              <div style={{
                background: "rgba(244,239,231,0.04)", border: "1px solid rgba(244,239,231,0.08)",
                borderRadius: 4, padding: "11px 14px",
                display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10,
              }}>
                <div>
                  <div style={{ fontFamily: M, fontSize: 7.5, fontWeight: 600, color: F, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 4 }}>
                    {isLive ? "Available" : "Presale Opens"}
                  </div>
                  {isLive ? (
                    <div style={{ fontFamily: D, fontSize: 17, fontWeight: 600, color: A }}>On Sale Now</div>
                  ) : (
                    <div style={{ fontFamily: D, fontSize: 17, fontWeight: 600, color: P }}>
                      {saleLabel}
                      <span style={{ color: "#5a554d" }}> · </span>
                      {saleTimeNum}
                      <span style={{ color: A, fontSize: 12, fontWeight: 600 }}> {salePeriod}</span>
                    </div>
                  )}
                </div>
                {isLive ? (
                  <a href={p.ticketUrl || "#"} style={{
                    display: "flex", alignItems: "center", gap: 6, flexShrink: 0,
                    background: A, color: "#0c0a08", borderRadius: 2,
                    padding: "9px 13px", textDecoration: "none",
                    fontFamily: M, fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em",
                    boxShadow: "0 0 16px rgba(193,127,74,0.4)",
                  }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 12V22H4V12"/><path d="M22 7H2v5h20V7z"/><path d="M12 22V7"/></svg>
                    Get Tickets
                  </a>
                ) : (
                  <button onClick={toggleRemind} style={{
                    display: "flex", alignItems: "center", gap: 6, flexShrink: 0,
                    background: hasReminder ? "transparent" : A,
                    color: hasReminder ? A : "#0c0a08",
                    border: hasReminder ? `1px solid ${A}` : "none",
                    borderRadius: 2, padding: "9px 13px", cursor: "pointer",
                    fontFamily: M, fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em",
                    boxShadow: hasReminder ? "none" : "0 0 16px rgba(193,127,74,0.4)",
                  }}>
                    {hasReminder ? (
                      <><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={A} strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg> Reminding</>
                    ) : (
                      <><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg> Remind Me</>
                    )}
                  </button>
                )}
              </div>

              {/* Row 4: Access code (presale only) */}
              {p.code && !isLive && (
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontFamily: M, fontSize: 8, fontWeight: 600, color: F, textTransform: "uppercase", letterSpacing: "0.1em" }}>Access Code</span>
                  <span style={{
                    fontFamily: M, fontSize: 10, fontWeight: 700, color: P, letterSpacing: "0.14em", textTransform: "uppercase",
                    background: "rgba(244,239,231,0.06)", border: "1px dashed rgba(244,239,231,0.2)",
                    borderRadius: 5, padding: "3px 10px",
                  }}>{p.code}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Waveform: 12 bars with staggered wav animation
const Waveform = () => (
  <div style={{ display: "flex", alignItems: "flex-end", gap: 2.5, height: 22 }}>
    {Array.from({ length: 12 }).map((_, i) => (
      <div key={i} style={{
        width: 3, height: "100%", borderRadius: 2,
        background: `rgba(193,127,74,${0.35 + (i % 3) * 0.15})`,
        transformOrigin: "bottom",
        animation: `wav 0.9s ease-in-out infinite`,
        animationDelay: `${i * 0.07}s`,
      }} />
    ))}
  </div>
);

const Home = ({ savedEvents = [], savedLoading = false, onOpenNotifs, session, wishlistIds = new Set(), toggleWishlist }) => {
  const [wishlisted, setWishlisted] = useState({});
  const [marqPaused, setMarqPaused] = useState(false);
  const [showPresales, setShowPresales] = useState(false);

  const email = session?.user?.email ?? "";
  const initial = email[0]?.toUpperCase() ?? "A";

  const heroShow = (() => {
    if (savedLoading) return null;
    const going = savedEvents
      .filter((e) => e.status === "going")
      .map((e) => ({ ...e, daysUntil: getDaysUntil(e.date) }))
      .filter((e) => e.daysUntil !== null)
      .sort((a, b) => a.daysUntil - b.daysUntil);
    return going[0] || null;
  })();

  const upcomingShows = (() => {
    if (savedLoading) return [];
    return savedEvents
      .filter((e) => e.status === "going")
      .map((e) => ({ ...e, daysUntil: getDaysUntil(e.date) }))
      .filter((e) => e.daysUntil !== null)
      .sort((a, b) => a.daysUntil - b.daysUntil)
      .slice(1, 5);
  })();

  return (
    <>
    {showPresales && <AllPresalesPage onClose={() => setShowPresales(false)} />}
    <Screen>
      {/* ── Header ───────────────────────────────────────────── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: E, animation: "pulse 1.4s ease-in-out infinite" }} />
          <span style={{ fontFamily: M, fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: F }}>
            Austin, TX
          </span>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <NotifBell onClick={onOpenNotifs} />
          <div style={{ width: 30, height: 30, borderRadius: 2, background: "rgba(193,127,74,0.18)", border: "1.5px solid rgba(193,127,74,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: D, fontSize: 13, fontWeight: 700, color: A }}>{initial}</span>
          </div>
        </div>
      </div>

      {/* ── Tonight headline ─────────────────────────────────── */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: D, fontSize: 48, fontWeight: 700, color: P, lineHeight: "48px", letterSpacing: "-0.02em" }}>
          Your Stage.
        </div>
        <div style={{ fontFamily: M, fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase", color: F, marginTop: 8 }}>
          {weeklyPicks.length + 4} shows within 25 miles · {TODAY_LABEL}
        </div>
      </div>

      {/* ── Hero Card ────────────────────────────────────────── */}
      <div style={{
        borderRadius: 4, overflow: "hidden", marginBottom: 26,
        animation: "breathe 5s ease-in-out infinite",
      }}>
        {/* Image area */}
        <div style={{
          width: "100%", height: 230, position: "relative",
          background: "repeating-linear-gradient(135deg, #2a221a, #2a221a 12px, #201913 12px, #201913 24px)",
        }}>
          {/* Hero photo — real event image or hardcoded fallback */}
          <img
            src={heroShow?.img || "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&q=80"}
            alt=""
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
          {/* Radial amber glow */}
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 70%, rgba(193,127,74,0.22) 0%, transparent 65%)" }} />
          {/* Bottom gradient */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 35%, rgba(12,10,8,0.96) 100%)" }} />

          {/* Tonight pill */}
          <div style={{ position: "absolute", top: 14, left: 14 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(217,79,42,0.88)", borderRadius: 2, padding: "5px 12px" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff", animation: "pulse 1.4s ease-in-out infinite" }} />
              <span style={{ fontFamily: M, fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#fff" }}>
                Tonight · {heroShow?.time || "8 PM"}
              </span>
            </div>
          </div>

          {/* Artist name + venue */}
          <div style={{ position: "absolute", bottom: 14, left: 18, right: 18 }}>
            <div style={{ fontFamily: D, fontSize: 32, fontWeight: 700, color: P, lineHeight: "36px", marginBottom: 5 }}>
              {heroShow ? heroShow.artist : "Khruangbin"}
            </div>
            <div style={{ fontFamily: M, fontSize: 9, letterSpacing: "0.08em", textTransform: "uppercase", color: F }}>
              {heroShow ? `${heroShow.venue} · ${heroShow.time}` : "Stubb's Outdoor · 9 PM"}
            </div>
          </div>
        </div>

        {/* Card footer */}
        <div style={{ background: "rgba(20,17,15,0.92)", padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button style={{
            background: A, color: "#14110F", border: "none",
            borderRadius: 2, padding: "10px 24px",
            fontFamily: M, fontSize: 10, fontWeight: 700,
            letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer",
          }}>
            Get Tickets
          </button>
          <div style={{ display: "flex", gap: 10 }}>
            <WishlistButton
              active={heroShow ? wishlistIds.has(heroShow.id) : false}
              onClick={() => heroShow && toggleWishlist({ ...heroShow, id: heroShow.event_id })}
            />
            <button style={{
              width: 32, height: 32, borderRadius: 2,
              border: "1px solid rgba(244,239,231,0.15)", background: "transparent",
              display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={F} strokeWidth="1.5">
                <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── On Your Radar ─────────────────────────────────────── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
        <div style={{ fontFamily: D, fontSize: 22, fontWeight: 700, color: P }}>On Your Radar</div>
        <span style={{ fontFamily: M, fontSize: 9, letterSpacing: "0.08em", textTransform: "uppercase", color: A, cursor: "pointer" }}>See All →</span>
      </div>
      <HScroll gap={12} style={{ marginBottom: 26 }}>
        {perfectMatches.map((m) => (
          <div key={m.id} style={{
            minWidth: 156, flexShrink: 0,
            background: "rgba(244,239,231,0.05)",
            border: "1px solid rgba(244,239,231,0.10)",
            borderRadius: 4, padding: "14px 14px 12px",
          }}>
            <div style={{ marginBottom: 8 }}>
              <span style={{
                background: "rgba(193,127,74,0.14)", border: "1px solid rgba(193,127,74,0.28)",
                borderRadius: 2, padding: "3px 8px",
                fontFamily: M, fontSize: 8, fontWeight: 700,
                letterSpacing: "0.06em", textTransform: "uppercase", color: A,
              }}>
                ♫ {m.match}%
              </span>
            </div>
            <div style={{ fontFamily: D, fontSize: 15, fontWeight: 700, color: P, marginBottom: 3, lineHeight: "20px" }}>
              {m.artist}
            </div>
            <div style={{ fontFamily: M, fontSize: 9, letterSpacing: "0.06em", textTransform: "uppercase", color: F, marginBottom: 6 }}>
              {m.venue}
            </div>
            <div style={{ fontFamily: M, fontSize: 10, color: A, fontWeight: 600 }}>
              {m.price}
            </div>
          </div>
        ))}
      </HScroll>

      {/* ── Upcoming shows (user's saved) ─────────────────────── */}
      {upcomingShows.length > 0 && (
        <>
          <HairlineRule label="Also on your calendar" style={{ marginBottom: 16 }} />
          <HScroll gap={12} style={{ marginBottom: 26 }}>
            {upcomingShows.map((show) => (
              <TicketStub
                key={show.event_id}
                artist={show.artist}
                venue={show.venue}
                date={show.date}
                time={show.time}
                price={show.price}
                status="going"
              />
            ))}
          </HScroll>
        </>
      )}

      {/* ── The Drop ─────────────────────────────────────────── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 13 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: E, animation: "pulse 1.4s ease-in-out infinite", flexShrink: 0 }} />
          <div style={{ fontFamily: D, fontSize: 19, fontWeight: 700, color: P }}>The Drop</div>
        </div>
        <span onClick={() => setShowPresales(true)} style={{ fontFamily: M, fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: A, cursor: "pointer" }}>
          ALL PRESALES →
        </span>
      </div>

      {/* Track viewport — edge-to-edge, edges faded with mask */}
      <div
        style={{
          overflow: "hidden",
          marginLeft: -22, marginRight: -22, marginBottom: 28,
          WebkitMaskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
          maskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
        }}
        onMouseEnter={() => setMarqPaused(true)}
        onMouseLeave={() => setMarqPaused(false)}
        onTouchStart={() => setMarqPaused(true)}
        onTouchEnd={() => setMarqPaused(false)}
      >
        {/* Track: data doubled so the -50% translateX loops invisibly */}
        <div style={{
          display: "flex", gap: 12, width: "max-content",
          padding: "4px 22px 4px",
          animation: `marq ${dropItems.length * 3.6}s linear infinite`,
          animationPlayState: marqPaused ? "paused" : "running",
        }}>
          {[...dropItems, ...dropItems].map((item, i) => (
            <div
              key={i}
              aria-hidden={i >= dropItems.length ? "true" : undefined}
              style={{
                flexShrink: 0,
                background: "rgba(244,239,231,0.05)",
                border: "1px solid rgba(244,239,231,0.10)",
                borderRadius: 4, padding: "11px 15px",
                display: "flex", alignItems: "center", gap: 11,
              }}
            >
              <span style={{ fontFamily: D, fontSize: 15, fontStyle: "italic", fontWeight: 600, color: P, whiteSpace: "nowrap" }}>
                {item.artist}
              </span>
              <span style={{
                borderLeft: "1px dashed rgba(244,239,231,0.25)", paddingLeft: 11,
                fontFamily: M, fontSize: 8.5, letterSpacing: "0.06em", textTransform: "uppercase",
                color: item.status === "presale" ? E : A,
                whiteSpace: "nowrap",
              }}>
                {item.status === "presale" ? "PRESALE" : "ON SALE"} · {item.date}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Friends Activity ─────────────────────────────────── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
        <div style={{ fontFamily: D, fontSize: 22, fontWeight: 700, color: P }}>Friends</div>
        <span style={{ fontFamily: M, fontSize: 9, letterSpacing: "0.08em", textTransform: "uppercase", color: A, cursor: "pointer" }}>All Activity →</span>
      </div>

      {friends.map((f, i) => (
        <div key={i} style={{
          padding: "12px 14px", marginBottom: 8,
          background: "rgba(244,239,231,0.04)",
          border: "1px solid rgba(244,239,231,0.08)",
          borderRadius: 4,
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8,
        }}>
          <div style={{ flex: 1 }}>
            <span style={{ fontFamily: M, fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: P }}>
              {f.name.toUpperCase()}
            </span>
            <span style={{ fontFamily: M, fontSize: 10, color: F, letterSpacing: "0.04em" }}>
              {" "}{f.action}{" "}
            </span>
            <span style={{ fontFamily: D, fontSize: 13, fontWeight: 600, color: A }}>
              {f.event}
            </span>
          </div>
          <span style={{ fontFamily: M, fontSize: 9, color: F, letterSpacing: "0.04em", flexShrink: 0 }}>
            {f.time}
          </span>
        </div>
      ))}
    </Screen>
    </>
  );
};

export default Home;
