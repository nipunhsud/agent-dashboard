import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="flex items-center flex-col mt-36  mx-auto container">
      <h4 className="text-gray-700 font-black text-center max-w-xl xl:max-w-2xl text-balance mx-2.5 text-4xl 2xl:text-6xl">
        World of Helper Agents
      </h4>
      <p class="mt-4 text-gray-500 font-light text-center max-w-2xl text-balance text-lg 2xl:text-2xl"></p>
      <h3 className="font-bold text-balance text-center max-w-4xl text-2xl lg:text-3xl xl:text-4xl 2xl:text-4xl text-gray-600">
        Experience the{" "}
        <span className="text-[#6366f1]">power of agentic AI</span>—
        <i>try our Christmas Gifting Agent today!</i>
      </h3>
      <button
        className="mt-6 px-6 py-3.5 bg-[#6366f1] text-white font-semibold rounded-lg text-lg hover:bg-primary-700 hover:bg-[#4338ca]"
    
      >
        <Link to={'/gift'}>
        Try right now!
        </Link>
      </button>
    </div>
  );
};

export default HeroSection;
