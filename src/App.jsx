import React from "react";
import { Routes, Route } from "react-router-dom";
import { PhoneFrame, TabBar } from "./components/index.jsx";
import { Home, Explore, Guide, Calendar, Profile } from "./pages/index.jsx";

const App = () => {
  const [activeTab, setActiveTab] = React.useState("home");

  const handleTabChange = (id) => {
    setActiveTab(id);
  };

  // Map tab ids to components
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
        <ActivePage />
        <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
      </PhoneFrame>
    </div>
  );
};

export default App;
