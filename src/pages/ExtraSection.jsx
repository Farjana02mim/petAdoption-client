import React from "react";

const ExtraSection = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4 space-y-12">

        {/* Awareness Section */}
        <div className="bg-white p-8 rounded-xl shadow-md text-center">
          <h2 className="text-3xl font-bold mb-4">Why Adopt from PawMart?</h2>
          <p className="text-gray-700">
            Adopting a pet saves lives! Give a furry friend a loving home instead of buying.
          </p>
        </div>

        {/* Accessories Section */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-8">Winter Pet Accessories ❄️</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl hover:scale-105 transition-transform">
              <img src="https://i.ibb.co.com/p67hfHCM/photo-1576078094990-536fdfb303bc.jpg" className="w-full h-48 object-cover rounded-lg mb-3" alt="Cozy Dog Sweater" />
              <h3 className="text-lg font-semibold mb-1">Cozy Dog Sweater</h3>
              <p className="text-gray-700 font-medium">Price: $20</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl hover:scale-105 transition-transform">
              <img src="https://i.ibb.co.com/5XLfHcWN/photo-1753415189714-77ebd60ac1da.jpg" className="w-full h-48 object-cover rounded-lg mb-3" alt="Warm Cat Hoodie" />
              <h3 className="text-lg font-semibold mb-1">Warm Cat Hoodie</h3>
              <p className="text-gray-700 font-medium">Price: $18</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl hover:scale-105 transition-transform">
              <img src="https://i.ibb.co.com/CKPF45zc/istockphoto-2199963865-612x612.webp" className="w-full h-48 object-cover rounded-lg mb-3" alt="Furry Boots for Dogs" />
              <h3 className="text-lg font-semibold mb-1">Furry Boots for Dogs</h3>
              <p className="text-gray-700 font-medium">Price: $15</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ExtraSection;
