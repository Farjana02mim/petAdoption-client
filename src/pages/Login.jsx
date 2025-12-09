import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MyContainer from "../components/MyContainer";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [show, setShow] = useState(false);
  const { signInWithEmailAndPasswordFunc, signInWithGoogleFunc, setUser, user } =
    useContext(AuthContext);

  const emailRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (user) navigate(from, { replace: true });
  }, [user, from, navigate]);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await signInWithEmailAndPasswordFunc(email, password);
      setUser(res.user);
      toast.success("Login successful!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const res = await signInWithGoogleFunc();
      setUser(res.user);
      toast.success("Logged in with Google!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FCE7F3] via-[#FFF5EB] to-[#F3F4F6] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute w-72 h-72 bg-pink-200/40 rounded-full blur-3xl top-5 left-10"></div>
        <div className="absolute w-72 h-72 bg-orange-200/40 rounded-full blur-3xl bottom-10 right-10"></div>
      </div>

      <MyContainer>
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 p-6 lg:p-10 text-gray-800">
          {/* Left info */}
          <div className="max-w-lg text-center lg:text-left">
            <h1 className="text-5xl font-extrabold text-[#E0557E] drop-shadow-md">
              Welcome Back 🐾
            </h1>
            <p className="mt-4 text-lg text-gray-700 leading-relaxed">
              Keep your pets safe this winter. Login to continue your cozy pet care journey ❄️🐶
            </p>
          </div>

          {/* Form */}
          <div className="w-full max-w-md backdrop-blur-xl bg-white/60 border border-pink-200 shadow-xl rounded-2xl p-8">
            <form onSubmit={handleEmailLogin} className="space-y-5">
              <h2 className="text-2xl font-semibold mb-3 text-center text-[#D9466E]">
                Login
              </h2>

              <div>
                <label className="block text-sm mb-1 text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  ref={emailRef}
                  placeholder="your@email.com"
                  className="input input-bordered w-full bg-white/80 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-300"
                  required
                />
              </div>

              <div className="relative">
                <label className="block text-sm mb-1 text-gray-700">Password</label>
                <input
                  type={show ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full bg-white/80 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-300 pr-12"
                  required
                />
                <span
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-[50%] -translate-y-[-10%] cursor-pointer text-gray-600 z-50"
                >
                  {show ? <FaEye size={22} /> : <IoEyeOff size={22} />}
                </span>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-400 to-orange-300 text-white py-2 rounded-lg font-semibold hover:opacity-90"
              >
                Login
              </button>

              <div className="flex items-center justify-center gap-2 my-2">
                <div className="h-px w-16 bg-gray-300"></div>
                <span className="text-sm text-gray-600">or</span>
                <div className="h-px w-16 bg-gray-300"></div>
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                className="flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-800 px-5 py-2 rounded-lg w-full font-semibold hover:bg-gray-50"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  className="w-5 h-5"
                />
                Continue with Google
              </button>

              <p className="text-center text-sm text-gray-700 mt-3">
                Don’t have an account?{" "}
                <Link className="text-pink-500 hover:text-pink-700 underline" to="/signup">
                  Resister here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </MyContainer>
    </div>
  );
};

export default Login;
