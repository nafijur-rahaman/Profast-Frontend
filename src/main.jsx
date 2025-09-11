import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import { router } from "./Routes/Routes";
import "./index.css";
import AuthContextProvider from "./Context/AuthContextProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();


createRoot(document.getElementById("root")).render(
  <StrictMode>
  <AuthContextProvider>
    <div className="bg-[#EAECED] ">
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      </QueryClientProvider>
    </div>
    </AuthContextProvider>
  </StrictMode>
);
