import React, { useState, useEffect } from "react";
import { FiFilter } from "react-icons/fi";
import FilterSidebar from "../../components/Filters/FilterSidebar";
import Card from "../../components/HomeSectionCard/Card";

// Import product sections
import { mens_kurta } from "../../../../../ecommerceData/ecommerce-products-data-master/Men/men_kurta";
import { dressPage1 } from "../../../../../ecommerceData/ecommerce-products-data-master/dress/page1";
import { mensShoesPage1 } from "../../../../../ecommerceData/ecommerce-products-data-master/shoes/shoes";

const allProducts = [
  ...mens_kurta.map((p) => ({ ...p, category: "Men" })),
  ...dressPage1.map((p) => ({ ...p, category: "Women" })),
  ...mensShoesPage1.map((p) => ({ ...p, category: "Shoes" })),
];

const HomePage = ({ setNotification }) => {
  const [filters, setFilters] = useState({
    category: "All",
    brand: "",
    minPrice: "",
    maxPrice: "",
  });

  const [products, setProducts] = useState(allProducts);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    let filtered = allProducts;

    // Category filter
    if (filters.category !== "All") {
      filtered = filtered.filter(
        (p) => p.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    // Brand filter
    if (filters.brand) {
      filtered = filtered.filter((p) =>
        p.brand.toLowerCase().includes(filters.brand.toLowerCase())
      );
    }

    // Min price filter
    if (filters.minPrice) {
      filtered = filtered.filter(
        (p) => p.discountedPrice >= Number(filters.minPrice)
      );
    }

    // Max price filter
    if (filters.maxPrice) {
      filtered = filtered.filter(
        (p) => p.discountedPrice <= Number(filters.maxPrice)
      );
    }

    setProducts(filtered);
  }, [filters]);

  return (
    <div className="relative">
      {/* Filter Button */}
      <button
        className="fixed top-23 right-3 z-50 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center"
        onClick={() => setIsFilterOpen(!isFilterOpen)}
      >
        <FiFilter className="mr-2" /> Filters
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-lg transform transition-transform duration-300 z-40 ${
          isFilterOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <FilterSidebar filters={filters} setFilters={setFilters} />
      </div>

      {/* Overlay (click to close) */}
      {isFilterOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30"
          onClick={() => setIsFilterOpen(false)}
        ></div>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {products.length > 0 ? (
          products.map((item, index) => (
            <Card key={index} product={[item]} isSingleCard={true} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
