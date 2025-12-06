// import React, { useContext, useState, useEffect } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { useLocation } from "react-router";
// import { toast } from "react-hot-toast";

// const ForgotPassword = () => {
//   const { sendPassResetEmailFunc } = useContext(AuthContext);

  
//   const location = useLocation();
//   const passedEmail = location.state?.email || "";

//   const [email, setEmail] = useState("");

//   useEffect(() => {
//     setEmail(passedEmail);
//   }, [passedEmail]);

//   const handleReset = async (e) => {
//     e.preventDefault();
//     try {
//       await sendPassResetEmailFunc(email);
//       toast.success("Password reset email sent!");

      
//       window.location.href = "https://mail.google.com/";
//     } catch (err) {
//       toast.error(err.message);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <form
//         onSubmit={handleReset}
//         className="bg-white p-8 rounded-xl shadow-lg w-96 space-y-6"
//       >
//         <h2 className="text-2xl font-bold text-center">Reset Password</h2>

//         <input
//           type="email"
//           placeholder="Your Email"
//           required
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="input input-bordered w-full"
//         />

//         <button type="submit" className="btn btn-primary w-full">
//           Send Reset Email
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ForgotPassword;
