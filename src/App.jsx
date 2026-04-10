import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login Page/Login";
import Register from "./pages/Login Page/Register";
import Dashboard from "./pages/Dashboard";
import DocumentBuilder from "./pages/DocumentBuilder";

// 🔐 Private Route
function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* Document Builder Routes */}
        <Route
          path="/resume-builder"
          element={
            <PrivateRoute>
              <DocumentBuilder />
            </PrivateRoute>
          }
        />
        <Route
          path="/letter-builder"
          element={
            <PrivateRoute>
              <DocumentBuilder />
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

      </Routes>
    </BrowserRouter>
  );
}

export default App;