// AuthContext.jsx
import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Load user from localStorage when context initializes
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : null;
  });
  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });
  const [isSignedIn, setIsSignedIn] = useState(() => {
    return !!localStorage.getItem("user");
  });

  const [productToAdd, setProductToAdd] = useState(null);

  const [addresses, setAddresses] = useState(() => {
    const storedAddresses = localStorage.getItem("addresses");
    return storedAddresses ? JSON.parse(storedAddresses) : [];
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
