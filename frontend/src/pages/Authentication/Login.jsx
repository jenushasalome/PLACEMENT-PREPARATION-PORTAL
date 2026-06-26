import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";
import "../../assets/css/Login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(formData);

      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      navigate("/dashboard");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Login Failed"
      );
    }
  };

  return (
    <div className="container">
      <div className="auth-card">
        {/* Left Section */}
        <div className="left">
          <h1>
            <i className="fa-solid fa-graduation-cap"></i>{" "}
            PrepPortal
          </h1>

          <p>
            Ace Your Placements with
            Confidence!
          </p>

          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Student"
          />
        </div>

        {/* Right Section */}
        <div className="right">
          <h2>Welcome Back!</h2>

          <form onSubmit={handleSubmit}>
            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label>Password</label>

            <div className="password-box">
              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <i
                className={
                  showPassword
                    ? "fa-solid fa-eye-slash"
                    : "fa-solid fa-eye"
                }
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              ></i>
            </div>

            <div className="forgot">
              <Link to="/forgot-password">
                Forgot Password?
              </Link>
            </div>

            <button type="submit">
              Login
            </button>

            {error && (
              <p className="error">
                {error}
              </p>
            )}

            <p className="register-link">
              Don't have an account?{" "}
              <Link to="/register">
                Register Here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;