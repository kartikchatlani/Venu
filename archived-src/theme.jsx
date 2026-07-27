// Venu Design System — Editorial Music Aesthetic
// All values mirror the CSS custom properties in global.css
// Components may read either; CSS vars are canonical for new work.

export const colors = {
  // Core ink kit
  ink:      "#14110F",
  paper:    "#F4EFE7",
  paper2:   "#ECE5D7",
  burnt:    "#C17F4A",
  marquee:  "#D94F2A",
  moss:     "#4A5D3A",
  bruise:   "#2C1F3D",
  faded:    "#8A8278",

  // Legacy aliases kept so existing pages don't break
  cream:      "#F4EFE7",
  amber:      "#C17F4A",
  gold:       "#E8C27A",
  brownMid:   "#8A8278",
  warmGray:   "#ECE5D7",
  border:     "rgba(20,17,15,0.12)",
  white:      "#FFFFFF",
  dark2:      "#2C261E",
  terracotta: "#D94F2A",
  sage:       "#4A5D3A",
  olive:      "#5C4F3D",
};

export const fonts = {
  display: "'Fraunces', Georgia, serif",
  body:    "'Inter', system-ui, sans-serif",
  mono:    "'JetBrains Mono', 'Courier New', monospace",
};

// Type scale — matches typography.css
export const type = {
  displayXl: { fontFamily: "'Fraunces', Georgia, serif", fontSize: 56, lineHeight: "56px", letterSpacing: "-0.02em" },
  displayL:  { fontFamily: "'Fraunces', Georgia, serif", fontSize: 40, lineHeight: "44px", letterSpacing: "-0.01em" },
  displayM:  { fontFamily: "'Fraunces', Georgia, serif", fontSize: 28, lineHeight: "32px", letterSpacing: "0" },
  bodyL:     { fontFamily: "'Inter', system-ui, sans-serif", fontSize: 17, lineHeight: "26px" },
  body:      { fontFamily: "'Inter', system-ui, sans-serif", fontSize: 15, lineHeight: "24px" },
  caption:   { fontFamily: "'Inter', system-ui, sans-serif", fontSize: 13, lineHeight: "18px", letterSpacing: "0.01em" },
  monoMeta:  { fontFamily: "'JetBrains Mono', monospace", fontSize: 11, lineHeight: "14px", letterSpacing: "0.06em", textTransform: "uppercase" },
};
