"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../Context/AuthContext";
import { buildApiUrl } from "@/lib/api";

const readJsonResponse = async (response) => {
  const contentType = response.headers.get("content-type") || "";
  const text = await response.text();

  if (contentType.includes("application/json")) {
    return text ? JSON.parse(text) : {};
  }

  return {
    error: text.includes("<!DOCTYPE")
      ? "The frontend is not pointing to the backend API. Check NEXT_PUBLIC_API_BASE_URL."
      : text || "The server returned an unexpected response.",
  };
};

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, setCart } = useAuth();
  const router = useRouter();

  const handleSignIn = async (event) => {
    event.preventDefault();
    setFormError("");
    setLoading(true);

    try {
      const response = await fetch(buildApiUrl("/auth/signin"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await readJsonResponse(response);

      if (response.ok) {
        const response2 = await fetch(buildApiUrl(`/api/cart/${data.user._id}`));
        const data2 = await readJsonResponse(response2);
        localStorage.setItem("cart", JSON.stringify(data2 || null));
        setCart(data2);
        localStorage.setItem("token", data.jwt);
        login(data.user);
        router.push("/");
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
    <div className="flex min-h-[75vh] items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-[32px] border border-white/70 bg-white/90 p-8 shadow-soft backdrop-blur">
        <p className="text-center text-xs uppercase tracking-[0.35em] text-stone-400">
          Welcome Back
        </p>
        <h2 className="mt-3 text-center font-serif text-4xl text-brand-900">Sign In</h2>

        <form onSubmit={handleSignIn} className="mt-8 space-y-4">
          <div>
            <label className="mb-1 block font-medium text-stone-700">Email</label>
            <input
              type="email"
              value={email}
              required
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 outline-none transition focus:border-brand-400"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="mb-1 block font-medium text-stone-700">Password</label>
            <input
              type="password"
              value={password}
              required
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 outline-none transition focus:border-brand-400"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-brand-800 py-3 font-semibold text-white transition duration-200 disabled:cursor-not-allowed disabled:bg-brand-300 hover:bg-brand-900"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
          {formError && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {formError}
            </div>
          )}
        </form>

        <p className="mt-5 text-center text-sm text-stone-500">
          Don&apos;t have an account?{" "}
          <Link href="/account/signup" className="font-semibold text-brand-700 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
