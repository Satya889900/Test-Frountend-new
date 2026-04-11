import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

/* ─── Resume Template Types ─── */
const RESUME_TYPES = ["All", "Modern", "Minimal", "Creative", "Corporate"];

/* ─── Resume Templates Data ─── */
const RESUME_TEMPLATES = [
  { id: 1, type: "Modern", name: "Modern Blue Sidebar", layout: "two-col" },
  { id: 2, type: "Modern", name: "Modern Clean Split", layout: "split" },
  { id: 3, type: "Minimal", name: "Minimal Simple", layout: "single-col" },
  { id: 4, type: "Minimal", name: "Minimal ATS Friendly", layout: "single-col" },
  { id: 5, type: "Creative", name: "Creative Color Blocks", layout: "grid" },
  { id: 6, type: "Creative", name: "Creative Designer", layout: "card" },
  { id: 7, type: "Corporate", name: "Corporate Professional", layout: "header" },
  { id: 8, type: "Corporate", name: "Executive Clean", layout: "minimal-top" },
];

/* ─── Simple Preview Box ─── */
function Preview({ type }) {
  const styles = {
    Modern: { background: "#1e3a8a", color: "#fff" },
    Minimal: { background: "#fff", color: "#000", border: "1px solid #ccc" },
    Creative: { background: "linear-gradient(135deg,#f43f5e,#6366f1)", color: "#fff" },
    Corporate: { background: "#e5e7eb", color: "#111" },
  };

  return (
    <div style={{
      height: "220px",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "600",
      ...styles[type]
    }}>
      {type} Resume
    </div>
  );
}

/* ─── Main Page ─── */
export default function ResumeTemplatePage() {
  const navigate = useNavigate();
  const [activeType, setActiveType] = useState("All");
  const [search, setSearch] = useState("");

  /* Filter Logic */
  const filtered = useMemo(() => {
    let data = RESUME_TEMPLATES;

    if (activeType !== "All") {
      data = data.filter(t => t.type === activeType);
    }

    if (search) {
      data = data.filter(t =>
        t.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    return data;
  }, [activeType, search]);

  /* Handle Use */
  const handleUse = (template) => {
    navigate(`/resume-builder?type=${template.type}`);
  };

  return (
    <div style={{ padding: "30px", background: "#0f172a", minHeight: "100vh", color: "#fff" }}>

      {/* Title */}
      <h1 style={{ marginBottom: "10px" }}>Resume Templates</h1>
      <p style={{ color: "#94a3b8", marginBottom: "20px" }}>
        Choose a design to start building your resume
      </p>

      {/* Search */}
      <input
        placeholder="Search resume..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "100%",
          maxWidth: "400px",
          borderRadius: "8px",
          border: "none",
          marginBottom: "20px"
        }}
      />

      {/* Type Filter */}
      <div style={{ marginBottom: "20px" }}>
        {RESUME_TYPES.map(type => (
          <button
            key={type}
            onClick={() => setActiveType(type)}
            style={{
              marginRight: "10px",
              padding: "8px 14px",
              borderRadius: "6px",
              border: activeType === type ? "2px solid #6366f1" : "1px solid #444",
              background: activeType === type ? "#1e293b" : "transparent",
              color: "#fff",
              cursor: "pointer"
            }}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))",
        gap: "20px"
      }}>
        {filtered.map(template => (
          <div key={template.id}
            style={{
              background: "#1e293b",
              padding: "10px",
              borderRadius: "10px",
              cursor: "pointer"
            }}
          >
            <Preview type={template.type} />

            <h3 style={{ marginTop: "10px" }}>{template.name}</h3>
            <p style={{ color: "#94a3b8", fontSize: "13px" }}>
              {template.type} · {template.layout}
            </p>

            <button
              onClick={() => handleUse(template)}
              style={{
                marginTop: "10px",
                width: "100%",
                padding: "8px",
                borderRadius: "6px",
                border: "none",
                background: "#6366f1",
                color: "#fff",
                cursor: "pointer"
              }}
            >
              Use Template
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}