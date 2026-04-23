import { useState, useEffect } from "react";
import { fetchSavedEvents, saveEvent, unsaveEvent, updateEventStatus } from "../lib/savedEvents.js";

export const useSavedEvents = () => {
  const [savedEvents, setSavedEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSavedEvents()
      .then(setSavedEvents)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Derive separate sets from the single source of truth
  const wishlistIds = new Set(
    savedEvents.filter((e) => e.status !== "going").map((e) => e.event_id)
  );
  const goingIds = new Set(
    savedEvents.filter((e) => e.status === "going").map((e) => e.event_id)
  );

  const toggleWishlist = async (event) => {
    const isWishlisted = wishlistIds.has(event.id);
    const isGoing = goingIds.has(event.id);

    if (isWishlisted) {
      // Remove entirely
      setSavedEvents((prev) => prev.filter((e) => e.event_id !== event.id));
      try { await unsaveEvent(event.id); }
      catch (err) {
        setSavedEvents((prev) => [...prev, { ...event, event_id: event.id, status: "wishlist" }]);
        console.error(err);
      }
    } else if (isGoing) {
      // Switch going → wishlist
      setSavedEvents((prev) => prev.map((e) => e.event_id === event.id ? { ...e, status: "wishlist" } : e));
      try { await updateEventStatus(event.id, "wishlist"); }
      catch (err) {
        setSavedEvents((prev) => prev.map((e) => e.event_id === event.id ? { ...e, status: "going" } : e));
        console.error(err);
      }
    } else {
      // Add as wishlist
      setSavedEvents((prev) => [...prev, { ...event, event_id: event.id, status: "wishlist" }]);
      try { await saveEvent(event, "wishlist"); }
      catch (err) {
        setSavedEvents((prev) => prev.filter((e) => e.event_id !== event.id));
        console.error(err);
      }
    }
  };

  const toggleGoing = async (event) => {
    const isWishlisted = wishlistIds.has(event.id);
    const isGoing = goingIds.has(event.id);

    if (isGoing) {
      // Remove entirely
      setSavedEvents((prev) => prev.filter((e) => e.event_id !== event.id));
      try { await unsaveEvent(event.id); }
      catch (err) {
        setSavedEvents((prev) => [...prev, { ...event, event_id: event.id, status: "going" }]);
        console.error(err);
      }
    } else if (isWishlisted) {
      // Switch wishlist → going
      setSavedEvents((prev) => prev.map((e) => e.event_id === event.id ? { ...e, status: "going" } : e));
      try { await updateEventStatus(event.id, "going"); }
      catch (err) {
        setSavedEvents((prev) => prev.map((e) => e.event_id === event.id ? { ...e, status: "wishlist" } : e));
        console.error(err);
      }
    } else {
      // Add as going
      setSavedEvents((prev) => [...prev, { ...event, event_id: event.id, status: "going" }]);
      try { await saveEvent(event, "going"); }
      catch (err) {
        setSavedEvents((prev) => prev.filter((e) => e.event_id !== event.id));
        console.error(err);
      }
    }
  };

  return { savedEvents, wishlistIds, goingIds, toggleWishlist, toggleGoing, loading };
};
