import React from "react";
import { Link } from "react-router-dom";

const Card = ({ item }) => {
  return (
    <Link to={`/sell/products/${item.id}`} className="block">
      <div className="bg-white shadow-md p-4 rounded-lg">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-40 object-cover rounded-md"
        />
        <h2 className="text-lg font-semibold mt-2">{item.name}</h2>
        <p className="text-gray-600">Category: {item.category}</p>
        <p className="text-blue-600 font-bold">${item.price}</p>
        <p className="text-gray-400 text-sm">Added on: {item.date}</p>
        <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md w-full hover:bg-blue-700">
          Buy Now
        </button>
      </div>
    </Link>
  );
};

export default Card;
