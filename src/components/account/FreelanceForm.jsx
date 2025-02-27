import React from "react";
import PropTypes from "prop-types";

const FreelanceForm = ({
  formData,
  handleFormChange,
  handleSubmit,
  isLoading,
  uploadError,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add New Freelance Gig</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Gig Title</label>
          <input
            type="text"
            name="gigTitle"
            value={formData.gigTitle}
            onChange={handleFormChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            disabled={isLoading}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleFormChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            rows="4"
            disabled={isLoading}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleFormChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            disabled={isLoading}
          />
        </div>
        {/* <div className="mb-4">
          <label className="block text-gray-700 mb-1">
            Basic Package Price
          </label>
          <input
            type="number"
            name="packages[0].price"
            value={formData.packages?.[0]?.price || ""}
            onChange={handleFormChange}
            step="0.01"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            disabled={isLoading}
            required
          />
        </div> */}
        {/* <div className="mb-4">
          <label className="block text-gray-700 mb-1">
            Delivery Time (days)
          </label>
          <input
            type="number"
            name="packages[0].deliveryTime"
            value={formData.packages?.[0]?.deliveryTime || ""}
            onChange={handleFormChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            disabled={isLoading}
            required
          />
        </div> */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Images</label>
          <input
            type="file"
            name="images"
            onChange={handleFormChange}
            multiple
            className="w-full p-2 border rounded"
            disabled={isLoading}
          />
          {formData.images.length > 0 && (
            <p className="text-sm text-gray-500 mt-1">
              {formData.images.length} file(s) selected
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-400"
        >
          {isLoading ? "Adding..." : "Add Gig"}
        </button>
        {uploadError && (
          <p className="text-red-500 mt-2 text-sm">{uploadError}</p>
        )}
      </form>
    </div>
  );
};

FreelanceForm.propTypes = {
  formData: PropTypes.object.isRequired,
  handleFormChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  uploadError: PropTypes.string,
};
export default FreelanceForm;
