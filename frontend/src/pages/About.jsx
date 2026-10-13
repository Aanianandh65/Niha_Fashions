function About() {
  return (
    <section className="about-page">

      <div className="container">

        <div className="about-hero">

          <div className="about-image">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80"
              alt="NIHA fashion store"
            />
          </div>

          <div className="about-content">

            <p className="section-eyebrow">
              THE NIHA STORY
            </p>

            <h1>
              Fashion That Feels
              <br />
              Like You.
            </h1>

            <p>
              NIHA is a modern fashion destination created for
              people who believe that style is an expression of
              individuality.
            </p>

            <p>
              From timeless essentials to contemporary statement
              pieces, every collection is carefully curated to
              bring together quality, comfort and effortless style.
            </p>

            <button className="btn NIHA-btn">
              Explore Our Collection
            </button>

          </div>

        </div>

        <div className="about-values">

          <div>
            <i className="bi bi-gem"></i>
            <h4>Premium Quality</h4>
            <p>
              Carefully selected materials and refined designs.
            </p>
          </div>

          <div>
            <i className="bi bi-stars"></i>
            <h4>Timeless Style</h4>
            <p>
              Fashion that stays elegant beyond every trend.
            </p>
          </div>

          <div>
            <i className="bi bi-heart"></i>
            <h4>Made With Love</h4>
            <p>
              Every NIHA experience is designed with you in mind.
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}

export default About;