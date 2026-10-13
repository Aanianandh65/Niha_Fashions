import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-overlay"></div>

      <div className="container hero-content">
        <div className="row">
          <div className="col-lg-7">
            <p className="hero-small-text">
              THE NEW STANDARD OF STYLE
            </p>

            <h1>
              Discover Your
              <span> Style with NIHA</span>
            </h1>

            <p className="hero-description">
              Premium fashion for every occasion.
              Discover timeless styles designed to make
              every moment unforgettable.
            </p>

            <div className="hero-buttons">
              <Link to="/shop" className="btn NIHA-btn">
                SHOP NOW
                <i className="bi bi-arrow-right ms-2"></i>
              </Link>

              <Link
                to="/collections"
                className="btn NIHA-outline-btn"
              >
                EXPLORE COLLECTION
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-scroll">
        <span>SCROLL TO EXPLORE</span>
        <i className="bi bi-arrow-down"></i>
      </div>
    </section>
  );
}

export default Hero;