import { useState } from "react";
import { colors, fonts } from "../theme.jsx";
import { Screen, SectionHeader, Divider, HScroll, Chip, TagPill, WishlistButton } from "../components/index.jsx";
import { genres, promotedEvent, festivals, mapVenues } from "../data/index.jsx";
import { useAustinEvents } from "../hooks/useAustinEvents.js";

const EventImage = ({ src, width, height, style = {} }) => {
  if (!src) return <div style={{ width, height, background: `linear-gradient(135deg, ${colors.warmGray}, ${colors.border})`, flexShrink: 0, ...style }} />;
  return <img src={src} alt="" style={{ width, height, objectFit: "cover", flexShrink: 0, ...style }} />;
};

const Explore = ({ wishlistIds, toggleWishlist, onSelectEvent }) => {
  const [activeGenre, setActiveGenre] = useState("All");
  const [viewMode, setViewMode] = useState("discover");
  const [selectedPin, setSelectedPin] = useState(null);
  const [search, setSearch] = useState("");
  const { tonightShows, weekendShows, loading, error } = useAustinEvents();

  const matchesSearch = (s) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return s.artist?.toLowerCase().includes(q) || s.venue?.toLowerCase().includes(q);
  };

  const filteredTonight = tonightShows
    .filter((s) => activeGenre === "All" || s.genre?.toLowerCase().includes(activeGenre.toLowerCase()))
    .filter(matchesSearch);

  const filteredWeekend = weekendShows
    .filter((s) => activeGenre === "All" || s.genre?.toLowerCase().includes(activeGenre.toLowerCase()))
    .filter(matchesSearch);

  return (
    <Screen>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
        <h1 style={{ fontFamily: fonts.display, fontSize: 28, fontWeight: 800, color: colors.ink, fontStyle: "italic", lineHeight: 1 }}>Explore</h1>
        <div style={{ display: "flex", alignItems: "center", gap: 6, background: colors.warmGray, padding: "5px 12px", borderRadius: 20, border: `1px solid ${colors.border}` }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={colors.amber} strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
          <span style={{ fontSize: 12, fontWeight: 600, color: colors.ink }}>Austin, TX</span>
        </div>
      </div>
      <p style={{ fontSize: 13, color: colors.brownMid, marginBottom: 18 }}>Find your next unforgettable night.</p>

      {/* Search */}
      <div style={{ position: "relative", marginBottom: 14 }}>
        <svg style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.faded} strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search artists, venues, festivals..." style={{ width: "100%", padding: "12px 16px 12px 40px", background: colors.white, border: `1.5px solid ${colors.border}`, borderRadius: 14, fontFamily: fonts.body, fontSize: 14, color: colors.ink, outline: "none" }} />
      </div>

      {/* Genre Chips */}
      <HScroll gap={8} style={{ marginBottom: 20 }}>
        {genres.map(g => <Chip key={g} label={g} active={activeGenre === g} onClick={() => setActiveGenre(g)} />)}
      </HScroll>

      {/* View Toggle */}
      <div style={{ display: "flex", background: colors.warmGray, borderRadius: 10, padding: 3, marginBottom: 20 }}>
        {["discover", "map"].map(mode => (
          <button key={mode} onClick={() => { setViewMode(mode); setSelectedPin(null); }} style={{
            flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            padding: 8, border: "none", background: viewMode === mode ? colors.white : "transparent",
            color: viewMode === mode ? colors.ink : colors.brownMid, fontFamily: fonts.body, fontSize: 12,
            fontWeight: 600, borderRadius: 8, cursor: "pointer", boxShadow: viewMode === mode ? "0 1px 4px rgba(28,25,21,0.08)" : "none",
          }}>
            {mode === "discover" ? "Discover" : "Map"}
          </button>
        ))}
      </div>

      {viewMode === "discover" ? (
        <>
          {/* Promoted */}
          <div style={{ borderRadius: 16, overflow: "hidden", background: colors.white, boxShadow: "0 2px 12px rgba(28,25,21,0.06)", border: "1px solid rgba(28,25,21,0.04)", marginBottom: 6, position: "relative" }}>
            <img src={promotedEvent.img} alt="" style={{ width: "100%", height: 150, objectFit: "cover", display: "block" }} />
            <span style={{ position: "absolute", top: 12, left: 12, fontFamily: fonts.mono, fontSize: 8, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", color: colors.cream, background: "rgba(28,25,21,0.7)", backdropFilter: "blur(8px)", padding: "4px 10px", borderRadius: 20 }}>Promoted</span>
            <div style={{ padding: 16 }}>
              <p style={{ fontFamily: fonts.mono, fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", color: colors.amber, marginBottom: 6 }}>{promotedEvent.venue}</p>
              <p style={{ fontFamily: fonts.display, fontSize: 20, fontWeight: 700, fontStyle: "italic", color: colors.ink, marginBottom: 4 }}>{promotedEvent.event}</p>
              <p style={{ fontSize: 12, color: colors.brownMid, marginBottom: 12 }}>{promotedEvent.date} · {promotedEvent.time}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: colors.ink }}>{promotedEvent.price}</span>
                <button style={{ background: colors.ink, color: colors.gold, border: "none", fontFamily: fonts.body, fontSize: 12, fontWeight: 600, padding: "8px 18px", borderRadius: 10, cursor: "pointer" }}>Get Tickets →</button>
              </div>
            </div>
          </div>
          <p style={{ fontFamily: fonts.mono, fontSize: 8, color: colors.faded, letterSpacing: 1, textAlign: "right", marginBottom: 4 }}>SPONSORED</p>

          <Divider />

          {/* Tonight */}
          <SectionHeader title="Tonight in Austin" link="See All" />
          {loading ? (
            <p style={{ fontSize: 12, color: colors.faded, fontStyle: "italic", marginBottom: 14 }}>Loading shows...</p>
          ) : error ? (
            <p style={{ fontSize: 12, color: colors.terracotta, marginBottom: 14 }}>{error}</p>
          ) : filteredTonight.length === 0 ? (
            <p style={{ fontSize: 12, color: colors.faded, fontStyle: "italic", marginBottom: 14 }}>No shows tonight matching that genre.</p>
          ) : filteredTonight.map((s) => (
            <div key={s.id} onClick={() => onSelectEvent(s)} style={{ display: "flex", gap: 14, alignItems: "center", padding: "12px 14px", background: colors.white, borderRadius: 14, marginBottom: 10, boxShadow: "0 1px 4px rgba(28,25,21,0.04)", border: "1px solid rgba(28,25,21,0.04)", cursor: "pointer" }}>
              <EventImage src={s.img} width={52} height={52} style={{ borderRadius: 12 }} />
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: colors.ink, marginBottom: 2 }}>{s.artist}</p>
                <p style={{ fontSize: 11, color: colors.brownMid, marginBottom: 4 }}>{s.venue} · {s.time}</p>
                <TagPill>{s.genre}</TagPill>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, flexShrink: 0 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: colors.ink }}>{s.price || "TBA"}</span>
                <WishlistButton active={wishlistIds.has(s.id)} onClick={(e) => { e.stopPropagation(); toggleWishlist(s); }} />
              </div>
            </div>
          ))}

          <Divider />

          {/* Weekend */}
          <SectionHeader title="This Weekend" link="All Events" />
          {loading ? (
            <p style={{ fontSize: 12, color: colors.faded, fontStyle: "italic", marginBottom: 14 }}>Loading shows...</p>
          ) : filteredWeekend.length === 0 ? (
            <p style={{ fontSize: 12, color: colors.faded, fontStyle: "italic", marginBottom: 14 }}>No weekend shows found.</p>
          ) : (
            <HScroll gap={14}>
              {filteredWeekend.map((w) => (
                <div key={w.id} onClick={() => onSelectEvent(w)} style={{ minWidth: 240, background: colors.white, borderRadius: 16, overflow: "hidden", flexShrink: 0, boxShadow: "0 2px 8px rgba(28,25,21,0.06)", border: "1px solid rgba(28,25,21,0.04)", cursor: "pointer" }}>
                  <EventImage src={w.img} width={240} height={120} style={{ display: "block" }} />
                  <div style={{ padding: 14 }}>
                    <p style={{ fontSize: 14, fontWeight: 700, color: colors.ink, marginBottom: 3 }}>{w.artist}</p>
                    <p style={{ fontSize: 11, color: colors.brownMid, marginBottom: 8 }}>{w.venue} · {w.date}</p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <TagPill>{w.genre}</TagPill>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: colors.ink }}>{w.price || "TBA"}</span>
                        <WishlistButton active={wishlistIds.has(w.id)} onClick={(e) => { e.stopPropagation(); toggleWishlist(w); }} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </HScroll>
          )}

          <Divider />

          {/* Festivals */}
          <SectionHeader title="Festivals For You" link="Browse All" />
          <p style={{ fontSize: 12, color: colors.brownMid, fontStyle: "italic", marginBottom: 14 }}>Based on artists you listen to · Beyond Austin</p>
          {festivals.map((f, i) => (
            <div key={i} style={{ background: colors.ink, borderRadius: 16, overflow: "hidden", marginBottom: 14, position: "relative" }}>
              <img src={f.img} alt="" style={{ width: "100%", height: 100, objectFit: "cover", display: "block", opacity: 0.5 }} />
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 100, background: "linear-gradient(to bottom, transparent 0%, rgba(28,25,21,0.85) 100%)" }} />
              <span style={{ position: "absolute", top: 10, right: 12, background: "rgba(242,204,143,0.2)", color: colors.gold, fontFamily: fonts.mono, fontSize: 10, fontWeight: 600, padding: "3px 10px", borderRadius: 20 }}>♫ {f.match}% match</span>
              <div style={{ padding: "14px 16px 16px" }}>
                <p style={{ fontFamily: fonts.mono, fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", color: colors.amber, marginBottom: 4 }}>{f.city}</p>
                <p style={{ fontFamily: fonts.display, fontSize: 20, fontWeight: 700, fontStyle: "italic", color: colors.cream, marginBottom: 4 }}>{f.name}</p>
                <p style={{ fontSize: 11, color: "#999", marginBottom: 10 }}>{f.dates}</p>
                <p style={{ fontFamily: fonts.mono, fontSize: 8, letterSpacing: 1.5, textTransform: "uppercase", color: colors.brownMid, marginBottom: 6 }}>Artists You Follow</p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {f.matchArtists.map((a, j) => (
                    <span key={j} style={{ background: "rgba(242,204,143,0.1)", color: colors.gold, fontSize: 11, fontWeight: 500, padding: "4px 10px", borderRadius: 20 }}>{a}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        /* Map View */
        <div onClick={() => setSelectedPin(null)} style={{ background: colors.warmGray, borderRadius: 16, overflow: "hidden", position: "relative", height: 420, marginBottom: 16, border: `1px solid ${colors.border}` }}>
          <div style={{ width: "100%", height: "100%", position: "relative", background: `radial-gradient(ellipse at 45% 45%, rgba(193,127,74,0.06) 0%, transparent 60%), linear-gradient(135deg, ${colors.warmGray} 0%, ${colors.border} 100%)` }}>
            {[20,35,45,58,72,85].map((t,i) => <div key={`h${i}`} style={{ position:"absolute", top:`${t}%`, left: i%2===0 ? "5%" : "10%", width: i%2===0 ? "90%" : "80%", height: 1.5, background: `rgba(28,25,21,${i%2===1 ? 0.1 : 0.06})` }} />)}
            {[20,35,48,60,75,88].map((l,i) => <div key={`v${i}`} style={{ position:"absolute", left:`${l}%`, top: "10%", width: 1.5, height: "80%", background: `rgba(28,25,21,${i%2===1 ? 0.1 : 0.06})` }} />)}
            <div style={{ position: "absolute", bottom: "8%", left: "10%", width: "80%", height: "14%", background: "rgba(129,178,154,0.15)", borderRadius: "40% 60% 50% 50%", filter: "blur(4px)" }} />
            {[{t:"28%",l:"48%",n:"Red River"},{t:"48%",l:"55%",n:"Downtown"},{t:"62%",l:"38%",n:"S. Congress"},{t:"18%",l:"35%",n:"UT Campus"},{t:"72%",l:"22%",n:"Zilker"}].map((a,i) => (
              <span key={i} style={{ position:"absolute", top:a.t, left:a.l, fontFamily:fonts.mono, fontSize:7, letterSpacing:2, textTransform:"uppercase", color:"rgba(28,25,21,0.2)", pointerEvents:"none" }}>{a.n}</span>
            ))}
            {mapVenues.map((v, i) => (
              <div key={i} style={{ position: "absolute", left: `${v.x}%`, top: `${v.y}%`, transform: "translate(-50%, -100%)", cursor: "pointer", zIndex: 10 }}
                onClick={(e) => { e.stopPropagation(); setSelectedPin(selectedPin === i ? null : i); }}>
                <div style={{ width: 14, height: 14, borderRadius: "50%", border: "2px solid #fff", boxShadow: "0 2px 6px rgba(28,25,21,0.2)", background: v.type === "festival" ? colors.terracotta : colors.amber }} />
              </div>
            ))}
            {selectedPin !== null && (
              <div onClick={e => e.stopPropagation()} style={{ position: "absolute", left: `${mapVenues[selectedPin].x}%`, top: `${mapVenues[selectedPin].y - 2}%`, transform: "translate(-50%, -100%)", background: colors.white, borderRadius: 12, padding: "10px 14px", boxShadow: "0 4px 16px rgba(28,25,21,0.12)", border: `1px solid ${colors.border}`, zIndex: 20, minWidth: 160, marginTop: -12 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: colors.ink, marginBottom: 2 }}>{mapVenues[selectedPin].name}</p>
                <p style={{ fontSize: 10, color: colors.brownMid }}>{mapVenues[selectedPin].type === "festival" ? "Festival Grounds" : "Live Music Venue"}</p>
                {mapVenues[selectedPin].tonight && <p style={{ fontFamily: fonts.mono, fontSize: 8, letterSpacing: 1, textTransform: "uppercase", color: colors.amber, marginTop: 4 }}>● Show tonight</p>}
              </div>
            )}
            <div style={{ position: "absolute", top: 12, left: 12, display: "flex", alignItems: "center", gap: 6, background: "rgba(250,246,241,0.92)", backdropFilter: "blur(8px)", padding: "7px 14px", borderRadius: 20, border: `1px solid ${colors.border}`, fontSize: 12, fontWeight: 600, color: colors.ink }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: colors.sage }} />Austin, TX
            </div>
            <div style={{ position: "absolute", bottom: 12, left: 12, display: "flex", gap: 12, background: "rgba(250,246,241,0.9)", backdropFilter: "blur(8px)", padding: "8px 14px", borderRadius: 10, border: `1px solid ${colors.border}` }}>
              {[{c: colors.amber, n:"Venue"},{c: colors.terracotta, n:"Festival"}].map((l,i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 5, fontFamily: fonts.mono, fontSize: 8, letterSpacing: 1, textTransform: "uppercase", color: colors.brownMid }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: l.c }} />{l.n}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Screen>
  );
};

export default Explore;
