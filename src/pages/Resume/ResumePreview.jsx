import React from "react";

const ResumePreview = ({ config, form }) => {
  const { accent = "#2563eb", font = "'Segoe UI', sans-serif", layout = "top", photo, circlePhoto, showPhoto } = config || {};
  const {
    fname, lname, title, email, phone, linkedin, github, portfolio,
    summary, experience, education, projects, certifications, skills, interests, languages
  } = form || {};

  const hasText = (v) => typeof v === "string" ? v.trim().length > 0 : Boolean(v);
  const fullName = `${fname || ""} ${lname || ""}`.trim() || "Your Name";
  const visibleExperience = (experience || []).filter((x) => hasText(x?.jobtitle) || hasText(x?.company) || hasText(x?.jobdesc));
  const visibleEducation = (education || []).filter((x) => hasText(x?.degree) || hasText(x?.school));
  const visibleProjects = (projects || []).filter((x) => hasText(x?.name) || hasText(x?.description));
  const visibleLanguages = (languages || []).filter((x) => hasText(x?.language) || hasText(x?.langLevel));
  const visibleCertifications = (certifications || []).filter((x) => hasText(x?.name) || hasText(x?.issuer) || hasText(x?.year));
  const skillList = (skills || "").split(",").map((s) => s.trim()).filter(Boolean);
  const wrapText = { overflowWrap: "anywhere", wordBreak: "break-word", whiteSpace: "normal" };
  const profileImage = showPhoto && photo ? (
    <img
      src={photo}
      alt="Profile"
      style={{ width: 72, height: 72, borderRadius: circlePhoto ? "50%" : "10px", objectFit: "cover", border: "2px solid #cbd5e1" }}
    />
  ) : null;

  const Section = ({ title: t, children }) => (
    <div style={{ marginBottom: "14px", ...wrapText }}>
      <div style={{ fontSize: "12px", fontWeight: 700, color: accent, letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: "4px" }}>{t}</div>
      <div style={{ height: "1px", background: "#cbd5e1", marginBottom: "8px" }} />
      {children}
    </div>
  );

  const StandardMain = () => (
    <div style={wrapText}>
      {summary && <p style={{ fontSize: "10px", color: "#475569", lineHeight: 1.55, marginBottom: "12px" }}>{summary}</p>}
      {visibleExperience.length > 0 && (
        <Section title="Work Experience">
          {visibleExperience.map((exp, i) => (
            <div key={i} style={{ marginBottom: "8px", paddingBottom: "6px", borderBottom: i !== visibleExperience.length - 1 ? "1px solid #e2e8f0" : "none" }}>
              <div style={{ fontWeight: 700, fontSize: "11px" }}>{exp.jobtitle}</div>
              <div style={{ fontSize: "10px", color: accent }}>{exp.company} {exp.jobstart ? `| ${exp.jobstart} - ${exp.jobend || "Present"}` : ""}</div>
              <div style={{ fontSize: "10px", color: "#475569" }}>{exp.jobdesc}</div>
            </div>
          ))}
        </Section>
      )}
      {visibleProjects.length > 0 && (
        <Section title="Projects">
          {visibleProjects.map((proj, i) => (
            <div key={i} style={{ marginBottom: "7px" }}>
              <div style={{ fontWeight: 600, fontSize: "10px" }}>{proj.name}</div>
              <div style={{ fontSize: "10px", color: "#475569" }}>{proj.description}</div>
            </div>
          ))}
        </Section>
      )}
      {visibleEducation.length > 0 && (
        <Section title="Education">
          {visibleEducation.map((edu, i) => (
            <div key={i} style={{ marginBottom: "7px" }}>
              <div style={{ fontWeight: 600, fontSize: "10px" }}>{edu.degree}</div>
              <div style={{ fontSize: "10px", color: "#64748b" }}>{edu.school} {edu.gradyear ? `| ${edu.gradyear}` : ""}</div>
            </div>
          ))}
        </Section>
      )}
    </div>
  );

  if (layout === "modernPopular") {
    return (
      <div style={{ fontFamily: font, minHeight: 700, background: "#fff", display: "grid", gridTemplateColumns: "0.35fr 0.65fr" }}>
        <div style={{ background: "#f1f5f9", borderRight: "1px solid #cbd5e1", padding: "16px 12px" }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: accent, marginBottom: 8 }}>{fullName}</div>
          <div style={{ fontSize: 10, color: "#64748b", marginBottom: 10 }}>{title || "Professional Title"}</div>
          <Section title="Details"><div style={{ fontSize: 9 }}>{email}<br />{phone}<br />{linkedin}<br />{github}</div></Section>
          <Section title="Skills">{skillList.map((s, i) => <div key={i} style={{ fontSize: 9, borderBottom: "1px solid #e2e8f0", marginBottom: 3 }}>{s}</div>)}</Section>
        </div>
        <div style={{ padding: "16px 14px" }}>
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "6px" }}>{profileImage}</div>
          <div style={{ borderBottom: `3px solid ${accent}`, paddingBottom: 8, marginBottom: 10 }}>
            <div style={{ fontSize: 28, fontWeight: 700 }}>{fullName}</div>
            <div style={{ fontSize: 10, color: "#6b7280", textTransform: "uppercase" }}>{title || "Professional Title"}</div>
          </div>
          <StandardMain />
        </div>
      </div>
    );
  }

  if (layout === "modernCleanStrip") {
    return (
      <div style={{ fontFamily: font, minHeight: 700, background: "#fff", display: "grid", gridTemplateColumns: "0.28fr 0.72fr" }}>
        <div style={{ background: "#e5e7eb", borderRight: "1px solid #cbd5e1", padding: "16px 10px" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#374151", marginBottom: 8, textTransform: "uppercase" }}>Details</div>
          <div style={{ fontSize: 9, color: "#4b5563", lineHeight: 1.6 }}>{email}<br />{phone}<br />{linkedin}<br />{github}</div>
          <div style={{ height: 1, background: "#cbd5e1", margin: "10px 0" }} />
          <div style={{ fontSize: 11, fontWeight: 700, color: "#374151", marginBottom: 6, textTransform: "uppercase" }}>Skills</div>
          {skillList.map((s, i) => <div key={i} style={{ fontSize: 9, color: "#374151", marginBottom: 2 }}>• {s}</div>)}
        </div>
        <div style={{ padding: "16px 14px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <div>
              <div style={{ fontSize: 28, fontWeight: 700, color: accent }}>{fullName}</div>
              <div style={{ fontSize: 10, color: "#6b7280", textTransform: "uppercase" }}>{title || "Professional Title"}</div>
            </div>
            {profileImage}
          </div>
          <StandardMain />
        </div>
      </div>
    );
  }

  if (layout === "monoSidebarClassic") {
    return (
      <div style={{ fontFamily: font, minHeight: 700, background: "#fff", display: "grid", gridTemplateColumns: "0.28fr 0.72fr" }}>
        <div style={{ background: "#e5e7eb", borderRight: "1px solid #d1d5db", padding: "14px 10px" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#4b5563", marginBottom: 8 }}>Phone</div>
          <div style={{ fontSize: 9, color: "#6b7280", marginBottom: 6 }}>{phone || "-"}</div>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#4b5563", marginBottom: 8 }}>Email</div>
          <div style={{ fontSize: 9, color: "#6b7280", marginBottom: 6 }}>{email || "-"}</div>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#4b5563", marginBottom: 8 }}>Website</div>
          <div style={{ fontSize: 9, color: "#6b7280", marginBottom: 10 }}>{portfolio || github || "-"}</div>
          <div style={{ height: 1, background: "#cbd5e1", margin: "8px 0" }} />
          <Section title="Education">
            {visibleEducation.map((e, i) => <div key={i} style={{ fontSize: 9, color: "#4b5563", marginBottom: 5 }}>{e.degree}</div>)}
          </Section>
          <Section title="Expertise">
            {skillList.slice(0, 6).map((s, i) => <div key={i} style={{ fontSize: 9, color: "#4b5563" }}>• {s}</div>)}
          </Section>
        </div>
        <div style={{ padding: "16px 14px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
            <div>
              <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: "2px", color: "#374151" }}>{fname || "NAME"}</div>
              <div style={{ fontSize: 30, fontWeight: 300, letterSpacing: "2px", color: "#6b7280", marginTop: -4 }}>{lname || "SURNAME"}</div>
              <div style={{ fontSize: 11, color: "#4b5563", marginTop: 4 }}>{title || "Professional Title"}</div>
            </div>
            {showPhoto && photo ? (
              <img src={photo} alt="Profile" style={{ width: 58, height: 58, borderRadius: "50%", objectFit: "cover", border: "2px solid #9ca3af" }} />
            ) : null}
          </div>
          <Section title="About Me"><div style={{ fontSize: 10, color: "#6b7280" }}>{summary}</div></Section>
          <Section title="Work Experience">
            {visibleExperience.map((e, i) => (
              <div key={i} style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#374151" }}>{e.jobtitle}</div>
                <div style={{ fontSize: 9, color: "#6b7280" }}>{e.company} {e.jobstart ? `/ ${e.jobstart} - ${e.jobend || "Present"}` : ""}</div>
                <div style={{ fontSize: 9, color: "#6b7280" }}>{e.jobdesc}</div>
              </div>
            ))}
          </Section>
        </div>
      </div>
    );
  }

  if (layout === "tealExecutiveSide") {
    return (
      <div style={{ fontFamily: font, minHeight: 700, background: "#fff", display: "grid", gridTemplateColumns: "0.36fr 0.64fr" }}>
        <div style={{ background: "#0b5568", color: "#e2e8f0", padding: "18px 14px" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
            {showPhoto && photo ? (
              <img src={photo} alt="Profile" style={{ width: 86, height: 86, borderRadius: "50%", objectFit: "cover", border: "3px solid rgba(255,255,255,0.5)" }} />
            ) : null}
          </div>
          <Section title="Education">{visibleEducation.map((e, i) => <div key={i} style={{ fontSize: 9, color: "#e2e8f0", marginBottom: 5 }}>{e.degree}<br /><span style={{ opacity: 0.8 }}>{e.school}</span></div>)}</Section>
          <Section title="Profession"><div style={{ fontSize: 9, color: "#e2e8f0" }}>{title || "Job Title or Role"}</div></Section>
          <Section title="Skills">{skillList.map((s, i) => <div key={i} style={{ fontSize: 9, color: "#e2e8f0", marginBottom: 3 }}>{s}</div>)}</Section>
          <Section title="Contact"><div style={{ fontSize: 9, color: "#e2e8f0", lineHeight: 1.6 }}>{phone}<br />{email}<br />{linkedin}<br />{github}<br />{portfolio}</div></Section>
          {visibleLanguages.length > 0 && <Section title="Languages">{visibleLanguages.map((l, i) => <div key={i} style={{ fontSize: 9, color: "#e2e8f0" }}>{l.language} {l.langLevel ? `- ${l.langLevel}` : ""}</div>)}</Section>}
        </div>
        <div style={{ padding: "18px 16px" }}>
          <div style={{ borderBottom: "2px solid #9ca3af", paddingBottom: 8, marginBottom: 10 }}>
            <div style={{ fontSize: 42, fontWeight: 700, color: "#1f2937", lineHeight: 0.95 }}>{fullName}</div>
            <div style={{ fontSize: 12, color: "#374151", fontWeight: 600, textTransform: "uppercase", marginTop: 4 }}>{title || "Job Title or Role"}</div>
          </div>
          <Section title="Professional Profile"><div style={{ fontSize: 10, color: "#4b5563", lineHeight: 1.5 }}>{summary}</div></Section>
          <Section title="Work Experience">
            {visibleExperience.map((e, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#1f2937" }}>{e.jobtitle || "Job Title"}</div>
                <div style={{ fontSize: 9, color: "#6b7280" }}>{e.company} {e.jobstart ? `| ${e.jobstart} - ${e.jobend || "Present"}` : ""}</div>
                <div style={{ fontSize: 9, color: "#4b5563", marginTop: 3 }}>{e.jobdesc}</div>
              </div>
            ))}
          </Section>
          <Section title="Projects">
            {(visibleProjects.length ? visibleProjects : [{ name: "Project Name", description: "Project details go here." }]).slice(0, 3).map((p, i) => (
              <div key={i} style={{ marginBottom: 7 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#1f2937" }}>{p.name}</div>
                <div style={{ fontSize: 9, color: "#4b5563" }}>{p.description}</div>
              </div>
            ))}
          </Section>
          <Section title="Certifications">
            {(visibleCertifications.length ? visibleCertifications : [{ name: "Certification Name", issuer: "Issuer", year: "2025" }]).slice(0, 3).map((c, i) => (
              <div key={i} style={{ marginBottom: 6, fontSize: 9, color: "#4b5563" }}>
                <div style={{ fontWeight: 700, color: "#1f2937" }}>{c.name}</div>
                <div>{[c.issuer, c.year].filter(Boolean).join(" | ")}</div>
              </div>
            ))}
          </Section>
          {interests && <Section title="Interests"><div style={{ fontSize: 9, color: "#4b5563" }}>{interests}</div></Section>}
        </div>
      </div>
    );
  }

  if (layout === "chocoProfileArt") {
    return (
      <div style={{ fontFamily: font, minHeight: 700, background: "#e9e2d5", display: "grid", gridTemplateRows: "132px 1fr", overflow: "hidden" }}>
        <div style={{ background: "#3f2218", color: "#fff", padding: "14px 16px 10px", position: "relative" }}>
          <div style={{ position: "absolute", left: 12, top: 22, fontSize: 18, opacity: 0.65, letterSpacing: 1 }}>~~~~</div>
          <div style={{ position: "absolute", left: 12, top: 42, fontSize: 18, opacity: 0.65, letterSpacing: 1 }}>~~~~</div>
          <div style={{ position: "absolute", right: 12, top: 22, fontSize: 18, opacity: 0.65, letterSpacing: 1 }}>~~~~</div>
          <div style={{ position: "absolute", right: 12, top: 42, fontSize: 18, opacity: 0.65, letterSpacing: 1 }}>~~~~</div>
          <div style={{ textAlign: "center", fontSize: 47, fontWeight: 700, lineHeight: 0.9 }}>{fullName}</div>
          <div style={{ textAlign: "center", fontSize: 12, marginTop: 4, opacity: 0.95 }}>{title || "Graphic Designer"}</div>
          <div style={{ textAlign: "center", marginTop: 3, fontSize: 16, opacity: 0.8 }}>~~~~</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", marginTop: 6, fontSize: 7.5, opacity: 0.92 }}>
            <div style={{ textAlign: "center" }}>Phone<br />{phone || "+123..."}</div>
            <div style={{ textAlign: "center" }}>E-Mail<br />{email || "mail@mail.com"}</div>
            <div style={{ textAlign: "center" }}>Website<br />{portfolio || linkedin || "www.site.com"}</div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "0.27fr 0.73fr" }}>
          <div style={{ background: "#deb597", padding: "12px 9px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#f8fafc", fontStyle: "italic", marginBottom: 4 }}>Professional Profile</div>
            <div style={{ height: 2, background: "#f1e6d8", marginBottom: 6 }} />
            <div style={{ fontSize: 8.5, color: "#5b3c2d", lineHeight: 1.5, marginBottom: 10 }}>{summary || "Many desktop publishing packages and web page editors now use lorem ipsum as their default model text."}</div>
            <div style={{ fontSize: 8.5, color: "#5b3c2d", fontWeight: 700, marginBottom: 8 }}>{title || "Graphic Designer"}</div>
            <div style={{ fontSize: 34, color: "#3f2218", lineHeight: 0.2, marginBottom: 2 }}>~</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#f8fafc", fontStyle: "italic", marginBottom: 4 }}>Skills</div>
            <div style={{ height: 2, background: "#f1e6d8", marginBottom: 6 }} />
            {skillList.slice(0, 7).map((s, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 48px", gap: 5, alignItems: "center", marginBottom: 4 }}>
                <div style={{ fontSize: 8, color: "#5b3c2d", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{s}</div>
                <div style={{ height: 4, background: "#f5e9dc", position: "relative" }}>
                  <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${75 - (i % 3) * 14}%`, background: "#4b2b1f" }} />
                </div>
              </div>
            ))}
            <div style={{ fontSize: 34, color: "#3f2218", lineHeight: 0.2, marginTop: 4, marginBottom: 2 }}>~</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#f8fafc", fontStyle: "italic", marginBottom: 4 }}>Language</div>
            <div style={{ height: 2, background: "#f1e6d8", marginBottom: 6 }} />
            {(visibleLanguages.length ? visibleLanguages : [{ language: "English" }, { language: "Spanish" }]).slice(0, 2).map((l, i) => (
              <div key={i} style={{ marginBottom: 6 }}>
                <div style={{ fontSize: 8.5, color: "#5b3c2d", marginBottom: 2 }}>{l.language}</div>
                <div style={{ height: 5, background: "#f5e9dc", position: "relative" }}>
                  <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${78 - i * 25}%`, background: "#4b2b1f" }} />
                </div>
              </div>
            ))}
            <>
              <div style={{ fontSize: 34, color: "#3f2218", lineHeight: 0.2, marginTop: 4, marginBottom: 2 }}>~</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#f8fafc", fontStyle: "italic", marginBottom: 4 }}>Certification</div>
              <div style={{ height: 2, background: "#f1e6d8", marginBottom: 6 }} />
              {(visibleCertifications.length ? visibleCertifications : [{ name: "Certification Name", year: "2025", issuer: "Issuer" }]).slice(0, 3).map((c, i) => (
                <div key={i} style={{ fontSize: 8.2, color: "#5b3c2d", marginBottom: 3 }}>
                  {c.name} {[c.year, c.issuer].filter(Boolean).join(" | ")}
                </div>
              ))}
            </>
          </div>
          <div style={{ background: "#ece5d8", padding: "16px 12px 12px", position: "relative" }}>
            <div style={{ position: "absolute", left: -29, top: -34, width: 78, height: 78, borderRadius: "50%", border: "4px solid #ece5d8", overflow: "hidden", background: "#d1d5db" }}>
              {showPhoto && photo && <img src={photo} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
            </div>
            <div style={{ fontSize: 43, color: "#3f2218", lineHeight: 0.1, marginBottom: 2 }}>~</div>
            <div style={{ fontSize: 40, color: "#3f2218", lineHeight: 0.1, marginBottom: 2 }}>~</div>
            <div style={{ fontSize: 44, color: "#3f2218", lineHeight: 0.1, marginBottom: 2 }}>~</div>
            <div style={{ fontSize: 39, color: "#3f2218", lineHeight: 0.1, marginBottom: 2 }}>~</div>
            <div style={{ fontSize: 45, fontWeight: 700, color: "#2f1f17", fontStyle: "italic", marginTop: 6 }}>Work Experience</div>
            <div style={{ height: 2, background: "#d7b79f", margin: "4px 0 8px" }} />
            {(visibleExperience.length ? visibleExperience : [{ jobtitle: "Really Great Company", jobstart: "2018", jobend: "2019", company: "Art Director", jobdesc: "Many desktop publishing packages and web page editors now use lorem ipsum as their default model text." }]).slice(0, 3).map((e, i) => (
              <div key={i} style={{ marginBottom: 8 }}>
                <div style={{ display: "flex", gap: 6, alignItems: "flex-start" }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#3f2218", marginTop: 3, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 10.5, fontWeight: 700, color: "#2f1f17" }}>{e.jobtitle || "Role"}</div>
                    <div style={{ fontSize: 8.5, color: "#6b4a3b" }}>{e.jobstart || "2018"} - {e.jobend || "2019"} | {e.company || "Art Director"}</div>
                    <div style={{ fontSize: 8.5, color: "#4b5563", lineHeight: 1.45 }}>• {e.jobdesc || "Many desktop publishing packages and web page editors now use lorem ipsum as their default model text."}</div>
                  </div>
                </div>
              </div>
            ))}
            <div style={{ fontSize: 45, fontWeight: 700, color: "#2f1f17", fontStyle: "italic", marginTop: 4 }}>Education</div>
            <div style={{ height: 2, background: "#d7b79f", margin: "4px 0 8px" }} />
            <div style={{ borderLeft: "2px solid #cbb59d", paddingLeft: 8 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {(visibleEducation.length ? visibleEducation : [{ degree: "School of Lorana", school: "Bachelor Of Design", gradyear: "2010 - 2012" }, { degree: "University of Keithston.", school: "Master of Design", gradyear: "2015 - 2018" }]).slice(0, 2).map((e, i) => (
                  <div key={i} style={{ border: "1px solid #b8aa98", padding: "6px 6px 5px", background: "#e9e1d3" }}>
                    <div style={{ fontSize: 8, color: "#6b4a3b", marginBottom: 2 }}>{e.gradyear || ""}</div>
                    <div style={{ fontSize: 9, fontWeight: 700, color: "#2f1f17" }}>{e.degree}</div>
                    <div style={{ fontSize: 8.5, color: "#4b5563" }}>{e.school}</div>
                  </div>
                ))}
              </div>
            </div>
            <>
              <div style={{ fontSize: 34, fontWeight: 700, color: "#2f1f17", fontStyle: "italic", marginTop: 8 }}>Projects</div>
              <div style={{ height: 2, background: "#d7b79f", margin: "4px 0 8px" }} />
              {(visibleProjects.length ? visibleProjects : [{ name: "Project Name", description: "Project details go here." }]).slice(0, 3).map((p, i) => (
                <div key={i} style={{ fontSize: 8.8, color: "#4b5563", marginBottom: 5 }}>
                  <span style={{ fontWeight: 700, color: "#2f1f17" }}>{p.name}</span> - {p.description}
                </div>
              ))}
            </>
            <div style={{ fontSize: 9, color: "#6b4a3b", marginTop: 6 }}>{github || ""} {portfolio ? `| ${portfolio}` : ""}</div>
          </div>
        </div>
      </div>
    );
  }

  if (layout === "tealDataGrid") {
    return (
      <div style={{ fontFamily: font, minHeight: 700, background: "#fff", display: "grid", gridTemplateRows: "118px 1fr 95px" }}>
        <div style={{ background: accent, color: "#0f172a", padding: "14px 16px", display: "grid", gridTemplateColumns: "1fr 100px 1fr", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 42, fontWeight: 800, lineHeight: 0.9, textTransform: "uppercase" }}>{fname || "John"}<br />{lname || "Doe"}</div>
            <div style={{ fontSize: 10, marginTop: 3, textTransform: "uppercase", letterSpacing: "0.7px" }}>{title || "Art Director"}</div>
          </div>
          {showPhoto && photo ? (
            <div style={{ width: 86, height: 86, borderRadius: "50%", border: "3px solid #94a3b8", overflow: "hidden", background: "#d1d5db", justifySelf: "center" }}>
              <img src={photo} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          ) : <div />}
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", marginBottom: 3 }}>Professional Profile</div>
            <div style={{ fontSize: 9, color: "#1f2937", lineHeight: 1.5 }}>{summary || "About me summary text."}</div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <div style={{ background: "#4e8d83", color: "#e2e8f0", padding: "12px 12px" }}>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, textTransform: "uppercase" }}>Education</div>
            {visibleEducation.map((e, i) => <div key={i} style={{ marginBottom: 7, fontSize: 9 }}>{e.degree}<br /><span style={{ opacity: 0.85 }}>{e.school}</span></div>)}
            <div style={{ marginTop: 8, fontSize: 13, fontWeight: 700, textTransform: "uppercase" }}>Profession</div>
            <div style={{ fontSize: 9, marginTop: 3 }}>{title || "Art Director"}</div>
            <div style={{ marginTop: 10, fontSize: 15, fontWeight: 700, textTransform: "uppercase" }}>Skills</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5, marginTop: 6 }}>
              {skillList.slice(0, 8).map((s, i) => <div key={i} style={{ fontSize: 9 }}>• {s}</div>)}
            </div>
            {visibleLanguages.length > 0 && (
              <>
                <div style={{ marginTop: 10, fontSize: 13, fontWeight: 700, textTransform: "uppercase" }}>Languages</div>
                {visibleLanguages.map((l, i) => <div key={i} style={{ fontSize: 9, marginTop: 2 }}>{l.language} {l.langLevel ? `- ${l.langLevel}` : ""}</div>)}
              </>
            )}
          </div>
          <div style={{ background: "#f8fafc", padding: "12px 12px" }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", marginBottom: 8, textTransform: "uppercase" }}>Experience</div>
            {visibleExperience.map((e, i) => (
              <div key={i} style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 9, fontWeight: 700, color: accent }}>{e.jobstart || "2010"}</div>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#1f2937" }}>{e.jobtitle}</div>
                <div style={{ fontSize: 9, color: "#64748b" }}>{e.company}</div>
              </div>
            ))}
            <>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a", marginTop: 8, marginBottom: 5, textTransform: "uppercase" }}>Projects</div>
              {(visibleProjects.length ? visibleProjects : [{ name: "Project Name", description: "Project details go here." }]).slice(0, 3).map((p, i) => (
                <div key={i} style={{ marginBottom: 5 }}>
                  <div style={{ fontSize: 9.5, fontWeight: 700, color: "#1f2937" }}>{p.name}</div>
                  <div style={{ fontSize: 8.8, color: "#64748b" }}>{p.description}</div>
                </div>
              ))}
            </>
            <>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a", marginTop: 8, marginBottom: 5, textTransform: "uppercase" }}>Certifications</div>
              {(visibleCertifications.length ? visibleCertifications : [{ name: "Certification Name", issuer: "Issuer", year: "2025" }]).slice(0, 3).map((c, i) => (
                <div key={i} style={{ fontSize: 8.8, color: "#64748b", marginBottom: 4 }}>
                  <span style={{ fontWeight: 700, color: "#1f2937" }}>{c.name}</span> {[c.issuer, c.year].filter(Boolean).join(" | ")}
                </div>
              ))}
            </>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderTop: "2px solid #d1d5db" }}>
          <div style={{ background: "#6ea69e", color: "#0f172a", padding: "10px 12px" }}>
            <div style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", marginBottom: 4 }}>Interests</div>
            <div style={{ fontSize: 9, lineHeight: 1.45 }}>{interests || "Reading, design, travel."}</div>
          </div>
          <div style={{ background: "#0f4b5c", color: "#e2e8f0", padding: "10px 12px" }}>
            <div style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", marginBottom: 4 }}>Contact</div>
            <div style={{ fontSize: 9, lineHeight: 1.55 }}>{phone}<br />{email}<br />{linkedin}<br />{github}<br />{portfolio}</div>
          </div>
        </div>
      </div>
    );
  }

  if (layout === "multiColorRow") {
    return (
      <div style={{ fontFamily: font, minHeight: 700, background: "#fff", display: "grid", gridTemplateRows: "122px 1fr" }}>
        <div style={{ background: "#0b1f3a", color: "#fff", padding: "14px 14px 10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
            <div>
              <div style={{ fontSize: 34, fontWeight: 800, lineHeight: 0.95 }}>{fullName}</div>
              <div style={{ fontSize: 11, letterSpacing: "0.5px", textTransform: "uppercase", opacity: 0.9 }}>{title || "Professional Title"}</div>
            </div>
            {showPhoto && photo ? (
              <img src={photo} alt="Profile" style={{ width: 52, height: 52, borderRadius: 6, objectFit: "cover", border: "2px solid rgba(255,255,255,0.5)" }} />
            ) : null}
          </div>
          <div style={{ marginTop: 8, display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 6 }}>
            {["#facc15", "#f97316", "#1e3a8a", "#7f1d1d", "#ef4444", "#0ea5e9"].map((c, i) => (
              <div key={i} style={{ height: 8, borderRadius: 2, background: c }} />
            ))}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "0.33fr 0.67fr" }}>
          <div style={{ background: "#fff7ed", borderRight: "1px solid #e5e7eb", padding: "12px 10px" }}>
            <Section title="Contact"><div style={{ fontSize: 9 }}>{phone}<br />{email}<br />{linkedin}<br />{github}<br />{portfolio}</div></Section>
            <Section title="Profession"><div style={{ fontSize: 9 }}>{title || "Professional Title"}</div></Section>
            <Section title="Skills">{skillList.slice(0, 8).map((s, i) => <div key={i} style={{ fontSize: 9, marginBottom: 3 }}>• {s}</div>)}</Section>
            {visibleLanguages.length > 0 && <Section title="Languages">{visibleLanguages.map((l, i) => <div key={i} style={{ fontSize: 9 }}>{l.language} {l.langLevel ? `- ${l.langLevel}` : ""}</div>)}</Section>}
          </div>
          <div style={{ padding: "12px 12px" }}>
            <Section title="Professional Profile"><div style={{ fontSize: 9.5, color: "#4b5563", lineHeight: 1.5 }}>{summary}</div></Section>
            <Section title="Work Experience">
              {visibleExperience.map((e, i) => (
                <div key={i} style={{ marginBottom: 8 }}>
                  <div style={{ fontSize: 10, fontWeight: 700 }}>{e.jobtitle}</div>
                  <div style={{ fontSize: 9, color: "#6b7280" }}>{e.company} {e.jobstart ? `| ${e.jobstart} - ${e.jobend || "Present"}` : ""}</div>
                  <div style={{ fontSize: 9, color: "#4b5563" }}>{e.jobdesc}</div>
                </div>
              ))}
            </Section>
            <Section title="Projects">
              {(visibleProjects.length ? visibleProjects : [{ name: "Project Name", description: "Project details go here." }]).slice(0, 3).map((p, i) => (
                <div key={i} style={{ marginBottom: 5 }}>
                  <div style={{ fontSize: 9.5, fontWeight: 700 }}>{p.name}</div>
                  <div style={{ fontSize: 8.8, color: "#64748b" }}>{p.description}</div>
                </div>
              ))}
            </Section>
            <Section title="Certifications">
              {(visibleCertifications.length ? visibleCertifications : [{ name: "Certification Name", issuer: "Issuer", year: "2025" }]).slice(0, 3).map((c, i) => (
                <div key={i} style={{ fontSize: 8.8, color: "#64748b", marginBottom: 4 }}>
                  <span style={{ fontWeight: 700, color: "#1f2937" }}>{c.name}</span> {[c.issuer, c.year].filter(Boolean).join(" | ")}
                </div>
              ))}
            </Section>
            {interests && <Section title="Interests"><div style={{ fontSize: 9 }}>{interests}</div></Section>}
          </div>
        </div>
      </div>
    );
  }

  if (layout === "catExecutive") {
    return (
      <div style={{ fontFamily: font, minHeight: 700, background: "#fff", display: "grid", gridTemplateColumns: "0.31fr 0.69fr" }}>
        <div style={{ background: "#f8fafc", borderRight: "1px solid #cbd5e1", padding: "14px 10px" }}>
          {showPhoto && photo ? (
            <img src={photo} alt="Profile" style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover", border: "2px solid #1e3a8a", marginBottom: 10 }} />
          ) : (
            <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#1e3a8a", marginBottom: 10 }} />
          )}
          <Section title="Contact Info"><div style={{ fontSize: 9 }}>{phone}<br />{email}<br />{linkedin}</div></Section>
          <Section title="Skills">{skillList.slice(0, 6).map((s, i) => <div key={i} style={{ fontSize: 9 }}>{s}</div>)}</Section>
        </div>
        <div style={{ padding: "14px 12px" }}>
          <div style={{ fontSize: 34, fontWeight: 700, color: "#111827" }}>{fullName}</div>
          <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 8 }}>{title || "Title of Corporate"}</div>
          <Section title="Profile"><div style={{ fontSize: 9, color: "#4b5563" }}>{summary}</div></Section>
          <StandardMain />
        </div>
      </div>
    );
  }

  if (layout === "techMinimalist") {
    return (
      <div style={{ fontFamily: font, minHeight: 700, background: "#fff", padding: "14px 12px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "2px solid #cbd5e1", paddingBottom: 8, marginBottom: 10 }}>
          <div>
            <div style={{ fontSize: 28, fontWeight: 700 }}>{fullName}</div>
            <div style={{ fontSize: 10, textTransform: "uppercase", color: "#6b7280" }}>{title || "Title"}</div>
          </div>
          {profileImage}
        </div>
        <Section title="Experience">{visibleExperience.map((e, i) => <div key={i} style={{ fontSize: 9, marginBottom: 5 }}>{e.jobstart || "2018"} - {e.jobend || "2021"} | {e.jobtitle}</div>)}</Section>
        <Section title="Proficiencies">{skillList.slice(0, 10).map((s, i) => <span key={i} style={{ fontSize: 9, marginRight: 8 }}>{s}</span>)}</Section>
        <Section title="Contributions">{visibleProjects.map((p, i) => <div key={i} style={{ fontSize: 9 }}>- {p.name}</div>)}</Section>
      </div>
    );
  }

  if (layout === "modernCreativeMint") {
    return (
      <div style={{ fontFamily: font, background: "#fff" }}>
        <div style={{ background: "#c9ddca", padding: "10px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 44, fontWeight: 800, lineHeight: 0.88 }}>{fname || "ALEX"}<br />{lname || "CHEN"}</div>
          {profileImage}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <div style={{ borderRight: "1px solid #cbd5e1", padding: "10px" }}>
            <Section title="Portfolio"><div style={{ fontSize: 9 }}>{portfolio || "portfolio.com"}</div></Section>
            <Section title="Projects">{visibleProjects.map((p, i) => <div key={i} style={{ fontSize: 9, marginBottom: 4 }}>{p.name}</div>)}</Section>
          </div>
          <div style={{ padding: "10px" }}>
            <Section title="Details"><div style={{ fontSize: 9 }}>{phone}<br />{email}<br />{linkedin}</div></Section>
            <Section title="Work">{visibleExperience.map((e, i) => <div key={i} style={{ fontSize: 9, marginBottom: 4 }}>{e.jobtitle}</div>)}</Section>
          </div>
        </div>
      </div>
    );
  }

  if (layout === "warmProfessional") {
    return (
      <div style={{ fontFamily: font, minHeight: 700, background: "#fff", display: "grid", gridTemplateColumns: "0.68fr 0.32fr" }}>
        <div style={{ padding: "12px" }}>
          <div style={{ fontSize: 42, fontWeight: 700, color: "#2f1f17" }}>{fullName}</div>
          <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 8 }}>{title || "Title of Corporate"}</div>
          <Section title="Profile"><div style={{ fontSize: 9 }}>{summary}</div></Section>
          <Section title="Experience">{visibleExperience.map((e, i) => <div key={i} style={{ fontSize: 9, marginBottom: 5 }}>{e.jobtitle} - {e.company}</div>)}</Section>
          <Section title="Work Experience">{visibleProjects.map((p, i) => <div key={i} style={{ fontSize: 9 }}>{p.name}</div>)}</Section>
        </div>
        <div style={{ background: "#faf7f2", borderLeft: "1px solid #e5e7eb", padding: "12px 10px" }}>
          <Section title="Achievements">{visibleCertifications.map((c, i) => <div key={i} style={{ fontSize: 8.8, marginBottom: 4 }}>{c.name}</div>)}</Section>
          <Section title="Skills">{skillList.slice(0, 8).map((s, i) => <div key={i} style={{ fontSize: 8.8 }}>{s}</div>)}</Section>
          {profileImage}
        </div>
      </div>
    );
  }

  if (layout === "brownClassic") {
    return (
      <div style={{ fontFamily: font, minHeight: 700, background: "#fff", display: "grid", gridTemplateColumns: "0.38fr 0.62fr" }}>
        <div style={{ background: accent, color: "#fff", padding: "18px 12px" }}>
          <div style={{ height: 180, border: "4px solid #fff", marginBottom: 12, background: "rgba(255,255,255,0.15)", overflow: "hidden" }}>
            {showPhoto && photo && (
              <img
                src={photo}
                alt="Profile"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            )}
          </div>
          <Section title="Work Skills">{skillList.map((s, i) => <div key={i} style={{ fontSize: 9, color: "#fff" }}>• {s}</div>)}</Section>
          {visibleLanguages.length > 0 && <Section title="Language">{visibleLanguages.map((l, i) => <div key={i} style={{ fontSize: 9, color: "#fff" }}>{l.language}</div>)}</Section>}
          <Section title="Contact"><div style={{ fontSize: 9, color: "#fff" }}>{phone}<br />{email}<br />{portfolio}</div></Section>
        </div>
        <div style={{ padding: "18px 14px", background: "#f8fafc" }}>
          <div style={{ fontSize: 34, fontWeight: 700, color: accent, lineHeight: 1 }}>{fullName}</div>
          <div style={{ fontSize: 12, marginBottom: 10 }}>{title || "Graphic Designer"}</div>
          <StandardMain />
          {visibleCertifications.length > 0 && <Section title="Award & Achievement">{visibleCertifications.map((c, i) => <div key={i} style={{ fontSize: 10 }}>{c.name}</div>)}</Section>}
        </div>
      </div>
    );
  }

  if (layout === "coolBluePanel") {
    return (
      <div style={{ fontFamily: font, minHeight: 700, background: "#fff", display: "flex" }}>
        <div style={{ width: "36%", background: accent, color: "#fff", padding: "18px 14px" }}>
          <div style={{ height: "34px", background: "#1f2937", margin: "-18px -14px 14px", padding: "8px 14px", fontWeight: 700 }}>{fullName}</div>
          <Section title="Summary"><div style={{ fontSize: "10px", color: "#e2e8f0" }}>{summary}</div></Section>
          <Section title="Skills">{skillList.map((s, i) => <div key={i} style={{ fontSize: "9px", color: "#e2e8f0" }}>• {s}</div>)}</Section>
        </div>
        <div style={{ flex: 1, padding: "18px 14px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <div>
              <div style={{ fontSize: 30, fontWeight: 700, color: "#1e293b", lineHeight: 1 }}>{fullName}</div>
              <div style={{ fontSize: 11, color: "#475569" }}>{title || "Professional Title"}</div>
            </div>
            {profileImage}
          </div>
          <div style={{ fontSize: "9px", color: "#64748b", marginBottom: 8 }}>{email} {phone ? ` | ${phone}` : ""}</div>
          <StandardMain />
        </div>
      </div>
    );
  }

  if (layout === "noirTop") {
    return (
      <div style={{ fontFamily: font, minHeight: 700, background: "#fff" }}>
        <div style={{ background: accent, color: "#fff", padding: "22px 18px" }}>
          <div style={{ fontSize: 52, fontWeight: 700, lineHeight: 0.95 }}>{fname || "Jamie"}<br />{lname || "Chastain"}</div>
          <div style={{ marginTop: 8, fontSize: 10, color: "#cbd5e1" }}>{email} {phone ? ` | ${phone}` : ""}</div>
        </div>
        <div style={{ padding: "18px", display: "grid", gridTemplateColumns: "0.8fr 1.2fr", gap: 16 }}>
          <div>
            <div style={{ marginBottom: "8px" }}>{profileImage}</div>
            <Section title="Profile"><div style={{ fontSize: 10, color: "#475569" }}>{summary}</div></Section>
            <Section title="Skills">{skillList.map((s, i) => <div key={i} style={{ fontSize: 9 }}>• {s}</div>)}</Section>
            <Section title="Education">{visibleEducation.map((e, i) => <div key={i} style={{ fontSize: 10, marginBottom: 4 }}>{e.degree}</div>)}</Section>
          </div>
          <div>
            <Section title="Experience">{visibleExperience.map((e, i) => <div key={i} style={{ fontSize: 10, marginBottom: 6 }}>{e.jobtitle} - {e.company}</div>)}</Section>
          </div>
        </div>
      </div>
    );
  }

  if (layout === "noirHeroExact") {
    return (
      <div style={{ fontFamily: font, minHeight: 700, background: "#fff" }}>
        <div style={{ background: accent, color: "#fff", display: "grid", gridTemplateColumns: "0.42fr 0.58fr", minHeight: 220 }}>
          <div style={{ overflow: "hidden" }}>
            {showPhoto && photo ? (
              <img src={photo} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(100%)" }} />
            ) : null}
          </div>
          <div style={{ padding: "18px 16px" }}>
            <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 0.9 }}>{fname || "Jamie"}<br />{lname || "Chastain"}</div>
            <div style={{ fontSize: 10, color: "#cbd5e1", marginTop: 10 }}>{email}<br />{phone}<br />{portfolio || linkedin}</div>
          </div>
        </div>
        <div style={{ padding: "16px", display: "grid", gridTemplateColumns: "0.42fr 0.58fr", gap: 16 }}>
          <div>
            <Section title="Project Manager"><div style={{ fontSize: 10, color: "#475569" }}>{summary}</div></Section>
            <Section title="Skills">{skillList.map((s, i) => <div key={i} style={{ fontSize: 9, marginBottom: 2 }}>• {s}</div>)}</Section>
            <Section title="Education">{visibleEducation.map((e, i) => <div key={i} style={{ fontSize: 10, marginBottom: 5 }}>{e.degree}<br /><span style={{ color: "#64748b" }}>{e.school}</span></div>)}</Section>
            {visibleLanguages.length > 0 && <Section title="Language">{visibleLanguages.map((l, i) => <div key={i} style={{ fontSize: 9 }}>{l.language}</div>)}</Section>}
          </div>
          <div>
            <Section title="Experience">{visibleExperience.map((e, i) => <div key={i} style={{ fontSize: 10, marginBottom: 7 }}>{e.jobtitle}<br /><span style={{ color: "#64748b" }}>{e.company}</span></div>)}</Section>
          </div>
        </div>
      </div>
    );
  }

  if (layout === "purpleCurve") {
    return (
      <div style={{ fontFamily: font, minHeight: 700, background: "#fff", padding: 16 }}>
        <div style={{ background: accent, borderRadius: "0 18px 18px 0", color: "#fff", padding: "16px 16px 12px", marginBottom: 12 }}>
          <div style={{ fontSize: 34, fontWeight: 700 }}>{fname || "NAME"} <span style={{ opacity: 0.9 }}>{lname || "SURNAME"}</span></div>
          <div style={{ fontSize: 11 }}>{title || "Professional Title"}</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: 16 }}>
          <div>
            <div style={{ marginBottom: "8px" }}>{profileImage}</div>
            <Section title="Education">{visibleEducation.map((e, i) => <div key={i} style={{ fontSize: 10, marginBottom: 4 }}>{e.degree}</div>)}</Section>
            <Section title="Hobbies"><div style={{ fontSize: 10, color: "#475569" }}>{interests || "Reading, Travel, Sports"}</div></Section>
          </div>
          <div>
            <Section title="Work Experience">{visibleExperience.map((e, i) => <div key={i} style={{ fontSize: 10, marginBottom: 6 }}>{e.jobtitle} - {e.company}</div>)}</Section>
          </div>
        </div>
      </div>
    );
  }

  if (layout === "mintGeo") {
    return (
      <div style={{ fontFamily: font, minHeight: 700, background: "#fff", padding: "20px 22px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 14, top: 0, width: 2, height: "100%", background: accent }} />
        <div style={{ position: "absolute", left: 14, top: 40, width: 145, height: 2, background: accent, transform: "rotate(34deg)", transformOrigin: "left center" }} />
        <div style={{ position: "absolute", left: 155, top: 28, right: 0, height: 2, background: accent }} />
        <div style={{ position: "absolute", left: 38, top: 32, width: 92, height: 62, border: `2px solid ${accent}`, clipPath: "polygon(0 0, 100% 0, 0 100%)", opacity: 0.9 }} />
        <div style={{ marginLeft: 26 }}>
          <div style={{ display: "grid", gridTemplateColumns: "106px 1fr", gap: 12, marginBottom: 10 }}>
            <div style={{ marginTop: 12, width: 58, height: 58, border: `2px solid ${accent}`, background: "#fff", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {showPhoto && photo ? <img src={photo} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : null}
            </div>
            <div style={{ paddingTop: 2 }}>
              <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "0.5px", lineHeight: 1.05, color: "#1f2937" }}>{fname || "FIRSTNAME"}<br /><span style={{ color: accent }}>{lname || "LASTNAME"}</span></div>
              <div style={{ fontSize: 10, marginTop: 3, marginBottom: 6, color: "#374151" }}>{title || "Professional Title"}</div>
              <div style={{ fontSize: 9, color: "#64748b", lineHeight: 1.45 }}>{email}<br />{phone}<br />{linkedin}</div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div>
              <Section title="Profile"><div style={{ fontSize: 9, color: "#4b5563", lineHeight: 1.45 }}>{summary}</div></Section>
              <Section title="Work Experience">
                {visibleExperience.map((e, i) => (
                  <div key={i} style={{ marginBottom: 7 }}>
                    <div style={{ fontSize: 9, color: accent, fontWeight: 700 }}>{e.jobstart || ""}-{e.jobend || ""}</div>
                    <div style={{ fontSize: 9, fontWeight: 700, color: "#1f2937" }}>{e.jobtitle}</div>
                    <div style={{ fontSize: 8.5, color: "#64748b" }}>{e.company}</div>
                  </div>
                ))}
              </Section>
            </div>
            <div>
              <Section title="Contact"><div style={{ fontSize: 9, color: "#4b5563", lineHeight: 1.45 }}>{email}<br />{phone}<br />{linkedin}</div></Section>
              <Section title="Skills">{skillList.map((s, i) => <div key={i} style={{ fontSize: 9, borderBottom: `1px solid ${accent}66`, marginBottom: 2 }}>{s}</div>)}</Section>
              <Section title="Education">{visibleEducation.map((e, i) => <div key={i} style={{ fontSize: 8.5, marginBottom: 4 }}>{e.degree}<br /><span style={{ color: "#64748b" }}>{e.school}</span></div>)}</Section>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (layout === "resumeioSidebar") {
    return (
      <div style={{ fontFamily: font, minHeight: 700, background: "#fff", display: "flex" }}>
        <div style={{ width: "31%", background: accent, color: "#fff", padding: "18px 12px" }}>
          <div style={{ marginBottom: "8px" }}>{profileImage}</div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>{fullName}</div>
          <div style={{ fontSize: 10, marginBottom: 8 }}>{title}</div>
          <div style={{ height: 1, background: "rgba(255,255,255,.35)", marginBottom: 8 }} />
          <div style={{ fontSize: 9, lineHeight: 1.6 }}>{email}<br />{phone}<br />{linkedin}</div>
        </div>
        <div style={{ flex: 1, padding: "18px 14px" }}><StandardMain /></div>
      </div>
    );
  }

  if (layout === "resumeioDark") {
    return (
      <div style={{ fontFamily: font, minHeight: 700, background: "#fff", display: "flex" }}>
        <div style={{ width: "34%", background: "#0f2942", color: "#e2e8f0", padding: "18px 12px" }}>
          <div style={{ marginBottom: "8px" }}>{profileImage}</div>
          <div style={{ fontSize: 24, color: "#fff", fontWeight: 700 }}>{fullName}</div>
          <div style={{ fontSize: 10, marginBottom: 8 }}>{title}</div>
          <div style={{ fontSize: 9 }}>{email}<br />{phone}</div>
        </div>
        <div style={{ flex: 1, padding: "18px 14px", background: "#f8fafc" }}><StandardMain /></div>
      </div>
    );
  }

  if (layout === "resumeioBoxed") {
    return (
      <div style={{ fontFamily: font, minHeight: 700, background: "#fff", padding: 18 }}>
        <div style={{ border: "1px solid #94a3b8", padding: "10px 12px", width: "68%", margin: "0 auto 12px", textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "6px" }}>{profileImage}</div>
          <div style={{ fontSize: 26, fontWeight: 700 }}>{fullName}</div>
          <div style={{ fontSize: 10, color: "#64748b" }}>{title}</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "0.8fr 1.2fr", gap: 12 }}>
          <div style={{ borderRight: "1px solid #cbd5e1", paddingRight: 10 }}>
            <Section title="Details"><div style={{ fontSize: 10 }}>{email}<br />{phone}<br />{linkedin}</div></Section>
          </div>
          <div><StandardMain /></div>
        </div>
      </div>
    );
  }

  if (layout === "resumeio" || layout === "resumeioClean") {
    return (
      <div style={{ fontFamily: font, minHeight: 700, background: "#fff", display: "flex" }}>
        <div style={{ width: "30%", background: "#f8fafc", borderRight: "1px solid #cbd5e1", padding: "18px 12px" }}>
          <div style={{ marginBottom: "8px" }}>{profileImage}</div>
          <Section title="Details"><div style={{ fontSize: 10 }}>{email}<br />{phone}<br />{linkedin}<br />{github}<br />{portfolio}</div></Section>
          <Section title="Skills">{skillList.map((s, i) => <div key={i} style={{ fontSize: 9, borderBottom: "1px solid #e2e8f0", marginBottom: 2 }}>{s}</div>)}</Section>
          {visibleLanguages.length > 0 && <Section title="Languages">{visibleLanguages.map((l, i) => <div key={i} style={{ fontSize: 9 }}>{l.language} {l.langLevel ? `- ${l.langLevel}` : ""}</div>)}</Section>}
        </div>
        <div style={{ flex: 1, padding: "18px 14px" }}>
          <div style={{ fontSize: 34, fontWeight: 700, color: "#0f172a", lineHeight: 1 }}>{fullName}</div>
          <div style={{ fontSize: 11, color: "#64748b", textTransform: "uppercase", marginBottom: 10 }}>{title || "Professional Title"}</div>
          <StandardMain />
          {visibleCertifications.length > 0 && <Section title="Certifications">{visibleCertifications.map((c, i) => <div key={i} style={{ fontSize: 10 }}>{c.name} {[c.issuer, c.year].filter(Boolean).join(" | ")}</div>)}</Section>}
          {interests && <Section title="Interests"><div style={{ fontSize: 10 }}>{interests}</div></Section>}
        </div>
      </div>
    );
  }

  if (layout === "sidebar") {
    return (
      <div style={{ fontFamily: font, minHeight: 700, background: "#fff", display: "flex" }}>
        <div style={{ width: "33%", background: accent, color: "#fff", padding: "20px 14px" }}>
          <div style={{ marginBottom: "8px" }}>{profileImage}</div>
          <div style={{ fontSize: 22, fontWeight: 700 }}>{fullName}</div>
          <div style={{ fontSize: 10, marginBottom: 8 }}>{title}</div>
          <div style={{ fontSize: 9, lineHeight: 1.6 }}>{email}<br />{phone}<br />{linkedin}</div>
        </div>
        <div style={{ flex: 1, padding: "20px 14px" }}><StandardMain /></div>
      </div>
    );
  }

  if (layout === "corporate") {
    return (
      <div style={{ fontFamily: font, background: "#fff", padding: "20px" }}>
        <div style={{ borderBottom: `3px solid ${accent}`, marginBottom: 12, paddingBottom: 10 }}>
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "6px" }}>{profileImage}</div>
          <div style={{ fontSize: 30, fontWeight: 700 }}>{fullName}</div>
          <div style={{ fontSize: 12, color: accent }}>{title}</div>
          <div style={{ fontSize: 9, color: "#64748b" }}>{email} {phone ? `| ${phone}` : ""} {linkedin ? `| ${linkedin}` : ""} {github ? `| ${github}` : ""}</div>
        </div>
        <Section title="Professional Profile"><div style={{ fontSize: 10, color: "#475569", lineHeight: 1.5 }}>{summary}</div></Section>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div>
            <Section title="Experience">{visibleExperience.map((e, i) => <div key={i} style={{ fontSize: 10, marginBottom: 6 }}>{e.jobtitle} - {e.company}</div>)}</Section>
            <Section title="Projects">
              {(visibleProjects.length ? visibleProjects : [{ name: "Project Name", description: "Project details go here." }]).slice(0, 3).map((p, i) => (
                <div key={i} style={{ fontSize: 9.5, marginBottom: 5 }}>
                  <div style={{ fontWeight: 700 }}>{p.name}</div>
                  <div style={{ color: "#64748b" }}>{p.description}</div>
                </div>
              ))}
            </Section>
          </div>
          <div>
            <Section title="Education">{visibleEducation.map((e, i) => <div key={i} style={{ fontSize: 10, marginBottom: 6 }}>{e.degree}<br /><span style={{ color: "#64748b" }}>{e.school}</span></div>)}</Section>
            <Section title="Certifications">
              {(visibleCertifications.length ? visibleCertifications : [{ name: "Certification Name", issuer: "Issuer", year: "2025" }]).slice(0, 3).map((c, i) => (
                <div key={i} style={{ fontSize: 9, marginBottom: 4 }}>
                  <span style={{ fontWeight: 700 }}>{c.name}</span> {[c.issuer, c.year].filter(Boolean).join(" | ")}
                </div>
              ))}
            </Section>
            {visibleLanguages.length > 0 && <Section title="Languages">{visibleLanguages.map((l, i) => <div key={i} style={{ fontSize: 9 }}>{l.language} {l.langLevel ? `- ${l.langLevel}` : ""}</div>)}</Section>}
            {interests && <Section title="Interests"><div style={{ fontSize: 9 }}>{interests}</div></Section>}
          </div>
        </div>
      </div>
    );
  }

  if (layout === "top") {
    return (
      <div style={{ fontFamily: font, background: "#fff" }}>
        <div style={{ background: accent, color: "#fff", padding: "18px 18px 14px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
            <div>
              <div style={{ fontSize: 32, fontWeight: 700, lineHeight: 1 }}>{fullName}</div>
              <div style={{ fontSize: 12, opacity: 0.95 }}>{title || "Professional Title"}</div>
              <div style={{ fontSize: 9, marginTop: 6 }}>{email} {phone ? `| ${phone}` : ""} {linkedin ? `| ${linkedin}` : ""}</div>
            </div>
            {profileImage}
          </div>
        </div>
        <div style={{ padding: "16px 18px" }}>
          <Section title="Professional Profile"><div style={{ fontSize: 10, color: "#475569", lineHeight: 1.5 }}>{summary}</div></Section>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div>
              <Section title="Work Experience">{visibleExperience.map((e, i) => <div key={i} style={{ fontSize: 10, marginBottom: 6 }}>{e.jobtitle}<br /><span style={{ color: "#64748b" }}>{e.company}</span></div>)}</Section>
              <Section title="Projects">
                {(visibleProjects.length ? visibleProjects : [{ name: "Project Name", description: "Project details go here." }]).slice(0, 3).map((p, i) => (
                  <div key={i} style={{ fontSize: 9.5, marginBottom: 5 }}>
                    <div style={{ fontWeight: 700 }}>{p.name}</div>
                    <div style={{ color: "#64748b" }}>{p.description}</div>
                  </div>
                ))}
              </Section>
            </div>
            <div>
              <Section title="Education">{visibleEducation.map((e, i) => <div key={i} style={{ fontSize: 10, marginBottom: 6 }}>{e.degree}<br /><span style={{ color: "#64748b" }}>{e.school}</span></div>)}</Section>
              <Section title="Certifications">
                {(visibleCertifications.length ? visibleCertifications : [{ name: "Certification Name", issuer: "Issuer", year: "2025" }]).slice(0, 3).map((c, i) => (
                  <div key={i} style={{ fontSize: 9, marginBottom: 4 }}>
                    <span style={{ fontWeight: 700 }}>{c.name}</span> {[c.issuer, c.year].filter(Boolean).join(" | ")}
                  </div>
                ))}
              </Section>
              {visibleLanguages.length > 0 && <Section title="Languages">{visibleLanguages.map((l, i) => <div key={i} style={{ fontSize: 9 }}>{l.language} {l.langLevel ? `- ${l.langLevel}` : ""}</div>)}</Section>}
              {interests && <Section title="Interests"><div style={{ fontSize: 9 }}>{interests}</div></Section>}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (layout === "minimal") {
    return (
      <div style={{ fontFamily: font, minHeight: 700, background: "#fff", padding: "20px" }}>
        <div style={{ textAlign: "center", marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "8px" }}>{profileImage}</div>
          <div style={{ fontSize: 30, fontWeight: 400 }}>{fullName}</div>
          <div style={{ fontSize: 12, color: accent }}>{title}</div>
        </div>
        <StandardMain />
      </div>
    );
  }

  return (
    <div style={{ fontFamily: font, minHeight: 700, background: "#fff" }}>
      <div style={{ background: accent, color: "#fff", padding: "22px 20px" }}>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "6px" }}>{profileImage}</div>
        <div style={{ fontSize: 30, fontWeight: 700 }}>{fullName}</div>
        <div style={{ fontSize: 12, opacity: 0.9 }}>{title || "Professional Title"}</div>
        <div style={{ fontSize: 9, marginTop: 6 }}>{email} {phone ? `| ${phone}` : ""} {linkedin ? `| ${linkedin}` : ""}</div>
      </div>
      <div style={{ padding: "20px" }}><StandardMain /></div>
    </div>
  );
};

export default ResumePreview;