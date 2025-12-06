import { NavLink } from "react-router-dom";

const MyLink = ({ to, className, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "text-yellow-300 font-bold underline"
          : `${className} text-white hover:text-yellow-200 transition font-semibold`
      }
    >
      {children}
    </NavLink>
  );
};

export default MyLink;
