import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductCard({ product, onDelete }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const wished = isInWishlist(product.id);
  const rating = Number(product.rating) || 0;
  const price = Number(product.price) || 0;
  const originalPrice = Number(product.originalPrice ?? product.original_price) || 0;

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        {/* Discount Badge */}
        {product.discount > 0 && (
          <span className="discount-badge">
            -{product.discount}%
          </span>
        )}

        {/* Wishlist & Delete Buttons */}
        <div style={{ position: "absolute", top: "10px", right: "10px", display: "flex", gap: "6px", zIndex: 3 }}>
          {onDelete && (
            <button
              type="button"
              className="btn btn-sm btn-danger text-white rounded-circle shadow-sm"
              style={{ width: "32px", height: "32px", padding: 0, display: "flex", alignItems: "center", justifyContent: "center" }}
              aria-label={`Delete ${product.name}`}
              title="Delete Product permanently"
              onClick={(e) => {
                e.stopPropagation();
                if (window.confirm(`Are you sure you want to permanently delete "${product.name}" from database?`)) {
                  onDelete(product.id);
                }
              }}
            >
              <i className="bi bi-trash"></i>
            </button>
          )}

          <button
            type="button"
            className="product-wishlist"
            aria-label={wished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
            aria-pressed={wished}
            onClick={() => toggleWishlist(product)}
            style={{ position: "static" }}
          >
            <i className={wished ? "bi bi-heart-fill" : "bi bi-heart"}></i>
          </button>
        </div>

        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />

        {/* Add to Cart */}
        <div className="product-hover-action">
          <button
            type="button"
            className="add-cart-btn"
            onClick={() => addToCart(product)}
          >
            <i className="bi bi-bag me-2"></i>
            Add to Cart
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="product-info">
        <p className="product-brand">
          {product.brand}
        </p>

        {/* Product Name */}
        <Link
          to={`/product/${product.id}`}
          className="product-name"
        >
          {product.name}
        </Link>

        {/* Rating */}
        <div className="product-rating">
          <span>
            {"★".repeat(Math.floor(rating))}
          </span>

          <small>
            ({product.reviews || 0})
          </small>
        </div>

        {/* Price */}
        <div className="product-price">
          <strong>
            ₹{price.toLocaleString("en-IN")}
          </strong>

          {originalPrice > price && (
            <del>
              ₹{originalPrice.toLocaleString("en-IN")}
            </del>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
