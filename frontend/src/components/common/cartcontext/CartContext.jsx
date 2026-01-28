import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prev) => {
      const existingItem = prev.find((i) => i.id === item.id);

      if (existingItem) {
        return prev.map((i) => {
          return i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i;
        });
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id, change) => {
    setCartItems((items) =>
      items.map(
        (item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + change) }
            : item
      )
      .filter((item) => item.quantity > 0)
    )
  };

  const removeItem = (id) =>{
    setCartItems((items) => items.filter((item)=> item.id !== id))
  }

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateQuantity, removeItem }}
    >
      {children}
    </CartContext.Provider>
  );

};


export const useCart = () => useContext(CartContext);