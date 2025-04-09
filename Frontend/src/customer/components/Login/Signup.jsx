import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Signup() {
  const [darkMode, setDarkMode] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const formDataObj = Object.fromEntries(data.entries());
    console.log("user: ", formDataObj);
    try {
      const response = await fetch("http://localhost:5454/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataObj),
      });
      const result = await response.json();
      if (response.ok) {
        console.log("logged in successful: " + result.message);
        localStorage.setItem("token", result.jwt); // ✅ Store JWT
        navigate("/"); // ✅ Redirect to Home Page
      } else {
        alert("Invalid email or password!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div
      className={`flex flex-col justify-center items-center w-full h-screen px-5 transition-colors duration-300 ${
        darkMode ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      {/* Dark Mode Toggle */}
      <div className="flex justify-end w-full max-w-3xl">
        <div className="flex items-center text-white space-x-2">
          <span>Dark Mode:</span>
          <button
            onClick={() => setDarkMode(!darkMode)}
            role="switch"
            aria-checked={darkMode}
            className={`w-12 h-6 rounded-full flex items-center transition-all duration-300 ${
              darkMode ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            <span
              className={`h-5 w-5 bg-white rounded-full transform transition-all duration-300 ${
                darkMode ? "translate-x-6" : "translate-x-1"
              }`}
            ></span>
          </button>
        </div>
      </div>

      {/* Form Container */}
      <div
        className={`w-full max-w-3xl p-6 sm:p-10 rounded-lg shadow-lg transition-colors duration-300 ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        <h1 className="text-center text-2xl sm:text-3xl font-semibold">
          Register for a Free Account
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="w-full mt-8">
            <div className="mx-auto max-w-md flex flex-col gap-4">
              {/* Name Fields */}
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  name="firstName" // ✅ Added name
                  className={`w-full px-4 py-3 rounded-md font-medium border-2 transition-all duration-300 focus:outline-none focus:ring-2 ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white focus:ring-white"
                      : "bg-gray-100 border-gray-300 text-black focus:ring-gray-800"
                  }`}
                  type="text"
                  placeholder="First Name"
                />
                <input
                  name="lastName" // ✅ Added name
                  className={`w-full px-4 py-3 rounded-md font-medium border-2 transition-all duration-300 focus:outline-none focus:ring-2 ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white focus:ring-white"
                      : "bg-gray-100 border-gray-300 text-black focus:ring-gray-800"
                  }`}
                  type="text"
                  placeholder="Last Name"
                />
              </div>

              {/* Email & Phone */}
              <input
                name="email" // ✅ Added name
                className={`w-full px-4 py-3 rounded-md font-medium border-2 transition-all duration-300 focus:outline-none focus:ring-2 ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white focus:ring-white"
                    : "bg-gray-100 border-gray-300 text-black focus:ring-gray-800"
                }`}
                type="email"
                placeholder="Enter your email"
              />

              {/* Password */}
              <input
                name="password" // ✅ Added name
                className={`w-full px-4 py-3 rounded-md font-medium border-2 transition-all duration-300 focus:outline-none focus:ring-2 ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white focus:ring-white"
                    : "bg-gray-100 border-gray-300 text-black focus:ring-gray-800"
                }`}
                type="password"
                placeholder="Password"
              />

              {/* Register Button */}
              <button
                type="submit"
                className="mt-5 flex items-center justify-center tracking-wide font-semibold bg-orange-600 text-white w-full py-4 rounded-md hover:bg-orange-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
