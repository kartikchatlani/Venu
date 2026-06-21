import { useState } from "react";
import { Screen, HScroll, Chip, WishlistButton, GoingButton } from "../components/index.jsx";
import { Kicker, MonoMeta } from "../components/marks/index.jsx";
import { VenuMap } from "../components/VenuMap.jsx";
import { genres, promotedEvent, festivals, mapVenues } from "../data/index.jsx";
import { useAustinEvents } from "../hooks/useAustinEvents.js";

const P = "#F4EFE7";
const A = "#C17F4A";
const E = "#D94F2A";
const F = "#8A8278";
const D = "'Fraunces', Georgia, serif";
const M = "'JetBrains Mono', monospace";
const glass = "rgba(244,239,231,0.05)";
const glassBorder = "rgba(244,239,231,0.10)";

const PlaceholderImg = ({ height = 130 }) => (
  <div style={{
    width: "100%", height,
    background: "repeating-linear-gradient(135deg, #2a221a, #2a221a 10px, #201913 10px, #201913 20px)",
    position: "relative", flexShrink: 0,
  }}>
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, rgba(12,10,8,0.9))" }} />
  </div>
);

const Explore = ({ wishlistIds, goingIds, toggleWishlist, toggleGoing, onSelectEvent }) => {
  const [activeGenre, setActiveGenre] = useState("All");
  const [viewMode, setViewMode] = useState("discover");
  const [focusVenueIdx, setFocusVenueIdx] = useState(null);
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
      {/* ── Masthead ─────────────────────────────────────────── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
        <div>
          <div style={{ fontFamily: D, fontSize: 38, fontWeight: 700, color: P, lineHeight: "38px", letterSpacing: "-0.02em" }}>
            Explore
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 4 }}>
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={A} strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span style={{ fontFamily: M, fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase", color: A, cursor: "pointer" }}>
              Austin, TX · Change City
            </span>
          </div>
        </div>
      </div>

      {/* ── Glass search bar ─────────────────────────────────── */}
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        background: glass, border: `1px solid ${glassBorder}`,
        borderRadius: 30, padding: "10px 16px", marginBottom: 16,
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={F} strokeWidth="1.5">
          <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
        </svg>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search artists or venues…"
          style={{
            flex: 1, background: "transparent", border: "none",
            fontFamily: M, fontSize: 12, letterSpacing: "0.04em",
            color: P, outline: "none",
          }}
        />
      </div>

      {/* ── Genre chips ──────────────────────────────────────── */}
      <HScroll gap={6} style={{ marginBottom: 18 }}>
        {genres.map(g => <Chip key={g} label={g} active={activeGenre === g} onClick={() => setActiveGenre(g)} />)}
      </HScroll>

      {/* ── View toggle ──────────────────────────────────────── */}
      <div style={{ display: "flex", gap: 4, marginBottom: 24, background: glass, border: `1px solid ${glassBorder}`, borderRadius: 30, padding: "4px" }}>
        {[["discover", "Discover"], ["map", "Map"]].map(([mode, label]) => (
          <button key={mode} onClick={() => setViewMode(mode)} style={{
            flex: 1, padding: "7px 0", border: "none", cursor: "pointer",
            fontFamily: M, fontSize: 10, fontWeight: 700, letterSpacing: "0.08em",
            textTransform: "uppercase", borderRadius: 26,
            background: viewMode === mode ? A : "transparent",
            color: viewMode === mode ? "#14110F" : F,
            transition: "all 0.2s ease",
          }}>
            {label}
          </button>
        ))}
      </div>

      {viewMode === "discover" ? (
        <>
          {/* ── Promoted card ─────────────────────────────────── */}
          <div style={{ borderRadius: 18, overflow: "hidden", marginBottom: 4, position: "relative" }}>
            <PlaceholderImg height={150} />
            <div style={{ position: "absolute", top: 12, left: 14 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "rgba(193,127,74,0.9)", borderRadius: 20, padding: "4px 10px" }}>
                <span style={{ fontFamily: M, fontSize: 8, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#14110F" }}>
                  Promoted · {promotedEvent.date}
                </span>
              </div>
            </div>
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              padding: "18px 16px 16px",
            }}>
              <div style={{ fontFamily: D, fontSize: 22, fontWeight: 700, color: P, lineHeight: "26px", marginBottom: 6 }}>
                {promotedEvent.event}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: M, fontSize: 9, letterSpacing: "0.06em", textTransform: "uppercase", color: F }}>
                  {promotedEvent.venue} · {promotedEvent.time}
                </span>
                <span style={{ fontFamily: M, fontSize: 11, color: A, fontWeight: 700 }}>{promotedEvent.price}</span>
              </div>
            </div>
          </div>
          <div style={{ fontFamily: M, fontSize: 8, letterSpacing: "0.06em", textTransform: "uppercase", color: F, textAlign: "right", marginBottom: 22 }}>
            Sponsored
          </div>

          {/* ── Tonight ──────────────────────────────────────── */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
            <div style={{ fontFamily: D, fontSize: 22, fontWeight: 700, color: P }}>Tonight in Austin</div>
            <span style={{ fontFamily: M, fontSize: 9, letterSpacing: "0.08em", textTransform: "uppercase", color: A, cursor: "pointer" }}>See All →</span>
          </div>

          {loading ? (
            <div style={{ fontFamily: M, fontSize: 10, color: F, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 16 }}>
              Loading shows…
            </div>
          ) : error ? (
            <div style={{ fontFamily: M, fontSize: 10, color: E, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 16 }}>{error}</div>
          ) : filteredTonight.length === 0 ? (
            <div style={{ fontFamily: M, fontSize: 10, color: F, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 16 }}>
              No shows tonight matching that genre.
            </div>
          ) : filteredTonight.map((s, i) => (
            <div key={s.id} onClick={() => onSelectEvent(s)} style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "12px 14px", marginBottom: 8,
              background: glass, border: `1px solid ${glassBorder}`,
              borderRadius: 16, cursor: "pointer",
            }}>
              <div style={{
                width: 52, height: 52, borderRadius: 12, flexShrink: 0, overflow: "hidden", position: "relative",
                background: "repeating-linear-gradient(135deg, #2a221a, #2a221a 6px, #201913 6px, #201913 12px)",
              }}>
                {s.img && <img src={s.img} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: D, fontSize: 16, fontWeight: 700, color: P, lineHeight: "20px", marginBottom: 2 }}>
                  {s.artist}
                </div>
                <div style={{ fontFamily: M, fontSize: 9, letterSpacing: "0.06em", textTransform: "uppercase", color: F }}>
                  {s.venue} · {s.time}
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, flexShrink: 0 }}>
                <span style={{ fontFamily: M, fontSize: 11, color: A, fontWeight: 700 }}>{s.price || ""}</span>
                <div style={{ display: "flex", gap: 6 }}>
                  <GoingButton
                    active={goingIds.has(s.id)}
                    onClick={(e) => { e.stopPropagation(); toggleGoing(s); }}
                  />
                  <WishlistButton
                    active={wishlistIds.has(s.id)}
                    onClick={(e) => { e.stopPropagation(); toggleWishlist(s); }}
                  />
                </div>
              </div>
            </div>
          ))}

          <div style={{ height: 1, background: glassBorder, margin: "22px 0" }} />

          {/* ── This Weekend ─────────────────────────────────── */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
            <div style={{ fontFamily: D, fontSize: 22, fontWeight: 700, color: P }}>This Weekend</div>
            <span style={{ fontFamily: M, fontSize: 9, letterSpacing: "0.08em", textTransform: "uppercase", color: A, cursor: "pointer" }}>All Events →</span>
          </div>

          {loading ? (
            <div style={{ fontFamily: M, fontSize: 10, color: F, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 16 }}>Loading shows…</div>
          ) : filteredWeekend.length === 0 ? (
            <div style={{ fontFamily: M, fontSize: 10, color: F, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 16 }}>No weekend shows found.</div>
          ) : (
            <>
              {filteredWeekend[0] && (
                <div onClick={() => onSelectEvent(filteredWeekend[0])} style={{
                  background: glass, border: `1px solid ${glassBorder}`,
                  borderRadius: 18, overflow: "hidden", marginBottom: 12, cursor: "pointer",
                }}>
                  <div style={{ position: "relative", height: 120, background: "repeating-linear-gradient(135deg, #2a221a, #2a221a 10px, #201913 10px, #201913 20px)", overflow: "hidden" }}>
                    {filteredWeekend[0].img && (
                      <img src={filteredWeekend[0].img} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }} />
                    )}
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 30%, rgba(12,10,8,0.85))" }} />
                  </div>
                  <div style={{ padding: "12px 14px 14px" }}>
                    <div style={{ fontFamily: M, fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: A, marginBottom: 4 }}>
                      {filteredWeekend[0].date}
                    </div>
                    <div style={{ fontFamily: D, fontSize: 20, fontWeight: 700, color: P, marginBottom: 6 }}>
                      {filteredWeekend[0].artist}
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontFamily: M, fontSize: 9, letterSpacing: "0.06em", textTransform: "uppercase", color: F }}>
                        {filteredWeekend[0].venue}
                      </span>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontFamily: M, fontSize: 11, color: A, fontWeight: 700 }}>
                          {filteredWeekend[0].price || ""}
                        </span>
                        <GoingButton
                          active={goingIds.has(filteredWeekend[0].id)}
                          onClick={(e) => { e.stopPropagation(); toggleGoing(filteredWeekend[0]); }}
                        />
                        <WishlistButton
                          active={wishlistIds.has(filteredWeekend[0].id)}
                          onClick={(e) => { e.stopPropagation(); toggleWishlist(filteredWeekend[0]); }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {filteredWeekend.length > 1 && (
                <HScroll gap={12} style={{ marginBottom: 4 }}>
                  {filteredWeekend.slice(1).map((w) => (
                    <div key={w.id} onClick={() => onSelectEvent(w)} style={{
                      minWidth: 190, background: glass, border: `1px solid ${glassBorder}`,
                      borderRadius: 16, overflow: "hidden", flexShrink: 0, cursor: "pointer",
                    }}>
                      <div style={{ height: 90, background: "repeating-linear-gradient(135deg, #2a221a, #2a221a 8px, #201913 8px, #201913 16px)", position: "relative", overflow: "hidden" }}>
                        {w.img && <img src={w.img} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }} />}
                        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 30%, rgba(12,10,8,0.8))" }} />
                      </div>
                      <div style={{ padding: "10px 12px 12px" }}>
                        <div style={{ fontFamily: M, fontSize: 8, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: A, marginBottom: 3 }}>{w.date}</div>
                        <div style={{ fontFamily: D, fontSize: 15, fontWeight: 700, color: P, marginBottom: 4 }}>{w.artist}</div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontFamily: M, fontSize: 8, color: F, textTransform: "uppercase", letterSpacing: "0.06em" }}>{w.genre}</span>
                          <span style={{ fontFamily: M, fontSize: 10, color: A, fontWeight: 700 }}>{w.price || ""}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </HScroll>
              )}
            </>
          )}

          <div style={{ height: 1, background: glassBorder, margin: "22px 0" }} />

          {/* ── Festivals ────────────────────────────────────── */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
            <div style={{ fontFamily: D, fontSize: 22, fontWeight: 700, color: P }}>Festivals For You</div>
            <span style={{ fontFamily: M, fontSize: 9, letterSpacing: "0.08em", textTransform: "uppercase", color: A, cursor: "pointer" }}>Browse All →</span>
          </div>
          <div style={{ fontFamily: M, fontSize: 9, letterSpacing: "0.06em", textTransform: "uppercase", color: F, marginBottom: 18 }}>
            Based on artists you follow
          </div>

          {festivals.map((f, i) => (
            <div key={i} style={{
              background: glass, border: `1px solid ${glassBorder}`,
              borderRadius: 18, overflow: "hidden", marginBottom: 12,
            }}>
              <div style={{ position: "relative", height: 90, background: "repeating-linear-gradient(135deg, #2a221a, #2a221a 8px, #201913 8px, #201913 16px)" }}>
                {f.img && (
                  <img src={f.img} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.7 }} />
                )}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(20,17,15,0.88), rgba(20,17,15,0.2) 60%)" }} />
                <div style={{ position: "absolute", top: 12, left: 14 }}>
                  <div style={{ fontFamily: M, fontSize: 9, color: A, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 2 }}>{f.city}</div>
                  <div style={{ fontFamily: D, fontSize: 20, fontWeight: 700, color: P }}>{f.name}</div>
                </div>
                <div style={{ position: "absolute", top: 12, right: 12 }}>
                  <span style={{
                    fontFamily: M, fontSize: 9, fontWeight: 700, color: A,
                    background: "rgba(193,127,74,0.15)", border: "1px solid rgba(193,127,74,0.3)",
                    padding: "3px 8px", borderRadius: 20, letterSpacing: "0.06em",
                  }}>
                    ♫ {f.match}%
                  </span>
                </div>
              </div>
              <div style={{ padding: "12px 16px 14px" }}>
                <div style={{ fontFamily: M, fontSize: 9, color: F, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>{f.dates}</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {f.matchArtists.map((a, j) => (
                    <span key={j} style={{
                      fontFamily: M, fontSize: 8, fontWeight: 600, letterSpacing: "0.06em",
                      textTransform: "uppercase", color: F,
                      border: `1px solid ${glassBorder}`,
                      padding: "3px 8px", borderRadius: 20,
                    }}>{a}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        /* ── Map View ──────────────────────────────────────── */
        <>
          <VenuMap
            venues={mapVenues}
            tonightShows={tonightShows}
            wishlistIds={wishlistIds}
            onToggleWishlist={toggleWishlist}
            focusVenueIdx={focusVenueIdx}
          />

          <div style={{ height: 1, background: glassBorder, margin: "18px 0 14px" }} />
          <div style={{ fontFamily: M, fontSize: 9, color: F, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>
            Tap a venue to navigate the map
          </div>

          {mapVenues.map((v, i) => (
            <div key={i} onClick={() => setFocusVenueIdx(i)} style={{
              display: "flex", alignItems: "center", gap: 12, padding: "10px 0",
              borderBottom: i < mapVenues.length - 1 ? `1px solid ${glassBorder}` : "none",
              cursor: "pointer",
            }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: glass, border: `1px solid ${glassBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, flexShrink: 0 }}>
                {v.type === "festival" ? "🎪" : "🎸"}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: D, fontSize: 15, fontWeight: 700, color: P, marginBottom: 1 }}>{v.name}</div>
                <div style={{ fontFamily: M, fontSize: 9, color: F, textTransform: "uppercase", letterSpacing: "0.06em" }}>{v.address} · Cap. {v.capacity}</div>
              </div>
              {(() => {
                const show = tonightShows.find((s) => {
                  const vn = v.name.toLowerCase();
                  const sv = (s.venue || "").toLowerCase();
                  return sv.includes(vn) || vn.includes(sv);
                });
                return show ? (
                  <span style={{
                    fontFamily: M, fontSize: 8, fontWeight: 700, letterSpacing: "0.08em",
                    textTransform: "uppercase", color: A,
                    border: `1px solid rgba(193,127,74,0.4)`,
                    padding: "3px 8px", borderRadius: 20, flexShrink: 0,
                  }}>
                    Tonight
                  </span>
                ) : null;
              })()}
            </div>
          ))}
        </>
      )}
    </Screen>
  );
};

export default Explore;
