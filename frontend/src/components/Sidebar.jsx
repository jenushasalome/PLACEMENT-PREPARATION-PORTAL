import { Link } from "react-router-dom";

function Sidebar({ collapsed, setCollapsed }) {
  return (
    <div
      className={
        collapsed
          ? "sidebar collapsed"
          : "sidebar"
      }
    >
      <div
        className="menu-icon"
        onClick={() =>
          setCollapsed(!collapsed)
        }
      >
        <i className="fa-solid fa-bars"></i>
      </div>

      <Link to="/dashboard">
        <i className="fa-solid fa-house"></i>
        {!collapsed && <span>Dashboard</span>}
      </Link>
      <Link to="/profile">
        <i className="fa-solid fa-user"></i>
        {!collapsed && <span>Profile</span>}
      </Link>

      <Link to="/aptitude">
        <i className="fa-solid fa-brain"></i>
        {!collapsed && <span>Aptitude</span>}
      </Link>

      <Link to="/coding">
        <i className="fa-solid fa-code"></i>
        {!collapsed && (
          <span>Coding Practice</span>
        )}
      </Link>

      <Link to="/mock-interviews">
        <i className="fa-solid fa-microphone"></i>
        {!collapsed && (
          <span>Mock Interviews</span>
        )}
      </Link>

      <Link to="/resume-builder">
        <i className="fa-solid fa-file-lines"></i>
        {!collapsed && (
          <span>Resume Builder</span>
        )}
      </Link>

      <Link to="/study-materials">
        <i className="fa-solid fa-book"></i>
        {!collapsed && (
          <span>Study Materials</span>
        )}
      </Link>

      <Link to="/progress">
        <i className="fa-solid fa-chart-line"></i>
        {!collapsed && <span>Progress</span>}
      </Link>

      

      <Link to="/">
        <i className="fa-solid fa-right-from-bracket"></i>
        {!collapsed && <span>Logout</span>}
      </Link>
    </div>
  );
}

export default Sidebar;