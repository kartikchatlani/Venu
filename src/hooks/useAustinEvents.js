import { useState, useEffect } from "react";
import { fetchAustinEvents } from "../lib/ticketmaster.js";

const toDateStr = (date) => date.toISOString().split("T")[0];

const getWeekendDates = () => {
  const today = new Date();
  const day = today.getDay();
  const daysUntilSat = day === 6 ? 0 : 6 - day;
  const sat = new Date(today);
  sat.setDate(today.getDate() + daysUntilSat);
  const sun = new Date(sat);
  sun.setDate(sat.getDate() + 1);
  return { start: toDateStr(sat), end: toDateStr(sun) };
};

export const useAustinEvents = () => {
  const [tonightShows, setTonightShows] = useState([]);
  const [weekendShows, setWeekendShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const today = toDateStr(new Date());
        const { start, end } = getWeekendDates();

        const [tonight, weekend] = await Promise.all([
          fetchAustinEvents({ startDate: today, endDate: today, size: 10 }),
          fetchAustinEvents({ startDate: start, endDate: end, size: 10 }),
        ]);

        setTonightShows(tonight);
        setWeekendShows(weekend);
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
