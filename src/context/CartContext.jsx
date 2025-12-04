import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Función para agregar al carrito
  const addToCart = (product) => {
    // Verificamos si ya existe para aumentar cantidad, o lo agregamos nuevo
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item._id === product._id);
      if (existing) {
        return prevCart.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true); // Abrimos el carrito automáticamente al agregar
  };

  // Función para eliminar del carrito
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== id));
  };

  // Calcular Total
  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Toggle para abrir/cerrar carrito
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, total, isCartOpen, toggleCart }}>
      {children}
    </CartContext.Provider>
  );
};