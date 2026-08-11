import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import "../../assets/css/StudyResources.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function StudyResources() {
  const [collapsed, setCollapsed] = useState(false);

  const navigate = useNavigate();

  const openTopic = (topic) => {
    navigate(`/study-resources/${topic}`);
  };

  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />

        <div className="dashboard-content">

          <h1 className="study-title">
            Study Resources
          </h1>

          <p className="study-subtitle">
            Choose a topic to start your placement preparation.
          </p>

          {/* Aptitude */}

          <div className="resource-section">

            <h2>📘 Aptitude</h2>

            <div className="resource-grid">

              <div
                className="resource-card"
                onClick={() =>
                  openTopic("quantitative")
                }
              >
                <h3>Quantitative Aptitude</h3>

                <p>
                  Formulas, Shortcuts & Questions
                </p>

              </div>

              <div
                className="resource-card"
                onClick={() =>
                  openTopic("logical")
                }
              >
                <h3>Logical Reasoning</h3>

                <p>
                  Puzzles & Reasoning Concepts
                </p>

              </div>

              <div
                className="resource-card"
                onClick={() =>
                  openTopic("verbal")
                }
              >
                <h3>Verbal Ability</h3>

                <p>
                  Grammar & Vocabulary
                </p>

              </div>

            </div>

          </div>

          {/* Programming */}

          <div className="resource-section">

            <h2>💻 Programming Languages</h2>

            <div className="resource-grid">

              <div
                className="resource-card"
                onClick={() => openTopic("c")}
              >
                <h3>C Programming</h3>

                <p>
                  Basics to Advanced
                </p>

              </div>

              <div
                className="resource-card"
                onClick={() => openTopic("cpp")}
              >
                <h3>C++</h3>

                <p>
                  OOP & STL
                </p>

              </div>

              <div
                className="resource-card"
                onClick={() => openTopic("java")}
              >
                <h3>Java</h3>

                <p>
                  OOP, Collections & More
                </p>

              </div>

              <div
                className="resource-card"
                onClick={() =>
                  openTopic("python")
                }
              >
                <h3>Python</h3>

                <p>
                  Basics, OOP & Interview Prep
                </p>

              </div>

            </div>

          </div>

        </div>
      </div>
    </>
  );
}

export default StudyResources;