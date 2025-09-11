import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router";
import { motion } from "framer-motion";

const user = {
  name: "John Doe",
  email: "john@example.com",
  role: "user", // could be admin or user
  image: "https://i.pravatar.cc/150?img=3",
};


// Define navigation links
const navLinks = {
  user: [
    { name: "Dashboard", path: "/dashboard" },
    { name: "My Parcels", path: "/dashboard/my-parcels" },
    { name: "Add Parcel", path: "/dashboard/add-parcel" },
  ],
  admin: [
    { name: "Dashboard", path: "/dashboard" },
    { name: "All Parcels", path: "/parcels" },
    { name: "Manage Users", path: "/users" },
    { name: "Reports", path: "/reports" },
  ],
  public: [
    { name: "Home", path: "/" },
    { name: "Coverage", path: "/coverage" },
  ],
};

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear auth tokens/session
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <motion.div
        animate={{ width: sidebarOpen ? 250 : 80 }}
        className="bg-white shadow-lg flex flex-col transition-all duration-300"
      >
        {/* Logo */}
        <div className="flex items-center justify-center h-20 border-b">
          <span className={`font-bold text-xl ${sidebarOpen ? "text-blue-600" : "text-blue-600 text-lg"}`}>
            {sidebarOpen ? "PROFAST" : "PF"}
          </span>
        </div>

        {/* User Info */}
        <div className="flex flex-col items-center mt-6 mb-4 px-2">
          <img
            src={user.image}
            alt="User Avatar"
            className="w-16 h-16 rounded-full shadow-md"
          />
          {sidebarOpen && (
            <div className="mt-2 text-center">
              <p className="font-semibold">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
              <span className="text-xs text-gray-400">{user.role}</span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2">
          {[...navLinks[user.role], ...navLinks.public].map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="flex items-center px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 text-gray-700 transition-colors mb-2"
            >
              <span className="ml-2 text-sm">{sidebarOpen ? link.name : link.name[0]}</span>
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="mb-4 px-2">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            {sidebarOpen ? "Logout" : "L"}
          </button>
        </div>

        {/* Collapse Button */}
        <div className="absolute bottom-4 left-0 w-full flex justify-center">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-all"
          >
            {sidebarOpen ? "<" : ">"}
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
