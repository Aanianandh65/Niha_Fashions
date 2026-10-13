import{Link} from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar(){
    const { cartItems, wishlistItems } = useCart();
    const cartCount = cartItems.reduce((total, item) => total + Number(item.quantity || 1), 0);
    return(
        <nav className="navbar-expand-lg NIHA-navbar sticky-top">
            <div className="container-fluid px-lg-5">
                <Link className ="navbar-brand NIHA-logo" to="/">
                NIHA
                </Link>
                <button 
                   className="navbar-toggler"
                   type="button"
                   data-bs-toggle="collapse"
                   data-bs-target="#NIHANavbar"
                   aria-controls="NIHANavbar"
                   aria-expanded="false"
                   aria-label="Toggle navigation">
                    <i className="bi bi-list"></i>
                   </button>
                   <div className="collapse navbar-collapse" id="NIHANavbar">
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/shop">Shop</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/collections">Collections</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/new-arrivals">New Arrivals</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">Contact</Link>
                        </li>
                    </ul>
                    <div className="navbar-actions">
                        <button className="icon-btn" aria-label="Search">
                            <i className="bi bi-search"></i>
                        </button>
                        <Link to="/wishlist" className="icon-btn" aria-label="Wishlist">
                        <i className="bi bi-heart"></i>{wishlistItems.length > 0 && <span className="cart-count">{wishlistItems.length}</span>}
                        </Link>
                        <Link to="/cart" className="icon-btn" aria-label="Cart">
                        <i className="bi bi-bag"></i>
                        <span className="cart-count">{cartCount}</span>
                        </Link>
                        <Link to="/profile" className="icon-btn" aria-label="Profile">
                        <i className="bi bi-person"></i>
                        </Link>

                    </div>
                   </div>
            </div>
        </nav>
    );
}
export default Navbar;