import { useState } from "react";
import { supabase } from "../lib/supabase.js";
import { Screen } from "../components/index.jsx";

const P = "#F4EFE7";
const A = "#C17F4A";
const F = "#8A8278";
const D = "'Fraunces', Georgia, serif";
const M = "'JetBrains Mono', monospace";
const glass = "rgba(244,239,231,0.06)";
const glassBorder = "rgba(244,239,231,0.12)";

const inputStyle = {
  width: "100%", padding: "13px 16px",
  borderRadius: 4,
  border: `1px solid ${glassBorder}`,
  background: glass,
  fontFamily: "'Inter', system-ui, sans-serif",
  fontSize: 14, color: P,
  outline: "none", boxSizing: "border-box",
};

const Auth = () => {
  const [mode, setMode] = useState("login"); // "login" | "signup" | "forgot"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const switchMode = (m) => { setMode(m); setError(null); setMessage(null); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
    } else if (mode === "signup") {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setError(error.message);
      } else {
        setMessage("Check your email for a confirmation link.");
      }
    } else if (mode === "forgot") {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + window.location.pathname,
      });
      if (error) {
        setError(error.message);
      } else {
        setMessage("Password reset link sent — check your email.");
      }
    }

    setLoading(false);
  };

  return (
    <Screen>
      {/* ── Logo ── */}
      <div style={{ textAlign: "center", marginTop: 32, marginBottom: 44 }}>
        <div style={{ fontFamily: D, fontSize: 48, fontWeight: 700, color: P, lineHeight: 1, letterSpacing: "-0.02em" }}>
          Venu
        </div>
        <div style={{ fontFamily: M, fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: A, marginTop: 8 }}>
          Live Music. Your City.
        </div>
      </div>

      {mode === "forgot" ? (
        <>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontFamily: D, fontSize: 22, fontWeight: 700, color: P, marginBottom: 6 }}>
              Reset your password
            </div>
            <div style={{ fontFamily: M, fontSize: 10, color: F, letterSpacing: "0.04em", textTransform: "uppercase" }}>
              Enter your email and we'll send a reset link.
            </div>
          </div>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputStyle} />
            {error && <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#D94F2A" }}>{error}</div>}
            {message && <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: A }}>{message}</div>}
            <button type="submit" disabled={loading} style={{
              marginTop: 6, padding: "13px 0", borderRadius: 2, border: "none",
              background: loading ? "rgba(193,127,74,0.3)" : A,
              color: "#14110F", fontFamily: "'Inter', sans-serif", fontSize: 14,
              fontWeight: 700, cursor: loading ? "not-allowed" : "pointer",
            }}>
              {loading ? "…" : "Send Reset Link"}
            </button>
            <button type="button" onClick={() => switchMode("login")} style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: M, fontSize: 10, letterSpacing: "0.06em",
              textTransform: "uppercase", color: F, textAlign: "center", padding: "4px 0",
            }}>
              ← Back to Log In
            </button>
          </form>
        </>
      ) : (
        <>
          {/* Toggle */}
          <div style={{ display: "flex", background: glass, border: `1px solid ${glassBorder}`, borderRadius: 4, padding: 4, marginBottom: 28 }}>
            {["login", "signup"].map((m) => (
              <button key={m} onClick={() => switchMode(m)} style={{
                flex: 1, padding: "9px 0", borderRadius: 2, border: "none",
                background: mode === m ? A : "transparent",
                color: mode === m ? "#14110F" : F,
                fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600,
                cursor: "pointer", transition: "all 0.2s",
              }}>
                {m === "login" ? "Log In" : "Sign Up"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputStyle} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={inputStyle} />
            {error && <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#D94F2A" }}>{error}</div>}
            {message && <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: A }}>{message}</div>}
            <button type="submit" disabled={loading} style={{
              marginTop: 6, padding: "13px 0", borderRadius: 2, border: "none",
              background: loading ? "rgba(193,127,74,0.3)" : A,
              color: "#14110F", fontFamily: "'Inter', sans-serif", fontSize: 14,
              fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", transition: "all 0.2s",
            }}>
              {loading ? "…" : mode === "login" ? "Log In" : "Create Account"}
            </button>
            {mode === "login" && (
              <button type="button" onClick={() => switchMode("forgot")} style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: M, fontSize: 10, letterSpacing: "0.06em",
                textTransform: "uppercase", color: F, textAlign: "center", padding: "4px 0",
              }}>
                Forgot password?
              </button>
            )}
          </form>
        </>
      )}
    </Screen>
  );
};

export default Auth;
