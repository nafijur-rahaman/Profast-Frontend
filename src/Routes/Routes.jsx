import { createBrowserRouter } from "react-router";
import RootLayout from "../MainLayout/RootLayout";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import Coverage from "../components/Coverage/Coverage";
import AddParcel from "../Pages/AddPercel/AddParcel";
import Dashboard from "../Pages/Dashboard/Dashboard";
import MyParcels from "../Pages/MyParcels/MyParcels";
import Payment from "../Pages/Payment/Payment";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [

        {   index: true,
            path: "/",
            element: <Home></Home>
        },{
          path: "/register",
          element: <Register></Register>
        },{
          path: "/login",
          element: <Login></Login>
        },{
          path: "/coverage",
          element:<Coverage></Coverage>
        }
    ]
  },
  {
    path:'/dashboard',
    element:<Dashboard></Dashboard>,
    children:[
        {
          path: "add-parcel",
          element: <AddParcel></AddParcel>,
          loader: ()=> fetch("/warehouses.json"),
          hydrateFallbackElement: <div>Loading...</div>
        },
        {
          path: "my-parcels",
          element: <MyParcels></MyParcels>,
        },{
          path: "payment/:id",
          element: <Payment></Payment>
        }
    ]
  }
]);
