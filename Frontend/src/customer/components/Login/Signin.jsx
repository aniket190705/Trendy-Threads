import React, { useState } from "react";
import { useAuth } from "../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setCart } = useAuth();
  const handleSignIn = async (e) => {
    e.preventDefault();
    setFormError("");
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/signin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // console.log("user from sign in: ", data.user);
        // setCart(data.cart);
        const fetchCart = async () => {
          const response2 = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/api/cart/${data.user._id}`
          );

          const data2 = await response2.json();
          console.log("Cart fetched in signed in: ", data2);
          localStorage.setItem("cart", JSON.stringify(data2 || null));
          setCart(data2); // Set the cart in AuthContext
          // setCartItems(data.cartItems);
          console.log("Cart fetched in signed in: ", data2);
          // console.log("Cart items fetched in signed in: ", data);
        };
        fetchCart();
        localStorage.setItem("token", data.jwt);
        login(data.user); // Save user to context
        navigate("/"); // Redirect to homepage
      } else {
        setFormError(data?.error || "Please check your email and password.");
      }
    } catch (error) {
      console.error("Error signing in:", error);
      setFormError("Something went wrong while signing in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>

        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200 disabled:cursor-not-allowed disabled:bg-blue-400"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
          {formError && (
            <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {formError}
            </div>
          )}
        </form>

        <p className="text-sm text-center text-gray-500 mt-4">
          Don't have an account?{" "}
          <a href="/account/signup" className="text-blue-600 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
