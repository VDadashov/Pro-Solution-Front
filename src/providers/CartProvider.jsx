import { createContext, useContext, useState, useEffect, useMemo } from "react";

// Context yaradılır
const CartContext = createContext();
export const useCart = () => useContext(CartContext);

// Product-u sadələşdir
const prepareMinimalProduct = (product) => ({
  id: product.id,
  title: product.title,
  price: product.price,
  discountPrice: product.discountPrice,
  image: product.images?.$values?.find((img) => img.isMain)?.imagePath || null,
});

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem("Pro-Solution-Cart");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("Pro-Solution-Cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (fullProduct, quantity = 1) => {
    const item = prepareMinimalProduct(fullProduct);
    setCartItems((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + quantity } : p
        );
      }
      return [...prev, { ...item, quantity }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return removeFromCart(id);
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCartItems([]);

  const getTotalCount = () =>
    cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const getTotalPrice = () =>
    cartItems.reduce(
      (sum, item) =>
        sum +
        (item.discountPrice > 0 ? item.discountPrice : item.price) *
          item.quantity,
      0
    );

  const value = useMemo(
    () => ({
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalCount,
      getTotalPrice,
    }),
    [cartItems]
  );

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
};
