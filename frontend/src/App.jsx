import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Authentication/Login";
import Register from "./pages/Authentication/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile/Profile";
import AptitudeHome from "./pages/Aptitude/AptitudeHome";
import TestPage from "./pages/Aptitude/TestPage";
import Result from "./pages/Aptitude/Result";
import CodingHome from "./pages/coding/CodingHome";
import CodingEditor from "./pages/coding/CodingEditor";

import Schedule from "./pages/Schedule/Schedule";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>
<Route path="/aptitude" element={<AptitudeHome />} />

<Route
    path="/aptitude/:category"
    element={<TestPage />}
/>
<Route path="/aptitude/result" element={<Result />} />
<Route
  path="/coding"
  element={
    <ProtectedRoute>
      <CodingHome />
    </ProtectedRoute>
  }
/>

<Route
  path="/coding/problem/:id"
  element={
    <ProtectedRoute>
      <CodingEditor />
    </ProtectedRoute>
  }
/>

<Route
  path="/schedule"
  element={
    <ProtectedRoute>
      <Schedule />
    </ProtectedRoute>
  }
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;