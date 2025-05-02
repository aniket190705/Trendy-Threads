import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import React, { useRef } from "react";
import Card from "../HomeSectionCard/Card";
import { Button } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useState } from "react";
import { mens_kurta } from "../../../data/mensKurta";
import { useEffect } from "react";
import { useAuth } from "../../../Context/AuthContext";
const HomeSectionCarousel = ({ data, sectionName }) => {
  const [userData, setUserData] = useState(null);
  const token = localStorage.getItem("token");

  const { login, isSignedIn, setIsSignedIn } = useAuth();
  const responsive = {
    0: { items: 1 },
    720: { items: 3 },
    1024: { items: 5.5 },
  };

  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef();
  const nextSlide = () => {
    carouselRef.current.slideNext();
  };
  const prevSlide = () => {
    carouselRef.current.slidePrev();
  };

  useEffect(() => {
    if (
      token == undefined ||
      token == null ||
      token == "" ||
      !token ||
      token == "undefined"
    ) {
      console.log("No token found in home section carousel");
      return;
    } else {
      const fetchUserData = async () => {
        try {
          console.log("Token in home section carousel", token);
          const response = await fetch(
            "https://trendy-threads-jsld.onrender.comapi/users/profile",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            setUserData(data);
            setIsSignedIn(true);
            login(data);
            localStorage.setItem("user", JSON.stringify(data));
            console.log("User data from home", data);
          } else {
            console.error("Failed to fetch user data");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchUserData();
    }
  }, [token]);

  return (
    //
    <Card product={data} />
  );
};

export default HomeSectionCarousel;
