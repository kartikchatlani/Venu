import React from "react";

// ── Design tokens (After Dark) ───────────────────────────────────────────────
const T = {
  paper:       "#F4EFE7",   // primary text (light on dark)
  faded:       "#8A8278",   // secondary text
  amber:       "#C17F4A",   // accent
  ember:       "#D94F2A",   // urgency / live
  ink:         "#14110F",   // deepest overlays
  glass:       "rgba(244,239,231,0.05)",
  glassBorder: "rgba(244,239,231,0.10)",
  display:     "'Fraunces', Georgia, serif",
  mono:        "'JetBrains Mono', monospace",
};

// ── PhoneFrame ───────────────────────────────────────────────────────────────
export const PhoneFrame = ({ children }) => (
  <div style={{
    width: 375, height: 812,
    background: "linear-gradient(180deg, #17120e 0%, #0c0a08 100%)",
    borderRadius: 44,
    border: "3px solid #2e2822",
    overflow: "hidden", position: "relative",
    boxShadow: "0 40px 80px -20px rgba(0,0,0,0.8), 0 0 0 1px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.04)",
    isolation: "isolate",
  }}>
    {/* Notch */}
    <div style={{
      position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
      width: 126, height: 30,
      background: "#0c0a08",
      borderRadius: "0 0 18px 18px", zIndex: 100,
    }} />
    <StatusBar />
    {children}
  </div>
);

// ── StatusBar ────────────────────────────────────────────────────────────────
export const StatusBar = () => (
  <div style={{
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "14px 24px 0",
    fontFamily: T.mono,
    fontSize: 11, fontWeight: 600, letterSpacing: "0.02em",
    color: T.paper,
    position: "relative", zIndex: 50,
    background: "transparent",
  }}>
    <span>9:41</span>
    <span style={{ display: "flex", gap: 5, alignItems: "center" }}>
      <svg width="15" height="11" viewBox="0 0 15 11" fill={T.paper}>
        <rect x="0" y="4" width="3" height="7" rx="0.5"/>
        <rect x="4" y="2" width="3" height="9" rx="0.5"/>
        <rect x="8" y="0" width="3" height="11" rx="0.5"/>
        <rect x="12" y="3" width="3" height="8" rx="0.5" opacity="0.3"/>
      </svg>
      <svg width="15" height="11" viewBox="0 0 15 11" fill={T.paper}>
        <path d="M7.5 2C10.5 2 13 3.5 14 5L7.5 11 1 5C2 3.5 4.5 2 7.5 2Z" opacity="0.9"/>
      </svg>
      <svg width="22" height="11" viewBox="0 0 22 11" fill="none">
        <rect x="0" y="0" width="19" height="11" rx="2" stroke={T.paper} strokeWidth="1"/>
        <rect x="20" y="3" width="2" height="5" rx="1" fill={T.paper} opacity="0.4"/>
        <rect x="1.5" y="1.5" width="13" height="8" rx="1" fill="#4ADE80"/>
      </svg>
    </span>
  </div>
);

// ── Screen ───────────────────────────────────────────────────────────────────
// Transparent — the dark gradient background comes from PhoneFrame.
export const Screen = ({ children, noPad = false }) => (
  <div style={{
    position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
    overflowY: "auto", overflowX: "hidden",
    padding: noPad ? 0 : "52px 22px 72px",
    background: "transparent",
    scrollbarWidth: "none",
  }}>
    {children}
  </div>
);

// ── SectionHeader ────────────────────────────────────────────────────────────
export const SectionHeader = ({ title, link }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16 }}>
    <span style={{
      fontFamily: T.display,
      fontSize: 20, fontWeight: 700,
      color: T.paper, lineHeight: "24px",
    }}>
      {title}
    </span>
    {link && (
      <span style={{
        fontFamily: T.mono,
        fontSize: 9, letterSpacing: "0.08em", textTransform: "uppercase",
        color: T.amber, cursor: "pointer", fontWeight: 600,
      }}>
        {link} →
      </span>
    )}
  </div>
);

// ── Divider ──────────────────────────────────────────────────────────────────
export const Divider = ({ style = {} }) => (
  <div style={{ height: 1, background: "rgba(244,239,231,0.10)", margin: "24px 0", ...style }} />
);

// ── HScroll ──────────────────────────────────────────────────────────────────
export const HScroll = ({ children, gap = 12, style = {} }) => (
  <div style={{
    display: "flex", overflowX: "auto",
    scrollbarWidth: "none", paddingBottom: 4, gap, ...style,
  }}>
    {children}
  </div>
);

// ── NotifBell ────────────────────────────────────────────────────────────────
export const NotifBell = ({ onClick, hasUnread = true }) => (
  <div onClick={onClick} style={{ position: "relative", cursor: "pointer", padding: 4 }}>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.paper} strokeWidth="1.5" strokeLinecap="round">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 01-3.46 0"/>
    </svg>
    {hasUnread && (
      <div style={{
        position: "absolute", top: 2, right: 2,
        width: 6, height: 6,
        background: T.ember,
        borderRadius: "50%",
        border: "1.5px solid #0c0a08",
      }} />
    )}
  </div>
);

// ── UserAvatar ───────────────────────────────────────────────────────────────
export const UserAvatar = ({ initial = "A", size = 30 }) => (
  <div style={{
    width: size, height: size,
    background: "rgba(193,127,74,0.18)",
    border: "1px solid rgba(193,127,74,0.4)",
    display: "flex", alignItems: "center", justifyContent: "center",
    borderRadius: 2,
  }}>
    <span style={{
      fontFamily: T.display,
      fontSize: size * 0.46, fontWeight: 700,
      color: T.amber, lineHeight: 1,
    }}>
      {initial}
    </span>
  </div>
);

// ── CountdownBadge ───────────────────────────────────────────────────────────
export const CountdownBadge = ({ days }) => (
  <div style={{
    width: 40, height: 40,
    background: T.glass,
    border: `1px solid ${T.glassBorder}`,
    borderRadius: 4,
    display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center", flexShrink: 0,
  }}>
    <span style={{
      fontFamily: T.mono,
      fontSize: 15, fontWeight: 700,
      color: T.amber, lineHeight: 1,
    }}>
      {days}
    </span>
    <span style={{
      fontFamily: T.mono,
      fontSize: 7, color: T.faded,
      letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 2,
    }}>
      days
    </span>
  </div>
);

// ── FriendRow ────────────────────────────────────────────────────────────────
export const FriendRow = ({ name, action, event, time }) => (
  <div style={{
    padding: "10px 0",
    borderBottom: "1px solid rgba(244,239,231,0.08)",
    display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 8,
  }}>
    <div style={{ flex: 1 }}>
      <span style={{
        fontFamily: T.mono,
        fontSize: 11, fontWeight: 700,
        letterSpacing: "0.06em", textTransform: "uppercase",
        color: T.paper,
      }}>
        {name.toUpperCase()}
      </span>
      <span style={{
        fontFamily: T.mono,
        fontSize: 11, color: T.faded,
        letterSpacing: "0.04em",
      }}>
        {" "}{action}{" "}
      </span>
      <span style={{
        fontFamily: T.display,
        fontSize: 13, fontWeight: 600,
        color: T.amber,
      }}>
        {event}
      </span>
      <span style={{ fontFamily: T.mono, fontSize: 10, color: T.amber, marginLeft: 4 }}> ↗</span>
    </div>
    <span style={{
      fontFamily: T.mono,
      fontSize: 9, color: T.faded,
      letterSpacing: "0.04em", flexShrink: 0,
    }}>
      {time}
    </span>
  </div>
);

// ── Chip ─────────────────────────────────────────────────────────────────────
// After Dark: pill-shaped, amber fill when active.
export const Chip = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className="pressable"
    style={{
      flexShrink: 0,
      padding: "7px 16px",
      border: active ? "none" : `1px solid ${T.glassBorder}`,
      background: active ? T.amber : T.glass,
      color: active ? T.ink : T.faded,
      fontFamily: T.mono,
      fontSize: 10, fontWeight: 700,
      letterSpacing: "0.06em", textTransform: "uppercase",
      borderRadius: 2, cursor: "pointer",
      whiteSpace: "nowrap",
    }}
  >
    {label}
  </button>
);

// ── TagPill ──────────────────────────────────────────────────────────────────
export const TagPill = ({ children }) => (
  <span style={{
    background: T.glass,
    border: `1px solid ${T.glassBorder}`,
    color: T.faded,
    fontFamily: T.mono,
    fontSize: 9, fontWeight: 500,
    padding: "2px 8px", borderRadius: 2,
    letterSpacing: "0.06em", textTransform: "uppercase",
  }}>
    {children}
  </span>
);

// ── MatchScore ───────────────────────────────────────────────────────────────
export const MatchScore = ({ value, style = {} }) => (
  <span style={{
    display: "inline-flex", alignItems: "center", gap: 4,
    background: "rgba(193,127,74,0.15)",
    border: "1px solid rgba(193,127,74,0.3)",
    color: T.amber,
    fontFamily: T.mono,
    fontSize: 9, fontWeight: 700,
    padding: "3px 8px", borderRadius: 2,
    letterSpacing: "0.06em",
    ...style,
  }}>
    ♫ {value}%
  </span>
);

// ── WishlistButton ───────────────────────────────────────────────────────────
export const WishlistButton = ({ active, onClick, style = {} }) => (
  <button
    onClick={onClick}
    className="pressable"
    style={{
      width: 32, height: 32,
      border: `1px solid ${active ? T.amber : T.glassBorder}`,
      background: active ? "rgba(193,127,74,0.18)" : T.glass,
      display: "flex", alignItems: "center", justifyContent: "center",
      cursor: "pointer", flexShrink: 0, borderRadius: 2,
      ...style,
    }}
  >
    <svg width="13" height="13" viewBox="0 0 24 24"
      fill={active ? T.amber : "none"}
      stroke={active ? T.amber : T.faded}
      strokeWidth="2"
    >
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
    </svg>
  </button>
);

// ── TabBar (FloatingDock) ────────────────────────────────────────────────────
// After Dark: centered glass pill, floating 22px above bottom, no labels.
const DOCK_DEFS = [
  {
    id: "home",
    icon: <><polyline points="3 10 12 3 21 10" strokeLinejoin="round"/><rect x="5" y="10" width="14" height="11" rx="1"/></>,
  },
  {
    id: "explore",
    icon: <><circle cx="11" cy="11" r="7.5"/><line x1="17" y1="17" x2="21" y2="21"/></>,
  },
  {
    id: "guide",
    icon: <><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></>,
  },
  {
    id: "calendar",
    icon: <><rect x="3" y="4" width="18" height="17" rx="1"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="16" y1="2" x2="16" y2="6"/></>,
  },
  {
    id: "profile",
    icon: <><circle cx="12" cy="8" r="4"/><path d="M4 20a8 8 0 0116 0"/></>,
  },
];

export const TabBar = ({ activeTab, onTabChange }) => (
  <div style={{
    position: "absolute",
    bottom: 0, left: 0, right: 0,
    background: "rgba(20,17,14,0.96)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderTop: "1px solid rgba(244,239,231,0.07)",
    paddingTop: 8,
    paddingBottom: 18,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    zIndex: 90,
  }}>
    {DOCK_DEFS.map(({ id, icon }) => {
      const isActive = activeTab === id;
      return (
        <button
          key={id}
          onClick={() => onTabChange(id)}
          className="pressable"
          style={{
            width: 44, height: 36,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            gap: 5,
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          {/* Active indicator line above icon */}
          <div style={{
            width: 18, height: 2,
            borderRadius: 1,
            background: isActive ? "#C17F4A" : "transparent",
            transition: "background 0.2s ease",
          }} />
          <svg
            width="20" height="20" viewBox="0 0 24 24"
            fill="none"
            stroke={isActive ? "#C17F4A" : "#8A8278"}
            strokeWidth={isActive ? "1.75" : "1.25"}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transition: "stroke 0.2s ease" }}
          >
            {icon}
          </svg>
        </button>
      );
    })}
  </div>
);
