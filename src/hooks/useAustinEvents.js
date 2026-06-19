import { useState, useEffect } from "react";
import { fetchAustinEvents } from "../lib/ticketmaster.js";

// Use local date components — toISOString() would give the UTC date which
// can be wrong for users in negative-offset timezones (e.g. CDT = UTC-5).
const toLocalDateStr = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const getWeekendDates = () => {
  const today = new Date();
  const day = today.getDay();
  const daysUntilSat = day === 6 ? 0 : 6 - day;
  const sat = new Date(today);
  sat.setDate(today.getDate() + daysUntilSat);
  const sun = new Date(sat);
  sun.setDate(sat.getDate() + 1);
  return { start: toLocalDateStr(sat), end: toLocalDateStr(sun) };
};

export const useAustinEvents = () => {
  const [tonightShows, setTonightShows] = useState([]);
  const [weekendShows, setWeekendShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const now = new Date();
        const today = toLocalDateStr(now);
        // Query through tomorrow so evening shows (UTC next-day) aren't missed.
        // Then filter by event.date (TM's localDate field) to keep only today's shows.
        const tomorrow = toLocalDateStr(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1));
        const { start, end } = getWeekendDates();

        const [tonightRaw, weekend] = await Promise.all([
          fetchAustinEvents({ startDate: today, endDate: tomorrow, size: 20 }),
          fetchAustinEvents({ startDate: start, endDate: end, size: 10 }),
        ]);

        setTonightShows(tonightRaw.filter((e) => e.date === today));
        setWeekendShows(weekend.filter((e) => e.date !== today));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return { tonightShows, weekendShows, loading, error };
};
