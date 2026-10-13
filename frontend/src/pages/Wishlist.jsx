import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";

function Wishlist() {
  const { wishlistItems } = useCart();
  return (
    <section className="wishlist-section section-padding">
      <div className="container">
        <div className="section-heading text-center">
          <p className="section-eyebrow">SAVED FOR LATER</p><h1>Wishlist</h1>
        </div>
        {wishlistItems.length ? <div className="row g-4">{wishlistItems.map((product) => <div className="col-6 col-lg-3" key={product.id}><ProductCard product={product} /></div>)}</div> : <div className="text-center py-5"><i className="bi bi-heart fs-1"></i><h3 className="mt-3">Your wishlist is empty</h3><p>Add products you love by clicking the heart icon.</p></div>}
        <div className="text-center mt-4"><Link to="/shop" className="btn NIHA-btn">Continue Shopping</Link></div>
      </div>
    </section>
  );
}
export default Wishlist;
