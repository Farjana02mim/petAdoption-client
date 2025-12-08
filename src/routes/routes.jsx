import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import HomePage from "../pages/HomePage";
import Profile from "../pages/PetsSupplies";
import Signup from "../pages/Signup";
import Signin from "../pages/Login";
import Services from "../pages/AddListing";
import ServiceDetails from "../pages/ListingDetails";
import CategoryFilteredProducts from "../pages/CategoryFilteredProducts";
import ListingDetails from "../pages/ListingDetails"; // New page
import PrivateRoute from "../privateRoute/PrivateRoute";
import ForgotPassword from "../pages/ForgotPassword";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/service/:id",
        element: <ServiceDetails />,
      },
      {
        path: "/category-filtered-product/:categoryName",
        element: <CategoryFilteredProducts />,
      },
      {
        path: "/listing-details/:id", // New route for recent listings
        element: <ListingDetails />,
      },
    ],
  },
]);
