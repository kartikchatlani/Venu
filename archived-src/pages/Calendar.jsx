import React, { useState } from "react";
import { Screen } from "../components/index.jsx";
import { MonoMeta } from "../components/marks/index.jsx";
import { SetlistStep } from "../components/SetlistStep.jsx";

const P = "#F4EFE7";
const A = "#C17F4A";
const E = "#D94F2A";
const F = "#8A8278";
const D = "'Fraunces', Georgia, serif";
const M = "'JetBrains Mono', monospace";
const glass = "rgba(244,239,231,0.05)";
const glassBorder = "rgba(244,239,231,0.10)";

const parseDate = (dateStr) => {
  if (!dateStr) return null;
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

const Calendar = ({ savedEvents = [], savedLoading: loading = false, toggleWishlist, toggleGoing }) => {
  const [filter, setFilter] = useState("all");
  const [setlistEvent, setSetlistEvent] = useState(null);

  const now = new Date();
  const [currentYear, setCurrentYear] = useState(now.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(now.getMonth());

  const monthName = new Date(currentYear, currentMonth, 1).toLocaleString("en-US", { month: "long" });

  const navigateMonth = (dir) => {
    const d = new Date(currentYear, currentMonth + dir, 1);
    setCurrentYear(d.getFullYear());
    setCurrentMonth(d.getMonth());
  };

  const todayStr = now.toISOString().split("T")[0];

  const eventsWithDates = savedEvents
    .map((e) => ({ ...e, parsed: parseDate(e.date) }))
    .filter((e) => e.parsed)
    .sort((a, b) => a.date?.localeCompare(b.date));

  const upcomingEvents = eventsWithDates.filter((e) => e.date >= todayStr);
  const goingCount = upcomingEvents.filter((e) => e.status === "going").length;
  const wishCount = upcomingEvents.filter((e) => e.status !== "going").length;

  const filters = [
    { id: "all",   label: "All",      count: upcomingEvents.length },
    { id: "going", label: "Going",    count: goingCount },
    { id: "wish",  label: "Wishlist", count: wishCount },
  ];

  const filteredEvents =
    filter === "going" ? eventsWithDates.filter((e) => e.status === "going")
    : filter === "wish" ? eventsWithDates.filter((e) => e.status !== "going")
    : eventsWithDates;

  const upcoming = filteredEvents.filter((e) => e.date >= todayStr);
  const past = filteredEvents.filter((e) => e.date < todayStr);

  const isToday = (dateStr) => dateStr === todayStr;

  const renderEventRow = (e, isPast) => {
    const accentColor = isPast ? F : A;
    const normalized = { ...e, id: e.event_id, ticketUrl: e.ticket_url };
    const removeEvent = () => e.status === "going" ? toggleGoing(normalized) : toggleWishlist(normalized);

    return (
      <div key={e.event_id} style={{ display: "flex", gap: 14, marginBottom: 14 }}>
        {/* Date node — dimmed for past */}
        <div style={{ width: 56, flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 4, opacity: isPast ? 0.55 : 1 }}>
          <div style={{ fontFamily: M, fontSize: 9, letterSpacing: "0.08em", textTransform: "uppercase", color: accentColor, marginBottom: 2 }}>
            {e.parsed.weekday}
          </div>
          <div style={{ fontFamily: D, fontSize: 28, fontWeight: 700, color: isToday(e.date) ? A : P, lineHeight: 1, marginBottom: 2 }}>
            {e.parsed.day}
          </div>
          <div style={{ fontFamily: M, fontSize: 9, letterSpacing: "0.06em", textTransform: "uppercase", color: F }}>
            {e.parsed.monthShort}
          </div>
          <div style={{ marginTop: 8 }}>
            {isToday(e.date) ? (
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: A, boxShadow: "0 0 0 3px rgba(193,127,74,0.25)", animation: "dockglow 3s ease-in-out infinite" }} />
            ) : isPast ? (
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: F }} />
            ) : (
              <div style={{ width: 8, height: 8, borderRadius: "50%", border: `2px solid ${A}` }} />
            )}
          </div>
        </div>

        {/* Glass event card */}
        <div style={{
          flex: 1, background: glass, border: `1px solid ${glassBorder}`,
          borderRadius: 4, padding: "12px 14px",
          display: "flex", alignItems: "flex-start", gap: 10,
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: D, fontSize: 16, fontWeight: 700, color: P, marginBottom: 3, lineHeight: "20px" }}>
              {e.artist}
            </div>
            <div style={{ fontFamily: M, fontSize: 9, letterSpacing: "0.06em", textTransform: "uppercase", color: F, marginBottom: 8 }}>
              {e.venue} · {e.time}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{
                fontFamily: M, fontSize: 8, fontWeight: 700, letterSpacing: "0.08em",
                textTransform: "uppercase", padding: "3px 9px", borderRadius: 2,
                background: isPast ? "rgba(138,130,120,0.12)" : "rgba(193,127,74,0.14)",
                color: isPast ? F : A,
                border: `1px solid ${isPast ? "rgba(138,130,120,0.2)" : "rgba(193,127,74,0.3)"}`,
              }}>
                {isPast
                  ? e.status === "going" ? "✓ Went" : "Passed"
                  : e.status === "going" ? "✓ Going" : "♡ Wishlist"}
              </span>
              {e.price && (
                <span style={{ fontFamily: M, fontSize: 10, color: A, fontWeight: 700 }}>{e.price}</span>
              )}
            </div>
            <button onClick={removeEvent} style={{
              flexShrink: 0, width: 24, height: 24, borderRadius: 8,
              border: `1px solid ${glassBorder}`,
              background: "transparent", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={F} strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>

          {/* Relive the Night — outside dimmed wrapper, always full opacity */}
          {isPast && e.status === "going" && (
            <button onClick={() => setSetlistEvent(e)} style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: A, border: "none", cursor: "pointer",
              borderRadius: 20, padding: "6px 14px", marginTop: 10,
              boxShadow: "0 0 14px rgba(193,127,74,0.45)",
            }}>
              <svg width="9" height="9" viewBox="0 0 24 24" fill="#14110F"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              <span style={{ fontFamily: M, fontSize: 8, fontWeight: 700, color: "#14110F", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Relive the Night
              </span>
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
    {setlistEvent && <SetlistStep event={setlistEvent} onClose={() => setSetlistEvent(null)} />}
    <Screen>
      {/* ── Masthead ─────────────────────────────────────────── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 }}>
        <div>
          <div style={{ fontFamily: D, fontSize: 38, fontWeight: 700, color: P, lineHeight: "38px", letterSpacing: "-0.02em" }}>
            My Shows
          </div>
          <div style={{ fontFamily: M, fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase", color: F, marginTop: 4 }}>
            Your shows at a glance
          </div>
        </div>
        {/* Month nav */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, paddingTop: 6 }}>
          <button onClick={() => navigateMonth(-1)} style={{
            width: 30, height: 30, borderRadius: 4,
            border: `1px solid ${glassBorder}`, background: glass,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: F, fontSize: 12,
          }}>←</button>
          <span style={{ fontFamily: M, fontSize: 10, color: P, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", minWidth: 80, textAlign: "center" }}>
            {monthName.slice(0, 3).toUpperCase()} {currentYear}
          </span>
          <button onClick={() => navigateMonth(1)} style={{
            width: 30, height: 30, borderRadius: 4,
            border: `1px solid ${glassBorder}`, background: glass,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: F, fontSize: 12,
          }}>→</button>
        </div>
      </div>

      {/* ── Filter pills ─────────────────────────────────────── */}
      <div style={{ display: "flex", gap: 6, marginBottom: 26 }}>
        {filters.map((f) => (
          <button key={f.id} onClick={() => setFilter(f.id)} style={{
            display: "flex", alignItems: "center", gap: 6, padding: "7px 16px",
            border: "none", cursor: "pointer", borderRadius: 2,
            background: filter === f.id ? A : glass,
            border: filter === f.id ? "none" : `1px solid ${glassBorder}`,
            fontFamily: M, fontSize: 10, fontWeight: 700,
            letterSpacing: "0.06em", textTransform: "uppercase",
            color: filter === f.id ? "#14110F" : F,
            transition: "all 0.2s ease",
          }}>
            {f.label}
            <span style={{
              fontFamily: M, fontSize: 9, fontWeight: 700, lineHeight: 1.4,
              padding: "1px 6px", borderRadius: 2,
              background: filter === f.id ? "rgba(20,17,15,0.2)" : "rgba(244,239,231,0.08)",
              color: filter === f.id ? "#14110F" : F,
            }}>
              {f.count}
            </span>
          </button>
        ))}
      </div>

      {/* ── Vertical Agenda Timeline ──────────────────────────── */}
      {loading ? (
        <div style={{ fontFamily: M, fontSize: 10, color: F, textTransform: "uppercase", letterSpacing: "0.06em" }}>
          Loading your saved shows…
        </div>
      ) : filteredEvents.length === 0 ? (
        <div style={{ textAlign: "center", padding: "48px 0" }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🎵</div>
          <div style={{ fontFamily: D, fontSize: 18, fontWeight: 700, color: P, marginBottom: 6 }}>Nothing here yet</div>
          <div style={{ fontFamily: M, fontSize: 9, color: F, textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Heart an event in Explore to save it
          </div>
        </div>
      ) : (
        <>
          {upcoming.length === 0 && past.length > 0 && (
            <div style={{ fontFamily: M, fontSize: 9, color: F, textTransform: "uppercase", letterSpacing: "0.06em", textAlign: "center", marginBottom: 22 }}>
              No upcoming shows — explore to find something!
            </div>
          )}

          {upcoming.map((e) => renderEventRow(e, false))}

          {past.length > 0 && (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "22px 0 18px" }}>
                <div style={{ flex: 1, height: 1, background: glassBorder }} />
                <span style={{ fontFamily: M, fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: F }}>
                  Past Shows
                </span>
                <div style={{ flex: 1, height: 1, background: glassBorder }} />
              </div>
              {past.map((e) => renderEventRow(e, true))}
            </>
          )}
        </>
      )}
    </Screen>
    </>
  );
};

export default Calendar;
