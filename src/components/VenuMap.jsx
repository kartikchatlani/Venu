import { useEffect, useRef } from "react";
import { colors, fonts } from "../theme.jsx";

let L = null;

const loadLeaflet = async () => {
  if (L) return L;
  if (!document.getElementById("leaflet-css")) {
    const link = document.createElement("link");
    link.id = "leaflet-css";
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);
  }
  const mod = await import("leaflet");
  L = mod.default;
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  });
  return L;
};

const createPinSvg = (color) => `
  <svg width="28" height="36" viewBox="0 0 28 36" xmlns="http://www.w3.org/2000/svg">
    <circle cx="14" cy="14" r="13" fill="${color}" stroke="white" stroke-width="2.5"/>
    <polygon points="14,34 8,22 20,22" fill="${color}"/>
    <circle cx="14" cy="14" r="5" fill="white" opacity="0.9"/>
  </svg>
`;

const POPUP_STYLES = `
  .venu-popup .leaflet-popup-content-wrapper {
    background: #FAF6F1;
    border: 1px solid rgba(28,25,21,0.08);
    border-radius: 16px;
    box-shadow: 0 8px 28px rgba(28,25,21,0.16);
    padding: 0;
    overflow: hidden;
    min-width: 220px;
  }
  .venu-popup .leaflet-popup-content { margin: 0; width: auto !important; }
  .venu-popup .leaflet-popup-tip-container { display: none; }
  .venu-popup .leaflet-popup-close-button { display: none; }
  .venu-map-btn {
    flex: 1; padding: 9px 0; border: none; border-radius: 10px;
    font-family: inherit; font-size: 11px; font-weight: 600;
    cursor: pointer; display: flex; align-items: center;
    justify-content: center; gap: 5px; transition: opacity 0.15s;
  }
  .venu-map-btn:active { opacity: 0.75; }
  .venu-map-btn-primary { background: #1C1915; color: #F2CC8F; }
  .venu-map-btn-secondary { background: rgba(28,25,21,0.07); color: #1C1915; }
  .venu-map-btn-wishlisted { background: rgba(193,127,74,0.15); color: #C17F4A; }
`;

const matchShow = (venue, shows) =>
  shows.find((s) => {
    const vn = venue.name.toLowerCase();
    const sv = (s.venue || "").toLowerCase();
    return sv.includes(vn) || vn.includes(sv);
  }) || null;

const buildPopupContent = (venue, show, isWishlisted) => {
  const typeLabel = venue.type === "festival" ? "Festival Grounds" : "Live Venue";

  const venueSection = `
    <div style="padding:14px 16px 12px;">
      <p style="font-size:14px;font-weight:700;color:#1C1915;margin:0 0 3px;line-height:1.3;">${venue.name}</p>
      <p style="font-size:11px;color:#8A7E70;margin:0 0 8px;">${venue.address}</p>
      <div style="display:flex;gap:6px;flex-wrap:wrap;">
        <span style="font-size:9px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:#8A7E70;background:rgba(28,25,21,0.06);padding:3px 9px;border-radius:20px;">${typeLabel}</span>
        <span style="font-size:9px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:#8A7E70;background:rgba(28,25,21,0.06);padding:3px 9px;border-radius:20px;">Cap. ${venue.capacity}</span>
        ${show ? `<span style="font-size:9px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:#C17F4A;background:rgba(193,127,74,0.12);padding:3px 9px;border-radius:20px;">● Show Tonight</span>` : ""}
      </div>
    </div>
  `;

  const showSection = show ? `
    <div style="margin:0 12px 12px;padding:11px 13px;background:rgba(193,127,74,0.07);border:1px solid rgba(193,127,74,0.18);border-radius:12px;">
      <p style="font-size:13px;font-weight:700;color:#1C1915;margin:0 0 3px;">${show.artist}</p>
      <p style="font-size:11px;color:#8A7E70;margin:0;">${show.time || "Tonight"}${show.price ? " · " + show.price : ""}</p>
    </div>
  ` : "";

  const wishlistLabel = isWishlisted ? "♥ Saved" : "♡ Save";
  const wishlistClass = isWishlisted ? "venu-map-btn venu-map-btn-wishlisted" : "venu-map-btn venu-map-btn-secondary";

  const actionsSection = show ? `
    <div style="display:flex;gap:8px;padding:0 12px 14px;">
      <button class="venu-map-btn venu-map-btn-primary" data-action="tickets" data-ticket-url="${show.ticketUrl || show.ticket_url || ""}">
        🎟 Get Tickets
      </button>
      <button class="${wishlistClass}" data-action="wishlist" data-event-id="${show.id}">
        ${wishlistLabel}
      </button>
    </div>
  ` : `
    <div style="padding:0 12px 14px;">
      <p style="font-size:11px;color:#8A7E70;font-style:italic;margin:0;">No show tonight — check back soon.</p>
    </div>
  `;

  return venueSection + showSection + actionsSection;
};

export const VenuMap = ({ venues, tonightShows = [], wishlistIds = new Set(), onToggleWishlist, focusVenueIdx = null }) => {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  // Keep refs current so lazy popup build always uses latest data
  const tonightShowsRef = useRef(tonightShows);
  const wishlistIdsRef = useRef(wishlistIds);
  const onToggleWishlistRef = useRef(onToggleWishlist);

  const recolorPins = (leaflet, shows) => {
    markersRef.current.forEach(({ marker, venue }) => {
      const hasShow = !!matchShow(venue, shows);
      const color = venue.type === "festival" ? colors.terracotta : hasShow ? colors.amber : "#B0A090";
      marker.setIcon(leaflet.divIcon({
        html: createPinSvg(color),
        className: "",
        iconSize: [28, 36],
        iconAnchor: [14, 36],
        popupAnchor: [0, -40],
      }));
    });
  };

  useEffect(() => {
    tonightShowsRef.current = tonightShows;
    if (!markersRef.current.length) return;
    loadLeaflet().then((leaflet) => recolorPins(leaflet, tonightShows));
  }, [tonightShows]);
  useEffect(() => { wishlistIdsRef.current = wishlistIds; }, [wishlistIds]);
  useEffect(() => { onToggleWishlistRef.current = onToggleWishlist; }, [onToggleWishlist]);

  // Pan to venue and open its popup when focusVenueIdx changes
  useEffect(() => {
    if (focusVenueIdx === null || !mapRef.current) return;
    const entry = markersRef.current[focusVenueIdx];
    if (!entry) return;
    const { marker, venue } = entry;
    mapRef.current.panTo([venue.lat, venue.lng], { animate: true, duration: 0.5 });
    // Small delay so the pan completes before the popup opens
    setTimeout(() => {
      const show = matchShow(venue, tonightShowsRef.current);
      const isWishlisted = show ? wishlistIdsRef.current.has(show.id) : false;
      marker.getPopup().setContent(buildPopupContent(venue, show, isWishlisted));
      marker.openPopup();
    }, 300);
  }, [focusVenueIdx]);

  useEffect(() => {
    // Inject styles once
    if (!document.getElementById("venu-popup-styles")) {
      const style = document.createElement("style");
      style.id = "venu-popup-styles";
      style.textContent = POPUP_STYLES;
      document.head.appendChild(style);
    }

    let cancelled = false;

    loadLeaflet().then((leaflet) => {
      if (cancelled || !containerRef.current || mapRef.current) return;

      const map = leaflet.map(containerRef.current, {
        center: [30.267, -97.743],
        zoom: 14,
        zoomControl: false,
        attributionControl: false,
      });
      mapRef.current = map;

      leaflet.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        { subdomains: "abcd", maxZoom: 19 }
      ).addTo(map);

      leaflet.control.attribution({ prefix: false, position: "bottomright" })
        .addAttribution('© <a href="https://carto.com">CARTO</a>')
        .addTo(map);

      venues.forEach((v) => {
        // Start all venue pins gray — re-colored once tonightShows loads
        const pinColor = v.type === "festival" ? colors.terracotta : "#B0A090";

        const icon = leaflet.divIcon({
          html: createPinSvg(pinColor),
          className: "",
          iconSize: [28, 36],
          iconAnchor: [14, 36],
          popupAnchor: [0, -40],
        });

        // Create marker with an empty popup — content is built lazily on open
        const marker = leaflet.marker([v.lat, v.lng], { icon }).addTo(map);
        const popup = leaflet.popup({ className: "venu-popup", maxWidth: 280 }).setContent("");
        marker.bindPopup(popup);

        marker.on("popupopen", () => {
          const show = matchShow(v, tonightShowsRef.current);
          const isWishlisted = show ? wishlistIdsRef.current.has(show.id) : false;
          popup.setContent(buildPopupContent(v, show, isWishlisted));
        });

        markersRef.current.push({ marker, venue: v });
      });

      // Apply correct pin colors using whatever show data has loaded by now
      recolorPins(leaflet, tonightShowsRef.current);

      // Event delegation — handle button clicks inside any popup
      map.getContainer().addEventListener("click", (e) => {
        const btn = e.target.closest("[data-action]");
        if (!btn) return;

        const action = btn.dataset.action;

        if (action === "tickets") {
          const url = btn.dataset.ticketUrl;
          if (url) window.open(url, "_blank", "noopener");
        }

        if (action === "wishlist") {
          const eventId = btn.dataset.eventId;
          const show = tonightShowsRef.current.find((s) => String(s.id) === String(eventId));
          if (show) {
            onToggleWishlistRef.current?.(show);
            // Refresh popup content to reflect new wishlist state
            const isNowWishlisted = !wishlistIdsRef.current.has(show.id);
            // Find the open popup's marker and update
            markersRef.current.forEach(({ marker, venue }) => {
              if (marker.isPopupOpen()) {
                const s = matchShow(venue, tonightShowsRef.current);
                if (s && String(s.id) === String(eventId)) {
                  popup_refresh: {
                    setTimeout(() => {
                      if (marker.isPopupOpen()) {
                        marker.getPopup().setContent(
                          buildPopupContent(venue, s, isNowWishlisted)
                        );
                      }
                    }, 50);
                  }
                }
              }
            });
          }
        }
      });
    });

    return () => {
      cancelled = true;
      if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; }
      markersRef.current = [];
    };
  }, []);

  return (
    <div style={{ borderRadius: 16, overflow: "hidden", border: `1px solid ${colors.border}`, marginBottom: 16, position: "relative", isolation: "isolate" }}>
      <div ref={containerRef} style={{ height: 420, width: "100%" }} />

      {/* Location pill */}
      <div style={{ position: "absolute", top: 12, left: 12, zIndex: 1000, display: "flex", alignItems: "center", gap: 6, background: "rgba(250,246,241,0.92)", backdropFilter: "blur(8px)", padding: "7px 14px", borderRadius: 20, border: `1px solid ${colors.border}`, fontSize: 12, fontWeight: 600, color: colors.ink, pointerEvents: "none" }}>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: colors.sage }} />Austin, TX
      </div>

      {/* Legend */}
      <div style={{ position: "absolute", bottom: 12, left: 12, zIndex: 1000, display: "flex", gap: 10, background: "rgba(250,246,241,0.92)", backdropFilter: "blur(8px)", padding: "8px 14px", borderRadius: 10, border: `1px solid ${colors.border}`, pointerEvents: "none" }}>
        {[{ color: colors.amber, label: "Show Tonight" }, { color: "#B0A090", label: "Venue" }, { color: colors.terracotta, label: "Festival" }].map(({ color, label }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 5, fontFamily: fonts.mono, fontSize: 8, letterSpacing: 1, textTransform: "uppercase", color: colors.brownMid }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: color }} />{label}
          </div>
        ))}
      </div>
    </div>
  );
};
