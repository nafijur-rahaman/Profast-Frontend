import React from "react";
import company1 from "../../assets/brands/amazon.png";
import company2 from "../../assets/brands/amazon_vector.png";
import company3 from "../../assets/brands/casio.png";
import company4 from "../../assets/brands/moonstar.png";
import company5 from "../../assets/brands/randstad.png";

const Companies = () => {
  const companies = [company1, company2, company3, company4, company5];

  return (
    <div className="py-16">
      <div className="max-w-screen-xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
          Companies We've <span className="text-[#03373d]">Worked With</span>
        </h2>

        <div className="overflow-hidden relative">
          <div className="flex animate-marquee whitespace-nowrap space-x-12">
            {companies.concat(companies).map((logo, index) => (
              <div key={index} className="flex-shrink-0 w-32 h-20 flex items-center justify-center">
                <img src={logo} alt={`Company ${index}`} className="h-full object-contain" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Companies;
