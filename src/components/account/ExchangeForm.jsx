// components/account/ExchangeForm.js
import React from "react";
import PropTypes from "prop-types";

const ExchangeForm = ({
  formData,
  handleFormChange,
  handleSubmit,
  isLoading,
  uploadError,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add New Exchange</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Item Offered</label>
          <input
            type="text"
            name="itemOffered"
            value={formData.itemOffered}
            onChange={handleFormChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            disabled={isLoading}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Item Wanted</label>
          <input
            type="text"
            name="itemWanted"
            value={formData.itemWanted}
            onChange={handleFormChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            disabled={isLoading}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Condition</label>
          <select
            name="condition"
            value={formData.condition}
            onChange={handleFormChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            disabled={isLoading}
          >
            <option value="new">New</option>
            <option value="used">Used</option>
            <option value="like new">Like New</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleFormChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            disabled={isLoading}
          />
        </div>
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
          {isLoading ? "Adding..." : "Add Exchange"}
        </button>
        {uploadError && (
          <p className="text-red-500 mt-2 text-sm">{uploadError}</p>
        )}
      </form>
    </div>
  );
};

ExchangeForm.propTypes = {
  formData: PropTypes.object.isRequired,
  handleFormChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  uploadError: PropTypes.string,
};

export default ExchangeForm;
