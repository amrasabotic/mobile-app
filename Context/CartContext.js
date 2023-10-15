import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartData, setCartData] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [isCartUpdated, setIsCartUpdated] = useState(false);

  useEffect(() => {
    async function getData() {
        const value = await AsyncStorage.getItem("cartItems");
        setCartData(JSON.parse(value));
    }
    getData();
  }, [cartData]);

  useEffect(() => {
    const cartLength = cartData.length;
    setCartCount(cartLength);
  }, [cartData.length]);

  //When cart is updated update async storage
  useEffect(() => {
    async function updateCartData() {
      await AsyncStorage.setItem("cartItems", JSON.stringify(cartData));
      setIsCartUpdated(false);
    }
    if (isCartUpdated) {
      updateCartData();
    }
  }, [isCartUpdated]);

  return (
    <CartContext.Provider
      value={{
        cartData,
        setCartData,
        cartCount,
        isCartUpdated,
        setIsCartUpdated,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
