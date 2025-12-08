import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddListing = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  
  const [form, setForm] = useState({
    name: "",
    category: "Pets",
    price: "",
    location: "",
    description: "",
    image: "",
    date: "",
    email: user?.email || "",
  });
  const [loading, setLoading] = useState(false);

  if (!user) return <Navigate to="/signin" state={{ from: location }} replace />;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Save listing to MongoDB
      const res = await fetch("http://localhost:5000/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: form.category === "Pets" ? 0 : form.price,
        }),
      });

      if (!res.ok) throw new Error("Failed to add listing");
      toast.success("Listing added successfully!");
      setForm({
        name: "",
        category: "Pets",
        price: "",
        location: "",
        description: "",
        image: "",
        date: "",
        email: user.email,
      });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 md:px-10 bg-gradient-to-br from-[#FFF5EB] via-[#FCE7F3] to-[#F3F4F6]">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-lg rounded-3xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-pink-600 mb-6 text-center">
          Add New Listing
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Product / Pet Name"
            value={form.name}
            onChange={handleChange}
            className="input input-bordered w-full rounded"
            required
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="input input-bordered w-full rounded"
            required
          >
            <option value="Pets">Pets</option>
            <option value="Food">Food</option>
            <option value="Accessories">Accessories</option>
            <option value="Care Products">Care Products</option>
          </select>

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="input input-bordered w-full rounded"
            required={form.category !== "Pets"}
            disabled={form.category === "Pets"}
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            className="input input-bordered w-full rounded"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="input input-bordered w-full rounded"
            required
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
            className="input input-bordered w-full rounded"
            required
          />

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="input input-bordered w-full rounded"
            required
          />

          <input
            type="email"
            name="email"
            value={form.email}
            readOnly
            className="input input-bordered w-full bg-gray-100 rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg font-semibold text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-pink-400 to-orange-300 hover:opacity-90"
            }`}
          >
            {loading ? "Adding..." : "Add Listing"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddListing;
