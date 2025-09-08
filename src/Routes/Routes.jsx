import { createBrowserRouter } from "react-router";
import RootLayout from "../MainLayout/RootLayout";
import Home from "../components/Home/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
        {
            path: "/",
            element: <Home></Home>
        }
    ]
  },
]);
