import React from "react";
import authimage from "../../assets/authImage.png"

const Register = () => {
  return (
    <div className=" max-w-screen-xl mx-auto py-20 flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Create Account
          </h2>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full px-4 py-2 border border-[#a9aba4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#caeb66] transition"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-[#a9aba4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#caeb66] transition"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-[#a9aba4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#caeb66] transition"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm your password"
                className="w-full px-4 py-2 border border-[#a9aba4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#caeb66] transition"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#caeb66] text-black py-2 font-semibold rounded-lg hover:bg-[#7c9f13] transition"
            >
              Register
            </button>
          </form>
          <p className="mt-4 text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-[#85a81f] font-semibold hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="flex-1 hidden md:flex items-center justify-center bg-blue-50">
        <img
          src={authimage}
          alt="Register Illustration"
          className="w-full h-full object-cover rounded-l-lg"
        />
      </div>
    </div>
  );
};

export default Register;
