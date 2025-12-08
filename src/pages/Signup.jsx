import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import MyContainer from "../components/MyContainer";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const Signup = () => {
  const [show, setShow] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);

  const {
    createUserWithEmailAndPasswordFunc,
    updateProfileFunc,
    signInWithGoogleFunc,
    setUser,
  } = useContext(AuthContext);

  const navigate = useNavigate();

  const validatePassword = (password) => {
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      toast.error("Password must include 1 uppercase letter.");
      return false;
    }
    if (!/[a-z]/.test(password)) {
      toast.error("Password must include 1 lowercase letter.");
      return false;
    }
    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoadingBtn(true);

    const name = e.target.name.value;
    const photoURL = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!validatePassword(password)) {
      setLoadingBtn(false);
      return;
    }

    try {
      const res = await createUserWithEmailAndPasswordFunc(email, password);
      await updateProfileFunc(name, photoURL);
      setUser(res.user);
      toast.success("Signup successful!");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoadingBtn(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoadingBtn(true);
    try {
      const res = await signInWithGoogleFunc();
      setUser(res.user);
      toast.success("Signed in with Google!");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoadingBtn(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FCE7F3] via-[#FFF5EB] to-[#F3F4F6] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute w-72 h-72 bg-pink-200/40 rounded-full blur-3xl top-10 left-10"></div>
        <div className="absolute w-72 h-72 bg-orange-200/40 rounded-full blur-3xl bottom-10 right-10"></div>
      </div>

      <MyContainer>
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 p-6 lg:p-10 text-gray-800">
          {/* Left */}
          <div className="max-w-lg text-center lg:text-left">
            <h1 className="text-5xl font-extrabold text-[#E0557E] drop-shadow">
              Create Your Account 🐾
            </h1>
            <p className="mt-4 text-lg text-gray-700 leading-relaxed">
              Join the pet care community and keep your furry friends warm ❄️🐶
            </p>
          </div>

          {/* Form */}
          <div className="w-full max-w-md backdrop-blur-xl bg-white/60 border border-pink-200 shadow-xl rounded-2xl p-8">
            <h2 className="text-2xl font-semibold mb-4 text-center text-[#D9466E]">
              Sign Up
            </h2>

            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Pet Lover"
                  className="input input-bordered w-full bg-white/80 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-300"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Photo URL</label>
                <input
                  type="text"
                  name="photo"
                  placeholder="https://example.com/photo.jpg"
                  className="input input-bordered w-full bg-white/80 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
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
                disabled={loadingBtn}
                className={`w-full text-white py-2 rounded-lg font-semibold ${
                  loadingBtn
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-pink-400 to-orange-300 hover:opacity-90"
                }`}
              >
                {loadingBtn ? "Processing..." : "Register"}
              </button>

              <button
                type="button"
                onClick={handleGoogleSignup}
                disabled={loadingBtn}
                className="flex items-center justify-center gap-3 px-5 py-2 rounded-lg w-full font-semibold border mt-2 bg-white border-gray-300 hover:bg-gray-50"
              >
                {loadingBtn ? "Processing..." : "Continue with Google"}
              </button>

              <p className="text-center text-sm text-gray-700 mt-3">
                Already have an account?{" "}
                <Link to="/signin" className="text-pink-500 hover:text-pink-700 underline">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </MyContainer>
    </div>
  );
};

export default Signup;
