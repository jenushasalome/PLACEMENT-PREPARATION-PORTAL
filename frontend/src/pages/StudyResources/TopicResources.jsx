import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import "../../assets/css/StudyResources.css";
import { useState } from "react";
import { useParams } from "react-router-dom";
import resources from "../../data/resources";

function TopicResources() {
  const [collapsed, setCollapsed] = useState(false);

  const { topic } = useParams();

  const data = resources[topic];

  if (!data) {
    return <h2 style={{ padding: "40px" }}>Resource Not Found</h2>;
  }

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
            {data.title}
          </h1>

          {/* NOTES */}

          <h2 className="section-title">
            📘 Notes
          </h2>

          <div className="resource-grid">
            {data.notes.map((item, index) => (
              <a
                key={index}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="resource-card"
              >
                {item.title}
              </a>
            ))}
          </div>

          {/* VIDEOS */}

          <h2 className="section-title">
            🎥 Videos
          </h2>

          <div className="resource-grid">
            {data.videos.map((item, index) => (
              <a
                key={index}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="resource-card"
              >
                {item.title}
              </a>
            ))}
          </div>

          {/* INTERVIEW */}

          <h2 className="section-title">
            💼 Interview Questions
          </h2>

          <div className="resource-grid">
            {data.interview.map((item, index) => (
              <a
                key={index}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="resource-card"
              >
                {item.title}
              </a>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}

export default TopicResources;