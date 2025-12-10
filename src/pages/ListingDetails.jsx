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
  const [loading, setLoading] = useState(true); // spinner initially
  const [showModal, setShowModal] = useState(false);

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

  useEffect(() => {
    const fetchListing = async () => {
      if (!user) return;
      setLoading(true);
      try {
        const token = await user.getIdToken();
        const res = await fetch(`http://localhost:3000/listing/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) {
          setListing(data.result);
          setOrderForm((prev) => ({
            ...prev,
            buyerName: user.displayName || "",
            buyerEmail: user.email || "",
            productId: data.result._id,
            productName: data.result.name,
            quantity: data.result.category === "Pets" ? 1 : prev.quantity,
            price: data.result.price,
          }));
        } else {
          toast.error("Listing not found");
        }
      } catch (err) {
        toast.error("Failed to fetch listing");
        //console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [id, user]);

  if (!user) return <Navigate to="/signin" state={{ from: location }} replace />;

  // Spinner while loading
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-pink-400 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!listing) return <p className="text-center mt-10">Listing not found!</p>;

  const handleChange = (e) => {
    setOrderForm({ ...orderForm, [e.target.name]: e.target.value });
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/orders/${listing._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...orderForm, downloaded_by: user.email }),
      });
      if (!res.ok) throw new Error("Failed to place order");
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
            <img src={listing.image} alt={listing.name} className="w-full h-full object-cover" />
          </div>
          <div className="md:w-1/2 p-8 space-y-4">
            <h2 className="text-3xl font-bold text-pink-600">{listing.name}</h2>
            <p className="text-gray-700">{listing.description}</p>
            <div className="grid text-gray-700 mt-4">
              <p><strong>Category:</strong> {listing.category}</p>
              <p><strong>Owner Email:</strong> {listing.email}</p>
              <p><strong>Price:</strong> {parseInt(listing.price) > 0 ? `$${listing.price}` : "Free for Adoption"}</p>
              <p><strong>Location:</strong> {listing.location}</p>
            </div>
            <button onClick={() => setShowModal(true)} className="mt-6 w-full py-2 bg-gradient-to-r from-pink-400 to-orange-300 text-white font-semibold rounded-lg hover:opacity-90">
              Adopt / Order Now
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md relative">
            <button onClick={() => setShowModal(false)} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 font-bold">X</button>
            <h3 className="text-2xl font-semibold text-pink-600 mb-4">Place Order</h3>
            <form onSubmit={handleOrderSubmit} className="space-y-3">

              {/* Readonly fields */}
              <input type="text" name="buyerName" value={orderForm.buyerName} readOnly className="input input-bordered w-full bg-gray-100 rounded" />
              <input type="email" name="buyerEmail" value={orderForm.buyerEmail} readOnly className="input input-bordered w-full bg-gray-100 rounded" />
              <input type="text" name="productId" value={orderForm.productId} readOnly className="input input-bordered w-full bg-gray-100 rounded" />
              <input type="text" name="productName" value={orderForm.productName} readOnly className="input input-bordered w-full bg-gray-100 rounded" />

              {/* Quantity logic */}
              {listing.category === "Pets" ? (
                <input type="number" name="quantity" value={1} readOnly className="input input-bordered w-full bg-gray-100 rounded" />
              ) : (
                <input type="number" name="quantity" value={orderForm.quantity} onChange={handleChange} min={1} className="input input-bordered w-full rounded" required />
              )}

              <input type="text" name="price" value={orderForm.price} readOnly className="input input-bordered w-full bg-gray-100 rounded" />
              <input type="text" name="address" placeholder="Your Address" value={orderForm.address} onChange={handleChange} className="input input-bordered w-full rounded" required />
              <input type="date" name="date" value={orderForm.date} onChange={handleChange} className="input input-bordered w-full rounded" required />
              <input type="tel" name="phone" placeholder="Phone Number" value={orderForm.phone} onChange={handleChange} className="input input-bordered w-full rounded" required />
              <textarea name="notes" placeholder="Additional Notes" value={orderForm.notes} onChange={handleChange} className="input input-bordered w-full rounded" />

              <button type="submit" disabled={loading} className={`w-full py-2 rounded-lg font-semibold text-white ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-pink-400 to-orange-300 hover:opacity-90"}`}>
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
