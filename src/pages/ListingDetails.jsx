import React, { useContext, useState, useEffect } from "react";
import { useParams, Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ListingDetails = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams(); 
  const location = useLocation();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Order form state
  const [orderForm, setOrderForm] = useState({
    buyerName: "",
    buyerEmail: "",
    productId: "",
    productName: "",
    quantity: 1,
    price: "",
    address: "",
    date: "",
    phone: "",
    notes: "",
  });

  // Fetch listing data
  useEffect(() => {
    fetch("/listings.json") // Replace with your API endpoint if needed
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((item) => item.id === parseInt(id));
        if (found) {
          setListing(found);
          // Pre-fill order form
          setOrderForm((prev) => ({
            ...prev,
            buyerName: user?.displayName || "",
            buyerEmail: user?.email || "",
            productId: found.id,
            productName: found.name,
            quantity: found.category === "pet" ? 1 : 1,
            price: found.price,
          }));
        }
      })
      .catch((err) => console.error(err));
  }, [id, user]);

  if (!user) return <Navigate to="/signin" state={{ from: location }} replace />;

  if (!listing) return <p className="text-center mt-10">Listing not found!</p>;

  const handleChange = (e) => {
    setOrderForm({ ...orderForm, [e.target.name]: e.target.value });
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Save order to MongoDB
      const res = await fetch("http://localhost:5000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderForm),
      });
      if (!res.ok) throw new Error("Failed to save order");
      toast.success("Order placed successfully!");
      setShowModal(false);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 md:px-10 bg-gradient-to-br from-[#FFF5EB] via-[#FCE7F3] to-[#F3F4F6]">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-lg rounded-3xl shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              src={listing.image}
              alt={listing.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="md:w-1/2 p-8 space-y-4">
            <h2 className="text-3xl font-bold text-pink-600">{listing.name}</h2>
            <p className="text-gray-700">{listing.description}</p>

            <div className="grid grid-cols-2 gap-3 text-gray-700 mt-4">
              <p><strong>Category:</strong> {listing.category}</p>
              <p><strong>Owner Email:</strong> {listing.ownerEmail}</p>
              <p><strong>Price:</strong> ${listing.price}</p>
              <p><strong>Location:</strong> {listing.location}</p>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="mt-6 w-full py-2 bg-gradient-to-r from-pink-400 to-orange-300 text-white font-semibold rounded-lg hover:opacity-90"
            >
              Adopt / Order Now
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 font-bold"
            >
              X
            </button>
            <h3 className="text-2xl font-semibold text-pink-600 mb-4">Place Order</h3>
            <form onSubmit={handleOrderSubmit} className="space-y-3">
              <input
                type="text"
                name="buyerName"
                value={orderForm.buyerName}
                readOnly
                className="input input-bordered w-full bg-gray-100 rounded"
              />
              <input
                type="email"
                name="buyerEmail"
                value={orderForm.buyerEmail}
                readOnly
                className="input input-bordered w-full bg-gray-100 rounded"
              />
              <input
                type="text"
                name="productId"
                value={orderForm.productId}
                readOnly
                className="input input-bordered w-full bg-gray-100 rounded"
              />
              <input
                type="text"
                name="productName"
                value={orderForm.productName}
                readOnly
                className="input input-bordered w-full bg-gray-100 rounded"
              />
              {listing.category !== "pet" && (
                <input
                  type="number"
                  name="quantity"
                  value={orderForm.quantity}
                  onChange={handleChange}
                  min={1}
                  className="input input-bordered w-full rounded"
                  required
                />
              )}
              <input
                type="text"
                name="price"
                value={orderForm.price}
                readOnly
                className="input input-bordered w-full bg-gray-100 rounded"
              />
              <input
                type="text"
                name="address"
                placeholder="Your Address"
                value={orderForm.address}
                onChange={handleChange}
                className="input input-bordered w-full rounded"
                required
              />
              <input
                type="date"
                name="date"
                value={orderForm.date}
                onChange={handleChange}
                className="input input-bordered w-full rounded"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={orderForm.phone}
                onChange={handleChange}
                className="input input-bordered w-full rounded"
                required
              />
              <textarea
                name="notes"
                placeholder="Additional Notes"
                value={orderForm.notes}
                onChange={handleChange}
                className="input input-bordered w-full rounded"
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
                {loading ? "Placing Order..." : "Place Order"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingDetails;
