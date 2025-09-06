import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ product, isSingleCard = false }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`${
        isSingleCard
          ? "w-full"
          : "flex-shrink-0 w-[80%] sm:w-[50%] md:w-[25%] lg:w-[20%]"
      } bg-white rounded-lg shadow-md overflow-hidden cursor-pointer`}
      onClick={() => {
        navigate(`/product/${product[0].productId}`, {
          state: product[0],
        });
      }}
    >
      <img
        src={product[0].imageUrl}
        alt={product[0].title}
        className="h-[17rem] w-full object-contain"
      />
      <div className="p-3 text-center">
        <h3 className="font-semibold text-lg">{product[0].title}</h3>
        <p className="text-gray-600 font-medium">
          ₹{product[0].discountedPrice}
        </p>
      </div>
    </div>
  );
};

export default Card;
