
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Checkout() {
  const { cartItems, cartSubtotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("cod");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  // Make sure subtotal is always treated as a number
  const subtotal = Number(cartSubtotal) || 0;

  // Free shipping for orders of ₹3000 or more
  const shipping = subtotal >= 3000 ? 0 : 99;

  const total = subtotal + shipping;

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // Handle order submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const order = {
      id: Date.now(),
      customer: formData,
      items: cartItems,
      subtotal,
      shipping,
      total,
      paymentMethod,
      date: new Date().toISOString(),
    };

    // Save order to localStorage
    const existingOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    localStorage.setItem(
      "orders",
      JSON.stringify([...existingOrders, order])
    );

    alert("Order placed successfully!");

    clearCart();

    navigate("/orders");
  };

  // Empty cart
  if (!cartItems || cartItems.length === 0) {
    return (
      <section className="empty-cart-section">
        <div className="container text-center">
          <div className="empty-cart-icon">
            <i className="bi bi-bag"></i>
          </div>

          <h2>Your Cart is Empty</h2>

          <p>Add some products before checkout.</p>

          <Link to="/shop" className="btn NIHA-btn">
            Shop Now
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="checkout-section">
      <div className="container">
        {/* Page Heading */}
        <div className="section-heading text-center">
          <p className="section-eyebrow">NIHA CHECKOUT</p>
          <h1>Complete Your Order</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row g-5">
            {/* Customer Information */}
            <div className="col-lg-7">
              <div className="checkout-card">
                <h4>Contact Information</h4>

                <div className="row g-3">
                  {/* First Name */}
                  <div className="col-md-6">
                    <label htmlFor="firstName">First Name</label>

                    <input
                      id="firstName"
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Last Name */}
                  <div className="col-md-6">
                    <label htmlFor="lastName">Last Name</label>

                    <input
                      id="lastName"
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="col-md-6">
                    <label htmlFor="email">Email</label>

                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div className="col-md-6">
                    <label htmlFor="phone">Phone</label>

                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      pattern="[0-9]{10}"
                      maxLength="10"
                      placeholder="10-digit phone number"
                      required
                    />
                  </div>
                </div>

                {/* Shipping Address */}
                <h4 className="mt-5">Shipping Address</h4>

                <div className="row g-3">
                  {/* Address */}
                  <div className="col-12">
                    <label htmlFor="address">Address</label>

                    <textarea
                      id="address"
                      name="address"
                      rows="3"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  {/* City */}
                  <div className="col-md-6">
                    <label htmlFor="city">City</label>

                    <input
                      id="city"
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* State */}
                  <div className="col-md-6">
                    <label htmlFor="state">State</label>

                    <input
                      id="state"
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* PIN Code */}
                  <div className="col-md-6">
                    <label htmlFor="pincode">PIN Code</label>

                    <input
                      id="pincode"
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      pattern="[0-9]{6}"
                      maxLength="6"
                      placeholder="6-digit PIN code"
                      required
                    />
                  </div>
                </div>

                {/* Payment Method */}
                <h4 className="mt-5">Payment Method</h4>

                <div className="payment-options">
                  {/* Cash on Delivery */}
                  <label>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={(e) =>
                        setPaymentMethod(e.target.value)
                      }
                    />

                    <span>
                      <i className="bi bi-cash-stack"></i>
                      Cash on Delivery
                    </span>
                  </label>

                  {/* Card */}
                  <label>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={(e) =>
                        setPaymentMethod(e.target.value)
                      }
                    />

                    <span>
                      <i className="bi bi-credit-card"></i>
                      Credit / Debit Card
                    </span>
                  </label>

                  {/* UPI */}
                  <label>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={paymentMethod === "upi"}
                      onChange={(e) =>
                        setPaymentMethod(e.target.value)
                      }
                    />

                    <span>
                      <i className="bi bi-phone"></i>
                      UPI
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="col-lg-5">
              <div className="checkout-summary">
                <h4>Order Summary</h4>

                {cartItems.map((item) => {
                  const itemPrice = Number(item.price) || 0;
                  const quantity = Number(item.quantity) || 1;
                  const itemTotal = itemPrice * quantity;

                  return (
                    <div
                      className="checkout-product"
                      key={`${item.id}-${item.size || ""}-${item.color || ""}`}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                      />

                      <div>
                        <h6>{item.name}</h6>

                        <small>
                          {item.size && `${item.size} / `}
                          {item.color && `${item.color} × `}
                          {quantity}
                        </small>
                      </div>

                      <strong>
                        ₹{itemTotal.toLocaleString("en-IN")}
                      </strong>
                    </div>
                  );
                })}

                <hr />

                {/* Subtotal */}
                <div className="summary-row">
                  <span>Subtotal</span>

                  <strong>
                    ₹{subtotal.toLocaleString("en-IN")}
                  </strong>
                </div>

                {/* Shipping */}
                <div className="summary-row">
                  <span>Shipping</span>

                  <strong>
                    {shipping === 0
                      ? "FREE"
                      : `₹${shipping.toLocaleString("en-IN")}`}
                  </strong>
                </div>

                {/* Total */}
                <div className="summary-total">
                  <span>Total</span>

                  <strong>
                    ₹{total.toLocaleString("en-IN")}
                  </strong>
                </div>

                {/* Place Order */}
                <button
                  type="submit"
                  className="btn NIHA-btn w-100 mt-4"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Checkout;

