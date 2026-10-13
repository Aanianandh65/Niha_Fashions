import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    localStorage.setItem(
      "NIHA-user",
      JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      })
    );

    alert("Account created successfully!");

    navigate("/profile");
  };

  return (
    <section className="auth-section">

      <div className="container">

        <div className="auth-wrapper">

          <div className="auth-content">

            <p className="section-eyebrow">
              JOIN NIHA
            </p>

            <h1>Create Your Account</h1>

            <p className="auth-subtitle">
              Create an account and enjoy a seamless shopping experience.
            </p>

            <form onSubmit={handleSubmit}>

              <div className="auth-field">
                <label>Full Name</label>

                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="auth-field">
                <label>Email Address</label>

                <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="auth-field">
                <label>Phone Number</label>

                <input
                  type="tel"
                  name="phone"
                  placeholder="Your phone number"
                  value={formData.phone}
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
                    placeholder="Create password"
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

              <div className="auth-field">
                <label>Confirm Password</label>

                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn NIHA-btn w-100"
              >
                Create Account
              </button>

            </form>

            <p className="auth-bottom">
              Already have an account?{" "}
              <Link to="/login">
                Login
              </Link>
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Register;