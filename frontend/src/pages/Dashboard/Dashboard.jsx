import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { getDashboard } from "../../services/dashboardService";
import "../../assets/css/Dashboard.css";

function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);

  const [stats, setStats] = useState({
    testsTaken: 0,
    averageScore: 0,
    codingSolved: 0,
    mockInterviews: 0,
  });

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user?.id) {
      loadDashboard();
    }
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await getDashboard(user.id);
      setStats(data);
    } catch (error) {
      console.log("Dashboard Error:", error);
    }
  };

  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />

        <div className="content">

          {/* Dashboard Header */}

          <div className="dashboard-header">
            <div>
              <h1>Dashboard</h1>
              <p>
                Welcome back, {user?.name} 👋
              </p>
            </div>

            <div className="header-right">
              <div className="date-box">
                {today}
              </div>

              <div className="profile-icon">
                <i className="fa-solid fa-user"></i>
              </div>
            </div>
          </div>

          {/* Statistics */}

          <div className="stats-container">

            <div className="stat-card">
              <div className="card-icon purple">
                <i className="fa-solid fa-file-lines"></i>
              </div>

              <div>
                <h4>Tests Taken</h4>
                <h2>{stats.testsTaken}</h2>
              </div>
            </div>

            <div className="stat-card">
              <div className="card-icon green">
                <i className="fa-solid fa-circle-check"></i>
              </div>

              <div>
                <h4>Average Score</h4>
                <h2>{stats.averageScore}%</h2>
              </div>
            </div>

            <div className="stat-card">
              <div className="card-icon orange">
                <i className="fa-solid fa-code"></i>
              </div>

              <div>
                <h4>Coding Solved</h4>
                <h2>{stats.codingSolved}</h2>
              </div>
            </div>

            <div className="stat-card">
              <div className="card-icon blue">
                <i className="fa-solid fa-user-group"></i>
              </div>

              <div>
                <h4>Mock Interviews</h4>
                <h2>{stats.mockInterviews}</h2>
              </div>
            </div>

          </div>

          {/* Bottom Section */}

          <div className="bottom-container">

            <div className="performance-card">

              <h2>Performance Overview</h2>

              <div className="chart-placeholder">
                <i className="fa-solid fa-chart-line"></i>

                <p>
                  Performance chart will be added later
                </p>
              </div>

            </div>

            <div className="test-card-container">

              <div className="test-header">
                <h2>Upcoming Tests</h2>
                <span>View All</span>
              </div>

              <div className="test-item">
                <i className="fa-solid fa-file-lines"></i>

                <div>
                  <h4>Quantitative Aptitude</h4>
                  <p>25 May 2026 • 11:00 AM</p>
                </div>
              </div>

              <div className="test-item">
                <i className="fa-solid fa-file-lines"></i>

                <div>
                  <h4>Logical Reasoning</h4>
                  <p>26 May 2026 • 11:00 AM</p>
                </div>
              </div>

              <div className="test-item">
                <i className="fa-solid fa-file-lines"></i>

                <div>
                  <h4>Verbal Ability</h4>
                  <p>27 May 2026 • 10:00 AM</p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </>
  );
}

export default Dashboard;