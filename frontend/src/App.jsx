import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import { CartProvider } from "./context/CartContext";

import Collections from "./pages/Collections";
import NewArrivals from "./pages/NewArrivals";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  return (
    <CartProvider>
    <>
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/shop" element={<Shop />} />

          <Route
            path="/product/:id"
            element={<ProductDetails />}
          />

          <Route path="/cart" element={<Cart />} />

          <Route
            path="/wishlist"
            element={<Wishlist />}
          />

          <Route
            path="/checkout"
            element={<Checkout />}
          />

          <Route path="/login" element={<Login />} />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route
            path="/orders"
            element={<Orders />}
          />

          <Route
            path="/collections"
            element={<Collections />}
          />

          <Route
            path="/new-arrivals"
            element={<NewArrivals />}
          />

          <Route path="/about" element={<About />} />

          <Route
            path="/contact"
            element={<Contact />}
          />
        </Routes>
      </main>

      <Footer />
    </>
    </CartProvider>
  );
}

export default App;