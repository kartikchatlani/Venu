import React, { useEffect, useRef, useState } from "react";

const C = {
  ink:     "#14110F",
  paper:   "#F4EFE7",
  paper2:  "#ECE5D7",
  burnt:   "#C17F4A",
  marquee: "#D94F2A",
  faded:   "#8A8278",
};

// ── Kicker ───────────────────────────────────────────────────────────────────
// Small mono-caps label with optional leading mark. Sits above headlines.
export const Kicker = ({ children, color = C.burnt, dot = true, style = {} }) => (
  <div style={{
    display: "flex", alignItems: "center", gap: 6,
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 10, lineHeight: "14px",
    letterSpacing: "0.08em", textTransform: "uppercase",
    fontWeight: 600, color,
    ...style,
  }}>
    {dot && (
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: color, flexShrink: 0, display: "inline-block" }} />
    )}
    {children}
  </div>
);

// ── MonoMeta ─────────────────────────────────────────────────────────────────
// Mono metadata string — times, dates, venue, stats.
export const MonoMeta = ({ children, size = 11, color = C.faded, style = {} }) => (
  <span style={{
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: size, lineHeight: "14px",
    letterSpacing: "0.06em", textTransform: "uppercase",
    fontWeight: 500, color,
    ...style,
  }}>
    {children}
  </span>
);

// ── HairlineRule ─────────────────────────────────────────────────────────────
// Single-pixel editorial divider. Optional centered label.
export const HairlineRule = ({ label, style = {} }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0", ...style }}>
    <div style={{ flex: 1, height: 1, background: "rgba(244,239,231,0.12)" }} />
    {label && (
      <span style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase",
        color: C.faded, whiteSpace: "nowrap", fontWeight: 500,
      }}>
        {label}
      </span>
    )}
    {label && <div style={{ flex: 1, height: 1, background: "rgba(244,239,231,0.12)" }} />}
  </div>
);

// ── EditorialHeadline ────────────────────────────────────────────────────────
// Display serif headline with optional kicker and italic variant.
export const EditorialHeadline = ({
  children, kicker, size = "m", italic = true,
  color = C.ink, kickerColor = C.burnt, style = {},
}) => {
  const sizes = { xl: [56, "56px"], l: [40, "44px"], m: [28, "32px"], s: [22, "28px"] };
  const [fs, lh] = sizes[size] || sizes.m;
  return (
    <div style={style}>
      {kicker && <Kicker color={kickerColor} style={{ marginBottom: 8 }}>{kicker}</Kicker>}
      <div style={{
        fontFamily: "'Fraunces', Georgia, serif",
        fontSize: fs, lineHeight: lh,
        letterSpacing: fs >= 40 ? "-0.02em" : fs >= 28 ? "-0.01em" : "0",
        fontWeight: 700,
        fontStyle: italic ? "italic" : "normal",
        color,
        fontOpticalSizing: "auto",
      }}>
        {children}
      </div>
    </div>
  );
};

// ── FlipDigits ───────────────────────────────────────────────────────────────
// Flip-clock style numeric display. Two digits per unit.
export const FlipDigits = ({ value, label, size = "md" }) => {
  const [displayed, setDisplayed] = useState(value);
  const [flipping, setFlipping] = useState(false);
  const prevRef = useRef(value);

  useEffect(() => {
    if (value !== prevRef.current) {
      setFlipping(true);
      const t = setTimeout(() => {
        setDisplayed(value);
        setFlipping(false);
        prevRef.current = value;
      }, 150);
      return () => clearTimeout(t);
    }
  }, [value]);

  const digits = String(Math.max(0, displayed)).padStart(2, "0").split("");
  const w = size === "lg" ? 36 : 28;
  const h = size === "lg" ? 48 : 36;
  const fs = size === "lg" ? 28 : 22;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <div style={{ display: "flex", gap: 3 }}>
        {digits.map((d, i) => (
          <div key={i} style={{
            width: w, height: h,
            background: C.ink,
            borderRadius: 4,
            display: "flex", alignItems: "center", justifyContent: "center",
            position: "relative", overflow: "hidden",
            transition: "opacity 150ms ease",
            opacity: flipping ? 0.4 : 1,
          }}>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: fs, fontWeight: 700,
              color: C.burnt, lineHeight: 1,
              position: "relative", zIndex: 1,
            }}>
              {d}
            </span>
            {/* Center hairline */}
            <div style={{
              position: "absolute", left: 0, right: 0,
              top: "50%", height: 1,
              background: "rgba(0,0,0,0.5)", zIndex: 2,
            }} />
          </div>
        ))}
      </div>
      {label && (
        <MonoMeta size={9} color={C.faded}>{label}</MonoMeta>
      )}
    </div>
  );
};

// ── Stamp ─────────────────────────────────────────────────────────────────────
// Rubber-stamp circle mark. Slightly imperfect via SVG filter.
export const Stamp = ({
  label, sub, rotate = 0, size = 80,
  color = C.burnt, filled = false, style = {},
}) => {
  const id = `stamp-rough-${Math.round(rotate * 10)}`;
  return (
    <div style={{ transform: `rotate(${rotate}deg)`, display: "inline-flex", ...style }}>
      <svg
        width={size} height={size}
        viewBox="0 0 90 90"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: "url(#stamp-rough)" }}
      >
        <defs>
          <filter id="stamp-rough">
            <feTurbulence type="turbulence" baseFrequency="0.04" numOctaves="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.2" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
        {/* Outer ring */}
        <circle cx="45" cy="45" r="42" fill={filled ? color : "none"} stroke={color} strokeWidth="2.5" />
        {/* Inner ring */}
        <circle cx="45" cy="45" r="34" fill="none" stroke={color} strokeWidth="1" opacity="0.6" />
        {/* Label */}
        <text
          x="45" y={sub ? "42" : "50"}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={filled ? C.paper : color}
          fontFamily="'JetBrains Mono', monospace"
          fontSize="10" fontWeight="700"
          letterSpacing="3"
        >
          {label}
        </text>
        {sub && (
          <text
            x="45" y="56"
            textAnchor="middle"
            fill={filled ? C.paper : color}
            fontFamily="'JetBrains Mono', monospace"
            fontSize="8" letterSpacing="1.5"
            opacity="0.8"
          >
            {sub}
          </text>
        )}
      </svg>
    </div>
  );
};

// ── TicketStub ───────────────────────────────────────────────────────────────
// Perforated-edge ticket component. Horizontal or vertical orientation.
export const TicketStub = ({
  artist, venue, date, time, price, genre,
  status, // "going" | "wishlist" | null
  onClick,
  style = {},
}) => (
  <div
    onClick={onClick}
    className="pressable"
    style={{
      background: "rgba(244,239,231,0.05)",
      border: "1px solid rgba(244,239,231,0.10)",
      borderRadius: 4,
      position: "relative",
      padding: "12px 14px 12px 20px",
      cursor: onClick ? "pointer" : "default",
      minWidth: 200,
      flexShrink: 0,
      ...style,
    }}
  >
    {/* Perforation left edge */}
    <div style={{
      position: "absolute", top: 0, bottom: 0, left: 0, width: 10,
      background: "transparent",
      borderRadius: "16px 0 0 16px",
      borderRight: `1px dashed rgba(193,127,74,0.4)`,
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "space-around", paddingBlock: 6, gap: 5,
    }}>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(244,239,231,0.15)" }} />
      ))}
    </div>

    {/* Content */}
    <div>
      {status && (
        <MonoMeta size={9} color={status === "going" ? C.burnt : C.faded} style={{ marginBottom: 6 }}>
          {status === "going" ? "✓ Going" : "♡ Wishlist"}
        </MonoMeta>
      )}
      <div style={{
        fontFamily: "'Fraunces', Georgia, serif",
        fontSize: 16, fontWeight: 700,
        color: "#F4EFE7", lineHeight: "20px", marginBottom: 4,
      }}>
        {artist}
      </div>
      <MonoMeta size={10} color={C.faded}>{venue}</MonoMeta>
      <div style={{ marginTop: 8, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <MonoMeta size={10} color={C.faded}>{date}</MonoMeta>
        {price && <MonoMeta size={10} color={C.burnt}>{price}</MonoMeta>}
      </div>
    </div>
  </div>
);

// ── LiveBadge ─────────────────────────────────────────────────────────────────
// Pulsing LIVE NOW indicator.
export const LiveBadge = ({ style = {} }) => (
  <div style={{
    display: "inline-flex", alignItems: "center", gap: 5,
    background: C.marquee, borderRadius: 3,
    padding: "3px 8px",
    ...style,
  }}>
    <span style={{
      width: 5, height: 5, borderRadius: "50%",
      background: "#fff",
      animation: "live-pulse 1.2s ease-in-out infinite",
    }} />
    <MonoMeta size={9} color="#fff">Live Now</MonoMeta>
    <style>{`
      @keyframes live-pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.4; }
      }
      @media (prefers-reduced-motion: reduce) {
        .live-dot { animation: none; }
      }
    `}</style>
  </div>
);
