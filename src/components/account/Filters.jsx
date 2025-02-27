// src/components/sell/Filters.js
import React, { useState } from "react";

const Filters = ({ onFilterChange }) => {
  const [category, setCategory] = useState(""); // Filter by category
  const [minPrice, setMinPrice] = useState(""); // Minimum price
  const [maxPrice, setMaxPrice] = useState(""); // Maximum price
  const [searchTerm, setSearchTerm] = useState(""); // Search by name/title

  const categories = [
    "",
    "Products",
    "Exchange",
    "Done",
    "Freelance",
    "Transport",
  ]; // "" for "All"

  const handleFilterChange = () => {
    onFilterChange({
      category: category || null,
      minPrice: minPrice ? parseFloat(minPrice) : null,
      maxPrice: maxPrice ? parseFloat(maxPrice) : null,
      searchTerm: searchTerm || null,
    });
  };

  // Trigger filter change on input blur or button click
  const handleBlurOrSubmit = () => {
    handleFilterChange();
  };

  return (
    <div className="mb-4 p-4 bg-gray-50 rounded-lg shadow">
      <h4 className="text-md font-semibold mb-2">Filter Listings</h4>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            onBlur={handleBlurOrSubmit}
            className="mt-1 block w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((cat) => (
              <option key={cat || "all"} value={cat}>
                {cat || "All"}
              </option>
            ))}
          </select>
        </div>

        {/* Min Price Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Min Price
          </label>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            onBlur={handleBlurOrSubmit}
            placeholder="Min"
            className="mt-1 block w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Max Price Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Max Price
          </label>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            onBlur={handleBlurOrSubmit}
            placeholder="Max"
            className="mt-1 block w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Search Term Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Search
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onBlur={handleBlurOrSubmit}
            placeholder="Search by name..."
            className="mt-1 block w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <button
        onClick={handleBlurOrSubmit}
        className="mt-4 w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default Filters;
