import React from "react";

const CategoryForm = ({
  selectedCategory,
  categoryModels,
  formData,
  handleCategoryChange,
  handleFormChange,
  handleSubmit,
}) => {
  const categoryFields = categoryModels[selectedCategory] || {};

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded-lg">
      <h3 className="text-lg font-semibold mb-4">
        Add Listing {selectedCategory}
      </h3>
      <select
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="mb-4 p-2 border rounded  w-full"
      >
        <option value="">Select Category</option>
        {Object.keys(categoryModels).map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      {Object.keys(categoryFields).map((field) => (
        <div key={field} className="mb-4">
          <label htmlFor={field} className="block mb-2 text-sm font-semibold">
            {field}
          </label>
          <input
            type={field === "image" ? "file" : "text"}
            name={field}
            value={formData[field] || ""}
            onChange={handleFormChange}
            className="p-2 border rounded w-full"
          />
        </div>
      ))}

      {selectedCategory && (
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded w-full"
        >
          Submit
        </button>
      )}
    </form>
  );
};

export default CategoryForm;
