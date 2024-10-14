import React from "react";

const SearchBar = ({ searchQuery, setSearchQuery, fetchImages }) => {
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchImages(searchQuery);
    } else {
      alert("Please enter a search query.");
    }
  };

  return (
    <div className="flex justify-center mb-10">
      <form onSubmit={handleSearch} className="flex space-x-4 w-full max-w-2xl">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for images..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
