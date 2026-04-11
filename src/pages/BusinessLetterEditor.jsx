import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";

function BusinessLetterEditor() {
  const navigate = useNavigate();
  const { templateName } = useParams();
  const [user, setUser] = useState({ name: "Satya" });
  const [loading, setLoading] = useState(true);
  const [letterData, setLetterData] = useState({
    senderInfo: {
      name: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      email: "",
      phone: ""
    },
    recipientInfo: {
      name: "",
      title: "",
      company: "",
      address: "",
      city: "",
      state: "",
      zipCode: ""
    },
    date: "",
    subject: "",
    salutation: "Dear",
    recipientName: "",
    body: "",
    closing: "Sincerely",
    signature: ""
  });

  const templates = {
    professional: {
      name: "Professional",
      color: "#7c3aed",
      layout: "traditional"
    },
    formal: {
      name: "Formal",
      color: "#db2777",
      layout: "business"
    },
    modern: {
      name: "Modern",
      color: "#22c55e",
      layout: "contemporary"
    },
    minimal: {
      name: "Minimal",
      color: "#eab308",
      layout: "clean"
    },
    corporate: {
      name: "Corporate",
      color: "#3b82f6",
      layout: "corporate"
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
    "cover-letter": {
      name: "Cover Letter",
      color: "#f97316",
      layout: "letter"
    },
    complaint: {
      name: "Complaint",
      color: "#ef4444",
      layout: "formal"
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

  const handleInputChange = (section, field, value) => {
    if (typeof value === 'object' && value !== null) {
      // Handle nested objects
      setLetterData(prev => ({
        ...prev,
        [section]: { ...prev[section], ...value }
      }));
    } else if (section in letterData && typeof letterData[section] === 'object') {
      // Handle nested object fields
      setLetterData(prev => ({
        ...prev,
        [section]: { ...prev[section], [field]: value }
      }));
    } else {
      // Handle direct fields
      setLetterData(prev => ({
        ...prev,
        [field]: value
      }));
    }
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
          min-height: 120px;
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
              {currentTemplate.name} Business Letter Template
            </h1>
            <p style={{ color: "#6b7280", margin: 0 }}>
              Create a professional business letter with proper formatting
            </p>
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={() => navigate("/letter-builder")}
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
          {/* Sender Information */}
          <div className="section-card">
            <div className="section-header">
              <h2 className="section-title">Your Information (Sender)</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={letterData.senderInfo.name}
                  onChange={(e) => handleInputChange('senderInfo', 'name', e.target.value)}
                  placeholder="John Doe"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-input"
                  value={letterData.senderInfo.email}
                  onChange={(e) => handleInputChange('senderInfo', 'email', e.target.value)}
                  placeholder="john@example.com"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  className="form-input"
                  value={letterData.senderInfo.phone}
                  onChange={(e) => handleInputChange('senderInfo', 'phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Address</label>
              <input
                type="text"
                className="form-input"
                value={letterData.senderInfo.address}
                onChange={(e) => handleInputChange('senderInfo', 'address', e.target.value)}
                placeholder="123 Main Street"
              />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "16px" }}>
              <div className="form-group">
                <label className="form-label">City</label>
                <input
                  type="text"
                  className="form-input"
                  value={letterData.senderInfo.city}
                  onChange={(e) => handleInputChange('senderInfo', 'city', e.target.value)}
                  placeholder="New York"
                />
              </div>
              <div className="form-group">
                <label className="form-label">State</label>
                <input
                  type="text"
                  className="form-input"
                  value={letterData.senderInfo.state}
                  onChange={(e) => handleInputChange('senderInfo', 'state', e.target.value)}
                  placeholder="NY"
                />
              </div>
              <div className="form-group">
                <label className="form-label">ZIP Code</label>
                <input
                  type="text"
                  className="form-input"
                  value={letterData.senderInfo.zipCode}
                  onChange={(e) => handleInputChange('senderInfo', 'zipCode', e.target.value)}
                  placeholder="10001"
                />
              </div>
            </div>
          </div>

          {/* Recipient Information */}
          <div className="section-card">
            <div className="section-header">
              <h2 className="section-title">Recipient Information</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div className="form-group">
                <label className="form-label">Recipient Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={letterData.recipientInfo.name}
                  onChange={(e) => handleInputChange('recipientInfo', 'name', e.target.value)}
                  placeholder="Jane Smith"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-input"
                  value={letterData.recipientInfo.title}
                  onChange={(e) => handleInputChange('recipientInfo', 'title', e.target.value)}
                  placeholder="Human Resources Manager"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Company</label>
                <input
                  type="text"
                  className="form-input"
                  value={letterData.recipientInfo.company}
                  onChange={(e) => handleInputChange('recipientInfo', 'company', e.target.value)}
                  placeholder="ABC Corporation"
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Address</label>
              <input
                type="text"
                className="form-input"
                value={letterData.recipientInfo.address}
                onChange={(e) => handleInputChange('recipientInfo', 'address', e.target.value)}
                placeholder="456 Business Ave"
              />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "16px" }}>
              <div className="form-group">
                <label className="form-label">City</label>
                <input
                  type="text"
                  className="form-input"
                  value={letterData.recipientInfo.city}
                  onChange={(e) => handleInputChange('recipientInfo', 'city', e.target.value)}
                  placeholder="Los Angeles"
                />
              </div>
              <div className="form-group">
                <label className="form-label">State</label>
                <input
                  type="text"
                  className="form-input"
                  value={letterData.recipientInfo.state}
                  onChange={(e) => handleInputChange('recipientInfo', 'state', e.target.value)}
                  placeholder="CA"
                />
              </div>
              <div className="form-group">
                <label className="form-label">ZIP Code</label>
                <input
                  type="text"
                  className="form-input"
                  value={letterData.recipientInfo.zipCode}
                  onChange={(e) => handleInputChange('recipientInfo', 'zipCode', e.target.value)}
                  placeholder="90210"
                />
              </div>
            </div>
          </div>

          {/* Letter Content */}
          <div className="section-card">
            <div className="section-header">
              <h2 className="section-title">Letter Content</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
              <div className="form-group">
                <label className="form-label">Date</label>
                <input
                  type="text"
                  className="form-input"
                  value={letterData.date}
                  onChange={(e) => handleInputChange(null, 'date', e.target.value)}
                  placeholder="January 15, 2024"
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Subject</label>
              <input
                type="text"
                className="form-input"
                value={letterData.subject}
                onChange={(e) => handleInputChange(null, 'subject', e.target.value)}
                placeholder="Subject line of your letter"
              />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "16px", marginBottom: "16px" }}>
              <div className="form-group">
                <label className="form-label">Salutation</label>
                <select
                  className="form-input"
                  value={letterData.salutation}
                  onChange={(e) => handleInputChange(null, 'salutation', e.target.value)}
                >
                  <option value="Dear">Dear</option>
                  <option value="To Whom It May Concern">To Whom It May Concern</option>
                  <option value="Hello">Hello</option>
                  <option value="Dear Sir/Madam">Dear Sir/Madam</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Recipient Name (for salutation)</label>
                <input
                  type="text"
                  className="form-input"
                  value={letterData.recipientName}
                  onChange={(e) => handleInputChange(null, 'recipientName', e.target.value)}
                  placeholder="Jane Smith"
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Letter Body</label>
              <textarea
                className="form-textarea"
                value={letterData.body}
                onChange={(e) => handleInputChange(null, 'body', e.target.value)}
                placeholder="Write the main content of your letter here..."
              />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "16px" }}>
              <div className="form-group">
                <label className="form-label">Closing</label>
                <select
                  className="form-input"
                  value={letterData.closing}
                  onChange={(e) => handleInputChange(null, 'closing', e.target.value)}
                >
                  <option value="Sincerely">Sincerely</option>
                  <option value="Best regards">Best regards</option>
                  <option value="Regards">Regards</option>
                  <option value="Thank you">Thank you</option>
                  <option value="Yours truly">Yours truly</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Your Signature/Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={letterData.signature}
                  onChange={(e) => handleInputChange(null, 'signature', e.target.value)}
                  placeholder="John Doe"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div>
          <div className="preview-section">
            <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#111827", margin: "0 0 20px 0" }}>
              Letter Preview
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
                  Your letter preview will appear here as you fill in the information
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default BusinessLetterEditor;