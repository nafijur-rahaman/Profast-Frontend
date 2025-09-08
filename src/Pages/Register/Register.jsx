import React from "react";
import authimage from "../../assets/authImage.png";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <div className="max-w-6xl w-full flex flex-col md:flex-row rounded-2xl overflow-hidden">
        {/* Left side - Form */}
        <div className="flex-1 flex items-center justify-center p-10">
          <div className="w-full max-w-md">
            <h2 className="text-4xl font-bold mb-6 text-gray-800 text-center">
              Create Account
            </h2>

            {/* Google Login */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 border border-gray-300 py-2 rounded-lg mb-6 hover:bg-gray-50 transition font-medium"
            >
              <FcGoogle size={24} />
              Sign up with Google
            </button>

            <div className="flex items-center mb-6">
              <hr className="flex-1 border-gray-300" />
              <span className="mx-2 text-gray-400">or</span>
              <hr className="flex-1 border-gray-300" />
            </div>

            <form className="space-y-5">
              {/** Floating Labels */}
              <div className="relative">
                <input
                  type="text"
                  placeholder=" "
                  className="peer w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#caeb66] transition"
                />
                <label className="absolute left-4 top-3 text-gray-400 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-black peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-[#85a81f] peer-focus:text-xs">
                  Full Name
                </label>
              </div>

              <div className="relative">
                <input
                  type="email"
                  placeholder=" "
                  className="peer w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#caeb66] transition"
                />
                <label className="absolute left-4 top-3 text-gray-400 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-black peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-[#85a81f] peer-focus:text-xs">
                  Email
                </label>
              </div>

              <div className="relative">
                <input
                  type="password"
                  placeholder=" "
                  className="peer w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#caeb66] transition"
                />
                <label className="absolute left-4 top-3 text-gray-400 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-black peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-[#85a81f] peer-focus:text-xs">
                  Password
                </label>
              </div>

              <div className="relative">
                <input
                  type="password"
                  placeholder=" "
                  className="peer w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#caeb66] transition"
                />
                <label className="absolute left-4 top-3 text-gray-400 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-black peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-[#85a81f] peer-focus:text-xs">
                  Confirm Password
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 font-semibold rounded-lg text-white bg-gradient-to-r from-[#caeb66] to-[#85a81f] hover:from-[#85a81f] hover:to-[#caeb66] transition shadow-lg"
              >
                Register
              </button>
            </form>

            <p className="mt-5 text-sm text-black text-center">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-[#85a81f] font-semibold hover:underline"
              >
                Login
              </a>
            </p>
          </div>
        </div>

        {/* Right side - Image */}
        <div className="flex-1 hidden md:flex items-center justify-center  p-6">
          <img
            src={authimage}
            alt="Register Illustration"
            className="w-3/4 h-3/4 object-contain rounded-xl "
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
