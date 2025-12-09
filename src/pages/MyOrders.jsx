import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "react-toastify/dist/ReactToastify.css";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) return;
    fetch(`http://localhost:3000/orders?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => toast.error("Failed to load orders"));
  }, [user]);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("My Orders Report", 14, 20);
    const tableColumn = [
      "Listing Name",
      "Buyer Name",
      "Price",
      "Quantity",
      "Address",
      "Date",
      "Phone",
    ];
    const tableRows = orders.map((o) => [
      o.listingName,
      o.buyerName,
      `$${o.price}`,
      o.quantity,
      o.address,
      o.date,
      o.phone,
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });
    doc.save("my-orders.pdf");
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-[#FFF5EB] via-[#FCE7F3] to-[#F3F4F6]">
      <ToastContainer position="top-right" autoClose={3000} />

      <h2 className="text-3xl font-bold text-pink-600 mb-6 flex justify-between items-center">
        My Orders
        <button
          onClick={handleDownloadPDF}
          className="bg-pink-400 text-white px-4 py-2 rounded-lg hover:opacity-90"
        >
          Download Report
        </button>
      </h2>

      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white/80 backdrop-blur-lg rounded-lg shadow-md">
          <thead>
            <tr className="bg-pink-200 text-gray-800">
              <th className="px-4 py-2">Listing Name</th>
              <th className="px-4 py-2">Buyer Name</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Address</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Phone</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((o) => (
                <tr key={o._id} className="border-t">
                  <td className="px-4 py-2">{o.listingName}</td>
                  <td className="px-4 py-2">{o.buyerName}</td>
                  <td className="px-4 py-2">${o.price}</td>
                  <td className="px-4 py-2">{o.quantity}</td>
                  <td className="px-4 py-2">{o.address}</td>
                  <td className="px-4 py-2">{o.date}</td>
                  <td className="px-4 py-2">{o.phone}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
