import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";

const MyListings = () => {
  const { user } = useContext(AuthContext);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingListing, setEditingListing] = useState(null);
  const [updatedData, setUpdatedData] = useState({ name: "", category: "", price: "", location: "" });

  const SERVER_URL = import.meta.env.VITE_SERVER_URL;

  // Fetch listings
  useEffect(() => {
    if (!user) return;

    const fetchListings = async () => {
      setLoading(true);
      try {
        const token = await user.getIdToken();
        const res = await fetch(`${SERVER_URL}/listing?email=${user.email}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setListings(Array.isArray(data) ? data : []);
      } catch (err) {
        toast.error("Failed to load your listings");
        setListings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [user, SERVER_URL]);

  // Delete listing
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This listing will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const token = await user.getIdToken();
        const res = await fetch(`${SERVER_URL}/listing/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (data.success) {
          setListings(listings.filter((l) => l._id !== id));
          Swal.fire("Deleted!", "Listing has been deleted.", "success");
        } else {
          Swal.fire("Error!", "Delete failed.", "error");
        }
      } catch (err) {
        Swal.fire("Error!", "Delete failed.", "error");
      }
    }
  };

  // Open edit modal
  const handleEdit = (listing) => {
    setEditingListing(listing);
    setUpdatedData({
      name: listing.name,
      category: listing.category,
      price: listing.price,
      location: listing.location,
    });
  };

  // Update listing
  const handleUpdate = async () => {
    try {
      const token = await user.getIdToken();
      const res = await fetch(`${SERVER_URL}/listing/${editingListing._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });
      const data = await res.json();

      if (data.success) {
        setListings(
          listings.map((l) => (l._id === editingListing._id ? { ...l, ...updatedData } : l))
        );
        setEditingListing(null);
        Swal.fire("Updated!", "Listing has been updated.", "success");
      } else {
        Swal.fire("Error!", "Update failed.", "error");
      }
    } catch (err) {
      Swal.fire("Error!", "Update failed.", "error");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-[#FFF5EB] via-[#FCE7F3] to-[#F3F4F6]">
      <ToastContainer position="top-right" autoClose={3000} />

      <h2 className="text-3xl font-bold text-pink-600 mb-6">My Listings</h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
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
                    <td className="px-4 text-black py-2">{l.name}</td>
                    <td className="px-4 text-black py-2">{l.category}</td>
                    <td className="px-4 text-black py-2">${l.price}</td>
                    <td className="px-4 text-black py-2">{l.location}</td>
                    <td className="px-4 text-black py-2 flex gap-2">
                      <button
                        className="bg-orange-300 px-2 py-1 rounded text-white"
                        onClick={() => handleEdit(l)}
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
      )}

      {/* Edit Modal */}
      {editingListing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-bold mb-4">Update Listing</h3>
            <input
              type="text"
              className="border p-2 w-full mb-2"
              placeholder="Name"
              value={updatedData.name}
              onChange={(e) => setUpdatedData({ ...updatedData, name: e.target.value })}
            />
            <input
              type="text"
              className="border p-2 w-full mb-2"
              placeholder="Category"
              value={updatedData.category}
              onChange={(e) => setUpdatedData({ ...updatedData, category: e.target.value })}
            />
            <input
              type="number"
              className="border p-2 w-full mb-2"
              placeholder="Price"
              value={updatedData.price}
              onChange={(e) => setUpdatedData({ ...updatedData, price: e.target.value })}
            />
            <input
              type="text"
              className="border p-2 w-full mb-4"
              placeholder="Location"
              value={updatedData.location}
              onChange={(e) => setUpdatedData({ ...updatedData, location: e.target.value })}
            />
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-400 px-4 py-2 rounded text-white"
                onClick={() => setEditingListing(null)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 px-4 py-2 rounded text-white"
                onClick={handleUpdate}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyListings;
