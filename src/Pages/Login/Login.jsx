import React from "react";
import authimage from "../../assets/authImage.png";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <div className="max-w-5xl w-full flex flex-col md:flex-row  rounded-xl overflow-hidden">
        {/* Left side - Form */}
        <div className="flex-1 flex items-center justify-center p-10">
          <div className="w-full max-w-md">
            <h2 className="text-4xl font-bold mb-6 text-gray-800 text-center">
              Welcome Back
            </h2>

            {/* Google Login */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 border border-gray-300 py-2 rounded-lg mb-6 hover:bg-gray-100 transition"
            >
              <FcGoogle size={24} />
              Sign in with Google
            </button>

            <div className="flex items-center mb-6">
              <hr className="flex-1 border-gray-300" />
              <span className="mx-2 text-gray-500">or</span>
              <hr className="flex-1 border-gray-300" />
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border border-[#a9aba4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#caeb66] transition shadow-sm"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border border-[#a9aba4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#caeb66] transition shadow-sm"
                />
              </div>
              <div className="flex justify-between items-center text-sm text-gray-600">
                <label>
                  <input type="checkbox" className="mr-1" />
                  Remember me
                </label>
                <a href="/forgot-password" className="text-[#85a81f] font-semibold hover:underline">
                  Forgot Password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full bg-[#caeb66] text-black py-2 font-semibold rounded-lg hover:bg-[#7c9f13] transition shadow-md"
              >
                Login
              </button>
            </form>

            <p className="mt-4 text-sm text-gray-600 text-center">
              Don’t have an account?{" "}
              <a
                href="/register"
                className="text-[#85a81f] font-semibold hover:underline"
              >
                Sign Up
              </a>
            </p>
          </div>
        </div>

        {/* Right side - Smaller Image */}
        <div className="flex-1 hidden md:flex items-center justify-center">
          <img
            src={authimage}
            alt="Login Illustration"
            className="w-3/4 h-3/4 object-contain rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
