"use client";

import { useEffect } from "react";
import Card from "../HomeSectionCard/Card";
import { useAuth } from "../../../Context/AuthContext";
import { buildApiUrl } from "@/lib/api";

const HomeSectionCarousel = ({ data }) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const { login, setIsSignedIn, setUser } = useAuth();

  useEffect(() => {
    if (!token || token === "undefined") {
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(buildApiUrl("/api/users/profile"), {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const user = await response.json();
          setUser(user);
          setIsSignedIn(true);
          login(user);
          localStorage.setItem("user", JSON.stringify(user));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [login, setIsSignedIn, setUser, token]);

  return <Card product={data} />;
};

export default HomeSectionCarousel;
