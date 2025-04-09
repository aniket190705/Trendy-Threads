import React from "react";

const Card = ({ product }) => {
  return (
    <div className="cursor-pointer flex flex-col justify-center items-center bg-white rounded-lg shadow-lg overflow-hidden w-[15] m-3 ">
      <div className="h-[13rem] w-[10rem] flex justify-center">
        <img
          src={product.imageUrl}
          className="object-cover object-top w-full h-full"
          alt=""
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900">{product.brand}</h3>
        <p className="mt-2 text-sm text-gray-500">{product.title}</p>
      </div>
    </div>
  );
};

export default Card;
