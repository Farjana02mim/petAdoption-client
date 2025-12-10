import React, { useState, useContext, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Card from "../components/Card";

const PetsSupplies = () => {
  const [listings, setListings] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://pet-adoption-server-chi.vercel.app/listing")
      .then((res) => res.json())
      .then((data) => {
        console.log("API DATA:", data);

        const items = data?.data || data?.listings || [];

        setListings(items);
        setFiltered(items);
      })
      .catch((err) => toast.error("Failed to load listings"));
  }, []);

  const handleFilter = (category) => {
    setCategoryFilter(category);
    filterListings(searchTerm, category);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    filterListings(value, categoryFilter);
  };

  const filterListings = (search, category) => {
    let temp = [...listings];

    if (category !== "All") {
      temp = temp.filter((l) => l.category === category);
    }

    if (search) {
      temp = temp.filter((l) =>
        l.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(temp);
  };

  return (
    <div className="min-h-screen py-10 px-4 md:px-10 bg-gradient-to-br from-[#FFF5EB] via-[#FCE7F3] to-[#F3F4F6]">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="text-3xl font-bold text-pink-600 mb-6 text-center">
        Pets & Supplies
      </h2>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={handleSearch}
          className="border border-gray-300 p-2 text-black rounded-lg w-full max-w-md focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      </div>

      <div className="flex justify-center text-black gap-4 mb-6 flex-wrap">
        {["All", "Pets", "Food", "Accessories", "Care Products"].map((cat) => (
          <button
            key={cat}
            onClick={() => handleFilter(cat)}
            className={`px-4 py-2 rounded-lg font-semibold ${
              categoryFilter === cat
                ? "bg-pink-400 text-white"
                : "bg-white border border-gray-300 hover:bg-gray-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length === 0 ? (
          <p className="text-center col-span-3">No listings found.</p>
        ) : (
          filtered.map((item) => <Card key={item._id} listing={item} />)
        )}
      </div>
    </div>
  );
};

export default PetsSupplies;
