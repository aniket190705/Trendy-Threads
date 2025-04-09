import React from "react";
import "./ProductCard.css";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  console.log("Product from props:", product);
  return (
    <>
      <div
        // onClick={console.log(product)}
        className="productCard w-[15rem] m-3 transition-all cursor-pointer"
      >
        <div
          onClick={() => {
            console.log("Product sent to ProductDetails:", product);
            navigate(`/product/${product.productId}`, { state: product });
          }}
          className="h-[20rem]"
        >
          <img
            src={product.imageUrl}
            className="w-full h-full object-cover object-top"
            alt=""
          />
        </div>

        <div
          onClick={() => navigate("/product/5")}
          className="textPart bg-white p-3"
        >
          <div>
            <p className="font-bold opacity-60">{product.brand}</p>
            <p>{product.title}</p>
          </div>

          <div className="flex items-center space-x-2 mt-2">
            <p className="font-semibold">₹{product.discountedPrice}</p>
            <p className="line-through opacity-60">₹{product.price}</p>
            <p className="text-green-600 font-semibold">
              {product.discountPersent}% off
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
