import React, { useState } from "react";
import { Screen, HScroll, Chip, NotifBell } from "../components/index.jsx";
import { Kicker, MonoMeta, LiveBadge } from "../components/marks/index.jsx";
import { guideCategories, featuredArticle, spotlightArticle, signalItems, moreArticles } from "../data/index.jsx";

const P = "#F4EFE7";
const A = "#C17F4A";
const E = "#D94F2A";
const F = "#8A8278";
const D = "'Fraunces', Georgia, serif";
const M = "'JetBrains Mono', monospace";
const glass = "rgba(244,239,231,0.05)";
const glassBorder = "rgba(244,239,231,0.10)";

const PlaceholderImg = ({ height, style = {} }) => (
  <div style={{
    width: "100%", height,
    background: "repeating-linear-gradient(135deg, #2a221a, #2a221a 10px, #201913 10px, #201913 20px)",
    position: "relative", ...style,
  }}>
    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 60%, rgba(193,127,74,0.18) 0%, transparent 60%)" }} />
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, rgba(12,10,8,0.92))" }} />
  </div>
);

const Guide = ({ onOpenNotifs }) => {
  const [activeCat, setActiveCat] = useState("For You");
  const [bookmarked, setBookmarked] = useState({});

  return (
    <Screen>
      {/* ── Masthead ─────────────────────────────────────────── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
        <div>
          <div style={{ fontFamily: D, fontSize: 38, fontWeight: 700, color: P, lineHeight: "38px", letterSpacing: "-0.02em" }}>
            The Guide
          </div>
          <div style={{ fontFamily: M, fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase", color: F, marginTop: 4 }}>
            Stories · Spotlights · Signals
          </div>
        </div>
        <div style={{ paddingTop: 6 }}>
          <NotifBell onClick={onOpenNotifs} />
        </div>
      </div>

      {/* ── Category chips ────────────────────────────────────── */}
      <HScroll gap={6} style={{ marginBottom: 22 }}>
        {guideCategories.map(c => <Chip key={c} label={c} active={activeCat === c} onClick={() => setActiveCat(c)} />)}
      </HScroll>

      {/* ── Featured Article ─────────────────────────────────── */}
      <div style={{ borderRadius: 22, overflow: "hidden", marginBottom: 26, background: glass, border: `1px solid ${glassBorder}` }}>
        <div style={{ position: "relative", height: 210 }}>
          <PlaceholderImg height={210} />
          {/* Category pill */}
          <div style={{ position: "absolute", top: 14, left: 14 }}>
            <span style={{
              background: "rgba(193,127,74,0.88)", borderRadius: 20, padding: "5px 12px",
              fontFamily: M, fontSize: 9, fontWeight: 700, letterSpacing: "0.1em",
              textTransform: "uppercase", color: "#14110F",
            }}>
              {featuredArticle.category}
            </span>
          </div>
        </div>
        <div style={{ padding: "18px 18px 20px" }}>
          <div style={{ fontFamily: D, fontSize: 22, fontWeight: 700, color: P, lineHeight: "28px", marginBottom: 8 }}>
            {featuredArticle.title}
          </div>
          <div style={{ fontFamily: D, fontSize: 14, fontStyle: "italic", color: F, lineHeight: "20px", marginBottom: 14 }}>
            {featuredArticle.subtitle}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 24, height: 24, borderRadius: "50%", background: "rgba(193,127,74,0.15)", border: "1px solid rgba(193,127,74,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: D, fontSize: 11, fontWeight: 700, color: A }}>
                {featuredArticle.author[0]}
              </div>
              <div>
                <div style={{ fontFamily: M, fontSize: 9, color: P, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  {featuredArticle.author}
                </div>
                <div style={{ fontFamily: M, fontSize: 8, color: F, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  {featuredArticle.authorRole}
                </div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ fontFamily: M, fontSize: 9, color: F, textTransform: "uppercase", letterSpacing: "0.06em" }}>{featuredArticle.readTime}</div>
              <button
                onClick={() => setBookmarked(p => ({ ...p, featured: !p.featured }))}
                style={{
                  width: 30, height: 30, border: `1px solid ${bookmarked.featured ? A : glassBorder}`,
                  background: bookmarked.featured ? "rgba(193,127,74,0.15)" : glass,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", borderRadius: "50%",
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24"
                  fill={bookmarked.featured ? A : "none"}
                  stroke={bookmarked.featured ? A : F}
                  strokeWidth="2">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Spotlight ────────────────────────────────────────── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
        <div style={{ fontFamily: D, fontSize: 22, fontWeight: 700, color: P }}>Spotlight</div>
        <span style={{ fontFamily: M, fontSize: 9, letterSpacing: "0.08em", textTransform: "uppercase", color: A, cursor: "pointer" }}>All Spotlights →</span>
      </div>

      <div style={{ background: glass, border: `1px solid ${glassBorder}`, borderRadius: 18, overflow: "hidden", marginBottom: 26 }}>
        <div style={{ position: "relative", height: 140 }}>
          <PlaceholderImg height={140} />
          <div style={{ position: "absolute", top: 12, left: 14, right: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ background: "rgba(217,79,42,0.85)", borderRadius: 20, padding: "4px 10px", fontFamily: M, fontSize: 8, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#fff" }}>
              Artist Spotlight
            </span>
            <div style={{ fontFamily: M, fontSize: 8, color: F, textTransform: "uppercase", letterSpacing: "0.06em" }}>Playing this week</div>
          </div>
        </div>
        <div style={{ padding: "16px 18px 20px" }}>
          <div style={{ fontFamily: M, fontSize: 10, color: A, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>
            {spotlightArticle.artist}
          </div>
          <div style={{ fontFamily: D, fontSize: 18, fontWeight: 700, color: P, lineHeight: "24px", marginBottom: 10 }}>
            {spotlightArticle.title}
          </div>
          <div style={{ fontFamily: D, fontSize: 13, fontStyle: "italic", color: F, lineHeight: "18px", marginBottom: 16 }}>
            {spotlightArticle.excerpt}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, border: "1px solid rgba(193,127,74,0.28)", borderRadius: 20, padding: "9px 14px", cursor: "pointer" }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: A, flexShrink: 0 }} />
            <div style={{ fontFamily: M, fontSize: 10, color: A, flex: 1, letterSpacing: "0.04em", textTransform: "uppercase" }}>
              {spotlightArticle.showLink}
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={A} strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
          </div>
        </div>
      </div>

      {/* ── The Signal ───────────────────────────────────────── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
        <div style={{ fontFamily: D, fontSize: 22, fontWeight: 700, color: P }}>The Signal</div>
        <span style={{ fontFamily: M, fontSize: 9, letterSpacing: "0.08em", textTransform: "uppercase", color: A, cursor: "pointer" }}>View All →</span>
      </div>
      <div style={{ fontFamily: M, fontSize: 9, color: F, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 14 }}>
        Quick hits · Updated live
      </div>

      {signalItems.map((s, i) => (
        <div key={i} style={{
          display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12,
          padding: "12px 14px", marginBottom: 8,
          background: glass, border: `1px solid ${glassBorder}`, borderRadius: 14,
        }}>
          <div style={{ flex: 1 }}>
            {s.hot && <div style={{ marginBottom: 6 }}><LiveBadge /></div>}
            <div style={{ fontFamily: D, fontSize: 15, fontWeight: 700, color: P, lineHeight: "20px", marginBottom: 3 }}>
              {s.title}
            </div>
            <div style={{ fontFamily: M, fontSize: 9, color: F, textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.detail}</div>
          </div>
          <div style={{ fontFamily: M, fontSize: 9, color: F, textTransform: "uppercase", letterSpacing: "0.06em", flexShrink: 0, marginTop: 2 }}>
            {s.time}
          </div>
        </div>
      ))}

      <div style={{ height: 1, background: glassBorder, margin: "22px 0" }} />

      {/* ── Sponsored ────────────────────────────────────────── */}
      <div style={{ background: glass, border: `1px solid ${glassBorder}`, borderRadius: 18, overflow: "hidden", marginBottom: 4 }}>
        <div style={{ position: "relative", height: 100 }}>
          <PlaceholderImg height={100} />
        </div>
        <div style={{ padding: "12px 16px 14px" }}>
          <div style={{ fontFamily: M, fontSize: 9, color: A, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700, marginBottom: 6 }}>Presented by Mohawk</div>
          <div style={{ fontFamily: D, fontSize: 17, fontWeight: 700, color: P, lineHeight: "22px" }}>
            This Month at Mohawk: 12 Shows You Can't Miss
          </div>
        </div>
      </div>
      <div style={{ fontFamily: M, fontSize: 8, color: F, textTransform: "uppercase", letterSpacing: "0.06em", textAlign: "right", marginBottom: 26 }}>
        Sponsored
      </div>

      {/* ── More to Read ─────────────────────────────────────── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
        <div style={{ fontFamily: D, fontSize: 22, fontWeight: 700, color: P }}>More to Read</div>
        <span style={{ fontFamily: M, fontSize: 9, letterSpacing: "0.08em", textTransform: "uppercase", color: A, cursor: "pointer" }}>Browse All →</span>
      </div>

      <HScroll gap={12}>
        {moreArticles.map((a, i) => (
          <div key={i} style={{
            minWidth: 195, background: glass, border: `1px solid ${glassBorder}`,
            borderRadius: 18, overflow: "hidden", flexShrink: 0,
          }}>
            <div style={{ height: 110, position: "relative", background: "repeating-linear-gradient(135deg, #2a221a, #2a221a 8px, #201913 8px, #201913 16px)" }}>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, rgba(12,10,8,0.9))" }} />
            </div>
            <div style={{ padding: "10px 12px 14px" }}>
              <div style={{ fontFamily: M, fontSize: 9, color: A, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700, marginBottom: 6 }}>
                {a.category}
              </div>
              <div style={{ fontFamily: D, fontSize: 14, fontWeight: 700, color: P, lineHeight: "18px", marginBottom: 8 }}>
                {a.title}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ fontFamily: M, fontSize: 8, color: F, textTransform: "uppercase", letterSpacing: "0.06em" }}>{a.author}</div>
                <div style={{ fontFamily: M, fontSize: 8, color: F, textTransform: "uppercase", letterSpacing: "0.06em" }}>{a.readTime}</div>
              </div>
            </div>
          </div>
        ))}
      </HScroll>
    </Screen>
  );
};

export default Guide;
