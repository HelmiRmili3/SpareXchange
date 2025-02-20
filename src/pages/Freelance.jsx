import { useState } from "react";
import Filters from "../components/sell/Filter";
import GigsGrid from "../components/freelance/gigGrid";

const items = [
  {
    id: 1,
    title: "Web Design with React",
    seller: "John Doe",
    price: 250,
    deliveryTime: 5,
    image: "https://picsum.photos/300",
  },
  {
    id: 2,
    title: "Mobile App Development",
    seller: "Jane Smith",
    price: 500,
    deliveryTime: 7,
    image: "https://picsum.photos/300",
  },
  {
    id: 3,
    title: "SEO Optimization",
    seller: "Michael Brown",
    price: 150,
    deliveryTime: 3,
    image: "https://picsum.photos/300",
  },
  {
    id: 4,
    title: "Logo & Branding Design",
    seller: "Emily Davis",
    price: 100,
    deliveryTime: 2,
    image: "https://picsum.photos/300",
  },
  {
    id: 5,
    title: "Content Writing & Blog Posts",
    seller: "Robert Wilson",
    price: 80,
    deliveryTime: 4,
    image: "https://picsum.photos/300",
  },
  {
    id: 6,
    title: "E-Commerce Store Setup",
    seller: "Sarah Johnson",
    price: 300,
    deliveryTime: 6,
    image: "https://picsum.photos/300",
  },
];

const Freelance = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("");

  const filteredItems = items
    .filter((item) => item.seller.toLowerCase().includes(search.toLowerCase()))
    .filter((item) => (category ? item.title === category : true))
    .sort((a, b) => {
      if (sortBy === "price") return a.price - b.price;
      if (sortBy === "date") return new Date(b.date) - new Date(a.date);
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-700 text-center">
        Freelance Items
      </h1>
      <p className="text-gray-600 mt-2 text-center">
        Sell plastic bottles, paper, and other recyclables easily.
      </p>

      {/* Filters Component */}
      <Filters
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {/* Grid Component */}
      <GigsGrid items={filteredItems} />
    </div>
  );
};

export default Freelance;
