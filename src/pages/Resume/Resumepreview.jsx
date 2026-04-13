// ResumePreview.jsx
// Renders the actual resume paper based on template config + form values.
// Used in both ConfigurePage and BuilderPage.

export default function ResumePreview({ config, form }) {
  const { accent, layout, font, photo, circlePhoto, showPhoto } = config;
  const f = form;

  const initials = `${(f.fname || "J")[0]}${(f.lname || "D")[0]}`.toUpperCase();
  const photoStyle = {
    width: 54,
    height: 54,
    borderRadius: circlePhoto ? "50%" : "8px",
    objectFit: "cover",
    border: "2px solid rgba(255,255,255,0.3)",
  };

  const photoNode = showPhoto && photo
    ? <img src={photo} alt="profile" style={photoStyle} />
    : null;

  const avatarSidebar = (
    <div style={{
      width: 54, height: 54, borderRadius: "50%",
      background: "rgba(255,255,255,0.2)",
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "white", fontSize: 20, fontWeight: 700,
      margin: "0 auto",
    }}>{initials}</div>
  );

  const sidebarPhoto = (showPhoto && photo)
    ? <img src={photo} alt="profile" style={{ ...photoStyle, display: "block", margin: "0 auto 10px" }} />
    : <div style={{ ...{ width: 54, height: 54, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 20, fontWeight: 700, margin: "0 auto 10px" } }}>{initials}</div>;

  const topRowPhoto = (showPhoto && photo)
    ? <img src={photo} alt="profile" style={{ ...photoStyle, marginRight: 14, flexShrink: 0 }} />
    : <div style={{ width: 54, height: 54, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 20, fontWeight: 700, marginRight: 14, flexShrink: 0 }}>{initials}</div>;

  const minimalPhoto = (showPhoto && photo)
    ? <img src={photo} alt="profile" style={{ width: 52, height: 52, borderRadius: circlePhoto ? "50%" : "8px", objectFit: "cover", border: "1px solid #e5e7eb", flexShrink: 0, marginRight: 14 }} />
    : null;

  const sectionLabel = (text) => (
    <div style={{ fontSize: 9, fontWeight: 700, color: accent, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 5 }}>{text}</div>
  );

  const bodyText = (content) => (
    <div style={{ fontSize: 11, color: "#4b5563", lineHeight: 1.65, marginBottom: 14 }}>{content}</div>
  );

  // ── SIDEBAR ────────────────────────────────────────────────────────────────
  if (layout === "sidebar") return (
    <div style={{ display: "flex", minHeight: 600, fontFamily: font }}>
      {/* left column */}
      <div style={{ width: "36%", background: accent, padding: "22px 14px", color: "white" }}>
        {sidebarPhoto}
        <div style={{ fontSize: 13, fontWeight: 700, textAlign: "center", marginBottom: 3 }}>{f.fname} {f.lname}</div>
        <div style={{ fontSize: 10, opacity: 0.75, textAlign: "center", marginBottom: 18 }}>{f.title}</div>

        <div style={{ fontSize: 9, fontWeight: 700, opacity: 0.55, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>Contact</div>
        <div style={{ fontSize: 10, opacity: 0.85, marginBottom: 3, wordBreak: "break-all" }}>{f.email}</div>
        <div style={{ fontSize: 10, opacity: 0.85, marginBottom: f.linkedin ? 3 : 16 }}>{f.phone}</div>
        {f.linkedin && <div style={{ fontSize: 10, opacity: 0.85, marginBottom: 16, wordBreak: "break-all" }}>{f.linkedin}</div>}

        <div style={{ fontSize: 9, fontWeight: 700, opacity: 0.55, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>Skills</div>
        <div style={{ fontSize: 10, opacity: 0.85, lineHeight: 1.7 }}>{f.skills}</div>

        {f.language && (
          <>
            <div style={{ fontSize: 9, fontWeight: 700, opacity: 0.55, textTransform: "uppercase", letterSpacing: "0.05em", marginTop: 14, marginBottom: 6 }}>Languages</div>
            <div style={{ fontSize: 10, opacity: 0.85 }}>{f.language} — {f.langLevel}</div>
          </>
        )}
      </div>

      {/* right column */}
      <div style={{ flex: 1, padding: "22px 16px" }}>
        <div style={{ fontSize: 9, fontWeight: 700, color: accent, textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: `1.5px solid ${accent}`, paddingBottom: 3, marginBottom: 8 }}>Summary</div>
        <div style={{ fontSize: 11, color: "#4b5563", lineHeight: 1.6, marginBottom: 16 }}>{f.summary}</div>

        <div style={{ fontSize: 9, fontWeight: 700, color: accent, textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: `1.5px solid ${accent}`, paddingBottom: 3, marginBottom: 8 }}>Experience</div>
        <div style={{ fontSize: 11, color: "#1f2937", lineHeight: 1.7, marginBottom: 16 }}>
          <div style={{ fontWeight: 700 }}>{f.jobtitle} · {f.company}</div>
          <div style={{ color: "#9ca3af", fontSize: 10 }}>{f.jobstart} – {f.jobend}</div>
          <div style={{ marginTop: 3, color: "#4b5563" }}>{f.jobdesc}</div>
        </div>

        <div style={{ fontSize: 9, fontWeight: 700, color: accent, textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: `1.5px solid ${accent}`, paddingBottom: 3, marginBottom: 8 }}>Education</div>
        <div style={{ fontSize: 11, color: "#1f2937" }}>
          <div style={{ fontWeight: 700 }}>{f.degree}</div>
          <div style={{ color: "#9ca3af", fontSize: 10 }}>{f.school} · {f.gradyear}</div>
        </div>
      </div>
    </div>
  );

  // ── TOP HEADER ──────────────────────────────────────────────────────────────
  if (layout === "top") return (
    <div style={{ fontFamily: font }}>
      <div style={{ background: accent, padding: "22px 24px", display: "flex", alignItems: "center" }}>
        {topRowPhoto}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 3 }}>{f.fname} {f.lname}</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", marginBottom: 6 }}>{f.title}</div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.7)" }}>{f.email}</span>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.7)" }}>{f.phone}</span>
            {f.linkedin && <span style={{ fontSize: 10, color: "rgba(255,255,255,0.7)" }}>{f.linkedin}</span>}
          </div>
        </div>
      </div>
      <div style={{ padding: "20px 24px" }}>
        {sectionLabel("Summary")}
        {bodyText(f.summary)}
        {sectionLabel("Experience")}
        <div style={{ fontSize: 11, color: "#4b5563", lineHeight: 1.65, marginBottom: 14 }}>
          <strong>{f.jobtitle} · {f.company}</strong><br />
          <span style={{ color: "#9ca3af", fontSize: 10 }}>{f.jobstart} – {f.jobend}</span><br />
          {f.jobdesc}
        </div>
        {sectionLabel("Education")}
        <div style={{ fontSize: 11, color: "#4b5563", lineHeight: 1.65, marginBottom: 14 }}>
          <strong>{f.degree}</strong><br />
          <span style={{ color: "#9ca3af", fontSize: 10 }}>{f.school} · {f.gradyear}</span>
        </div>
        {sectionLabel("Skills")}
        {bodyText(f.skills)}
      </div>
    </div>
  );

  // ── CORPORATE ───────────────────────────────────────────────────────────────
  if (layout === "corporate") return (
    <div style={{ fontFamily: font }}>
      <div style={{ background: accent, padding: "20px 24px", display: "flex", alignItems: "center", gap: 14 }}>
        {topRowPhoto}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>{f.fname} {f.lname}</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.75)", marginTop: 2 }}>{f.title}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.7)" }}>{f.email}</div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.7)", marginTop: 2 }}>{f.phone}</div>
          {f.linkedin && <div style={{ fontSize: 10, color: "rgba(255,255,255,0.7)", marginTop: 2 }}>{f.linkedin}</div>}
        </div>
      </div>
      <div style={{ padding: "20px 24px" }}>
        {["Summary", "Experience", "Education", "Skills"].map((sec) => (
          <div key={sec}>
            <div style={{ fontSize: 9, fontWeight: 700, color: accent, borderLeft: `3px solid ${accent}`, paddingLeft: 8, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>{sec}</div>
            <div style={{ fontSize: 11, color: "#4b5563", lineHeight: 1.65, marginBottom: 14 }}>
              {sec === "Summary" && f.summary}
              {sec === "Experience" && <><strong>{f.jobtitle} · {f.company}</strong><br /><span style={{ color: "#9ca3af", fontSize: 10 }}>{f.jobstart} – {f.jobend}</span><br />{f.jobdesc}</>}
              {sec === "Education" && <><strong>{f.degree}</strong><br /><span style={{ color: "#9ca3af", fontSize: 10 }}>{f.school} · {f.gradyear}</span></>}
              {sec === "Skills" && f.skills}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ── MINIMAL (default) ───────────────────────────────────────────────────────
  return (
    <div style={{ padding: "32px 36px", fontFamily: font }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 4 }}>
        {minimalPhoto}
        <div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#111827" }}>{f.fname} {f.lname}</div>
          <div style={{ fontSize: 13, color: accent, fontWeight: 600, marginBottom: 4 }}>{f.title}</div>
          <div style={{ fontSize: 11, color: "#6b7280" }}>
            {f.email} · {f.phone}{f.linkedin ? ` · ${f.linkedin}` : ""}
          </div>
        </div>
      </div>
      <div style={{ height: 1, background: "#e5e7eb", margin: "14px 0" }} />
      {["Summary", "Experience", "Education", "Skills"].map((sec) => (
        <div key={sec}>
          <div style={{ fontSize: 9, fontWeight: 700, color: accent, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 5 }}>{sec}</div>
          <div style={{ fontSize: 11, color: "#4b5563", lineHeight: 1.65, marginBottom: 14 }}>
            {sec === "Summary" && f.summary}
            {sec === "Experience" && <><strong>{f.jobtitle} · {f.company}</strong>{" "}<span style={{ color: "#9ca3af", fontSize: 10 }}>{f.jobstart}–{f.jobend}</span><br />{f.jobdesc}</>}
            {sec === "Education" && <><strong>{f.degree}</strong> — {f.school} ({f.gradyear})</>}
            {sec === "Skills" && f.skills}
          </div>
        </div>
      ))}
    </div>
  );
}