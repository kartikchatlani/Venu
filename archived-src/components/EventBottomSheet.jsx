import React from "react";

const P = "#F4EFE7";
const A = "#C17F4A";
const E = "#D94F2A";
const F = "#8A8278";
const D = "'Fraunces', Georgia, serif";
const M = "'JetBrains Mono', monospace";
const glass = "rgba(244,239,231,0.05)";
const glassBorder = "rgba(244,239,231,0.10)";

const parseEventDate = (dateStr) => {
  if (!dateStr) return null;
  const d = new Date(dateStr + "T12:00:00");
  return {
    month: d.toLocaleString("en-US", { month: "short" }),
    day: d.getDate(),
  };
};

const GlassBtn = ({ onClick, children }) => (
  <button onClick={onClick} style={{
    width: 38, height: 38, borderRadius: "50%",
    background: "rgba(20,17,15,0.4)",
    backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)",
    border: "1px solid rgba(244,239,231,0.18)",
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer",
  }}>
    {children}
  </button>
);

const ActThumb = ({ img, size = 42 }) => (
  <div style={{
    width: size, height: size, borderRadius: 4, flexShrink: 0, overflow: "hidden",
    background: "repeating-linear-gradient(135deg, #2a221a, #2a221a 8px, #201913 8px, #201913 16px)",
  }}>
    {img && <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
  </div>
);

export const EventBottomSheet = ({ event, onClose, wishlistIds, goingIds, toggleWishlist, toggleGoing }) => {
  const isVisible = !!event;
  const isWishlisted = event ? wishlistIds.has(event.id) : false;
  const isGoing = event ? goingIds.has(event.id) : false;
  const parsed = event ? parseEventDate(event.date) : null;


  return (
    <>
      {/* Dim overlay */}
      <div
        onClick={onClose}
        style={{
          position: "absolute", inset: 0,
          background: "rgba(0,0,0,0.72)",
          opacity: isVisible ? 1 : 0,
          pointerEvents: isVisible ? "auto" : "none",
          transition: "opacity 0.3s ease",
          zIndex: 200,
        }}
      />

      {/* Sheet */}
      <div style={{
        position: "absolute", left: 0, right: 0, bottom: 0,
        height: "95%",
        background: "#17120e",
        borderRadius: "28px 28px 0 0",
        transform: isVisible ? "translateY(0)" : "translateY(100%)",
        transition: "transform 0.38s cubic-bezier(0.32,0.72,0,1)",
        zIndex: 201,
        display: "flex", flexDirection: "column",
        overflow: "hidden",
      }}>
        {event && (
          <>
            {/* ── Scrollable zone ──────────────── */}
            <div style={{ flex: 1, overflowY: "auto", scrollbarWidth: "none" }}>

              {/* Image header */}
              <div style={{ position: "relative", height: 360 }}>
                {/* Stripe fallback — always behind the real image */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "repeating-linear-gradient(135deg, #2a221a, #2a221a 12px, #201913 12px, #201913 24px)",
                }} />
                {event.img && (
                  <img
                    src={event.img} alt=""
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                  />
                )}
                <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 28%, rgba(217,79,42,0.34), transparent 60%)" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(20,17,15,0.45) 0%, transparent 32%, transparent 52%, rgba(20,17,15,0.98))" }} />

                {/* Floating nav */}
                <div style={{ position: "absolute", top: 14, left: 14, right: 14, display: "flex", justifyContent: "space-between" }}>
                  <GlassBtn onClick={onClose}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={P} strokeWidth="2">
                      <path d="M15 18l-6-6 6-6"/>
                    </svg>
                  </GlassBtn>
                  <GlassBtn>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={P} strokeWidth="2">
                      <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13"/>
                    </svg>
                  </GlassBtn>
                </div>

                {/* Title block */}
                <div style={{ position: "absolute", bottom: 18, left: 18, right: 18 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: A, animation: "pulse 1.5s ease-in-out infinite" }} />
                    <span style={{ fontFamily: M, fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: A }}>
                      ON SALE NOW{parsed ? ` · ${parsed.month.toUpperCase()} ${parsed.day}` : ""}
                    </span>
                  </div>
                  <div style={{ fontFamily: D, fontSize: 42, fontWeight: 700, color: P, lineHeight: 0.94, letterSpacing: "-0.01em", marginBottom: 6 }}>
                    {event.artist}
                  </div>
                  {event.support?.length > 0 && (
                    <div style={{ fontFamily: D, fontSize: 21, fontWeight: 400, color: "rgba(244,239,231,0.78)" }}>
                      + {event.support.map((a) => a.name).join(", ")}
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: "20px 18px 16px" }}>

                {/* Meta strip: DATE + DOORS on top, VENUE full-width below */}
                <div style={{ border: `1px solid ${glassBorder}`, borderRadius: 4, overflow: "hidden", marginBottom: 16 }}>
                  {/* Top row */}
                  <div style={{ display: "flex", borderBottom: `1px solid ${glassBorder}` }}>
                    {[
                      { label: "DATE",  value: parsed ? `${parsed.month} ${parsed.day}` : "TBA" },
                      { label: "DOORS", value: event.time || "8 PM" },
                    ].map((cell, i) => (
                      <div key={cell.label} style={{
                        flex: 1, padding: "10px 12px",
                        borderRight: i === 0 ? `1px solid ${glassBorder}` : "none",
                      }}>
                        <div style={{ fontFamily: M, fontSize: 8, color: F, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>
                          {cell.label}
                        </div>
                        <div style={{ fontFamily: D, fontSize: 14, fontWeight: 600, color: P }}>
                          {cell.value}
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Venue row — full width, wraps freely */}
                  <div style={{ padding: "10px 12px" }}>
                    <div style={{ fontFamily: M, fontSize: 8, color: F, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>
                      VENUE
                    </div>
                    <div style={{ fontFamily: D, fontSize: 14, fontWeight: 600, color: P, lineHeight: "20px" }}>
                      {event.venue || "TBA"}
                    </div>
                  </div>
                </div>

                {/* Match + genre tags */}
                <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                  <span style={{ fontFamily: M, fontSize: 11, color: A, background: "#14110F", borderRadius: 2, padding: "4px 10px", border: `1px solid ${glassBorder}` }}>
                    ♫ {event.matchPct ? `${event.matchPct}% MATCH` : "93% MATCH"}
                  </span>
                  {(event.genres || (event.genre ? [event.genre] : ["LIVE"])).map((g) => (
                    <span key={g} style={{ fontFamily: M, fontSize: 9, color: P, borderRadius: 2, padding: "4px 10px", border: `1px solid ${glassBorder}` }}>
                      {String(g).toUpperCase()}
                    </span>
                  ))}
                </div>

                {/* Lineup */}
                <div style={{ marginBottom: 8 }}>
                  <div style={{ fontFamily: M, fontSize: 9, color: F, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>
                    THE LINEUP
                  </div>

                  {/* Headliner */}
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: event.support?.length > 0 ? 10 : 0 }}>
                    <ActThumb img={event.img} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: D, fontSize: 16, fontWeight: 600, color: P }}>{event.artist}</div>
                      <div style={{ fontFamily: M, fontSize: 8.5, color: A, textTransform: "uppercase", letterSpacing: "0.08em" }}>HEADLINER</div>
                    </div>
                  </div>

                  {/* Openers — one row per act */}
                  {(event.support || []).map((act, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: i < event.support.length - 1 ? 10 : 0 }}>
                      <ActThumb img={act.img} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: D, fontSize: 16, fontWeight: 600, color: P }}>{act.name}</div>
                        <div style={{ fontFamily: M, fontSize: 8.5, color: F, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                          {i === 0 ? "SUPPORT" : "OPENER"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>

            {/* ── Sticky CTA ───────────────────── */}
            <div style={{
              padding: "14px 18px",
              background: "rgba(20,17,15,0.90)",
              backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
              borderTop: `1px solid ${glassBorder}`,
              display: "flex", gap: 12, alignItems: "center",
            }}>
              {/* Wishlist toggle */}
              <button onClick={() => toggleWishlist(event)} style={{
                width: 52, height: 52, flexShrink: 0,
                borderRadius: "50%", border: `1px solid ${isWishlisted ? A : glassBorder}`,
                background: isWishlisted ? "rgba(193,127,74,0.12)" : glass,
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer",
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24"
                  fill={isWishlisted ? A : "none"}
                  stroke={isWishlisted ? A : P}
                  strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
              </button>

              {/* Going toggle */}
              <button onClick={() => toggleGoing(event)} style={{
                width: 52, height: 52, flexShrink: 0,
                borderRadius: "50%", border: `1px solid ${isGoing ? "#5a9e6f" : glassBorder}`,
                background: isGoing ? "rgba(90,158,111,0.14)" : glass,
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer",
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke={isGoing ? "#5a9e6f" : P}
                  strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </button>

              {/* Get Tickets pill */}
              {event.ticketUrl ? (
                <a href={event.ticketUrl} target="_blank" rel="noopener noreferrer" style={{
                  flex: 1, height: 52, display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "0 20px",
                  background: "#14110F", borderRadius: 2, textDecoration: "none",
                  border: `1px solid ${glassBorder}`,
                }}>
                  <span style={{ fontFamily: M, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: P, fontWeight: 700 }}>
                    GET TICKETS
                  </span>
                  <span style={{ fontFamily: M, fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", color: A, fontWeight: 700 }}>
                    {event.price ? `FROM ${event.price} →` : "VIEW →"}
                  </span>
                </a>
              ) : (
                <div style={{
                  flex: 1, height: 52, display: "flex", alignItems: "center", justifyContent: "center",
                  background: glass, borderRadius: 2, border: `1px solid ${glassBorder}`,
                }}>
                  <span style={{ fontFamily: M, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: F }}>
                    TICKETS UNAVAILABLE
                  </span>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};
