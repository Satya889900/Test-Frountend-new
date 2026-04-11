import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout";

function ResumeEditor() {
  const navigate = useNavigate();
  const { templateName } = useParams();
  const [user, setUser] = useState({ name: "Satya" });
  const [loading, setLoading] = useState(true);
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      website: ""
    },
    summary: "",
    experience: [
      {
        id: 1,
        company: "",
        position: "",
        location: "",
        startDate: "",
        endDate: "",
        description: ""
      }
    ],
    education: [
      {
        id: 1,
        institution: "",
        degree: "",
        field: "",
        graduationDate: "",
        gpa: ""
      }
    ],
    skills: [],
    certifications: []
  });

  const templates = {
    professional: {
      name: "Professional",
      color: "#7c3aed",
      layout: "traditional"
    },
    modern: {
      name: "Modern",
      color: "#db2777",
      layout: "contemporary"
    },
    creative: {
      name: "Creative",
      color: "#22c55e",
      layout: "unique"
    },
    minimal: {
      name: "Minimal",
      color: "#eab308",
      layout: "clean"
    },
    classic: {
      name: "Classic",
      color: "#3b82f6",
      layout: "timeless"
    },
    bold: {
      name: "Bold",
      color: "#ef4444",
      layout: "impactful"
    },
    word: {
      name: "Word",
      color: "#0ea5e9",
      layout: "download"
    },
    "google-docs": {
      name: "Google Docs",
      color: "#2563eb",
      layout: "download"
    },
    "ats-friendly": {
      name: "ATS Friendly",
      color: "#8b5cf6",
      layout: "optimized"
    },
    "cover-letter": {
      name: "Cover Letter",
      color: "#f97316",
      layout: "letter"
    }
  };

  const currentTemplate = templates[templateName] || templates.professional;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    setTimeout(() => setLoading(false), 600);
  }, [navigate]);

  const handleInputChange = (section, field, value, index = null) => {
    setResumeData(prev => {
      if (index !== null) {
        // Handle array fields
        const newArray = [...prev[section]];
        newArray[index] = { ...newArray[index], [field]: value };
        return { ...prev, [section]: newArray };
      } else if (typeof prev[section] === 'object' && !Array.isArray(prev[section])) {
        // Handle nested objects
        return {
          ...prev,
          [section]: { ...prev[section], [field]: value }
        };
      } else {
        // Handle direct fields
        return { ...prev, [field]: value };
      }
    });
  };

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, {
        id: Date.now(),
        company: "",
        position: "",
        location: "",
        startDate: "",
        endDate: "",
        description: ""
      }]
    }));
  };

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, {
        id: Date.now(),
        institution: "",
        degree: "",
        field: "",
        graduationDate: "",
        gpa: ""
      }]
    }));
  };

  const addSkill = () => {
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, ""]
    }));
  };

  const handleSkillChange = (index, value) => {
    setResumeData(prev => {
      const newSkills = [...prev.skills];
      newSkills[index] = value;
      return { ...prev, skills: newSkills };
    });
  };

  const removeItem = (section, index) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#faf9ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 56, height: 56, border: "5px solid #e0d4ff", borderTopColor: "#7c3aed", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
      </div>
    );
  }

  return (
    <Layout userName={user.name} showLogout={true}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

        * { font-family: 'Plus Jakarta Sans', sans-serif; }

        @keyframes spin { to { transform: rotate(360deg); } }

        .form-group {
          margin-bottom: 20px;
        }

        .form-label {
          display: block;
          font-weight: 600;
          color: #374151;
          margin-bottom: 8px;
          font-size: 14px;
        }

        .form-input {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          font-size: 16px;
          transition: border-color 0.2s ease;
        }

        .form-input:focus {
          outline: none;
          border-color: ${currentTemplate.color};
          box-shadow: 0 0 0 3px ${currentTemplate.color}20;
        }

        .form-textarea {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          font-size: 16px;
          min-height: 100px;
          resize: vertical;
          transition: border-color 0.2s ease;
        }

        .form-textarea:focus {
          outline: none;
          border-color: ${currentTemplate.color};
          box-shadow: 0 0 0 3px ${currentTemplate.color}20;
        }

        .section-card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 24px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          border: 1px solid #e5e7eb;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .section-title {
          font-size: 20px;
          font-weight: 700;
          color: #111827;
          margin: 0;
        }

        .add-button {
          background: ${currentTemplate.color};
          color: white;
          border: none;
          border-radius: 8px;
          padding: 8px 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .add-button:hover {
          background: ${currentTemplate.color}dd;
        }

        .remove-button {
          background: #ef4444;
          color: white;
          border: none;
          border-radius: 6px;
          padding: 4px 8px;
          font-size: 12px;
          cursor: pointer;
          margin-top: 8px;
        }

        .skill-input {
          display: flex;
          gap: 8px;
          align-items: center;
          margin-bottom: 8px;
        }

        .skill-input input {
          flex: 1;
        }

        .preview-section {
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          border: 1px solid #e5e7eb;
          margin-bottom: 24px;
        }
      `}</style>

      {/* Header */}
      <div style={{
        background: "linear-gradient(90deg, #f8fafc 0%, #eef2ff 50%, #f8f4ff 100%)",
        borderRadius: "28px",
        padding: "32px 40px",
        marginBottom: "32px",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 20px 60px rgba(124,58,237,0.08)",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={{ fontSize: "32px", margin: "0 0 8px 0", color: "#111827" }}>
              {currentTemplate.name} Resume Template
            </h1>
            <p style={{ color: "#6b7280", margin: 0 }}>
              Fill in your information to create a professional resume
            </p>
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={() => navigate("/resume-builder")}
              style={{
                background: "white",
                color: "#6b21a8",
                border: "1px solid rgba(124,58,237,0.15)",
                borderRadius: "14px",
                padding: "12px 22px",
                cursor: "pointer",
                fontWeight: 700,
              }}
            >
              ← Back to templates
            </button>
            <button
              style={{
                background: currentTemplate.color,
                color: "white",
                border: "none",
                borderRadius: "14px",
                padding: "12px 22px",
                cursor: "pointer",
                fontWeight: 700,
              }}
            >
              Download PDF
            </button>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: "32px" }}>
        {/* Form Section */}
        <div>
          {/* Personal Information */}
          <div className="section-card">
            <div className="section-header">
              <h2 className="section-title">Personal Information</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={resumeData.personalInfo.fullName}
                  onChange={(e) => handleInputChange('personalInfo', 'fullName', e.target.value)}
                  placeholder="John Doe"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-input"
                  value={resumeData.personalInfo.email}
                  onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                  placeholder="john@example.com"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  className="form-input"
                  value={resumeData.personalInfo.phone}
                  onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  className="form-input"
                  value={resumeData.personalInfo.location}
                  onChange={(e) => handleInputChange('personalInfo', 'location', e.target.value)}
                  placeholder="New York, NY"
                />
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="section-card">
            <div className="section-header">
              <h2 className="section-title">Professional Summary</h2>
            </div>
            <div className="form-group">
              <label className="form-label">Summary</label>
              <textarea
                className="form-textarea"
                value={resumeData.summary}
                onChange={(e) => handleInputChange(null, 'summary', e.target.value)}
                placeholder="Brief overview of your professional background and key strengths..."
              />
            </div>
          </div>

          {/* Experience */}
          <div className="section-card">
            <div className="section-header">
              <h2 className="section-title">Work Experience</h2>
              <button className="add-button" onClick={addExperience}>+ Add Experience</button>
            </div>
            {resumeData.experience.map((exp, index) => (
              <div key={exp.id} style={{ marginBottom: "24px", padding: "20px", background: "#f9fafb", borderRadius: "12px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                  <div className="form-group">
                    <label className="form-label">Company</label>
                    <input
                      type="text"
                      className="form-input"
                      value={exp.company}
                      onChange={(e) => handleInputChange('experience', 'company', e.target.value, index)}
                      placeholder="Company Name"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Position</label>
                    <input
                      type="text"
                      className="form-input"
                      value={exp.position}
                      onChange={(e) => handleInputChange('experience', 'position', e.target.value, index)}
                      placeholder="Job Title"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Location</label>
                    <input
                      type="text"
                      className="form-input"
                      value={exp.location}
                      onChange={(e) => handleInputChange('experience', 'location', e.target.value, index)}
                      placeholder="City, State"
                    />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                    <div className="form-group">
                      <label className="form-label">Start Date</label>
                      <input
                        type="text"
                        className="form-input"
                        value={exp.startDate}
                        onChange={(e) => handleInputChange('experience', 'startDate', e.target.value, index)}
                        placeholder="Jan 2020"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">End Date</label>
                      <input
                        type="text"
                        className="form-input"
                        value={exp.endDate}
                        onChange={(e) => handleInputChange('experience', 'endDate', e.target.value, index)}
                        placeholder="Present"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-textarea"
                    value={exp.description}
                    onChange={(e) => handleInputChange('experience', 'description', e.target.value, index)}
                    placeholder="Describe your responsibilities and achievements..."
                  />
                </div>
                {resumeData.experience.length > 1 && (
                  <button className="remove-button" onClick={() => removeItem('experience', index)}>
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="section-card">
            <div className="section-header">
              <h2 className="section-title">Education</h2>
              <button className="add-button" onClick={addEducation}>+ Add Education</button>
            </div>
            {resumeData.education.map((edu, index) => (
              <div key={edu.id} style={{ marginBottom: "24px", padding: "20px", background: "#f9fafb", borderRadius: "12px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                  <div className="form-group">
                    <label className="form-label">Institution</label>
                    <input
                      type="text"
                      className="form-input"
                      value={edu.institution}
                      onChange={(e) => handleInputChange('education', 'institution', e.target.value, index)}
                      placeholder="University Name"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Degree</label>
                    <input
                      type="text"
                      className="form-input"
                      value={edu.degree}
                      onChange={(e) => handleInputChange('education', 'degree', e.target.value, index)}
                      placeholder="Bachelor's Degree"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Field of Study</label>
                    <input
                      type="text"
                      className="form-input"
                      value={edu.field}
                      onChange={(e) => handleInputChange('education', 'field', e.target.value, index)}
                      placeholder="Computer Science"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Graduation Date</label>
                    <input
                      type="text"
                      className="form-input"
                      value={edu.graduationDate}
                      onChange={(e) => handleInputChange('education', 'graduationDate', e.target.value, index)}
                      placeholder="May 2024"
                    />
                  </div>
                </div>
                {resumeData.education.length > 1 && (
                  <button className="remove-button" onClick={() => removeItem('education', index)}>
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className="section-card">
            <div className="section-header">
              <h2 className="section-title">Skills</h2>
              <button className="add-button" onClick={addSkill}>+ Add Skill</button>
            </div>
            {resumeData.skills.map((skill, index) => (
              <div key={index} className="skill-input">
                <input
                  type="text"
                  className="form-input"
                  value={skill}
                  onChange={(e) => handleSkillChange(index, e.target.value)}
                  placeholder="Enter a skill..."
                />
                {resumeData.skills.length > 0 && (
                  <button className="remove-button" onClick={() => removeItem('skills', index)}>
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Preview Section */}
        <div>
          <div className="preview-section">
            <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#111827", margin: "0 0 20px 0" }}>
              Resume Preview
            </h3>
            <div style={{
              background: "#f9fafb",
              borderRadius: "12px",
              padding: "20px",
              minHeight: "600px",
              border: "2px dashed #d1d5db"
            }}>
              <div style={{ textAlign: "center", color: "#6b7280", padding: "40px" }}>
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>📄</div>
                <p style={{ fontSize: "16px", margin: "0 0 8px 0" }}>Live Preview</p>
                <p style={{ fontSize: "14px", margin: 0 }}>
                  Your resume preview will appear here as you fill in the information
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ResumeEditor;