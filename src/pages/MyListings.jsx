import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";

const MyListings = () => {
  const { user } = useContext(AuthContext);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    const fetchListings = async () => {
      setLoading(true);
      try {
        const token = await user.getIdToken();
        const res = await fetch(`http://localhost:3000/listings`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setListings(data);
      } catch (err) {
        toast.error("Failed to load your listings");
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [user]);

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
        const res = await fetch(`http://localhost:3000/listings/${id}`, {
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
      )}
    </div>
  );
};

export default MyListings;
