import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Simulating fetching product details from an API
    const fetchProductDetails = async () => {
      const data = {
        id,
        name: "Professional Website Development",
        description:
          "I will create a high-quality, responsive website using modern technologies like React, Node.js, and Tailwind CSS.",
        price: "199.99",
        images: [
          "https://picsum.photos/600/400",
          "https://picsum.photos/600/400",
          "https://picsum.photos/600/400",
          "https://picsum.photos/600/400",
          "https://picsum.photos/600/400",
          "https://picsum.photos/600/400",
          "https://picsum.photos/600/400",
          "https://picsum.photos/600/400",
        ],
      };
      setProduct(data);
    };

    fetchProductDetails();
  }, [id]);

  if (!product) return <p className="text-center mt-10 text-lg">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Image Carousel */}
      <div className="overflow-x-auto whitespace-nowrap flex space-x-4 p-4 border-b">
        {product.images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Product ${index + 1}`}
            className="w-48 h-32 rounded-md object-cover"
          />
        ))}
      </div>

      {/* Product Info */}
      <h1 className="text-3xl font-bold mt-4">{product.name}</h1>
      <p className="text-gray-600 mt-2">{product.description}</p>

      {/* Price */}
      <p className="text-2xl font-bold text-blue-600 mt-4">${product.price}</p>
    </div>
  );
};

export default ProductDetails;
