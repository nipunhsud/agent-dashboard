import React from "react";
import { Link } from "react-router-dom";
import landingPageBot from "../assets/landing-page-bot.png"; 

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center mt-36 mx-auto container border pt-8 pb-8 rounded-lg bg-blue-opacity px-4 sm:px-8">
      <h4 className="text-gray-700 font-black text-center max-w-xl xl:max-w-2xl text-balance mx-2.5 text-4xl sm:text-5xl lg:text-6xl">
        World of Helper Agents
      </h4>
      <p className="mt-4 text-gray-500 font-light text-center max-w-2xl text-balance text-lg sm:text-xl lg:text-2xl"></p>
      <h3 className="font-bold text-balance text-center max-w-4xl text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-gray-600">
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
      
      <div className="mt-8 max-w-[400px] sm:max-w-[450px] lg:max-w-[500px] mx-auto">
        <img 
          src={landingPageBot}
          alt="Christmas Gifting Agent" 
          className="w-full h-auto rounded-lg"
        />
      </div>
    </div>
  );
};

export default HeroSection;

