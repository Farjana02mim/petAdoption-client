// import React, { useEffect, useState } from "react";
// import ServiceCard from "../components/Card";

// const Services = () => {
//   const [servicesData, setServicesData] = useState([]);

//   useEffect(() => {
//     fetch("/services.json")
//       .then((res) => res.json())
//       .then((data) => setServicesData(data))
//       .catch((err) => console.error(err));
//   }, []);

//   return (
//     <div className="py-10 bg-gray-50">
//       <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
//         Winter Care Services
//       </h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-11/12 mx-auto">
//         {servicesData.map((service) => (
//           <ServiceCard key={service.serviceId} service={service} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Services;
