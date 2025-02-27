import React, { useState } from "react";
import ProductCard from "../ProductCard";
import DoneCard from "../DoneCard";
import ExchangeCard from "../ExchangeCard";
import FreelanceCard from "../FreelanceCard";
import TransportCard from "../TransportCard";

const ListingsSection = ({
  loading,
  error,
  shopItems,
  doneItems,
  exchangeItems,
  freelanceItems,
  transportItems,
}) => {
  const categories = ["shop", "done", "exchange", "freelance", "transport"];
  const [selectedCategory, setSelectedCategory] = useState("shop");

  // Map category to corresponding items prop
  const categoryItems = {
    shop: shopItems || [],
    done: doneItems || [],
    exchange: exchangeItems || [],
    freelance: freelanceItems || [],
    transport: transportItems || [],
  };

  const displayedItems = categoryItems[selectedCategory];

  // Function to render the appropriate card based on category
  const renderCard = (item) => {
    switch (selectedCategory) {
      case "shop":
        return <ProductCard key={item.id} item={item} />;
      case "done":
        return <DoneCard key={item.id} item={item} />;

      case "exchange":
        return <ExchangeCard key={item.id} item={item} />;

      case "freelance":
        return <FreelanceCard key={item.id} item={item} />;

      case "transport":
        return <TransportCard key={item.id} item={item} />;

      default:
        return null; // Fallback, though this shouldn't happen with fixed categories
    }
  };

  return (
    <div className="w-full flex flex-col bg-white shadow-md p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Listings</h3>

      {/* Category Navigation */}
      <div className="mb-6">
        <nav className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-md capitalize ${
                selectedCategory === category
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </nav>
      </div>

      {/* Listings Display */}
      {loading ? (
        <p className="text-center text-gray-600">Loading listings...</p>
      ) : error ? (
        <p className="text-center text-red-600">Error: {error}</p>
      ) : displayedItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
          {displayedItems.map((item) => renderCard(item))}
        </div>
      ) : (
        <p className="text-center text-gray-600">
          No listings available for {selectedCategory}.
        </p>
      )}
    </div>
  );
};

export default ListingsSection;
