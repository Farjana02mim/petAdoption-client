import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyListings = () => {
  const { user } = useContext(AuthContext);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    fetch(`http://localhost:5000/listings?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setListings(data))
      .catch((err) => toast.error("Failed to load your listings"));
  }, [user]);

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this listing?")) return;
    fetch(`http://localhost:5000/listings/${id}`, { method: "DELETE" })
      .then(() => {
        toast.success("Listing deleted!");
        setListings(listings.filter((l) => l._id !== id));
      })
      .catch((err) => toast.error("Delete failed"));
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-[#FFF5EB] via-[#FCE7F3] to-[#F3F4F6]">
      <ToastContainer position="top-right" autoClose={3000} />

      <h2 className="text-3xl font-bold text-pink-600 mb-6">My Listings</h2>

      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white/80 backdrop-blur-lg rounded-lg shadow-md">
          <thead>
            <tr className="bg-pink-200 text-gray-800">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {listings.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No listings found.
                </td>
              </tr>
            ) : (
              listings.map((l) => (
                <tr key={l._id} className="border-t">
                  <td className="px-4 py-2">{l.name}</td>
                  <td className="px-4 py-2">{l.category}</td>
                  <td className="px-4 py-2">${l.price}</td>
                  <td className="px-4 py-2">{l.location}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      className="bg-orange-300 px-2 py-1 rounded text-white"
                      onClick={() => toast.info("Update feature coming soon")}
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-400 px-2 py-1 rounded text-white"
                      onClick={() => handleDelete(l._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyListings;
