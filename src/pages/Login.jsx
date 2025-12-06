// import React, { useContext, useRef, useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router";
// import MyContainer from "../components/MyContainer";
// import { FaEye } from "react-icons/fa";
// import { IoEyeOff } from "react-icons/io5";
// import { toast } from "react-toastify";
// import { AuthContext } from "../context/AuthContext";

// const Login = () => {
//   const [show, setShow] = useState(false);

//   const {
//     signInWithEmailAndPasswordFunc,
//     signInWithEmailFunc,
//     setLoading,
//     setUser,
//     user,
//   } = useContext(AuthContext);

//   const location = useLocation();
//   const navigate = useNavigate();
//   const from = location.state?.from?.pathname || "/";

//   const emailRef = useRef(null);

  
//   useEffect(() => {
//     if (user) {
//       navigate(from, { replace: true });
//     }
//   }, [user, navigate, from]);

  
//   const handleSignin = (e) => {
//     e.preventDefault();
//     const email = e.target.email?.value;
//     const password = e.target.password?.value;

//     signInWithEmailAndPasswordFunc(email, password)
//       .then((res) => {
//         setLoading(false);

//         if (!res.user?.emailVerified) {
//           toast.error("Your email is not verified.");
//           return;
//         }

//         setUser(res.user);
//         toast.success("Signin successful");
//       })
//       .catch((e) => toast.error(e.message));
//   };

  
//   const handleGoogleSignin = () => {
//     signInWithEmailFunc()
//       .then((res) => {
//         setLoading(false);
//         setUser(res.user);
//         toast.success("Signin successful");
//       })
//       .catch((e) => toast.error(e.message));
//   };

  
//   const handleForgetPasswordPage = () => {
//     const email = emailRef.current?.value || "";

//     navigate("/forgot-password", {
//       state: { email }, 
//     });
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FCE7F3] via-[#FFF5EB] to-[#F3F4F6] relative overflow-hidden">

//       <div className="absolute inset-0">
//         <div className="absolute w-72 h-72 bg-pink-200/40 rounded-full blur-3xl top-5 left-10"></div>
//         <div className="absolute w-72 h-72 bg-orange-200/40 rounded-full blur-3xl bottom-10 right-10"></div>
//       </div>

//       <MyContainer>
//         <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 p-6 lg:p-10 text-gray-800">

          
//           <div className="max-w-lg text-center lg:text-left">
//             <h1 className="text-5xl font-extrabold text-[#E0557E] drop-shadow-md">
//               Welcome Back 🐾
//             </h1>
//             <p className="mt-4 text-lg text-gray-700 leading-relaxed">
//               Keep your pets safe this winter. Login to continue your warm and cozy pet care journey ❄️🐶
//             </p>
//           </div>

          
//           <div className="w-full max-w-md backdrop-blur-xl bg-white/60 border border-pink-200 shadow-xl rounded-2xl p-8">
//             <form onSubmit={handleSignin} className="space-y-5">
//               <h2 className="text-2xl font-semibold mb-3 text-center text-[#D9466E]">
//                 Login
//               </h2>

              
//               <div>
//                 <label className="block text-sm mb-1 text-gray-700">Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   ref={emailRef}
//                   placeholder="your@email.com"
//                   className="input input-bordered w-full bg-white/80 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-300"
//                   required
//                 />
//               </div>

              
//               <div className="relative">
//                 <label className="block text-sm mb-1 text-gray-700">Password</label>
//                 <input
//                   type={show ? "text" : "password"}
//                   name="password"
//                   placeholder="••••••••"
//                   className="input input-bordered w-full bg-white/80 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-300 pr-12"
//                   required
//                 />
//                 <span
//                   onClick={() => setShow(!show)}
//                   className="absolute right-3 top-[50%] -translate-y-[-10%] cursor-pointer text-gray-600 z-50"
//                 >
//                   {show ? <FaEye size={22} /> : <IoEyeOff size={22} />}
//                 </span>
//               </div>

              
//               <button
//                 className="hover:underline text-sm text-pink-600"
//                 type="button"
//                 onClick={handleForgetPasswordPage}
//               >
//                 Forgot password?
//               </button>

              
//               <button
//                 type="submit"
//                 className="w-full bg-gradient-to-r from-pink-400 to-orange-300 text-white py-2 rounded-lg font-semibold hover:opacity-90"
//               >
//                 Login
//               </button>

              
//               <div className="flex items-center justify-center gap-2 my-2">
//                 <div className="h-px w-16 bg-gray-300"></div>
//                 <span className="text-sm text-gray-600">or</span>
//                 <div className="h-px w-16 bg-gray-300"></div>
//               </div>

              
//               <button
//                 type="button"
//                 onClick={handleGoogleSignin}
//                 className="flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-800 px-5 py-2 rounded-lg w-full font-semibold hover:bg-gray-50"
//               >
//                 <img
//                   src="https://www.svgrepo.com/show/475656/google-color.svg"
//                   className="w-5 h-5"
//                 />
//                 Continue with Google
//               </button>

//               <p className="text-center text-sm text-gray-700 mt-3">
//                 Don’t have an account?{" "}
//                 <Link className="text-pink-500 hover:text-ppink-700 underline" to="/signup">
//                   Sign up
//                 </Link>
//               </p>
//             </form>
//           </div>
//         </div>
//       </MyContainer>
//     </div>
//   );
// };

// export default Login;
