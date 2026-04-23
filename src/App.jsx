import React from "react";
import { PhoneFrame, TabBar } from "./components/index.jsx";
import { EventBottomSheet } from "./components/Cards/EventBottomSheet.jsx";
import { Home, Explore, Guide, Calendar, Profile } from "./pages/index.jsx";
import Auth from "./pages/Auth.jsx";
import { supabase } from "./lib/supabase.js";
import { useSavedEvents } from "./hooks/useSavedEvents.js";

const App = () => {
  const [activeTab, setActiveTab] = React.useState("home");
  const [session, setSession] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [selectedEvent, setSelectedEvent] = React.useState(null);

  const { savedEvents, wishlistIds, goingIds, toggleWishlist, toggleGoing, loading: savedLoading } = useSavedEvents();

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const pages = { home: Home, explore: Explore, guide: Guide, calendar: Calendar, profile: Profile };
  const ActivePage = pages[activeTab];

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{
        textAlign: "center", marginBottom: 20,
        fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
        letterSpacing: 4, color: "#C17F4A", textTransform: "uppercase",
      }}>
        Venu — Interactive Prototype
      </div>
      <PhoneFrame>
        {loading ? null : session ? (
          <>
            <ActivePage
              savedEvents={savedEvents}
              wishlistIds={wishlistIds}
              goingIds={goingIds}
              toggleWishlist={toggleWishlist}
              toggleGoing={toggleGoing}
              savedLoading={savedLoading}
              onSelectEvent={setSelectedEvent}
            />
            <TabBar activeTab={activeTab} onTabChange={(tab) => { setSelectedEvent(null); setActiveTab(tab); }} />
            <EventBottomSheet
              event={selectedEvent}
              onClose={() => setSelectedEvent(null)}
              wishlistIds={wishlistIds}
              goingIds={goingIds}
              toggleWishlist={toggleWishlist}
              toggleGoing={toggleGoing}
            />
          </>
        ) : (
          <Auth />
        )}
      </PhoneFrame>
    </div>
  );
};

export default App;
