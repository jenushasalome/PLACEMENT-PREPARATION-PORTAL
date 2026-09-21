import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../assets/css/AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    registeredUsers: 0,
    aptitudeQuestions: 0,
    codingQuestions: 0,
    upcomingTests: 0,
    upcomingInterviews: 0,
  });

  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    const loadDashboardStats = async () => {
      try {
        const token = localStorage.getItem("adminToken");

        if (!token) {
          navigate("/admin/login");
          return;
        }

        const response = await axios.get(
          "http://localhost:5000/api/admin/dashboard/stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStats(response.data);
      } catch (error) {
        console.error("Dashboard statistics error:", error);

        if (error.response?.status === 401) {
          localStorage.removeItem("adminToken");
          localStorage.removeItem("admin");

          navigate("/admin/login");
        }
      } finally {
        setLoadingStats(false);
      }
    };

    loadDashboardStats();
  }, [navigate]);

  const admin = JSON.parse(localStorage.getItem("admin"));

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  return (
    <div className="admin-dashboard">

      {/* ================= SIDEBAR ================= */}
      <aside className="admin-sidebar">

        <div className="admin-sidebar-logo">
          <i className="fa-solid fa-user-shield"></i>
          <span>Admin Panel</span>
        </div>

        <div className="admin-profile">
          <div className="admin-profile-icon">
            <i className="fa-solid fa-user"></i>
          </div>

          <div>
            <h3>{admin?.name || "Administrator"}</h3>
            <p>Administrator</p>
          </div>
        </div>

        <nav className="admin-menu">

          {/* Dashboard */}
          <button
            className="admin-menu-item active"
            onClick={() => navigate("/admin/dashboard")}
          >
            <i className="fa-solid fa-chart-line"></i>
            <span>Dashboard</span>
          </button>

          {/* Users */}
          <button
            className="admin-menu-item"
            onClick={() => navigate("/admin/users")}
          >
            <i className="fa-solid fa-users"></i>
            <span>Users</span>
          </button>

          {/* Aptitude Questions */}
          <button
            className="admin-menu-item"
            onClick={() => navigate("/admin/aptitude")}
          >
            <i className="fa-solid fa-brain"></i>
            <span>Aptitude Questions</span>
          </button>

          {/* Coding Questions */}
          <button
            className="admin-menu-item"
            onClick={() => navigate("/admin/coding")}
          >
            <i className="fa-solid fa-code"></i>
            <span>Coding Questions</span>
          </button>

          {/* Tests */}
          <button
            className="admin-menu-item"
            onClick={() => navigate("/admin/tests")}
          >
            <i className="fa-solid fa-file-lines"></i>
            <span>Tests</span>
          </button>
          {/* Interviews */}
<button
  className="admin-menu-item"
  onClick={() => navigate("/admin/interviews")}
>
  <i className="fa-solid fa-building"></i>
  <span>Interviews</span>
</button>

          {/* Reminders */}
          <button
            className="admin-menu-item"
            onClick={() => navigate("/admin/reminders")}
          >
            <i className="fa-solid fa-bell"></i>
            <span>Reminders</span>
          </button>

        </nav>

        {/* Logout */}
        <button
          className="admin-logout"
          onClick={handleLogout}
        >
          <i className="fa-solid fa-right-from-bracket"></i>
          <span>Logout</span>
        </button>

      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="admin-main">

        {/* Topbar */}
        <div className="admin-topbar">

          <div>
            <h1>Admin Dashboard</h1>
            <p>Manage your Placement Preparation Portal</p>
          </div>

          <div className="admin-welcome">
            <i className="fa-solid fa-user-shield"></i>
            <span>
              Welcome, {admin?.name || "Admin"}
            </span>
          </div>

        </div>

        {/* ================= STATISTICS ================= */}
        <section className="admin-stats">

          {/* Registered Users */}
          <div className="admin-stat-card">

            <div className="admin-stat-icon users">
              <i className="fa-solid fa-users"></i>
            </div>

            <div>
              <h3>
                {loadingStats
                  ? "..."
                  : stats.registeredUsers}
              </h3>

              <p>Registered Users</p>
            </div>

          </div>

          {/* Aptitude Questions */}
          <div className="admin-stat-card">

            <div className="admin-stat-icon aptitude">
              <i className="fa-solid fa-brain"></i>
            </div>

            <div>
              <h3>
                {loadingStats
                  ? "..."
                  : stats.aptitudeQuestions}
              </h3>

              <p>Aptitude Questions</p>
            </div>

          </div>

          {/* Coding Questions */}
          <div className="admin-stat-card">

            <div className="admin-stat-icon coding">
              <i className="fa-solid fa-code"></i>
            </div>

            <div>
              <h3>
                {loadingStats
                  ? "..."
                  : stats.codingQuestions}
              </h3>

              <p>Coding Questions</p>
            </div>

          </div>

          {/* Upcoming Tests */}
          <div className="admin-stat-card">

            <div className="admin-stat-icon tests">
              <i className="fa-solid fa-file-lines"></i>
            </div>

            <div>
              <h3>
                {loadingStats
                  ? "..."
                  : stats.upcomingTests}
              </h3>

              <p>Upcoming Tests</p>
            </div>

          </div>
          {/* Upcoming Interviews */}
<div className="admin-stat-card">

  <div className="admin-stat-icon interviews">
    <i className="fa-solid fa-building"></i>
  </div>

  <div>
    <h3>
      {loadingStats
        ? "..."
        : stats.upcomingInterviews}
    </h3>

    <p>Upcoming Interviews</p>
  </div>

</div>

        </section>

        {/* ================= MANAGEMENT ================= */}
        <section className="admin-management">

          <h2>Management</h2>

          <div className="admin-management-grid">

            {/* USERS */}
            <div className="admin-management-card">

              <div className="management-icon">
                <i className="fa-solid fa-users"></i>
              </div>

              <div>
                <h3>Users</h3>
                <p>
                  View and manage registered students.
                </p>
              </div>

              <button
                onClick={() => navigate("/admin/users")}
              >
                Manage
                <i className="fa-solid fa-arrow-right"></i>
              </button>

            </div>

            {/* APTITUDE QUESTIONS */}
            <div className="admin-management-card">

              <div className="management-icon">
                <i className="fa-solid fa-brain"></i>
              </div>

              <div>
                <h3>Aptitude Questions</h3>
                <p>
                  Add, edit and delete aptitude questions.
                </p>
              </div>

              <button
                onClick={() =>
                  navigate("/admin/aptitude")
                }
              >
                Manage
                <i className="fa-solid fa-arrow-right"></i>
              </button>

            </div>

            {/* CODING QUESTIONS */}
            <div className="admin-management-card">

              <div className="management-icon">
                <i className="fa-solid fa-code"></i>
              </div>

              <div>
                <h3>Coding Questions</h3>
                <p>
                  Manage coding practice questions.
                </p>
              </div>

              <button
                onClick={() =>
                  navigate("/admin/coding")
                }
              >
                Manage
                <i className="fa-solid fa-arrow-right"></i>
              </button>

            </div>

            {/* TESTS */}
            <div className="admin-management-card">

              <div className="management-icon">
                <i className="fa-solid fa-file-lines"></i>
              </div>

              <div>
                <h3>Tests</h3>
                <p>
                  View and manage scheduled tests.
                </p>
              </div>

              <button
                onClick={() =>
                  navigate("/admin/tests")
                }
              >
                Manage
                <i className="fa-solid fa-arrow-right"></i>
              </button>

            </div>
            {/* INTERVIEWS */}
<div className="admin-management-card">

  <div className="management-icon">
    <i className="fa-solid fa-building"></i>
  </div>

  <div>
    <h3>Interviews</h3>
    <p>
      View and manage company interviews.
    </p>
  </div>

  <button
    onClick={() =>
      navigate("/admin/interviews")
    }
  >
    Manage
    <i className="fa-solid fa-arrow-right"></i>
  </button>

</div>

            {/* REMINDERS */}
            <div className="admin-management-card">

              <div className="management-icon">
                <i className="fa-solid fa-bell"></i>
              </div>

              <div>
                <h3>Reminders</h3>
                <p>
                  View scheduled tests and interviews.
                </p>
              </div>

              <button
                onClick={() =>
                  navigate("/admin/reminders")
                }
              >
                Manage
                <i className="fa-solid fa-arrow-right"></i>
              </button>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default AdminDashboard;