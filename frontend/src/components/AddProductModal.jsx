import { useState } from "react";
import api from "../api";

function AddProductModal({ isOpen, onClose, onProductAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    brand: "NIHA",
    category: "Women",
    price: "",
    original_price: "",
    discount: "0",
    stock: "10",
    rating: "5.0",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const payload = {
        name: formData.name.trim(),
        brand: formData.brand.trim() || "NIHA",
        category: formData.category,
        price: parseFloat(formData.price) || 0,
        original_price: formData.original_price ? parseFloat(formData.original_price) : null,
        discount: parseInt(formData.discount, 10) || 0,
        stock: parseInt(formData.stock, 10) || 0,
        rating: parseFloat(formData.rating) || 5.0,
        image: formData.image.trim(),
        description: formData.description.trim(),
      };

      const response = await api.post("products/", payload);
      setSuccess(true);
      if (onProductAdded) {
        onProductAdded(response.data);
      }
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1200);
    } catch (err) {
      console.error("Error creating product:", err);
      setError(
        err.response?.data
          ? JSON.stringify(err.response.data)
          : "Failed to save product to database. Ensure Django backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.6)", zIndex: 1050 }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content shadow-lg border-0 rounded-4">
          <div className="modal-header bg-dark text-white rounded-top-4 px-4 py-3">
            <h5 className="modal-title font-serif fw-bold">
              <i className="bi bi-plus-circle me-2"></i> Add New Product (Permanent Store)
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
            ></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body p-4" style={{ maxHeight: "75vh", overflowY: "auto" }}>
              {error && (
                <div className="alert alert-danger mb-3" role="alert">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  {error}
                </div>
              )}

              {success && (
                <div className="alert alert-success mb-3" role="alert">
                  <i className="bi bi-check-circle-fill me-2"></i>
                  Product saved permanently to database!
                </div>
              )}

              <div className="row g-3">
                <div className="col-md-8">
                  <label className="form-label fw-semibold">Product Name *</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="e.g. Silk Evening Gown"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label fw-semibold">Brand</label>
                  <input
                    type="text"
                    name="brand"
                    className="form-control"
                    value={formData.brand}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Category *</label>
                  <select
                    name="category"
                    className="form-select"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="Women">Women</option>
                    <option value="Men">Men</option>
                    <option value="Kids">Kids</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Footwear">Footwear</option>
                    <option value="Summer">Summer</option>
                    <option value="Winter">Winter</option>
                    <option value="Party Wear">Party Wear</option>
                    <option value="Casual">Casual</option>
                    <option value="Luxury">Luxury</option>
                    <option value="Trending">Trending</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Price (₹) *</label>
                  <input
                    type="number"
                    name="price"
                    step="0.01"
                    className="form-control"
                    placeholder="e.g. 2999"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label fw-semibold">Original Price (₹)</label>
                  <input
                    type="number"
                    name="original_price"
                    step="0.01"
                    className="form-control"
                    placeholder="e.g. 3999"
                    value={formData.original_price}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label fw-semibold">Discount (%)</label>
                  <input
                    type="number"
                    name="discount"
                    className="form-control"
                    value={formData.discount}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label fw-semibold">Stock Quantity</label>
                  <input
                    type="number"
                    name="stock"
                    className="form-control"
                    value={formData.stock}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label fw-semibold">Image URL *</label>
                  <input
                    type="url"
                    name="image"
                    className="form-control"
                    placeholder="https://..."
                    value={formData.image}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-12">
                  <label className="form-label fw-semibold">Description</label>
                  <textarea
                    name="description"
                    rows="3"
                    className="form-control"
                    placeholder="Describe the material, fit, and style..."
                    value={formData.description}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="modal-footer bg-light p-3">
              <button
                type="button"
                className="btn btn-outline-secondary px-4"
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-dark px-4 fw-semibold"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Product Permanently"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProductModal;
