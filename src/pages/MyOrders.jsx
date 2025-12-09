import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "react-toastify/dist/ReactToastify.css";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      try {
        const token = await user.getIdToken();
        const res = await fetch(`http://localhost:3000/orders?email=${user.email}`, {
          headers: { authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        toast.error("Failed to load orders");
      }
    };

    fetchOrders();
  }, [user]);

  const handleDownloadPDF = () => {
    if (orders.length === 0) return toast.info("No orders to download!");
    const doc = new jsPDF();
    doc.text("My Orders Report", 14, 20);

    const tableColumn = [
      "Product Name",
      "Buyer Name",
      "Price",
      "Quantity",
      "Address",
      "Date",
      "Phone",
      "Notes",
    ];

    const tableRows = orders.map((o) => [
      o.productName,
      o.buyerName,
      `$${o.price}`,
      o.quantity,
      o.address,
      new Date(o.date).toLocaleDateString(),
      o.phone,
      o.additionalNotes || "",
    ]);

    doc.autoTable({ head: [tableColumn], body: tableRows, startY: 30 });
    doc.save("my-orders.pdf");
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const token = await user.getIdToken();
        const res = await fetch(`http://localhost:3000/orders/${id}`, {
          method: "DELETE",
          headers: { authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) {
          setOrders(orders.filter((o) => o._id !== id));
          Swal.fire("Deleted!", "Order has been deleted.", "success");
        }
      } catch (err) {
        Swal.fire("Error!", "Failed to delete order.", "error");
      }
    }
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
              <th className="px-4 py-2">Product Name</th>
              <th className="px-4 py-2">Buyer Name</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Address</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Notes</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center py-4">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((o) => (
                <tr key={o._id} className="border-t">
                  <td className="px-4 py-2">{o.productName}</td>
                  <td className="px-4 py-2">{o.buyerName}</td>
                  <td className="px-4 py-2">${o.price}</td>
                  <td className="px-4 py-2">{o.quantity}</td>
                  <td className="px-4 py-2">{o.address}</td>
                  <td className="px-4 py-2">{new Date(o.date).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{o.phone}</td>
                  <td className="px-4 py-2">{o.additionalNotes || ""}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDelete(o._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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

export default MyOrders;
