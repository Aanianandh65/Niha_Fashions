function Footer() {
  return (
    <footer className="NIHA-footer">

      <div className="container">

        <div className="row g-5">

          <div className="col-lg-4">

            <h2 className="footer-logo">
              NIHA
            </h2>

            <p>
              Premium fashion for every occasion.
              Discover timeless styles designed for
              the modern lifestyle.
            </p>

            <div className="social-icons">

              <a href="#">
                <i className="bi bi-instagram"></i>
              </a>

              <a href="#">
                <i className="bi bi-facebook"></i>
              </a>

              <a href="#">
                <i className="bi bi-pinterest"></i>
              </a>

              <a href="#">
                <i className="bi bi-twitter-x"></i>
              </a>

            </div>

          </div>

          <div className="col-6 col-lg-2">

            <h5>SHOP</h5>

            <a href="#">Women</a>
            <a href="#">Men</a>
            <a href="#">Kids</a>
            <a href="#">Accessories</a>
            <a href="#">Footwear</a>

          </div>

          <div className="col-6 col-lg-2">

            <h5>COMPANY</h5>

            <a href="#">About</a>
            <a href="#">Contact</a>
            <a href="#">Careers</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms</a>

          </div>

          <div className="col-lg-4">

            <h5>NEWSLETTER</h5>

            <p>
              Subscribe to receive updates about new
              collections and exclusive offers.
            </p>

            <div className="newsletter">

              <input
                type="email"
                placeholder="Enter your email"
              />

              <button>
                <i className="bi bi-arrow-right"></i>
              </button>

            </div>

          </div>

        </div>

        <div className="footer-bottom">
          <p>© 2026 NIHA. All Rights Reserved.</p>
          <p>Designed with elegance.</p>
        </div>

      </div>

    </footer>
  );
}

export default Footer;