import { useState, useEffect } from "react";
import { fetchSavedEvents, saveEvent, unsaveEvent } from "../lib/savedEvents.js";

export const useSavedEvents = () => {
  const [savedEvents, setSavedEvents] = useState([]);
  const [savedIds, setSavedIds] = useState(new Set());

  useEffect(() => {
    fetchSavedEvents()
      .then((data) => {
        setSavedEvents(data);
        setSavedIds(new Set(data.map((e) => e.event_id)));
      })
      .catch(console.error);
  }, []);

  const toggleSave = async (event) => {
    const isSaved = savedIds.has(event.id);

    // Optimistic update
    if (isSaved) {
      setSavedIds((prev) => { const next = new Set(prev); next.delete(event.id); return next; });
      setSavedEvents((prev) => prev.filter((e) => e.event_id !== event.id));
    } else {
      setSavedIds((prev) => new Set(prev).add(event.id));
      setSavedEvents((prev) => [...prev, { ...event, event_id: event.id }]);
    }

    try {
      if (isSaved) {
        await unsaveEvent(event.id);
      } else {
        await saveEvent(event);
      }
    } catch (err) {
      // Revert on failure
      if (isSaved) {
        setSavedIds((prev) => new Set(prev).add(event.id));
        setSavedEvents((prev) => [...prev, { ...event, event_id: event.id }]);
      } else {
        setSavedIds((prev) => { const next = new Set(prev); next.delete(event.id); return next; });
        setSavedEvents((prev) => prev.filter((e) => e.event_id !== event.id));
      }
      console.error(err);
    }
  };

  return { savedEvents, savedIds, toggleSave };
};
