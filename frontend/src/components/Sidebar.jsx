import { Link } from "react-router-dom";

function Sidebar({ collapsed, setCollapsed }) {
  return (
    <div
      className={
        collapsed
          ? "dashboard-sidebar collapsed"
          : "dashboard-sidebar"
      }
    >
      <div
        className="menu-icon"
        onClick={() => setCollapsed(!collapsed)}
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
        {!collapsed && <span>Coding Practice</span>}
      </Link>

     

      

     <Link to="/schedule">
  <i className="fa-solid fa-calendar-days"></i>
  {!collapsed && <span>Reminder</span>}
</Link>
<Link to="/study-resources">
  <i className="fa-solid fa-book-open"></i>
  {!collapsed && <span>Study Resources</span>}
</Link>

     

      <Link to="/">
        <i className="fa-solid fa-right-from-bracket"></i>
        {!collapsed && <span>Logout</span>}
      </Link>
    </div>
  );
}

export default Sidebar;