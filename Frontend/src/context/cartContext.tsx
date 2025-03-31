// cartContext.tsx
import React, { createContext, useState, useContext, ReactNode } from "react";

interface CartItem {
  id: number;
  title: string;
  description: string;
  icon: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => Promise<void>;
  removeFromCart: (id: number) => Promise<void>;
  fetchCartItems: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// const API_BASE_URL = "http://localhost:8000"; // Backend URL

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem("token"); // Assuming token is stored here after login
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/cart`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setCartItems(data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setCartItems([]); // Reset on error
    }
  };

  const addToCart = async (item: CartItem) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/cart/add`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ templateId: item.id, quantity: 1 }),
      });
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      await fetchCartItems(); // Refresh cart after adding
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const removeFromCart = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/cart/remove/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      await fetchCartItems(); // Refresh cart after removing
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, fetchCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};