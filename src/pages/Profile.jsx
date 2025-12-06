// import React, { useContext, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { updateProfile } from "firebase/auth";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Profile = () => {
//   const { user } = useContext(AuthContext);


//   const [showForm, setShowForm] = useState(false);

  
//   const [name, setName] = useState(user?.displayName || "");
//   const [photo, setPhoto] = useState(user?.photoURL || "");

//   const handleUpdateProfile = async (e) => {
//     e.preventDefault();

//     try {
//       await updateProfile(user, {
//         displayName: name,
//         photoURL: photo,
//       });

//       toast.success("🎉 Profile Updated Successfully!", {
//         position: "top-center",
//       });

//       setShowForm(false); 
//     } catch (error) {
//       console.error(error);
//       toast.error("❌ Failed to update profile");
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-pink-100 via-orange-100 to-gray-200 text-center relative overflow-hidden">

//       <ToastContainer />

//       <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 drop-shadow-lg">
//         Your Profile
//       </h1>

//       {user ? (
//         <div className="mt-10 flex flex-col items-center gap-5 bg-white/30 backdrop-blur-md p-8 rounded-2xl shadow-xl">
          
          
//           <img
//             src={user.photoURL || "https://via.placeholder.com/150"}
//             alt={user.displayName || "User"}
//             className="w-32 h-32 rounded-full object-cover ring-4 ring-pink-300"
//           />

          
//           <h2 className="text-2xl font-semibold text-gray-800">
//             {user.displayName || "No Name"}
//           </h2>
//           <p className="text-gray-700">{user.email || "No Email"}</p>

          
//           <button
//             onClick={() => setShowForm(!showForm)}
//             className="mt-4 px-6 py-2 bg-gradient-to-r from-pink-400 to-orange-300 text-white font-semibold rounded-lg shadow hover:opacity-90 transition"
//           >
//             {showForm ? "Close" : "Update Profile"}
//           </button>

          
//           {showForm && (
//             <form
//               onSubmit={handleUpdateProfile}
//               className="mt-6 w-full flex flex-col gap-4 bg-white/70 p-5 rounded-xl shadow-md"
//             >
//               <input
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 placeholder="Enter name"
//                 className="w-full px-4 py-2 border rounded-lg"
//                 required
//               />

//               <input
//                 type="text"
//                 value={photo}
//                 onChange={(e) => setPhoto(e.target.value)}
//                 placeholder="Photo URL"
//                 className="w-full px-4 py-2 border rounded-lg"
//               />

//               <button
//                 type="submit"
//                 className="px-6 py-2 bg-orange-400 text-white rounded-lg shadow hover:bg-orange-500 transition"
//               >
//                 Save Changes
//               </button>
//             </form>
//           )}
//         </div>
//       ) : (
//         <p className="mt-10 text-gray-700">
//           You need to be logged in to see your profile.
//         </p>
//       )}
//     </div>
//   );
// };

// export default Profile;
