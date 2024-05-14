import React from "react";
import { fb, ig, x } from "../assets";

const Footer = () => {
  return (
    <div className="flex flex-col items-center gap-5 justify-center font-epilogue font-bold w-full text-sm text-white bg-gradient-to-r from-green-400 to-blue-500 py-4">
      <div className="flex mb-2 gap-8">
        <a href="#" className="mr-4 hover:text-gray-300 font-epilogue">
          <img w-10 h-10 src={fb} />
        </a>
        <a href="#" className="mr-4 hover:text-gray-300 font-epilogue">
          <img w-10 h-10 src={x} />
        </a>
        <a href="#" className="hover:text-gray-300 font-epilogue">
          <img w-10 h-10 src={ig} />
        </a>
      </div>
      <div className="font-epilogue">
        &copy; 2024 EcoFilend. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
