import React, { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CardCarousel = ({ product }) => {
  const navigate = useNavigate();
  const carouselRef = useRef(null);
  console.log(product);
  const scroll = (direction) => {
    const container = carouselRef.current;
    const scrollAmount = container.offsetWidth / 2;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative w-full px-6">
      {/* Left Arrow */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full"
      >
        <FaChevronLeft />
      </button>

      {/* Carousel */}
      <div
        ref={carouselRef}
        className="flex overflow-x-auto scrollbar-hide space-x-4 scroll-smooth"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {product.map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[18%] min-w-[18%] snap-start bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
            onClick={() => {
              navigate(`/product/${item.productId}`, {
                state: {
                  item,
                },
              });
            }}
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="h-[18rem] w-full object-cover-top"
            />
            <div className="p-2 text-center font-semibold">{item.title}</div>
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full"
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default CardCarousel;
