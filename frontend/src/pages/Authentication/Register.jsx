import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";
import "../../assets/css/Register.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

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

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      setError(
        "Passwords do not match"
      );
      return;
    }

    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };

      const data = await registerUser(
        userData
      );

      alert(data.message);

      navigate("/");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Registration Failed"
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
            Start Your Placement Journey
            With Confidence!
          </p>

          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Student"
          />
        </div>

        {/* Right Section */}
        <div className="right">
          <h2>Create Account</h2>

          <form onSubmit={handleSubmit}>
            <label>Full Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />

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
                placeholder="Create password"
                value={
                  formData.password
                }
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

            <label>
              Confirm Password
            </label>

            <div className="password-box">
              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                name="confirmPassword"
                placeholder="Confirm password"
                value={
                  formData.confirmPassword
                }
                onChange={handleChange}
                required
              />

              <i
                className={
                  showConfirmPassword
                    ? "fa-solid fa-eye-slash"
                    : "fa-solid fa-eye"
                }
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
              ></i>
            </div>

            <button type="submit">
              Register
            </button>

            {error && (
              <p className="error">
                {error}
              </p>
            )}

            <p className="register-link">
              Already have an account?{" "}
              <Link to="/">
                Login Here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;