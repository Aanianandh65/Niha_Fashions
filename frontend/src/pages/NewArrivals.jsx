import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import localProducts from "../data/products";

function NewArrivals() {
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

  const newProducts = products.slice(0, 6);

  return (
    <section className="new-arrivals-page">
      <div className="container">

        <div className="section-heading text-center">
          <p className="section-eyebrow">JUST IN</p>

          <h1>New Arrivals</h1>

          <p>
            Discover the latest styles, fresh silhouettes and
            timeless essentials from NIHA.
          </p>
        </div>

        <div className="row g-4 mt-4">

          {newProducts.map((product) => (
            <div
              className="col-6 col-lg-4"
              key={product.id}
            >
              <ProductCard product={product} />
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default NewArrivals;