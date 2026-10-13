import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const { cartItems, cartSubtotal, updateQuantity, removeFromCart } = useCart();
  const shipping = cartSubtotal >= 3000 ? 0 : cartSubtotal > 0 ? 99 : 0;
  const total = cartSubtotal + shipping;

  if (!cartItems.length) return <section className="empty-cart-section"><div className="container text-center"><i className="bi bi-bag empty-cart-icon"></i><h2>Your Cart is Empty</h2><p>Add some products to get started.</p><Link to="/shop" className="btn NIHA-btn">Shop Now</Link></div></section>;

  return <section className="cart-section"><div className="container"><div className="section-heading text-center"><p className="section-eyebrow">YOUR BAG</p><h1>Shopping Cart</h1></div><div className="row g-4"><div className="col-lg-8">{cartItems.map((item) => <div className="checkout-card mb-3 d-flex gap-3 align-items-center" key={item.id}><img src={item.image} alt={item.name} style={{ width: 100, height: 120, objectFit: "cover" }} /><div className="flex-grow-1"><h4>{item.name}</h4><p>₹{Number(item.price).toLocaleString("en-IN")}</p><input aria-label={`Quantity for ${item.name}`} type="number" min="1" value={item.quantity || 1} onChange={(e) => updateQuantity(item.id, e.target.value)} style={{ width: 80 }} /></div><button className="btn btn-outline-dark" onClick={() => removeFromCart(item.id)}>Remove</button></div>)}</div><div className="col-lg-4"><div className="checkout-card"><h4>Order Summary</h4><p>Subtotal <strong className="float-end">₹{cartSubtotal.toLocaleString("en-IN")}</strong></p><p>Shipping <strong className="float-end">₹{shipping.toLocaleString("en-IN")}</strong></p><hr/><p>Total <strong className="float-end">₹{total.toLocaleString("en-IN")}</strong></p><Link to="/checkout" className="btn NIHA-btn w-100">Proceed to Checkout</Link></div></div></div></div></section>;
}
export default Cart;
