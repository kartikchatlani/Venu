import React, { useState } from "react";
import { supabase } from "../lib/supabase.js";
import { colors, fonts } from "../theme.jsx";
import { Screen } from "../components/index.jsx";

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 10,
  border: `1.5px solid ${colors.border}`,
  background: colors.white,
  fontFamily: fonts.body,
  fontSize: 14,
  color: colors.ink,
  outline: "none",
  boxSizing: "border-box",
};

const Auth = () => {
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setError(error.message);
      } else {
        setMessage("Check your email for a confirmation link.");
      }
    }

    setLoading(false);
  };

  return (
    <Screen>
      {/* Logo */}
      <div style={{ textAlign: "center", marginTop: 40, marginBottom: 48 }}>
        <div style={{
          fontFamily: fonts.display, fontSize: 42, fontWeight: 700,
          fontStyle: "italic", color: colors.ink, lineHeight: 1,
        }}>
          Venu
        </div>
        <div style={{
          fontFamily: fonts.mono, fontSize: 10, letterSpacing: 3,
          color: colors.amber, textTransform: "uppercase", marginTop: 6,
        }}>
          Live Music. Your City.
        </div>
      </div>

      {/* Toggle */}
      <div style={{
        display: "flex", background: colors.warmGray,
        borderRadius: 10, padding: 4, marginBottom: 28,
      }}>
        {["login", "signup"].map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m); setError(null); setMessage(null); }}
            style={{
              flex: 1, padding: "8px 0", borderRadius: 8, border: "none",
              background: mode === m ? colors.ink : "transparent",
              color: mode === m ? colors.gold : colors.brownMid,
              fontFamily: fonts.body, fontSize: 13, fontWeight: 600,
              cursor: "pointer", transition: "all 0.2s",
            }}
          >
            {m === "login" ? "Log In" : "Sign Up"}
          </button>
        ))}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />

        {error && (
          <p style={{ fontFamily: fonts.body, fontSize: 12, color: colors.terracotta, margin: 0 }}>
            {error}
          </p>
        )}
        {message && (
          <p style={{ fontFamily: fonts.body, fontSize: 12, color: colors.sage, margin: 0 }}>
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: 6, padding: "13px 0", borderRadius: 10, border: "none",
            background: loading ? colors.faded : colors.ink,
            color: colors.gold, fontFamily: fonts.body, fontSize: 14,
            fontWeight: 700, cursor: loading ? "not-allowed" : "pointer",
            transition: "all 0.2s",
          }}
        >
          {loading ? "..." : mode === "login" ? "Log In" : "Create Account"}
        </button>
      </form>
    </Screen>
  );
};

export default Auth;
