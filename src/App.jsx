import React from "react";
import { PhoneFrame, TabBar } from "./components/index.jsx";
import { EventBottomSheet } from "./components/EventBottomSheet.jsx";
import { NotificationsPanel } from "./components/NotificationsPanel.jsx";
import { Home, Explore, Guide, Calendar, Profile } from "./pages/index.jsx";
import Auth from "./pages/Auth.jsx";
import { supabase } from "./lib/supabase.js";
import { useSavedEvents } from "./hooks/useSavedEvents.js";

const App = () => {
  const [activeTab, setActiveTab] = React.useState("home");
  const [session, setSession] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [selectedEvent, setSelectedEvent] = React.useState(null);
  const [notifsOpen, setNotifsOpen] = React.useState(false);
  const [resetMode, setResetMode] = React.useState(false);
  const [newPassword, setNewPassword] = React.useState("");
  const [resetError, setResetError] = React.useState(null);
  const [resetMessage, setResetMessage] = React.useState(null);
  const [resetLoading, setResetLoading] = React.useState(false);

  const { savedEvents, wishlistIds, goingIds, toggleWishlist, toggleGoing, loading: savedLoading } = useSavedEvents();

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY") {
        setResetMode(true);
      }
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setResetLoading(true);
    setResetError(null);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      setResetError(error.message);
    } else {
      setResetMessage("Password updated! You're now logged in.");
      setResetMode(false);
      setNewPassword("");
    }
    setResetLoading(false);
  };

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
        {loading ? null : resetMode ? (
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
            background: "linear-gradient(180deg, #17120e 0%, #0c0a08 100%)",
            overflowY: "auto", padding: "52px 22px 80px", scrollbarWidth: "none",
          }}>
            <div style={{ textAlign: "center", marginTop: 32, marginBottom: 44 }}>
              <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 48, fontWeight: 700, color: "#F4EFE7", lineHeight: 1, letterSpacing: "-0.02em" }}>Venu</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#C17F4A", marginTop: 8 }}>Live Music. Your City.</div>
            </div>
            <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 22, fontWeight: 700, color: "#F4EFE7", marginBottom: 6 }}>Set new password</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#8A8278", letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 24 }}>Choose a new password for your account.</div>
            <form onSubmit={handlePasswordReset} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <input
                type="password" placeholder="New password"
                value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                required minLength={6}
                style={{ width: "100%", padding: "13px 16px", borderRadius: 14, border: "1px solid rgba(244,239,231,0.12)", background: "rgba(244,239,231,0.06)", fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#F4EFE7", outline: "none", boxSizing: "border-box" }}
              />
              {resetError && <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#D94F2A" }}>{resetError}</div>}
              {resetMessage && <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#C17F4A" }}>{resetMessage}</div>}
              <button type="submit" disabled={resetLoading || newPassword.length < 6} style={{
                marginTop: 6, padding: "13px 0", borderRadius: 14, border: "none",
                background: resetLoading || newPassword.length < 6 ? "rgba(193,127,74,0.3)" : "#C17F4A",
                color: "#14110F", fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 700,
                cursor: resetLoading || newPassword.length < 6 ? "not-allowed" : "pointer",
              }}>
                {resetLoading ? "…" : "Update Password"}
              </button>
            </form>
          </div>
        ) : session ? (
          <>
            <ActivePage
              savedEvents={savedEvents}
              wishlistIds={wishlistIds}
              goingIds={goingIds}
              toggleWishlist={toggleWishlist}
              toggleGoing={toggleGoing}
              savedLoading={savedLoading}
              onSelectEvent={setSelectedEvent}
              onOpenNotifs={() => setNotifsOpen(true)}
              session={session}
            />
            <TabBar activeTab={activeTab} onTabChange={(tab) => { setSelectedEvent(null); setActiveTab(tab); }} />
            <NotificationsPanel isOpen={notifsOpen} onClose={() => setNotifsOpen(false)} />
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
