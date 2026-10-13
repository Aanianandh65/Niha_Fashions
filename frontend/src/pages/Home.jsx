import Hero from "../components/Hero";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import axios from "axios";
import localProducts from "../data/products";

function Home() {
  const [products, setProducts] = useState(localProducts);

  useEffect(() => {
    axios.get("/api/products/")
      .then((response) => {
        if (Array.isArray(response.data) && response.data.length > 0) {
          setProducts(response.data);
        }
      })
      .catch((error) => {
        console.error("Could not load products from Django:", error);
      });
  }, []);
  const categories = [
    {
      name: "Women",
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80",
    },
    {
      name: "Men",
      image:
        "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=900&q=80",
    },
    {
      name: "Kids",
      image:
        "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=900&q=80",
    },
    {
      name: "Accessories",
      image:
        "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=80",
    },
    {
      name: "Footwear",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    },
  ];

  return (
    <>
      <Hero />

      {/* Categories */}
      <section className="categories-section section-padding">

        <div className="container">

          <div className="section-heading text-center">
            <p>EXPLORE NIHA</p>
            <h2>Shop by Category</h2>
            <div className="heading-line"></div>
          </div>

          <div className="row g-4 mt-4">

            {categories.map((category) => (
              <div
                className="col-6 col-md-4 col-lg"
                key={category.name}
              >
                <CategoryCard
                  name={category.name}
                  image={category.image}
                />
              </div>
            ))}

          </div>

        </div>

      </section>

      {/* Featured Products */}
      <section className="featured-section section-padding">

        <div className="container">

          <div className="section-heading">

            <div>
              <p>CURATED FOR YOU</p>
              <h2>Featured Collection</h2>
            </div>

            <a href="/shop" className="view-all">
              VIEW ALL
              <i className="bi bi-arrow-right ms-2"></i>
            </a>

          </div>

          <div className="row g-4 mt-3">

            {products.map((product) => (
              <div
                className="col-6 col-md-4 col-lg-3"
                key={product.id}
              >
                <ProductCard product={product} />
              </div>
            ))}

          </div>

        </div>

      </section>

      {/* Offer */}
      <section className="offer-section">

        <div className="offer-overlay"></div>

        <div className="container offer-content text-center">

          <p>LIMITED TIME OFFER</p>

          <h2>FLAT 50% OFF</h2>

          <span>
            Refresh your wardrobe with NIHA's latest collection.
          </span>

          <div className="mt-4">
            <a href="/shop" className="btn NIHA-btn">
              SHOP NOW
              <i className="bi bi-arrow-right ms-2"></i>
            </a>
          </div>

        </div>

      </section>
    </>
  );
}

export default Home;