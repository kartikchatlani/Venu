import React, { useState } from "react";
import { colors, fonts } from "../theme.jsx";
import { Screen, SectionHeader, Divider, HScroll } from "../components/index.jsx";
import {
  userProfile, passportStats, badges, crews,
  favoriteArtists, favoriteVenues, photoAlbums, recentReviews,
  friendsList, friendSearchResults,
} from "../data/index.jsx";

const badgeStyles = {
  gold: { bg: "linear-gradient(135deg, rgba(242,204,143,0.2), rgba(193,127,74,0.15))", border: "#F2CC8F" },
  amber: { bg: "linear-gradient(135deg, rgba(193,127,74,0.2), rgba(193,127,74,0.1))", border: "#C17F4A" },
  silver: { bg: "linear-gradient(135deg, rgba(196,184,168,0.2), rgba(196,184,168,0.1))", border: "#C4B8A8" },
  locked: { bg: "linear-gradient(135deg, rgba(196,184,168,0.1), rgba(196,184,168,0.05))", border: "#C4B8A8" },
};

const Avatar = ({ initials, color, textColor = "#fff", size = 36 }) => (
  <div style={{
    width: size, height: size, borderRadius: "50%", background: color, flexShrink: 0,
    display: "flex", alignItems: "center", justifyContent: "center",
    color: textColor, fontSize: size * 0.33, fontWeight: 600, fontFamily: fonts.body,
  }}>
    {initials}
  </div>
);

const AddFriendsView = ({ onClose }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Name");
  const [requested, setRequested] = useState(new Set());

  const filters = ["Name", "Username", "Contacts", "QR"];
  const showResults = search.length > 0;

  const toggleRequest = (name) => {
    setRequested((prev) => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  };

  return (
    <>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <h2 style={{ fontFamily: fonts.display, fontSize: 24, fontWeight: 800, fontStyle: "italic", color: colors.ink, lineHeight: 1 }}>
          Add friends
        </h2>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 600, color: colors.brownMid, fontFamily: fonts.body }}>
          Close
        </button>
      </div>

      {/* Search input */}
      <div style={{ position: "relative", marginBottom: 12 }}>
        <svg style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={colors.ink} strokeWidth="2">
          <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
        </svg>
        <input
          autoFocus
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or username..."
          style={{
            width: "100%", padding: "11px 14px 11px 34px",
            background: colors.white, border: `1.5px solid ${colors.ink}`,
            borderRadius: 10, fontFamily: fonts.body, fontSize: 13,
            color: colors.ink, outline: "none", boxSizing: "border-box",
          }}
        />
      </div>

      {/* Filter tabs */}
      <div style={{ display: "flex", gap: 6, marginBottom: 20, paddingBottom: 16, borderBottom: `1px solid ${colors.border}` }}>
        {filters.map((f) => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: "5px 12px", borderRadius: 100, border: "none", cursor: "pointer",
            fontFamily: fonts.body, fontSize: 11, fontWeight: 500,
            background: filter === f ? colors.ink : colors.warmGray,
            color: filter === f ? colors.cream : colors.brownMid,
          }}>
            {f}
          </button>
        ))}
      </div>

      {/* Results */}
      {showResults ? (
        <>
          <p style={{ fontFamily: fonts.mono, fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", color: colors.brownMid, marginBottom: 14 }}>
            Results
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 20 }}>
            {friendSearchResults.map((f) => {
              const isRequested = requested.has(f.name);
              return (
                <div key={f.name} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Avatar initials={f.initials} color={f.color} textColor={f.textColor} size={38} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: colors.ink, marginBottom: 2 }}>{f.name}</p>
                    <p style={{ fontSize: 10, color: colors.brownMid }}>{f.username} · {f.mutual}</p>
                  </div>
                  <button onClick={() => toggleRequest(f.name)} style={{
                    padding: "6px 14px", borderRadius: 100,
                    fontSize: 11, fontWeight: 600, fontFamily: fonts.body, cursor: "pointer",
                    border: isRequested ? `1px solid ${colors.border}` : "none",
                    background: isRequested ? colors.white : colors.amber,
                    color: isRequested ? colors.ink : colors.cream,
                    flexShrink: 0,
                  }}>
                    {isRequested ? "Requested" : "Add"}
                  </button>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div style={{ textAlign: "center", padding: "30px 0", color: colors.faded, fontSize: 13, fontStyle: "italic" }}>
          Start typing to find friends
        </div>
      )}

      {/* Sync contacts CTA */}
      <div style={{ background: colors.ink, borderRadius: 14, padding: "14px 16px", display: "flex", gap: 14, alignItems: "center", marginTop: 8 }}>
        <div style={{ width: 38, height: 38, borderRadius: "50%", background: colors.amber, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={colors.cream} strokeWidth="2">
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75M9 11a4 4 0 100-8 4 4 0 000 8z"/>
          </svg>
        </div>
        <div>
          <p style={{ fontSize: 12, fontWeight: 600, color: colors.gold, marginBottom: 2 }}>Sync your contacts</p>
          <p style={{ fontSize: 10, color: "#C4B8A8" }}>Find friends already on Venu</p>
        </div>
      </div>
    </>
  );
};

const FriendsView = ({ onClose, onAddFriends }) => {
  const [search, setSearch] = useState("");
  const filtered = search
    ? friendsList.filter((f) => f.name.toLowerCase().includes(search.toLowerCase()))
    : friendsList;

  return (
    <>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <h2 style={{ fontFamily: fonts.display, fontSize: 24, fontWeight: 800, fontStyle: "italic", color: colors.ink, lineHeight: 1 }}>
          Friends
        </h2>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 600, color: colors.brownMid, fontFamily: fonts.body }}>
          ← Back
        </button>
      </div>

      {/* Add friends button */}
      <button onClick={onAddFriends} style={{
        display: "flex", alignItems: "center", gap: 6,
        background: colors.amber, color: colors.cream, border: "none",
        padding: "9px 16px", borderRadius: 100,
        fontSize: 12, fontWeight: 600, fontFamily: fonts.body, cursor: "pointer",
        marginBottom: 18, boxShadow: `0 0 0 3px rgba(193,127,74,0.15)`,
      }}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
        Add friends
      </button>

      {/* Search */}
      <div style={{ position: "relative", marginBottom: 18 }}>
        <svg style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={colors.faded} strokeWidth="2">
          <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
        </svg>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search your friends"
          style={{
            width: "100%", padding: "9px 14px 9px 32px",
            background: colors.white, border: `1px solid ${colors.border}`,
            borderRadius: 8, fontFamily: fonts.body, fontSize: 12,
            color: colors.ink, outline: "none", boxSizing: "border-box",
          }}
        />
      </div>

      {/* Friends list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {filtered.length === 0 ? (
          <p style={{ fontSize: 12, color: colors.faded, fontStyle: "italic" }}>No friends found.</p>
        ) : filtered.map((f) => (
          <div key={f.name} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Avatar initials={f.initials} color={f.color} textColor={f.textColor} size={38} />
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: colors.ink, marginBottom: 2 }}>{f.name}</p>
              <p style={{ fontSize: 10, color: colors.brownMid }}>{f.status}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const ReviewsView = ({ reviews, onClose, onEdit, onDelete, editingIndex, editArtist, setEditArtist, editStars, setEditStars, editText, setEditText, onSaveEdit, onCancelEdit }) => (
  <>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
      <h2 style={{ fontFamily: fonts.display, fontSize: 24, fontWeight: 800, fontStyle: "italic", color: colors.ink, lineHeight: 1 }}>Reviews</h2>
      <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 600, color: colors.brownMid, fontFamily: fonts.body }}>← Back</button>
    </div>
    {reviews.length === 0 ? (
      <p style={{ fontSize: 12, color: colors.faded, fontStyle: "italic", textAlign: "center", marginTop: 30 }}>No reviews yet. Write your first one from your profile!</p>
    ) : reviews.map((r, i) => (
      <div key={i} style={{ background: colors.white, borderRadius: 14, padding: 14, boxShadow: "0 1px 4px rgba(28,25,21,0.04)", border: `1px solid ${editingIndex === i ? colors.amber : "rgba(28,25,21,0.04)"}`, marginBottom: 10 }}>
        {editingIndex === i ? (
          <>
            <input value={editArtist} onChange={(e) => setEditArtist(e.target.value)} style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: `1.5px solid ${colors.border}`, fontFamily: fonts.body, fontSize: 13, color: colors.ink, outline: "none", marginBottom: 10, boxSizing: "border-box", background: colors.cream }} />
            <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
              {[1,2,3,4,5].map((n) => (
                <span key={n} onClick={() => setEditStars(n)} style={{ fontSize: 22, cursor: "pointer", color: n <= editStars ? colors.amber : colors.border, lineHeight: 1 }}>★</span>
              ))}
            </div>
            <textarea value={editText} onChange={(e) => setEditText(e.target.value)} rows={3} style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: `1.5px solid ${colors.border}`, fontFamily: fonts.body, fontSize: 13, color: colors.ink, outline: "none", resize: "none", marginBottom: 10, boxSizing: "border-box", background: colors.cream, lineHeight: 1.5 }} />
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={onCancelEdit} style={{ flex: 1, padding: "8px 0", borderRadius: 8, border: `1px solid ${colors.border}`, background: colors.warmGray, fontFamily: fonts.body, fontSize: 12, fontWeight: 600, color: colors.brownMid, cursor: "pointer" }}>Cancel</button>
              <button onClick={onSaveEdit} style={{ flex: 2, padding: "8px 0", borderRadius: 8, border: "none", background: colors.ink, fontFamily: fonts.body, fontSize: 12, fontWeight: 600, color: colors.gold, cursor: "pointer" }}>Save Changes</button>
            </div>
          </>
        ) : (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: colors.ink, flex: 1 }}>{r.artist}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 12, color: colors.amber, letterSpacing: 1 }}>{r.stars}</span>
                <button onClick={() => onEdit(i)} style={{ background: "none", border: "none", cursor: "pointer", padding: 2, color: colors.brownMid }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </button>
                <button onClick={() => onDelete(i)} style={{ background: "none", border: "none", cursor: "pointer", padding: 2, color: colors.terracotta }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
                </button>
              </div>
            </div>
            <p style={{ fontSize: 11, color: colors.brownMid, marginBottom: 6 }}>{r.date}</p>
            {r.text && <p style={{ fontSize: 12, color: colors.olive, lineHeight: 1.5, fontStyle: "italic", marginBottom: r.photos?.length ? 10 : 0 }}>{r.text}</p>}
            {r.photos?.length > 0 && (
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>
                {r.photos.map((p, j) => <img key={j} src={p.url} alt="" style={{ width: 64, height: 64, borderRadius: 8, objectFit: "cover", border: `1px solid ${colors.border}` }} />)}
              </div>
            )}
          </>
        )}
      </div>
    ))}
  </>
);

const Profile = ({ session, savedEvents = [] }) => {
  const [view, setView] = useState("profile"); // "profile" | "friends" | "addFriends" | "reviews"
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewArtist, setReviewArtist] = useState("");
  const [reviewStars, setReviewStars] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviewPhotos, setReviewPhotos] = useState([]);
  const [localReviews, setLocalReviews] = useState(recentReviews);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editArtist, setEditArtist] = useState("");
  const [editStars, setEditStars] = useState(0);
  const [editText, setEditText] = useState("");

  const submitReview = () => {
    if (!reviewArtist.trim() || reviewStars === 0) return;
    const stars = "★".repeat(reviewStars) + "☆".repeat(5 - reviewStars);
    const today = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    setLocalReviews((prev) => [{ artist: reviewArtist.trim(), stars, date: today, text: reviewText.trim(), photos: reviewPhotos }, ...prev]);
    setReviewArtist("");
    setReviewStars(0);
    setReviewText("");
    setReviewPhotos([]);
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

  const email = session?.user?.email ?? "";
  const userHandle = "@" + (email.split("@")[0] || "you");
  const userInitial = email[0]?.toUpperCase() ?? "?";

  const goingEvents = savedEvents.filter((e) => e.status === "going");
  const uniqueVenues = new Set(goingEvents.map((e) => e.venue).filter(Boolean)).size;
  const livePassportStats = {
    shows: goingEvents.length,
    venues: uniqueVenues || passportStats.venues,
    festivals: passportStats.festivals,
    badges: passportStats.badges,
  };

  if (view === "addFriends") {
    return (
      <Screen>
        <AddFriendsView onClose={() => setView("friends")} />
      </Screen>
    );
  }

  if (view === "friends") {
    return (
      <Screen>
        <FriendsView onClose={() => setView("profile")} onAddFriends={() => setView("addFriends")} />
      </Screen>
    );
  }

  if (view === "reviews") {
    return (
      <Screen>
        <ReviewsView
          reviews={localReviews}
          onClose={() => { setView("profile"); setEditingIndex(null); }}
          onEdit={startEdit}
          onDelete={deleteReview}
          editingIndex={editingIndex}
          editArtist={editArtist} setEditArtist={setEditArtist}
          editStars={editStars} setEditStars={setEditStars}
          editText={editText} setEditText={setEditText}
          onSaveEdit={saveEdit}
          onCancelEdit={() => setEditingIndex(null)}
        />
      </Screen>
    );
  }

  return (
    <Screen>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <h1 style={{ fontFamily: fonts.display, fontSize: 28, fontWeight: 800, color: colors.ink, fontStyle: "italic", lineHeight: 1 }}>Profile</h1>
        <div style={{ width: 34, height: 34, borderRadius: 10, border: `1.5px solid ${colors.border}`, background: colors.white, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.brownMid} strokeWidth="1.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
        </div>
      </div>

      {/* Profile Card */}
      <div style={{ background: colors.ink, borderRadius: 20, padding: "24px 20px 20px", position: "relative", overflow: "hidden", marginBottom: 22 }}>
        <div style={{ position: "absolute", top: -30, right: -30, width: 140, height: 140, background: "radial-gradient(circle, rgba(242,204,143,0.1), transparent 70%)", pointerEvents: "none" }} />
        <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 18, position: "relative" }}>
          <div style={{ width: 68, height: 68, borderRadius: "50%", background: `linear-gradient(135deg, ${colors.amber}, ${colors.gold})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fonts.display, fontSize: 28, fontWeight: 800, color: colors.ink, fontStyle: "italic", flexShrink: 0, position: "relative" }}>
            <div style={{ position: "absolute", inset: -3, borderRadius: "50%", border: "2px solid rgba(242,204,143,0.3)" }} />
            {userInitial}
          </div>
          <div>
            <p style={{ fontFamily: fonts.display, fontSize: 22, fontWeight: 700, color: colors.cream, fontStyle: "italic", marginBottom: 2 }}>{userProfile.name}</p>
            <p style={{ fontFamily: fonts.mono, fontSize: 11, color: colors.amber, marginBottom: 6 }}>{userHandle}</p>
            <p style={{ fontSize: 12, color: "#999", display: "flex", alignItems: "center", gap: 4 }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              {userProfile.location}
            </p>
          </div>
        </div>
        <p style={{ fontSize: 13, color: colors.faded, fontStyle: "italic", lineHeight: 1.5, marginBottom: 20, position: "relative" }}>{userProfile.bio}</p>

        {/* Stats: Friends | Reviews */}
        <div style={{ display: "flex", justifyContent: "center", gap: 0, position: "relative", marginBottom: 16 }}>
          <button onClick={() => setView("friends")} style={{ flex: 1, textAlign: "center", background: "none", border: "none", cursor: "pointer", padding: "8px 0", borderRadius: 10 }}>
            <p style={{ fontFamily: fonts.display, fontSize: 22, fontWeight: 800, color: colors.gold, fontStyle: "italic", lineHeight: 1, marginBottom: 4 }}>{userProfile.friends}</p>
            <p style={{ fontFamily: fonts.mono, fontSize: 8, letterSpacing: 1.5, textTransform: "uppercase", color: "#777" }}>Friends</p>
          </button>
          <div style={{ width: 1, background: "rgba(255,255,255,0.1)", margin: "6px 0" }} />
          <button onClick={() => setView("reviews")} style={{ flex: 1, textAlign: "center", background: "none", border: "none", cursor: "pointer", padding: "8px 0", borderRadius: 10 }}>
            <p style={{ fontFamily: fonts.display, fontSize: 22, fontWeight: 800, color: colors.gold, fontStyle: "italic", lineHeight: 1, marginBottom: 4 }}>{localReviews.length}</p>
            <p style={{ fontFamily: fonts.mono, fontSize: 8, letterSpacing: 1.5, textTransform: "uppercase", color: "#777" }}>Reviews</p>
          </button>
        </div>

        <button style={{ display: "block", width: "100%", padding: 10, background: "rgba(242,204,143,0.1)", border: "1px solid rgba(242,204,143,0.15)", borderRadius: 10, color: colors.gold, fontFamily: fonts.body, fontSize: 12, fontWeight: 600, textAlign: "center", cursor: "pointer", position: "relative" }}>
          Edit Profile
        </button>
      </div>

      {/* Passport */}
      <SectionHeader title="Passport" link="Full History" />
      <div style={{ background: colors.white, borderRadius: 16, padding: 20, boxShadow: "0 2px 10px rgba(28,25,21,0.05)", border: "1px solid rgba(28,25,21,0.04)", marginBottom: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: colors.ink, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.gold} strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
          </div>
          <div>
            <p style={{ fontFamily: fonts.mono, fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: colors.amber }}>Your Passport</p>
            <p style={{ fontFamily: fonts.display, fontSize: 14, fontWeight: 700, color: colors.ink, fontStyle: "italic" }}>2026 Season</p>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 18 }}>
          {Object.entries(livePassportStats).map(([key, val]) => (
            <div key={key} style={{ textAlign: "center", background: colors.cream, borderRadius: 12, padding: "12px 4px" }}>
              <p style={{ fontFamily: fonts.display, fontSize: 24, fontWeight: 800, color: colors.ink, fontStyle: "italic", lineHeight: 1 }}>{val}</p>
              <p style={{ fontFamily: fonts.mono, fontSize: 7, letterSpacing: 1, textTransform: "uppercase", color: colors.brownMid, marginTop: 4 }}>{key}</p>
            </div>
          ))}
        </div>
        <p style={{ fontFamily: fonts.mono, fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", color: colors.brownMid, marginBottom: 10 }}>Earned Badges</p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {badges.map((b, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, width: 72, opacity: b.tier === "locked" ? 0.4 : 1 }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: badgeStyles[b.tier].bg, border: `2px solid ${badgeStyles[b.tier].border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{b.icon}</div>
              <span style={{ fontFamily: fonts.mono, fontSize: 7, textTransform: "uppercase", color: colors.brownMid, textAlign: "center", lineHeight: 1.3 }}>{b.name}</span>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* Crews */}
      <SectionHeader title="Your Crews" link="Manage" />
      {crews.map((crew, i) => (
        <div key={i} style={{ background: colors.white, borderRadius: 16, padding: 16, boxShadow: "0 2px 8px rgba(28,25,21,0.05)", border: "1px solid rgba(28,25,21,0.04)", marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <p style={{ fontSize: 15, fontWeight: 700, color: colors.ink }}>{crew.name}</p>
            <span style={{ fontFamily: fonts.mono, fontSize: 9, letterSpacing: 1, textTransform: "uppercase", color: colors.brownMid }}>{crew.memberCount} Members</span>
          </div>
          <div style={{ display: "flex", marginBottom: 12 }}>
            {crew.avatars.map((a, j) => (
              <div key={j} style={{ width: 32, height: 32, borderRadius: "50%", background: a.color, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: a.initial.startsWith("+") ? fonts.body : fonts.display, fontSize: a.initial.startsWith("+") ? 9 : 13, fontWeight: 700, color: a.color === "#F2CC8F" ? colors.ink : "#fff", fontStyle: a.initial.startsWith("+") ? "normal" : "italic", marginRight: -8, border: "2px solid #fff", zIndex: 5 - j }}>{a.initial}</div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {crew.features.map((f, j) => (
              <span key={j} style={{ display: "flex", alignItems: "center", gap: 5, background: colors.warmGray, borderRadius: 20, padding: "5px 12px", fontSize: 11, color: colors.brownMid }}><span style={{ fontSize: 12 }}>{f.icon}</span>{f.label}</span>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(193,127,74,0.08)", border: "1px solid rgba(193,127,74,0.15)", borderRadius: 10, padding: "10px 12px", marginTop: 12, cursor: "pointer" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: colors.amber, flexShrink: 0 }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: colors.amber, flex: 1 }}>{crew.nextEvent}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.amber} strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
          </div>
        </div>
      ))}
      <button style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", padding: 14, background: colors.warmGray, border: `1.5px dashed ${colors.border}`, borderRadius: 14, cursor: "pointer", fontSize: 13, fontWeight: 600, color: colors.brownMid }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
        Create New Crew
      </button>

      <Divider />

      {/* Favorite Artists */}
      <SectionHeader title="Favorite Artists" link="Edit" />
      <HScroll gap={12} style={{ marginBottom: 8 }}>
        {favoriteArtists.map((a, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, minWidth: 76, flexShrink: 0 }}>
            <img src={a.img} alt="" style={{ width: 64, height: 64, borderRadius: "50%", objectFit: "cover", border: `2px solid ${colors.border}` }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: colors.ink, textAlign: "center", maxWidth: 76, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.name}</span>
            <span style={{ fontFamily: fonts.mono, fontSize: 8, color: colors.faded }}>Seen {a.seen}x</span>
          </div>
        ))}
      </HScroll>

      <Divider />

      {/* Favorite Venues */}
      <SectionHeader title="Favorite Venues" link="All Venues" />
      <HScroll gap={12} style={{ marginBottom: 8 }}>
        {favoriteVenues.map((v, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, minWidth: 76, flexShrink: 0 }}>
            <img src={v.img} alt="" style={{ width: 64, height: 64, borderRadius: 14, objectFit: "cover", border: `2px solid ${colors.border}` }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: colors.ink, textAlign: "center", maxWidth: 76, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{v.name}</span>
            <span style={{ fontFamily: fonts.mono, fontSize: 8, color: colors.faded }}>{v.shows} shows</span>
          </div>
        ))}
      </HScroll>

      <Divider />

      {/* Albums */}
      <SectionHeader title="Photos & Videos" link="All Albums" />
      <HScroll gap={12} style={{ marginBottom: 8 }}>
        {photoAlbums.map((a, i) => (
          <div key={i} style={{ minWidth: 170, background: colors.white, borderRadius: 14, overflow: "hidden", flexShrink: 0, boxShadow: "0 2px 8px rgba(28,25,21,0.05)", border: "1px solid rgba(28,25,21,0.04)" }}>
            <div style={{ width: 170, height: 110, position: "relative" }}>
              <img src={a.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <span style={{ position: "absolute", bottom: 8, right: 8, fontFamily: fonts.mono, fontSize: 9, fontWeight: 600, color: colors.cream, background: "rgba(28,25,21,0.7)", backdropFilter: "blur(8px)", padding: "3px 8px", borderRadius: 20 }}>🎞 {a.count} items</span>
            </div>
            <div style={{ padding: 12 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: colors.ink, marginBottom: 2 }}>{a.title}</p>
              <p style={{ fontSize: 10, color: colors.brownMid }}>{a.date}</p>
            </div>
          </div>
        ))}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, minWidth: 80, flexShrink: 0, cursor: "pointer" }}>
          <div style={{ width: 52, height: 52, borderRadius: "50%", background: colors.warmGray, border: `1.5px dashed ${colors.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.brownMid} strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
          </div>
          <span style={{ fontFamily: fonts.mono, fontSize: 8, letterSpacing: 1, textTransform: "uppercase", color: colors.brownMid, textAlign: "center" }}>New Album</span>
        </div>
      </HScroll>

      <Divider />

      {/* Reviews */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <p style={{ fontFamily: fonts.display, fontSize: 18, fontWeight: 700, fontStyle: "italic", color: colors.ink }}>Reviews</p>
        {!showReviewForm && (
          <button onClick={() => setShowReviewForm(true)} style={{ display: "flex", alignItems: "center", gap: 5, background: colors.ink, color: colors.gold, border: "none", fontFamily: fonts.body, fontSize: 11, fontWeight: 600, padding: "6px 12px", borderRadius: 20, cursor: "pointer" }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
            Write a Review
          </button>
        )}
      </div>

      {showReviewForm && (
        <div style={{ background: colors.white, borderRadius: 14, padding: 16, boxShadow: "0 2px 10px rgba(28,25,21,0.06)", border: `1.5px solid ${colors.amber}`, marginBottom: 14 }}>
          <p style={{ fontFamily: fonts.display, fontSize: 15, fontWeight: 700, fontStyle: "italic", color: colors.ink, marginBottom: 14 }}>Write a Review</p>

          {/* Artist input */}
          <input
            value={reviewArtist}
            onChange={(e) => setReviewArtist(e.target.value)}
            placeholder="Artist · Venue (e.g. Khruangbin @ Stubb's)"
            style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: `1.5px solid ${colors.border}`, fontFamily: fonts.body, fontSize: 13, color: colors.ink, outline: "none", marginBottom: 12, boxSizing: "border-box", background: colors.cream }}
          />

          {/* Star rating */}
          <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
            {[1, 2, 3, 4, 5].map((n) => (
              <span key={n} onClick={() => setReviewStars(n)} style={{ fontSize: 22, cursor: "pointer", color: n <= reviewStars ? colors.amber : colors.border, lineHeight: 1 }}>★</span>
            ))}
            {reviewStars > 0 && (
              <span style={{ fontFamily: fonts.mono, fontSize: 9, color: colors.brownMid, alignSelf: "center", marginLeft: 4, textTransform: "uppercase", letterSpacing: 1 }}>
                {["", "Poor", "Fair", "Good", "Great", "Perfect"][reviewStars]}
              </span>
            )}
          </div>

          {/* Review text */}
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="What made it memorable? Sound, setlist, energy..."
            rows={3}
            style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: `1.5px solid ${colors.border}`, fontFamily: fonts.body, fontSize: 13, color: colors.ink, outline: "none", resize: "none", marginBottom: 14, boxSizing: "border-box", background: colors.cream, lineHeight: 1.5 }}
          />

          {/* Photo upload */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              {reviewPhotos.map((p, i) => (
                <div key={i} style={{ position: "relative", flexShrink: 0 }}>
                  <img src={p.url} alt="" style={{ width: 56, height: 56, borderRadius: 10, objectFit: "cover", border: `1px solid ${colors.border}` }} />
                  <button onClick={() => setReviewPhotos((prev) => prev.filter((_, j) => j !== i))} style={{ position: "absolute", top: -6, right: -6, width: 18, height: 18, borderRadius: "50%", background: colors.ink, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke={colors.cream} strokeWidth="3"><path d="M18 6L6 18M6 6l12 12"/></svg>
                  </button>
                </div>
              ))}
              <label style={{ width: 56, height: 56, borderRadius: 10, border: `1.5px dashed ${colors.border}`, background: colors.cream, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", gap: 3, flexShrink: 0 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.brownMid} strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
                <span style={{ fontFamily: fonts.mono, fontSize: 7, letterSpacing: 1, textTransform: "uppercase", color: colors.brownMid }}>Add</span>
                <input type="file" accept="image/*" multiple style={{ display: "none" }} onChange={(e) => {
                  const files = Array.from(e.target.files);
                  files.forEach((file) => {
                    const url = URL.createObjectURL(file);
                    setReviewPhotos((prev) => [...prev, { url, name: file.name }]);
                  });
                  e.target.value = "";
                }} />
              </label>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => { setShowReviewForm(false); setReviewArtist(""); setReviewStars(0); setReviewText(""); setReviewPhotos([]); }} style={{ flex: 1, padding: "9px 0", borderRadius: 10, border: `1px solid ${colors.border}`, background: colors.warmGray, fontFamily: fonts.body, fontSize: 12, fontWeight: 600, color: colors.brownMid, cursor: "pointer" }}>
              Cancel
            </button>
            <button onClick={submitReview} style={{ flex: 2, padding: "9px 0", borderRadius: 10, border: "none", background: reviewArtist.trim() && reviewStars > 0 ? colors.ink : colors.faded, fontFamily: fonts.body, fontSize: 12, fontWeight: 600, color: colors.gold, cursor: reviewArtist.trim() && reviewStars > 0 ? "pointer" : "not-allowed" }}>
              Post Review
            </button>
          </div>
        </div>
      )}

      {localReviews.map((r, i) => (
        <div key={i} style={{ background: colors.white, borderRadius: 14, padding: 14, boxShadow: "0 1px 4px rgba(28,25,21,0.04)", border: `1px solid ${editingIndex === i ? colors.amber : "rgba(28,25,21,0.04)"}`, marginBottom: 10 }}>
          {editingIndex === i ? (
            <>
              <input value={editArtist} onChange={(e) => setEditArtist(e.target.value)} style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: `1.5px solid ${colors.border}`, fontFamily: fonts.body, fontSize: 13, color: colors.ink, outline: "none", marginBottom: 10, boxSizing: "border-box", background: colors.cream }} />
              <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
                {[1,2,3,4,5].map((n) => (
                  <span key={n} onClick={() => setEditStars(n)} style={{ fontSize: 22, cursor: "pointer", color: n <= editStars ? colors.amber : colors.border, lineHeight: 1 }}>★</span>
                ))}
              </div>
              <textarea value={editText} onChange={(e) => setEditText(e.target.value)} rows={3} style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: `1.5px solid ${colors.border}`, fontFamily: fonts.body, fontSize: 13, color: colors.ink, outline: "none", resize: "none", marginBottom: 10, boxSizing: "border-box", background: colors.cream, lineHeight: 1.5 }} />
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => setEditingIndex(null)} style={{ flex: 1, padding: "8px 0", borderRadius: 8, border: `1px solid ${colors.border}`, background: colors.warmGray, fontFamily: fonts.body, fontSize: 12, fontWeight: 600, color: colors.brownMid, cursor: "pointer" }}>Cancel</button>
                <button onClick={saveEdit} style={{ flex: 2, padding: "8px 0", borderRadius: 8, border: "none", background: colors.ink, fontFamily: fonts.body, fontSize: 12, fontWeight: 600, color: colors.gold, cursor: "pointer" }}>Save Changes</button>
              </div>
            </>
          ) : (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: colors.ink, flex: 1 }}>{r.artist}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 12, color: colors.amber, letterSpacing: 1 }}>{r.stars}</span>
                  <button onClick={() => startEdit(i)} style={{ background: "none", border: "none", cursor: "pointer", padding: 2, color: colors.brownMid }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  </button>
                  <button onClick={() => deleteReview(i)} style={{ background: "none", border: "none", cursor: "pointer", padding: 2, color: colors.terracotta }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
                  </button>
                </div>
              </div>
              <p style={{ fontSize: 11, color: colors.brownMid, marginBottom: 6 }}>{r.date}</p>
              {r.text && <p style={{ fontSize: 12, color: colors.olive, lineHeight: 1.5, fontStyle: "italic", marginBottom: r.photos?.length ? 10 : 0 }}>{r.text}</p>}
              {r.photos?.length > 0 && (
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>
                  {r.photos.map((p, j) => <img key={j} src={p.url} alt="" style={{ width: 64, height: 64, borderRadius: 8, objectFit: "cover", border: `1px solid ${colors.border}` }} />)}
                </div>
              )}
            </>
          )}
        </div>
      ))}

      <Divider />

      {/* Share */}
      <div style={{ display: "flex", gap: 10 }}>
        {["Share Profile", "Share Passport"].map((label, i) => (
          <button key={i} style={{ flex: 1, padding: 12, borderRadius: 12, border: `1.5px solid ${colors.border}`, background: colors.white, fontFamily: fonts.body, fontSize: 12, fontWeight: 600, color: colors.ink, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            {i === 0
              ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13"/></svg>
              : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
            }
            {label}
          </button>
        ))}
      </div>
    </Screen>
  );
};

export default Profile;
