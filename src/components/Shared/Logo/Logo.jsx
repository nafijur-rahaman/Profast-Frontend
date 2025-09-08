import React from "react";
import logo from "../../../assets/logo.png";
const Logo = () => {
  return (
    <div>
      <div className="flex items-center">
        <img className="w-10 h-10 object-contain" src={logo} alt="logo" />
        <h1 className="text-xl font-bold">ProFast</h1>
      </div>
    </div>
  );
};

export default Logo;
