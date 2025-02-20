import { useState } from "react";
import Filters from "../components/sell/Filter";
import Grid from "../components/sell/sellGird";

const items = [
  {
    id: 1,
    name: "Plastic Bottles",
    category: "Plastic",
    price: 5,
    date: "2024-02-10",
    image: "https://placehold.jp/150x150.png",
  },
  {
    id: 2,
    name: "Newspapers",
    category: "Paper",
    price: 2,
    date: "2024-02-12",
    image: "https://placehold.jp/150x150.png",
  },
  {
    id: 3,
    name: "Glass Jars",
    category: "Glass",
    price: 8,
    date: "2024-02-14",
    image: "https://placehold.jp/150x150.png",
  },
  {
    id: 4,
    name: "Metal Cans",
    category: "Metal",
    price: 3,
    date: "2024-02-15",
    image: "https://placehold.jp/150x150.png",
  },
  {
    id: 5,
    name: "Old Electronics",
    category: "Electronics",
    price: 15,
    date: "2024-02-18",
    image: "https://placehold.jp/150x150.png",
  },
];

const Sell = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("");

  const filteredItems = items
    .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
    .filter((item) => (category ? item.category === category : true))
    .sort((a, b) => {
      if (sortBy === "price") return a.price - b.price;
      if (sortBy === "date") return new Date(b.date) - new Date(a.date);
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* <h1 className="text-3xl font-bold text-blue-700 text-center">
        Sell Recyclable Items
      </h1>
      <p className="text-gray-600 mt-2 text-center">
        Sell plastic bottles, paper, and other recyclables easily.
      </p> */}

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
      <Grid items={filteredItems} />
    </div>
  );
};

export default Sell;
