import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Banner from "../components/Banner";
import Card from "../components/Card";
import HomeExtras from "../components/HomeExtras";
import ExtraSection from "./ExtraSection";

const categories = [
  { name: "Pets", emoji: "🐶", value: "Pets" },
  { name: "Pet Food", emoji: "🍖", value: "Food" },
  { name: "Accessories", emoji: "🧸", value: "Accessories" },
  { name: "Pet Care Products", emoji: "🧴", value: "Care Products" },
];

const HomePage = () => {
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();

  // Fetch latest 6 listings from backend
  useEffect(() => {
    fetch("http://localhost:3000/latest-list")
      .then((res) => res.json())
      .then((data) => setListings(data))
      .catch((err) => console.error("Failed to load listings:", err));
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/category-filtered-product/${category.value}`);
  };

  return (
    <div className="space-y-20">
      {/* Banner */}
      <section>
        <Banner />
      </section>

      {/* Category Section */}
      <section className="w-11/12 mx-auto my-12">
        <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.name}
              onClick={() => handleCategoryClick(cat)}
              className="cursor-pointer bg-white rounded-xl shadow-md hover:shadow-xl p-6 flex flex-col items-center justify-center transition-transform hover:scale-105"
            >
              <span className="text-5xl mb-4">{cat.emoji}</span>
              <h3 className="text-xl font-semibold text-center">{cat.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Listings */}
      <section className="w-11/12 mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Recent Listings</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {listings.map((listing) => (
            <Card key={listing._id} listing={listing} />
          ))}
        </div>
      </section>

      {/* Extras */}
      <section className="w-11/12 mx-auto">
        <HomeExtras />
      </section>

      <section className="w-11/12 mx-auto">
        <ExtraSection />
      </section>
    </div>
  );
};

export default HomePage;
