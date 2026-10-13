import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cartItems")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const [wishlistItems, setWishlistItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem("wishlistItems")) || []; } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const toggleWishlist = (product) => {
    setWishlistItems((items) => {
      const exists = items.some((item) => String(item.id) === String(product.id));
      return exists ? items.filter((item) => String(item.id) !== String(product.id)) : [...items, { ...product }];
    });
  };

  const isInWishlist = (id) => wishlistItems.some((item) => String(item.id) === String(id));
  const removeFromWishlist = (id) => setWishlistItems((items) => items.filter((item) => String(item.id) !== String(id)));

  const addToCart = (product) => {
    setCartItems((items) => {
      const existing = items.find((item) => item.id === product.id);
      if (existing) {
        return items.map((item) => item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item);
      }
      return [...items, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => setCartItems((items) => items.filter((item) => item.id !== id));
  const updateQuantity = (id, quantity) => {
    const next = Math.max(1, Number(quantity) || 1);
    setCartItems((items) => items.map((item) => item.id === id ? { ...item, quantity: next } : item));
  };
  const clearCart = () => setCartItems([]);

  const cartSubtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1), 0),
    [cartItems]
  );

  return (
    <CartContext.Provider value={{ cartItems, cartSubtotal, addToCart, removeFromCart, updateQuantity, clearCart, wishlistItems, toggleWishlist, isInWishlist, removeFromWishlist }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
