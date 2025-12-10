import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CategoryFilteredProducts = () => {
  const { categoryName } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://pet-adoption-server-chi.vercel.app/category/${categoryName}`)
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load category items:", err);
        toast.error("Failed to load category items");
        setLoading(false);
      });
  }, [categoryName]);

  return (
    <div className="w-11/12 mx-auto my-16">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-3xl font-bold text-center mb-10">
        Showing Results for: <span className="text-blue-500">{categoryName}</span>
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : items.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item) => (
            <Card key={item._id} listing={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryFilteredProducts;
