import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.jsx";
import "./styles/global.css";
import "./styles/typography.css";
import "./styles/textures.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  React.createElement(
    React.StrictMode,
    null,
    React.createElement(HashRouter, null, React.createElement(App))
  )
);
