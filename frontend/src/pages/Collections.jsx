import { Link } from "react-router-dom";

const collections = [
  {
    title: "Summer Collection",
    category: "Summer",
    image:
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Winter Collection",
    category: "Winter",
    image:
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Casual Edit",
    category: "Casual",
    image:
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Party Wear",
    category: "Party Wear",
    image:
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Luxury Edit",
    category: "Luxury",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Trending Now",
    category: "Trending",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80",
  },
];

function Collections() {
  return (
    <section className="collections-page">
      <div className="container">

        <div className="section-heading text-center">
          <p className="section-eyebrow">EXPLORE NIHA</p>
          <h1>Our Collections</h1>
          <p>
            Curated fashion collections designed for every mood,
            moment and occasion.
          </p>
        </div>

        <div className="row g-4 mt-4">

          {collections.map((collection) => (
            <div
              className="col-md-6 col-lg-4"
              key={collection.title}
            >

              <Link
                to={`/shop?category=${collection.category}`}
                className="collection-card"
              >

                <img
                  src={collection.image}
                  alt={collection.title}
                />

                <div className="collection-overlay">
                  <span>EXPLORE</span>
                  <h3>{collection.title}</h3>
                  <i className="bi bi-arrow-right"></i>
                </div>

              </Link>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Collections;