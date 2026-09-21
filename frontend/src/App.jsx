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
import StudyResources from "./pages/StudyResources/StudyResources";
import TopicResources from "./pages/StudyResources/TopicResources";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminAptitude from "./pages/admin/AdminAptitude";
import AdminCoding from "./pages/admin/AdminCoding";
import AdminTests from "./pages/admin/AdminTests";
import AdminInterviews from "./pages/admin/AdminInterviews";
import AdminReminders from "./pages/admin/AdminReminders";


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
<Route
  path="/study-resources"
  element={<StudyResources />}
/>
<Route
  path="/study-resources/:topic"
  element={<TopicResources />}
/>
<Route
  path="/admin/login"
  element={<AdminLogin />}
/>
<Route
  path="/admin/dashboard"
  element={<AdminDashboard />}
/>
<Route
  path="/admin/users"
  element={<AdminUsers />}
/>
<Route
  path="/admin/aptitude"
  element={<AdminAptitude />}
/>
<Route
  path="/admin/coding"
  element={<AdminCoding />}
/>
<Route
  path="/admin/tests"
  element={<AdminTests />}
/>
<Route
  path="/admin/interviews"
  element={<AdminInterviews />}
/>
<Route
  path="/admin/reminders"
  element={<AdminReminders />}
/>



      </Routes>
    </BrowserRouter>
  );
}

export default App;