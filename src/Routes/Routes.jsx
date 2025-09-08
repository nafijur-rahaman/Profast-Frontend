import { createBrowserRouter } from "react-router";
import RootLayout from "../MainLayout/RootLayout";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
        {
            path: "/",
            element: <Home></Home>
        },{
          path: "/register",
          element: <Register></Register>
        },{
          path: "/login",
          element: <Login></Login>
        }
    ]
  },
]);
