import React from "react";
import { colors, fonts } from "../theme.jsx";
import { Screen, SectionHeader, Divider, HScroll } from "../components/index.jsx";
import { userProfile, passportStats, badges, crews, favoriteArtists, favoriteVenues, photoAlbums, recentReviews } from "../data/index.jsx";

const badgeStyles = {
  gold: { bg: "linear-gradient(135deg, rgba(242,204,143,0.2), rgba(193,127,74,0.15))", border: "#F2CC8F" },
  amber: { bg: "linear-gradient(135deg, rgba(193,127,74,0.2), rgba(193,127,74,0.1))", border: "#C17F4A" },
  silver: { bg: "linear-gradient(135deg, rgba(196,184,168,0.2), rgba(196,184,168,0.1))", border: "#C4B8A8" },
  locked: { bg: "linear-gradient(135deg, rgba(196,184,168,0.1), rgba(196,184,168,0.05))", border: "#C4B8A8" },
};

const Profile = () => (
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
          A
        </div>
        <div>
          <p style={{ fontFamily: fonts.display, fontSize: 22, fontWeight: 700, color: colors.cream, fontStyle: "italic", marginBottom: 2 }}>{userProfile.name}</p>
          <p style={{ fontFamily: fonts.mono, fontSize: 11, color: colors.amber, marginBottom: 6 }}>{userProfile.handle}</p>
          <p style={{ fontSize: 12, color: "#999", display: "flex", alignItems: "center", gap: 4 }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            {userProfile.location}
          </p>
        </div>
      </div>
      <p style={{ fontSize: 13, color: colors.faded, fontStyle: "italic", lineHeight: 1.5, marginBottom: 16, position: "relative" }}>{userProfile.bio}</p>
      <div style={{ display: "flex", gap: 16, position: "relative" }}>
        {[{ n: userProfile.following, l: "Following" }, { n: userProfile.followers, l: "Followers" }, { n: userProfile.reviews, l: "Reviews" }].map((s, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <p style={{ fontFamily: fonts.display, fontSize: 18, fontWeight: 800, color: colors.gold, fontStyle: "italic", lineHeight: 1 }}>{s.n}</p>
            <p style={{ fontFamily: fonts.mono, fontSize: 8, letterSpacing: 1, textTransform: "uppercase", color: "#777", marginTop: 2 }}>{s.l}</p>
          </div>
        ))}
      </div>
      <button style={{ display: "block", width: "100%", padding: 10, marginTop: 16, background: "rgba(242,204,143,0.1)", border: "1px solid rgba(242,204,143,0.15)", borderRadius: 10, color: colors.gold, fontFamily: fonts.body, fontSize: 12, fontWeight: 600, textAlign: "center", cursor: "pointer", position: "relative" }}>Edit Profile</button>
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
        {Object.entries(passportStats).map(([key, val]) => (
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

    {/* Photo Albums */}
    <SectionHeader title="Photo Albums" link="All Albums" />
    <HScroll gap={12} style={{ marginBottom: 8 }}>
      {photoAlbums.map((a, i) => (
        <div key={i} style={{ minWidth: 170, background: colors.white, borderRadius: 14, overflow: "hidden", flexShrink: 0, boxShadow: "0 2px 8px rgba(28,25,21,0.05)", border: "1px solid rgba(28,25,21,0.04)" }}>
          <div style={{ width: 170, height: 110, position: "relative" }}>
            <img src={a.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            <span style={{ position: "absolute", bottom: 8, right: 8, fontFamily: fonts.mono, fontSize: 9, fontWeight: 600, color: colors.cream, background: "rgba(28,25,21,0.7)", backdropFilter: "blur(8px)", padding: "3px 8px", borderRadius: 20 }}>📸 {a.count} photos</span>
          </div>
          <div style={{ padding: 12 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: colors.ink, marginBottom: 2 }}>{a.title}</p>
            <p style={{ fontSize: 10, color: colors.brownMid }}>{a.date}</p>
          </div>
        </div>
      ))}
    </HScroll>

    <Divider />

    {/* Reviews */}
    <SectionHeader title="Recent Reviews" link={`All ${userProfile.reviews}`} />
    {recentReviews.map((r, i) => (
      <div key={i} style={{ background: colors.white, borderRadius: 14, padding: 14, boxShadow: "0 1px 4px rgba(28,25,21,0.04)", border: "1px solid rgba(28,25,21,0.04)", marginBottom: 10 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: colors.ink }}>{r.artist}</p>
          <span style={{ fontSize: 12, color: colors.amber, letterSpacing: 1 }}>{r.stars}</span>
        </div>
        <p style={{ fontSize: 11, color: colors.brownMid, marginBottom: 6 }}>{r.date}</p>
        <p style={{ fontSize: 12, color: colors.olive, lineHeight: 1.5, fontStyle: "italic" }}>{r.text}</p>
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

export default Profile;
