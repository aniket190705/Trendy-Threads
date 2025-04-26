import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import React, { useRef } from "react";
import Card from "../HomeSectionCard/Card";
import { Button } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useState } from "react";
import { mens_kurta } from "../../../data/mensKurta";
import { useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
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
            "http://localhost:5454/api/users/profile",
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

  const syncActiveIndex = ({ item }) => {
    setActiveIndex(item);
  };
  const items = data.slice(0, 10).map((item) => {
    return <Card product={item} />;
  });

  return (
    <div className="relative p-4 lg:p-8">
      <div className="relative p-5">
        <h2 className="m-4 font-bold text-3xl">{sectionName}</h2>
        <AliceCarousel
          ref={carouselRef}
          className="py-7"
          items={items}
          disableButtonsControls
          responsive={responsive}
          disableDotsControls
          onSlideChanged={syncActiveIndex}
          activeIndex={activeIndex}
        />
      </div>
      {activeIndex != items.length - 5 && (
        <Button
          variant="contained"
          className="z-50"
          sx={{
            position: "absolute",
            top: "12.5rem",
            transform: "rotate(90deg)",
            right: "0rem",
          }}
          onClick={nextSlide}
        >
          <KeyboardArrowRightIcon
            className=""
            sx={{ transform: "rotate(-90deg)" }}
          />
        </Button>
      )}
      {activeIndex != 0 && (
        <Button
          variant="contained"
          className="z-50"
          sx={{
            position: "absolute",
            top: "12.5rem",
            transform: "rotate(90deg)",
            left: "0rem",
          }}
          onClick={prevSlide}
        >
          <KeyboardArrowRightIcon
            className=""
            sx={{ transform: "rotate(90deg)" }}
          />
        </Button>
      )}
    </div>
  );
};

export default HomeSectionCarousel;
