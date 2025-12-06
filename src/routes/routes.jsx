import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
// import Homepage from "../pages/Homepage";
// import Profile from "../pages/Profile";
// import Signup from "../pages/Signup";
// import Signin from "../pages/Login";
// import ServiceDetails from "../pages/ServiceDetails"; 
// import PrivateRoute from "../privateRoute/PrivateRoute";
// import ForgotPassword from "../pages/ForgotPassword";
// import Services from "../pages/Services";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    // children: [
    //   {
    //     index: true,
    //     element: <Homepage />,
    //    },
      // {
      //   path: "/profile",
      //   element: (
      //     <PrivateRoute>
      //       <Profile />
      //     </PrivateRoute>
      //   ),
      // },
      // {
      //   path: "/signup",
      //   element: <Signup />,
      // },
      // {
      //   path: "/services",
      //   element: <Services />,
      // },
      // {
      //   path: "/signin",
      //   element: <Signin />,
      // },
      // {
      //   path: "/forgot-password",
      //   element: <ForgotPassword />,
      // },
      // {
      //   path: "/service/:id", 
      //   element: <ServiceDetails />,
      // },
  //   ],
  },
]);
