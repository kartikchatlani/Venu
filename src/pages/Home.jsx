import React, { useState } from "react";
import { colors, fonts } from "../theme.jsx";
import { Screen, SectionHeader, Divider, HScroll, NotifBell, UserAvatar, CountdownBadge, FriendRow, TagPill, MatchScore, WishlistButton } from "../components/index.jsx";
import { perfectMatches, friends, weeklyPicks, soundcheckQuestion } from "../data/index.jsx";

const getDaysUntil = (dateStr) => {
  if (!dateStr) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const event = new Date(dateStr + "T12:00:00");
  const diff = Math.round((event - today) / (1000 * 60 * 60 * 24));
  return diff >= 0 ? diff : null;
};

const Home = ({ savedEvents = [], savedLoading = false, onOpenNotifs }) => {
  const [wishlisted, setWishlisted] = useState({});
  const [scAnswered, setScAnswered] = useState(false);
  const [scCorrect, setScCorrect] = useState(false);
  const [scSelected, setScSelected] = useState(null);

  const handleSoundcheck = (idx) => {
    if (scAnswered) return;
    setScAnswered(true);
    setScSelected(idx);
    setScCorrect(idx === soundcheckQuestion.correctIndex);
  };

  return (
    <Screen>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
        <h1 style={{ fontFamily: fonts.display, fontSize: 32, fontWeight: 800, color: colors.ink, fontStyle: "italic", lineHeight: 1 }}>Venu</h1>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <NotifBell onClick={onOpenNotifs} />
          <UserAvatar />
        </div>
      </div>
      <p style={{ fontSize: 13, color: colors.brownMid, marginBottom: 22 }}>Saturday, March 28 · Austin, TX</p>

      {/* The Drop */}
      <div style={{
        background: `linear-gradient(135deg, ${colors.ink} 0%, ${colors.dark2} 100%)`,
        borderRadius: 16, padding: 16, marginBottom: 20, position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, background: "radial-gradient(circle, rgba(242,204,143,0.15), transparent 70%)" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <div style={{ width: 6, height: 6, background: colors.gold, borderRadius: "50%" }} />
          <span style={{ fontFamily: fonts.mono, fontSize: 9, color: colors.gold, letterSpacing: 2, textTransform: "uppercase" }}>The Drop · Live</span>
        </div>
        <p style={{ fontFamily: fonts.display, fontSize: 16, color: colors.cream, fontWeight: 600, fontStyle: "italic", marginBottom: 4, position: "relative" }}>Tyler, the Creator</p>
        <p style={{ fontSize: 11, color: "#999", marginBottom: 10, position: "relative" }}>Presale code available · Moody Center · Jun 14</p>
        <button style={{ display: "inline-flex", background: "rgba(242,204,143,0.15)", borderRadius: 8, padding: "6px 12px", border: "none", cursor: "pointer", fontFamily: fonts.body, fontSize: 11, fontWeight: 600, color: colors.gold, position: "relative" }}>View presale →</button>
      </div>

      {/* Soundcheck */}
      <div style={{
        background: colors.white, borderRadius: 16, padding: 18, boxShadow: "0 2px 12px rgba(28,25,21,0.06)",
        border: "1px solid rgba(28,25,21,0.04)", marginBottom: 20, position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${colors.amber}, ${colors.gold}, ${colors.amber})` }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: colors.ink, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🎵</div>
            <div>
              <p style={{ fontFamily: fonts.display, fontSize: 16, fontWeight: 700, color: colors.ink, fontStyle: "italic" }}>Soundcheck</p>
              <p style={{ fontFamily: fonts.mono, fontSize: 8, letterSpacing: 1, textTransform: "uppercase", color: colors.amber }}>Daily Music Challenge</p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4, background: "rgba(242,204,143,0.15)", padding: "4px 10px", borderRadius: 20 }}>
            <span style={{ fontSize: 12 }}>🔥</span>
            <span style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 600, color: colors.amber }}>{scCorrect ? "6" : scAnswered ? "0" : "5"}</span>
          </div>
        </div>

        <p style={{ fontSize: 14, fontWeight: 600, color: colors.ink, lineHeight: 1.5, marginBottom: 14 }}>{soundcheckQuestion.question}</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
          {soundcheckQuestion.options.map((opt, i) => {
            const isCorrect = i === soundcheckQuestion.correctIndex;
            const isSelected = scSelected === i;
            let borderColor = colors.border, bg = colors.cream, opacity = 1;
            if (scAnswered) {
              if (isCorrect) { borderColor = colors.sage; bg = "rgba(129,178,154,0.1)"; }
              else if (isSelected) { borderColor = colors.terracotta; bg = "rgba(224,122,95,0.06)"; opacity = 0.6; }
              else { opacity = 0.4; }
            }
            return (
              <div key={i} onClick={() => handleSoundcheck(i)} style={{
                display: "flex", alignItems: "center", gap: 10, padding: "12px 14px",
                background: bg, border: `1.5px solid ${borderColor}`, borderRadius: 12,
                cursor: scAnswered ? "default" : "pointer", fontSize: 13, fontWeight: 500,
                color: colors.ink, opacity, transition: "all 0.2s",
              }}>
                <div style={{
                  width: 18, height: 18, borderRadius: "50%", border: `2px solid ${borderColor}`,
                  background: scAnswered && isCorrect ? colors.sage : scAnswered && isSelected && !isCorrect ? colors.terracotta : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#fff", fontWeight: 700,
                }}>
                  {scAnswered && isCorrect && "✓"}
                  {scAnswered && isSelected && !isCorrect && "✗"}
                </div>
                <span>{opt}</span>
              </div>
            );
          })}
        </div>

        {scAnswered && (
          <div style={{
            padding: "12px 14px", borderRadius: 12, marginBottom: 14, fontSize: 13, lineHeight: 1.5,
            background: scCorrect ? "rgba(129,178,154,0.1)" : "rgba(224,122,95,0.08)",
            border: `1px solid ${scCorrect ? "rgba(129,178,154,0.2)" : "rgba(224,122,95,0.15)"}`,
            color: scCorrect ? "#3d7a5a" : "#b35a3f",
          }}>
            {scCorrect
              ? <><strong>🎉 Correct!</strong> The Continental Club has been a South Congress landmark since 1955. Your streak is now <strong>6 days</strong>. +1 Passport point.</>
              : <><strong>Not quite!</strong> It was the <strong>Continental Club</strong> — a South Congress landmark since 1955. Streak reset. Try again tomorrow!</>
            }
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontFamily: fonts.mono, fontSize: 10, color: colors.faded }}>{soundcheckQuestion.stat}</span>
          <span style={{ fontFamily: fonts.mono, fontSize: 10, color: colors.faded }}>Resets in 14h 22m</span>
        </div>
      </div>

      {/* Your Shows */}
      <SectionHeader title="Your Shows" link="View All" />
      {savedLoading ? (
        <p style={{ fontSize: 12, color: colors.faded, fontStyle: "italic", marginBottom: 14 }}>Loading your shows...</p>
      ) : (() => {
        const goingShows = savedEvents
          .filter((e) => e.status === "going")
          .map((e) => ({ ...e, daysUntil: getDaysUntil(e.date) }))
          .filter((e) => e.daysUntil !== null)
          .sort((a, b) => a.daysUntil - b.daysUntil);
        if (goingShows.length === 0) return (
          <p style={{ fontSize: 12, color: colors.faded, fontStyle: "italic", marginBottom: 14 }}>No upcoming shows yet. Mark an event as Going in Explore!</p>
        );
        return goingShows.map((show) => {
          const d = new Date(show.date + "T12:00:00");
          const day = d.toLocaleString("en-US", { weekday: "short" });
          const dateLabel = d.toLocaleString("en-US", { month: "short", day: "numeric" });
          return (
            <div key={show.event_id} style={{ display: "flex", gap: 14, alignItems: "center", padding: 14, background: colors.white, borderRadius: 16, marginBottom: 10, boxShadow: "0 1px 4px rgba(28,25,21,0.05)", border: "1px solid rgba(28,25,21,0.04)" }}>
              <CountdownBadge days={show.daysUntil} />
              {show.img
                ? <img src={show.img} alt="" style={{ width: 48, height: 48, borderRadius: 10, objectFit: "cover" }} />
                : <div style={{ width: 48, height: 48, borderRadius: 10, background: `linear-gradient(135deg, ${colors.warmGray}, ${colors.border})`, flexShrink: 0 }} />
              }
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: colors.ink, marginBottom: 2 }}>{show.artist}</p>
                <p style={{ fontSize: 11, color: colors.brownMid }}>{show.venue} · {day}, {dateLabel} · {show.time}</p>
              </div>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.faded} strokeWidth="1.5"><path d="M9 18l6-6-6-6"/></svg>
            </div>
          );
        });
      })()}

      {/* Scout Tip */}
      <div style={{ background: colors.warmGray, borderRadius: 14, padding: "14px 16px", display: "flex", alignItems: "center", gap: 14, marginBottom: 24, border: `1px solid ${colors.border}` }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: colors.ink, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>🎯</div>
        <div>
          <p style={{ fontSize: 12, fontWeight: 600, color: colors.ink, marginBottom: 2 }}>Scout Tip for Khruangbin</p>
          <p style={{ fontSize: 11, color: colors.brownMid, lineHeight: 1.4 }}>Stubb's outdoor — best sound from center-left. Doors at 7, opener at 7:45.</p>
        </div>
      </div>

      <Divider />

      {/* This Week in Austin */}
      <SectionHeader title="This Week in Austin" link="Full Guide" />
      <p style={{ fontSize: 12, color: colors.brownMid, marginBottom: 14, fontStyle: "italic" }}>Handpicked by Venu editors · Mar 28 – Apr 4</p>
      <HScroll gap={14} style={{ marginBottom: 4 }}>
        {weeklyPicks.map((pick) => (
          <div key={pick.id} style={{ minWidth: 260, background: colors.white, borderRadius: 16, overflow: "hidden", flexShrink: 0, boxShadow: "0 2px 10px rgba(28,25,21,0.06)", border: "1px solid rgba(28,25,21,0.04)", position: "relative" }}>
            <img src={pick.img} alt="" style={{ width: 260, height: 120, objectFit: "cover", display: "block" }} />
            <span style={{ position: "absolute", top: 10, left: 10, fontFamily: fonts.mono, fontSize: 9, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", color: colors.cream, background: "rgba(28,25,21,0.75)", backdropFilter: "blur(8px)", padding: "4px 10px", borderRadius: 20 }}>{pick.label}</span>
            <div style={{ padding: "14px 16px 16px" }}>
              <p style={{ fontFamily: fonts.display, fontSize: 16, fontWeight: 700, color: colors.ink, fontStyle: "italic", marginBottom: 2 }}>{pick.artist}</p>
              <p style={{ fontSize: 11, color: colors.brownMid, marginBottom: 8 }}>{pick.venue} · {pick.date}</p>
              <p style={{ fontSize: 12, color: colors.olive, lineHeight: 1.5, fontStyle: "italic" }}>"{pick.blurb}"</p>
            </div>
          </div>
        ))}
      </HScroll>

      <Divider />

      {/* Perfect Matches */}
      <SectionHeader title="Perfect Matches" link="See All" />
      <HScroll gap={12} style={{ marginBottom: 8 }}>
        {perfectMatches.map((m) => (
          <div key={m.id} style={{ minWidth: 220, background: colors.white, borderRadius: 16, overflow: "hidden", flexShrink: 0, boxShadow: "0 2px 8px rgba(28,25,21,0.06)", border: "1px solid rgba(28,25,21,0.04)" }}>
            <div style={{ position: "relative" }}>
              <img src={m.img} alt="" style={{ width: 220, height: 130, objectFit: "cover", display: "block" }} />
              <MatchScore value={m.match} style={{ position: "absolute", top: 10, left: 10 }} />
              <WishlistButton active={wishlisted[m.artist]} onClick={() => setWishlisted(p => ({ ...p, [m.artist]: !p[m.artist] }))} style={{ position: "absolute", top: 10, right: 10 }} />
            </div>
            <div style={{ padding: 14 }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: colors.ink, marginBottom: 3 }}>{m.artist}</p>
              <p style={{ fontSize: 11, color: colors.brownMid, marginBottom: 8 }}>{m.venue} · {m.date}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <TagPill>{m.genre}</TagPill>
                <span style={{ fontSize: 13, fontWeight: 700, color: colors.ink }}>{m.price}</span>
              </div>
            </div>
          </div>
        ))}
      </HScroll>

      <Divider />

      {/* Friends */}
      <SectionHeader title="Friends" link="All Activity" />
      {friends.map((f, i) => <FriendRow key={i} {...f} />)}
    </Screen>
  );
};

export default Home;
