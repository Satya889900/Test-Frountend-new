import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login Page/Login";
import Register from "./pages/Login Page/Register";
import Dashboard from "./pages/Dashboard";
import DocumentBuilder from "./pages/DocumentBuilder";
import ResumePage from "./pages/Resume/ResumePage";
import BusinessLetterPage from "./pages/BusinessLetter/BusinessLetterPage";
import BusinessLetterEditor from "./pages/BusinessLetter/BusinessLetterEditor";
import ProfilePage from "./pages/Profile/ProfilePage";
import Layout from "./components/Layout";
import { useAuth } from "./context/AuthContext";

// 🔐 Private Route
function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" />;
}

function App() {
  const { user } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Persistent Layout for all authenticated routes */}
        <Route element={<Layout userName={user?.name || ""} />}>
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/resume-builder"
            element={
              <PrivateRoute>
                <ResumePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/editor/resume/:templateName"
            element={
              <PrivateRoute>
                <ResumePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/letter-builder"
            element={
              <PrivateRoute>
                <BusinessLetterPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/editor/letter/:templateName"
            element={
              <PrivateRoute>
                <BusinessLetterEditor />
              </PrivateRoute>
            }
          />
          <Route
            path="/invoice-builder"
            element={
              <PrivateRoute>
                <DocumentBuilder />
              </PrivateRoute>
            }
          />
          <Route
            path="/contract-builder"
            element={
              <PrivateRoute>
                <DocumentBuilder />
              </PrivateRoute>
            }
          />
          <Route
            path="/presentation-builder"
            element={
              <PrivateRoute>
                <DocumentBuilder />
              </PrivateRoute>
            }
          />
          <Route
            path="/report-builder"
            element={
              <PrivateRoute>
                <DocumentBuilder />
              </PrivateRoute>
            }
          />
          <Route
            path="/newsletter-builder"
            element={
              <PrivateRoute>
                <DocumentBuilder />
              </PrivateRoute>
            }
          />
          <Route
            path="/brochure-builder"
            element={
              <PrivateRoute>
                <DocumentBuilder />
              </PrivateRoute>
            }
          />
          <Route
            path="/certificate-builder"
            element={
              <PrivateRoute>
                <DocumentBuilder />
              </PrivateRoute>
            }
          />
          <Route
            path="/agenda-builder"
            element={
              <PrivateRoute>
                <DocumentBuilder />
              </PrivateRoute>
            }
          />
          <Route
            path="/memo-builder"
            element={
              <PrivateRoute>
                <DocumentBuilder />
              </PrivateRoute>
            }
          />
          <Route
            path="/proposal-builder"
            element={
              <PrivateRoute>
                <DocumentBuilder />
              </PrivateRoute>
            }
          />
          <Route
            path="/flyer-builder"
            element={
              <PrivateRoute>
                <DocumentBuilder />
              </PrivateRoute>
            }
          />
          <Route
            path="/card-builder"
            element={
              <PrivateRoute>
                <DocumentBuilder />
              </PrivateRoute>
            }
          />
          <Route
            path="/form-builder"
            element={
              <PrivateRoute>
                <DocumentBuilder />
              </PrivateRoute>
            }
          />
          <Route
            path="/calendar-builder"
            element={
              <PrivateRoute>
                <DocumentBuilder />
              </PrivateRoute>
            }
          />
          <Route
            path="/planner-builder"
            element={
              <PrivateRoute>
                <DocumentBuilder />
              </PrivateRoute>
            }
          />
          <Route
            path="/budget-builder"
            element={
              <PrivateRoute>
                <DocumentBuilder />
              </PrivateRoute>
            }
          />
          <Route
            path="/schedule-builder"
            element={
              <PrivateRoute>
                <DocumentBuilder />
              </PrivateRoute>
            }
          />
          <Route
            path="/checklist-builder"
            element={
              <PrivateRoute>
                <DocumentBuilder />
              </PrivateRoute>
            }
          />
          <Route
            path="/worksheet-builder"
            element={
              <PrivateRoute>
                <DocumentBuilder />
              </PrivateRoute>
            }
          />
          <Route
            path="/chart-builder"
            element={
              <PrivateRoute>
                <DocumentBuilder />
              </PrivateRoute>
            }
          />
          <Route
            path="/documents"
            element={
              <PrivateRoute>
                <DocumentBuilder />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
