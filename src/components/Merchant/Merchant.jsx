import React from "react";
import merchantimage1 from "../../assets/be-a-merchant-bg.png";
import merchantimage2 from "../../assets/location-merchant.png";

const Merchant = () => {
  return (
    <div className="max-w-6xl mx-auto bg-[#03373d] relative rounded-3xl mt-12 p-3">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={merchantimage1}
          alt="Background"
          className="w-full h-64 object-cover rounded-3xl"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent rounded-3xl"></div>
      </div>

      {/* Card Content */}
      <div className="relative z-10 flex flex-col md:flex-row overflow-hidden mt-24 ">
        {/* Left Side */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Merchant and Customer Satisfaction is Our First Priority
          </h2>
          <p className="text-gray-400 text-lg">
            We ensure that every merchant and customer experience is smooth,
            secure, and reliable. Our priority is your satisfaction through
            excellent service and support.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-2 bg-[#caeb66] text-black  font-semibold rounded-xl shadow-lg hover:border-[#caeb66]  hover:shadow-xl transition">
              Become a Merchant
            </button>
            <button className="px-6 py-2 border border-[#caeb66] text-[#caeb66] font-semibold rounded-lg hover:bg-[#caeb66] hover:text-black transition">
              Earn with ProFast
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="md:w-1/2">
          <img
            src={merchantimage2}
            alt="Merchant & Customer"
            className="w-full h-full object-cover rounded-tr-xl rounded-br-xl md:rounded-none"
          />
        </div>
      </div>
    </div>
  );
};

export default Merchant;
