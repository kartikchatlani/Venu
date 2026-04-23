import React from "react";
import { colors, fonts } from "../theme.jsx";

const parseEventDate = (dateStr) => {
  if (!dateStr) return null;
  const d = new Date(dateStr + "T12:00:00");
  return {
    weekday: d.toLocaleString("en-US", { weekday: "short" }),
    month: d.toLocaleString("en-US", { month: "short" }),
    day: d.getDate(),
  };
};

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
          background: "rgba(28,25,21,0.5)",
          opacity: isVisible ? 1 : 0,
          pointerEvents: isVisible ? "auto" : "none",
          transition: "opacity 0.3s ease",
          zIndex: 200,
        }}
      />

      {/* Sheet */}
      <div style={{
        position: "absolute", left: 0, right: 0, bottom: 0,
        height: "82%",
        background: colors.cream,
        borderRadius: "24px 24px 0 0",
        borderTop: `1px solid ${colors.border}`,
        transform: isVisible ? "translateY(0)" : "translateY(100%)",
        transition: "transform 0.35s cubic-bezier(0.32,0.72,0,1)",
        zIndex: 201,
        overflowY: "auto",
        scrollbarWidth: "none",
      }}>
        {event && (
          <>
            {/* Drag handle */}
            <div style={{ display: "flex", justifyContent: "center", padding: "10px 0 6px" }}>
              <div style={{ width: 36, height: 4, background: "#C4B8A8", borderRadius: 2 }} />
            </div>

            {/* Hero banner */}
            <div style={{ height: 160, background: colors.ink, margin: "0 12px", borderRadius: 14, overflow: "hidden", position: "relative" }}>
              {event.img && (
                <img src={event.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.55 }} />
              )}
              {!event.img && (
                <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 30% 40%, #5C4F3D 0%, ${colors.ink} 70%)` }} />
              )}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(28,25,21,0.92) 0%, transparent 55%)" }} />

              {/* Close button */}
              <button
                onClick={onClose}
                style={{
                  position: "absolute", top: 10, right: 10,
                  width: 28, height: 28, borderRadius: "50%",
                  background: "rgba(250,246,241,0.15)", border: "none",
                  cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={colors.cream} strokeWidth="2.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              {/* Artist + genre */}
              <div style={{ position: "absolute", bottom: 14, left: 14, right: 14 }}>
                {event.genre && (
                  <div style={{ fontFamily: fonts.mono, fontSize: 9, letterSpacing: 1, textTransform: "uppercase", color: colors.amber, marginBottom: 5 }}>
                    {event.genre}
                  </div>
                )}
                <div style={{ fontFamily: fonts.display, fontSize: 26, fontWeight: 800, fontStyle: "italic", color: colors.cream, lineHeight: 1.1 }}>
                  {event.artist}
                </div>
              </div>
            </div>

            {/* Body */}
            <div style={{ padding: "16px 16px 0" }}>

              {/* When / Where */}
              <div style={{ display: "flex", paddingBottom: 14, borderBottom: `1px solid ${colors.border}`, marginBottom: 14 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: fonts.mono, fontSize: 9, letterSpacing: 0.5, textTransform: "uppercase", color: colors.brownMid, marginBottom: 3 }}>When</div>
                  <div style={{ fontSize: 13, color: colors.ink, fontWeight: 600, marginBottom: 1 }}>
                    {parsed ? `${parsed.weekday}, ${parsed.month} ${parsed.day}` : "TBA"}
                  </div>
                  {event.time && <div style={{ fontSize: 11, color: colors.brownMid }}>{event.time}</div>}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: fonts.mono, fontSize: 9, letterSpacing: 0.5, textTransform: "uppercase", color: colors.brownMid, marginBottom: 3 }}>Where</div>
                  <div style={{ fontSize: 13, color: colors.ink, fontWeight: 600, marginBottom: 1 }}>{event.venue || "TBA"}</div>
                  <div style={{ fontSize: 11, color: colors.brownMid }}>Austin, TX</div>
                </div>
              </div>

              {/* Get Tickets */}
              {event.ticketUrl ? (
                <a
                  href={event.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "block", textAlign: "center", textDecoration: "none",
                    background: colors.amber, color: colors.cream,
                    borderRadius: 12, padding: "13px",
                    fontSize: 14, fontWeight: 700, fontFamily: fonts.body,
                    marginBottom: 10, boxSizing: "border-box",
                  }}
                >
                  Get Tickets →
                </a>
              ) : (
                <div style={{
                  textAlign: "center", background: colors.warmGray, color: colors.brownMid,
                  borderRadius: 12, padding: "13px",
                  fontSize: 14, fontWeight: 600, fontFamily: fonts.body,
                  marginBottom: 10,
                }}>
                  Tickets Unavailable
                </div>
              )}

              {/* Going + Wishlist */}
              <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
                <button
                  onClick={() => toggleGoing(event)}
                  style={{
                    flex: 1, borderRadius: 12, padding: "11px",
                    fontSize: 13, fontWeight: 600, fontFamily: fonts.body,
                    border: `1.5px solid ${isGoing ? colors.ink : colors.border}`,
                    background: isGoing ? colors.ink : colors.white,
                    color: isGoing ? colors.gold : colors.ink,
                    cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                  }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                    stroke={isGoing ? colors.gold : colors.ink} strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Going
                </button>

                <button
                  onClick={() => toggleWishlist(event)}
                  style={{
                    flex: 1, borderRadius: 12, padding: "11px",
                    fontSize: 13, fontWeight: 600, fontFamily: fonts.body,
                    border: `1.5px solid ${isWishlisted ? colors.amber : colors.border}`,
                    background: isWishlisted ? "rgba(193,127,74,0.1)" : colors.white,
                    color: isWishlisted ? colors.amber : colors.ink,
                    cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                  }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24"
                    fill={isWishlisted ? colors.amber : "none"}
                    stroke={isWishlisted ? colors.amber : colors.ink}
                    strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                  </svg>
                  {isWishlisted ? "Saved" : "Wishlist"}
                </button>
              </div>

              {/* Directions footer */}
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "12px 0", borderTop: `1px solid ${colors.border}`,
              }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: colors.ink }}>{event.venue}</div>
                  <div style={{ fontSize: 11, color: colors.brownMid }}>Austin, TX</div>
                </div>
                <div style={{
                  display: "flex", alignItems: "center", gap: 5,
                  fontSize: 12, color: colors.amber, fontWeight: 600, cursor: "default",
                }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={colors.amber} strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  Directions
                </div>
              </div>

            </div>
          </>
        )}
      </div>
    </>
  );
};
