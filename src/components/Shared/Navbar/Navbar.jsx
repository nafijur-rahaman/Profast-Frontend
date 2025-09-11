import React, { useContext, useState } from "react";
import Logo from "../Logo/Logo";
import { NavLink } from "react-router";
import { AuthContext } from "../../../Context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="max-w-screen-xl mx-auto font-sans w-full pt-5">
      {/* Gradient background */}
      <div className="bg-white text-black rounded-xl p-1 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Logo />
            </div>

            {/* Desktop Menu */}
            <div className="hidden sm:flex sm:items-center sm:space-x-10">
              <a
                href="#"
                className="text-black text-sm font-semibold hover:text-[#caeb66] transition"
              >
                Service
              </a>
              <NavLink
                to="/coverage"
                className="text-black text-sm font-semibold hover:text-[#caeb66] transition"
              >
                Coverage
              </NavLink>
              <a
                href="#"
                className="text-black text-sm font-semibold hover:text-[#caeb66] transition"
              >
                About Us
              </a>
              <a
                href="#"
                className="text-black text-sm font-semibold hover:text-[#caeb66] transition"
              >
                Pricing
              </a>
            </div>

            {/* Buttons (desktop only) */}
            <div className="hidden sm:flex sm:items-center space-x-4">
              {user ? (
                <>
                  <NavLink
                    to="/dashboard"
                    className="text-sm font-semibold border-2 border-[#EAECED] text-[#797d7f] px-4 py-2 rounded-xl hover:bg-[#caeb66] hover:text-black transition"
                  >
                    Dashboard
                  </NavLink>
                  <button
                    onClick={logout}
                    className="text-sm font-semibold bg-[#caeb66] text-black px-4 py-2 rounded-xl shadow-md hover:bg-[#a0cf12] transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/register"
                    className="text-sm font-semibold border-2 border-[#EAECED] text-[#797d7f] px-4 py-2 rounded-xl hover:bg-[#caeb66] hover:text-black transition"
                  >
                    Sign up
                  </NavLink>
                  <a
                    href="#"
                    className="text-sm font-semibold bg-[#caeb66] text-black px-4 py-2 rounded-xl shadow-md hover:bg-[#a0cf12] transition"
                  >
                    Be a Rider
                  </a>
                </>
              )}
            </div>

            {/* Mobile Hamburger */}
            <div
              className="sm:hidden cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                // Close icon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-7 h-7 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                // Hamburger icon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-7 h-7 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="block sm:hidden bg-white border-t py-2 rounded-b-xl animate-slide-down">
              <div className="flex flex-col space-y-2 px-3">
                <a
                  href="#"
                  className="text-gray-800 text-sm font-semibold hover:text-[#caeb66]"
                >
                  Service
                </a>
                <NavLink
                  to="/coverage"
                  className="text-gray-800 text-sm font-semibold hover:text-[#caeb66]"
                >
                  Coverage
                </NavLink>
                <a
                  href="#"
                  className="text-gray-800 text-sm font-semibold hover:text-[#caeb66]"
                >
                  About Us
                </a>
                <a
                  href="#"
                  className="text-gray-800 text-sm font-semibold hover:text-[#caeb66]"
                >
                  Pricing
                </a>

                <div className="flex flex-col border-t pt-2 space-y-2">
                  {user ? (
                    <>
                      <NavLink
                        to="/dashboard"
                        className="text-gray-800 text-sm font-semibold hover:text-[#caeb66]"
                      >
                        Dashboard
                      </NavLink>
                      <button
                        onClick={logout}
                        className="text-sm font-semibold bg-[#caeb66] text-black px-4 py-2 rounded-lg text-center hover:bg-[#a0cf12] transition"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <NavLink
                        to="/register"
                        className="text-gray-800 text-sm font-semibold hover:text-[#caeb66]"
                      >
                        Sign up
                      </NavLink>
                      <a
                        href="#"
                        className="text-sm font-semibold bg-[#caeb66] text-black px-4 py-2 rounded-lg text-center hover:bg-[#a0cf12] transition"
                      >
                        Be a Rider
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
