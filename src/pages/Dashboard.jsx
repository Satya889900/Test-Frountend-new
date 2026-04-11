import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const documentTypes = [
  { name: "Resume / CV", icon: "◈", color: "#6366f1", glow: "#4f46e5", tag: "Most Used", route: "/resume-builder", description: "Professional resume templates", preview: "Modern, ATS-friendly resume design" },
  { name: "Business Letter", icon: "✉", color: "#ec4899", glow: "#db2777", tag: "Popular", route: "/letter-builder", description: "Formal business correspondence", preview: "Clean business letter layout" },
  { name: "Invoice", icon: "◎", color: "#10b981", glow: "#059669", tag: "Quick", route: "/invoice-builder", description: "Professional invoice templates", preview: "Clear invoice design" },
  { name: "Contract", icon: "⊞", color: "#f59e0b", glow: "#d97706", tag: "Legal", route: "/contract-builder", description: "Legal contract templates", preview: "Structured contract layout" },
  { name: "Presentation", icon: "▣", color: "#3b82f6", glow: "#2563eb", tag: "Pro", route: "/presentation-builder", description: "Slide presentation templates", preview: "Stylish presentation design" },
  { name: "Report", icon: "≡", color: "#f97316", glow: "#ea580c", tag: "Business", route: "/report-builder", description: "Business report templates", preview: "Professional report layout" },
  { name: "Newsletter", icon: "◉", color: "#ef4444", glow: "#dc2626", tag: "Marketing", route: "/newsletter-builder", description: "Email newsletter templates", preview: "Readable newsletter style" },
  { name: "Brochure", icon: "⊡", color: "#8b5cf6", glow: "#7c3aed", tag: "Design", route: "/brochure-builder", description: "Marketing brochure templates", preview: "Eye-catching brochure design" },
  { name: "Certificate", icon: "✦", color: "#06b6d4", glow: "#0891b2", tag: "Award", route: "/certificate-builder", description: "Award certificate templates", preview: "Elegant certificate style" },
  { name: "Agenda", icon: "◆", color: "#84cc16", glow: "#65a30d", tag: "Meeting", route: "/agenda-builder", description: "Meeting agenda templates", preview: "Organized agenda layout" },
  { name: "Memo", icon: "⊠", color: "#fb923c", glow: "#f97316", tag: "Internal", route: "/memo-builder", description: "Internal memo templates", preview: "Simple memo format" },
  { name: "Proposal", icon: "⊕", color: "#6366f1", glow: "#4f46e5", tag: "Sales", route: "/proposal-builder", description: "Business proposal templates", preview: "Focused proposal design" },
  { name: "Flyer", icon: "◇", color: "#f472b6", glow: "#ec4899", tag: "Event", route: "/flyer-builder", description: "Promotional flyer templates", preview: "Bold flyer layout" },
  { name: "Card", icon: "▪", color: "#14b8a6", glow: "#0f766e", tag: "Creative", route: "/card-builder", description: "Greeting/business card templates", preview: "Modern card design" },
  { name: "Form", icon: "⊟", color: "#c026d3", glow: "#a21caf", tag: "Custom", route: "/form-builder", description: "Custom form templates", preview: "Clean form layout" },
  { name: "Calendar", icon: "◈", color: "#eab308", glow: "#ca8a04", tag: "Planning", route: "/calendar-builder", description: "Calendar templates", preview: "Neat calendar design" },
  { name: "Planner", icon: "◉", color: "#4ade80", glow: "#16a34a", tag: "Daily", route: "/planner-builder", description: "Personal planner templates", preview: "Organized planner layout" },
  { name: "Budget", icon: "◎", color: "#22c55e", glow: "#15803d", tag: "Finance", route: "/budget-builder", description: "Budget planning templates", preview: "Clear budget planner" },
  { name: "Schedule", icon: "⊞", color: "#f87171", glow: "#ef4444", tag: "Time", route: "/schedule-builder", description: "Schedule templates", preview: "Easy schedule layout" },
  { name: "Checklist", icon: "✓", color: "#60a5fa", glow: "#3b82f6", tag: "Tasks", route: "/checklist-builder", description: "Task checklist templates", preview: "Minimal checklist design" },
  { name: "Worksheet", icon: "▣", color: "#a78bfa", glow: "#7c3aed", tag: "Education", route: "/worksheet-builder", description: "Educational worksheet templates", preview: "Clean worksheet style" },
  { name: "Chart", icon: "≡", color: "#22d3ee", glow: "#06b6d4", tag: "Data", route: "/chart-builder", description: "Data visualization templates", preview: "Visual chart layout" },
];

const stats = [
  { label: "Templates", value: "1,284", sub: "+12 this week", icon: "◈", accent: "#6366f1" },
  { label: "Downloaded", value: "892", sub: "+34 today", icon: "↓", accent: "#10b981" },
  { label: "Time Saved", value: "156h", sub: "~7 days saved", icon: "◎", accent: "#f59e0b" },
  { label: "Users", value: "2,450", sub: "Growing daily", icon: "◉", accent: "#ec4899" },
];

function DocCard({ doc, index, navigate }) {
  const [hover, setHover] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const ref = useRef();

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14;
    setTilt({ x, y });
  };

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setTilt({ x: 0, y: 0 }); }}
      onMouseMove={handleMouseMove}
      onClick={() => navigate(doc.route)}
      style={{
        position: "relative",
        borderRadius: "28px",
        padding: "32px 28px",
        cursor: "pointer",
        background: "rgba(255, 255, 255, 0.75)",
        backdropFilter: "blur(20px)",
        border: `1px solid rgba(255,255,255,0.9)`,
        boxShadow: hover
          ? "0 25px 60px -15px rgba(99, 102, 241, 0.25), 0 10px 30px rgba(0,0,0,0.08)"
          : "0 12px 35px -10px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.6)",
        transform: hover
          ? `perspective(900px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) translateY(-10px) scale(1.04)`
          : "perspective(900px) rotateY(0) rotateX(0) translateY(0) scale(1)",
        transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
        overflow: "hidden",
      }}
    >
      {/* Glass highlight */}
      <div style={{
        position: "absolute",
        top: "-50%",
        left: "-50%",
        width: "80%",
        height: "60%",
        background: "linear-gradient(135deg, rgba(255,255,255,0.9), transparent)",
        opacity: hover ? 0.25 : 0.1,
        transition: "opacity 0.5s",
        pointerEvents: "none",
      }} />

      {/* Tag */}
      <div style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "5px 14px",
        borderRadius: "9999px",
        fontSize: "10.5px",
        fontWeight: "700",
        letterSpacing: "0.8px",
        textTransform: "uppercase",
        background: `${doc.color}15`,
        color: doc.color,
        border: `1px solid ${doc.color}30`,
      }}>
        {doc.tag}
      </div>

      {/* Icon */}
      <div style={{
        fontSize: "46px",
        lineHeight: 1,
        margin: "24px 0 18px",
        color: doc.color,
        filter: hover ? `drop-shadow(0 0 20px ${doc.glow}aa)` : "none",
        transition: "filter 0.4s ease",
      }}>
        {doc.icon}
      </div>

      {/* Name */}
      <div style={{
        fontSize: "17px",
        fontWeight: "700",
        color: "#1e2937",
        marginBottom: "10px",
        letterSpacing: "-0.4px",
      }}>
        {doc.name}
      </div>

      {/* Description */}
      <div style={{ color: "#475569", fontSize: "14px", lineHeight: 1.6, marginBottom: "16px" }}>
        {doc.description}
      </div>

      {/* Preview chip */}
      <div style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "10px 14px",
        borderRadius: "18px",
        background: `${doc.color}15`,
        border: `1px solid ${doc.color}25`,
        color: doc.color,
        fontSize: "13px",
        fontWeight: 600,
        marginBottom: "16px",
      }}>
        <span style={{ fontSize: "14px" }}>⌘</span>
        {doc.preview}
      </div>

      {/* Arrow */}
      <div style={{
        fontSize: "14px",
        fontWeight: "600",
        color: doc.color,
        opacity: hover ? 1 : 0.8,
        transform: hover ? "translateX(6px)" : "translateX(0)",
        transition: "all 0.3s ease",
      }}>
        Open Builder →
      </div>

      {/* Bottom glow orb */}
      <div style={{
        position: "absolute",
        bottom: "-40px",
        right: "-40px",
        width: "110px",
        height: "110px",
        borderRadius: "50%",
        background: `radial-gradient(circle, ${doc.glow}30 20%, transparent 70%)`,
        opacity: hover ? 0.9 : 0.3,
        transition: "opacity 0.5s",
      }} />
    </div>
  );
}

function StatCard({ stat, index }) {
  const [count, setCount] = useState(0);
  const target = parseInt(stat.value.replace(/,/g, "").replace("h", ""));

  useEffect(() => {
    const duration = 1400;
    const start = Date.now() + index * 100;
    const animate = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [index]);

  const displayVal = stat.value.includes("h") ? `${count}h` : count.toLocaleString();

  return (
    <div style={{
      background: "rgba(255,255,255,0.78)",
      backdropFilter: "blur(18px)",
      border: "1px solid rgba(255,255,255,0.95)",
      borderRadius: "24px",
      padding: "28px 26px",
      boxShadow: "0 15px 40px -15px rgba(0,0,0,0.12)",
      transition: "transform 0.3s ease",
    }}>
      <div style={{ fontSize: "29px", color: stat.accent, marginBottom: "14px" }}>{stat.icon}</div>
      <div style={{ fontSize: "38px", fontWeight: "800", color: "#0f172a", letterSpacing: "-1.2px" }}>
        {displayVal}
      </div>
      <div style={{ color: "#475569", fontWeight: "600", marginTop: "6px" }}>{stat.label}</div>
      <div style={{ color: stat.accent, fontSize: "13px", marginTop: "4px" }}>{stat.sub}</div>
    </div>
  );
}

function Aurora() {
  const canvasRef = useRef();
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let frame = 0;
    let raf;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const blobs = [
      { x: 0.2, y: 0.25, r: 0.42, color: [99, 102, 241], speed: 0.0004 },
      { x: 0.8, y: 0.2, r: 0.35, color: [236, 72, 153], speed: 0.00055 },
      { x: 0.4, y: 0.75, r: 0.38, color: [16, 185, 129], speed: 0.0003 },
    ];

    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const W = canvas.width, H = canvas.height;

      blobs.forEach((b, i) => {
        const t = frame * b.speed;
        const cx = (b.x + Math.sin(t + i) * 0.1) * W;
        const cy = (b.y + Math.cos(t * 0.8) * 0.08) * H;
        const r = b.r * Math.max(W, H);

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 1.4);
        const [R, G, B] = b.color;
        grad.addColorStop(0, `rgba(${R},${G},${B},0.09)`);
        grad.addColorStop(0.5, `rgba(${R},${G},${B},0.03)`);
        grad.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.ellipse(cx, cy, r * 1.25, r * 0.75, t * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        opacity: 0.65,
        pointerEvents: "none",
      }}
    />
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [user] = useState({ name: "Satya" });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    setTimeout(() => setLoading(false), 650);

    const ti = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(ti);
  }, [navigate]);

  const filtered = documentTypes.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.tag.toLowerCase().includes(search.toLowerCase())
  );

  const hour = time.getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 64, height: 64, margin: "0 auto 24px", border: "4px solid #e2e8f0", borderTopColor: "#6366f1", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
          <div style={{ color: "#64748b" }}>Preparing your workspace...</div>
        </div>
      </div>
    );
  }

  return (
    <Layout userName={user.name} showLogout={true}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(145deg, #f0f4ff 0%, #e0e7ff 100%)",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Sora', sans-serif",
      }}>
        <Aurora />

        <div style={{ position: "relative", zIndex: 2, maxWidth: "1440px", margin: "0 auto", padding: "40px 40px 100px" }}>
          
          {/* Top Bar */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "56px", flexWrap: "wrap", gap: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div style={{
                width: "56px", height: "56px", borderRadius: "18px",
                background: "linear-gradient(135deg, #6366f1, #a855f7)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "26px", color: "#fff", boxShadow: "0 10px 30px rgba(99,102,241,0.4)",
              }}>◈</div>
              <div>
                <div style={{ fontSize: "24px", fontWeight: "800", letterSpacing: "-0.7px" }}>DocStudio</div>
                <div style={{ fontSize: "13px", color: "#64748b" }}>
                  {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            </div>

            {/* Search Bar - Glassy */}
            <div style={{ position: "relative", flex: "1", maxWidth: "440px" }}>
              <span style={{ position: "absolute", left: "20px", top: "50%", transform: "translateY(-50%)", color: "#64748b", fontSize: "18px" }}>⌕</span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search templates..."
                style={{
                  width: "100%",
                  padding: "16px 20px 16px 56px",
                  background: "rgba(255,255,255,0.85)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.9)",
                  borderRadius: "18px",
                  fontSize: "15.5px",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
                  outline: "none",
                }}
              />
            </div>

            <button
              onClick={() => navigate("/templates")}
              style={{
                padding: "14px 32px",
                borderRadius: "16px",
                border: "none",
                background: "linear-gradient(135deg, #6366f1, #a855f7)",
                color: "#fff",
                fontWeight: "700",
                fontSize: "14.5px",
                cursor: "pointer",
                boxShadow: "0 12px 30px rgba(99,102,241,0.35)",
              }}
            >
              Explore All Templates →
            </button>
          </div>

          {/* Hero Banner - Glassy */}
          <div style={{
            borderRadius: "32px",
            padding: "60px 56px",
            background: "rgba(255,255,255,0.82)",
            backdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.95)",
            boxShadow: "0 25px 70px -20px rgba(0,0,0,0.15)",
            marginBottom: "52px",
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{ position: "relative", zIndex: 2 }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                padding: "8px 20px", borderRadius: "9999px",
                background: "rgba(99,102,241,0.1)", color: "#6366f1",
                fontSize: "13.5px", fontWeight: "600",
              }}>
                <span style={{ display: "inline-block", width: "8px", height: "8px", background: "#6366f1", borderRadius: "50%", animation: "pulse 2s infinite" }} />
                {greeting}, {user.name}
              </div>

              <h1 style={{
                fontSize: "clamp(34px, 5.2vw, 54px)",
                fontWeight: "800",
                lineHeight: 1.05,
                letterSpacing: "-2px",
                margin: "24px 0 16px",
                color: "#0f172a",
              }}>
                Design stunning documents<br />
                with <span style={{ background: "linear-gradient(90deg, #6366f1, #c026d3)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>glass-like elegance</span>
              </h1>

              <p style={{ fontSize: "17.5px", color: "#475569", maxWidth: "560px" }}>
                1,284+ beautiful templates. Professional, modern, and ready in seconds.
              </p>
            </div>
          </div>

          {/* Resume Design Preview */}
          <div style={{ marginBottom: "56px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", marginBottom: "24px" }}>
              <div>
                <div style={{ fontSize: "13px", letterSpacing: "1.5px", color: "#64748b", fontWeight: "600" }}>
                  RESUME DESIGNS • 5 PREVIEWED
                </div>
                <h2 style={{ fontSize: "27px", fontWeight: "800", margin: "8px 0 0", color: "#0f172a", letterSpacing: "-0.8px" }}>
                  Explore resume template styles
                </h2>
              </div>
              <button
                onClick={() => navigate("/resume-builder")}
                style={{
                  padding: "14px 28px",
                  borderRadius: "16px",
                  border: "none",
                  background: "linear-gradient(135deg, #6366f1, #a855f7)",
                  color: "#fff",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                View all resume templates
              </button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
              {[
                { title: "Modern Professional", subtitle: "Clean, resume-ready layout", color: "#6366f1" },
                { title: "Minimal Bold", subtitle: "Simple sections with strong headings", color: "#ec4899" },
                { title: "Creative Splash", subtitle: "Unique styling for designers", color: "#10b981" },
                { title: "Classic Executive", subtitle: "Timeless, polished format", color: "#f59e0b" },
                { title: "ATS Friendly", subtitle: "Optimized for recruiter systems", color: "#3b82f6" },
              ].map((design, i) => (
                <div
                  key={i}
                  onClick={() => navigate("/resume-builder")}
                  style={{
                    cursor: "pointer",
                    borderRadius: "24px",
                    padding: "24px",
                    background: "rgba(255,255,255,0.9)",
                    backdropFilter: "blur(18px)",
                    border: `1px solid rgba(255,255,255,0.9)`,
                    boxShadow: "0 18px 45px -20px rgba(15, 23, 42, 0.18)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-6px)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
                    <div>
                      <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "1.5px", fontWeight: "700", color: design.color }}>
                        RESUME
                      </div>
                      <div style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a", marginTop: "8px" }}>
                        {design.title}
                      </div>
                    </div>
                    <div style={{ width: "48px", height: "48px", borderRadius: "16px", background: design.color, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: "700" }}>
                      R{i + 1}
                    </div>
                  </div>
                  <div style={{ color: "#475569", fontSize: "14px", lineHeight: 1.7, marginBottom: "18px" }}>
                    {design.subtitle}
                  </div>
                  <div style={{ display: "grid", gap: "10px" }}>
                    <div style={{ height: "8px", borderRadius: "999px", background: `${design.color}25` }} />
                    <div style={{ height: "8px", borderRadius: "999px", background: `${design.color}25`, width: "80%" }} />
                    <div style={{ height: "8px", borderRadius: "999px", background: `${design.color}25`, width: "60%" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "20px", marginBottom: "56px" }}>
            {stats.map((s, i) => <StatCard key={s.label} stat={s} index={i} />)}
          </div>

          {/* Document Types Section */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
              <div>
                <div style={{ fontSize: "13px", letterSpacing: "1.5px", color: "#64748b", fontWeight: "600" }}>
                  22 CATEGORIES • {filtered.length} TEMPLATES
                </div>
                <h2 style={{ fontSize: "27px", fontWeight: "800", margin: 0, color: "#0f172a", letterSpacing: "-0.8px" }}>
                  {search ? `Results for "${search}"` : "All Document Types"}
                </h2>
              </div>
              {search && (
                <button onClick={() => setSearch("")} style={{ color: "#64748b", fontWeight: "500" }}>
                  Clear
                </button>
              )}
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(245px, 1fr))",
              gap: "20px",
            }}>
              {filtered.length === 0 ? (
                <div style={{ textAlign: "center", padding: "80px", color: "#64748b" }}>
                  No matching templates found
                </div>
              ) : (
                filtered.map((doc, i) => (
                  <DocCard key={doc.name} doc={doc} index={i} navigate={navigate} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}