// ResumePage.jsx
// Complete 3-step resume builder: Gallery (horizontal scroll) → Configure → Builder
// Includes all supporting files: Resumedata.js, Resumepreview.js, and API service

import React, { useState, useMemo, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";
import { createResume, updateResume, downloadResume } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import ResumePreview from "./ResumePreview";
import {
  TEMPLATES,
  CATEGORIES,
  FILTER_TYPES,
  COLORS,
  FONT_OPTIONS,
  DEFAULT_FORM,
} from "./Resumedata";

// ========================
// Styling System (Modern, Clean, Responsive)
// ========================
const colors = {
  primary: "#2563eb",
  primaryDark: "#1d4ed8",
  primaryLight: "#eff6ff",
  slate: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
  },
};

// Reusable Components
const Button = ({ children, onClick, variant = "primary", disabled = false, style = {} }) => {
  const baseStyle = {
    padding: "10px 20px",
    borderRadius: "12px",
    fontSize: "0.875rem",
    fontWeight: "600",
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "all 0.2s ease",
    border: "none",
    opacity: disabled ? 0.6 : 1,
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
  };
  const variants = {
    primary: { background: colors.primary, color: "#fff", boxShadow: "0 2px 4px rgba(37, 99, 235, 0.2)" },
    secondary: { background: "#fff", color: colors.slate[700], border: `1px solid ${colors.slate[200]}`, boxShadow: "0 1px 2px rgba(0,0,0,0.05)" },
    outline: { background: "transparent", color: colors.primary, border: `1px solid ${colors.primary}` },
    ghost: { background: "transparent", color: colors.slate[600] },
  };
  return <button onClick={onClick} disabled={disabled} style={{ ...baseStyle, ...variants[variant], ...style }}>{children}</button>;
};

const Input = ({ label, value, onChange, placeholder, type = "text", ...props }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "12px" }}>
    {label && <label style={{ fontSize: "0.75rem", fontWeight: "600", color: colors.slate[600] }}>{label}</label>}
    <input
      type={type}
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        padding: "10px 12px",
        border: `1px solid ${colors.slate[200]}`,
        borderRadius: "10px",
        fontSize: "0.875rem",
        outline: "none",
        transition: "all 0.15s",
        background: "#fff",
      }}
      onFocus={(e) => e.target.style.borderColor = colors.primary}
      onBlur={(e) => e.target.style.borderColor = colors.slate[200]}
      {...props}
    />
  </div>
);

const TextArea = ({ label, value, onChange, placeholder }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "12px" }}>
    {label && <label style={{ fontSize: "0.75rem", fontWeight: "600", color: colors.slate[600] }}>{label}</label>}
    <textarea
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={3}
      style={{
        padding: "10px 12px",
        border: `1px solid ${colors.slate[200]}`,
        borderRadius: "10px",
        fontSize: "0.875rem",
        outline: "none",
        resize: "vertical",
        fontFamily: "inherit",
      }}
      onFocus={(e) => e.target.style.borderColor = colors.primary}
      onBlur={(e) => e.target.style.borderColor = colors.slate[200]}
    />
  </div>
);

const SectionCard = ({ title, icon, children }) => (
  <div style={{
    background: "#fff",
    borderRadius: "20px",
    padding: "20px",
    marginBottom: "24px",
    border: `1px solid ${colors.slate[100]}`,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.02)",
  }}>
    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px", borderBottom: `2px solid ${colors.slate[100]}`, paddingBottom: "12px" }}>
      <span style={{ fontSize: "1.25rem" }}>{icon}</span>
      <h3 style={{ fontSize: "1rem", fontWeight: "700", color: colors.slate[800] }}>{title}</h3>
    </div>
    {children}
  </div>
);

// ========================
// Enhanced Thumbnail Component
// ========================
const TemplateThumbnail = ({ accent, layout }) => {
  const line = (width, opacity = 0.3) => (
    <div style={{ height: "3px", background: `rgba(0,0,0,${opacity})`, borderRadius: "4px", width: `${width}%`, marginBottom: "4px" }} />
  );
  const whiteLine = (width) => (
    <div style={{ height: "2px", background: "rgba(255,255,255,0.5)", borderRadius: "2px", width: `${width}%`, marginBottom: "3px" }} />
  );

  if (layout === "sidebar") {
    return (
      <div style={{ display: "flex", height: "100%", background: "#fff" }}>
        <div style={{ width: "35%", background: accent, padding: "12px 8px" }}>
          <div style={{ width: "30px", height: "30px", background: "rgba(255,255,255,0.2)", borderRadius: "50%", margin: "0 auto 12px" }} />
          {whiteLine(70)}{whiteLine(50)}
          <div style={{ marginTop: "12px" }} />
          {[60, 80, 40, 70].map((w, i) => whiteLine(w))}
        </div>
        <div style={{ flex: 1, padding: "12px 8px" }}>
          <div style={{ height: "6px", background: accent, width: "50%", borderRadius: "3px", marginBottom: "8px" }} />
          {[80, 70, 90, 60, 75].map((w, i) => line(w, 0.15))}
        </div>
      </div>
    );
  }
  if (layout === "top") {
    return (
      <div>
        <div style={{ background: accent, padding: "16px 12px" }}>
          <div style={{ height: "6px", background: "#fff", width: "60%", borderRadius: "3px", marginBottom: "6px", opacity: 0.9 }} />
          <div style={{ height: "3px", background: "#fff", width: "40%", borderRadius: "2px", opacity: 0.6 }} />
        </div>
        <div style={{ padding: "12px" }}>
          {["Work", "Education", "Skills"].map(s => (
            <div key={s} style={{ marginBottom: "12px" }}>
              <div style={{ fontSize: "6px", fontWeight: "bold", color: accent, marginBottom: "4px" }}>{s}</div>
              {line(90, 0.12)}{line(70, 0.12)}{line(80, 0.12)}
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (layout === "corporate") {
    return (
      <div>
        <div style={{ background: accent, padding: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "24px", height: "24px", background: "rgba(255,255,255,0.2)", borderRadius: "50%" }} />
          <div><div style={{ height: "4px", background: "#fff", width: "60px", marginBottom: "3px", opacity: 0.9 }} /><div style={{ height: "2px", background: "#fff", width: "40px", opacity: 0.6 }} /></div>
        </div>
        <div style={{ padding: "12px" }}>
          {["Experience", "Education", "Skills"].map(s => (
            <div key={s} style={{ marginBottom: "12px" }}>
              <div style={{ fontSize: "6px", fontWeight: "bold", color: accent, marginBottom: "3px", borderLeft: `2px solid ${accent}`, paddingLeft: "4px" }}>{s}</div>
              {line(85, 0.12)}{line(65, 0.12)}
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (layout === "resumeio" || layout === "resumeioClean") {
    return (
      <div style={{ display: "flex", height: "100%", background: "#fff" }}>
        <div style={{ width: "28%", background: "#f8fafc", borderRight: `1px solid ${colors.slate[200]}`, padding: "10px 8px" }}>
          <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: accent, opacity: 0.85, marginBottom: "10px" }} />
          {line(55, 0.16)}
          {line(70, 0.16)}
          <div style={{ margin: "10px 0 6px", height: "1px", background: colors.slate[300] }} />
          {[60, 45, 72, 50, 68].map((w, i) => line(w, 0.12))}
        </div>
        <div style={{ flex: 1, padding: "10px 8px" }}>
          <div style={{ height: "5px", background: accent, width: "52%", borderRadius: "2px", marginBottom: "8px" }} />
          {["PROFILE", "EXPERIENCE", "EDUCATION"].map((s) => (
            <div key={s} style={{ marginBottom: "8px" }}>
              <div style={{ fontSize: "6px", color: accent, fontWeight: "700", marginBottom: "3px" }}>{s}</div>
              <div style={{ height: "1px", background: colors.slate[300], marginBottom: "4px" }} />
              {line(90, 0.12)}{line(74, 0.12)}
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (layout === "resumeioSidebar") {
    return (
      <div style={{ display: "flex", height: "100%", background: "#fff" }}>
        <div style={{ width: "32%", background: accent, padding: "12px 8px" }}>
          <div style={{ width: "28px", height: "28px", background: "rgba(255,255,255,0.22)", borderRadius: "50%", marginBottom: "10px" }} />
          {whiteLine(70)}{whiteLine(48)}
          <div style={{ height: "1px", background: "rgba(255,255,255,0.35)", margin: "10px 0" }} />
          {[66, 52, 74, 58].map((w, i) => whiteLine(w))}
        </div>
        <div style={{ flex: 1, padding: "10px 8px" }}>
          <div style={{ height: "5px", background: accent, width: "56%", borderRadius: "2px", marginBottom: "8px" }} />
          {["Profile", "Employment", "Education"].map((s) => (
            <div key={s} style={{ marginBottom: "8px" }}>
              <div style={{ fontSize: "6px", color: accent, fontWeight: "700", marginBottom: "3px" }}>{s}</div>
              <div style={{ height: "1px", background: colors.slate[300], marginBottom: "4px" }} />
              {line(88, 0.12)}{line(68, 0.12)}
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (layout === "resumeioDark") {
    return (
      <div style={{ display: "flex", height: "100%", background: "#fff" }}>
        <div style={{ width: "35%", background: "#0f2942", padding: "12px 8px" }}>
          <div style={{ width: "28px", height: "28px", background: "rgba(255,255,255,0.22)", borderRadius: "50%", marginBottom: "10px" }} />
          {whiteLine(72)}{whiteLine(45)}
          <div style={{ marginTop: "12px" }} />
          {[70, 58, 75, 60].map((w, i) => whiteLine(w))}
        </div>
        <div style={{ flex: 1, padding: "10px 8px", background: "#f8fafc" }}>
          <div style={{ height: "5px", background: "#0f2942", width: "54%", borderRadius: "2px", marginBottom: "8px" }} />
          {[85, 78, 72, 80, 68].map((w, i) => line(w, 0.14))}
        </div>
      </div>
    );
  }
  if (layout === "resumeioBoxed") {
    return (
      <div style={{ height: "100%", background: "#fff", padding: "10px" }}>
        <div style={{ border: `1px solid ${colors.slate[400]}`, width: "68%", margin: "0 auto 10px", padding: "8px", textAlign: "center" }}>
          <div style={{ height: "3px", width: "52%", background: accent, margin: "0 auto 4px", borderRadius: "2px" }} />
          <div style={{ height: "2px", width: "30%", background: colors.slate[300], margin: "0 auto", borderRadius: "2px" }} />
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <div style={{ width: "30%", background: "#f8fafc", borderRight: `1px solid ${colors.slate[200]}`, paddingRight: "6px" }}>
            {[70, 50, 65, 55, 62].map((w, i) => line(w, 0.16))}
          </div>
          <div style={{ flex: 1 }}>
            {[90, 84, 76, 72, 88, 70].map((w, i) => line(w, 0.14))}
          </div>
        </div>
      </div>
    );
  }
  if (layout === "coolBluePanel") {
    return (
      <div style={{ display: "flex", height: "100%", background: "#fff" }}>
        <div style={{ width: "33%", background: "#3f6fc4" }} />
        <div style={{ flex: 1, padding: "10px" }}>
          <div style={{ height: "20px", background: "#253247", marginBottom: "8px" }} />
          {["Summary", "Work", "Education"].map((s) => (
            <div key={s} style={{ marginBottom: "8px" }}>
              <div style={{ fontSize: "6px", color: "#253247", fontWeight: "700" }}>{s}</div>
              <div style={{ height: "1px", background: "#cbd5e1", margin: "3px 0" }} />
              {line(88, 0.12)}{line(68, 0.12)}
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (layout === "noirTop") {
    return (
      <div style={{ height: "100%", background: "#fff" }}>
        <div style={{ height: "38%", background: "#0b0b0b" }} />
        <div style={{ padding: "10px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
            <div>{line(90, 0.16)}{line(72, 0.16)}{line(84, 0.16)}</div>
            <div>{line(88, 0.16)}{line(70, 0.16)}{line(80, 0.16)}</div>
          </div>
        </div>
      </div>
    );
  }
  if (layout === "purpleCurve") {
    return (
      <div style={{ height: "100%", background: "#fff", padding: "10px" }}>
        <div style={{ background: "#4c2f8f", borderRadius: "0 16px 16px 0", height: "32%", marginBottom: "10px" }} />
        <div style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: "8px" }}>
          <div>{line(80, 0.14)}{line(62, 0.14)}{line(70, 0.14)}</div>
          <div>{line(92, 0.14)}{line(78, 0.14)}{line(88, 0.14)}</div>
        </div>
      </div>
    );
  }
  if (layout === "mintGeo") {
    return (
      <div style={{ height: "100%", background: "#fff", padding: "10px", position: "relative" }}>
        <div style={{ position: "absolute", left: "16px", top: "8px", width: "2px", height: "82%", background: "#22c7a0", opacity: 0.8 }} />
        <div style={{ position: "absolute", left: "16px", top: "20px", width: "58px", height: "2px", background: "#22c7a0", transform: "rotate(36deg)", transformOrigin: "left center" }} />
        <div style={{ paddingLeft: "22px", paddingTop: "8px" }}>
          <div style={{ height: "5px", width: "56%", background: "#22c7a0", marginBottom: "8px" }} />
          {line(88, 0.14)}{line(68, 0.14)}{line(82, 0.14)}
        </div>
      </div>
    );
  }
  if (layout === "modernPopular") {
    return (
      <div style={{ display: "flex", height: "100%", background: "#fff" }}>
        <div style={{ width: "34%", background: "#f1f5f9", borderRight: `1px solid ${colors.slate[300]}`, padding: "10px 6px" }}>
          {line(70, 0.14)}{line(52, 0.14)}{line(68, 0.14)}
        </div>
        <div style={{ flex: 1, padding: "10px 8px" }}>
          <div style={{ height: "4px", background: "#111827", width: "55%", marginBottom: "6px" }} />
          {line(90, 0.12)}{line(78, 0.12)}{line(86, 0.12)}
        </div>
      </div>
    );
  }
  if (layout === "modernCleanStrip") {
    return (
      <div style={{ display: "flex", height: "100%", background: "#fff" }}>
        <div style={{ width: "28%", background: "#e5e7eb", borderRight: `1px solid ${colors.slate[300]}`, padding: "10px 6px" }}>
          {line(68, 0.14)}{line(50, 0.14)}{line(62, 0.14)}
        </div>
        <div style={{ flex: 1, padding: "10px 8px" }}>
          <div style={{ height: "4px", background: "#111827", width: "52%", marginBottom: "6px" }} />
          {line(90, 0.12)}{line(78, 0.12)}{line(84, 0.12)}
        </div>
      </div>
    );
  }
  if (layout === "monoSidebarClassic") {
    return (
      <div style={{ display: "flex", height: "100%", background: "#fff" }}>
        <div style={{ width: "28%", background: "#e5e7eb", borderRight: `1px solid ${colors.slate[300]}`, padding: "10px 6px" }}>
          {line(60, 0.15)}{line(48, 0.15)}{line(66, 0.15)}
        </div>
        <div style={{ flex: 1, padding: "10px 8px" }}>
          <div style={{ height: "4px", background: "#6b7280", width: "54%", marginBottom: "6px" }} />
          {line(90, 0.12)}{line(76, 0.12)}{line(84, 0.12)}
        </div>
      </div>
    );
  }
  if (layout === "tealExecutiveSide") {
    return (
      <div style={{ display: "flex", height: "100%", background: "#fff" }}>
        <div style={{ width: "33%", background: "#0b5568", padding: "10px 6px" }}>
          <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "rgba(255,255,255,0.8)", margin: "0 auto 8px" }} />
          {whiteLine(70)}{whiteLine(56)}{whiteLine(64)}
        </div>
        <div style={{ flex: 1, padding: "10px 8px" }}>
          <div style={{ height: "5px", background: "#1f2937", width: "62%", marginBottom: "6px" }} />
          {line(88, 0.14)}{line(74, 0.14)}{line(82, 0.14)}
        </div>
      </div>
    );
  }
  if (layout === "chocoProfileArt") {
    return (
      <div style={{ height: "100%", background: "#f7f3ec", display: "grid", gridTemplateRows: "28% 72%" }}>
        <div style={{ background: "#3d2118" }} />
        <div style={{ display: "flex" }}>
          <div style={{ width: "33%", background: "#f1dcc7", padding: "8px 6px" }}>{line(62, 0.12)}{line(52, 0.12)}</div>
          <div style={{ flex: 1, background: "#fff", padding: "8px 6px", position: "relative" }}>
            <div style={{ position: "absolute", left: "-14px", top: "-12px", width: "30px", height: "30px", borderRadius: "50%", background: "#d1d5db", border: "2px solid #fff" }} />
            {line(86, 0.13)}{line(72, 0.13)}{line(80, 0.13)}
          </div>
        </div>
      </div>
    );
  }
  if (layout === "tealDataGrid") {
    return (
      <div style={{ height: "100%", background: "#fff", display: "grid", gridTemplateRows: "30% 50% 20%" }}>
        <div style={{ background: accent, position: "relative" }}>
          <div style={{ position: "absolute", left: "8px", top: "8px", width: "34%", height: "4px", background: "#0f172a" }} />
          <div style={{ position: "absolute", left: "42%", top: "8px", width: "36px", height: "36px", borderRadius: "50%", background: "#d1d5db", border: "2px solid #94a3b8" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <div style={{ background: "#4e8d83", padding: "8px 6px" }}>{whiteLine(72)}{whiteLine(58)}</div>
          <div style={{ background: "#f8fafc", padding: "8px 6px" }}>{line(84, 0.12)}{line(68, 0.12)}</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <div style={{ background: "#6ea69e" }} />
          <div style={{ background: "#0f4b5c" }} />
        </div>
      </div>
    );
  }
  if (layout === "multiColorRow") {
    return (
      <div style={{ height: "100%", background: "#fff", display: "grid", gridTemplateRows: "32% 68%" }}>
        <div style={{ background: "#0b1f3a", padding: "8px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 4, marginTop: 8 }}>
            {["#facc15", "#f97316", "#1e3a8a", "#7f1d1d", "#ef4444", "#0ea5e9"].map((c, i) => <div key={i} style={{ height: 5, background: c }} />)}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "0.34fr 0.66fr" }}>
          <div style={{ background: "#fff7ed", padding: "8px 6px" }}>{line(62, 0.12)}{line(50, 0.12)}</div>
          <div style={{ background: "#fff", padding: "8px 6px" }}>{line(84, 0.12)}{line(70, 0.12)}{line(78, 0.12)}</div>
        </div>
      </div>
    );
  }
  if (layout === "catExecutive") {
    return (
      <div style={{ display: "flex", height: "100%", background: "#fff" }}>
        <div style={{ width: "31%", background: "#f8fafc", borderRight: `1px solid ${colors.slate[300]}`, padding: "8px 6px" }}>{line(62, 0.12)}{line(48, 0.12)}</div>
        <div style={{ flex: 1, padding: "8px 6px" }}>{line(86, 0.12)}{line(72, 0.12)}{line(80, 0.12)}</div>
      </div>
    );
  }
  if (layout === "techMinimalist") {
    return (
      <div style={{ height: "100%", background: "#fff", padding: "8px 6px" }}>
        <div style={{ height: "3px", width: "48%", background: "#111827", marginBottom: "6px" }} />
        {line(90, 0.12)}{line(74, 0.12)}{line(82, 0.12)}
      </div>
    );
  }
  if (layout === "modernCreativeMint") {
    return (
      <div style={{ height: "100%", background: "#fff", display: "grid", gridTemplateRows: "36% 64%" }}>
        <div style={{ background: "#c9ddca" }} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <div style={{ borderRight: `1px solid ${colors.slate[300]}`, padding: "8px 6px" }}>{line(72, 0.12)}</div>
          <div style={{ padding: "8px 6px" }}>{line(82, 0.12)}</div>
        </div>
      </div>
    );
  }
  if (layout === "warmProfessional") {
    return (
      <div style={{ display: "flex", height: "100%", background: "#fff" }}>
        <div style={{ flex: 1, padding: "8px 6px" }}>{line(88, 0.12)}{line(74, 0.12)}{line(82, 0.12)}</div>
        <div style={{ width: "30%", background: "#faf7f2", borderLeft: `1px solid ${colors.slate[300]}`, padding: "8px 6px" }}>{line(64, 0.12)}</div>
      </div>
    );
  }
  if (layout === "noirHeroExact") {
    return (
      <div style={{ height: "100%", background: "#fff" }}>
        <div style={{ height: "40%", background: "#050505" }} />
        <div style={{ padding: "10px", display: "grid", gridTemplateColumns: "0.42fr 0.58fr", gap: "8px" }}>
          <div>{line(84, 0.16)}{line(72, 0.16)}</div>
          <div>{line(88, 0.16)}{line(74, 0.16)}{line(82, 0.16)}</div>
        </div>
      </div>
    );
  }
  if (layout === "brownClassic") {
    return (
      <div style={{ display: "flex", height: "100%", background: "#fff" }}>
        <div style={{ width: "36%", background: "#b96434", padding: "10px 6px" }}>
          <div style={{ border: "2px solid rgba(255,255,255,0.8)", height: "42px", marginBottom: "8px" }} />
          {whiteLine(70)}{whiteLine(55)}{whiteLine(66)}
        </div>
        <div style={{ flex: 1, background: "#f8fafc", padding: "10px 8px" }}>
          <div style={{ height: "5px", background: "#b96434", width: "58%", marginBottom: "6px" }} />
          {line(88, 0.14)}{line(74, 0.14)}{line(82, 0.14)}
        </div>
      </div>
    );
  }
  // minimal layout
  return (
    <div style={{ padding: "16px" }}>
      <div style={{ height: "8px", background: accent, width: "45%", borderRadius: "4px", marginBottom: "8px" }} />
      <div style={{ height: "4px", background: colors.slate[300], width: "60%", borderRadius: "2px", marginBottom: "16px" }} />
      {["Experience", "Education", "Skills"].map(s => (
        <div key={s} style={{ marginBottom: "12px" }}>
          <div style={{ fontSize: "7px", fontWeight: "bold", color: accent, marginBottom: "3px", textTransform: "uppercase", letterSpacing: "0.5px" }}>{s}</div>
          {line(85, 0.12)}{line(65, 0.12)}
        </div>
      ))}
    </div>
  );
};

// ========================
// Step 1: Horizontal Scroll Gallery
// ========================
const GalleryStep = ({ onSelectTemplate }) => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filteredTemplates = useMemo(() => {
    return TEMPLATES.filter(t => {
      const matchType = filter === "All" || t.type === filter;
      const matchSearch = !search || t.name.toLowerCase().includes(search.toLowerCase());
      return matchType && matchSearch;
    });
  }, [filter, search]);

  const categorizedTemplates = useMemo(() => {
    if (filter !== "All" || search) return null;
    return Object.entries(CATEGORIES).map(([category, ids]) => ({
      category,
      templates: ids.map(id => TEMPLATES.find(t => t.id === id)).filter(Boolean),
    }));
  }, [filter, search]);

  return (
    <div style={{ minHeight: "100vh", background: colors.slate[50] }}>
      {/* Navigation */}
      <nav style={{ background: "#fff", borderBottom: `1px solid ${colors.slate[200]}`, padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ fontSize: "1.5rem", fontWeight: "800", background: `linear-gradient(135deg, ${colors.primary}, #7c3aed)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>ResumeForge</div>
        <div style={{ display: "flex", gap: "12px" }}>
          <Button variant="secondary" onClick={() => navigate("/dashboard")}>Dashboard</Button>
          <Button variant="primary">My Resumes</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={{ background: `linear-gradient(135deg, ${colors.slate[800]}, ${colors.slate[900]})`, color: "#fff", padding: "56px 32px", textAlign: "center" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: "800", marginBottom: "16px", letterSpacing: "-0.02em" }}>Build Your Professional Resume</h1>
        <p style={{ fontSize: "1rem", opacity: 0.85, maxWidth: "600px", margin: "0 auto 32px" }}>Choose from beautifully crafted templates, customize colors and fonts, and export to PDF in minutes.</p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          {["50+ Templates", "Custom Colors", "ATS Friendly", "Live Preview", "PDF Export"].map(tag => (
            <span key={tag} style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(4px)", padding: "6px 16px", borderRadius: "100px", fontSize: "0.75rem", fontWeight: "500" }}>{tag}</span>
          ))}
        </div>
      </div>

      {/* Filter Bar */}
      <div style={{ padding: "20px 32px", background: "#fff", borderBottom: `1px solid ${colors.slate[200]}`, display: "flex", gap: "20px", alignItems: "center", flexWrap: "wrap", position: "sticky", top: "72px", zIndex: 5 }}>
        <div style={{ flex: 1, minWidth: "240px" }}>
          <Input placeholder="Search templates..." value={search} onChange={setSearch} />
        </div>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {FILTER_TYPES.map(type => (
            <button key={type} onClick={() => setFilter(type)} style={{
              padding: "8px 20px", borderRadius: "40px", fontSize: "0.75rem", fontWeight: "600", cursor: "pointer", transition: "all 0.2s",
              background: filter === type ? colors.primary : "#fff", color: filter === type ? "#fff" : colors.slate[600],
              border: `1px solid ${filter === type ? colors.primary : colors.slate[200]}`,
            }}>{type}</button>
          ))}
        </div>
      </div>

      {/* Gallery - Horizontal Scroll */}
      <div style={{ padding: "32px" }}>
        {filteredTemplates.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px", color: colors.slate[500] }}>No templates found. Try adjusting your search.</div>
        )}
        
        {categorizedTemplates ? (
          categorizedTemplates.map(({ category, templates }) => (
            <div key={category} style={{ marginBottom: "48px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                <div style={{ width: "40px", height: "3px", background: colors.primary, borderRadius: "2px" }} />
                <h2 style={{ fontSize: "1.25rem", fontWeight: "700", color: colors.slate[800] }}>{category}</h2>
              </div>
              <div style={{ display: "flex", overflowX: "auto", gap: "24px", paddingBottom: "16px", scrollbarWidth: "thin" }}>
                {templates.map(template => (
                  <TemplateCard key={template.id} template={template} onSelect={onSelectTemplate} />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", justifyContent: "center" }}>
            {filteredTemplates.map(template => (
              <TemplateCard key={template.id} template={template} onSelect={onSelectTemplate} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const TemplateCard = ({ template, onSelect }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{
      width: "260px", flexShrink: 0, background: "#fff", borderRadius: "20px", overflow: "hidden", cursor: "pointer",
      transition: "all 0.25s ease", border: `1px solid ${hovered ? colors.primary : colors.slate[200]}`,
      transform: hovered ? "translateY(-4px)" : "none", boxShadow: hovered ? "0 20px 25px -12px rgba(0,0,0,0.1)" : "none",
    }} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onClick={() => onSelect(template)}>
      <div style={{ height: "200px", background: colors.slate[100], padding: "12px" }}>
        <div style={{ background: "#fff", borderRadius: "12px", overflow: "hidden", height: "100%", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          <TemplateThumbnail accent={template.accent} layout={template.layout} />
        </div>
      </div>
      <div style={{ padding: "16px" }}>
        <div style={{ fontWeight: "700", color: colors.slate[800], marginBottom: "4px" }}>{template.name}</div>
        <div style={{ fontSize: "0.7rem", color: colors.slate[500], marginBottom: "12px" }}>{template.type}</div>
        <Button variant="primary" style={{ width: "100%", justifyContent: "center" }}>Choose Template</Button>
      </div>
    </div>
  );
};

// ========================
// Step 2: Configuration Panel
// ========================
const ConfigureStep = ({ template, config, setConfig, onBack, onNext }) => {
  const photoInputRef = useRef(null);
  const updateConfig = (key, value) => setConfig(prev => ({ ...prev, [key]: value }));

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => updateConfig("photo", ev.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ minHeight: "100vh", background: colors.slate[50], display: "flex", flexDirection: "column" }}>
      <div style={{ background: "#fff", borderBottom: `1px solid ${colors.slate[200]}`, padding: "16px 32px", display: "flex", alignItems: "center", gap: "24px", position: "sticky", top: 0, zIndex: 10 }}>
        <Button variant="secondary" onClick={onBack}>← Back to Templates</Button>
        <div style={{ fontWeight: "700", fontSize: "1.1rem", color: colors.slate[800] }}>{template.name}</div>
        <div style={{ marginLeft: "auto", background: colors.slate[100], padding: "4px 12px", borderRadius: "100px", fontSize: "0.7rem", fontWeight: "500", color: colors.slate[600] }}>{template.type}</div>
      </div>

      <div style={{ display: "flex", flex: 1, gap: "0", minHeight: "calc(100vh - 72px)" }}>
        {/* Left Panel - Configuration */}
        <div style={{ width: "400px", background: "#fff", borderRight: `1px solid ${colors.slate[200]}`, padding: "24px", overflowY: "auto" }}>
          <SectionCard title="Accent Color" icon="🎨">
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "20px" }}>
              {COLORS.map(color => (
                <div key={color} onClick={() => updateConfig("accent", color)} style={{
                  width: "36px", height: "36px", borderRadius: "50%", background: color, cursor: "pointer",
                  border: config.accent === color ? `3px solid ${colors.primary}` : "2px solid transparent",
                  boxShadow: config.accent === color ? `0 0 0 2px #fff, 0 0 0 4px ${colors.primary}` : "none",
                  transition: "all 0.2s",
                }} />
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: "600" }}>Custom:</span>
              <input type="color" value={config.accent} onChange={(e) => updateConfig("accent", e.target.value)} style={{ width: "48px", height: "40px", borderRadius: "8px", border: `1px solid ${colors.slate[200]}`, cursor: "pointer" }} />
              <span style={{ fontSize: "0.7rem", fontFamily: "monospace" }}>{config.accent}</span>
            </div>
          </SectionCard>

          <SectionCard title="Profile Photo" icon="📸">
            <input type="file" accept="image/*" ref={photoInputRef} onChange={handlePhotoUpload} style={{ display: "none" }} />
            {config.photo ? (
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
                <img src={config.photo} alt="Profile" style={{ width: "64px", height: "64px", borderRadius: config.circlePhoto ? "50%" : "12px", objectFit: "cover", border: `2px solid ${colors.primary}` }} />
                <div>
                  <Button variant="secondary" onClick={() => photoInputRef.current.click()} style={{ marginRight: "8px" }}>Change</Button>
                  <Button variant="secondary" onClick={() => updateConfig("photo", null)}>Remove</Button>
                </div>
              </div>
            ) : (
              <div onClick={() => photoInputRef.current.click()} style={{ border: `2px dashed ${colors.slate[300]}`, borderRadius: "16px", padding: "24px", textAlign: "center", cursor: "pointer", transition: "0.2s", background: colors.slate[50] }}>
                <div style={{ fontSize: "2rem", marginBottom: "8px" }}>📷</div>
                <div style={{ fontWeight: "600", fontSize: "0.8rem" }}>Click to upload</div>
                <div style={{ fontSize: "0.7rem", color: colors.slate[500] }}>JPG, PNG (max 2MB)</div>
              </div>
            )}
            <div style={{ display: "flex", gap: "20px", marginTop: "16px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.75rem", cursor: "pointer" }}>
                <input type="checkbox" checked={config.circlePhoto} onChange={(e) => updateConfig("circlePhoto", e.target.checked)} /> Circle crop
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.75rem", cursor: "pointer" }}>
                <input type="checkbox" checked={config.showPhoto} onChange={(e) => updateConfig("showPhoto", e.target.checked)} /> Show photo
              </label>
            </div>
          </SectionCard>

          <SectionCard title="Typography" icon="✏️">
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {FONT_OPTIONS.map(font => (
                <button key={font.value} onClick={() => updateConfig("font", font.value)} style={{
                  padding: "8px 16px", borderRadius: "40px", fontSize: "0.75rem", fontWeight: "600", cursor: "pointer", transition: "all 0.2s",
                  background: config.font === font.value ? colors.primary : "#fff", color: config.font === font.value ? "#fff" : colors.slate[700],
                  border: `1px solid ${config.font === font.value ? colors.primary : colors.slate[200]}`,
                  fontFamily: font.value,
                }}>{font.label}</button>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Layout Style" icon="📐">
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {["sidebar", "top", "minimal", "corporate", "resumeio", "resumeioSidebar", "resumeioDark", "resumeioBoxed", "resumeioClean", "coolBluePanel", "noirTop", "purpleCurve", "mintGeo", "modernPopular", "modernCleanStrip", "monoSidebarClassic", "tealExecutiveSide", "chocoProfileArt", "tealDataGrid", "multiColorRow", "catExecutive", "techMinimalist", "modernCreativeMint", "warmProfessional", "noirHeroExact", "brownClassic"].map(layout => (
                <button key={layout} onClick={() => updateConfig("layout", layout)} style={{
                  padding: "8px 18px", borderRadius: "40px", fontSize: "0.75rem", fontWeight: "600", cursor: "pointer", textTransform: "capitalize",
                  background: config.layout === layout ? colors.primary : "#fff", color: config.layout === layout ? "#fff" : colors.slate[700],
                  border: `1px solid ${config.layout === layout ? colors.primary : colors.slate[200]}`,
                }}>{layout === "top" ? "Top Header" : layout === "resumeio" ? "Classic Split" : layout === "resumeioSidebar" ? "Ocean Sidebar" : layout === "resumeioDark" ? "Navy Panel" : layout === "resumeioBoxed" ? "Boxed Header" : layout === "resumeioClean" ? "Clean Split" : layout === "coolBluePanel" ? "Blue Panel" : layout === "noirTop" ? "Noir Hero" : layout === "purpleCurve" ? "Purple Curve" : layout === "mintGeo" ? "Mint Geometry" : layout === "modernPopular" ? "Modern Popular" : layout === "modernCleanStrip" ? "Modern Clean Strip" : layout === "monoSidebarClassic" ? "Mono Sidebar Classic" : layout === "tealExecutiveSide" ? "Teal Executive Side" : layout === "chocoProfileArt" ? "Choco Profile Art" : layout === "tealDataGrid" ? "Teal Data Grid" : layout === "multiColorRow" ? "Multi Color Row" : layout === "catExecutive" ? "Cat Executive" : layout === "techMinimalist" ? "Tech Minimalist" : layout === "modernCreativeMint" ? "Modern Creative Mint" : layout === "warmProfessional" ? "Warm Professional" : layout === "noirHeroExact" ? "Noir Hero Exact" : layout === "brownClassic" ? "Brown Classic" : layout}</button>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* Right Panel - Live Preview */}
        <div style={{ flex: 1, background: colors.slate[100], display: "flex", flexDirection: "column", padding: "32px", overflowY: "auto" }}>
          <div style={{ background: "#fff", borderRadius: "24px", boxShadow: "0 20px 35px -12px rgba(0,0,0,0.1)", width: "100%", maxWidth: "560px", margin: "0 auto", padding: "12px" }}>
            <div style={{ width: "100%", aspectRatio: "210 / 297", background: "#fff", overflow: "hidden", borderRadius: "10px" }}>
              <ResumePreview config={config} form={DEFAULT_FORM} />
            </div>
          </div>
          <div style={{ marginTop: "auto", paddingTop: "32px", display: "flex", gap: "16px", justifyContent: "center" }}>
            <Button variant="secondary" onClick={onBack}>← Back</Button>
            <Button variant="primary" onClick={onNext}>Continue to Details →</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ========================
// Step 3: Form Builder with Live Preview
// ========================
const BuilderStep = ({ template, config, onBack, onChangeTemplate, user, refreshUser }) => {
  const [form, setForm] = useState({ ...DEFAULT_FORM });
  const [isCreating, setIsCreating] = useState(false);
  const [resumeCreated, setResumeCreated] = useState(false);
  const previewRef = useRef();

  const updateField = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const updateArrayItem = (arrayName, index, key, value) => {
    setForm(prev => {
      const newArray = [...(prev[arrayName] || [])];
      if (newArray[index]) newArray[index] = { ...newArray[index], [key]: value };
      return { ...prev, [arrayName]: newArray };
    });
  };

  const addArrayItem = (arrayName, defaults) => {
    setForm(prev => ({ ...prev, [arrayName]: [...(prev[arrayName] || []), { id: Date.now().toString(), ...defaults }] }));
  };

  const removeArrayItem = (arrayName, index) => {
    setForm(prev => {
      const newArray = [...(prev[arrayName] || [])];
      newArray.splice(index, 1);
      return { ...prev, [arrayName]: newArray };
    });
  };

  const handleCreateResume = async () => {
    if (!previewRef.current) return;
    setIsCreating(true);
    try {
      const element = previewRef.current;
      const opt = { margin: 0, filename: 'resume.pdf', image: { type: 'jpeg', quality: 0.98 }, html2canvas: { scale: 2, useCORS: true }, jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' } };
      const pdfBlob = await html2pdf().from(element).set(opt).output('blob');
      const file = new File([pdfBlob], "resume.pdf", { type: "application/pdf" });
      if (user?.resume) await updateResume(file);
      else await createResume(file);
      if (refreshUser) await refreshUser();
      setResumeCreated(true);
    } catch (err) { alert(err.response?.data?.message || "Failed to create resume."); }
    finally { setIsCreating(false); }
  };

  const handleDownload = async () => { try { await downloadResume(); } catch (err) { alert("Download failed."); } };

  // Reusable form sections
  const renderArrayFields = (title, icon, arrayName, fields, labels, hasDescription = false) => (
    <SectionCard title={title} icon={icon}>
      {(form[arrayName] || []).map((item, idx) => (
        <div key={item.id} style={{ position: "relative", marginBottom: "20px", paddingBottom: "16px", borderBottom: `1px solid ${colors.slate[100]}` }}>
          <button onClick={() => removeArrayItem(arrayName, idx)} style={{ position: "absolute", top: 0, right: 0, background: "none", border: "none", fontSize: "1.2rem", cursor: "pointer", color: "#ef4444" }}>×</button>
          <div style={{ display: "grid", gridTemplateColumns: fields.length === 2 ? "1fr 1fr" : "1fr", gap: "12px" }}>
            {fields.map((field, i) => (
              <Input key={field} label={labels[i]} value={item[field]} onChange={(val) => updateArrayItem(arrayName, idx, field, val)} />
            ))}
          </div>
          {hasDescription && arrayName === "experience" && (
            <TextArea label="Description" value={item.jobdesc} onChange={(val) => updateArrayItem(arrayName, idx, "jobdesc", val)} placeholder="Describe your responsibilities and achievements..." />
          )}
          {hasDescription && arrayName === "projects" && (
            <TextArea label="Description" value={item.description} onChange={(val) => updateArrayItem(arrayName, idx, "description", val)} placeholder="Describe the project, technologies used, and your role..." />
          )}
        </div>
      ))}
      <Button variant="secondary" onClick={() => addArrayItem(arrayName, Object.fromEntries(fields.map(f => [f, ""])))} style={{ width: "100%", justifyContent: "center" }}>+ Add {title}</Button>
    </SectionCard>
  );

  return (
    <div style={{ minHeight: "100vh", background: colors.slate[50], display: "flex", flexDirection: "column" }}>
      <div style={{ background: "#fff", borderBottom: `1px solid ${colors.slate[200]}`, padding: "16px 32px", display: "flex", alignItems: "center", gap: "24px", position: "sticky", top: 0, zIndex: 10 }}>
        <Button variant="secondary" onClick={onBack}>← Edit Design</Button>
        <div style={{ fontWeight: "700", color: colors.slate[800] }}>{template.name}</div>
        <Button variant="ghost" onClick={onChangeTemplate} style={{ marginLeft: "auto" }}>Change Template</Button>
      </div>

      <div style={{ display: "flex", flex: 1, minHeight: "calc(100vh - 72px)" }}>
        {/* Left: Form */}
        <div style={{ width: "480px", background: "#fff", borderRight: `1px solid ${colors.slate[200]}`, overflowY: "auto", padding: "24px" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "4px" }}>Your Information</h2>
          <p style={{ fontSize: "0.75rem", color: colors.slate[500], marginBottom: "24px" }}>Fill in the details below — preview updates instantly</p>

          <SectionCard title="Personal Info" icon="👤">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <Input label="First Name" value={form.fname} onChange={v => updateField("fname", v)} />
              <Input label="Last Name" value={form.lname} onChange={v => updateField("lname", v)} />
            </div>
            <Input label="Professional Title" value={form.title} onChange={v => updateField("title", v)} placeholder="e.g., Senior Product Designer" />
            <Input label="Email" value={form.email} onChange={v => updateField("email", v)} type="email" />
            <Input label="Phone" value={form.phone} onChange={v => updateField("phone", v)} />
            <Input label="LinkedIn" value={form.linkedin} onChange={v => updateField("linkedin", v)} placeholder="linkedin.com/in/username" />
            <Input label="GitHub" value={form.github} onChange={v => updateField("github", v)} placeholder="github.com/username" />
            <Input label="Twitter/X" value={form.twitter} onChange={v => updateField("twitter", v)} placeholder="x.com/username" />
            <Input label="Portfolio" value={form.portfolio} onChange={v => updateField("portfolio", v)} placeholder="yourportfolio.com" />
          </SectionCard>

          <SectionCard title="Professional Summary" icon="📝">
            <TextArea value={form.summary} onChange={v => updateField("summary", v)} placeholder="Write 2-3 sentences about your experience, skills, and career goals..." />
          </SectionCard>

          {renderArrayFields("Work Experience", "💼", "experience", ["jobtitle", "company", "jobstart", "jobend"], ["Job Title", "Company", "Start Date", "End Date"], true)}
          {renderArrayFields("Education", "🎓", "education", ["degree", "school", "gradyear", "gpa"], ["Degree", "School", "Year", "GPA"], false)}
          {renderArrayFields("Projects", "🚀", "projects", ["name", "year"], ["Project Name", "Year/Link"], true)}
          {renderArrayFields("Certifications", "📜", "certifications", ["name", "issuer", "year"], ["Name", "Issuer", "Year"], false)}
          {renderArrayFields("Languages", "🌐", "languages", ["language", "langLevel"], ["Language", "Level"], false)}

          <SectionCard title="Skills & Interests" icon="⚡">
            <Input label="Skills (comma separated)" value={form.skills} onChange={v => updateField("skills", v)} placeholder="React, Node.js, Figma, Python, ..." />
            <Input label="Interests (comma separated)" value={form.interests} onChange={v => updateField("interests", v)} placeholder="Open source, Reading, Chess, Photography" />
          </SectionCard>
        </div>

        {/* Right: Live Preview & Export */}
        <div style={{ flex: 1, background: colors.slate[100], display: "flex", flexDirection: "column", padding: "32px", overflowY: "auto" }}>
          <div ref={previewRef} style={{ background: "#fff", borderRadius: "24px", boxShadow: "0 20px 35px -12px rgba(0,0,0,0.15)", width: "100%", maxWidth: "560px", margin: "0 auto", padding: "12px" }}>
            <div style={{ width: "100%", aspectRatio: "210 / 297", background: "#fff", overflow: "hidden", borderRadius: "10px" }}>
              <ResumePreview config={config} form={form} />
            </div>
          </div>
          <div style={{ marginTop: "32px", display: "flex", gap: "16px", justifyContent: "center" }}>
            {resumeCreated ? (
              <Button variant="primary" onClick={handleDownload}>Download PDF ↗</Button>
            ) : (
              <Button variant="primary" onClick={handleCreateResume} disabled={isCreating}>{isCreating ? "Creating..." : "Create & Save Resume"}</Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ========================
// Main Component
// ========================
export default function ResumePage() {
  const [step, setStep] = useState("gallery");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const { user, refreshUser } = useAuth();
  const [config, setConfig] = useState({ accent: "#2563eb", font: "'Inter', sans-serif", layout: "sidebar", photo: null, circlePhoto: true, showPhoto: true });

  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template);
    setConfig(prev => ({ ...prev, accent: template.accent, layout: template.layout }));
    setStep("configure");
  };

  if (step === "gallery") return <GalleryStep onSelectTemplate={handleSelectTemplate} />;
  if (step === "configure") return <ConfigureStep template={selectedTemplate} config={config} setConfig={setConfig} onBack={() => setStep("gallery")} onNext={() => setStep("builder")} />;
  return <BuilderStep template={selectedTemplate} config={config} onBack={() => setStep("configure")} onChangeTemplate={() => setStep("gallery")} user={user} refreshUser={refreshUser} />;
}