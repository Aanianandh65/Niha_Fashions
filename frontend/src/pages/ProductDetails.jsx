import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../api";
import products from "../data/products";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(() =>
    products.find((item) => item.id === Number(id)) || null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    api.get(`products/${id}/`)
      .then((response) => {
        if (active && response.data) setProduct(response.data);
      })
      .catch((error) => {
        console.error("Could not load product from Django:", error);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, [id]);

  const [quantity, setQuantity] = useState(1);
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const wished = isInWishlist(product?.id ?? id);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] =
    useState("Black");

  if (loading && !product) {
    return (
      <div className="not-found section-padding text-center">
        <h2>Loading Product...</h2>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="not-found section-padding text-center">

        <h2>Product Not Found</h2>

        <Link to="/shop" className="btn NIHA-btn mt-3">
          BACK TO SHOP
        </Link>

      </div>
    );
  }

  const price = Number(product.price) || 0;
  const originalPrice = Number(product.originalPrice ?? product.original_price) || 0;
  const productRating = Math.max(0, Math.round(Number(product.rating) || 0));
  const reviews = Number(product.reviews) || 0;
  const discount = Number(product.discount) || 0;
  const productImages = [product.image, product.image, product.image].filter(Boolean);

  return (
    <div className="product-details-page">

      {/* Breadcrumb */}
      <div className="container product-breadcrumb">

        <Link to="/">Home</Link>
        <span>/</span>

        <Link to="/shop">Shop</Link>
        <span>/</span>

        <span>{product.name}</span>

      </div>

      <section className="container product-details-section">

        <div className="row g-5">

          {/* Images */}
          <div className="col-lg-7">

            <div className="product-gallery">

              <div className="main-product-image">

                <img
                  src={product.image}
                  alt={product.name}
                />

                {discount > 0 && (
                  <span className="detail-discount">
                    -{discount}%
                  </span>
                )}

              </div>

              <div className="thumbnail-row">

                {productImages.map((image, index) => (

                  <button
                    key={index}
                    className="thumbnail"
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                    />
                  </button>

                ))}

              </div>

            </div>

          </div>

          {/* Details */}
          <div className="col-lg-5">

            <div className="product-detail-info">

              <p className="detail-brand">
                {product.brand}
              </p>

              <h1>{product.name}</h1>

              <div className="detail-rating">

                <span>
                  {"★".repeat(productRating)}
                </span>

                <small>
                  {reviews} Reviews
                </small>

              </div>

              <div className="detail-price">

                <strong>
                  ₹{price.toLocaleString("en-IN")}
                </strong>

                <del>
                  ₹{originalPrice.toLocaleString("en-IN")}
                </del>

              </div>

              <p className="detail-description">
                Designed with timeless elegance and
                premium quality, this piece from NIHA
                brings effortless style to your wardrobe.
                Perfect for creating a sophisticated
                everyday look.
              </p>

              <hr />

              {/* Size */}
              <div className="selection-group">

                <div className="selection-title">
                  <span>Size</span>
                  <small>Size Guide</small>
                </div>

                <div className="size-options">

                  {["S", "M", "L", "XL"].map((size) => (

                    <button
                      key={size}
                      className={
                        selectedSize === size
                          ? "selected"
                          : ""
                      }
                      onClick={() =>
                        setSelectedSize(size)
                      }
                    >
                      {size}
                    </button>

                  ))}

                </div>

              </div>

              {/* Color */}
              <div className="selection-group">

                <div className="selection-title">
                  <span>Color</span>
                  <small>{selectedColor}</small>
                </div>

                <div className="color-options">

                  {["Black", "Beige", "White"].map(
                    (color) => (

                      <button
                        key={color}
                        className={`color-option ${
                          color.toLowerCase()
                        } ${
                          selectedColor === color
                            ? "selected-color"
                            : ""
                        }`}
                        onClick={() =>
                          setSelectedColor(color)
                        }
                        aria-label={color}
                      />

                    )
                  )}

                </div>

              </div>

              {/* Quantity */}
              <div className="selection-group">

                <span className="quantity-title">
                  Quantity
                </span>

                <div className="quantity-control">

                  <button
                    onClick={() =>
                      setQuantity(
                        Math.max(1, quantity - 1)
                      )
                    }
                  >
                    -
                  </button>

                  <span>{quantity}</span>

                  <button
                    onClick={() =>
                      setQuantity(quantity + 1)
                    }
                  >
                    +
                  </button>

                </div>

              </div>

              {/* Buttons */}
              <div className="detail-buttons">

                <button
                  className="detail-cart-btn"
                  type="button"
                  onClick={() => {
                    for (let i = 0; i < quantity; i += 1) addToCart(product);
                  }}
                >
                  <i className="bi bi-bag me-2"></i>
                  ADD TO CART
                </button>

                <button
                  type="button"
                  className="detail-buy-btn"
                  onClick={() => {
                    for (let i = 0; i < quantity; i += 1) {
                      addToCart(product);
                    }
                    navigate("/checkout");
                  }}
                >
                  BUY NOW
                </button>

              </div>

              <button
                type="button"
                className="detail-wishlist"
                onClick={() => toggleWishlist(product)}
                aria-pressed={wished}
              >
                <i className={`${wished ? "bi bi-heart-fill" : "bi bi-heart"} me-2`}></i>
                {wished ? "REMOVE FROM WISHLIST" : "ADD TO WISHLIST"}
              </button>

              {/* Information */}
              <div className="product-information">

                <div>
                  <span>Material</span>
                  <strong>Premium Fabric</strong>
                </div>

                <div>
                  <span>Fit</span>
                  <strong>Regular Fit</strong>
                </div>

                <div>
                  <span>Availability</span>
                  <strong>In Stock</strong>
                </div>

                <div>
                  <span>Care</span>
                  <strong>Dry Clean</strong>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Reviews */}
      <section className="reviews-section">

        <div className="container">

          <div className="section-heading text-center">

            <p>WHAT OUR CUSTOMERS SAY</p>

            <h2>Customer Reviews</h2>

            <div className="heading-line"></div>

          </div>

          <div className="row justify-content-center mt-5">

            <div className="col-lg-8">

              <div className="review-card">

                <div className="review-top">

                  <div>

                    <strong>Priya</strong>

                    <div className="review-stars">
                      ★★★★★
                    </div>

                  </div>

                  <small>Verified Purchase</small>

                </div>

                <p>
                  Beautiful quality and perfect fit.
                  The design looks even better in person.
                  Very happy with my purchase from NIHA.
                </p>

              </div>

              <div className="review-card">

                <div className="review-top">

                  <div>

                    <strong>Ananya</strong>

                    <div className="review-stars">
                      ★★★★★
                    </div>

                  </div>

                  <small>Verified Purchase</small>

                </div>

                <p>
                  Excellent quality and elegant design.
                  The packaging was also beautiful.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default ProductDetails;