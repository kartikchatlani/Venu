import { supabase } from "./supabase.js";

export const fetchSavedEvents = async () => {
  const { data, error } = await supabase
    .from("saved_events")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

export const saveEvent = async (event, status = "wishlist") => {
  const { data: { user } } = await supabase.auth.getUser();
  const { error } = await supabase.from("saved_events").insert({
    user_id: user.id,
    event_id: event.id,
    artist: event.artist,
    venue: event.venue,
    date: event.date,
    time: event.time,
    price: event.price,
    genre: event.genre,
    ticket_url: event.ticketUrl,
    img: event.img,
    status,
  });
  if (error) throw error;
};

export const updateEventStatus = async (eventId, status) => {
  const { data: { user } } = await supabase.auth.getUser();
  const { error } = await supabase
    .from("saved_events")
    .update({ status })
    .eq("user_id", user.id)
    .eq("event_id", eventId);
  if (error) throw error;
};

export const unsaveEvent = async (eventId) => {
  const { data: { user } } = await supabase.auth.getUser();
  const { error } = await supabase
    .from("saved_events")
    .delete()
    .eq("user_id", user.id)
    .eq("event_id", eventId);
  if (error) throw error;
};
