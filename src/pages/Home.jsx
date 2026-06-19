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

const dropItems = [
  { artist: "Tyler, the Creator", date: "Jun 14", status: "presale" },
  { artist: "Billie Eilish",       date: "Oct 18", status: "onsale" },
  { artist: "Floating Points",     date: "Apr 25", status: "onsale" },
  { artist: "Mdou Moctar",         date: "Apr 1",  status: "presale" },
  { artist: "Ethel Cain",          date: "May 9",  status: "presale" },
  { artist: "Caroline Polachek",   date: "Jun 3",  status: "onsale" },
];

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

const Home = ({ savedEvents = [], savedLoading = false, onOpenNotifs, session }) => {
  const [wishlisted, setWishlisted] = useState({});
  const [marqPaused, setMarqPaused] = useState(false);

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
          <div style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(193,127,74,0.18)", border: "1.5px solid rgba(193,127,74,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: D, fontSize: 13, fontWeight: 700, color: A }}>{initial}</span>
          </div>
        </div>
      </div>

      {/* ── Tonight headline ─────────────────────────────────── */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: D, fontSize: 48, fontWeight: 700, color: P, lineHeight: "48px", letterSpacing: "-0.02em" }}>
          Tonight.
        </div>
        <div style={{ fontFamily: M, fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase", color: F, marginTop: 8 }}>
          {weeklyPicks.length + 4} shows within 25 miles · {TODAY_LABEL}
        </div>
      </div>

      {/* ── Hero Card ────────────────────────────────────────── */}
      <div style={{
        borderRadius: 22, overflow: "hidden", marginBottom: 26,
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
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(217,79,42,0.88)", borderRadius: 30, padding: "5px 12px" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff", animation: "pulse 1.4s ease-in-out infinite" }} />
              <span style={{ fontFamily: M, fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#fff" }}>
                Tonight · Doors 8PM
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
            borderRadius: 30, padding: "10px 24px",
            fontFamily: M, fontSize: 10, fontWeight: 700,
            letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer",
          }}>
            Get Tickets
          </button>
          <div style={{ display: "flex", gap: 10 }}>
            <WishlistButton
              active={wishlisted.hero}
              onClick={() => setWishlisted(p => ({ ...p, hero: !p.hero }))}
            />
            <button style={{
              width: 32, height: 32, borderRadius: "50%",
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
            borderRadius: 18, padding: "14px 14px 12px",
          }}>
            <div style={{ marginBottom: 8 }}>
              <span style={{
                background: "rgba(193,127,74,0.14)", border: "1px solid rgba(193,127,74,0.28)",
                borderRadius: 20, padding: "3px 8px",
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
        <span style={{ fontFamily: M, fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: A, cursor: "pointer" }}>
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
          borderRadius: 14,
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
  );
};

export default Home;
