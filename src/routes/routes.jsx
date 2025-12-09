import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import HomePage from "../pages/Homepage";
import PetsSupplies from "../pages/PetsSupplies";
import Signup from "../pages/Signup";
import Signin from "../pages/Login";
import AddListing from "../pages/AddListing";
import ListingDetails from "../pages/ListingDetails";
import MyOrders from "../pages/MyOrders";
import PrivateRoute from "../privateRoute/PrivateRoute";
import NotFound from "../pages/NotFound";
import CategoryFilteredProducts from "../pages/CategoryFilteredProducts";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/pets-supplies", element: <PetsSupplies /> },
      { path: "/category-filtered-product/:categoryName", element: <CategoryFilteredProducts /> },
      { path: "/signup", element: <Signup /> },
      { path: "/signin", element: <Signin /> },
      {
        path: "/add-listing",
        element: (
          <PrivateRoute>
            <AddListing />
          </PrivateRoute>
        ),
      },
      {
        path: "/listing-details/:id",
        element: (
          <PrivateRoute>
            <ListingDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-orders",
        element: (
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
