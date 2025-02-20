import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/auth/authSlice";
import Card from "../components/sell/sellCard";
import Filters from "../components/sell/Filter";
import CategoryForm from "../components/account/AddForm";
import Settings from "../components/account/Settings";
import Notifications from "../components/account/Notifications";
import { addItem } from "../redux/slices/categorySlice";

const categoryModels = {
  Products: { name: "", description: "", price: "", image: null },
  Exchange: {
    itemOffered: "",
    itemWanted: "",
    condition: "",
    location: "",
    image: null,
  },
  Done: { taskTitle: "", completionDate: "", remarks: "", proofImage: null },
  Freelance: {
    gigTitle: "",
    category: "",
    price: "",
    deliveryTime: "",
    image: null,
  },
  Transport: {
    vehicleType: "",
    capacity: "",
    route: "",
    price: "",
    image: null,
  },
};

const AccountPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();

  const handleLogout = () => dispatch(logout());

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    setFormData(categoryModels[category] || {});
  };

  const handleFormChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("selectedCategory :", selectedCategory);
    // Dispatch the action and handle success or failure
    dispatch(addItem({ categoryName: selectedCategory, data: formData }))
      .then(() => {
        console.log("Submitted Data:", formData);
        setSelectedCategory("");
        setFormData({});
        // Optionally show success message here
      })
      .catch((error) => {
        console.error("Error adding item:", error);
        // Handle the error here
      });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row flex-1 p-6 gap-6">
        <div className="flex flex-col md:w-1/3 bg-gray-100">
          <div className="w-full bg-white shadow-md p-4 rounded-lg mb-6">
            <img
              src="https://picsum.photos/150"
              alt="Profile"
              className="w-24 h-24 rounded-full mb-4"
            />
            <h2 className="text-xl font-semibold">User Name</h2>
            <p className="text-gray-600">user@example.com</p>
          </div>
          <Notifications />
        </div>
        <div className="w-full flex flex-col bg-white shadow-md p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Listings</h3>
          <Filters />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
            {[1, 2, 3].map((i) => (
              <Card
                key={i}
                item={{
                  image: "https://picsum.photos/200",
                  name: `Item ${i}`,
                  category: `Category ${i}`,
                  price: 100 * i,
                  date: `2021-01-0${i}`,
                }}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col md:w-1/3 bg-gray-100">
          <CategoryForm
            {...{
              selectedCategory,
              categoryModels,
              formData,
              handleCategoryChange,
              handleFormChange,
              handleSubmit,
            }}
          />
          <Settings handleLogout={handleLogout} />
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
