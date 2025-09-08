import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import { router } from "./Routes/Routes";
import "./index.css";
import AuthContextProvider from "./Context/AuthContextProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
  <AuthContextProvider>
    <div className="bg-[#EAECED] ">
      <RouterProvider router={router} />
    </div>
    </AuthContextProvider>
  </StrictMode>
);
