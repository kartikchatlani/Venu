import { colors } from "../../theme.jsx";
import { TagPill, WishlistButton } from "../index.jsx";

const EventImage = ({ src, width, height, style = {} }) => {
  if (!src) return <div style={{ width, height, background: `linear-gradient(135deg, ${colors.warmGray}, ${colors.border})`, flexShrink: 0, ...style }} />;
  return <img src={src} alt="" style={{ width, height, objectFit: "cover", flexShrink: 0, ...style }} />;
};

export const EventCard = ({ event, onSelectEvent, wishlistIds, toggleWishlist }) => {
  return (
    <div onClick={() => onSelectEvent(event)} style={{ minWidth: 240, background: colors.white, borderRadius: 16, overflow: "hidden", flexShrink: 0, boxShadow: "0 2px 8px rgba(28,25,21,0.06)", border: "1px solid rgba(28,25,21,0.04)", cursor: "pointer" }}>
      <EventImage src={event.img} width={240} height={120} style={{ display: "block" }} />
      <div style={{ padding: 14 }}>
        <p style={{ fontSize: 14, fontWeight: 700, color: colors.ink, marginBottom: 3 }}>{event.artist}</p>
        <p style={{ fontSize: 11, color: colors.brownMid, marginBottom: 8 }}>{event.venue} · {event.date}</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <TagPill>{event.genre}</TagPill>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: colors.ink }}>{event.price || "TBA"}</span>
            <WishlistButton active={wishlistIds.has(event.id)} onClick={(e) => { e.stopPropagation(); toggleWishlist(event); }} />
          </div>
        </div>
      </div>
    </div>
  );
};
