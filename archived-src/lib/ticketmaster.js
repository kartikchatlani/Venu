const BASE_URL = "https://app.ticketmaster.com/discovery/v2";
const API_KEY = import.meta.env.VITE_TICKETMASTER_API_KEY;

const formatTime = (localTime) => {
  if (!localTime) return "TBA";
  const [h, m] = localTime.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${m.toString().padStart(2, "0")} ${period}`;
};

const formatPrice = (priceRanges) => {
  if (!priceRanges?.length) return null;
  return `From $${Math.round(priceRanges[0].min)}`;
};

const getBestImage = (images) => {
  if (!images?.length) return null;
  const preferred = images.find((img) => img.ratio === "16_9" && img.width > 500);
  return preferred?.url || images[0]?.url || null;
};

// Try to extract support acts from any text string TM gives us.
// Handles: "Artist: Tour with Opener", "feat. X", "w/ X", "ft. X"
// Skips:   "An Evening with X" — that describes the headliner, not a support act.
const extractSupport = (text, headlinerName) => {
  if (!text) return [];
  if (/^an? (evening|night) with /i.test(text)) return [];
  const m = text.match(/\s+(?:with|feat\.?|featuring|w\/|ft\.)\s+(.+)$/i);
  if (!m) return [];
  return m[1]
    .split(/,\s*|\s+and\s+|\s+&\s+/i)
    .map((s) => s.trim())
    .filter((s) => s && s.toLowerCase() !== headlinerName?.toLowerCase());
};

// Try event.name → event.info → event.pleaseNote in order; return first non-empty result.
const parseSupport = (event, headlinerName) => {
  const candidates = [event.name, event.info, event.pleaseNote];
  for (const text of candidates) {
    const acts = extractSupport(text, headlinerName);
    if (acts.length > 0) return acts;
  }
  return [];
};

const mapEvent = (event) => {
  const venue = event._embedded?.venues?.[0];
  const attractions = event._embedded?.attractions || [];
  const headliner = attractions[0];
  const headlinerName = headliner?.name || event.name;

  // Prefer explicit attractions list (with images); fall back to parsing text fields (no images)
  const apiOpeners = attractions.slice(1)
    .filter((a) => a.name)
    .map((a) => ({ name: a.name, img: getBestImage(a.images) }));
  const support = apiOpeners.length > 0
    ? apiOpeners
    : parseSupport(event, headlinerName).map((name) => ({ name, img: null }));

  // Log so we can see exactly what TM returns for debugging
  if (import.meta.env.DEV) {
    console.log(`[TM] "${headlinerName}" | name: "${event.name}" | info: "${event.info}" | pleaseNote: "${event.pleaseNote}" | support: ${JSON.stringify(support)}`);
  }

  return {
    id: event.id,
    artist: headlinerName,
    support,
    venue: venue?.name || "TBA",
    time: formatTime(event.dates?.start?.localTime),
    date: event.dates?.start?.localDate,
    price: formatPrice(event.priceRanges),
    genre: event.classifications?.[0]?.genre?.name || "Music",
    ticketUrl: event.url,
    img: getBestImage(headliner?.images || event.images),
  };
};

export const fetchAustinEvents = async ({ startDate, endDate, size = 20 } = {}) => {
  const params = new URLSearchParams({
    apikey: API_KEY,
    city: "Austin",
    stateCode: "TX",
    countryCode: "US",
    classificationName: "music",
    size,
    sort: "date,asc",
  });

  if (startDate) params.set("startDateTime", `${startDate}T00:00:00Z`);
  if (endDate) params.set("endDateTime", `${endDate}T23:59:59Z`);

  const res = await fetch(`${BASE_URL}/events.json?${params}`);
  if (!res.ok) throw new Error("Failed to fetch events from Ticketmaster");

  const data = await res.json();
  return (data._embedded?.events || []).map(mapEvent);
};
