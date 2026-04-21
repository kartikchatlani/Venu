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

const mapEvent = (event) => {
  const venue = event._embedded?.venues?.[0];
  const attraction = event._embedded?.attractions?.[0];
  return {
    id: event.id,
    artist: attraction?.name || event.name,
    venue: venue?.name || "TBA",
    time: formatTime(event.dates?.start?.localTime),
    date: event.dates?.start?.localDate,
    price: formatPrice(event.priceRanges),
    genre: event.classifications?.[0]?.genre?.name || "Music",
    ticketUrl: event.url,
    img: getBestImage(attraction?.images || event.images),
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
