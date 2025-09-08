import React from "react";
import {
  FaShippingFast,
  FaHeadset,
  FaShieldAlt,
  FaGlobe,
  FaRocket,
  FaHandHoldingUsd,
} from "react-icons/fa";

const Services = () => {
  const services = [
    {
      icon: <FaShippingFast className="text-dark text-5xl" />,
      title: "Fast Delivery",
      desc: "Lightning-fast delivery with real-time tracking to ensure your packages arrive on time, every time.",
    },
    {
      icon: <FaHeadset className="text-dark text-5xl" />,
      title: "24/7 Support",
      desc: "Our dedicated support team is available round the clock to help you whenever you need assistance.",
    },
    {
      icon: <FaShieldAlt className="text-dark text-5xl" />,
      title: "Secure & Reliable",
      desc: "We ensure your packages are safe, secure, and delivered with maximum reliability and trust.",
    },
    {
      icon: <FaGlobe className="text-dark text-5xl" />,
      title: "Nationwide Coverage",
      desc: "Delivering to every corner of the country with a strong and scalable logistics network.",
    },
    {
      icon: <FaRocket className="text-dark text-5xl" />,
      title: "Express Services",
      desc: "Get your urgent deliveries completed in record time with our express options.",
    },
    {
      icon: <FaHandHoldingUsd className="text-dark text-5xl" />,
      title: "Affordable Pricing",
      desc: "Premium delivery services at competitive rates without compromising quality.",
    },
  ];

  return (
    <div className="py-20 bg-[#03373d] max-w-screen-xl mx-auto p-10 rounded-3xl">
      <div className="max-w-screen-xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
          Our{" "}
          <span className="bg-[#b7eb1e] bg-clip-text text-transparent">
            Services
          </span>
        </h2>
        <p className="text-lg text-white max-w-2xl mx-auto mb-16">
          Discover the powerful features that make ProFast your most trusted
          delivery partner.
        </p>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-2xl shadow-lg transform hover:scale-105 transition duration-500 bg-white hover:bg-[#b7eb1e] `}
            >
              <div className="flex justify-center mb-6">{service.icon}</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.desc}</p>
              <div className="absolute inset-0 rounded-2xl bg-black/10 opacity-0 hover:opacity-100 transition duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
