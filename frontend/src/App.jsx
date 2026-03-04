import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import OAuthSuccess from "./pages/OAuthSuccess";
import SubjectFiles from "./pages/SubjectFiles"; // ✅ Added
import QuizPage from "./pages/QuizPage";
import SummaryPage from "./pages/SummaryPage";
import RequireAuth from "./auth/RequireAuth";
import RequireGuest from "./auth/RequireGuest";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
       <Route path="/quiz" element={<QuizPage />} />
       <Route path="/summary" element={<SummaryPage />} />
<Route
  path="/profile"
  element={
    <RequireAuth>
      <Profile />
    </RequireAuth>
  }
/>        {/* OAuth Redirect Route */}
        <Route path="/oauth-success" element={<OAuthSuccess />} />

        {/* Guest-only routes */}
        <Route
          path="/login"
          element={
            <RequireGuest>
              <Login />
            </RequireGuest>
          }
        />

        <Route
          path="/register"
          element={
            <RequireGuest>
              <Register />
            </RequireGuest>
          }
        />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />

        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />

        <Route
          path="/analytics"
          element={
            <RequireAuth>
              <Analytics />
            </RequireAuth>
          }
        />

        {/* ✅ NEW Subject Files Route */}
        <Route
          path="/subject/:subjectName"
          element={
            <RequireAuth>
              <SubjectFiles />
            </RequireAuth>
          }
        />

        {/* Catch all unknown routes */}
        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>
    </BrowserRouter>
  );
}