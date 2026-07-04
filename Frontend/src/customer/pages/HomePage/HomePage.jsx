"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiFilter } from "react-icons/fi";
import FilterSidebar from "../../components/Filters/FilterSidebar";
import Card from "../../components/HomeSectionCard/Card";
import { homeCatalog } from "@/lib/catalog";

const HomePage = () => {
  const [filters, setFilters] = useState({
    category: "All",
    brand: "",
    minPrice: "",
    maxPrice: "",
  });
  const [products, setProducts] = useState(homeCatalog);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    let filtered = homeCatalog;

    if (filters.category !== "All") {
      filtered = filtered.filter(
        (product) =>
          product.category.toLowerCase() === filters.category.toLowerCase(),
      );
    }

    if (filters.brand) {
      filtered = filtered.filter((product) =>
        product.brand.toLowerCase().includes(filters.brand.toLowerCase()),
      );
    }

    if (filters.minPrice) {
      filtered = filtered.filter(
        (product) => product.discountedPrice >= Number(filters.minPrice),
      );
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(
        (product) => product.discountedPrice <= Number(filters.maxPrice),
      );
    }

    setProducts(filtered);
  }, [filters]);

  return (
    <div className="relative overflow-hidden px-4 pb-8 pt-8 sm:px-6 lg:px-8">
      <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-hero-grid blur-3xl" />
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="mx-auto mb-10 grid max-w-7xl gap-8 rounded-[36px] border border-white/70 bg-white/75 px-6 py-10 shadow-soft backdrop-blur sm:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:px-12"
      >
        <div className="space-y-5">
          <p className="font-serif text-sm uppercase tracking-[0.35em] text-brand-500">
            Premium Everyday Style
          </p>
          <h1 className="max-w-2xl font-serif text-4xl leading-tight text-brand-900 sm:text-5xl lg:text-6xl">
            Modern fashion, faster checkout, the same trusted flows.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-stone-600 sm:text-lg">
            Explore curated picks across menswear, womenswear, and footwear with
            polished browsing, sharper spacing, and the same backend-powered cart,
            orders, and payment experience.
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-stone-600">
            <span className="rounded-full border border-stone-200 bg-stone-50 px-4 py-2">
              {homeCatalog.length}+ products
            </span>
            <span className="rounded-full border border-stone-200 bg-stone-50 px-4 py-2">
              Responsive storefront
            </span>
            <span className="rounded-full border border-stone-200 bg-stone-50 px-4 py-2">
              Razorpay-ready checkout
            </span>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-2">
          {products.slice(0, 4).map((item, index) => (
            <div
              key={`${item.productId ?? "product"}-${item.title}-${index}`}
              className={`rounded-[28px] border border-stone-200 bg-gradient-to-br p-4 ${
                index % 2 === 0
                  ? "from-stone-100 to-white"
                  : "from-brand-50 to-stone-100"
              }`}
            >
              <p className="text-xs uppercase tracking-[0.28em] text-stone-500">
                {item.category}
              </p>
              <p className="mt-3 font-semibold text-brand-900">{item.brand}</p>
              <p className="mt-2 text-sm text-stone-600">{item.title}</p>
              <p className="mt-4 text-lg font-semibold text-brand-700">
                Rs. {item.discountedPrice}
              </p>
            </div>
          ))}
        </div>
      </motion.section>

      <button
        className="fixed right-4 top-24 z-50 flex items-center rounded-full bg-brand-700 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-brand-800"
        onClick={() => setIsFilterOpen(!isFilterOpen)}
      >
        <FiFilter className="mr-2" /> Filters
      </button>

      <div
        className={`fixed left-0 top-0 z-40 h-full w-72 transform bg-white shadow-2xl transition-transform duration-300 ${
          isFilterOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <FilterSidebar filters={filters} setFilters={setFilters} />
      </div>

      {isFilterOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40"
          onClick={() => setIsFilterOpen(false)}
        />
      )}

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.length > 0 ? (
          products.map((item, index) => (
            <motion.div
              key={`${item.productId ?? "product"}-${item.title}-${index}`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, delay: index * 0.03 }}
            >
              <Card product={[item]} isSingleCard />
            </motion.div>
          ))
        ) : (
          <div className="col-span-full rounded-[28px] border border-dashed border-stone-300 bg-white/80 px-6 py-16 text-center shadow-sm">
            <p className="font-serif text-2xl text-brand-900">No products found.</p>
            <p className="mt-3 text-sm text-stone-500">
              Try adjusting category, brand, or price filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
