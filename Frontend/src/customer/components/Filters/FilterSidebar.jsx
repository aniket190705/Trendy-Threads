"use client";

const FilterSidebar = ({ filters, setFilters }) => {
  const handleChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="h-full bg-white p-6">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.35em] text-stone-400">
          Refine
        </p>
        <h2 className="mt-2 font-serif text-3xl text-brand-900">Filters</h2>
      </div>

      <div className="mb-5">
        <label className="mb-2 block text-sm font-semibold text-stone-700">
          Category
        </label>
        <select
          name="category"
          value={filters.category}
          onChange={handleChange}
          className="w-full rounded-2xl border border-stone-200 bg-stone-50 p-3 text-sm outline-none transition focus:border-brand-400"
        >
          <option value="All">All</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Shoes">Shoes</option>
        </select>
      </div>

      <div className="mb-5">
        <label className="mb-2 block text-sm font-semibold text-stone-700">
          Brand
        </label>
        <input
          type="text"
          name="brand"
          value={filters.brand}
          onChange={handleChange}
          placeholder="Enter brand"
          className="w-full rounded-2xl border border-stone-200 bg-stone-50 p-3 text-sm outline-none transition focus:border-brand-400"
        />
      </div>

      <div className="mb-5">
        <label className="mb-2 block text-sm font-semibold text-stone-700">
          Min Price
        </label>
        <input
          type="number"
          name="minPrice"
          value={filters.minPrice}
          onChange={handleChange}
          placeholder="Rs. min"
          className="w-full rounded-2xl border border-stone-200 bg-stone-50 p-3 text-sm outline-none transition focus:border-brand-400"
        />
      </div>

      <div className="mb-5">
        <label className="mb-2 block text-sm font-semibold text-stone-700">
          Max Price
        </label>
        <input
          type="number"
          name="maxPrice"
          value={filters.maxPrice}
          onChange={handleChange}
          placeholder="Rs. max"
          className="w-full rounded-2xl border border-stone-200 bg-stone-50 p-3 text-sm outline-none transition focus:border-brand-400"
        />
      </div>
    </div>
  );
};

export default FilterSidebar;
