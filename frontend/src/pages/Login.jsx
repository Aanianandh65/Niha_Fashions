import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("NIHA-user", formData.email);

    alert("Login successful!");

    navigate("/profile");
  };

  return (
    <section className="auth-section">

      <div className="container">

        <div className="auth-wrapper">

          <div className="auth-content">

            <p className="section-eyebrow">
              WELCOME BACK
            </p>

            <h1>Login to NIHA</h1>

            <p className="auth-subtitle">
              Sign in to access your account and orders.
            </p>

            <form onSubmit={handleSubmit}>

              <div className="auth-field">
                <label>Email Address</label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="auth-field">

                <label>Password</label>

                <div className="password-wrapper">

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                  >
                    <i
                      className={
                        showPassword
                          ? "bi bi-eye-slash"
                          : "bi bi-eye"
                      }
                    ></i>
                  </button>

                </div>

              </div>

              <div className="auth-options">
                <label>
                  <input type="checkbox" />
                  Remember me
                </label>

                <a href="#forgot">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="btn NIHA-btn w-100"
              >
                Login
              </button>

            </form>

            <p className="auth-bottom">
              Don't have an account?{" "}
              <Link to="/register">
                Create Account
              </Link>
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Login;