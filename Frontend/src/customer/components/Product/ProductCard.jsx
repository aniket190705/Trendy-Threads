"use client";

import { useRouter } from "next/navigation";
import SmartImage from "@/components/common/SmartImage";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const router = useRouter();

  return (
    <div className="productCard w-[15rem] cursor-pointer overflow-hidden rounded-[28px] border border-white/70 bg-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-2xl">
      <div
        onClick={() => router.push(`/product/${product.productId}`)}
        className="relative h-[20rem] bg-stone-50"
      >
        <SmartImage
          src={product.imageUrl}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, 20vw"
          className="object-cover object-top"
        />
      </div>

      <div
        onClick={() => router.push(`/product/${product.productId}`)}
        className="bg-white p-4"
      >
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
    </div>
  );
};

export default ProductCard;
