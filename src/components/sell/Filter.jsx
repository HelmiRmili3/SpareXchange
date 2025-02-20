const Filters = ({
  search,
  setSearch,
  category,
  setCategory,
  sortBy,
  setSortBy,
}) => {
  return (
    <div className="flex flex-wrap justify-between items-center bg-blue-100 p-4 my-4 rounded-md mt-6">
      <input
        type="text"
        placeholder="Search items..."
        className="p-2 border rounded-md w-full md:w-1/3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        className="p-2 border rounded-md w-full md:w-1/4 mt-2 md:mt-0"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        <option value="Plastic">Plastic</option>
        <option value="Paper">Paper</option>
        <option value="Glass">Glass</option>
        <option value="Metal">Metal</option>
        <option value="Electronics">Electronics</option>
      </select>

      <select
        className="p-2 border rounded-md w-full md:w-1/4 mt-2 md:mt-0"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="">Sort By</option>
        <option value="price">Price (Low to High)</option>
        <option value="date">Newest First</option>
      </select>
    </div>
  );
};

export default Filters;
