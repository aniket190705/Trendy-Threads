// AuthContext.jsx
import { createContext, useState, useContext } from "react";

// 1. Create the context
const AuthContext = createContext();

// 2. Create the Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Logged-in user
  const [isSignedIn, setIsSignedIn] = useState(false); // Boolean to check if user is signed in
  const login = (user) => setUser(user);
  const logout = () => {
    setUser(null);
    setIsSignedIn(false);
    localStorage.removeItem("token"); // 🔐 Clear token from localStorage
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isSignedIn, setIsSignedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 3. Custom hook to use AuthContext easily
export const useAuth = () => useContext(AuthContext);
