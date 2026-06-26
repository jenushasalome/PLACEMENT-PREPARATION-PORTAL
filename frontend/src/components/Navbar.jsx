import "../assets/css/Navbar.css";

function Navbar() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <nav className="navbar">
      <div className="nav-left">
        <i className="fa-solid fa-graduation-cap logo-icon"></i>

        <div className="logo-text">
          <h2>PrepPortal</h2>
        </div>
      </div>

      <div className="nav-right">
        <span>
          Welcome,{" "}
          {user?.name || "Student"}
        </span>
      </div>
    </nav>
  );
}

export default Navbar;