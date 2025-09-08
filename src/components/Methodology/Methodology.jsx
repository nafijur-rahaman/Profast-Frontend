import React from "react";
import image1 from "../../assets/live-tracking.png";
import image2 from "../../assets/safe-delivery.png";
const Methodology = () => {
  return (
    <div>
      <div class="max-w-6xl mx-auto px-4 py-12 space-y-8">
        <div class="flex flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden">
          <div class="p-5">
            <img
              src={image1}
              alt="Live Parcel Tracking"
              class="w-[190px] h-[200px] object-cover"
            />
          </div>

          <div class="hidden md:block border-r-3 border-dotted border-gray-300"></div>

          <div class="md:w-2/3 p-6 flex flex-col justify-center">
            <h3 class="text-xl font-bold mb-2">Live Parcel Tracking</h3>
            <p class="text-gray-700">
              Stay updated in real-time with our live parcel tracking feature.
              From pick-up to delivery, monitor your shipment's journey and get
              instant status updates for complete peace of mind.
            </p>
          </div>
        </div>

        <div class="flex flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden">
          <div class="p-5">
            <img
              src={image2}
              alt="100% Safe Delivery"
              class="w-[190px] h-[200px] object-cover"
            />
          </div>
          <div class="hidden md:block border-r-3 border-dotted border-gray-300"></div>
          <div class="md:w-2/3 p-6 flex flex-col justify-center">
            <h3 class="text-xl font-bold mb-2">100% Safe Delivery</h3>
            <p class="text-gray-700">
              We ensure your parcels are handled with the utmost care and
              delivered securely to their destination. Our reliable process
              guarantees safe and damage-free delivery every time.
            </p>
          </div>
        </div>

        <div class="flex flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden">
          <div class=" p-5">
            <img
              src={image2}
              alt="24/7 Call Center Support"
              class="w-[190px] h-[200px] object-cover"
            />
          </div>
          <div class="hidden md:block border-r-4 border-dotted border-gray-300"></div>
          <div class="md:w-2/3 p-6 flex flex-col justify-center">
            <h3 class="text-xl font-bold mb-2">24/7 Call Center Support</h3>
            <p class="text-gray-700">
              Our dedicated support team is available around the clock to assist
              you with any questions, updates, or delivery concerns—anytime you
              need us.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Methodology;
