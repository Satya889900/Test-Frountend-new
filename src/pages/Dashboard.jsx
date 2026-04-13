// Dashboard.jsx — DocStudio Premium Dashboard
// Drop-in replacement. Requires: react-router-dom, Layout component.
// No extra npm packages needed.

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// ─── Data ─────────────────────────────────────────────────────────────────────

const documentTypes = [
  { name: "Resume / CV",      icon: "📄", color: "#6366f1", glow: "#4f46e5", tag: "Most Used",  route: "/resume-builder",       description: "Professional resume & CV templates"    },
  { name: "Business Letter",  icon: "✉️",  color: "#ec4899", glow: "#db2777", tag: "Popular",    route: "/letter-builder",        description: "Formal business correspondence"         },
  { name: "Invoice",          icon: "🧾", color: "#10b981", glow: "#059669", tag: "Quick",      route: "/invoice-builder",       description: "Professional invoice templates"          },
  { name: "Contract",         icon: "📋", color: "#f59e0b", glow: "#d97706", tag: "Legal",      route: "/contract-builder",      description: "Legal contract templates"                },
  { name: "Presentation",     icon: "📊", color: "#3b82f6", glow: "#2563eb", tag: "Pro",        route: "/presentation-builder",  description: "Slide presentation templates"            },
  { name: "Report",           icon: "📑", color: "#f97316", glow: "#ea580c", tag: "Business",   route: "/report-builder",        description: "Business report templates"               },
  { name: "Newsletter",       icon: "📰", color: "#ef4444", glow: "#dc2626", tag: "Marketing",  route: "/newsletter-builder",    description: "Email newsletter templates"              },
  { name: "Brochure",         icon: "🗂️", color: "#8b5cf6", glow: "#7c3aed", tag: "Design",     route: "/brochure-builder",      description: "Marketing brochure templates"            },
  { name: "Certificate",      icon: "🏅", color: "#06b6d4", glow: "#0891b2", tag: "Award",      route: "/certificate-builder",   description: "Award certificate templates"             },
  { name: "Agenda",           icon: "📅", color: "#84cc16", glow: "#65a30d", tag: "Meeting",    route: "/agenda-builder",        description: "Meeting agenda templates"                },
  { name: "Memo",             icon: "📝", color: "#fb923c", glow: "#f97316", tag: "Internal",   route: "/memo-builder",          description: "Internal memo templates"                 },
  { name: "Proposal",         icon: "💼", color: "#6366f1", glow: "#4f46e5", tag: "Sales",      route: "/proposal-builder",      description: "Business proposal templates"             },
  { name: "Flyer",            icon: "📢", color: "#f472b6", glow: "#ec4899", tag: "Event",      route: "/flyer-builder",         description: "Promotional flyer templates"             },
  { name: "Card",             icon: "🪪", color: "#14b8a6", glow: "#0f766e", tag: "Creative",   route: "/card-builder",          description: "Greeting & business card templates"      },
  { name: "Form",             icon: "📃", color: "#c026d3", glow: "#a21caf", tag: "Custom",     route: "/form-builder",          description: "Custom form templates"                   },
  { name: "Calendar",         icon: "🗓️", color: "#eab308", glow: "#ca8a04", tag: "Planning",   route: "/calendar-builder",      description: "Calendar templates"                      },
  { name: "Planner",          icon: "🗒️", color: "#4ade80", glow: "#16a34a", tag: "Daily",      route: "/planner-builder",       description: "Personal planner templates"              },
  { name: "Budget",           icon: "💰", color: "#22c55e", glow: "#15803d", tag: "Finance",    route: "/budget-builder",        description: "Budget planning templates"               },
  { name: "Schedule",         icon: "⏱️", color: "#f87171", glow: "#ef4444", tag: "Time",       route: "/schedule-builder",      description: "Schedule templates"                      },
  { name: "Checklist",        icon: "✅", color: "#60a5fa", glow: "#3b82f6", tag: "Tasks",      route: "/checklist-builder",     description: "Task checklist templates"                },
  { name: "Worksheet",        icon: "📚", color: "#a78bfa", glow: "#7c3aed", tag: "Education",  route: "/worksheet-builder",     description: "Educational worksheet templates"          },
  { name: "Chart",            icon: "📈", color: "#22d3ee", glow: "#06b6d4", tag: "Data",       route: "/chart-builder",         description: "Data visualization templates"            },
];

const STATS = [
  { label: "Templates",  value: "1,284", raw: 1284, sub: "+12 this week", icon: "◈", accent: "#6366f1", bg: "#eef2ff" },
  { label: "Downloaded", value: "892",   raw: 892,  sub: "+34 today",     icon: "↓", accent: "#10b981", bg: "#ecfdf5" },
  { label: "Time Saved", value: "156h",  raw: 156,  sub: "~7 days saved", icon: "◎", accent: "#f59e0b", bg: "#fffbeb" },
  { label: "Users",      value: "2,450", raw: 2450, sub: "Growing daily", icon: "◉", accent: "#ec4899", bg: "#fdf2f8" },
];

const RECENT = [
  { name: "Senior Dev Resume",   type: "Resume / CV",     time: "2 hours ago",  icon: "📄", color: "#6366f1", status: "Draft"     },
  { name: "Q4 Sales Proposal",   type: "Proposal",        time: "Yesterday",    icon: "💼", color: "#10b981", status: "Completed" },
  { name: "Client Invoice #114", type: "Invoice",         time: "2 days ago",   icon: "🧾", color: "#f59e0b", status: "Sent"      },
  { name: "Team Meeting Agenda", type: "Agenda",          time: "3 days ago",   icon: "📅", color: "#84cc16", status: "Completed" },
  { name: "Product Brochure",    type: "Brochure",        time: "1 week ago",   icon: "🗂️", color: "#8b5cf6", status: "Draft"     },
];

const QUICK_ACTIONS = [
  { label: "New Resume",   icon: "📄", route: "/resume-builder",   color: "#6366f1", bg: "#eef2ff" },
  { label: "New Invoice",  icon: "🧾", route: "/invoice-builder",  color: "#10b981", bg: "#ecfdf5" },
  { label: "New Proposal", icon: "💼", route: "/proposal-builder", color: "#f59e0b", bg: "#fffbeb" },
  { label: "New Letter",   icon: "✉️",  route: "/letter-builder",   color: "#ec4899", bg: "#fdf2f8" },
];

const TABS = ["All", "Resume", "Business", "Legal", "Creative", "Planning"];
const TAB_FILTER = {
  All:      () => true,
  Resume:   (d) => d.name === "Resume / CV",
  Business: (d) => ["Invoice","Contract","Report","Proposal","Business Letter"].includes(d.name),
  Legal:    (d) => d.name === "Contract",
  Creative: (d) => ["Brochure","Flyer","Card","Newsletter","Certificate"].includes(d.name),
  Planning: (d) => ["Agenda","Checklist","Calendar","Planner","Schedule","Budget"].includes(d.name),
};

// ─── Animated counter ─────────────────────────────────────────────────────────
function AnimCount({ target, suffix = "" }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const dur = 1500, t0 = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - t0) / dur, 1);
      setV(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target]);
  return <>{v.toLocaleString()}{suffix}</>;
}



// ─── Top bar ──────────────────────────────────────────────────────────────────
function TopBar({ search, setSearch, navigate, time }) {
  return (
    <header style={{ background: "#fff", borderBottom: "1px solid #f1f5f9", padding: "12px 24px", display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", position: "sticky", top: 0, zIndex: 10 }}>
      <div style={{ position: "relative", flex: 1, maxWidth: 400 }}>
        <span style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", fontSize: 14, opacity: 0.35 }}>🔍</span>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search templates..." style={{ width: "100%", padding: "9px 14px 9px 38px", border: "1.5px solid #e2e8f0", borderRadius: 11, fontSize: 13, outline: "none", background: "#f8fafc", color: "#0f172a", fontFamily: "inherit" }} />
      </div>

      <div style={{ marginLeft: "auto", display: "flex", gap: 10, alignItems: "center" }}>
        {/* Notification bell */}
        <div style={{ width: 36, height: 36, borderRadius: 10, background: "#f8fafc", border: "1.5px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 16, position: "relative" }}>
          🔔
          <div style={{ position: "absolute", top: 6, right: 7, width: 7, height: 7, borderRadius: "50%", background: "#ef4444", border: "2px solid #fff" }} />
        </div>

        {/* Clock */}
        <div style={{ fontSize: 12, color: "#94a3b8", fontVariantNumeric: "tabular-nums", background: "#f8fafc", padding: "7px 12px", borderRadius: 10, border: "1.5px solid #f1f5f9" }}>
          {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>

        <button onClick={() => navigate("/resume-builder")} style={{ padding: "9px 18px", borderRadius: 11, border: "none", background: "linear-gradient(135deg,#6366f1,#a855f7)", color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
          + New
        </button>
      </div>
    </header>
  );
}

// ─── Hero banner ──────────────────────────────────────────────────────────────
function HeroBanner({ user, navigate, greeting }) {
  const [hov, setHov] = useState(false);
  return (
    <div style={{ borderRadius: 22, overflow: "hidden", position: "relative", background: "linear-gradient(135deg,#4338ca 0%,#7c3aed 55%,#a855f7 100%)", padding: "34px 36px", marginBottom: 22, color: "#fff" }}>
      {/* Decorative orbs */}
      <div style={{ position: "absolute", width: 260, height: 260, borderRadius: "50%", background: "rgba(255,255,255,0.07)", top: -80, right: -60, pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: 150, height: 150, borderRadius: "50%", background: "rgba(255,255,255,0.06)", bottom: -40, right: 100, pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.08)", top: 20, right: 260, pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 2, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 100, padding: "5px 14px", fontSize: 12, fontWeight: 600, marginBottom: 14 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
            Good {greeting}, {user.name}
          </div>
          <h1 style={{ fontSize: "clamp(24px,3vw,38px)", fontWeight: 800, letterSpacing: "-1px", lineHeight: 1.1, margin: "0 0 10px" }}>
            Create stunning<br />documents today
          </h1>
          <p style={{ fontSize: 14, opacity: 0.8, margin: "0 0 22px", lineHeight: 1.65, maxWidth: 380 }}>
            1,284+ professional templates ready to customise and download in seconds.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} onClick={() => navigate("/resume-builder")}
              style={{ padding: "11px 22px", borderRadius: 11, border: "none", background: "#fff", color: "#4f46e5", fontWeight: 700, fontSize: 13, cursor: "pointer", transform: hov ? "scale(1.03)" : "scale(1)", transition: "transform 0.18s", fontFamily: "inherit" }}>
              Browse Templates →
            </button>
            <button onClick={() => navigate("/resume-builder")}
              style={{ padding: "11px 22px", borderRadius: 11, border: "1.5px solid rgba(255,255,255,0.35)", background: "transparent", color: "#fff", fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
              Create Resume
            </button>
          </div>
        </div>

        {/* Mini doc stack */}
        <div style={{ display: "flex", gap: 8, alignItems: "flex-end", flexShrink: 0 }}>
          {[
            { h: 130, label: "Resume",  rotate: -3, opacity: 1   },
            { h: 110, label: "Invoice", rotate: 1,  opacity: 0.88 },
            { h: 95,  label: "Letter",  rotate: 4,  opacity: 0.75 },
          ].map((d, i) => (
            <div key={i} style={{ width: 68, height: d.h, background: `rgba(255,255,255,${d.opacity})`, borderRadius: 10, padding: "8px 7px", display: "flex", flexDirection: "column", gap: 4, boxShadow: "0 8px 24px rgba(0,0,0,0.18)", transform: `rotate(${d.rotate}deg)`, flexShrink: 0 }}>
              <div style={{ height: 5, borderRadius: 2, background: "#6366f1", width: "65%" }} />
              {[90, 75, 80, 65, 85].map((w, j) => (
                <div key={j} style={{ height: 3, borderRadius: 2, background: "#e2e8f0", width: `${w}%` }} />
              ))}
              <div style={{ height: 18, borderRadius: 5, background: "#eef2ff", marginTop: 2 }} />
              <div style={{ height: 3, borderRadius: 2, background: "#e2e8f0", width: "80%" }} />
              <div style={{ fontSize: 7, color: "#6366f1", fontWeight: 700, marginTop: "auto" }}>{d.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Stat card ────────────────────────────────────────────────────────────────
function StatCard({ stat }) {
  const [hov, setHov] = useState(false);
  const isHours = stat.value.includes("h");
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: "#fff", borderRadius: 18, padding: "20px 18px", border: `1.5px solid ${hov ? stat.accent + "44" : "#f1f5f9"}`, transition: "all 0.22s", transform: hov ? "translateY(-3px)" : "none", boxShadow: hov ? `0 12px 32px ${stat.accent}18` : "0 2px 8px rgba(0,0,0,0.04)", cursor: "default" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: stat.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{stat.icon}</div>
        <span style={{ fontSize: 10, fontWeight: 700, color: stat.accent, background: stat.bg, padding: "2px 9px", borderRadius: 100 }}>{stat.sub}</span>
      </div>
      <div style={{ fontSize: 30, fontWeight: 800, color: "#0f172a", letterSpacing: "-1.2px", lineHeight: 1 }}>
        <AnimCount target={stat.raw} suffix={isHours ? "h" : ""} />
      </div>
      <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600, marginTop: 5 }}>{stat.label}</div>
    </div>
  );
}

// ─── Quick action ─────────────────────────────────────────────────────────────
function QuickAction({ action, navigate }) {
  const [hov, setHov] = useState(false);
  return (
    <div onClick={() => navigate(action.route)} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: hov ? action.color : "#fff", border: `1.5px solid ${hov ? action.color : "#f1f5f9"}`, borderRadius: 13, padding: "12px 14px", display: "flex", alignItems: "center", gap: 10, cursor: "pointer", transition: "all 0.18s", transform: hov ? "translateY(-2px)" : "none", boxShadow: hov ? `0 8px 22px ${action.color}2e` : "none" }}>
      <div style={{ width: 32, height: 32, borderRadius: 9, background: hov ? "rgba(255,255,255,0.2)" : action.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>{action.icon}</div>
      <span style={{ fontSize: 13, fontWeight: 600, color: hov ? "#fff" : "#0f172a" }}>{action.label}</span>
    </div>
  );
}

// ─── Doc card ─────────────────────────────────────────────────────────────────
function DocCard({ doc, navigate }) {
  const [hov, setHov] = useState(false);
  return (
    <div onClick={() => navigate(doc.route)} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: "#fff", borderRadius: 16, padding: "18px 16px", border: `1.5px solid ${hov ? doc.color + "44" : "#f1f5f9"}`, cursor: "pointer", transition: "all 0.2s", transform: hov ? "translateY(-4px)" : "none", boxShadow: hov ? `0 12px 32px ${doc.color}1a` : "0 2px 8px rgba(0,0,0,0.04)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, right: 0, width: 55, height: 55, borderRadius: "0 16px 0 55px", background: doc.color + "0d" }} />
      <span style={{ fontSize: 9, fontWeight: 700, color: doc.color, background: doc.color + "14", padding: "3px 9px", borderRadius: 100, letterSpacing: "0.06em", textTransform: "uppercase" }}>{doc.tag}</span>
      <div style={{ fontSize: 30, margin: "12px 0 8px", lineHeight: 1 }}>{doc.icon}</div>
      <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", marginBottom: 5, letterSpacing: "-0.3px" }}>{doc.name}</div>
      <div style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.5, marginBottom: 13 }}>{doc.description}</div>
      <div style={{ fontSize: 12, fontWeight: 700, color: doc.color, display: "flex", alignItems: "center", gap: 3, transform: hov ? "translateX(4px)" : "none", transition: "transform 0.18s" }}>
        Open builder →
      </div>
    </div>
  );
}

// ─── Recent row ───────────────────────────────────────────────────────────────
function RecentRow({ doc }) {
  const sc = { Draft: { bg: "#fef9c3", c: "#854d0e" }, Completed: { bg: "#dcfce7", c: "#166534" }, Sent: { bg: "#dbeafe", c: "#1e40af" } }[doc.status] || {};
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "1px solid #f8fafc" }}>
      <div style={{ width: 36, height: 36, borderRadius: 10, background: doc.color + "14", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{doc.icon}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#0f172a", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{doc.name}</div>
        <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>{doc.type} · {doc.time}</div>
      </div>
      <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 9px", borderRadius: 100, background: sc.bg, color: sc.c, flexShrink: 0 }}>{doc.status}</span>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function Dashboard() {
  const navigate  = useNavigate();
  const [user]    = useState({ name: "Satya" });
  const [loading, setLoading]  = useState(true);
  const [search,  setSearch]   = useState("");
  const [time,    setTime]     = useState(new Date());
  const [tab,     setTab]      = useState("All");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/login"); return; }
    setTimeout(() => setLoading(false), 600);
    const ti = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(ti);
  }, [navigate]);

  const hour     = time.getHours();
  const greeting = hour < 12 ? "Morning" : hour < 17 ? "Afternoon" : "Evening";

  const filtered = documentTypes.filter((d) => {
    const ms = !search || d.name.toLowerCase().includes(search.toLowerCase()) || d.tag.toLowerCase().includes(search.toLowerCase());
    return ms && TAB_FILTER[tab](d);
  });

  if (loading) return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: 48, height: 48, margin: "0 auto 18px", border: "3px solid #e2e8f0", borderTopColor: "#6366f1", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
        <div style={{ color: "#94a3b8", fontSize: 14, fontFamily: "Inter, sans-serif" }}>Preparing your workspace…</div>
      </div>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", fontFamily: "'Inter', sans-serif", background: "#f8fafc" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        *{box-sizing:border-box}
        body{font-family:'Inter',sans-serif;margin:0}
        @keyframes spin{to{transform:rotate(360deg)}}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-thumb{background:#e2e8f0;border-radius:10px}
        ::-webkit-scrollbar-track{background:transparent}
      `}</style>

      {/* Top Bar */}
      <TopBar search={search} setSearch={setSearch} navigate={navigate} time={time} />

      {/* Scrollable main */}
      <main style={{ flex: 1, overflowY: "auto", padding: "22px 24px 56px" }}>

            {/* Hero */}
            <HeroBanner user={user} navigate={navigate} greeting={greeting} />

            {/* Quick actions */}
            <section style={{ marginBottom: 22 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#cbd5e1", textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 10 }}>Quick create</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(155px, 1fr))", gap: 10 }}>
                {QUICK_ACTIONS.map((a) => <QuickAction key={a.label} action={a} navigate={navigate} />)}
              </div>
            </section>

            {/* Stats */}
            <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 12, marginBottom: 22 }}>
              {STATS.map((s) => <StatCard key={s.label} stat={s} />)}
            </section>

            {/* Body grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 292px", gap: 18, alignItems: "start" }}>

              {/* Left — templates */}
              <section>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 10 }}>
                  <div>
                    <div style={{ fontSize: 17, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.5px" }}>
                      {search ? `Results for "${search}"` : "All Document Types"}
                    </div>
                    <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 3 }}>{filtered.length} of {documentTypes.length} templates</div>
                  </div>
                  {search && <button onClick={() => setSearch("")} style={{ fontSize: 12, color: "#6366f1", fontWeight: 600, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}>Clear</button>}
                </div>

                {/* Tabs */}
                <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
                  {TABS.map((t) => (
                    <button key={t} onClick={() => setTab(t)}
                      style={{ padding: "6px 15px", borderRadius: 100, fontSize: 12, fontWeight: 600, cursor: "pointer", border: "1.5px solid", fontFamily: "inherit", transition: "all 0.14s", borderColor: tab === t ? "#6366f1" : "#e2e8f0", background: tab === t ? "#6366f1" : "#fff", color: tab === t ? "#fff" : "#64748b" }}
                    >{t}</button>
                  ))}
                </div>

                {filtered.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "56px 20px", background: "#fff", borderRadius: 16, color: "#94a3b8" }}>
                    <div style={{ fontSize: 36, marginBottom: 12 }}>🔍</div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>No templates found for "{search}"</div>
                  </div>
                ) : (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(182px, 1fr))", gap: 12 }}>
                    {filtered.map((d) => <DocCard key={d.name} doc={d} navigate={navigate} />)}
                  </div>
                )}
              </section>

              {/* Right sidebar */}
              <aside style={{ display: "flex", flexDirection: "column", gap: 14, position: "sticky", top: 74 }}>

                {/* Recent docs */}
                <div style={{ background: "#fff", borderRadius: 18, padding: "18px 16px", border: "1.5px solid #f1f5f9" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>Recent documents</span>
                    <span style={{ fontSize: 11, color: "#6366f1", fontWeight: 600, cursor: "pointer" }}>View all</span>
                  </div>
                  {RECENT.map((d) => <RecentRow key={d.name} doc={d} />)}
                </div>

                {/* AI promo */}
                <div style={{ background: "linear-gradient(135deg,#4338ca,#7c3aed)", borderRadius: 18, padding: "18px 16px", color: "#fff" }}>
                  <div style={{ fontSize: 24, marginBottom: 8 }}>🤖</div>
                  <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 5 }}>AI Assistant</div>
                  <div style={{ fontSize: 12, opacity: 0.8, lineHeight: 1.55, marginBottom: 14 }}>
                    Let AI write, rewrite, and polish your documents instantly.
                  </div>
                  <button onClick={() => navigate("/ai-assistant")}
                    style={{ width: "100%", padding: "9px", borderRadius: 10, border: "1.5px solid rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.15)", color: "#fff", fontWeight: 700, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>
                    Try AI Assistant →
                  </button>
                </div>

                {/* Pro tip */}
                <div style={{ background: "#fffbeb", borderRadius: 18, padding: "16px", border: "1.5px solid #fef3c7" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#92400e", marginBottom: 6 }}>💡 Pro tip</div>
                  <div style={{ fontSize: 12, color: "#78350f", lineHeight: 1.55 }}>
                    Use the ATS-friendly resume template to pass automated recruiter filters. Add keywords from the job description for best results.
                  </div>
                </div>

                {/* Popular this week */}
                <div style={{ background: "#fff", borderRadius: 18, padding: "16px", border: "1.5px solid #f1f5f9" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a", marginBottom: 12 }}>🔥 Popular this week</div>
                  {[
                    { name: "Minimal ATS Resume",    count: "2.3k downloads", color: "#6366f1" },
                    { name: "Corporate Proposal",    count: "1.8k downloads", color: "#10b981" },
                    { name: "Modern Invoice",        count: "1.2k downloads", color: "#f59e0b" },
                  ].map((p) => (
                    <div key={p.name} onClick={() => navigate("/resume-builder")}
                      style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "1px solid #f8fafc", cursor: "pointer" }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: p.color, flexShrink: 0 }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 12, fontWeight: 600, color: "#0f172a" }}>{p.name}</div>
                        <div style={{ fontSize: 10, color: "#94a3b8" }}>{p.count}</div>
                      </div>
                      <span style={{ fontSize: 11, color: p.color }}>→</span>
                    </div>
                  ))}
                </div>
              </aside>
            </div>
        </main>
    </div>
  );
}