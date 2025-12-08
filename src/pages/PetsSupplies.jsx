import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PetsSupplies = () => {
  const [listings, setListings] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("All");

  useEffect(() => {
    fetch("http://localhost:5000/listings")
      .then((res) => res.json())
      .then((data) => {
        setListings(data);
        setFiltered(data);
      })
      .catch((err) => toast.error("Failed to load listings"));
  }, []);

  const handleFilter = (category) => {
    setCategoryFilter(category);
    if (category === "All") {
      setFiltered(listings);
    } else {
      const filteredData = listings.filter((l) => l.category === category);
      setFiltered(filteredData);
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 md:px-10 bg-gradient-to-br from-[#FFF5EB] via-[#FCE7F3] to-[#F3F4F6]">
      <ToastContainer position="top-right" autoClose={3000} />

      <h2 className="text-3xl font-bold text-pink-600 mb-6 text-center">
        Pets & Supplies
      </h2>

      {/* Category Filter */}
      <div className="flex justify-center gap-4 mb-6 flex-wrap">
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

      {/* Listings Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length === 0 ? (
          <p className="text-center col-span-3">No listings found.</p>
        ) : (
          filtered.map((item) => (
            <div
              key={item._id}
              className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-md overflow-hidden flex flex-col"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-pink-600">{item.name}</h3>
                  <p className="text-gray-700">{item.category}</p>
                  <p className="text-gray-500">{item.location}</p>
                  <p className="text-gray-800 font-semibold mt-2">
                    Price: ${item.price}
                  </p>
                </div>
                <Link
                  to={`/listing/${item._id}`}
                  className="mt-4 block text-center bg-gradient-to-r from-pink-400 to-orange-300 text-white py-2 rounded-lg font-semibold hover:opacity-90"
                >
                  See Details
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PetsSupplies;
