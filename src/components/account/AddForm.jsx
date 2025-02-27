// // CategoryForm.js
// import React from "react";

// const CategoryForm = ({
//   selectedCategory,
//   categoryModels,
//   formData,
//   handleCategoryChange,
//   handleFormChange,
//   handleSubmit,
//   isLoading,
//   uploadError,
// }) => {
//   if (!selectedCategory) {
//     return (
//       <div className="bg-white p-4 rounded-lg shadow-md mb-6">
//         <h3 className="text-lg font-semibold mb-4">Add New </h3>
//         <select
//           value={selectedCategory}
//           onChange={handleCategoryChange}
//           className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           <option value="">Category</option>
//           {Object.keys(categoryModels).map((cat) => (
//             <option key={cat} value={cat}>
//               {cat}
//             </option>
//           ))}
//         </select>
//       </div>
//     );
//   }

//   const imageField = selectedCategory === "Done" ? "proofImage" : "image";

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="bg-white p-4 rounded-lg shadow-md mb-6"
//     >
//       <label className="block mb-1 capitalize text-gray-700">Category</label>
//       <select
//         value={selectedCategory}
//         onChange={handleCategoryChange}
//         className="w-full p-2 border mb-1    rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//       >
//         <option value="">Category</option>
//         {Object.keys(categoryModels).map((cat) => (
//           <option key={cat} value={cat}>
//             {cat}
//           </option>
//         ))}
//       </select>
//       {Object.keys(categoryModels[selectedCategory]).map((field) => (
//         <div key={field} className="mb-4">
//           <label className="block mb-1 capitalize text-gray-700">
//             {field.replace(/([A-Z])/g, " $1").trim()}
//           </label>
//           {field === imageField ? (
//             <>
//               <input
//                 type="file"
//                 name={field}
//                 onChange={handleFormChange}
//                 accept="image/*"
//                 disabled={isLoading}
//                 className="w-full p-2 border rounded file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//               />
//               {formData[field] && (
//                 <img
//                   src={formData[field]}
//                   alt="Preview"
//                   className="mt-2 max-w-[200px] rounded"
//                 />
//               )}
//             </>
//           ) : (
//             <input
//               type="text"
//               name={field}
//               value={formData[field] || ""}
//               onChange={handleFormChange}
//               className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//               disabled={isLoading}
//             />
//           )}
//         </div>
//       ))}
//       {uploadError && <p className="text-red-500 mb-4">{uploadError}</p>}
//       <button
//         type="submit"
//         disabled={isLoading}
//         className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
//       >
//         {isLoading ? "Uploading..." : "Submit"}
//       </button>
//     </form>
//   );
// };

// export default CategoryForm;
