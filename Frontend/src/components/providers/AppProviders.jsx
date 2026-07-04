"use client";

import { AuthProvider } from "@/Context/AuthContext";

export default function AppProviders({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}
