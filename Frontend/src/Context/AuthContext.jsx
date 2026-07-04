"use client";

import { createContext, useEffect, useState, useContext } from "react";

const AuthContext = createContext();

const readStoredJson = (key, fallback) => {
  const storedValue = localStorage.getItem(key);

  if (
    storedValue === null ||
    storedValue === undefined ||
    storedValue === "" ||
    storedValue === "undefined" ||
    storedValue === "null"
  ) {
    return fallback;
  }

  try {
    return JSON.parse(storedValue);
  } catch {
    localStorage.removeItem(key);
    return fallback;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [productToAdd, setProductToAdd] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const storedUser = readStoredJson("user", null);
    const storedCart = readStoredJson("cart", null);
    const storedCartItems = readStoredJson("cartItems", []);
    const storedAddresses = readStoredJson("addresses", []);

    setUser(storedUser);
    setCart(storedCart);
    setCartItems(storedCartItems);
    setAddresses(storedAddresses);
    setIsSignedIn(!!storedUser);
    setIsHydrated(true);
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsSignedIn(true);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const signup = (userData) => {
    setUser(userData);
    setIsSignedIn(true);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsSignedIn(false);
    setCart(null);
    setCartItems([]);
    setAddresses([]);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("addresses");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        isSignedIn,
        setIsSignedIn,
        cart,
        setCart,
        cartItems,
        setCartItems,
        productToAdd,
        setProductToAdd,
        addresses,
        setAddresses,
        signup,
        isHydrated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
