"use client";
import { useRouter } from "next/navigation";
import SmartImage from "@/components/common/SmartImage";

const Card = ({ product, isSingleCard = false }) => {
  const router = useRouter();
  const currentProduct = product[0];

  return (
    <div
      className={`group ${
        isSingleCard
          ? "w-full"
          : "w-[80%] flex-shrink-0 sm:w-[50%] md:w-[25%] lg:w-[20%]"
      } cursor-pointer overflow-hidden rounded-[28px] border border-white/70 bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-2xl`}
      onClick={() => router.push(`/product/${currentProduct.productId}`)}
    >
      <div className="relative h-[17rem] w-full overflow-hidden bg-stone-50">
        <SmartImage
          src={currentProduct.imageUrl}
          alt={currentProduct.title}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-contain p-4 transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-4 text-center">
        <p className="text-xs uppercase tracking-[0.28em] text-stone-400">
          {currentProduct.brand}
        </p>
        <h3 className="mt-2 text-lg font-semibold text-brand-900">
          {currentProduct.title}
        </h3>
        <p className="mt-3 font-medium text-stone-600">
          Rs. {currentProduct.discountedPrice}
        </p>
      </div>
    </div>
  );
};

export default Card;
