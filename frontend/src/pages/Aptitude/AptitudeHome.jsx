import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

import "../../assets/css/Dashboard.css";
import "./AptitudeHome.css";

export default function AptitudeHome() {
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />

        <div className="dashboard-content">

          <div className="aptitude-header">
            <h1>Aptitude Practice Tests</h1>
            <p>
              Improve your placement skills by solving
              aptitude questions.
            </p>
          </div>

          <div className="aptitude-grid">

            {/* Quantitative */}

            <div className="aptitude-card">

              <div className="aptitude-icon quantitative">
                <i className="fa-solid fa-calculator"></i>
              </div>

              <h3>Quantitative Aptitude</h3>

              <p>
                Practice arithmetic, percentages,
                profit & loss, time & work,
                probability and more.
              </p>

              <button
                className="btn btn-primary"
                onClick={() =>
                  navigate("/aptitude/quantitative")
                }
              >
                Start Test
              </button>

            </div>

            {/* Logical */}

            <div className="aptitude-card">

              <div className="aptitude-icon logical">
                <i className="fa-solid fa-brain"></i>
              </div>

              <h3>Logical Reasoning</h3>

              <p>
                Improve analytical thinking with
                puzzles, arrangements,
                coding-decoding and series.
              </p>

              <button
                className="btn btn-success"
                onClick={() =>
                  navigate("/aptitude/logical")
                }
              >
                Start Test
              </button>

            </div>

            {/* Verbal */}

            <div className="aptitude-card">

              <div className="aptitude-icon verbal">
                <i className="fa-solid fa-book-open"></i>
              </div>

              <h3>Verbal Ability</h3>

              <p>
                Practice grammar, vocabulary,
                reading comprehension and
                sentence correction.
              </p>

              <button
                className="btn btn-warning"
                onClick={() =>
                  navigate("/aptitude/verbal")
                }
              >
                Start Test
              </button>

            </div>

          </div>

        </div>
      </div>
    </>
  );
}