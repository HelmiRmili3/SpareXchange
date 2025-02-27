// components/account/DoneForm.js
import React from "react";
import PropTypes from "prop-types";

const DoneForm = ({
  formData,
  handleFormChange,
  handleSubmit,
  isLoading,
  uploadError,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add New Done Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Task Title</label>
          <input
            type="text"
            name="doneTitle"
            value={formData.doneTitle}
            onChange={handleFormChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            disabled={isLoading}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Completion Date</label>
          <input
            type="date"
            name="completionDate"
            value={
              formData.completionDate instanceof Date
                ? formData.completionDate.toISOString().split("T")[0]
                : formData.completionDate || ""
            }
            onChange={handleFormChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            disabled={isLoading}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Remarks</label>
          <textarea
            name="remarks"
            value={formData.remarks}
            onChange={handleFormChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            rows="4"
            disabled={isLoading}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Proof Images</label>
          <input
            type="file"
            name="proofImages"
            onChange={handleFormChange}
            multiple
            className="w-full p-2 border rounded"
            disabled={isLoading}
          />
          {formData.proofImages.length > 0 && (
            <p className="text-sm text-gray-500 mt-1">
              {formData.proofImages.length} file(s) selected
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-400"
        >
          {isLoading ? "Adding..." : "Add Task"}
        </button>
        {uploadError && (
          <p className="text-red-500 mt-2 text-sm">{uploadError}</p>
        )}
      </form>
    </div>
  );
};

DoneForm.propTypes = {
  formData: PropTypes.object.isRequired,
  handleFormChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  uploadError: PropTypes.string,
};

export default DoneForm;
