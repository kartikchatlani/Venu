import React, { useState } from "react";
import { colors, fonts } from "../theme.jsx";
import { Screen, SectionHeader, Divider, HScroll, Chip, NotifBell } from "../components/index.jsx";
import { guideCategories, featuredArticle, spotlightArticle, signalItems, moreArticles } from "../data/index.jsx";

const Guide = () => {
  const [activeCat, setActiveCat] = useState("For You");
  const [bookmarked, setBookmarked] = useState({});

  return (
    <Screen>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
        <h1 style={{ fontFamily: fonts.display, fontSize: 28, fontWeight: 800, color: colors.ink, fontStyle: "italic", lineHeight: 1 }}>The Guide</h1>
        <NotifBell />
      </div>
      <p style={{ fontSize: 13, color: colors.brownMid, marginBottom: 18 }}>Stories, spotlights & signals for your music life.</p>

      <HScroll gap={6} style={{ marginBottom: 22 }}>
        {guideCategories.map(c => <Chip key={c} label={c} active={activeCat === c} onClick={() => setActiveCat(c)} />)}
      </HScroll>

      {/* Featured Article */}
      <div style={{ borderRadius: 18, overflow: "hidden", background: colors.white, boxShadow: "0 3px 16px rgba(28,25,21,0.07)", border: "1px solid rgba(28,25,21,0.04)", marginBottom: 8, position: "relative" }}>
        <img src={featuredArticle.img} alt="" style={{ width: "100%", height: 180, objectFit: "cover", display: "block" }} />
        <span style={{ position: "absolute", top: 14, left: 14, fontFamily: fonts.mono, fontSize: 8, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", color: colors.cream, background: "rgba(28,25,21,0.7)", backdropFilter: "blur(8px)", padding: "4px 12px", borderRadius: 20 }}>{featuredArticle.category}</span>
        <div style={{ padding: "18px 18px 16px" }}>
          <h2 style={{ fontFamily: fonts.display, fontSize: 20, fontWeight: 800, fontStyle: "italic", color: colors.ink, lineHeight: 1.3, marginBottom: 8 }}>{featuredArticle.title}</h2>
          <p style={{ fontSize: 13, color: colors.olive, lineHeight: 1.6, fontStyle: "italic", marginBottom: 14 }}>{featuredArticle.subtitle}</p>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 30, height: 30, borderRadius: "50%", background: colors.terracotta, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fonts.display, fontSize: 13, fontWeight: 700, color: "#fff", fontStyle: "italic" }}>E</div>
              <div>
                <p style={{ fontSize: 12, fontWeight: 700, color: colors.ink }}>{featuredArticle.author}</p>
                <p style={{ fontFamily: fonts.mono, fontSize: 9, color: colors.faded }}>{featuredArticle.authorRole}</p>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontFamily: fonts.mono, fontSize: 10, color: colors.faded }}>{featuredArticle.readTime}</span>
              <button onClick={() => setBookmarked(p => ({ ...p, featured: !p.featured }))} style={{ width: 32, height: 32, borderRadius: "50%", border: `1.5px solid ${colors.border}`, background: bookmarked.featured ? colors.ink : colors.cream, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill={bookmarked.featured ? colors.gold : "none"} stroke={bookmarked.featured ? colors.gold : colors.faded} strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <Divider />

      {/* Spotlight */}
      <SectionHeader title="Spotlight" link="All Spotlights" />
      <div style={{ background: colors.ink, borderRadius: 16, overflow: "hidden", marginBottom: 8, position: "relative" }}>
        <img src={spotlightArticle.img} alt="" style={{ width: "100%", height: 130, objectFit: "cover", display: "block", opacity: 0.45 }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 130, background: "linear-gradient(to bottom, transparent 0%, rgba(28,25,21,0.9) 100%)" }} />
        <div style={{ position: "absolute", top: 12, left: 14, right: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: fonts.mono, fontSize: 8, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", color: colors.gold, background: "rgba(242,204,143,0.15)", padding: "4px 10px", borderRadius: 20 }}>Artist Spotlight</span>
          <span style={{ fontFamily: fonts.mono, fontSize: 8, letterSpacing: 1, textTransform: "uppercase", color: colors.amber }}>Playing this week</span>
        </div>
        <div style={{ padding: "16px 18px 18px" }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: colors.amber, marginBottom: 6 }}>{spotlightArticle.artist}</p>
          <h3 style={{ fontFamily: fonts.display, fontSize: 17, fontWeight: 700, fontStyle: "italic", color: colors.cream, lineHeight: 1.35, marginBottom: 10 }}>{spotlightArticle.title}</h3>
          <p style={{ fontSize: 12, color: "#999", lineHeight: 1.6, fontStyle: "italic", marginBottom: 14 }}>{spotlightArticle.excerpt}</p>
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(242,204,143,0.08)", border: "1px solid rgba(242,204,143,0.15)", borderRadius: 10, padding: "10px 14px", cursor: "pointer" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: colors.amber, flexShrink: 0 }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: colors.gold, flex: 1 }}>{spotlightArticle.showLink}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.amber} strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 26, height: 26, borderRadius: "50%", background: colors.sage, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fonts.display, fontSize: 11, fontWeight: 700, color: "#fff", fontStyle: "italic" }}>J</div>
              <div>
                <p style={{ fontSize: 11, fontWeight: 700, color: colors.cream }}>{spotlightArticle.author}</p>
                <p style={{ fontFamily: fonts.mono, fontSize: 8, color: colors.faded }}>{spotlightArticle.authorRole}</p>
              </div>
            </div>
            <span style={{ fontFamily: fonts.mono, fontSize: 10, color: colors.faded }}>{spotlightArticle.readTime}</span>
          </div>
        </div>
      </div>

      <Divider />

      {/* The Signal */}
      <SectionHeader title="The Signal" link="View All" />
      <p style={{ fontSize: 12, color: colors.brownMid, fontStyle: "italic", marginBottom: 6 }}>Quick hits that matter to you · Updated live</p>
      {signalItems.map((s, i) => (
        <div key={i} style={{ display: "flex", gap: 12, padding: "14px 0", borderBottom: "1px solid rgba(28,25,21,0.04)", position: "relative" }}>
          <div style={{ width: 38, height: 38, borderRadius: 12, background: colors.warmGray, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{s.icon}</div>
          <div style={{ flex: 1, paddingRight: 36 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: colors.ink, lineHeight: 1.4, marginBottom: 3 }}>{s.title}</p>
            <p style={{ fontSize: 11, color: colors.brownMid }}>{s.detail}</p>
            {s.hot && <div style={{ display: "inline-flex", alignItems: "center", gap: 3, fontFamily: fonts.mono, fontSize: 8, letterSpacing: 1, textTransform: "uppercase", color: colors.amber, marginTop: 4 }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: colors.amber }} />Trending
            </div>}
          </div>
          <span style={{ fontFamily: fonts.mono, fontSize: 9, color: colors.faded, position: "absolute", top: 14, right: 0 }}>{s.time}</span>
        </div>
      ))}

      <Divider />

      {/* Sponsored */}
      <div style={{ background: colors.warmGray, border: `1px solid ${colors.border}`, borderRadius: 14, overflow: "hidden", marginBottom: 6 }}>
        <img src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=180&fit=crop" alt="" style={{ width: "100%", height: 100, objectFit: "cover", display: "block" }} />
        <div style={{ padding: "14px 16px" }}>
          <p style={{ fontFamily: fonts.mono, fontSize: 8, letterSpacing: 1.5, textTransform: "uppercase", color: colors.amber, marginBottom: 6 }}>Presented by Mohawk</p>
          <p style={{ fontSize: 14, fontWeight: 700, color: colors.ink }}>This Month at Mohawk: 12 Shows You Can't Miss</p>
        </div>
      </div>
      <p style={{ fontFamily: fonts.mono, fontSize: 8, color: colors.faded, letterSpacing: 1, textAlign: "right", marginBottom: 4 }}>SPONSORED</p>

      <Divider />

      {/* More Articles */}
      <SectionHeader title="More to Read" link="Browse All" />
      <HScroll gap={14}>
        {moreArticles.map((a, i) => (
          <div key={i} style={{ minWidth: 220, background: colors.white, borderRadius: 14, overflow: "hidden", flexShrink: 0, boxShadow: "0 2px 8px rgba(28,25,21,0.05)", border: "1px solid rgba(28,25,21,0.04)" }}>
            <img src={a.img} alt="" style={{ width: 220, height: 110, objectFit: "cover", display: "block" }} />
            <div style={{ padding: 14 }}>
              <p style={{ fontFamily: fonts.mono, fontSize: 8, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", color: colors.amber, marginBottom: 6 }}>{a.category}</p>
              <p style={{ fontSize: 13, fontWeight: 700, color: colors.ink, lineHeight: 1.4, marginBottom: 8 }}>{a.title}</p>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 11, color: colors.brownMid }}>{a.author}</span>
                <span style={{ fontFamily: fonts.mono, fontSize: 9, color: colors.faded }}>{a.readTime}</span>
              </div>
            </div>
          </div>
        ))}
      </HScroll>
    </Screen>
  );
};

export default Guide;
