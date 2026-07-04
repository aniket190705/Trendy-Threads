"use client";

import Link from "next/link";
import SmartImage from "@/components/common/SmartImage";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  return (
    <Link
      href={`/product/${product.productId}`}
      className="productCard block w-[15rem] overflow-hidden rounded-[28px] border border-white/70 bg-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-2xl"
    >
      <div className="relative h-[20rem] bg-stone-50">
        <SmartImage
          src={product.imageUrl}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, 20vw"
          className="object-cover object-top"
        />
      </div>

      <div className="bg-white p-4">
        <div>
          <p className="font-bold uppercase tracking-[0.24em] text-stone-500">
            {product.brand}
          </p>
          <p className="mt-2 text-sm text-stone-700">{product.title}</p>
        </div>

        <div className="mt-3 flex items-center space-x-2">
          <p className="font-semibold text-brand-800">Rs. {product.discountedPrice}</p>
          <p className="text-sm text-stone-400 line-through">Rs. {product.price}</p>
          <p className="text-sm font-semibold text-emerald-600">
            {product.discountPersent}% off
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
