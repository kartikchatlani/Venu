import { useState } from "react";
import { notifications as initialNotifs } from "../data/index.jsx";

const P = "#F4EFE7";
const A = "#C17F4A";
const E = "#D94F2A";
const F = "#8A8278";
const D = "'Fraunces', Georgia, serif";
const M = "'JetBrains Mono', monospace";
const glass = "rgba(244,239,231,0.05)";
const glassBorder = "rgba(244,239,231,0.10)";

const TypeIcon = ({ type, unread }) => {
  const bg = unread ? "rgba(193,127,74,0.18)" : glass;
  const border = unread ? "1px solid rgba(193,127,74,0.35)" : `1px solid ${glassBorder}`;
  const stroke = unread ? A : F;

  const icon = {
    reminder: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8">
        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/>
      </svg>
    ),
    friend: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
    presale: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={unread ? E : F} strokeWidth="1.8">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    match: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8">
        <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
      </svg>
    ),
  };

  return (
    <div style={{
      width: 38, height: 38, borderRadius: 4, flexShrink: 0,
      background: bg, border,
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      {icon[type] || icon.reminder}
    </div>
  );
};

export const NotificationsPanel = ({ isOpen, onClose }) => {
  const [notifs, setNotifs] = useState(initialNotifs);

  const unreadCount = notifs.filter((n) => n.unread).length;
  const markAllRead = () => setNotifs((prev) => prev.map((n) => ({ ...n, unread: false })));
  const markRead = (id) => setNotifs((prev) => prev.map((n) => n.id === id ? { ...n, unread: false } : n));

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: "absolute", inset: 0, zIndex: 200,
          background: "rgba(0,0,0,0.6)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.25s ease",
        }}
      />

      {/* Panel */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, zIndex: 201,
        background: "rgba(20,17,14,0.96)",
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        borderBottom: `1px solid ${glassBorder}`,
        borderBottomLeftRadius: 28, borderBottomRightRadius: 28,
        boxShadow: "0 16px 48px rgba(0,0,0,0.6)",
        transform: isOpen ? "translateY(0)" : "translateY(-110%)",
        transition: "transform 0.32s cubic-bezier(0.32,0,0.67,0)",
        maxHeight: "75%",
        display: "flex", flexDirection: "column",
      }}>

        {/* Header */}
        <div style={{
          padding: "22px 20px 16px",
          display: "flex", justifyContent: "space-between", alignItems: "flex-start",
          borderBottom: `1px solid ${glassBorder}`,
        }}>
          <div>
            <div style={{ fontFamily: D, fontSize: 24, fontWeight: 700, color: P, lineHeight: 1, letterSpacing: "-0.01em" }}>
              Notifications
            </div>
            {unreadCount > 0 ? (
              <div style={{ fontFamily: M, fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: A, marginTop: 5 }}>
                {unreadCount} unread
              </div>
            ) : (
              <div style={{ fontFamily: M, fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: F, marginTop: 5 }}>
                All caught up
              </div>
            )}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {unreadCount > 0 && (
              <button onClick={markAllRead} style={{
                fontFamily: M, fontSize: 9, letterSpacing: "0.08em", textTransform: "uppercase",
                color: A, background: "none", border: "none", cursor: "pointer", padding: 0,
              }}>
                Mark all read
              </button>
            )}
            <button onClick={onClose} style={{
              width: 32, height: 32, borderRadius: 2,
              border: `1px solid ${glassBorder}`, background: glass,
              display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
            }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={F} strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

        {/* List */}
        <div style={{ overflowY: "auto", scrollbarWidth: "none", paddingBottom: 8 }}>
          {notifs.map((n, i) => (
            <div
              key={n.id}
              onClick={() => markRead(n.id)}
              style={{
                display: "flex", alignItems: "flex-start", gap: 12,
                padding: "14px 20px",
                background: n.unread ? "rgba(193,127,74,0.05)" : "transparent",
                borderBottom: i < notifs.length - 1 ? `1px solid ${glassBorder}` : "none",
                cursor: "pointer",
              }}
            >
              <TypeIcon type={n.type} unread={n.unread} />

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 700, color: P, marginBottom: 3, lineHeight: "17px" }}>
                  {n.title}
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: F, lineHeight: 1.45 }}>
                  {n.body}
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, flexShrink: 0 }}>
                <span style={{ fontFamily: M, fontSize: 9, color: F, letterSpacing: "0.04em" }}>{n.time}</span>
                {n.unread && (
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: A, boxShadow: "0 0 6px rgba(193,127,74,0.6)" }} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
