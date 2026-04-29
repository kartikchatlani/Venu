import React, { useState } from "react";
import { colors, fonts } from "../theme.jsx";
import { Screen } from "../components/index.jsx";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const parseDate = (dateStr) => {
  if (!dateStr) return null;
  // Add noon time to avoid timezone shifting the date
  const d = new Date(dateStr + "T12:00:00");
  return {
    year: d.getFullYear(),
    monthNum: d.getMonth(),
    day: d.getDate(),
    weekday: d.toLocaleString("en-US", { weekday: "short" }),
    monthShort: d.toLocaleString("en-US", { month: "short" }),
    monthLong: d.toLocaleString("en-US", { month: "long" }),
  };
};

const EventImage = ({ src, size }) => {
  if (!src) return <div style={{ width: size, height: size, borderRadius: 10, background: `linear-gradient(135deg, ${colors.warmGray}, ${colors.border})`, flexShrink: 0 }} />;
  return <img src={src} alt="" style={{ width: size, height: size, borderRadius: 10, objectFit: "cover", flexShrink: 0 }} />;
};

const Calendar = ({ savedEvents = [], savedLoading: loading = false, toggleWishlist, toggleGoing }) => {
  const [filter, setFilter] = useState("all");
  const [selectedDay, setSelectedDay] = useState(null);

  const now = new Date();
  const [currentYear, setCurrentYear] = useState(now.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(now.getMonth());

  const monthStart = new Date(currentYear, currentMonth, 1).getDay();
  const monthDays = new Date(currentYear, currentMonth + 1, 0).getDate();
  const monthName = new Date(currentYear, currentMonth, 1).toLocaleString("en-US", { month: "long" });

  const navigateMonth = (dir) => {
    const d = new Date(currentYear, currentMonth + dir, 1);
    setCurrentYear(d.getFullYear());
    setCurrentMonth(d.getMonth());
    setSelectedDay(null);
  };

  // Map saved events to parsed dates
  const eventsWithDates = savedEvents
    .map((e) => ({ ...e, parsed: parseDate(e.date) }))
    .filter((e) => e.parsed)
    .sort((a, b) => a.date?.localeCompare(b.date));

  const thisMonthEvents = eventsWithDates.filter(
    (e) => e.parsed.year === currentYear && e.parsed.monthNum === currentMonth
  );

  const todayStr = now.toISOString().split("T")[0];

  // Separate going vs wishlist dots on the calendar grid, split by past/upcoming
  const daysWithUpcomingGoing = new Set(
    thisMonthEvents.filter((e) => e.status === "going" && e.date >= todayStr).map((e) => e.parsed.day)
  );
  const daysWithPastGoing = new Set(
    thisMonthEvents.filter((e) => e.status === "going" && e.date < todayStr).map((e) => e.parsed.day)
  );
  const daysWithUpcomingWishlist = new Set(
    thisMonthEvents.filter((e) => e.status !== "going" && e.date >= todayStr).map((e) => e.parsed.day)
  );

  // Event list filtered by tab
  const listEvents =
    filter === "going" ? eventsWithDates.filter((e) => e.status === "going")
    : filter === "wish" ? eventsWithDates.filter((e) => e.status !== "going")
    : eventsWithDates;

  // Detect conflicts (same date, multiple events)
  const conflicts = eventsWithDates.reduce((acc, e) => {
    acc[e.date] = (acc[e.date] || 0) + 1;
    return acc;
  }, {});
  const conflictDates = Object.entries(conflicts).filter(([, count]) => count > 1).map(([date]) => date);

  const upcomingEvents = eventsWithDates.filter((e) => e.date >= todayStr);

  const goingCount = upcomingEvents.filter((e) => e.status === "going").length;
  const wishCount = upcomingEvents.filter((e) => e.status !== "going").length;

  const filters = [
    { id: "all", label: "All", count: upcomingEvents.length },
    { id: "going", label: "Going", count: goingCount },
    { id: "wish", label: "Wishlist", count: wishCount },
  ];

  return (
    <Screen>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h1 style={{ fontFamily: fonts.display, fontSize: 28, fontWeight: 800, color: colors.ink, fontStyle: "italic", lineHeight: 1 }}>Calendar</h1>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div onClick={() => navigateMonth(-1)} style={{ width: 28, height: 28, borderRadius: 8, border: `1.5px solid ${colors.border}`, background: colors.white, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 13, color: colors.brownMid }}>←</div>
          <span style={{ fontFamily: fonts.mono, fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", color: colors.ink, minWidth: 88, textAlign: "center" }}>{monthName} {currentYear}</span>
          <div onClick={() => navigateMonth(1)} style={{ width: 28, height: 28, borderRadius: 8, border: `1.5px solid ${colors.border}`, background: colors.white, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 13, color: colors.brownMid }}>→</div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div style={{ background: colors.white, borderRadius: 16, padding: 16, boxShadow: "0 2px 10px rgba(28,25,21,0.05)", border: "1px solid rgba(28,25,21,0.04)", marginBottom: 20 }}>
        <p style={{ fontFamily: fonts.display, fontSize: 16, fontWeight: 700, fontStyle: "italic", color: colors.ink, marginBottom: 10 }}>{monthName} {currentYear}</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: 8 }}>
          {WEEKDAYS.map((w) => (
            <span key={w} style={{ textAlign: "center", fontFamily: fonts.mono, fontSize: 9, letterSpacing: 1, textTransform: "uppercase", color: colors.faded, padding: "4px 0" }}>{w}</span>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
          {Array.from({ length: monthStart }).map((_, i) => <div key={`empty-${i}`} />)}
          {Array.from({ length: monthDays }).map((_, i) => {
            const d = i + 1;
            const hasUpcomingGoing = daysWithUpcomingGoing.has(d);
            const hasPastGoing = daysWithPastGoing.has(d);
            const hasUpcomingWishlist = daysWithUpcomingWishlist.has(d);
            const isToday = d === now.getDate() && currentMonth === now.getMonth() && currentYear === now.getFullYear();
            const isSelected = selectedDay === d;
            return (
              <div key={d} onClick={() => setSelectedDay(d === selectedDay ? null : d)} style={{
                textAlign: "center", padding: "6px 0", borderRadius: 10, cursor: "pointer",
                fontSize: 13, fontWeight: isToday ? 700 : 500,
                color: isToday ? colors.amber : colors.ink,
                minHeight: 42, display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", gap: 3,
                background: isSelected ? "rgba(193,127,74,0.12)" : "transparent",
              }}>
                <span>{d}</span>
                <div style={{ height: 6 }}>
                  {hasUpcomingGoing && <div style={{ width: 6, height: 6, borderRadius: "50%", background: colors.amber }} />}
                  {!hasUpcomingGoing && hasPastGoing && <div style={{ width: 6, height: 6, borderRadius: "50%", background: colors.faded }} />}
                  {!hasUpcomingGoing && !hasPastGoing && hasUpcomingWishlist && <div style={{ width: 6, height: 6, borderRadius: "50%", border: `1.5px solid ${colors.amber}` }} />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: 18, justifyContent: "center", marginBottom: 22 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: fonts.mono, fontSize: 9, letterSpacing: 1, textTransform: "uppercase", color: colors.brownMid }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: colors.amber }} />Going
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: fonts.mono, fontSize: 9, letterSpacing: 1, textTransform: "uppercase", color: colors.brownMid }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", border: `1.5px solid ${colors.amber}` }} />Wishlist
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: fonts.mono, fontSize: 9, letterSpacing: 1, textTransform: "uppercase", color: colors.brownMid }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: colors.faded }} />Attended
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: "flex", background: colors.warmGray, borderRadius: 10, padding: 3, marginBottom: 20 }}>
        {filters.map((f) => (
          <button key={f.id} onClick={() => setFilter(f.id)} style={{
            flex: 1, padding: 8, border: "none",
            background: filter === f.id ? colors.white : "transparent",
            color: filter === f.id ? colors.ink : colors.brownMid,
            fontFamily: fonts.body, fontSize: 12, fontWeight: 600,
            borderRadius: 8, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            boxShadow: filter === f.id ? "0 1px 4px rgba(28,25,21,0.08)" : "none",
          }}>
            {f.label}
            <span style={{ fontFamily: fonts.mono, fontSize: 10, background: filter === f.id ? colors.amber : colors.ink, color: filter === f.id ? "#fff" : colors.gold, width: 18, height: 18, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600 }}>
              {f.count}
            </span>
          </button>
        ))}
      </div>

      {/* Conflict Warning */}
      {conflictDates.length > 0 && (
        <div style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(224,122,95,0.08)", border: "1px solid rgba(224,122,95,0.2)", borderRadius: 12, padding: "10px 14px", marginBottom: 18 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(224,122,95,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>⚠️</div>
          <p style={{ fontSize: 12, color: colors.olive, lineHeight: 1.5 }}>
            <strong style={{ color: colors.ink }}>Schedule conflict:</strong> You have multiple shows saved on the same day.
          </p>
        </div>
      )}

      {/* Event Cards */}
      {loading ? (
        <p style={{ fontSize: 12, color: colors.faded, fontStyle: "italic" }}>Loading your saved shows...</p>
      ) : listEvents.length === 0 ? (
        <p style={{ fontSize: 12, color: colors.faded, fontStyle: "italic", textAlign: "center", marginTop: 20 }}>No saved shows yet. Heart an event in Explore to add it here.</p>
      ) : (() => {
        const upcoming = listEvents.filter((e) => e.date >= todayStr);
        const past = listEvents.filter((e) => e.date < todayStr);

        const renderCard = (e, i, list, isPast) => {
          const prev = list[i - 1];
          const showDate = !prev || prev.date !== e.date;
          const normalized = { ...e, id: e.event_id, ticketUrl: e.ticket_url };
          const removeEvent = () => e.status === "going" ? toggleGoing(normalized) : toggleWishlist(normalized);
          const accentColor = isPast ? colors.faded : colors.amber;
          return (
            <React.Fragment key={e.event_id}>
              {showDate && (
                <p style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", color: accentColor, marginBottom: 10, marginTop: 4 }}>
                  {e.parsed.weekday}, {e.parsed.monthShort} {e.parsed.day}
                </p>
              )}
              <div style={{ display: "flex", gap: 14, alignItems: "center", padding: 14, background: colors.white, borderRadius: 14, marginBottom: 10, boxShadow: "0 1px 4px rgba(28,25,21,0.04)", border: "1px solid rgba(28,25,21,0.04)", borderLeft: `3px solid ${accentColor}`, opacity: isPast ? 0.7 : 1 }}>
                <div style={{ width: 48, textAlign: "center", flexShrink: 0 }}>
                  <p style={{ fontFamily: fonts.mono, fontSize: 9, letterSpacing: 1, textTransform: "uppercase", color: accentColor, marginBottom: 1 }}>{e.parsed.monthShort}</p>
                  <p style={{ fontFamily: fonts.display, fontSize: 24, fontWeight: 800, color: colors.ink, fontStyle: "italic", lineHeight: 1, marginBottom: 1 }}>{e.parsed.day}</p>
                  <p style={{ fontFamily: fonts.mono, fontSize: 8, letterSpacing: 1, textTransform: "uppercase", color: colors.faded }}>{e.parsed.weekday}</p>
                </div>
                <EventImage src={e.img} size={48} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: colors.ink, marginBottom: 2 }}>{e.artist}</p>
                  <p style={{ fontSize: 11, color: colors.brownMid, marginBottom: 4 }}>{e.venue} · {e.time}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {isPast
                      ? e.status === "going"
                        ? <span style={{ fontFamily: fonts.mono, fontSize: 8, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", padding: "3px 8px", borderRadius: 20, background: colors.ink, color: colors.gold }}>✓ Went</span>
                        : <span style={{ fontFamily: fonts.mono, fontSize: 8, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", padding: "3px 8px", borderRadius: 20, background: colors.warmGray, color: colors.brownMid }}>Passed</span>
                      : e.status === "going"
                        ? <span style={{ fontFamily: fonts.mono, fontSize: 8, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", padding: "3px 8px", borderRadius: 20, background: colors.ink, color: colors.gold }}>✓ Going</span>
                        : <span style={{ fontFamily: fonts.mono, fontSize: 8, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", padding: "3px 8px", borderRadius: 20, background: colors.warmGray, color: colors.brownMid }}>♡ Wishlist</span>
                    }
                    {e.price && <span style={{ fontSize: 12, fontWeight: 700, color: colors.ink }}>{e.price}</span>}
                  </div>
                </div>
                <button onClick={removeEvent} style={{ flexShrink: 0, width: 28, height: 28, borderRadius: "50%", border: `1px solid ${colors.border}`, background: colors.warmGray, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={colors.brownMid} strokeWidth="2.5">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </React.Fragment>
          );
        };

        return (
          <>
            {upcoming.length === 0 && past.length > 0 && (
              <p style={{ fontSize: 12, color: colors.faded, fontStyle: "italic", textAlign: "center", marginBottom: 16 }}>No upcoming shows. Check out Explore to find something!</p>
            )}
            {upcoming.map((e, i) => renderCard(e, i, upcoming, false))}
            {past.length > 0 && (
              <>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8, marginBottom: 14 }}>
                  <div style={{ flex: 1, height: 1, background: colors.border }} />
                  <span style={{ fontFamily: fonts.mono, fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", color: colors.faded }}>Past Shows</span>
                  <div style={{ flex: 1, height: 1, background: colors.border }} />
                </div>
                {past.map((e, i) => renderCard(e, i, past, true))}
              </>
            )}
          </>
        );
      })()}
    </Screen>
  );
};

export default Calendar;
