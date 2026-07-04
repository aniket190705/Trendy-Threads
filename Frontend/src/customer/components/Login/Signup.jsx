"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../Context/AuthContext";
import { buildApiUrl } from "@/lib/api";

export default function Signup() {
  const [darkMode, setDarkMode] = useState(false);
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setCart, signup } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");
    setLoading(true);

    const data = new FormData(event.currentTarget);
    const formDataObj = Object.fromEntries(data.entries());

    try {
      const response = await fetch(buildApiUrl("/auth/signup"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataObj),
      });
      const result = await response.json();

      if (response.ok) {
        const cart = result.cart || null;
        localStorage.setItem("cart", JSON.stringify(cart));
        setCart(cart);
        signup(result.user);
        localStorage.setItem("token", result.jwt);
        router.push("/");
      } else {
        setFormError(result?.error || "We could not create your account right now.");
      }
    } catch (error) {
      console.error("Error:", error);
      setFormError("Something went wrong while creating your account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`flex min-h-[80vh] flex-col items-center justify-center px-5 py-10 transition-colors duration-300 ${
        darkMode ? "bg-slate-900" : "bg-transparent"
      }`}
    >
      <div className="flex w-full max-w-3xl justify-end">
        <div className={`flex items-center space-x-2 ${darkMode ? "text-white" : "text-stone-700"}`}>
          <span>Dark Mode:</span>
          <button
            onClick={() => setDarkMode(!darkMode)}
            role="switch"
            aria-checked={darkMode}
            className={`flex h-6 w-12 items-center rounded-full transition-all duration-300 ${
              darkMode ? "bg-green-500" : "bg-stone-300"
            }`}
          >
            <span
              className={`h-5 w-5 rounded-full bg-white transition-all duration-300 ${
                darkMode ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>

      <div
        className={`w-full max-w-3xl rounded-[32px] p-6 shadow-soft transition-colors duration-300 sm:p-10 ${
          darkMode ? "bg-slate-800 text-white" : "bg-white/90 text-stone-900"
        }`}
      >
        <h1 className="text-center font-serif text-3xl sm:text-4xl">
          Register for a Free Account
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mt-8 w-full">
            <div className="mx-auto flex max-w-md flex-col gap-4">
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  name="firstName"
                  className={`w-full rounded-2xl border-2 px-4 py-3 font-medium transition-all duration-300 focus:outline-none focus:ring-2 ${
                    darkMode
                      ? "border-slate-600 bg-slate-700 text-white focus:ring-white"
                      : "border-stone-300 bg-stone-100 text-black focus:ring-stone-800"
                  }`}
                  type="text"
                  placeholder="First Name"
                />
                <input
                  name="lastName"
                  className={`w-full rounded-2xl border-2 px-4 py-3 font-medium transition-all duration-300 focus:outline-none focus:ring-2 ${
                    darkMode
                      ? "border-slate-600 bg-slate-700 text-white focus:ring-white"
                      : "border-stone-300 bg-stone-100 text-black focus:ring-stone-800"
                  }`}
                  type="text"
                  placeholder="Last Name"
                />
              </div>

              <input
                name="email"
                className={`w-full rounded-2xl border-2 px-4 py-3 font-medium transition-all duration-300 focus:outline-none focus:ring-2 ${
                  darkMode
                    ? "border-slate-600 bg-slate-700 text-white focus:ring-white"
                    : "border-stone-300 bg-stone-100 text-black focus:ring-stone-800"
                }`}
                type="email"
                placeholder="Enter your email"
              />

              <input
                name="password"
                className={`w-full rounded-2xl border-2 px-4 py-3 font-medium transition-all duration-300 focus:outline-none focus:ring-2 ${
                  darkMode
                    ? "border-slate-600 bg-slate-700 text-white focus:ring-white"
                    : "border-stone-300 bg-stone-100 text-black focus:ring-stone-800"
                }`}
                type="password"
                placeholder="Password"
              />

              <button
                type="submit"
                disabled={loading}
                className="mt-5 flex w-full items-center justify-center rounded-full bg-brand-800 py-4 font-semibold tracking-wide text-white transition-all duration-300 hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-brand-300"
              >
                {loading ? "Creating Account..." : "Register"}
              </button>
              {formError && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {formError}
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
