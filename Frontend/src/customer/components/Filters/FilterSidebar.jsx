import React from "react";

const FilterSidebar = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="p-6">
      <h2 className="font-bold text-xl mb-4">Filters</h2>

      {/* Category */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Category</label>
        <select
          name="category"
          value={filters.category}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          <option value="All">All</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Shoes">Shoes</option>
        </select>
      </div>

      {/* Brand */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Brand</label>
        <input
          type="text"
          name="brand"
          value={filters.brand}
          onChange={handleChange}
          placeholder="Enter brand"
          className="border p-2 rounded w-full"
        />
      </div>

      {/* Min Price */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Min Price</label>
        <input
          type="number"
          name="minPrice"
          value={filters.minPrice}
          onChange={handleChange}
          placeholder="₹ min"
          className="border p-2 rounded w-full"
        />
      </div>

      {/* Max Price */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Max Price</label>
        <input
          type="number"
          name="maxPrice"
          value={filters.maxPrice}
          onChange={handleChange}
          placeholder="₹ max"
          className="border p-2 rounded w-full"
        />
      </div>
    </div>
  );
};

export default FilterSidebar;
