import React from "react";
import { colors, fonts } from "../theme.jsx";

// ============================================================
// Phone Frame
// ============================================================
export const PhoneFrame = ({ children }) => (
  <div style={{
    width: 375, height: 812, background: colors.cream,
    borderRadius: 50, border: `3px solid ${colors.border}`,
    overflow: "hidden", position: "relative",
    boxShadow: "0 25px 80px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)",
  }}>
    <div style={{
      position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
      width: 160, height: 34, background: colors.ink,
      borderRadius: "0 0 20px 20px", zIndex: 100,
    }} />
    <StatusBar />
    {children}
  </div>
);

// ============================================================
// Status Bar
// ============================================================
export const StatusBar = () => (
  <div style={{
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "14px 28px 0", fontSize: 12, fontWeight: 600,
    color: colors.ink, position: "relative", zIndex: 50, background: colors.cream,
  }}>
    <span>9:41</span>
    <span style={{ display: "flex", gap: 5, alignItems: "center" }}>
      <svg width="15" height="11" viewBox="0 0 15 11" fill={colors.ink}><rect x="0" y="4" width="3" height="7" rx="1"/><rect x="4" y="2" width="3" height="9" rx="1"/><rect x="8" y="0" width="3" height="11" rx="1"/><rect x="12" y="3" width="3" height="8" rx="1" opacity="0.3"/></svg>
      <svg width="15" height="11" viewBox="0 0 15 11" fill={colors.ink}><path d="M7.5 2C10.5 2 13 3.5 14 5L7.5 11 1 5C2 3.5 4.5 2 7.5 2Z" opacity="0.9"/></svg>
      <svg width="22" height="11" viewBox="0 0 22 11" fill="none"><rect x="0" y="0" width="19" height="11" rx="2" stroke={colors.ink} strokeWidth="1"/><rect x="20" y="3" width="2" height="5" rx="1" fill={colors.ink} opacity="0.4"/><rect x="1.5" y="1.5" width="13" height="8" rx="1" fill="#4ADE80"/></svg>
    </span>
  </div>
);

// ============================================================
// Scrollable Screen
// ============================================================
export const Screen = ({ children }) => (
  <div style={{
    position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
    overflowY: "auto", overflowX: "hidden",
    padding: "48px 20px 100px", background: colors.cream, scrollbarWidth: "none",
  }}>
    {children}
  </div>
);

// ============================================================
// Section Header
// ============================================================
export const SectionHeader = ({ title, link }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
    <span style={{ fontFamily: fonts.display, fontSize: 18, fontWeight: 700, color: colors.ink, fontStyle: "italic" }}>{title}</span>
    {link && <span style={{ fontFamily: fonts.mono, fontSize: 10, color: colors.amber, letterSpacing: 1, textTransform: "uppercase", cursor: "pointer" }}>{link}</span>}
  </div>
);

// ============================================================
// Divider
// ============================================================
export const Divider = () => <div style={{ height: 1, background: colors.border, margin: "22px 0" }} />;

// ============================================================
// Horizontal Scroll
// ============================================================
export const HScroll = ({ children, gap = 12, style = {} }) => (
  <div style={{ display: "flex", overflowX: "auto", scrollbarWidth: "none", paddingBottom: 4, gap, ...style }}>
    {children}
  </div>
);

// ============================================================
// Notification Bell
// ============================================================
export const NotifBell = () => (
  <div style={{ position: "relative" }}>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.brownMid} strokeWidth="1.5">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/>
    </svg>
    <div style={{ position: "absolute", top: -1, right: -1, width: 7, height: 7, background: colors.amber, borderRadius: "50%", border: `1.5px solid ${colors.cream}` }} />
  </div>
);

// ============================================================
// User Avatar
// ============================================================
export const UserAvatar = ({ initial = "A", size = 32 }) => (
  <div style={{
    width: size, height: size, borderRadius: "50%", background: colors.ink,
    display: "flex", alignItems: "center", justifyContent: "center",
  }}>
    <span style={{ fontFamily: fonts.display, fontSize: size * 0.44, fontWeight: 700, color: colors.gold, fontStyle: "italic" }}>{initial}</span>
  </div>
);

// ============================================================
// Countdown Badge
// ============================================================
export const CountdownBadge = ({ days }) => (
  <div style={{
    width: 44, height: 44, background: colors.ink, borderRadius: 12,
    display: "flex", flexDirection: "column", alignItems: "center",
    justifyContent: "center", flexShrink: 0,
  }}>
    <span style={{ fontFamily: fonts.display, fontSize: 16, fontWeight: 800, color: colors.gold, lineHeight: 1 }}>{days}</span>
    <span style={{ fontFamily: fonts.mono, fontSize: 7, color: "#999", letterSpacing: 1, textTransform: "uppercase" }}>days</span>
  </div>
);

// ============================================================
// Friend Activity Row
// ============================================================
export const FriendRow = ({ name, action, event, time, color }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0" }}>
    <div style={{
      width: 34, height: 34, borderRadius: "50%", background: color,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: fonts.display, fontSize: 14, fontWeight: 700, color: "#fff",
    }}>{name[0]}</div>
    <p style={{ flex: 1, fontSize: 12, color: colors.ink, lineHeight: 1.5 }}>
      <strong>{name}</strong>{" "}
      <span style={{ color: colors.brownMid }}>{action}</span>{" "}
      <span style={{ fontWeight: 600 }}>{event}</span>
    </p>
    <span style={{ fontFamily: fonts.mono, fontSize: 10, color: colors.faded }}>{time}</span>
  </div>
);

// ============================================================
// Genre / Category Chip
// ============================================================
export const Chip = ({ label, active, onClick }) => (
  <button onClick={onClick} style={{
    flexShrink: 0, padding: "7px 16px", borderRadius: 20,
    fontFamily: fonts.body, fontSize: 12, fontWeight: 600,
    border: `1.5px solid ${active ? colors.ink : colors.border}`,
    background: active ? colors.ink : colors.white,
    color: active ? colors.gold : colors.brownMid,
    cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap",
  }}>
    {label}
  </button>
);

// ============================================================
// Tag Pill
// ============================================================
export const TagPill = ({ children }) => (
  <span style={{
    background: colors.warmGray, color: colors.brownMid,
    fontFamily: fonts.mono, fontSize: 9, fontWeight: 500,
    padding: "3px 8px", borderRadius: 20, letterSpacing: 0.5,
  }}>
    {children}
  </span>
);

// ============================================================
// Match Score Badge
// ============================================================
export const MatchScore = ({ value, style = {} }) => (
  <span style={{
    display: "inline-flex", alignItems: "center", gap: 4,
    background: colors.ink, color: colors.gold,
    fontFamily: fonts.mono, fontSize: 10, fontWeight: 600,
    padding: "3px 8px", borderRadius: 20, ...style,
  }}>
    ♫ {value}%
  </span>
);

// ============================================================
// Wishlist Heart Button
// ============================================================
export const WishlistButton = ({ active, onClick, style = {} }) => (
  <button onClick={onClick} style={{
    width: 30, height: 30, borderRadius: "50%",
    border: `1.5px solid ${active ? colors.amber : "#E0D8CC"}`,
    background: active ? colors.amber : colors.cream,
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer", transition: "all 0.2s", flexShrink: 0, ...style,
  }}>
    <svg width="14" height="14" viewBox="0 0 24 24" fill={active ? "#fff" : "none"} stroke={active ? "#fff" : colors.brownMid} strokeWidth="2">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
    </svg>
  </button>
);

// ============================================================
// Tab Bar
// ============================================================
const TAB_ICONS = {
  home: '<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>',
  explore: '<circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>',
  guide: '<path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  profile: '<path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>',
};

const TAB_LABELS = { home: "Home", explore: "Explore", guide: "The Guide", calendar: "Calendar", profile: "Profile" };

export const TabBar = ({ activeTab, onTabChange }) => (
  <div style={{
    position: "absolute", bottom: 0, left: 0, right: 0, height: 80,
    background: "rgba(250,246,241,0.97)", backdropFilter: "blur(20px)",
    borderTop: `1px solid ${colors.border}`, display: "flex",
    alignItems: "center", justifyContent: "space-around",
    padding: "0 12px 20px", zIndex: 90,
  }}>
    {Object.keys(TAB_ICONS).map((id) => {
      const isActive = activeTab === id;
      return (
        <button key={id} onClick={() => onTabChange(id)} style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          gap: 4, background: "none", border: "none", cursor: "pointer",
          color: isActive ? colors.ink : colors.faded,
          fontFamily: fonts.body, fontSize: 10, fontWeight: 500,
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24"
            fill={isActive ? colors.ink : "none"}
            stroke={isActive ? colors.ink : "currentColor"}
            strokeWidth="1.5"
            dangerouslySetInnerHTML={{ __html: TAB_ICONS[id] }}
          />
          {TAB_LABELS[id]}
        </button>
      );
    })}
  </div>
);
