import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import FilterSidebar from "../components/FilterSidebar";
import AddProductModal from "../components/AddProductModal";
import api from "../api";
import localProducts from "../data/products";

function Shop() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [maxPrice, setMaxPrice] = useState(6000);
  const [rating, setRating] = useState(0);
  const [sort, setSort] = useState("featured");

  useEffect(() => {
    const urlCat = searchParams.get("category");
    if (urlCat) {
      setCategory(urlCat);
    }
  }, [searchParams]);

  // Get products from Django
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("products/");
      const fetched = response.data;
      if (Array.isArray(fetched) && fetched.length > 0) {
        setProducts(fetched);
      } else {
        setProducts(localProducts);
      }
    } catch (err) {
      console.error("Error loading products:", err);
      console.error("Django API unavailable:", err);
      setProducts(localProducts);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleProductAdded = (newProduct) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  const handleDeleteProduct = async (id) => {
    try {
      await api.delete(`products/${id}/`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
      // If product only existed in fallback state, filter locally
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search
    if (searchTerm.trim()) {
      result = result.filter((product) =>
        product.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    // Category
    if (category !== "All") {
      result = result.filter(
        (product) => product.category === category
      );
    }

    // Price
    result = result.filter(
      (product) => Number(product.price) <= maxPrice
    );

    // Rating
    if (rating > 0) {
      result = result.filter(
        (product) => Number(product.rating) >= rating
      );
    }

    // Sorting
    switch (sort) {
      case "price-low":
        result.sort(
          (a, b) => Number(a.price) - Number(b.price)
        );
        break;

      case "price-high":
        result.sort(
          (a, b) => Number(b.price) - Number(a.price)
        );
        break;

      case "rating":
        result.sort(
          (a, b) => Number(b.rating) - Number(a.rating)
        );
        break;

      case "newest":
        result.sort((a, b) => b.id - a.id);
        break;

      default:
        break;
    }

    return result;
  }, [
    products,
    searchTerm,
    category,
    maxPrice,
    rating,
    sort,
  ]);

  // Loading
  if (loading) {
    return (
      <div className="shop-page">
        <section className="shop-header">
          <div className="container">
            <div className="shop-breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <span>Shop</span>
            </div>

            <p>EXPLORE OUR COLLECTION</p>

            <h1>Shop All Products</h1>

            <span>
              Discover premium styles curated for you.
            </span>
          </div>
        </section>

        <div className="container section-padding text-center">
          <h3>Loading products...</h3>
        </div>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="shop-page">
        <section className="shop-header">
          <div className="container">
            <div className="shop-breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <span>Shop</span>
            </div>

            <p>EXPLORE OUR COLLECTION</p>

            <h1>Shop All Products</h1>
          </div>
        </section>

        <div className="container section-padding text-center">
          <i className="bi bi-exclamation-circle fs-1"></i>

          <h3 className="mt-3">{error}</h3>

          <p>
            Make sure your Django server is running.
          </p>

          <button
            type="button"
            className="btn NIHA-btn mt-3"
            onClick={() => window.location.reload()}
          >
            TRY AGAIN
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="shop-page">

      {/* Page Header */}
      <section className="shop-header">
        <div className="container">

          <div className="shop-breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Shop</span>
          </div>

          <p>EXPLORE OUR COLLECTION</p>

          <h1>Shop All Products</h1>

          <span>
            Discover premium styles curated for you.
          </span>

        </div>
      </section>

      {/* Shop Content */}
      <section className="shop-content section-padding">

        <div className="container">

          {/* Search + Sort */}
          <div className="shop-toolbar">

            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />

            <div className="sort-section d-flex align-items-center gap-3">

              <span>
                {filteredProducts.length} Products
              </span>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="featured">
                  Featured
                </option>

                <option value="newest">
                  Newest
                </option>

                <option value="price-low">
                  Price: Low to High
                </option>

                <option value="price-high">
                  Price: High to Low
                </option>

                <option value="rating">
                  Best Rated
                </option>
              </select>

              <button
                type="button"
                className="btn btn-dark btn-sm rounded-3 px-3 py-2 fw-semibold d-inline-flex align-items-center gap-2"
                onClick={() => setIsAddModalOpen(true)}
              >
                <i className="bi bi-plus-lg"></i>
                Add Product
              </button>

            </div>

          </div>

          <div className="row g-5">

            {/* Sidebar */}
            <div className="col-lg-3">

              <FilterSidebar
                category={category}
                setCategory={setCategory}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                rating={rating}
                setRating={setRating}
              />

            </div>

            {/* Products */}
            <div className="col-lg-9">

              {filteredProducts.length > 0 ? (

                <div className="row g-4">

                  {filteredProducts.map((product) => (

                    <div
                      className="col-6 col-md-4"
                      key={product.id}
                    >
                      <ProductCard product={product} onDelete={handleDeleteProduct} />
                    </div>

                  ))}

                </div>

              ) : (

                <div className="empty-products">

                  <i className="bi bi-search"></i>

                  <h3>No products found</h3>

                  <p>
                    Try changing your search or filters.
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setSearchTerm("");
                      setCategory("All");
                      setMaxPrice(6000);
                      setRating(0);
                      setSort("featured");
                    }}
                  >
                    CLEAR FILTERS
                  </button>

                </div>

              )}

            </div>

          </div>

        </div>

      </section>

      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onProductAdded={handleProductAdded}
      />

    </div>
  );
}

export default Shop;