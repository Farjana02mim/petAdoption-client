// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaStar } from "react-icons/fa";
// import AOS from "aos";
// import "aos/dist/aos.css";

// const Card = ({ service }) => {
//   const navigate = useNavigate();
//   const { serviceId, serviceName, image, rating, price } = service;

//   useEffect(() => {
//     AOS.init({ duration: 800, once: true });
//   }, []);

//   const handleViewDetails = () => {
//     navigate(`/service/${serviceId}`);
//   };

//   return (
//     <div
//       data-aos="fade-up"
//       className="card bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300 overflow-hidden"
//     >
//       <div className="p-4">
//         <figure>
//           <img
//             className="w-full h-48 object-cover rounded-xl"
//             src={image}
//             alt={serviceName}
//           />
//         </figure>

//         <div className="mt-3">
//           <h2 className="text-lg font-semibold text-gray-800 mb-2">{serviceName}</h2>
//           <div className="flex items-center gap-2 mb-2">
//             <FaStar className="text-yellow-400" />
//             <span className="text-sm font-medium text-gray-700">{rating}</span>
//           </div>
//           <p className="text-gray-600 mb-3">Price: ${price}</p>
//           <button
//             onClick={handleViewDetails}
//             className="w-full py-2 bg-gradient-to-r from-pink-400 to-orange-300 text-white font-semibold rounded-lg hover:opacity-90 transition"
//           >
//             View Details
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Card;
