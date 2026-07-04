"use client";

import { useState } from "react";
import Navigation from "@/customer/components/Navigation/Navigation";
import Footer from "@/customer/components/Footer/Footer";

export default function AppShell({ children }) {
  const [notification, setNotification] = useState("");

  return (
    <div className="min-h-screen">
      <Navigation
        notification={notification}
        setNotification={setNotification}
      />
      <div className="mx-auto w-full max-w-[1440px] px-0 pb-10">{children}</div>
      <Footer />
    </div>
  );
}
