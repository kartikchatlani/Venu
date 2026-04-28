import { useState } from "react";
import { colors, fonts } from "../theme.jsx";
import { notifications as initialNotifs } from "../data/index.jsx";

const TYPE_ICON = {
  reminder: "🎸",
  friend: "👥",
  presale: "⚡",
  match: "✨",
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
          background: "rgba(28,25,21,0.4)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.25s ease",
        }}
      />

      {/* Panel — slides down from top */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, zIndex: 201,
        background: colors.cream,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        boxShadow: "0 8px 32px rgba(28,25,21,0.18)",
        transform: isOpen ? "translateY(0)" : "translateY(-110%)",
        transition: "transform 0.32s cubic-bezier(0.32,0,0.67,0)",
        maxHeight: "75%",
        display: "flex",
        flexDirection: "column",
      }}>
        {/* Header */}
        <div style={{ padding: "20px 20px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${colors.border}` }}>
          <div>
            <h2 style={{ fontFamily: fonts.display, fontSize: 22, fontWeight: 800, color: colors.ink, fontStyle: "italic", lineHeight: 1 }}>Notifications</h2>
            {unreadCount > 0 && (
              <p style={{ fontFamily: fonts.mono, fontSize: 9, letterSpacing: 1, textTransform: "uppercase", color: colors.amber, marginTop: 4 }}>{unreadCount} unread</p>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {unreadCount > 0 && (
              <button onClick={markAllRead} style={{ fontFamily: fonts.mono, fontSize: 9, letterSpacing: 1, textTransform: "uppercase", color: colors.brownMid, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                Mark all read
              </button>
            )}
            <button onClick={onClose} style={{ width: 30, height: 30, borderRadius: "50%", border: `1px solid ${colors.border}`, background: colors.warmGray, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={colors.brownMid} strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* List */}
        <div style={{ overflowY: "auto", padding: "8px 0 16px" }}>
          {notifs.map((n) => (
            <div
              key={n.id}
              onClick={() => markRead(n.id)}
              style={{
                display: "flex", alignItems: "flex-start", gap: 12,
                padding: "12px 20px",
                background: n.unread ? "rgba(193,127,74,0.06)" : "transparent",
                cursor: "pointer",
                borderBottom: `1px solid ${colors.border}`,
                position: "relative",
              }}
            >
              <div style={{ width: 38, height: 38, borderRadius: 12, background: n.unread ? colors.ink : colors.warmGray, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, flexShrink: 0 }}>
                {TYPE_ICON[n.type]}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: colors.ink, marginBottom: 2 }}>{n.title}</p>
                <p style={{ fontSize: 12, color: colors.brownMid, lineHeight: 1.4 }}>{n.body}</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, flexShrink: 0 }}>
                <span style={{ fontFamily: fonts.mono, fontSize: 9, color: colors.faded }}>{n.time}</span>
                {n.unread && <div style={{ width: 7, height: 7, borderRadius: "50%", background: colors.amber }} />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
