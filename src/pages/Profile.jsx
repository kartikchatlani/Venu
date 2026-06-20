import React, { useState } from "react";
import { Screen, HScroll } from "../components/index.jsx";
import { MonoMeta } from "../components/marks/index.jsx";
import {
  userProfile, passportStats, badges, crews,
  favoriteArtists, favoriteVenues, recentReviews,
  friendsList, friendSearchResults,
} from "../data/index.jsx";

const P = "#F4EFE7";
const A = "#C17F4A";
const E = "#D94F2A";
const F = "#8A8278";
const D = "'Fraunces', Georgia, serif";
const M = "'JetBrains Mono', monospace";
const glass = "rgba(244,239,231,0.05)";
const glassBorder = "rgba(244,239,231,0.10)";

// Dark input for sub-views
const darkInput = {
  width: "100%", paddingLeft: 22, paddingTop: 9, paddingBottom: 9,
  background: "transparent", border: "none",
  borderBottom: "1px solid rgba(244,239,231,0.15)",
  fontFamily: M, fontSize: 12, letterSpacing: "0.04em",
  color: P, outline: "none",
};

// ── Sub-views ────────────────────────────────────────────────────────────────

const AddFriendsView = ({ onClose }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Name");
  const [requested, setRequested] = useState(new Set());
  const searchFilters = ["Name", "Username", "Contacts", "QR"];
  const showResults = search.length > 0;
  const toggleRequest = (name) => setRequested((prev) => {
    const next = new Set(prev);
    next.has(name) ? next.delete(name) : next.add(name);
    return next;
  });

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div style={{ fontFamily: D, fontSize: 28, fontWeight: 700, color: P }}>Add Friends</div>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: M, fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: F }}>Close</button>
      </div>
      <div style={{ position: "relative", marginBottom: 14 }}>
        <svg style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)" }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={F} strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
        <input autoFocus value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or username…" style={darkInput} />
      </div>
      <div style={{ display: "flex", gap: 6, marginBottom: 20, paddingBottom: 16, borderBottom: "1px solid rgba(244,239,231,0.1)" }}>
        {searchFilters.map((f) => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: "5px 12px", borderRadius: 20, cursor: "pointer",
            fontFamily: M, fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
            background: filter === f ? A : glass,
            border: filter === f ? "none" : `1px solid ${glassBorder}`,
            color: filter === f ? "#14110F" : F,
          }}>{f}</button>
        ))}
      </div>
      {showResults ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 22 }}>
          {friendSearchResults.map((f) => {
            const isRequested = requested.has(f.name);
            return (
              <div key={f.name} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(193,127,74,0.15)", border: "1px solid rgba(193,127,74,0.35)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: D, fontSize: 14, fontWeight: 700, color: A, flexShrink: 0 }}>{f.initials[0]}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: D, fontSize: 15, fontWeight: 700, color: P, marginBottom: 2 }}>{f.name}</div>
                  <div style={{ fontFamily: M, fontSize: 9, color: F, textTransform: "uppercase", letterSpacing: "0.06em" }}>{f.username} · {f.mutual}</div>
                </div>
                <button onClick={() => toggleRequest(f.name)} style={{
                  padding: "6px 14px", borderRadius: 20, fontSize: 9, fontWeight: 700,
                  fontFamily: M, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer",
                  border: isRequested ? `1px solid ${glassBorder}` : "none",
                  background: isRequested ? glass : A,
                  color: isRequested ? F : "#14110F", flexShrink: 0,
                }}>{isRequested ? "Requested" : "Add"}</button>
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "32px 0" }}>
          <div style={{ fontFamily: M, fontSize: 10, color: F, textTransform: "uppercase", letterSpacing: "0.06em" }}>Start typing to find friends</div>
        </div>
      )}
      <div style={{ background: glass, border: `1px solid ${glassBorder}`, borderRadius: 16, padding: "14px 16px", display: "flex", gap: 14, alignItems: "center" }}>
        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(193,127,74,0.15)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={A} strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75M9 11a4 4 0 100-8 4 4 0 000 8z"/></svg>
        </div>
        <div>
          <div style={{ fontFamily: M, fontSize: 10, color: A, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 2 }}>Sync your contacts</div>
          <div style={{ fontFamily: M, fontSize: 9, color: F, textTransform: "uppercase", letterSpacing: "0.06em" }}>Find friends already on Venu</div>
        </div>
      </div>
    </>
  );
};

const FriendsView = ({ onClose, onAddFriends }) => {
  const [search, setSearch] = useState("");
  const filtered = search ? friendsList.filter((f) => f.name.toLowerCase().includes(search.toLowerCase())) : friendsList;
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div style={{ fontFamily: D, fontSize: 28, fontWeight: 700, color: P }}>Friends</div>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: M, fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: F }}>← Back</button>
      </div>
      <button onClick={onAddFriends} style={{
        display: "flex", alignItems: "center", gap: 6, background: A, color: "#14110F",
        border: "none", padding: "8px 16px", borderRadius: 20,
        fontFamily: M, fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
        cursor: "pointer", marginBottom: 20,
      }}>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        Add Friends
      </button>
      <div style={{ position: "relative", marginBottom: 20 }}>
        <svg style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)" }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={F} strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search your friends" style={darkInput} />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {filtered.length === 0 ? (
          <div style={{ fontFamily: M, fontSize: 10, color: F, textTransform: "uppercase", letterSpacing: "0.06em" }}>No friends found.</div>
        ) : filtered.map((f, i) => (
          <div key={f.name} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < filtered.length - 1 ? "1px solid rgba(244,239,231,0.08)" : "none" }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(193,127,74,0.15)", border: "1px solid rgba(193,127,74,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: D, fontSize: 14, fontWeight: 700, color: A, flexShrink: 0 }}>{f.initials[0]}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: D, fontSize: 15, fontWeight: 700, color: P, marginBottom: 2 }}>{f.name}</div>
              <div style={{ fontFamily: M, fontSize: 9, color: F, textTransform: "uppercase", letterSpacing: "0.06em" }}>{f.status}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const ReviewsView = ({ reviews, onClose, onEdit, onDelete, editingIndex, editArtist, setEditArtist, editStars, setEditStars, editText, setEditText, onSaveEdit, onCancelEdit }) => (
  <>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
      <div style={{ fontFamily: D, fontSize: 28, fontWeight: 700, color: P }}>Reviews</div>
      <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: M, fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: F }}>← Back</button>
    </div>
    {reviews.length === 0 ? (
      <div style={{ fontFamily: M, fontSize: 10, color: F, textTransform: "uppercase", letterSpacing: "0.06em", textAlign: "center", marginTop: 32 }}>No reviews yet. Write your first one!</div>
    ) : reviews.map((r, i) => (
      <div key={i} style={{ borderBottom: i < reviews.length - 1 ? "1px solid rgba(244,239,231,0.08)" : "none", paddingBottom: 16, marginBottom: 16 }}>
        {editingIndex === i ? (
          <>
            <input value={editArtist} onChange={(e) => setEditArtist(e.target.value)} style={{ width: "100%", padding: "8px 0", background: "transparent", border: "none", borderBottom: "1px solid rgba(244,239,231,0.2)", fontFamily: D, fontSize: 15, fontWeight: 700, color: P, outline: "none", marginBottom: 10, boxSizing: "border-box" }} />
            <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
              {[1,2,3,4,5].map((n) => <span key={n} onClick={() => setEditStars(n)} style={{ fontSize: 20, cursor: "pointer", color: n <= editStars ? A : "rgba(244,239,231,0.15)", lineHeight: 1 }}>★</span>)}
            </div>
            <textarea value={editText} onChange={(e) => setEditText(e.target.value)} rows={3} style={{ width: "100%", padding: "8px 0", background: "transparent", border: "none", borderBottom: "1px solid rgba(244,239,231,0.2)", fontFamily: D, fontSize: 13, color: P, outline: "none", resize: "none", marginBottom: 12, boxSizing: "border-box", lineHeight: 1.5 }} />
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={onCancelEdit} style={{ flex: 1, padding: "8px 0", borderRadius: 20, border: `1px solid ${glassBorder}`, background: "transparent", fontFamily: M, fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: F, cursor: "pointer" }}>Cancel</button>
              <button onClick={onSaveEdit} style={{ flex: 2, padding: "8px 0", borderRadius: 20, border: "none", background: A, fontFamily: M, fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#14110F", cursor: "pointer" }}>Save Changes</button>
            </div>
          </>
        ) : (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
              <div style={{ fontFamily: D, fontSize: 15, fontWeight: 700, color: P, flex: 1 }}>{r.artist}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontFamily: M, fontSize: 11, color: A, letterSpacing: 1 }}>{r.stars}</span>
                <button onClick={() => onEdit(i)} style={{ background: "none", border: "none", cursor: "pointer", padding: 2, color: F }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </button>
                <button onClick={() => onDelete(i)} style={{ background: "none", border: "none", cursor: "pointer", padding: 2, color: E }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
                </button>
              </div>
            </div>
            <div style={{ fontFamily: M, fontSize: 9, color: F, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>{r.date}</div>
            {r.text && <div style={{ fontFamily: D, fontSize: 13, color: F, lineHeight: "18px" }}>{r.text}</div>}
          </>
        )}
      </div>
    ))}
  </>
);

// ── Crew Detail View ─────────────────────────────────────────────────────────

const PLATFORMS = {
  spotify:     { label: "Spotify",      color: "#1DB954", bg: "rgba(29,185,84,0.1)",  border: "rgba(29,185,84,0.3)" },
  apple:       { label: "Apple Music",  color: "#FC3C44", bg: "rgba(252,60,68,0.1)",  border: "rgba(252,60,68,0.3)" },
  youtube:     { label: "YouTube Music",color: "#FF0000", bg: "rgba(255,0,0,0.1)",    border: "rgba(255,0,0,0.3)"  },
};

const detectPlatform = (url) => {
  if (!url) return null;
  if (url.includes("spotify.com"))    return "spotify";
  if (url.includes("music.apple.com"))return "apple";
  if (url.includes("youtube.com") || url.includes("youtu.be")) return "youtube";
  return null;
};

const CrewDetailView = ({ crew, onClose }) => {
  const [pollVotes, setPollVotes] = useState({});
  const [playlist, setPlaylist] = useState(crew.playlist || null);
  const [addingPlaylist, setAddingPlaylist] = useState(false);
  const [playlistInput, setPlaylistInput] = useState("");

  const vote = (pollId, optionIdx) => {
    if (pollVotes[pollId] != null) return;
    setPollVotes((prev) => ({ ...prev, [pollId]: optionIdx }));
  };

  const submitPlaylist = () => {
    const trimmed = playlistInput.trim();
    if (!trimmed) return;
    const platform = detectPlatform(trimmed);
    const label = PLATFORMS[platform]?.label || "Playlist";
    setPlaylist({ name: `${crew.name} Playlist`, url: trimmed, platform });
    setAddingPlaylist(false);
    setPlaylistInput("");
  };

  return (
    <>
      {/* Cover banner — breaks out of Screen padding */}
      <div style={{
        position: "relative", height: 190,
        marginLeft: -22, marginRight: -22, marginTop: -8,
        overflow: "hidden",
        background: "repeating-linear-gradient(135deg, #2a221a, #2a221a 10px, #201913 10px, #201913 20px)",
      }}>
        {crew.cover && (
          <img src={crew.cover} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.75 }} />
        )}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(12,10,8,0.5) 0%, transparent 30%, rgba(12,10,8,0.85) 100%)" }} />
        {/* Back */}
        <button onClick={onClose} style={{
          position: "absolute", top: 14, left: 14,
          background: "rgba(12,10,8,0.65)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
          border: "1px solid rgba(244,239,231,0.18)", borderRadius: 20,
          padding: "6px 14px", cursor: "pointer",
          display: "flex", alignItems: "center", gap: 6,
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={P} strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
          <span style={{ fontFamily: M, fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: P }}>Back</span>
        </button>
        {/* Crew name */}
        <div style={{ position: "absolute", bottom: 18, left: 18, right: 18 }}>
          <div style={{ fontFamily: D, fontSize: 32, fontWeight: 700, color: P, lineHeight: "34px", marginBottom: 4 }}>{crew.name}</div>
          <div style={{ fontFamily: M, fontSize: 9, color: "rgba(244,239,231,0.6)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            {crew.memberCount} Members
          </div>
        </div>
      </div>

      {/* ── Members ── */}
      <div style={{ marginTop: 22, marginBottom: 24 }}>
        <div style={{ fontFamily: M, fontSize: 9, color: F, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14 }}>Members</div>
        <div style={{ display: "flex", gap: 14, overflowX: "auto", scrollbarWidth: "none", marginLeft: -22, marginRight: -22, paddingLeft: 22, paddingRight: 22 }}>
          {crew.members.map((mem, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, flexShrink: 0 }}>
              <div style={{
                width: 52, height: 52, borderRadius: "50%",
                background: `${mem.color}22`,
                border: `1.5px solid ${mem.color}88`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: D, fontSize: 18, fontWeight: 700, color: mem.color,
              }}>{mem.initial}</div>
              <div style={{ fontFamily: D, fontSize: 11, fontWeight: 700, color: P, textAlign: "center", maxWidth: 60, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{mem.name.split(" ")[0]}</div>
              <div style={{
                fontFamily: M, fontSize: 7.5, letterSpacing: "0.06em", textTransform: "uppercase",
                color: mem.status === "going" ? A : mem.status === "maybe" ? F : F,
                border: `1px solid ${mem.status === "going" ? "rgba(193,127,74,0.35)" : glassBorder}`,
                padding: "2px 7px", borderRadius: 20,
              }}>{mem.status || "—"}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ height: 1, background: glassBorder, marginBottom: 22 }} />

      {/* ── Upcoming Together ── */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontFamily: M, fontSize: 9, color: F, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14 }}>Upcoming Together</div>
        {crew.upcomingEvents.map((ev, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "12px 14px", marginBottom: 8,
            background: glass, border: `1px solid ${glassBorder}`, borderRadius: 14,
          }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(193,127,74,0.1)", border: `1px solid rgba(193,127,74,0.25)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={A} strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: D, fontSize: 15, fontWeight: 700, color: P, marginBottom: 2 }}>{ev.artist}</div>
              <div style={{ fontFamily: M, fontSize: 9, color: F, textTransform: "uppercase", letterSpacing: "0.06em" }}>{ev.venue} · {ev.date}</div>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div style={{ fontFamily: D, fontSize: 16, fontWeight: 700, color: A }}>{ev.goingCount}</div>
              <div style={{ fontFamily: M, fontSize: 7.5, color: F, textTransform: "uppercase", letterSpacing: "0.06em" }}>Going</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ height: 1, background: glassBorder, marginBottom: 22 }} />

      {/* ── Activity ── */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontFamily: M, fontSize: 9, color: F, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14 }}>Activity</div>
        {crew.activity.map((a, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, paddingBottom: 14, marginBottom: i < crew.activity.length - 1 ? 4 : 0, borderBottom: i < crew.activity.length - 1 ? `1px solid rgba(244,239,231,0.06)` : "none" }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: glass, border: `1px solid ${glassBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: D, fontSize: 11, fontWeight: 700, color: A, flexShrink: 0 }}>
              {a.member[0]}
            </div>
            <div style={{ flex: 1 }}>
              <span style={{ fontFamily: M, fontSize: 10, fontWeight: 700, color: P, textTransform: "uppercase", letterSpacing: "0.04em" }}>{a.member} </span>
              <span style={{ fontFamily: M, fontSize: 10, color: F }}>{a.action} </span>
              <span style={{ fontFamily: D, fontSize: 13, fontWeight: 600, color: A }}>{a.event}</span>
            </div>
            <div style={{ fontFamily: M, fontSize: 8.5, color: F, letterSpacing: "0.04em", flexShrink: 0, marginTop: 2 }}>{a.time}</div>
          </div>
        ))}
      </div>

      <div style={{ height: 1, background: glassBorder, marginBottom: 22 }} />

      {/* ── Polls ── */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontFamily: M, fontSize: 9, color: F, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14 }}>Polls</div>
        {crew.polls.map((poll) => {
          const voted = pollVotes[poll.id];
          const total = poll.options.reduce((s, o) => s + o.votes + (voted != null ? 0 : 0), 0);
          const liveTotals = poll.options.map((o, i) => o.votes + (voted === i ? 1 : 0));
          const liveTotal = liveTotals.reduce((s, v) => s + v, 0);
          return (
            <div key={poll.id} style={{ background: glass, border: `1px solid ${glassBorder}`, borderRadius: 16, padding: "16px 16px 14px", marginBottom: 12 }}>
              <div style={{ fontFamily: D, fontSize: 16, fontWeight: 700, color: P, marginBottom: 14 }}>{poll.question}</div>
              {poll.options.map((opt, i) => {
                const lv = liveTotals[i];
                const pct = liveTotal > 0 ? Math.round((lv / liveTotal) * 100) : 0;
                const isVoted = voted === i;
                return (
                  <button key={i} onClick={() => vote(poll.id, i)} style={{
                    display: "flex", alignItems: "center", gap: 10,
                    width: "100%", background: "none", border: "none", cursor: voted != null ? "default" : "pointer",
                    padding: "8px 0", marginBottom: i < poll.options.length - 1 ? 6 : 0, textAlign: "left",
                  }}>
                    {/* Radio dot */}
                    <div style={{
                      width: 16, height: 16, borderRadius: "50%", flexShrink: 0,
                      border: `2px solid ${isVoted ? A : glassBorder}`,
                      background: isVoted ? "rgba(193,127,74,0.2)" : "transparent",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      {isVoted && <div style={{ width: 6, height: 6, borderRadius: "50%", background: A }} />}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: M, fontSize: 10, color: isVoted ? A : P, fontWeight: isVoted ? 700 : 400, letterSpacing: "0.04em", marginBottom: voted != null ? 4 : 0 }}>
                        {opt.label}
                      </div>
                      {voted != null && (
                        <div style={{ height: 3, borderRadius: 2, background: glassBorder, overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${pct}%`, background: isVoted ? A : "rgba(244,239,231,0.2)", borderRadius: 2, transition: "width 0.5s ease" }} />
                        </div>
                      )}
                    </div>
                    {voted != null && (
                      <div style={{ fontFamily: M, fontSize: 9, color: isVoted ? A : F, fontWeight: 700, flexShrink: 0, minWidth: 32, textAlign: "right" }}>{pct}%</div>
                    )}
                  </button>
                );
              })}
              {voted == null && (
                <div style={{ fontFamily: M, fontSize: 8.5, color: F, textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 10 }}>
                  {total} vote{total !== 1 ? "s" : ""} · Tap to vote
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ height: 1, background: glassBorder, marginBottom: 22 }} />

      {/* ── Playlist ── */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontFamily: M, fontSize: 9, color: F, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14 }}>Playlist</div>

        {playlist ? (() => {
          const plat = PLATFORMS[playlist.platform] || { label: "Playlist", color: A, bg: "rgba(193,127,74,0.1)", border: "rgba(193,127,74,0.3)" };
          return (
            <div style={{ display: "flex", alignItems: "center", gap: 12, background: plat.bg, border: `1px solid ${plat.border}`, borderRadius: 14, padding: "14px 16px" }}>
              {/* Music note icon */}
              <div style={{ width: 40, height: 40, borderRadius: 10, background: `${plat.color}22`, border: `1px solid ${plat.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={plat.color} strokeWidth="1.8">
                  <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
                </svg>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: D, fontSize: 15, fontWeight: 700, color: P, marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{playlist.name}</div>
                <div style={{ fontFamily: M, fontSize: 8.5, color: plat.color, textTransform: "uppercase", letterSpacing: "0.06em" }}>{plat.label}</div>
              </div>
              <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                <a href={playlist.url} target="_blank" rel="noopener noreferrer" style={{
                  fontFamily: M, fontSize: 8.5, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
                  color: "#14110F", background: plat.color, border: "none",
                  borderRadius: 20, padding: "6px 12px", textDecoration: "none", display: "block",
                }}>Open</a>
                <button onClick={() => setPlaylist(null)} style={{ background: "none", border: "none", cursor: "pointer", color: F, padding: 4 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>
            </div>
          );
        })() : addingPlaylist ? (
          <div style={{ background: glass, border: `1px solid ${glassBorder}`, borderRadius: 14, padding: "14px 16px" }}>
            <div style={{ fontFamily: M, fontSize: 9, color: F, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>
              Paste a Spotify, Apple Music, or YouTube link
            </div>
            <input
              autoFocus
              value={playlistInput}
              onChange={(e) => setPlaylistInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submitPlaylist()}
              placeholder="https://open.spotify.com/playlist/..."
              style={{
                width: "100%", background: "transparent", border: "none",
                borderBottom: "1px solid rgba(244,239,231,0.2)",
                fontFamily: M, fontSize: 11, color: P, outline: "none",
                padding: "6px 0", marginBottom: 14, boxSizing: "border-box",
                letterSpacing: "0.02em",
              }}
            />
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => { setAddingPlaylist(false); setPlaylistInput(""); }} style={{
                flex: 1, padding: "8px 0", borderRadius: 20,
                border: `1px solid ${glassBorder}`, background: "transparent",
                fontFamily: M, fontSize: 9, fontWeight: 700, letterSpacing: "0.08em",
                textTransform: "uppercase", color: F, cursor: "pointer",
              }}>Cancel</button>
              <button onClick={submitPlaylist} style={{
                flex: 2, padding: "8px 0", borderRadius: 20, border: "none",
                background: playlistInput.trim() ? A : "rgba(193,127,74,0.2)",
                fontFamily: M, fontSize: 9, fontWeight: 700, letterSpacing: "0.08em",
                textTransform: "uppercase", color: "#14110F",
                cursor: playlistInput.trim() ? "pointer" : "not-allowed",
              }}>Link Playlist</button>
            </div>
          </div>
        ) : (
          <button onClick={() => setAddingPlaylist(true)} style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            width: "100%", padding: 14, background: "transparent",
            border: `1px dashed rgba(244,239,231,0.15)`,
            borderRadius: 14, cursor: "pointer",
            fontFamily: M, fontSize: 9, fontWeight: 700,
            letterSpacing: "0.1em", textTransform: "uppercase", color: F,
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
            Link a Playlist
          </button>
        )}
      </div>

      <div style={{ height: 1, background: glassBorder, marginBottom: 22 }} />

      {/* ── Photos ── */}
      <div style={{ marginBottom: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
          <div style={{ fontFamily: M, fontSize: 9, color: F, textTransform: "uppercase", letterSpacing: "0.1em" }}>Photos</div>
          <span style={{ fontFamily: M, fontSize: 9, color: A, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer" }}>View All →</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 4 }}>
          {crew.photos.map((src, i) => (
            <div key={i} style={{ aspectRatio: "1", borderRadius: 8, overflow: "hidden", background: "repeating-linear-gradient(135deg, #2a221a, #2a221a 6px, #201913 6px, #201913 12px)" }}>
              <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

// ── Main Profile ─────────────────────────────────────────────────────────────

const Profile = ({ session, savedEvents = [] }) => {
  const [view, setView] = useState("profile");
  const [selectedCrew, setSelectedCrew] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewArtist, setReviewArtist] = useState("");
  const [reviewStars, setReviewStars] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [localReviews, setLocalReviews] = useState(recentReviews);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editArtist, setEditArtist] = useState("");
  const [editStars, setEditStars] = useState(0);
  const [editText, setEditText] = useState("");

  const submitReview = () => {
    if (!reviewArtist.trim() || reviewStars === 0) return;
    const stars = "★".repeat(reviewStars) + "☆".repeat(5 - reviewStars);
    const today = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    setLocalReviews((prev) => [{ artist: reviewArtist.trim(), stars, date: today, text: reviewText.trim(), photos: [] }, ...prev]);
    setReviewArtist(""); setReviewStars(0); setReviewText("");
    setShowReviewForm(false);
  };

  const startEdit = (i) => {
    const r = localReviews[i];
    setEditArtist(r.artist);
    setEditStars(r.stars.split("").filter((c) => c === "★").length);
    setEditText(r.text || "");
    setEditingIndex(i);
  };

  const saveEdit = () => {
    if (!editArtist.trim() || editStars === 0) return;
    const stars = "★".repeat(editStars) + "☆".repeat(5 - editStars);
    setLocalReviews((prev) => prev.map((r, i) => i === editingIndex ? { ...r, artist: editArtist.trim(), stars, text: editText.trim() } : r));
    setEditingIndex(null);
  };

  const deleteReview = (i) => setLocalReviews((prev) => prev.filter((_, j) => j !== i));

  const [bannerUrl, setBannerUrl] = useState(null);
  const handleBannerChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setBannerUrl(ev.target.result);
    reader.readAsDataURL(file);
  };

  const email = session?.user?.email ?? "";
  const userHandle = "@" + (email.split("@")[0] || "you");
  const userInitial = email[0]?.toUpperCase() ?? "?";

  const goingEvents = savedEvents.filter((e) => e.status === "going");
  const uniqueVenues = new Set(goingEvents.map((e) => e.venue).filter(Boolean)).size;
  const liveStats = {
    shows: goingEvents.length || passportStats.shows,
    venues: uniqueVenues || passportStats.venues,
    festivals: passportStats.festivals,
  };

  if (view === "crewDetail" && selectedCrew) return (
    <Screen><CrewDetailView crew={selectedCrew} onClose={() => { setView("profile"); setSelectedCrew(null); }} /></Screen>
  );
  if (view === "addFriends") return <Screen><AddFriendsView onClose={() => setView("friends")} /></Screen>;
  if (view === "friends") return <Screen><FriendsView onClose={() => setView("profile")} onAddFriends={() => setView("addFriends")} /></Screen>;
  if (view === "reviews") return (
    <Screen>
      <ReviewsView
        reviews={localReviews}
        onClose={() => { setView("profile"); setEditingIndex(null); }}
        onEdit={startEdit} onDelete={deleteReview}
        editingIndex={editingIndex}
        editArtist={editArtist} setEditArtist={setEditArtist}
        editStars={editStars} setEditStars={setEditStars}
        editText={editText} setEditText={setEditText}
        onSaveEdit={saveEdit} onCancelEdit={() => setEditingIndex(null)}
      />
    </Screen>
  );

  return (
    <Screen>
      {/* ── Profile Banner ───────────────────────────────────── */}
      <div style={{
        position: "relative",
        height: 128,
        marginLeft: -22, marginRight: -22, marginTop: -8,
        overflow: "hidden",
        background: bannerUrl
          ? undefined
          : "linear-gradient(135deg, #1e160e 0%, #2c1d0c 40%, #1a1108 100%)",
      }}>
        {/* Default texture when no image set */}
        {!bannerUrl && (
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage:
              "repeating-linear-gradient(135deg, rgba(193,127,74,0.05) 0px, rgba(193,127,74,0.05) 1px, transparent 1px, transparent 18px), " +
              "repeating-linear-gradient(45deg, rgba(193,127,74,0.03) 0px, rgba(193,127,74,0.03) 1px, transparent 1px, transparent 18px)",
          }} />
        )}
        {bannerUrl && (
          <img src={bannerUrl} alt=""
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        )}
        {/* Bottom fade into page background */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 56,
          background: "linear-gradient(to bottom, transparent, rgba(12,10,8,0.55))",
        }} />
        {/* Edit banner button */}
        <label style={{
          position: "absolute", bottom: 10, right: 10,
          display: "flex", alignItems: "center", gap: 5,
          background: "rgba(12,10,8,0.72)",
          backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
          border: "1px solid rgba(244,239,231,0.18)",
          borderRadius: 20, padding: "5px 11px",
          cursor: "pointer",
        }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={P} strokeWidth="2">
            <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
            <circle cx="12" cy="13" r="4"/>
          </svg>
          <span style={{ fontFamily: M, fontSize: 8, letterSpacing: "0.08em", textTransform: "uppercase", color: P }}>
            Edit Banner
          </span>
          <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleBannerChange} />
        </label>
      </div>

      {/* ── Identity hero ─────────────────────────────────────── */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 28 }}>
        {/* Avatar — pulled up to overlap the banner */}
        <div style={{
          width: 88, height: 88, borderRadius: "50%",
          background: "rgba(193,127,74,0.15)",
          border: "3px solid #0C0A08",
          boxShadow: "0 0 0 2px rgba(193,127,74,0.45), 0 0 28px rgba(193,127,74,0.2)",
          display: "flex", alignItems: "center", justifyContent: "center",
          animation: "breathe 5s ease-in-out infinite",
          marginTop: -44,
          marginBottom: 12,
          position: "relative", zIndex: 1,
        }}>
          <span style={{ fontFamily: D, fontSize: 36, fontWeight: 700, color: A }}>{userInitial}</span>
        </div>

        <div style={{ fontFamily: D, fontSize: 24, fontWeight: 700, color: P, marginBottom: 2 }}>
          {userProfile.name}
        </div>
        <div style={{ fontFamily: M, fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: A, marginBottom: 4 }}>
          {userHandle}
        </div>
        <div style={{ fontFamily: M, fontSize: 9, letterSpacing: "0.06em", textTransform: "uppercase", color: F, marginBottom: 12 }}>
          {userProfile.location}
        </div>
        {userProfile.bio && (
          <div style={{ fontFamily: D, fontSize: 14, fontStyle: "italic", color: F, lineHeight: "20px", textAlign: "center", maxWidth: 260, marginBottom: 16 }}>
            "{userProfile.bio}"
          </div>
        )}
        <button style={{
          background: glass, border: `1px solid rgba(193,127,74,0.3)`,
          borderRadius: 20, padding: "7px 22px",
          fontFamily: M, fontSize: 9, fontWeight: 700,
          letterSpacing: "0.08em", textTransform: "uppercase", color: A, cursor: "pointer",
        }}>
          Edit Profile
        </button>
      </div>

      {/* ── Stats strip ───────────────────────────────────────── */}
      <div style={{
        display: "flex", background: glass, border: `1px solid ${glassBorder}`,
        borderRadius: 18, overflow: "hidden", marginBottom: 28,
      }}>
        {[
          { label: "Shows", value: liveStats.shows, onClick: null },
          { label: "Venues", value: liveStats.venues, onClick: null },
          { label: "Friends", value: userProfile.friends, onClick: () => setView("friends") },
          { label: "Reviews", value: localReviews.length, onClick: () => setView("reviews") },
        ].map((s, i, arr) => (
          <button
            key={s.label}
            onClick={s.onClick || undefined}
            style={{
              flex: 1, textAlign: "center", background: "none",
              border: "none", cursor: s.onClick ? "pointer" : "default",
              padding: "14px 4px",
              borderRight: i < arr.length - 1 ? `1px solid ${glassBorder}` : "none",
            }}
          >
            <div style={{ fontFamily: D, fontSize: 22, fontWeight: 700, color: A, lineHeight: 1, marginBottom: 4 }}>
              {s.value}
            </div>
            <div style={{ fontFamily: M, fontSize: 8, color: F, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              {s.label}
            </div>
          </button>
        ))}
      </div>

      {/* ── Passport badges ──────────────────────────────────── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
        <div style={{ fontFamily: D, fontSize: 22, fontWeight: 700, color: P }}>Passport</div>
        <span style={{ fontFamily: M, fontSize: 9, letterSpacing: "0.08em", textTransform: "uppercase", color: A, cursor: "pointer" }}>Full History →</span>
      </div>
      <div style={{
        background: glass, border: `1px solid ${glassBorder}`,
        borderRadius: 18, padding: "18px 18px 20px", marginBottom: 28,
      }}>
        <div style={{ fontFamily: M, fontSize: 9, color: F, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>
          2026 Season · Earned Badges
        </div>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          {badges.map((b, i) => (
            <div key={i} style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
              opacity: b.tier === "locked" ? 0.3 : 1,
              animation: b.tier !== "locked" ? `floaty 4s ease-in-out infinite` : "none",
              animationDelay: `${i * 0.5}s`,
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: "50%",
                background: b.tier !== "locked" ? "rgba(193,127,74,0.14)" : glass,
                border: `1px solid ${b.tier !== "locked" ? "rgba(193,127,74,0.35)" : glassBorder}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 22,
              }}>
                {b.icon}
              </div>
              <div style={{ fontFamily: M, fontSize: 7, color: F, textTransform: "uppercase", letterSpacing: "0.06em", textAlign: "center", maxWidth: 52, lineHeight: "10px" }}>
                {b.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Crews ─────────────────────────────────────────────── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
        <div style={{ fontFamily: D, fontSize: 22, fontWeight: 700, color: P }}>Your Crews</div>
        <span style={{ fontFamily: M, fontSize: 9, letterSpacing: "0.08em", textTransform: "uppercase", color: A, cursor: "pointer" }}>Manage →</span>
      </div>
      {crews.map((crew, i) => (
        <div key={i} onClick={() => { setSelectedCrew(crew); setView("crewDetail"); }} style={{
          background: glass, border: `1px solid ${glassBorder}`,
          borderRadius: 18, overflow: "hidden", marginBottom: 12, cursor: "pointer",
        }}>
          {/* Cover photo */}
          <div style={{ position: "relative", height: 110, background: "repeating-linear-gradient(135deg, #2a221a, #2a221a 8px, #201913 8px, #201913 16px)", overflow: "hidden" }}>
            {crew.cover && (
              <img src={crew.cover} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.7 }} />
            )}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 20%, rgba(12,10,8,0.88) 100%)" }} />
            {/* Name + member count overlaid */}
            <div style={{ position: "absolute", bottom: 12, left: 14, right: 14, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
              <div style={{ fontFamily: D, fontSize: 20, fontWeight: 700, color: P, lineHeight: "22px" }}>{crew.name}</div>
              <div style={{ fontFamily: M, fontSize: 8.5, color: "rgba(244,239,231,0.55)", textTransform: "uppercase", letterSpacing: "0.08em", flexShrink: 0, marginLeft: 8 }}>{crew.memberCount} members</div>
            </div>
          </div>
          {/* Card body */}
          <div style={{ padding: "12px 14px 14px" }}>
            {/* Avatar stack */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
              <div style={{ display: "flex" }}>
                {crew.avatars.map((a, j) => (
                  <div key={j} style={{
                    width: 26, height: 26, borderRadius: "50%",
                    background: `${a.color}22`, border: `1.5px solid ${a.color}88`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: D, fontSize: 10, fontWeight: 700, color: a.color,
                    marginRight: -7, zIndex: 10 - j, position: "relative",
                  }}>{a.initial}</div>
                ))}
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={F} strokeWidth="1.5"><path d="M9 18l6-6-6-6"/></svg>
            </div>
            {/* Feature chips */}
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
              {crew.features.map((f, j) => (
                <span key={j} style={{ fontFamily: M, fontSize: 8.5, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: F, border: `1px solid ${glassBorder}`, padding: "3px 9px", borderRadius: 20 }}>{f.label}</span>
              ))}
            </div>
            {/* Next event */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, border: "1px solid rgba(193,127,74,0.25)", borderRadius: 20, padding: "8px 12px" }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: A, flexShrink: 0, animation: "pulse 1.5s ease-in-out infinite" }} />
              <div style={{ fontFamily: M, fontSize: 9.5, color: A, flex: 1, letterSpacing: "0.04em", textTransform: "uppercase" }}>{crew.nextEvent}</div>
            </div>
          </div>
        </div>
      ))}
      <button style={{
        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        width: "100%", padding: 14, background: "transparent",
        border: `1px dashed rgba(244,239,231,0.15)`,
        borderRadius: 16, cursor: "pointer",
        fontFamily: M, fontSize: 9, fontWeight: 700,
        letterSpacing: "0.1em", textTransform: "uppercase", color: F,
      }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
        Create New Crew
      </button>

      {/* ── Favorite Artists ─────────────────────────────────── */}
      <div style={{ height: 1, background: glassBorder, margin: "24px 0" }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
        <div style={{ fontFamily: D, fontSize: 22, fontWeight: 700, color: P }}>Favorite Artists</div>
        <span style={{ fontFamily: M, fontSize: 9, letterSpacing: "0.08em", textTransform: "uppercase", color: A, cursor: "pointer" }}>Edit →</span>
      </div>
      <HScroll gap={14} style={{ marginBottom: 8 }}>
        {favoriteArtists.map((a, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, minWidth: 70, flexShrink: 0 }}>
            <div style={{
              width: 64, height: 64, borderRadius: "50%",
              background: "repeating-linear-gradient(135deg, #2a221a, #2a221a 6px, #201913 6px, #201913 12px)",
              border: "1px solid rgba(193,127,74,0.3)",
              overflow: "hidden",
            }}>
              <img src={a.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
            <div style={{ fontFamily: D, fontSize: 11, fontWeight: 700, color: P, textAlign: "center", maxWidth: 70, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.name}</div>
            <div style={{ fontFamily: M, fontSize: 8, color: F, textTransform: "uppercase", letterSpacing: "0.06em" }}>Seen {a.seen}×</div>
          </div>
        ))}
      </HScroll>

      {/* ── Favorite Venues ───────────────────────────────────── */}
      <div style={{ height: 1, background: glassBorder, margin: "22px 0" }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
        <div style={{ fontFamily: D, fontSize: 22, fontWeight: 700, color: P }}>Favorite Venues</div>
        <span style={{ fontFamily: M, fontSize: 9, letterSpacing: "0.08em", textTransform: "uppercase", color: A, cursor: "pointer" }}>All →</span>
      </div>
      <HScroll gap={14} style={{ marginBottom: 8 }}>
        {favoriteVenues.map((v, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, minWidth: 70, flexShrink: 0 }}>
            <div style={{ width: 64, height: 64, borderRadius: 14, background: "repeating-linear-gradient(135deg, #2a221a, #2a221a 6px, #201913 6px, #201913 12px)", overflow: "hidden", border: `1px solid ${glassBorder}` }}>
              <img src={v.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
            <div style={{ fontFamily: D, fontSize: 11, fontWeight: 700, color: P, textAlign: "center", maxWidth: 70, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{v.name}</div>
            <div style={{ fontFamily: M, fontSize: 8, color: F, textTransform: "uppercase", letterSpacing: "0.06em" }}>{v.shows} shows</div>
          </div>
        ))}
      </HScroll>

      {/* ── Reviews ──────────────────────────────────────────── */}
      <div style={{ height: 1, background: glassBorder, margin: "22px 0" }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div style={{ fontFamily: D, fontSize: 22, fontWeight: 700, color: P }}>Reviews</div>
        {!showReviewForm && (
          <button onClick={() => setShowReviewForm(true)} style={{
            display: "flex", alignItems: "center", gap: 6,
            background: A, color: "#14110F", border: "none",
            padding: "7px 14px", borderRadius: 20,
            fontFamily: M, fontSize: 9, fontWeight: 700,
            letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer",
          }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
            Write
          </button>
        )}
      </div>

      {showReviewForm && (
        <div style={{ background: glass, border: `1px solid ${glassBorder}`, borderRadius: 16, padding: 16, marginBottom: 16 }}>
          <div style={{ fontFamily: D, fontSize: 16, fontWeight: 700, color: P, marginBottom: 12 }}>Write a Review</div>
          <input value={reviewArtist} onChange={(e) => setReviewArtist(e.target.value)} placeholder="Artist · Venue" style={{ width: "100%", padding: "8px 0", background: "transparent", border: "none", borderBottom: "1px solid rgba(244,239,231,0.2)", fontFamily: D, fontSize: 14, fontStyle: "italic", color: P, outline: "none", marginBottom: 12, boxSizing: "border-box" }} />
          <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
            {[1,2,3,4,5].map((n) => <span key={n} onClick={() => setReviewStars(n)} style={{ fontSize: 20, cursor: "pointer", color: n <= reviewStars ? A : "rgba(244,239,231,0.15)", lineHeight: 1 }}>★</span>)}
          </div>
          <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} placeholder="What made it memorable?" rows={3} style={{ width: "100%", padding: "8px 0", background: "transparent", border: "none", borderBottom: "1px solid rgba(244,239,231,0.2)", fontFamily: D, fontSize: 13, fontStyle: "italic", color: P, outline: "none", resize: "none", marginBottom: 14, boxSizing: "border-box", lineHeight: 1.5 }} />
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => { setShowReviewForm(false); setReviewArtist(""); setReviewStars(0); setReviewText(""); }} style={{ flex: 1, padding: "9px 0", borderRadius: 20, border: `1px solid ${glassBorder}`, background: "transparent", fontFamily: M, fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: F, cursor: "pointer" }}>Cancel</button>
            <button onClick={submitReview} style={{ flex: 2, padding: "9px 0", borderRadius: 20, border: "none", background: reviewArtist.trim() && reviewStars > 0 ? A : "rgba(193,127,74,0.2)", fontFamily: M, fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#14110F", cursor: reviewArtist.trim() && reviewStars > 0 ? "pointer" : "not-allowed" }}>Post Review</button>
          </div>
        </div>
      )}

      {localReviews.map((r, i) => (
        <div key={i} style={{ padding: "12px 0", borderBottom: i < localReviews.length - 1 ? "1px solid rgba(244,239,231,0.08)" : "none" }}>
          {editingIndex === i ? (
            <>
              <input value={editArtist} onChange={(e) => setEditArtist(e.target.value)} style={{ width: "100%", padding: "6px 0", background: "transparent", border: "none", borderBottom: "1px solid rgba(244,239,231,0.2)", fontFamily: D, fontSize: 14, fontStyle: "italic", fontWeight: 700, color: P, outline: "none", marginBottom: 10, boxSizing: "border-box" }} />
              <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
                {[1,2,3,4,5].map((n) => <span key={n} onClick={() => setEditStars(n)} style={{ fontSize: 20, cursor: "pointer", color: n <= editStars ? A : "rgba(244,239,231,0.15)", lineHeight: 1 }}>★</span>)}
              </div>
              <textarea value={editText} onChange={(e) => setEditText(e.target.value)} rows={3} style={{ width: "100%", padding: "6px 0", background: "transparent", border: "none", borderBottom: "1px solid rgba(244,239,231,0.2)", fontFamily: D, fontSize: 13, fontStyle: "italic", color: P, outline: "none", resize: "none", marginBottom: 12, boxSizing: "border-box", lineHeight: 1.5 }} />
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => setEditingIndex(null)} style={{ flex: 1, padding: "8px 0", borderRadius: 20, border: `1px solid ${glassBorder}`, background: "transparent", fontFamily: M, fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: F, cursor: "pointer" }}>Cancel</button>
                <button onClick={saveEdit} style={{ flex: 2, padding: "8px 0", borderRadius: 20, border: "none", background: A, fontFamily: M, fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#14110F", cursor: "pointer" }}>Save Changes</button>
              </div>
            </>
          ) : (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                <div style={{ fontFamily: D, fontSize: 15, fontWeight: 700, color: P, flex: 1 }}>{r.artist}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontFamily: M, fontSize: 11, color: A }}>{r.stars}</span>
                  <button onClick={() => startEdit(i)} style={{ background: "none", border: "none", cursor: "pointer", color: F, padding: 2 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  </button>
                  <button onClick={() => deleteReview(i)} style={{ background: "none", border: "none", cursor: "pointer", color: E, padding: 2 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
                  </button>
                </div>
              </div>
              <div style={{ fontFamily: M, fontSize: 9, color: F, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>{r.date}</div>
              {r.text && <div style={{ fontFamily: D, fontSize: 13, fontStyle: "italic", color: F, lineHeight: "18px" }}>{r.text}</div>}
            </>
          )}
        </div>
      ))}

      {/* ── Share ─────────────────────────────────────────────── */}
      <div style={{ height: 1, background: glassBorder, margin: "22px 0" }} />
      <div style={{ display: "flex", gap: 10 }}>
        {["Share Profile", "Share Passport"].map((label, i) => (
          <button key={i} style={{
            flex: 1, padding: 12, borderRadius: 20,
            border: `1px solid ${glassBorder}`, background: glass,
            fontFamily: M, fontSize: 9, fontWeight: 700,
            letterSpacing: "0.06em", textTransform: "uppercase", color: P,
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
          }}>
            {i === 0
              ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13"/></svg>
              : <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
            }
            {label}
          </button>
        ))}
      </div>
    </Screen>
  );
};

export default Profile;
