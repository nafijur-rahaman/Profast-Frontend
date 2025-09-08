import React from "react";
import { FaSearchLocation, FaBox, FaTruck, FaSmile } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaSearchLocation className="text-purple-600 text-4xl mb-4" />,
      title: "Choose Your Service",
      desc: "Select from our wide range of delivery and logistics services tailored for your needs.",
    },
    {
      icon: <FaBox className="text-pink-500 text-4xl mb-4" />,
      title: "Book Your Order",
      desc: "Easily place your order with just a few clicks using our simple booking process.",
    },
    {
      icon: <FaTruck className="text-yellow-500 text-4xl mb-4" />,
      title: "We Deliver",
      desc: "Our trusted riders ensure your package reaches safely and on time, every time.",
    },
    {
      icon: <FaSmile className="text-green-500 text-4xl mb-4" />,
      title: "Enjoy Peace of Mind",
      desc: "Track your order in real-time and relax while we handle the rest.",
    },
  ];

  return (
    <div className="py-16">
      <div className="max-w-screen-xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
          How It <span className="text-[#03373d]">Works</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2"
            >
              <div className="flex justify-center">{step.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
