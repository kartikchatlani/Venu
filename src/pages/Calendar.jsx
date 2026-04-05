import React, { useState } from "react";
import { colors, fonts } from "../theme.jsx";
import { Screen, SectionHeader } from "../components/index.jsx";
import { calendarDots, calendarEvents } from "../data/index.jsx";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const APRIL_START = 3;
const APRIL_DAYS = 30;
const DAY_NAMES = { Tue: "Tuesday", Sat: "Saturday", Fri: "Friday", Wed: "Wednesday", Mon: "Monday", Sun: "Sunday", Thu: "Thursday" };

const Calendar = () => {
  const [filter, setFilter] = useState("all");
  const [selectedDay, setSelectedDay] = useState(null);

  const filtered = calendarEvents.filter(e => filter === "all" || e.type === filter);
  const bookedCount = calendarEvents.filter(e => e.type === "booked").length;
  const wishCount = calendarEvents.filter(e => e.type === "wish").length;

  const filters = [
    { id: "all", label: "All", count: calendarEvents.length },
    { id: "booked", label: "Booked", count: bookedCount },
    { id: "wish", label: "Wishlist", count: wishCount },
  ];

  return (
    <Screen>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
        <h1 style={{ fontFamily: fonts.display, fontSize: 28, fontWeight: 800, color: colors.ink, fontStyle: "italic", lineHeight: 1 }}>Calendar</h1>
        <div style={{ display: "flex", alignItems: "center", gap: 6, background: colors.warmGray, padding: "5px 12px", borderRadius: 20, border: `1px solid ${colors.border}`, fontSize: 12, fontWeight: 600, color: colors.ink }}>April 2026</div>
      </div>
      <p style={{ fontSize: 13, color: colors.brownMid, marginBottom: 20 }}>{bookedCount} shows booked · {wishCount} on your wishlist</p>

      {/* Month Nav */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <span style={{ fontFamily: fonts.display, fontSize: 20, fontWeight: 700, color: colors.ink, fontStyle: "italic" }}>April 2026</span>
        <div style={{ display: "flex", gap: 8 }}>
          {["←", "→"].map((arr, i) => (
            <div key={i} style={{ width: 34, height: 34, borderRadius: 10, border: `1.5px solid ${colors.border}`, background: colors.white, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 14, color: colors.brownMid }}>{arr}</div>
          ))}
        </div>
      </div>

      {/* Calendar Grid */}
      <div style={{ background: colors.white, borderRadius: 16, padding: 16, boxShadow: "0 2px 10px rgba(28,25,21,0.05)", border: "1px solid rgba(28,25,21,0.04)", marginBottom: 20 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: 8 }}>
          {WEEKDAYS.map(w => <span key={w} style={{ textAlign: "center", fontFamily: fonts.mono, fontSize: 9, letterSpacing: 1, textTransform: "uppercase", color: colors.faded, padding: "4px 0" }}>{w}</span>)}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
          {Array.from({ length: APRIL_START }).map((_, i) => <div key={`e${i}`} />)}
          {Array.from({ length: APRIL_DAYS }).map((_, i) => {
            const d = i + 1;
            const hasBooked = calendarDots.booked.includes(d);
            const hasWish = calendarDots.wishlist.includes(d);
            const isSelected = selectedDay === d;
            return (
              <div key={d} onClick={() => setSelectedDay(d)} style={{
                textAlign: "center", padding: "6px 0", borderRadius: 10, cursor: "pointer",
                fontSize: 13, fontWeight: 500, color: colors.ink, minHeight: 42,
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3,
                background: isSelected ? "rgba(193,127,74,0.12)" : "transparent",
              }}>
                <span>{d}</span>
                <div style={{ display: "flex", gap: 3, height: 7 }}>
                  {hasBooked && <div style={{ width: 6, height: 6, borderRadius: "50%", background: colors.amber }} />}
                  {hasWish && <div style={{ width: 6, height: 6, borderRadius: "50%", border: `1.5px solid ${colors.amber}` }} />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: 18, justifyContent: "center", marginBottom: 22 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: fonts.mono, fontSize: 9, letterSpacing: 1, textTransform: "uppercase", color: colors.brownMid }}><div style={{ width: 8, height: 8, borderRadius: "50%", background: colors.amber }} />Booked</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: fonts.mono, fontSize: 9, letterSpacing: 1, textTransform: "uppercase", color: colors.brownMid }}><div style={{ width: 8, height: 8, borderRadius: "50%", border: `1.5px solid ${colors.amber}` }} />Wishlist</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: fonts.mono, fontSize: 9, letterSpacing: 1, textTransform: "uppercase", color: colors.brownMid }}><div style={{ width: 8, height: 8, borderRadius: "50%", background: colors.ink }} />Today</div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: "flex", background: colors.warmGray, borderRadius: 10, padding: 3, marginBottom: 20 }}>
        {filters.map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)} style={{
            flex: 1, padding: 8, border: "none", background: filter === f.id ? colors.white : "transparent",
            color: filter === f.id ? colors.ink : colors.brownMid, fontFamily: fonts.body, fontSize: 12,
            fontWeight: 600, borderRadius: 8, cursor: "pointer", display: "flex", alignItems: "center",
            justifyContent: "center", gap: 6, boxShadow: filter === f.id ? "0 1px 4px rgba(28,25,21,0.08)" : "none",
          }}>
            {f.label}
            <span style={{ fontFamily: fonts.mono, fontSize: 10, background: filter === f.id ? colors.amber : colors.ink, color: filter === f.id ? "#fff" : colors.gold, width: 18, height: 18, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600 }}>{f.count}</span>
          </button>
        ))}
      </div>

      {/* Conflict */}
      {filter !== "wish" && (
        <div style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(224,122,95,0.08)", border: "1px solid rgba(224,122,95,0.2)", borderRadius: 12, padding: "10px 14px", marginBottom: 18 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(224,122,95,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>⚠️</div>
          <p style={{ fontSize: 12, color: colors.olive, lineHeight: 1.5 }}><strong style={{ color: colors.ink }}>Schedule conflict:</strong> Floating Points and L'Eclair overlap on Apr 25.</p>
        </div>
      )}

      {/* Event Cards */}
      {filtered.map((e, i) => {
        const prev = filtered[i - 1];
        const showDate = !prev || prev.day !== e.day || prev.month !== e.month;
        return (
          <React.Fragment key={i}>
            {showDate && <p style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", color: colors.amber, marginBottom: 10, marginTop: 4 }}>{DAY_NAMES[e.weekday] || e.weekday}, {e.month} {e.day}</p>}
            <div style={{ display: "flex", gap: 14, alignItems: "center", padding: 14, background: colors.white, borderRadius: 14, marginBottom: 10, boxShadow: "0 1px 4px rgba(28,25,21,0.04)", border: "1px solid rgba(28,25,21,0.04)", borderLeft: e.type === "wish" ? `3px solid ${colors.amber}` : undefined }}>
              <div style={{ width: 48, textAlign: "center", flexShrink: 0 }}>
                <p style={{ fontFamily: fonts.mono, fontSize: 9, letterSpacing: 1, textTransform: "uppercase", color: colors.amber, marginBottom: 1 }}>{e.month}</p>
                <p style={{ fontFamily: fonts.display, fontSize: 24, fontWeight: 800, color: colors.ink, fontStyle: "italic", lineHeight: 1, marginBottom: 1 }}>{e.day}</p>
                <p style={{ fontFamily: fonts.mono, fontSize: 8, letterSpacing: 1, textTransform: "uppercase", color: colors.faded }}>{e.weekday}</p>
              </div>
              <img src={e.img} alt="" style={{ width: 48, height: 48, borderRadius: 10, objectFit: "cover", flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: colors.ink, marginBottom: 2 }}>{e.artist}</p>
                <p style={{ fontSize: 11, color: colors.brownMid, marginBottom: 4 }}>{e.venue} · {e.time}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontFamily: fonts.mono, fontSize: 8, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", padding: "3px 8px", borderRadius: 20, background: e.type === "booked" ? "rgba(193,127,74,0.12)" : colors.warmGray, color: e.type === "booked" ? colors.amber : colors.brownMid }}>{e.type === "booked" ? "✓ Booked" : "♡ Wishlist"}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: colors.ink }}>{e.price}</span>
                </div>
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </Screen>
  );
};

export default Calendar;
