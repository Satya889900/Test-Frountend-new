// ResumePreview.jsx
// Exact Replica of the Requested Premium 2-Column Corporate Template

export default function ResumePreview({ config, form }) {
  const { accent = "#242e3f", layout = "top", font = "'Inter', sans-serif", photo, circlePhoto, showPhoto } = config;
  const f = form || {};

  const initials = `${(f.fname || "J")[0]}${(f.lname || "D")[0]}`.toUpperCase();
  const fullName = [f.fname, f.lname].filter(Boolean).join(" ") || "Satya Prakash";
  const skills = (f.skills || "").split(",").map((s) => s.trim()).filter(Boolean);
  const interests = (f.interests || "").split(",").map((s) => s.trim()).filter(Boolean);
  const languages = f.languages || [];

  const _experience = f.experience || [];
  const _education = f.education || [];
  const _projects = f.projects || [];
  const _certifications = f.certifications || [];

  // ================= Icons (SVGs) =================
  const SvgMail = () => <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
  const SvgPhone = () => <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
  const SvgPin = () => <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
  const SvgLinkedin = () => <svg width="9" height="9" viewBox="0 0 16 16" fill="currentColor"><path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/></svg>;
  const SvgGithub = () => <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>;

  // ================= Helpers =================
  const Avatar = ({ size }) => {
    const r = circlePhoto ? "50%" : "8px";
    if (showPhoto && photo) {
      return <img src={photo} alt="" style={{ width: size, height: size, borderRadius: r, objectFit: "cover", border: "2px solid rgba(255,255,255,0.4)", flexShrink: 0 }} />;
    }
    return (
      <div style={{ width: size, height: size, borderRadius: r, background: "rgba(255,255,255,0.15)", border: "2px solid rgba(255,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.35, fontWeight: 800, color: "#fff", flexShrink: 0 }}>
        {initials}
      </div>
    );
  };

  const SectionTitle = ({ children, isRight = false }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14, marginTop: 24 }}>
      <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.12em", color: "#64748b", textTransform: "uppercase", whiteSpace: "nowrap" }}>
        {children}
      </div>
      <div style={{ height: 1, flex: 1, background: isRight ? "rgba(0,0,0,0.04)" : "#f1f5f9" }} />
    </div>
  );

  const Pill = ({ text }) => (
    <div style={{ padding: "5px 12px", background: "#e2e8f0", color: "#334155", borderRadius: 100, fontSize: 9, fontWeight: 700, whiteSpace: "nowrap" }}>
      {text}
    </div>
  );

  // Parse body text into neat bullet points matching the image
  const renderBullets = (text) => {
    if (!text) return null;
    const lines = text.split("\n").filter((l) => l.trim().length > 0);
    return (
      <ul style={{ paddingLeft: 14, margin: "6px 0 0", color: "#475569", fontSize: 9.5, lineHeight: 1.65 }}>
        {lines.map((l, i) => (
          <li key={i} style={{ marginBottom: 3, paddingLeft: 2 }}>{l.replace(/^[-•]\s*/, "")}</li>
        ))}
      </ul>
    );
  };

  // ══════════════════════════════════════════════════════════════════════════
  // UI RENDER
  // ══════════════════════════════════════════════════════════════════════════
  return (
    <div style={{ fontFamily: font, background: "#fff", display: "flex", flexDirection: "column", minHeight: 900 }}>
      
      {/* ── TOP NAV HEADER ── */}
      <div style={{ background: accent, padding: "34px 46px", position: "relative", overflow: "hidden", color: "#fff" }}>
        {/* Soft decorative background elements */}
        <div style={{ position: "absolute", top: -80, right: -40, width: 350, height: 350, borderRadius: "50%", background: "rgba(255,255,255,0.03)" }} />
        <div style={{ position: "absolute", bottom: -40, right: 220, width: 220, height: 220, borderRadius: "50%", background: "rgba(255,255,255,0.02)" }} />

        <div style={{ display: "flex", alignItems: "center", gap: 24, position: "relative", zIndex: 2 }}>
          <Avatar size={80} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 26, fontWeight: 700, fontFamily: "'Georgia', serif", letterSpacing: "0.2px", margin: "0 0 6px" }}>
              {fullName}
            </div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", fontWeight: 500, letterSpacing: "0.02em", marginBottom: 14 }}>
              {f.title || "Full Stack Developer"}
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 5, fontSize: 8.5, color: "rgba(255,255,255,0.7)", letterSpacing: "0.01em" }}>
              {/* Row 1 */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0 20px" }}>
                {f.email && <div style={{ display: "flex", alignItems: "center", gap: 5 }}><SvgMail /> {f.email}</div>}
                {f.phone && <div style={{ display: "flex", alignItems: "center", gap: 5 }}><SvgPhone /> {f.phone}</div>}
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}><SvgPin /> Bangalore, India</div>
                {f.linkedin && <div style={{ display: "flex", alignItems: "center", gap: 5 }}><span>in</span> {f.linkedin.replace("https://www.", "")}</div>}
              </div>
              {/* Row 2 (github or portfolio below) */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0 20px" }}>
                {f.github && <div style={{ display: "flex", alignItems: "center", gap: 5 }}><SvgGithub /> {f.github.replace("https://", "")}</div>}
                {f.portfolio && <div style={{ display: "flex", alignItems: "center", gap: 5 }}><span>🌐</span> {f.portfolio.replace("https://", "")}</div>}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 2-COLUMN BODY ── */}
      <div style={{ display: "flex", flex: 1 }}>
        
        {/* === LEFT COLUMN === */}
        <div style={{ flex: 1.8, padding: "10px 32px 36px 46px" }}>
          
          {f.summary && (
            <>
              <SectionTitle>Professional Summary</SectionTitle>
              <div style={{ fontSize: 9.5, color: "#475569", lineHeight: 1.7 }}>
                {f.summary}
              </div>
            </>
          )}

          {_experience.length > 0 && (
            <>
              <SectionTitle>Work Experience</SectionTitle>
              {_experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 3 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#0f172a" }}>{exp.jobtitle || "Job Title"}</div>
                    {exp.jobstart && (
                      <div style={{ fontSize: 8.5, color: "#475569", background: "#f1f5f9", padding: "3px 10px", borderRadius: 100, fontWeight: 600 }}>
                        {exp.jobstart} – {exp.jobend}
                      </div>
                    )}
                  </div>
                  <div style={{ fontSize: 9.5, color: "#64748b", fontStyle: "italic", marginBottom: 6 }}>
                    {exp.company}
                  </div>
                  {renderBullets(exp.jobdesc)}
                </div>
              ))}
            </>
          )}

          {_projects.length > 0 && (
            <>
              <SectionTitle>Projects</SectionTitle>
              {_projects.map((proj, i) => (
                <div key={i} style={{ marginBottom: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 3 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#0f172a" }}>{proj.name || "Project Name"}</div>
                    {proj.year && (
                      <div style={{ fontSize: 9, color: "#10b981", fontWeight: 700, display: "flex", alignItems: "center", gap: 3 }}>
                         {proj.year} {proj.year.includes("http") ? <span style={{ fontSize: 11 }}>↗</span> : ""}
                      </div>
                    )}
                  </div>
                  <div style={{ fontSize: 9, color: "#64748b", fontStyle: "italic", marginBottom: 6 }}>
                     {/* Placeholder for technologies array if added later */}
                     {proj.technologies ? proj.technologies : ""}
                  </div>
                  {renderBullets(proj.description)}
                </div>
              ))}
            </>
          )}
        </div>

        {/* === RIGHT COLUMN === */}
        <div style={{ flex: 1, background: "#f8fafc", padding: "10px 40px 36px 32px" }}>
          
          {_education.length > 0 && (
            <>
              <SectionTitle isRight>Education</SectionTitle>
              {_education.map((edu, i) => (
                <div key={i} style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#1e293b", marginBottom: 3 }}>{edu.degree || "Degree Name"}</div>
                  <div style={{ fontSize: 9, color: "#64748b", marginBottom: 4 }}>{edu.school}</div>
                  <div style={{ fontSize: 8.5, color: "#94a3b8", fontWeight: 600, marginTop: 3 }}>
                    {edu.gradyear} {edu.gpa && <span style={{ color: "#475569", marginLeft: 4 }}>CGPA {edu.gpa}</span>}
                  </div>
                </div>
              ))}
            </>
          )}

          {skills.length > 0 && (
            <>
              <SectionTitle isRight>Skills</SectionTitle>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 6px" }}>
                {skills.map((s) => (
                  <Pill key={s} text={s} />
                ))}
              </div>
            </>
          )}

          {_certifications.length > 0 && (
            <>
              <SectionTitle isRight>Certifications</SectionTitle>
              {_certifications.map((cert, i) => (
                <div key={i} style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#1e293b", marginBottom: 3 }}>{cert.name || "Certification"}</div>
                  <div style={{ fontSize: 9, color: "#64748b", lineHeight: 1.5 }}>
                    {cert.issuer} {cert.year && `· ${cert.year}`}
                  </div>
                </div>
              ))}
            </>
          )}

          {languages.length > 0 && (
            <>
              <SectionTitle isRight>Languages</SectionTitle>
              <ul style={{ paddingLeft: 14, margin: 0, color: "#475569", fontSize: 9.5, lineHeight: 1.8 }}>
                {languages.map((l, i) => (
                  <li key={i} style={{ paddingLeft: 4 }}>
                    {l.language}
                  </li>
                ))}
              </ul>
            </>
          )}

          {interests.length > 0 && (
            <>
              <SectionTitle isRight>Interests</SectionTitle>
              <div style={{ fontSize: 9.5, color: "#475569", lineHeight: 1.6 }}>
                {interests.join(", ")}
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}