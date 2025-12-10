import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import MyContainer from "./MyContainer";
import MyLink from "./MyLink";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { ClockLoader } from "react-spinners";

const Navbar = () => {
  const { user, signoutUserFunc, setUser, loading } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const [theme, setTheme] = useState(localStorage.getItem('theme') || "light")

  useEffect(() => {
    const html = document.querySelector('html')
     html.setAttribute("data-theme", theme)
     localStorage.setItem("theme", theme)
  }, [theme])


  const handleTheme = (checked) => {
    setTheme(checked ? "dark": "light")
  }

  const handleSignout = () => {
    signoutUserFunc()
      .then(() => {
        toast.success("Sign out successful");
        setUser(null);
      })
      .catch((e) => toast.error(e.message));
  };

  return (
    <div className="bg-gradient-to-r from-pink-500 via-orange-400 flex items-center to-red-400 shadow-lg relative">
      <MyContainer className="flex items-center justify-between py-3 relative">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="w-[45px]" />
          <h1 className="text-white text-2xl font-semibold tracking-wide">
            WarmPaws
          </h1>
        </div>

        <ul className="hidden lg:flex items-center gap-4 text-white font-medium">

          <li><MyLink to="/">Home</MyLink></li>
          <li><MyLink to="/pets-supplies">Pets & Supplies</MyLink></li>

          {user && (
            <>
              <li><MyLink to="/add-listing">Add Listing</MyLink></li>
              <li><MyLink to="/my-listings">My Listings</MyLink></li>
              <li><MyLink to="/my-orders">My Orders</MyLink></li>
            </>
          )}
        </ul>
          
        <div className="flex items-center gap-3">
          {loading ? (
            <ClockLoader color="#fff" size={25} />
          ) : user ? (
            <div className="flex items-center gap-2">
              <img
                src={user.photoURL || "https://via.placeholder.com/100"}
                alt={user.displayName || "User Avatar"}
                title={user.displayName || "User"}
                className="h-[45px] w-[45px] rounded-full ring-2 ring-white"
              />
              <button
                onClick={handleSignout}
                className="px-3 py-1 bg-white font-bold text-red-700 rounded-lg hover:text-white hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="hidden lg:flex gap-2">
              <Link
                to="/signin"
                className="px-4 py-2 bg-white text-pink-600 font-semibold rounded-lg hover:bg-slate-100 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-white text-pink-600 font-semibold rounded-lg hover:bg-slate-100 transition"
              >
                Register
              </Link>
            </div>
          )}

         
          <div className="lg:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
        </div>

       
        {menuOpen && (
          <ul className="absolute top-full left-0 w-full bg-pink-500 text-white flex flex-col gap-2 p-4 lg:hidden z-20">
            
            <li><MyLink to="/" onClick={() => setMenuOpen(false)}>Home</MyLink></li>
            <li><MyLink to="/pets-supplies" onClick={() => setMenuOpen(false)}>Pets & Supplies</MyLink></li>

            {user && (
              <>
                <li><MyLink to="/add-listing" onClick={() => setMenuOpen(false)}>Add Listing</MyLink></li>
                <li><MyLink to="/my-listings" onClick={() => setMenuOpen(false)}>My Listings</MyLink></li>
                <li><MyLink to="/my-orders" onClick={() => setMenuOpen(false)}>My Orders</MyLink></li>
              </>
            )}

            {!user && (
              <div className="flex flex-col gap-2 mt-2">
                <Link
                  to="/signin"
                  className="px-4 py-2 bg-white text-pink-600 font-semibold rounded-lg hover:bg-slate-100 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-white text-pink-600 font-semibold rounded-lg hover:bg-slate-100 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </Link>
              </div>

            )}
          </ul>
        )}

      </MyContainer>
      <div>
          <input
           onChange={(e)=> handleTheme(e.target.checked)}
           type="checkbox"
           defaultChecked={localStorage.getItem('theme') === "dark"}
           className="toggle"/>
          </div>
    </div>
  );
};

export default Navbar;
