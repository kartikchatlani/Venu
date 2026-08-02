import React, { useState, useEffect } from "react";
import { HairlineRule, MonoMeta } from "./marks/index.jsx";

const P = "#F4EFE7";
const A = "#C17F4A";
const E = "#D94F2A";
const F = "#8A8278";
const D = "'Fraunces', Georgia, serif";
const M = "'JetBrains Mono', monospace";
const glass = "rgba(244,239,231,0.05)";
const glassBorder = "rgba(244,239,231,0.10)";

// ── Hardcoded mock setlist ────────────────────────────────────────────────────
const MOCK_SETLIST = [
  { position: 1,  title: "A Calf Born in Winter",    isEncore: false, isCover: false, matched: true  },
  { position: 2,  title: "So We Won't Forget",        isEncore: false, isCover: false, matched: true  },
  { position: 3,  title: "Maria También",             isEncore: false, isCover: false, matched: true  },
  { position: 4,  title: "Time (You and I)",          isEncore: false, isCover: false, matched: true  },
  { position: 5,  title: "Connaissais de Vue",        isEncore: false, isCover: false, matched: true  },
  { position: 6,  title: "Tus Pecados",               isEncore: false, isCover: false, matched: true  },
  { position: 7,  title: "Friday Morning",            isEncore: false, isCover: false, matched: true  },
  { position: 8,  title: "Evan Finds the Third Room", isEncore: false, isCover: false, matched: true  },
  { position: 9,  title: "August 10",                 isEncore: false, isCover: false, matched: true  },
  { position: 10, title: "Pelota",                    isEncore: false, isCover: false, matched: true  },
  { position: 11, title: "Hold Your Head Up",         isEncore: false, isCover: true,  coverArtist: "Argent", matched: true  },
  { position: 12, title: "If There Is No Question",   isEncore: false, isCover: false, matched: true  },
  { position: 13, title: "People Everywhere",         isEncore: false, isCover: false, matched: true  },
  { position: 14, title: "Dearest Alfred",            isEncore: true,  isCover: false, matched: true  },
  { position: 15, title: "Texas Sun",                 isEncore: true,  isCover: false, matched: true  },
  { position: 16, title: "Calf Roping",               isEncore: true,  isCover: false, matched: false },
];

const MATCHED_COUNT = MOCK_SETLIST.filter((s) => s.matched).length;
const TOTAL_COUNT = MOCK_SETLIST.length;

// ── Sub-components ────────────────────────────────────────────────────────────
const BackButton = ({ onBack, label = "Back" }) => (
  <button onClick={onBack} style={{
    display: "flex", alignItems: "center", gap: 6,
    background: glass, border: `1px solid ${glassBorder}`,
    borderRadius: 20, padding: "7px 14px", cursor: "pointer",
    fontFamily: M, fontSize: 9, fontWeight: 700,
    letterSpacing: "0.08em", textTransform: "uppercase", color: P,
  }}>
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={P} strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
    {label}
  </button>
);

const AmberBtn = ({ onClick, children, disabled = false }) => (
  <button onClick={onClick} disabled={disabled} style={{
    width: "100%", padding: "14px 0", borderRadius: 30,
    background: disabled ? "rgba(193,127,74,0.3)" : A,
    color: disabled ? "rgba(20,17,15,0.5)" : "#14110F",
    border: "none", cursor: disabled ? "not-allowed" : "pointer",
    fontFamily: M, fontSize: 11, fontWeight: 700,
    letterSpacing: "0.08em", textTransform: "uppercase",
    boxShadow: disabled ? "none" : "0 0 20px rgba(193,127,74,0.3)",
  }}>
    {children}
  </button>
);

// ── Step: Searching ───────────────────────────────────────────────────────────
const StepSearching = () => (
  <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18, padding: "0 32px" }}>
    <div style={{
      width: 64, height: 64, borderRadius: "50%",
      border: `2px solid ${glassBorder}`,
      borderTopColor: A,
      animation: "spin 1s linear infinite",
    }} />
    <div style={{ textAlign: "center" }}>
      <div style={{ fontFamily: D, fontSize: 22, fontWeight: 700, color: P, marginBottom: 6 }}>
        Finding your setlist...
      </div>
      <div style={{ fontFamily: M, fontSize: 9, color: F, textTransform: "uppercase", letterSpacing: "0.08em" }}>
        Checking setlist.fm for Khruangbin
      </div>
    </div>
  </div>
);

// ── Step: Found ───────────────────────────────────────────────────────────────
const StepFound = ({ onNext, onClose }) => {
  const mainSet = MOCK_SETLIST.filter((s) => !s.isEncore);
  const encore = MOCK_SETLIST.filter((s) => s.isEncore);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
      {/* Header */}
      <div style={{ padding: "20px 22px 0", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: A }} />
          <span style={{ fontFamily: M, fontSize: 9, fontWeight: 700, color: A, textTransform: "uppercase", letterSpacing: "0.1em" }}>
            setlist.fm
          </span>
        </div>
        <div style={{ fontFamily: D, fontSize: 26, fontWeight: 700, color: P, lineHeight: "28px", marginBottom: 4 }}>
          Khruangbin
        </div>
        <div style={{ fontFamily: M, fontSize: 9, color: F, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>
          Stubb's Outdoor · Austin, TX
        </div>
        <div style={{ fontFamily: M, fontSize: 9, color: F, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 16 }}>
          Apr 12, 2026 · {TOTAL_COUNT} songs
        </div>
        <div style={{ height: 1, background: glassBorder }} />
      </div>

      {/* Scrollable setlist */}
      <div style={{ flex: 1, overflowY: "auto", scrollbarWidth: "none", padding: "14px 22px 0" }}>
        {mainSet.map((song, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "baseline", gap: 12,
            paddingBottom: 10, marginBottom: 10,
            borderBottom: i < mainSet.length - 1 ? `1px solid ${glassBorder}` : "none",
          }}>
            <span style={{ fontFamily: M, fontSize: 9, color: F, width: 18, flexShrink: 0, textAlign: "right" }}>
              {song.position}
            </span>
            <div style={{ flex: 1 }}>
              <span style={{ fontFamily: D, fontSize: 15, fontWeight: 600, color: P }}>
                {song.title}
              </span>
              {song.isCover && (
                <span style={{ fontFamily: M, fontSize: 8, color: F, textTransform: "uppercase", letterSpacing: "0.06em", marginLeft: 8 }}>
                  cover · {song.coverArtist}
                </span>
              )}
            </div>
          </div>
        ))}

        {encore.length > 0 && (
          <>
            <HairlineRule label="Encore" style={{ margin: "8px 0 12px" }} />
            {encore.map((song, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "baseline", gap: 12,
                paddingBottom: 10, marginBottom: 10,
                borderBottom: i < encore.length - 1 ? `1px solid ${glassBorder}` : "none",
              }}>
                <span style={{ fontFamily: M, fontSize: 9, color: F, width: 18, flexShrink: 0, textAlign: "right" }}>
                  {song.position}
                </span>
                <div style={{ flex: 1 }}>
                  <span style={{ fontFamily: D, fontSize: 15, fontWeight: 600, color: P }}>
                    {song.title}
                  </span>
                </div>
              </div>
            ))}
          </>
        )}
        <div style={{ height: 16 }} />
      </div>

      {/* CTA */}
      <div style={{ padding: "14px 22px 22px", flexShrink: 0, borderTop: `1px solid ${glassBorder}` }}>
        <AmberBtn onClick={onNext}>Build Playlist</AmberBtn>
      </div>
    </div>
  );
};

// ── Step: Connect Spotify ─────────────────────────────────────────────────────
const StepConnect = ({ onNext }) => (
  <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "32px 22px 22px", gap: 0 }}>
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20 }}>
      {/* Spotify icon */}
      <div style={{
        width: 72, height: 72, borderRadius: "50%",
        background: "#1DB954",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <svg width="36" height="36" viewBox="0 0 24 24" fill="#fff">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
        </svg>
      </div>

      <div style={{ textAlign: "center" }}>
        <div style={{ fontFamily: D, fontSize: 24, fontWeight: 700, color: P, marginBottom: 8, lineHeight: "26px" }}>
          Connect Spotify
        </div>
        <div style={{ fontFamily: M, fontSize: 9, color: F, textTransform: "uppercase", letterSpacing: "0.06em", lineHeight: "16px" }}>
          Venu will create this playlist directly in your Spotify account. We only ask for permission to create and edit playlists.
        </div>
      </div>

      <div style={{
        width: "100%", background: glass, border: `1px solid ${glassBorder}`,
        borderRadius: 14, padding: "14px 16px",
        display: "flex", flexDirection: "column", gap: 10,
      }}>
        {["Create playlists in your library", "Add songs to playlists", "Never access your private data"].map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(29,185,84,0.15)", border: "1px solid rgba(29,185,84,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#1DB954" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <span style={{ fontFamily: M, fontSize: 9, color: F, textTransform: "uppercase", letterSpacing: "0.05em" }}>{item}</span>
          </div>
        ))}
      </div>
    </div>

    <AmberBtn onClick={onNext}>Connect Spotify</AmberBtn>
  </div>
);

// ── Step: Matching ────────────────────────────────────────────────────────────
const StepMatching = ({ onNext }) => {
  const unmatched = MOCK_SETLIST.filter((s) => !s.matched);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
      <div style={{ padding: "20px 22px 0", flexShrink: 0 }}>
        <div style={{ fontFamily: D, fontSize: 22, fontWeight: 700, color: P, marginBottom: 4 }}>
          Track Matching
        </div>

        {/* Match score */}
        <div style={{
          background: glass, border: `1px solid ${glassBorder}`,
          borderRadius: 14, padding: "14px 16px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginTop: 14, marginBottom: 16,
        }}>
          <div>
            <div style={{ fontFamily: M, fontSize: 8, color: F, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 4 }}>
              Matched
            </div>
            <div style={{ fontFamily: D, fontSize: 28, fontWeight: 700, color: A }}>
              {MATCHED_COUNT} <span style={{ fontSize: 16, color: F }}>/ {TOTAL_COUNT}</span>
            </div>
          </div>
          <div style={{
            width: 52, height: 52, borderRadius: "50%",
            background: `conic-gradient(${A} ${(MATCHED_COUNT / TOTAL_COUNT) * 360}deg, rgba(244,239,231,0.08) 0deg)`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#17120e", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: M, fontSize: 9, fontWeight: 700, color: A }}>{Math.round((MATCHED_COUNT / TOTAL_COUNT) * 100)}%</span>
            </div>
          </div>
        </div>

        {unmatched.length > 0 && (
          <>
            <div style={{ fontFamily: M, fontSize: 8, color: F, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>
              Could not match
            </div>
            {unmatched.map((song, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "10px 12px", background: glass, border: `1px solid ${glassBorder}`,
                borderRadius: 10, marginBottom: 8,
              }}>
                <div>
                  <div style={{ fontFamily: D, fontSize: 14, color: P, marginBottom: 2 }}>{song.title}</div>
                  <div style={{ fontFamily: M, fontSize: 8, color: F, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    Unreleased / not on Spotify
                  </div>
                </div>
                <span style={{ fontFamily: M, fontSize: 8, color: F, textTransform: "uppercase", letterSpacing: "0.06em" }}>Skip</span>
              </div>
            ))}
          </>
        )}
      </div>

      <div style={{ flex: 1 }} />
      <div style={{ padding: "14px 22px 22px", flexShrink: 0, borderTop: `1px solid ${glassBorder}` }}>
        <AmberBtn onClick={onNext}>Create Playlist</AmberBtn>
      </div>
    </div>
  );
};

// ── Step: Created ─────────────────────────────────────────────────────────────
const StepCreated = ({ onClose }) => (
  <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "32px 22px", gap: 24 }}>
    {/* Ticket stub style artifact */}
    <div style={{
      width: "100%",
      background: "linear-gradient(135deg, #1a1410, #0c0a08)",
      border: `1px solid ${glassBorder}`,
      borderRadius: 18, overflow: "hidden",
      position: "relative",
    }}>
      {/* Dashed left perforation */}
      <div style={{
        position: "absolute", left: 52, top: 0, bottom: 0,
        borderLeft: "1px dashed rgba(193,127,74,0.3)",
      }} />
      <div style={{ display: "flex" }}>
        {/* Left stub: Spotify icon */}
        <div style={{ width: 52, display: "flex", alignItems: "center", justifyContent: "center", padding: "18px 0", flexShrink: 0 }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#1DB954", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
          </div>
        </div>
        {/* Right: playlist info */}
        <div style={{ flex: 1, padding: "16px 16px 16px 20px" }}>
          <div style={{ fontFamily: M, fontSize: 8, color: A, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>
            Playlist Saved
          </div>
          <div style={{ fontFamily: D, fontSize: 16, fontWeight: 700, color: P, marginBottom: 2 }}>
            Khruangbin
          </div>
          <div style={{ fontFamily: M, fontSize: 8, color: F, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>
            Stubb's Outdoor · Apr 12, 2026
          </div>
          <div style={{ fontFamily: M, fontSize: 9, color: F, letterSpacing: "0.04em" }}>
            {MATCHED_COUNT} tracks · in setlist order
          </div>
        </div>
      </div>
    </div>

    <div style={{ textAlign: "center" }}>
      <div style={{ fontFamily: D, fontSize: 22, fontWeight: 700, color: P, marginBottom: 6 }}>
        Saved to this show.
      </div>
      <div style={{ fontFamily: M, fontSize: 9, color: F, textTransform: "uppercase", letterSpacing: "0.07em", lineHeight: "16px" }}>
        Find it anytime from your Passport under Replay.
      </div>
    </div>

    {/* Open in Spotify */}
    <a href="#" onClick={(e) => e.preventDefault()} style={{
      display: "flex", alignItems: "center", gap: 10,
      background: "#1DB954", color: "#fff",
      borderRadius: 30, padding: "13px 28px",
      textDecoration: "none",
      fontFamily: M, fontSize: 10, fontWeight: 700,
      letterSpacing: "0.08em", textTransform: "uppercase",
    }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
      </svg>
      Open in Spotify
    </a>

    <button onClick={onClose} style={{
      background: "transparent", border: "none", cursor: "pointer",
      fontFamily: M, fontSize: 9, color: F, textTransform: "uppercase", letterSpacing: "0.08em",
    }}>
      Done
    </button>
  </div>
);

// ── Main component ────────────────────────────────────────────────────────────
export const SetlistStep = ({ event, onClose }) => {
  const [step, setStep] = useState("searching");

  // Auto-advance from searching after 1.5s
  useEffect(() => {
    if (step !== "searching") return;
    const t = setTimeout(() => setStep("found"), 1500);
    return () => clearTimeout(t);
  }, [step]);

  const stepTitles = {
    searching: "Relive the Night",
    found:     "Your Setlist",
    connect:   "Connect Streaming",
    matching:  "Building Playlist",
    created:   "Playlist Ready",
  };

  return (
    <div style={{
      position: "absolute", inset: 0, zIndex: 190,
      background: "#17120e",
      display: "flex", flexDirection: "column",
    }}>
      {/* Header */}
      <div style={{
        padding: "52px 22px 16px", flexShrink: 0,
        borderBottom: step === "found" || step === "matching" ? `1px solid ${glassBorder}` : "none",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <BackButton onBack={onClose} label={step === "created" ? "Done" : "Cancel"} />
        <span style={{ fontFamily: M, fontSize: 9, fontWeight: 700, color: F, textTransform: "uppercase", letterSpacing: "0.1em" }}>
          {stepTitles[step]}
        </span>
        <div style={{ width: 72 }} />
      </div>

      {/* Step content */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      {step === "searching" && <StepSearching />}
      {step === "found"     && <StepFound onNext={() => setStep("connect")} onClose={onClose} />}
      {step === "connect"   && <StepConnect onNext={() => setStep("matching")} />}
      {step === "matching"  && <StepMatching onNext={() => setStep("created")} />}
      {step === "created"   && <StepCreated onClose={onClose} />}
    </div>
  );
};
