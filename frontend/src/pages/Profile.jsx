import { Link, useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const savedUser = localStorage.getItem("NIHA-user");

  let user = {
    name: "NIHA Customer",
    email: "customer@example.com",
  };

  try {
    if (savedUser) {
      const parsed = JSON.parse(savedUser);

      if (typeof parsed === "object") {
        user = parsed;
      } else {
        user.email = parsed;
      }
    }
  } catch {
    user.email = savedUser;
  }

  const handleLogout = () => {
    localStorage.removeItem("NIHA-user");

    alert("Logged out successfully.");

    navigate("/");
  };

  return (
    <section className="profile-section">

      <div className="container">

        <div className="section-heading">
          <p className="section-eyebrow">MY ACCOUNT</p>
          <h1>Profile</h1>
        </div>

        <div className="row g-4">

          <div className="col-lg-4">

            <div className="profile-card text-center">

              <div className="profile-avatar">
                <i className="bi bi-person"></i>
              </div>

              <h3>{user.name || "NIHA Customer"}</h3>

              <p>{user.email}</p>

              <button
                onClick={handleLogout}
                className="btn btn-outline-dark w-100"
              >
                Logout
              </button>

            </div>

          </div>

          <div className="col-lg-8">

            <div className="profile-menu">

              <Link to="/orders">
                <span>
                  <i className="bi bi-box-seam"></i>
                  My Orders
                </span>

                <i className="bi bi-chevron-right"></i>
              </Link>

              <Link to="/wishlist">
                <span>
                  <i className="bi bi-heart"></i>
                  My Wishlist
                </span>

                <i className="bi bi-chevron-right"></i>
              </Link>

              <Link to="/cart">
                <span>
                  <i className="bi bi-bag"></i>
                  Shopping Cart
                </span>

                <i className="bi bi-chevron-right"></i>
              </Link>

              <a href="#address">
                <span>
                  <i className="bi bi-geo-alt"></i>
                  Saved Addresses
                </span>

                <i className="bi bi-chevron-right"></i>
              </a>

              <a href="#settings">
                <span>
                  <i className="bi bi-gear"></i>
                  Account Settings
                </span>

                <i className="bi bi-chevron-right"></i>
              </a>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Profile;