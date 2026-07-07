import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useState } from "react";

import "../../assets/css/Dashboard.css";
import "./Result.css";

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);

  const score = location.state?.score || 0;
  const total = location.state?.total || 0;

  const percentage =
    total === 0 ? 0 : Math.round((score / total) * 100);

  let message = "";
  let color = "";

  if (percentage >= 80) {
    message = "Excellent!";
    color = "#22b573";
  } else if (percentage >= 60) {
    message = "Good Job!";
    color = "#2979ff";
  } else if (percentage >= 40) {
    message = "Keep Practicing!";
    color = "#ff9800";
  } else {
    message = "Needs Improvement";
    color = "#ff4d4d";
  }

  return (
    <>
      <Navbar />

      <div className="dashboard-container">

        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />

        <div className="content">

          <div className="result-card">

            <i className="fa-solid fa-trophy trophy"></i>

            <h1>Test Completed</h1>

            <div
              className="score-circle"
              style={{ borderColor: color }}
            >
              <h2>{percentage}%</h2>
            </div>

            <h3 style={{ color }}>
              {message}
            </h3>

            <p className="score-text">
              You scored
              <strong> {score}</strong> out of
              <strong> {total}</strong> questions.
            </p>

            <div className="result-buttons">

              <button
                className="btn btn-primary"
                onClick={() => navigate("/aptitude")}
              >
                Back to Aptitude
              </button>

              <button
                className="btn btn-success"
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </button>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}