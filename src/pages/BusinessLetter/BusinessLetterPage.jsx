// BusinessLetterPage.jsx
// Route: /letter-builder
// Step 1 — Choose letter type → Step 2 — Pick template → navigate to editor
// Requires: react-router-dom, Layout component

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// ─── 50+ Template definitions ──────────────────────────────────────────────
export const LETTER_TEMPLATES = [
  // ── Stripe category (6)
  { id: "stripe-v",     name: "Stripe Vertical",  icon: "▌", color: "#7c3aed", category: "Stripe",    description: "Bold left sidebar stripe" },
  { id: "stripe-h",     name: "Stripe Top",        icon: "▬", color: "#0ea5e9", category: "Stripe",    description: "Full-width top header band" },
  { id: "stripe-b",     name: "Stripe Bottom",     icon: "▬", color: "#22c55e", category: "Stripe",    description: "Footer accent color bar" },
  { id: "stripe-d",     name: "Double Stripe",     icon: "▌", color: "#f97316", category: "Stripe",    description: "Top band + left side accent" },
  { id: "stripe-r",     name: "Right Stripe",      icon: "▐", color: "#ec4899", category: "Stripe",    description: "Right-side color column" },
  { id: "stripe-mid",   name: "Mid Divider",       icon: "─", color: "#14b8a6", category: "Stripe",    description: "Center horizontal rule" },
  // ── Minimal category (6)
  { id: "min-clean",    name: "Clean White",       icon: "◻", color: "#6366f1", category: "Minimal",   description: "Pure white minimal layout" },
  { id: "min-dot",      name: "Dot Grid",          icon: "⠿", color: "#3b82f6", category: "Minimal",   description: "Subtle dot background" },
  { id: "min-line",     name: "Single Line",       icon: "—", color: "#8b5cf6", category: "Minimal",   description: "One clean accent underline" },
  { id: "min-mono",     name: "Monogram",          icon: "A", color: "#db2777", category: "Minimal",   description: "Large initial letter mark" },
  { id: "min-edge",     name: "Edge Border",       icon: "▭", color: "#0891b2", category: "Minimal",   description: "Full edge border frame" },
  { id: "min-air",      name: "Airy",              icon: "○", color: "#65a30d", category: "Minimal",   description: "Maximum whitespace design" },
  // ── Bold category (7)
  { id: "bold-solid",   name: "Solid Header",      icon: "█", color: "#7c3aed", category: "Bold",      description: "Full color header block" },
  { id: "bold-split",   name: "Split Color",       icon: "▧", color: "#0ea5e9", category: "Bold",      description: "Half-page background split" },
  { id: "bold-banner",  name: "Banner",            icon: "▬", color: "#f97316", category: "Bold",      description: "Thick mid-page color bar" },
  { id: "bold-stamp",   name: "Stamp Style",       icon: "▭", color: "#ef4444", category: "Bold",      description: "Heavy bordered stamp feel" },
  { id: "bold-flag",    name: "Flag",              icon: "⚑", color: "#22c55e", category: "Bold",      description: "Left bar with top band" },
  { id: "bold-block",   name: "Color Block",       icon: "█", color: "#a855f7", category: "Bold",      description: "Colored background block" },
  { id: "complaint-red",name: "Complaint",         icon: "!", color: "#ef4444", category: "Bold",      description: "Firm formal complaint" },
  // ── Gradient category (7)
  { id: "grad-sunrise",  name: "Sunrise",          icon: "◐", color: "#f59e0b", category: "Gradient",  description: "Warm amber gradient top" },
  { id: "grad-ocean",    name: "Ocean",            icon: "◐", color: "#0ea5e9", category: "Gradient",  description: "Cool blue gradient sweep" },
  { id: "grad-forest",   name: "Forest",           icon: "◐", color: "#22c55e", category: "Gradient",  description: "Deep green gradient wash" },
  { id: "grad-sunset",   name: "Sunset",           icon: "◐", color: "#f97316", category: "Gradient",  description: "Pink-orange sunset sweep" },
  { id: "grad-cosmic",   name: "Cosmic",           icon: "◐", color: "#7c3aed", category: "Gradient",  description: "Purple-blue cosmic blend" },
  { id: "grad-rose",     name: "Rose Gold",        icon: "◐", color: "#ec4899", category: "Gradient",  description: "Elegant rose gold tones" },
  { id: "newsletter",    name: "Newsletter",       icon: "◐", color: "#06b6d4", category: "Gradient",  description: "Bold newsletter header" },
  // ── Line category (7)
  { id: "line-top",     name: "Top Rule",          icon: "╌", color: "#7c3aed", category: "Line",      description: "Thin ruled top border" },
  { id: "line-double",  name: "Double Rule",       icon: "═", color: "#3b82f6", category: "Line",      description: "Twin accent lines top" },
  { id: "line-left",    name: "Left Rule",         icon: "│", color: "#22c55e", category: "Line",      description: "Thick left border accent" },
  { id: "line-frame",   name: "Full Frame",        icon: "▭", color: "#f97316", category: "Line",      description: "Solid framed border" },
  { id: "line-dash",    name: "Dashed Frame",      icon: "┄", color: "#ec4899", category: "Line",      description: "Dashed border all sides" },
  { id: "line-under",   name: "Underline",         icon: "_", color: "#14b8a6", category: "Line",      description: "Header underline only" },
  { id: "invoice-style",name: "Invoice",           icon: "#", color: "#6366f1", category: "Line",      description: "Invoice-inspired layout" },
  // ── Corner category (6)
  { id: "corner-tl",    name: "Corner Top-Left",   icon: "◸", color: "#7c3aed", category: "Corner",    description: "Filled top-left block" },
  { id: "corner-tr",    name: "Corner Top-Right",  icon: "◹", color: "#0ea5e9", category: "Corner",    description: "Top-right accent block" },
  { id: "corner-br",    name: "Corner Bot-Right",  icon: "◿", color: "#22c55e", category: "Corner",    description: "Bottom-right accent" },
  { id: "corner-bl",    name: "Corner Bot-Left",   icon: "◺", color: "#f97316", category: "Corner",    description: "Bottom-left accent block" },
  { id: "corner-all",   name: "All Corners",       icon: "✦", color: "#a855f7", category: "Corner",    description: "Four corner accents" },
  { id: "corner-diag",  name: "Diagonal Cut",      icon: "◢", color: "#ef4444", category: "Corner",    description: "Diagonal triangle corners" },
  // ── Geometric category (6)
  { id: "geo-triangle",  name: "Triangle",         icon: "△", color: "#7c3aed", category: "Geometric", description: "Triangle accent shape" },
  { id: "geo-circle",    name: "Circle",           icon: "◯", color: "#0ea5e9", category: "Geometric", description: "Large circle watermark" },
  { id: "geo-hex",       name: "Hexagon",          icon: "⬡", color: "#22c55e", category: "Geometric", description: "Hex pattern accent" },
  { id: "geo-wave",      name: "Wave",             icon: "∿", color: "#f97316", category: "Geometric", description: "Curved wave bottom band" },
  { id: "geo-chevron",   name: "Chevron",          icon: "⌄", color: "#ec4899", category: "Geometric", description: "V-shaped header shape" },
  { id: "geo-diamond",   name: "Diamond",          icon: "◇", color: "#eab308", category: "Geometric", description: "Rotated diamond mark" },
  // ── Classic category (8)
  { id: "classic-trad",  name: "Traditional",      icon: "📋", color: "#374151", category: "Classic",   description: "Classic block format" },
  { id: "classic-corp",  name: "Corporate",        icon: "🏢", color: "#1e40af", category: "Classic",   description: "Corporate standard layout" },
  { id: "classic-exec",  name: "Executive",        icon: "💼", color: "#7c3aed", category: "Classic",   description: "Executive letterhead" },
  { id: "classic-gov",   name: "Government",       icon: "🏛", color: "#0f172a", category: "Classic",   description: "Official government style" },
  { id: "classic-legal", name: "Legal",            icon: "⚖", color: "#7f1d1d", category: "Classic",   description: "Legal correspondence" },
  { id: "classic-acad",  name: "Academic",         icon: "🎓", color: "#1e3a5f", category: "Classic",   description: "University/academic style" },
  { id: "cover-modern",  name: "Cover Letter",     icon: "✉", color: "#f97316", category: "Classic",   description: "Job application cover letter" },
  { id: "memo-style",    name: "Memo",             icon: "📝", color: "#0ea5e9", category: "Classic",   description: "Internal office memo" },
];

// ─── Category groups shown on Step 1 ──────────────────────────────────────
const TEMPLATE_TYPES = [
  {
    name: "Stripe",
    icon: "▌",
    color: "#7c3aed",
    bg: "#f5f3ff",
    textColor: "#4c1d95",
    description: "Vertical, horizontal and multi-stripe accent layouts",
    categories: ["Stripe"],
  },
  {
    name: "Minimal",
    icon: "◻",
    color: "#0ea5e9",
    bg: "#f0f9ff",
    textColor: "#0c4a6e",
    description: "Clean, distraction-free white-space designs",
    categories: ["Minimal"],
  },
  {
    name: "Bold",
    icon: "█",
    color: "#ef4444",
    bg: "#fef2f2",
    textColor: "#7f1d1d",
    description: "High-impact solid and split color headers",
    categories: ["Bold"],
  },
  {
    name: "Gradient",
    icon: "◐",
    color: "#f97316",
    bg: "#fff7ed",
    textColor: "#7c2d12",
    description: "Smooth color fade headers and bands",
    categories: ["Gradient"],
  },
  {
    name: "Line & Frame",
    icon: "─",
    color: "#22c55e",
    bg: "#f0fdf4",
    textColor: "#14532d",
    description: "Ruled, framed and bordered letter styles",
    categories: ["Line"],
  },
  {
    name: "Corner & Geometric",
    icon: "◸",
    color: "#a855f7",
    bg: "#faf5ff",
    textColor: "#581c87",
    description: "Corner accents, triangles, waves and shapes",
    categories: ["Corner", "Geometric"],
  },
  {
    name: "Classic",
    icon: "📋",
    color: "#374151",
    bg: "#f9fafb",
    textColor: "#111827",
    description: "Traditional, corporate, legal and academic formats",
    categories: ["Classic"],
  },
  {
    name: "All Templates",
    icon: "✦",
    color: "#db2777",
    bg: "#fdf2f8",
    textColor: "#831843",
    description: "Browse all 50+ letter designs in one view",
    categories: null, // null = show everything
  },
];

const STEPS = ["Choose type", "Pick template", "Fill details", "Export"];

// ─── Mini letter thumbnail SVG ─────────────────────────────────────────────
function LetterThumb({ template }) {
  const a = template.color;
  const W = 100, H = 76;
  const lines = [88, 72, 82, 66, 78, 68, 84];

  const lineRows = lines.map((w, i) => (
    <rect key={i} x="9" y={36 + i * 4} width={W * w / 100 - 18} height="2" fill="#e5e7eb" rx="1" />
  ));

  const renderShape = () => {
    switch (template.id) {
      case "stripe-v":
        return <><rect x="0" y="0" width="13" height={H} fill={a} /><rect x="18" y="9" width="48" height="5" fill={a} rx="2" /><rect x="18" y="17" width="32" height="2" fill="#d1d5db" rx="1" /></>;
      case "stripe-h":
      case "bold-solid":
      case "grad-sunrise": case "grad-ocean": case "grad-forest": case "grad-sunset": case "grad-cosmic": case "grad-rose": case "newsletter":
        return <><rect x="0" y="0" width={W} height="20" fill={a} /><rect x="8" y="5" width="48" height="6" fill="rgba(255,255,255,.8)" rx="2" /><rect x="8" y="13" width="28" height="2.5" fill="rgba(255,255,255,.5)" rx="1" /></>;
      case "stripe-b":
        return <><rect x="9" y="8" width="48" height="5" fill={a} rx="2" /><rect x="9" y="16" width="32" height="2" fill="#d1d5db" rx="1" /><rect x="0" y={H - 9} width={W} height="9" fill={a} /></>;
      case "stripe-d":
        return <><rect x="0" y="0" width={W} height="11" fill={a} /><rect x="0" y="11" width="11" height={H - 11} fill={a + "25"} /><rect x="17" y="18" width="48" height="4" fill={a} rx="1" /></>;
      case "stripe-r":
        return <><rect x={W - 13} y="0" width="13" height={H} fill={a} /><rect x="8" y="9" width="48" height="5" fill={a} rx="2" /></>;
      case "stripe-mid":
        return <><rect x="8" y="9" width="48" height="5" fill={a} rx="2" /><rect x="8" y="22" width={W - 16} height="1.5" fill={a} /><rect x="8" y="16" width="32" height="2" fill="#d1d5db" rx="1" /></>;
      case "min-clean":
      case "min-air":
        return <><rect x="9" y="10" width="48" height="5" fill={a} rx="2" /><rect x="9" y="18" width="32" height="2" fill="#d1d5db" rx="1" /></>;
      case "min-dot":
        return <>{Array.from({length:15},(_,i)=><circle key={i} cx={8+(i%8)*12} cy={8+Math.floor(i/8)*10} r="1.2" fill={a+"40"} />)}<rect x="9" y="10" width="48" height="5" fill={a} rx="2" /></>;
      case "min-line":
        return <><rect x="9" y="10" width="48" height="5" fill={a} rx="2" /><rect x="9" y="18" width="70" height="1.5" fill={a} /></>;
      case "min-mono":
        return <><text x="6" y="52" fontSize="42" fill={a + "20"} fontWeight="bold" fontFamily="Georgia,serif">A</text><rect x="9" y="10" width="48" height="5" fill={a} rx="2" /></>;
      case "min-edge":
        return <><rect x="1" y="1" width={W-2} height={H-2} fill="none" stroke={a} strokeWidth="2.5" rx="3" /><rect x="10" y="11" width="48" height="5" fill={a} rx="2" /></>;
      case "bold-split":
        return <><rect x="0" y="0" width={W/2} height={H} fill={a + "20"} /><rect x="8" y="10" width="34" height="5" fill={a} rx="2" /><rect x="8" y="19" width="24" height="2" fill={a + "80"} rx="1" /></>;
      case "bold-banner":
        return <><rect x="8" y="9" width="48" height="4" fill={a} rx="1" /><rect x="0" y={H/2 - 8} width={W} height="17" fill={a} /><rect x="8" y={H/2 - 5} width="50" height="6" fill="rgba(255,255,255,.8)" rx="2" /></>;
      case "bold-stamp": case "complaint-red":
        return <><rect x="3" y="3" width={W-6} height={H-6} fill="none" stroke={a} strokeWidth="3" rx="3" /><rect x="11" y="11" width="44" height="5" fill={a} rx="2" /></>;
      case "bold-flag":
        return <><rect x="0" y="0" width="8" height={H} fill={a} /><rect x="0" y="0" width={W} height="19" fill={a+"22"} /><rect x="13" y="5" width="48" height="5" fill={a} rx="2" /></>;
      case "bold-block":
        return <><rect x="0" y="0" width={W} height={H} fill={a+"12"} /><rect x="7" y="7" width={W-14} height="22" fill={a} rx="3" /><rect x="13" y="12" width="46" height="7" fill="rgba(255,255,255,.85)" rx="2" /></>;
      case "line-top":
        return <><rect x="0" y="0" width={W} height="4" fill={a} /><rect x="9" y="12" width="48" height="5" fill={a} rx="2" /></>;
      case "line-double":
        return <><rect x="0" y="0" width={W} height="3.5" fill={a} /><rect x="0" y="7" width={W} height="1.5" fill={a + "60"} /><rect x="9" y="16" width="48" height="5" fill={a} rx="2" /></>;
      case "line-left":
        return <><rect x="0" y="0" width="5" height={H} fill={a} /><rect x="12" y="9" width="48" height="5" fill={a} rx="2" /></>;
      case "line-frame":
        return <><rect x="1" y="1" width={W-2} height={H-2} fill="none" stroke={a} strokeWidth="2" /><rect x="10" y="10" width="44" height="5" fill={a} rx="2" /></>;
      case "line-dash":
        return <><rect x="2" y="2" width={W-4} height={H-4} fill="none" stroke={a} strokeWidth="1.5" strokeDasharray="4,3" rx="3" /><rect x="10" y="10" width="44" height="5" fill={a} rx="2" /></>;
      case "line-under":
        return <><rect x="9" y="9" width="48" height="5" fill={a} rx="2" /><rect x="9" y="17" width="64" height="1.5" fill={a} /></>;
      case "invoice-style":
        return <><rect x="0" y="0" width={W} height="5" fill={a} /><rect x={W-42} y="9" width="34" height="18" fill={a+"20"} stroke={a} strokeWidth="0.5" rx="2" /><rect x="9" y="12" width="38" height="4" fill={a} rx="1" /></>;
      case "corner-tl":
        return <><rect x="0" y="0" width="26" height="26" fill={a} /><rect x="3" y="5" width="18" height="3" fill="rgba(255,255,255,.8)" rx="1" /><rect x="32" y="10" width="48" height="5" fill={a} rx="2" /></>;
      case "corner-tr":
        return <><rect x={W-26} y="0" width="26" height="26" fill={a} /><rect x="9" y="10" width="48" height="5" fill={a} rx="2" /></>;
      case "corner-br":
        return <><rect x={W-26} y={H-26} width="26" height="26" fill={a} /><rect x="9" y="10" width="48" height="5" fill={a} rx="2" /></>;
      case "corner-bl":
        return <><rect x="0" y={H-26} width="26" height="26" fill={a} /><rect x="9" y="10" width="48" height="5" fill={a} rx="2" /></>;
      case "corner-all":
        return <><rect x="0" y="0" width="18" height="18" fill={a} /><rect x={W-18} y="0" width="18" height="18" fill={a} /><rect x="0" y={H-18} width="18" height="18" fill={a} /><rect x={W-18} y={H-18} width="18" height="18" fill={a} /><rect x="24" y="10" width="44" height="5" fill={a} rx="2" /></>;
      case "corner-diag":
        return <><polygon points={`0,0 28,0 0,28`} fill={a} /><polygon points={`${W},${H} ${W-28},${H} ${W},${H-28}`} fill={a} /><rect x="10" y="14" width="44" height="5" fill={a} rx="2" /></>;
      case "geo-triangle":
        return <><polygon points={`0,0 38,0 0,38`} fill={a + "35"} /><rect x="9" y="48" width="48" height="4" fill={a} rx="2" /></>;
      case "geo-circle":
        return <><circle cx={W/2} cy={H/2} r="30" fill={a + "18"} /><rect x="9" y="10" width="48" height="5" fill={a} rx="2" /></>;
      case "geo-hex":
        return <><polygon points={`${W/2},5 ${W/2+17},13 ${W/2+17},29 ${W/2},37 ${W/2-17},29 ${W/2-17},13`} fill={a+"25"} stroke={a} strokeWidth="1" /><rect x="9" y="48" width="48" height="3" fill={a} rx="1" /></>;
      case "geo-wave":
        return <><path d={`M0 ${H-16} Q${W/4} ${H-26} ${W/2} ${H-16} Q${3*W/4} ${H-6} ${W} ${H-16} L${W} ${H} L0 ${H} Z`} fill={a} /><rect x="9" y="9" width="48" height="5" fill={a} rx="2" /></>;
      case "geo-chevron":
        return <><polygon points={`0,0 ${W},0 ${W},22 ${W/2},30 0,22`} fill={a} /><rect x="8" y="6" width="46" height="5" fill="rgba(255,255,255,.8)" rx="2" /></>;
      case "geo-diamond":
        return <><rect x={W/2-13} y={H/2-13} width="26" height="26" fill={a+"25"} stroke={a} strokeWidth="1" transform={`rotate(45 ${W/2} ${H/2})`} /><rect x="9" y="9" width="44" height="5" fill={a} rx="2" /></>;
      default: // classic group
        return <><rect x={W-74} y="7" width="66" height="20" fill={a+"15"} stroke={a} strokeWidth="0.5" rx="2" /><rect x={W-70} y="11" width="28" height="3" fill={a} rx="1" /><rect x={W-70} y="17" width="20" height="2" fill="#d1d5db" rx="1" /><rect x="9" y="34" width="48" height="5" fill={a} rx="2" /></>;
    }
  };

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width={W} height={H} fill="white" />
      {renderShape()}
      {lineRows}
      <rect x="9" y={70} width="28" height="2" fill={a + "60"} rx="1" />
    </svg>
  );
}

// ─── Template card (Step 2 grid) ───────────────────────────────────────────
function TemplateCard({ template, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "#fff",
        borderRadius: 16,
        overflow: "hidden",
        border: `1.5px solid ${hov ? template.color + "66" : "#f1f5f9"}`,
        cursor: "pointer",
        transition: "all .2s",
        transform: hov ? "translateY(-4px)" : "none",
        boxShadow: hov ? `0 14px 36px ${template.color}20` : "0 2px 8px rgba(0,0,0,.04)",
      }}
    >
      {/* Thumbnail */}
      <div style={{ height: 130, background: "#f8fafc", padding: 10 }}>
        <LetterThumb template={template} />
      </div>

      {/* Info */}
      <div style={{ padding: "11px 14px 14px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{template.name}</div>
          <span style={{
            fontSize: 10, fontWeight: 700,
            background: template.color + "18",
            color: template.color,
            padding: "2px 8px", borderRadius: 100,
          }}>
            {template.category}
          </span>
        </div>
        <div style={{ fontSize: 11, color: "#94a3b8", lineHeight: 1.5, marginBottom: 11 }}>{template.description}</div>
        <button
          onClick={(e) => { e.stopPropagation(); onClick(); }}
          style={{
            width: "100%", padding: "8px", borderRadius: 9, border: "none",
            background: template.color, color: "#fff", fontSize: 12, fontWeight: 700,
            cursor: "pointer", fontFamily: "inherit",
            transition: "opacity .15s",
          }}
        >
          Use this template
        </button>
      </div>
    </div>
  );
}

// ─── Type card (Step 1 grid) ───────────────────────────────────────────────
function TypeCard({ type, count, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "#fff",
        borderRadius: 20,
        padding: "22px 20px",
        border: `1.5px solid ${hov ? type.color + "55" : "#f1f5f9"}`,
        cursor: "pointer",
        transition: "all .2s",
        transform: hov ? "translateY(-4px)" : "none",
        boxShadow: hov ? `0 14px 36px ${type.color}18` : "0 2px 8px rgba(0,0,0,.04)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* accent corner */}
      <div style={{
        position: "absolute", top: 0, right: 0,
        width: 68, height: 68,
        borderRadius: "0 20px 0 68px",
        background: type.color + "10",
      }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
        <div style={{
          width: 50, height: 50, borderRadius: 14,
          background: type.bg, display: "flex",
          alignItems: "center", justifyContent: "center",
          fontSize: 22, color: type.color,
        }}>
          {type.icon}
        </div>
        <span style={{
          fontSize: 10, fontWeight: 700,
          color: type.textColor,
          background: type.bg,
          padding: "3px 11px", borderRadius: 100,
          border: `1px solid ${type.color}30`,
        }}>
          {count} templates
        </span>
      </div>

      <div style={{ fontSize: 16, fontWeight: 800, color: "#0f172a", marginBottom: 6 }}>{type.name}</div>
      <div style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.55, marginBottom: 16 }}>{type.description}</div>

      <div style={{
        fontSize: 12, fontWeight: 700, color: type.color,
        display: "flex", alignItems: "center", gap: 4,
        transform: hov ? "translateX(5px)" : "none",
        transition: "transform .18s",
      }}>
        Browse templates →
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────
export default function BusinessLetterPage() {
  const navigate = useNavigate();
  const [user] = useState({ name: "Satya" });
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState("selectType");       // "selectType" | "selectTemplate"
  const [selectedType, setSelectedType] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/login"); return; }
    setTimeout(() => setLoading(false), 480);
  }, [navigate]);

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setStep("selectTemplate");
    setSearchQuery("");
  };

  const handleBack = () => {
    setStep("selectType");
    setSelectedType(null);
    setSearchQuery("");
  };

  const handleTemplateSelect = (template) => {
    navigate(`/editor/letter/${template.id}`);
  };

  // Count templates per type
  const countFor = (type) => {
    if (!type.categories) return LETTER_TEMPLATES.length;
    return LETTER_TEMPLATES.filter(t => type.categories.includes(t.category)).length;
  };

  // Filtered templates for step 2
  const visibleTemplates = (() => {
    let list = selectedType?.categories
      ? LETTER_TEMPLATES.filter(t => selectedType.categories.includes(t.category))
      : LETTER_TEMPLATES;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
      );
    }
    return list;
  })();

  const activeStepIdx = step === "selectType" ? 0 : 1;

  if (loading) return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: 48, height: 48, border: "3px solid #ede9fe", borderTopColor: "#7c3aed", borderRadius: "50%", animation: "spin .85s linear infinite" }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        *{box-sizing:border-box;font-family:'Inter',sans-serif}
        @keyframes spin{to{transform:rotate(360deg)}}
        input:focus,textarea:focus,select:focus{border-color:#7c3aed!important;box-shadow:0 0 0 3px #7c3aed18!important;outline:none}
        .search-inp:focus{border-color:#7c3aed!important;box-shadow:0 0 0 3px #7c3aed18!important;outline:none}
      `}</style>

      <div style={{ background: "#f8fafc", minHeight: "100vh", paddingBottom: 60 }}>

        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <div style={{
          background: "linear-gradient(135deg,#312e81 0%,#4338ca 40%,#7c3aed 70%,#a855f7 100%)",
          padding: "40px 36px 36px",
          marginBottom: 28,
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Background orbs */}
          {[
            { w:280, h:280, top:-90, right:-70 },
            { w:150, h:150, bottom:-50, right:130 },
            { w:100, h:100, top:20,   right:300 },
          ].map((o, i) => (
            <div key={i} style={{
              position:"absolute", width:o.w, height:o.h,
              borderRadius:"50%", background:"rgba(255,255,255,.06)",
              top:o.top, bottom:o.bottom, right:o.right, pointerEvents:"none",
            }} />
          ))}

          <div style={{ position:"relative", zIndex:2, display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:24 }}>
            <div style={{ flex:1 }}>
              {/* Badge */}
              <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(255,255,255,.15)", border:"1px solid rgba(255,255,255,.25)", borderRadius:100, padding:"5px 16px", fontSize:11, fontWeight:700, color:"#fff", letterSpacing:".06em", textTransform:"uppercase", marginBottom:16 }}>
                <span style={{ width:7, height:7, borderRadius:"50%", background:"#86efac", display:"inline-block" }} />
                Letter Studio
              </div>

              <h1 style={{ fontSize:"clamp(26px,3.5vw,42px)", fontWeight:800, color:"#fff", letterSpacing:"-0.8px", lineHeight:1.1, margin:"0 0 12px" }}>
                Business Letter Templates
              </h1>
              <p style={{ fontSize:14, color:"rgba(255,255,255,.8)", margin:"0 0 24px", maxWidth:440, lineHeight:1.65 }}>
                50+ professionally designed templates. Pick a style, fill your details, and export to PDF, Word or Google Docs instantly.
              </p>

              {/* Stat pills */}
              <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
                {["50+ Templates", "PDF & DOCX Export", "Live Preview", "AI-Assisted", "Print Ready"].map(p => (
                  <span key={p} style={{ background:"rgba(255,255,255,.15)", border:"1px solid rgba(255,255,255,.25)", borderRadius:100, padding:"5px 14px", fontSize:11, fontWeight:600, color:"#fff" }}>{p}</span>
                ))}
              </div>
            </div>

            {/* Mini letter stack decoration */}
            <div style={{ display:"flex", gap:10, alignItems:"flex-end", flexShrink:0 }}>
              {[
                { color:"#7c3aed", h:128, rotate:-4 },
                { color:"#22c55e", h:108, rotate:1 },
                { color:"#f97316", h:92,  rotate:5 },
              ].map((d,i) => (
                <div key={i} style={{
                  width:68, height:d.h,
                  background:"rgba(255,255,255,.92)",
                  borderRadius:10, padding:"8px 7px",
                  display:"flex", flexDirection:"column", gap:3,
                  boxShadow:"0 10px 28px rgba(0,0,0,.18)",
                  transform:`rotate(${d.rotate}deg)`, flexShrink:0,
                }}>
                  <div style={{ height:5, borderRadius:2, background:d.color, width:"60%" }} />
                  <div style={{ height:2, borderRadius:2, background:"#e2e8f0", width:"42%" }} />
                  <div style={{ height:1, background:"#f1f5f9", margin:"2px 0" }} />
                  {[85,70,80,65,75,60].map((w,j) => (
                    <div key={j} style={{ height:2.5, borderRadius:2, background:"#e2e8f0", width:`${w}%` }} />
                  ))}
                  <div style={{ height:2.5, borderRadius:2, background:d.color+"60", width:"36%", marginTop:"auto" }} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ padding:"0 28px" }}>

          {/* ── STEP PROGRESS ───────────────────────────────────────────── */}
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:28, flexWrap:"wrap" }}>
            {STEPS.map((s,i) => (
              <div key={s} style={{ display:"flex", alignItems:"center", gap:8 }}>
                <div style={{
                  display:"flex", alignItems:"center", gap:8,
                  background: i === activeStepIdx ? "#7c3aed" : i < activeStepIdx ? "#f0fdf4" : "#fff",
                  border:`1.5px solid ${i === activeStepIdx ? "#7c3aed" : i < activeStepIdx ? "#22c55e" : "#e2e8f0"}`,
                  borderRadius:100, padding:"6px 18px",
                  fontSize:12, fontWeight:600,
                  color: i === activeStepIdx ? "#fff" : i < activeStepIdx ? "#15803d" : "#94a3b8",
                }}>
                  <div style={{
                    width:20, height:20, borderRadius:"50%",
                    background: i === activeStepIdx ? "rgba(255,255,255,.25)" : i < activeStepIdx ? "#22c55e" : "#f1f5f9",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:10, fontWeight:800,
                    color: i < activeStepIdx ? "#fff" : i === activeStepIdx ? "#fff" : "#94a3b8",
                  }}>
                    {i < activeStepIdx ? "✓" : i + 1}
                  </div>
                  {s}
                </div>
                {i < STEPS.length - 1 && <div style={{ width:26, height:1.5, background:"#e2e8f0" }} />}
              </div>
            ))}
          </div>

          {/* ── MAIN LAYOUT ─────────────────────────────────────────────── */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 290px", gap:22, alignItems:"start" }}>

            {/* LEFT CONTENT */}
            <div>

              {/* Section header */}
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20, flexWrap:"wrap", gap:12 }}>
                <div>
                  <div style={{ fontSize:20, fontWeight:800, color:"#0f172a", letterSpacing:"-0.4px" }}>
                    {step === "selectType" ? "Choose a letter type" : `${selectedType?.name} — ${visibleTemplates.length} templates`}
                  </div>
                  <div style={{ fontSize:12, color:"#94a3b8", marginTop:3 }}>
                    {step === "selectType"
                      ? "Select the category that best fits your need"
                      : "Click any template to open the editor"}
                  </div>
                </div>

                <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                  {step === "selectTemplate" && (
                    <button onClick={handleBack} style={{
                      padding:"8px 20px", borderRadius:10, border:"1.5px solid #e2e8f0",
                      background:"#fff", color:"#374151", fontWeight:700, fontSize:12,
                      cursor:"pointer", fontFamily:"inherit",
                    }}>
                      ← Back
                    </button>
                  )}
                  <button onClick={() => navigate("/dashboard")} style={{
                    padding:"8px 20px", borderRadius:10, border:"none",
                    background:"#7c3aed", color:"#fff", fontWeight:700, fontSize:12,
                    cursor:"pointer", fontFamily:"inherit",
                  }}>
                    Dashboard
                  </button>
                </div>
              </div>

              {/* STEP 1 — Type cards */}
              {step === "selectType" && (
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))", gap:16 }}>
                  {TEMPLATE_TYPES.map((type, i) => (
                    <TypeCard
                      key={i}
                      type={type}
                      count={countFor(type)}
                      onClick={() => handleTypeSelect(type)}
                    />
                  ))}
                </div>
              )}

              {/* STEP 2 — Template cards */}
              {step === "selectTemplate" && (
                <>
                  {/* Search */}
                  <div style={{ marginBottom:16 }}>
                    <input
                      className="search-inp"
                      type="text"
                      placeholder="Search templates…"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      style={{
                        width:"100%", padding:"10px 16px", borderRadius:12,
                        border:"1.5px solid #e2e8f0", fontSize:13, fontFamily:"inherit",
                        color:"#0f172a", background:"#fff",
                        transition:"border-color .15s",
                      }}
                    />
                  </div>

                  {visibleTemplates.length === 0 ? (
                    <div style={{ textAlign:"center", padding:"60px 20px", color:"#94a3b8", fontSize:14 }}>
                      No templates match "{searchQuery}"
                    </div>
                  ) : (
                    <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:16 }}>
                      {visibleTemplates.map(t => (
                        <TemplateCard
                          key={t.id}
                          template={t}
                          onClick={() => handleTemplateSelect(t)}
                        />
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* RIGHT SIDEBAR */}
            <aside style={{ display:"flex", flexDirection:"column", gap:14, position:"sticky", top:16 }}>

              {/* Essentials */}
              <div style={{ background:"#fff", borderRadius:20, padding:"18px 16px", border:"1.5px solid #f1f5f9" }}>
                <div style={{ fontSize:14, fontWeight:700, color:"#0f172a", marginBottom:10 }}>What you get</div>
                <div style={{ fontSize:12, color:"#94a3b8", marginBottom:14, lineHeight:1.6 }}>
                  Everything you need for professional business letters.
                </div>
                {[
                  "50+ unique layout designs",
                  "Live letter preview",
                  "Custom color & font size",
                  "A4, Letter and Legal sizes",
                  "PDF, DOCX & Google Docs export",
                  "AI-assisted body writing",
                  "Print-ready formatting",
                ].map(f => (
                  <div key={f} style={{ display:"flex", alignItems:"center", gap:10, padding:"7px 0", borderBottom:"1px solid #f8fafc", fontSize:12, color:"#374151" }}>
                    <div style={{ width:7, height:7, borderRadius:"50%", background:"#a78bfa", flexShrink:0 }} />
                    {f}
                  </div>
                ))}
              </div>

              {/* AI promo */}
              <div style={{ background:"linear-gradient(135deg,#4338ca,#7c3aed)", borderRadius:20, padding:"18px 16px", color:"#fff" }}>
                <div style={{ fontSize:24, marginBottom:8 }}>🤖</div>
                <div style={{ fontSize:14, fontWeight:700, marginBottom:5 }}>AI Letter Assistant</div>
                <div style={{ fontSize:12, opacity:.8, lineHeight:1.6, marginBottom:14 }}>
                  Let AI draft, rewrite and polish your business letter in seconds — just describe what you need.
                </div>
                <button
                  onClick={() => navigate("/editor/letter/ai-helper")}
                  style={{ width:"100%", padding:"10px", borderRadius:11, border:"1.5px solid rgba(255,255,255,.3)", background:"rgba(255,255,255,.18)", color:"#fff", fontWeight:700, fontSize:12, cursor:"pointer", fontFamily:"inherit" }}>
                  Open AI assistant →
                </button>
              </div>

              {/* How it works */}
              <div style={{ background:"#fff", borderRadius:20, padding:"16px", border:"1.5px solid #f1f5f9" }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
                  <div style={{ width:8, height:8, borderRadius:"50%", background:"#0ea5e9" }} />
                  <div style={{ fontSize:13, fontWeight:700, color:"#0f172a" }}>How it works</div>
                </div>
                {[
                  "Select a letter type",
                  "Choose your template",
                  "Fill in your details",
                  "Customize color & size",
                  "Download or print",
                ].map((s, i) => (
                  <div key={s} style={{ display:"flex", alignItems:"center", gap:10, padding:"7px 0", borderBottom: i < 4 ? "1px solid #f8fafc" : "none", fontSize:12, color:"#374151" }}>
                    <div style={{ width:22, height:22, borderRadius:"50%", background:"#ede9fe", display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:800, color:"#7c3aed", flexShrink:0 }}>
                      {i + 1}
                    </div>
                    {s}
                  </div>
                ))}
              </div>

              {/* Pro tip */}
              <div style={{ background:"#fffbeb", borderRadius:20, padding:"14px 16px", border:"1.5px solid #fef3c7" }}>
                <div style={{ fontSize:12, fontWeight:700, color:"#92400e", marginBottom:5 }}>💡 Pro tip</div>
                <div style={{ fontSize:12, color:"#78350f", lineHeight:1.6 }}>
                  Use the Cover Letter template when applying for jobs — it follows the exact format recruiters expect.
                </div>
              </div>

            </aside>
          </div>

          {/* ── FEATURE STRIP ───────────────────────────────────────────── */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:12, marginTop:30 }}>
            {[
              { icon:"📄", title:"Professional format",  desc:"Industry-standard layouts accepted everywhere." },
              { icon:"⚡", title:"Quick setup",           desc:"Fill in details and generate in under 2 minutes." },
              { icon:"📥", title:"Multiple formats",      desc:"Export to PDF, DOCX or open in Google Docs." },
              { icon:"✅", title:"Business etiquette",   desc:"Built-in formatting that follows business standards." },
            ].map(f => (
              <div key={f.title} style={{ background:"#fff", borderRadius:18, padding:"18px 16px", border:"1.5px solid #f1f5f9" }}>
                <div style={{ fontSize:22, marginBottom:8 }}>{f.icon}</div>
                <div style={{ fontSize:13, fontWeight:700, color:"#0f172a", marginBottom:5 }}>{f.title}</div>
                <div style={{ fontSize:12, color:"#94a3b8", lineHeight:1.55 }}>{f.desc}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}
