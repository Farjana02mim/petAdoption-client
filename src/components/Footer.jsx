import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-pink-600 via-orange-500 to-red-500 text-white pt-14">
      <div className="w-11/12 mx-auto">
        <div className="grid md:grid-cols-3 gap-10">

          {/* ---------- LEFT: LOGO + ABOUT ---------- */}
          <div className="space-y-4 max-w-sm">
            <Link to="/" className="flex gap-2 items-center">
              <img className="h-[45px] w-[45px]" src={logo} alt="Logo" />
              <h1 className="text-2xl font-bold tracking-wide">PawMart</h1>
            </Link>
            <p className="text-sm text-white/90 leading-relaxed">
              PawMart connects local pet owners and buyers for adoption and
              pet care products.
            </p>
          </div>

          {/* ---------- MIDDLE: USEFUL LINKS ---------- */}
          <div>
            <h4 className="text-xl font-semibold mb-3">Useful Links</h4>
            <ul className="space-y-2 text-white/90">
              <li>
                <Link to="/" className="hover:text-white">Home</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white">Contact</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white">Terms & Conditions</Link>
              </li>
            </ul>
          </div>

          {/* ---------- RIGHT: CONTACT ---------- */}
          <div>
            <h4 className="text-xl font-semibold mb-3">Contact</h4>
            <ul className="space-y-2 text-white/90">
              <li>Email: support@pawmart.com</li>
              <li>Phone: +880 1234-567890</li>
              <li>Location: Dhaka, Bangladesh</li>
            </ul>
          </div>
        </div>

        <hr className="border-white/30 mt-10" />

        {/* ---------- COPYRIGHT ---------- */}
        <div className="text-center py-6 text-white/90 text-sm">
          © {new Date().getFullYear()} PawMart. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
