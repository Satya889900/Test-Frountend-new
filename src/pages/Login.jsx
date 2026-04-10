import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function useField(initial = "") {
  const [value, setValue] = useState(initial);
  const [focused, setFocused] = useState(false);
  return {
    value,
    focused,
    onChange: (e) => setValue(e.target.value),
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
  };
}

function Blob({ style }) {
  return (
    <div
      style={{
        position: "absolute",
        borderRadius: "60% 40% 70% 30% / 50% 60% 40% 50%",
        pointerEvents: "none",
        ...style,
      }}
    />
  );
}

function SocialBtn({ icon, label }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      type="button"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        padding: "10px 0",
        background: hov ? "#f5f3ff" : "#fff",
        border: `1.5px solid ${hov ? "#c4b5fd" : "#e8e4f5"}`,
        borderRadius: 12,
        cursor: "pointer",
        fontSize: 13,
        fontWeight: 600,
        color: "#374151",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        transition: "all 0.2s ease",
        transform: hov ? "translateY(-1px)" : "none",
        boxShadow: hov
          ? "0 4px 14px rgba(139,92,246,0.15)"
          : "0 1px 3px rgba(0,0,0,0.05)",
      }}
    >
      <span style={{ fontSize: 15 }}>{icon}</span>
      {label}
    </button>
  );
}

export default function Login() {
  const email = useField("");
  const pass = useField("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/users/login`, {
        email: email.value,
        password: pass.value,
      });
      localStorage.setItem("token", res.data.token);
      alert("Login Successful ✅");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes blobDrift {
          0%,100% { transform: translate(0,0) scale(1) rotate(0deg); }
          33%      { transform: translate(20px,-18px) scale(1.05) rotate(6deg); }
          66%      { transform: translate(-14px,12px) scale(0.96) rotate(-4deg); }
        }
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ringPulse {
          0%,100% { box-shadow: 0 8px 30px rgba(139,92,246,0.4), 0 0 0 0 rgba(139,92,246,0.25); }
          50%     { box-shadow: 0 8px 30px rgba(139,92,246,0.4), 0 0 0 12px rgba(139,92,246,0); }
        }
        @keyframes shimmerBtn {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes checkPop {
          0%  { transform: scale(0); opacity: 0; }
          70% { transform: scale(1.2); opacity: 1; }
          100%{ transform: scale(1); opacity: 1; }
        }
        @keyframes particleDrift {
          0%   { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0.6; }
          100% { transform: translateY(-110vh) translateX(30px) rotate(360deg); opacity: 0; }
        }

        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 100px #faf9ff inset !important;
          -webkit-text-fill-color: #1a0f3c !important;
        }
        input::placeholder { color: #c4bce0; }
        input:focus { outline: none; }

        .left-panel { display: none; }
        @media (min-width: 820px) { .left-panel { display: flex !important; } }

        .login-btn:hover:not(:disabled) {
          transform: translateY(-2px) !important;
          box-shadow: 0 10px 36px rgba(139,92,246,0.55) !important;
        }
        .login-btn:active:not(:disabled) {
          transform: translateY(0) scale(0.98) !important;
        }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          background: "#faf9ff",
          position: "relative",
          overflow: "hidden",
        }}
      >

        {/* ══════════ LEFT DECORATIVE PANEL ══════════ */}
        <div
          className="left-panel"
          style={{
            flex: "0 0 46%",
            background: "linear-gradient(145deg, #6d28d9 0%, #9333ea 45%, #db2777 100%)",
            position: "relative",
            overflow: "hidden",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {/* animated blobs inside panel */}
          <Blob style={{ width: 360, height: 360, top: "-80px", left: "-100px", background: "rgba(255,255,255,0.07)", animation: "blobDrift 11s ease-in-out infinite" }} />
          <Blob style={{ width: 220, height: 220, bottom: "60px", right: "-60px", background: "rgba(255,255,255,0.09)", animation: "blobDrift 9s ease-in-out infinite reverse" }} />
          <Blob style={{ width: 130, height: 130, top: "50%", left: "65%", background: "rgba(255,255,255,0.06)", animation: "blobDrift 7s ease-in-out infinite 2s" }} />

          {/* dot grid */}
          <div
            style={{
              position: "absolute", inset: 0,
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.16) 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />

          {/* floating particles */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: 6 + i * 2,
                height: 6 + i * 2,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.25)",
                left: `${10 + i * 15}%`,
                bottom: `-${20 + i * 5}px`,
                animation: `particleDrift ${6 + i * 2}s linear infinite`,
                animationDelay: `${i * 1.2}s`,
              }}
            />
          ))}

          <div style={{ position: "relative", zIndex: 2, padding: "3rem 2.5rem" }}>
            {/* brand */}
            <div style={{
              width: 50, height: 50, borderRadius: 15,
              background: "rgba(255,255,255,0.2)",
              border: "1.5px solid rgba(255,255,255,0.35)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 22, marginBottom: "2.5rem",
              backdropFilter: "blur(8px)",
            }}>
              ✦
            </div>

            <h2 style={{ fontSize: 34, fontWeight: 700, color: "#fff", lineHeight: 1.2, marginBottom: 14, letterSpacing: "-0.02em" }}>
              Great to see<br />you again 👋
            </h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.68)", lineHeight: 1.75, maxWidth: 270, marginBottom: "2.5rem" }}>
              Sign in to pick up right where you left off. Your workspace is waiting.
            </p>

            {/* feature list */}
            {[
              { icon: "🔐", text: "Bank-grade encryption" },
              { icon: "⚡", text: "Instant sync across devices" },
              { icon: "🎯", text: "Personalised experience" },
            ].map(({ icon, text }, i) => (
              <div
                key={i}
                style={{
                  display: "flex", alignItems: "center", gap: 12,
                  marginBottom: 14,
                  animation: `fadeSlide 0.5s ease both ${0.2 + i * 0.1}s`,
                }}
              >
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(6px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 16,
                }}>
                  {icon}
                </div>
                <span style={{ color: "rgba(255,255,255,0.88)", fontSize: 14, fontWeight: 500 }}>{text}</span>
              </div>
            ))}

            {/* social proof */}
            <div style={{
              marginTop: "2.5rem", padding: "1.2rem 1.4rem",
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(12px)",
              borderRadius: 16,
              border: "1px solid rgba(255,255,255,0.2)",
            }}>
              <div style={{ display: "flex", gap: -8, marginBottom: 8 }}>
                {["🟣","🔵","🟤"].map((c, i) => (
                  <div key={i} style={{
                    width: 28, height: 28, borderRadius: "50%",
                    background: `hsl(${260 + i * 30}, 60%, 65%)`,
                    border: "2px solid rgba(255,255,255,0.5)",
                    marginLeft: i > 0 ? -8 : 0,
                  }} />
                ))}
              </div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 1.5 }}>
                Joined by <strong style={{ color: "#fff" }}>12,000+</strong> teams worldwide
              </p>
            </div>
          </div>
        </div>

        {/* ══════════ RIGHT FORM PANEL ══════════ */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem 1.25rem",
            position: "relative",
          }}
        >
          {/* background blobs */}
          <Blob style={{ width: 460, height: 460, top: "-120px", right: "-140px", background: "radial-gradient(circle at 40% 40%, #ede9fe 0%, #fdf4ff 55%, transparent 75%)", animation: "blobDrift 14s ease-in-out infinite" }} />
          <Blob style={{ width: 300, height: 300, bottom: "-80px", left: "-90px", background: "radial-gradient(circle at 60% 60%, #fce7f3 0%, #fdf4ff 55%, transparent 75%)", animation: "blobDrift 11s ease-in-out infinite reverse 3s" }} />
          <Blob style={{ width: 180, height: 180, top: "35%", left: "8%", background: "radial-gradient(circle, #ddd6fe 0%, transparent 70%)", animation: "blobDrift 9s ease-in-out infinite 1.5s" }} />

          {/* ── card ── */}
          <div
            style={{
              position: "relative", zIndex: 2,
              width: "100%", maxWidth: 430,
              background: "#ffffff",
              borderRadius: 28,
              padding: "2.5rem 2.25rem 2rem",
              boxShadow:
                "0 0 0 1px rgba(139,92,246,0.07), 0 4px 6px rgba(139,92,246,0.04), 0 24px 64px rgba(139,92,246,0.12)",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0) scale(1)" : "translateY(32px) scale(0.97)",
              transition: "opacity 0.65s cubic-bezier(0.22,1,0.36,1), transform 0.65s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            {/* top gradient stripe */}
            <div style={{
              position: "absolute", top: 0, left: "12%", right: "12%", height: 3,
              background: "linear-gradient(90deg, #7c3aed, #a855f7, #ec4899)",
              borderRadius: "0 0 6px 6px",
            }} />

            {/* logo mark */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem", animation: "fadeSlide 0.45s ease both 0.05s" }}>
              <div style={{
                width: 58, height: 58, borderRadius: 18,
                background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 55%, #ec4899 100%)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 26, color: "#fff",
                animation: "ringPulse 4s ease-in-out infinite",
              }}>
                ✦
              </div>
            </div>

            {/* heading */}
            <div style={{ textAlign: "center", marginBottom: "1.6rem", animation: "fadeSlide 0.45s ease both 0.1s" }}>
              <h1 style={{ fontSize: 23, fontWeight: 700, color: "#1a0f3c", letterSpacing: "-0.025em", marginBottom: 6 }}>
                Sign in to your account
              </h1>
              <p style={{ fontSize: 14, color: "#a09abf", fontWeight: 400 }}>
                Welcome back — let&apos;s get you in
              </p>
            </div>

            {/* social */}
            <div style={{ display: "flex", gap: 10, marginBottom: "1.4rem", animation: "fadeSlide 0.45s ease both 0.15s" }}>
              <SocialBtn icon="G" label="Google" />
              <SocialBtn icon="⌥" label="GitHub" />
            </div>

            {/* divider */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.4rem", animation: "fadeSlide 0.45s ease both 0.18s" }}>
              <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, #ede9fe)" }} />
              <span style={{ fontSize: 11, color: "#c4bce0", fontWeight: 600, letterSpacing: "0.08em" }}>OR CONTINUE WITH EMAIL</span>
              <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, #ede9fe)" }} />
            </div>

            {/* form */}
            <form onSubmit={handleLogin} noValidate>

              {/* email */}
              <div style={{ marginBottom: "1rem", animation: "fadeSlide 0.45s ease both 0.2s" }}>
                <label style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#6d5fa0", letterSpacing: "0.05em", textTransform: "uppercase" }}>Email</span>
                </label>
                <div style={{
                  display: "flex", alignItems: "center",
                  background: email.focused ? "#f5f3ff" : "#faf9ff",
                  border: `1.5px solid ${email.focused ? "#7c3aed" : "#e8e4f5"}`,
                  borderRadius: 13,
                  transition: "all 0.2s ease",
                  boxShadow: email.focused ? "0 0 0 4px rgba(124,58,237,0.09)" : "none",
                }}>
                  <span style={{ paddingLeft: 13, fontSize: 14, color: email.focused ? "#7c3aed" : "#c4bce0", transition: "color 0.2s", flexShrink: 0 }}>✉</span>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email.value}
                    onChange={email.onChange}
                    onFocus={email.onFocus}
                    onBlur={email.onBlur}
                    required
                    style={{
                      flex: 1, padding: "12px 12px",
                      background: "transparent", border: "none",
                      fontSize: 15, color: "#1a0f3c",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                  />
                  {email.value.includes("@") && (
                    <span style={{ paddingRight: 12, fontSize: 14, color: "#22c55e", animation: "checkPop 0.3s ease both", flexShrink: 0 }}>✓</span>
                  )}
                </div>
              </div>

              {/* password */}
              <div style={{ marginBottom: "0.6rem", animation: "fadeSlide 0.45s ease both 0.25s" }}>
                <label style={{ display: "flex", justifyContent: "space-between", marginBottom: 7, alignItems: "center" }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#6d5fa0", letterSpacing: "0.05em", textTransform: "uppercase" }}>Password</span>
                  <Link to="/forgot" style={{ fontSize: 12, color: "#7c3aed", textDecoration: "none", fontWeight: 600 }}>Forgot?</Link>
                </label>
                <div style={{
                  display: "flex", alignItems: "center",
                  background: pass.focused ? "#f5f3ff" : "#faf9ff",
                  border: `1.5px solid ${pass.focused ? "#7c3aed" : "#e8e4f5"}`,
                  borderRadius: 13,
                  transition: "all 0.2s ease",
                  boxShadow: pass.focused ? "0 0 0 4px rgba(124,58,237,0.09)" : "none",
                }}>
                  <span style={{ paddingLeft: 13, fontSize: 14, color: pass.focused ? "#7c3aed" : "#c4bce0", transition: "color 0.2s", flexShrink: 0 }}>🔒</span>
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="••••••••"
                    value={pass.value}
                    onChange={pass.onChange}
                    onFocus={pass.onFocus}
                    onBlur={pass.onBlur}
                    required
                    style={{
                      flex: 1, padding: "12px 12px",
                      background: "transparent", border: "none",
                      fontSize: 15, color: "#1a0f3c",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    style={{
                      background: "none", border: "none", cursor: "pointer",
                      paddingRight: 13, fontSize: 12, fontWeight: 600,
                      color: "#a09abf", fontFamily: "'Plus Jakarta Sans', sans-serif",
                      letterSpacing: "0.02em", flexShrink: 0,
                    }}
                  >
                    {showPass ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* remember me */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1.4rem", animation: "fadeSlide 0.45s ease both 0.28s" }}>
                <input type="checkbox" id="remember" style={{ accentColor: "#7c3aed", width: 15, height: 15, cursor: "pointer" }} />
                <label htmlFor="remember" style={{ fontSize: 13, color: "#a09abf", cursor: "pointer", userSelect: "none" }}>
                  Keep me signed in
                </label>
              </div>

              {/* submit */}
              <button
                type="submit"
                disabled={loading}
                className="login-btn"
                style={{
                  width: "100%",
                  padding: "14px",
                  borderRadius: 14,
                  border: "none",
                  cursor: loading ? "not-allowed" : "pointer",
                  fontSize: 15,
                  fontWeight: 700,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  letterSpacing: "0.02em",
                  color: "#fff",
                  background: loading
                    ? "linear-gradient(135deg,#a78bfa,#c084fc)"
                    : "linear-gradient(90deg, #6d28d9, #7c3aed, #a855f7, #ec4899, #a855f7, #7c3aed, #6d28d9)",
                  backgroundSize: "300% auto",
                  animation: loading ? "none" : "shimmerBtn 5s linear infinite",
                  boxShadow: loading ? "none" : "0 6px 28px rgba(139,92,246,0.42)",
                  transition: "box-shadow 0.3s ease, transform 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                }}
              >
                {loading ? (
                  <>
                    <span style={{
                      width: 16, height: 16, borderRadius: "50%",
                      border: "2.5px solid rgba(255,255,255,0.3)",
                      borderTopColor: "#fff",
                      display: "inline-block",
                      animation: "spin 0.7s linear infinite",
                    }} />
                    Signing in…
                  </>
                ) : "Sign in →"}
              </button>
            </form>

            {/* register */}
            <p style={{
              textAlign: "center", marginTop: "1.4rem",
              fontSize: 14, color: "#a09abf",
              animation: "fadeSlide 0.45s ease both 0.35s",
            }}>
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                style={{
                  fontWeight: 700, textDecoration: "none",
                  background: "linear-gradient(90deg, #7c3aed, #ec4899)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Create one free
              </Link>
            </p>

            {/* trust row */}
            <div style={{
              display: "flex", justifyContent: "center", alignItems: "center", gap: 18,
              marginTop: "1.6rem", paddingTop: "1.4rem",
              borderTop: "1px solid #f3effe",
              animation: "fadeSlide 0.45s ease both 0.4s",
            }}>
              {[
                { icon: "🔐", text: "SSL Secured" },
                { icon: "✦", text: "No ads" },
                { icon: "⚡", text: "99.9% uptime" },
              ].map(({ icon, text }) => (
                <span key={text} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "#c4bce0", fontWeight: 500 }}>
                  <span style={{ fontSize: 12 }}>{icon}</span> {text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>    
    </>
  );
}   