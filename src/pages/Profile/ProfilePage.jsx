import { useState, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  updateUserProfile,
  createResume,
  updateResume,
  deleteResume,
  downloadResume,
} from "../../services/api";

/* ── tiny helpers ─────────────────────────────────────────────────── */
function Toast({ msg, type }) {
  if (!msg) return null;
  const bg =
    type === "error"
      ? "linear-gradient(135deg,#ef4444,#dc2626)"
      : "linear-gradient(135deg,#22c55e,#16a34a)";
  return (
    <div
      style={{
        position: "fixed",
        bottom: 28,
        right: 28,
        padding: "12px 20px",
        background: bg,
        color: "#fff",
        borderRadius: 12,
        fontWeight: 600,
        fontSize: 14,
        boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
        zIndex: 9999,
        animation: "fadeSlideUp 0.3s ease",
      }}
    >
      {msg}
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 20,
        padding: "1.75rem 2rem",
        boxShadow:
          "0 0 0 1px rgba(139,92,246,0.07), 0 4px 24px rgba(139,92,246,0.08)",
        marginBottom: "1.5rem",
      }}
    >
      <h2
        style={{
          fontSize: 16,
          fontWeight: 700,
          color: "#1a0f3c",
          marginBottom: "1.25rem",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label
        style={{
          display: "block",
          fontSize: 11,
          fontWeight: 700,
          color: "#6d5fa0",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          marginBottom: 6,
        }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "11px 14px",
  border: "1.5px solid #e8e4f5",
  borderRadius: 12,
  fontSize: 15,
  color: "#1a0f3c",
  background: "#faf9ff",
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.2s, box-shadow 0.2s",
};

const btnPrimary = {
  padding: "11px 26px",
  borderRadius: 12,
  border: "none",
  cursor: "pointer",
  fontSize: 14,
  fontWeight: 700,
  color: "#fff",
  background: "linear-gradient(135deg, #7c3aed, #a855f7)",
  boxShadow: "0 4px 16px rgba(124,58,237,0.35)",
  transition: "transform 0.15s, box-shadow 0.15s",
  fontFamily: "'Plus Jakarta Sans', sans-serif",
};

const btnDanger = {
  ...btnPrimary,
  background: "linear-gradient(135deg, #ef4444, #dc2626)",
  boxShadow: "0 4px 16px rgba(239,68,68,0.3)",
};

const btnOutline = {
  ...btnPrimary,
  background: "transparent",
  color: "#7c3aed",
  border: "1.5px solid #c4b5fd",
  boxShadow: "none",
};

/* ═══════════════════════════════════════════════════════════════════ */
export default function ProfilePage() {
  const { user, refreshUser } = useAuth();

  /* profile state */
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [profileLoading, setProfileLoading] = useState(false);

  /* resume state */
  const [resumeLoading, setResumeLoading] = useState(false);
  const fileRef = useRef();

  /* toast */
  const [toast, setToast] = useState({ msg: "", type: "success" });

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast({ msg: "", type: "success" }), 3500);
  };

  /* ── Profile update ───────────────────────────────────────────── */
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    try {
      const payload = {};
      if (name !== user?.name) payload.name = name;
      if (email !== user?.email) payload.email = email;
      if (password) payload.password = password;

      if (Object.keys(payload).length === 0) {
        showToast("No changes to save", "error");
        return;
      }

      await updateUserProfile(payload);
      await refreshUser();
      setPassword("");
      showToast("Profile updated ✅");
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to update", "error");
    } finally {
      setProfileLoading(false);
    }
  };

  /* ── Resume upload ────────────────────────────────────────────── */
  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setResumeLoading(true);
    try {
      if (user?.resume) {
        await updateResume(file);
        showToast("Resume updated ✅");
      } else {
        await createResume(file);
        showToast("Resume uploaded ✅");
      }
      await refreshUser();
    } catch (err) {
      showToast(err.response?.data?.message || "Upload failed", "error");
    } finally {
      setResumeLoading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  /* ── Resume delete ────────────────────────────────────────────── */
  const handleResumeDelete = async () => {
    if (!window.confirm("Delete your resume? This cannot be undone.")) return;
    setResumeLoading(true);
    try {
      await deleteResume();
      await refreshUser();
      showToast("Resume deleted");
    } catch (err) {
      showToast(err.response?.data?.message || "Delete failed", "error");
    } finally {
      setResumeLoading(false);
    }
  };

  /* ── Resume download ──────────────────────────────────────────── */
  const handleResumeDownload = async () => {
    setResumeLoading(true);
    try {
      const { downloadUrl } = await downloadResume();
      window.open(downloadUrl, "_blank");
    } catch (err) {
      showToast(err.response?.data?.message || "Download failed", "error");
    } finally {
      setResumeLoading(false);
    }
  };

  const resume = user?.resume;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        input:focus { border-color: #7c3aed !important; box-shadow: 0 0 0 3px rgba(124,58,237,0.12) !important; }
        .profile-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(124,58,237,0.45) !important; }
        .danger-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(239,68,68,0.4) !important; }
        .outline-btn:hover:not(:disabled) { background: #f5f3ff !important; }
      `}</style>

      <div
        style={{
          maxWidth: 720,
          margin: "0 auto",
          padding: "2.5rem 1.5rem",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}
      >
        {/* ── Page header */}
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: "#1a0f3c", marginBottom: 4 }}>
            My Profile
          </h1>
          <p style={{ color: "#a09abf", fontSize: 14 }}>
            Manage your account details and resume
          </p>
        </div>

        {/* ── Avatar + name banner */}
        <div
          style={{
            background: "linear-gradient(135deg, #6d28d9 0%, #a855f7 60%, #ec4899 100%)",
            borderRadius: 20,
            padding: "2rem",
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
            marginBottom: "1.5rem",
            color: "#fff",
          }}
        >
          <div
            style={{
              width: 68,
              height: 68,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.25)",
              border: "2px solid rgba(255,255,255,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            {user?.name?.[0]?.toUpperCase() || "?"}
          </div>
          <div>
            <p style={{ fontSize: 20, fontWeight: 700, marginBottom: 2 }}>
              {user?.name || "User"}
            </p>
            <p style={{ fontSize: 14, opacity: 0.8 }}>{user?.email}</p>
          </div>
        </div>

        {/* ── Profile Form */}
        <Section title="✏️ Edit Profile">
          <form onSubmit={handleProfileUpdate}>
            <Field label="Full Name">
              <input
                style={inputStyle}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
              />
            </Field>
            <Field label="Email">
              <input
                style={inputStyle}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </Field>
            <Field label="New Password (leave blank to keep current)">
              <input
                style={inputStyle}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </Field>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
              <button
                type="submit"
                disabled={profileLoading}
                className="profile-btn"
                style={{ ...btnPrimary, opacity: profileLoading ? 0.7 : 1 }}
              >
                {profileLoading ? "Saving…" : "Save Changes"}
              </button>
            </div>
          </form>
        </Section>

        {/* ── Resume Section */}
        <Section title="📄 Resume">
          {resume ? (
            <div>
              {/* Resume info card */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "1rem 1.25rem",
                  background: "#f5f3ff",
                  border: "1.5px solid #ede9fe",
                  borderRadius: 14,
                  marginBottom: "1.25rem",
                }}
              >
                <div style={{ fontSize: 32 }}>📎</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontWeight: 700, color: "#1a0f3c", fontSize: 15, marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {resume.originalName}
                  </p>
                  <p style={{ fontSize: 12, color: "#a09abf" }}>
                    {(resume.size / 1024).toFixed(1)} KB • {resume.extension.toUpperCase()} • {resume.mimeType}
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button
                  className="profile-btn"
                  style={btnPrimary}
                  onClick={handleResumeDownload}
                  disabled={resumeLoading}
                >
                  ⬇️ Download
                </button>

                {/* Replace: trigger file input */}
                <label style={{ ...btnOutline, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, padding: "11px 26px", borderRadius: 12, fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 700 }} className="outline-btn">
                  🔄 Replace
                  <input
                    ref={fileRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    style={{ display: "none" }}
                    onChange={handleResumeUpload}
                  />
                </label>

                <button
                  className="danger-btn"
                  style={{ ...btnDanger, opacity: resumeLoading ? 0.7 : 1 }}
                  onClick={handleResumeDelete}
                  disabled={resumeLoading}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "2rem 1rem" }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>📂</div>
              <p style={{ color: "#a09abf", marginBottom: "1.25rem", fontSize: 15 }}>
                No resume uploaded yet
              </p>
              <label
                style={{
                  ...btnPrimary,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  cursor: "pointer",
                  opacity: resumeLoading ? 0.7 : 1,
                }}
                className="profile-btn"
              >
                📤 Upload Resume
                <input
                  ref={fileRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  style={{ display: "none" }}
                  onChange={handleResumeUpload}
                />
              </label>
              <p style={{ marginTop: 10, fontSize: 12, color: "#c4bce0" }}>
                Supports PDF, DOC, DOCX
              </p>
            </div>
          )}
        </Section>
      </div>

      <Toast msg={toast.msg} type={toast.type} />
    </>
  );
}
