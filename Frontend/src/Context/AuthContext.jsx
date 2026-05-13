// AuthContext.jsx
import { createContext, useState, useContext } from "react";

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
  } catch (error) {
    localStorage.removeItem(key);
    return fallback;
  }
};

export const AuthProvider = ({ children }) => {
  // Load user from localStorage when context initializes
  const [user, setUser] = useState(() => {
    return readStoredJson("user", null);
  });

  const [cart, setCart] = useState(() => {
    return readStoredJson("cart", null);
  });
  const [cartItems, setCartItems] = useState(() => {
    return readStoredJson("cartItems", []);
  });
  const [isSignedIn, setIsSignedIn] = useState(() => {
    return !!readStoredJson("user", null);
  });

  const [productToAdd, setProductToAdd] = useState(null);

  const [addresses, setAddresses] = useState(() => {
    return readStoredJson("addresses", []);
  });

  // Save user to state + localStorage on login
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

  // Clear state + localStorage on logout
  const logout = () => {
    setUser(null);
    setIsSignedIn(false);
    localStorage.removeItem("token"); // If you store a token
    localStorage.removeItem("user");
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
