import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Notifications from "../components/account/Notifications";
import {
  productsThunks,
  exchangeThunks,
  doneThunks,
  freelanceThunks,
  transportThunks,
} from "../redux/slices/categorySlice";
import useCloudinaryUpload from "../hooks/useCloudinaryUpload";
import {
  selectAllCategories,
  selectCategoriesLoading,
  selectCategoriesError,
} from "../redux/slices/selectors/categorySelectors";
import ListingsSection from "../components/account/Listings";
import ProfileSection from "../components/account/Profile";
import ProductForm from "../components/account/ProductForm";
import ExchangeForm from "../components/account/ExchangeForm";
import TransportForm from "../components/account/TransportForm";
import FreelanceForm from "../components/account/FreelanceForm";
import DoneForm from "../components/account/DoneForm";
import { Product } from "../models/ProductModel";
import { Exchange } from "../models/ExchangeModel";
import { Transport } from "../models/TransportModel";
import { Freelance } from "../models/FreelanceModel";
import { Done } from "../models/DoneModel";

// Category configurations
const categoryModels = {
  Products: () => new Product({}),
  Exchange: () => new Exchange({}),
  Done: () => new Done({}),
  Freelance: () => new Freelance({}),
  Transport: () => new Transport({}),
};

const categoryModelsSubmit = {
  Products: Product,
  Exchange: Exchange,
  Done: Done,
  Freelance: Freelance,
  Transport: Transport,
};

const formComponents = {
  Products: ProductForm,
  Exchange: ExchangeForm,
  Transport: TransportForm,
  Freelance: FreelanceForm,
  Done: DoneForm,
};

// Utility functions
const convertDatesToStrings = (obj) => {
  const result = { ...obj };
  for (const key in result) {
    if (result[key] instanceof Date) {
      result[key] = result[key].toISOString().split("T")[0];
    } else if (typeof result[key] === "object" && result[key] !== null) {
      result[key] = convertDatesToStrings(result[key]);
    }
  }
  return result;
};

const convertStringsToDates = (obj, dateFields) => {
  const result = { ...obj };
  dateFields.forEach((field) => {
    if (result[field] && typeof result[field] === "string") {
      result[field] = new Date(result[field]);
    }
  });
  return result;
};

// FormWrapper Component: Manages individual form state and logic
const FormWrapper = ({ category, onSubmit, uploadImage, isLoading }) => {
  const [formData, setFormData] = useState(() => {
    const model = categoryModels[category]();
    return convertDatesToStrings(model);
  });
  const [localUploadError, setLocalUploadError] = useState(null);

  // Handle form input changes, including files and nested fields
  const handleFormChange = async (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file" && files.length > 0) {
      try {
        const uploadedImageUrls = await Promise.all(
          Array.from(files).map(uploadImage)
        );
        if (uploadedImageUrls.length > 0) {
          const imageField = category === "Done" ? "proofImages" : "images";
          setFormData((prev) => ({
            ...prev,
            [imageField]: [
              ...(Array.isArray(prev[imageField]) ? prev[imageField] : []),
              ...uploadedImageUrls,
            ],
          }));
          setLocalUploadError(null);
        }
      } catch (error) {
        setLocalUploadError(`Image upload failed: ${error.message}`);
      }
    } else if (name.includes(".")) {
      const [arrayName, index, field] = name.split(/[\].]+/);
      const parsedIndex = parseInt(index);
      setFormData((prev) => {
        const currentArray = Array.isArray(prev[arrayName])
          ? prev[arrayName]
          : [];
        const updatedArray = [...currentArray];
        while (updatedArray.length <= parsedIndex) updatedArray.push({});
        updatedArray[parsedIndex] = {
          ...updatedArray[parsedIndex],
          [field]: value,
        };
        return { ...prev, [arrayName]: updatedArray };
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle form submission
  const handleLocalSubmit = (e) => {
    e.preventDefault();
    onSubmit(category, formData);
  };

  const FormComponent = formComponents[category];

  return (
    <FormComponent
      formData={formData}
      handleFormChange={handleFormChange}
      handleSubmit={handleLocalSubmit}
      isLoading={isLoading}
      uploadError={localUploadError}
    />
  );
};

// AccountPage Component
const AccountPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [, setUploadError] = useState(null);
  const { uploadImage, isLoading } = useCloudinaryUpload();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  // Fetch category data
  const categories = useSelector(selectAllCategories);
  const loading = useSelector(selectCategoriesLoading);
  const error = useSelector(selectCategoriesError);

  // Fetch items on mount
  useEffect(() => {
    dispatch(productsThunks.fetchItemsById()); // Correct: "By" and "Id" capitalized
    dispatch(doneThunks.fetchItemsById());
    dispatch(exchangeThunks.fetchItemsById());
    dispatch(freelanceThunks.fetchItemsById());
    dispatch(transportThunks.fetchItemsById());
  }, [dispatch]);

  // Handle category selection
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setUploadError(null);
  };

  // Handle form submission
  const handleSubmit = (category, formData) => {
    if (!user) {
      setUploadError("You must be signed in to add items.");
      return;
    }

    const thunks = {
      Products: productsThunks,
      Exchange: exchangeThunks,
      Done: doneThunks,
      Freelance: freelanceThunks,
      Transport: transportThunks,
    };

    const categoryThunks = thunks[category];
    if (!categoryThunks) {
      setUploadError("Invalid category.");
      return;
    }

    const dateFieldsByCategory = {
      Products: ["createdAt", "updatedAt"],
      Exchange: ["createdAt", "updatedAt", "closedAt"],
      Transport: ["createdAt", "updatedAt", "activeUntil"],
      Freelance: ["createdAt", "updatedAt"],
      Done: ["createdAt", "updatedAt", "completionDate", "completedAt"],
    };

    const dataWithOwner = {
      ...formData,
      [category === "Freelance"
        ? "freelancer"
        : category === "Done"
        ? "doner"
        : "owner"]: {
        id: user.uid,
        name: user.displayName || "Anonymous",
        email: user.email,
        imageUrl: user.photoURL || "",
      },
    };

    const dataWithDates = convertStringsToDates(
      dataWithOwner,
      dateFieldsByCategory[category] || []
    );

    const ModelClass = categoryModelsSubmit[category];
    const item = new ModelClass(dataWithDates);

    dispatch(categoryThunks.addItem(item))
      .unwrap()
      .then(() => {
        setSelectedCategory("");
        setUploadError(null);
        dispatch(categoryThunks.fetchItems());
      })
      .catch((error) => {
        setUploadError(`Failed to add item: ${error.message}`);
      });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row flex-1 p-6 gap-6">
        {/* Left Sidebar */}
        <div className="flex flex-col md:w-1/3 bg-gray-100">
          <ProfileSection user={user} />
          <Notifications />
        </div>
        {/* Middle Listings Section */}
        <ListingsSection
          loading={loading}
          error={error}
          shopItems={categories.products}
          doneItems={categories.done}
          exchangeItems={categories.exchange}
          freelanceItems={categories.freelance}
          transportItems={categories.transport}
        />
        {/* Right Form Section */}
        <div className="flex flex-col md:w-1/3 bg-gray-100">
          {/* Render all FormWrappers, but only show the selected one */}
          {Object.keys(categoryModels).map((category) => (
            <div
              key={category}
              style={{
                display: selectedCategory === category ? "block" : "none",
              }}
            >
              <FormWrapper
                category={category}
                onSubmit={handleSubmit}
                uploadImage={uploadImage}
                isLoading={isLoading}
              />
            </div>
          ))}
          {/* Show category selector when no category is selected */}
          {!selectedCategory && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Add New Listing</h2>
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                disabled={isLoading}
              >
                <option value="">Select Category</option>
                {Object.keys(categoryModels).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
