import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../assets/css/AdminLogin.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/admin/login",
        {
          email,
          password,
        }
      );

      // Save admin authentication
      localStorage.setItem(
        "adminToken",
        response.data.token
      );

      localStorage.setItem(
        "admin",
        JSON.stringify(response.data.admin)
      );

      // Go to admin dashboard
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Admin login error:", error);

      setError(
        error.response?.data?.message ||
          "Admin login failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">

        <div className="admin-login-icon">
          <i className="fa-solid fa-user-shield"></i>
        </div>

        <h1>Admin Login</h1>

        <p className="admin-login-subtitle">
          Placement Preparation Portal
        </p>

        {error && (
          <div className="admin-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="admin-input-group">
            <label>Email</label>

            <div className="admin-input-wrapper">
              <i className="fa-solid fa-envelope"></i>

              <input
                type="email"
                placeholder="Enter admin email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />
            </div>
          </div>

          <div className="admin-input-group">
            <label>Password</label>

            <div className="admin-input-wrapper">
              <i className="fa-solid fa-lock"></i>

              <input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />
            </div>
          </div>

          <button
            type="submit"
            className="admin-login-button"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

      </div>
    </div>
  );
}

export default AdminLogin;