import React from "react";

const HeroSection = () => {
  return (
    <div className="lg:bg-[url('/images/hero-lines_home.svg')] bg-no-repeat  bg-center mt-10 lg:mt-36">
      <div className="flex items-center py-10 flex-col gap-5">
        <h4 className="text-gray-700 font-black text-center text-balance mx-auto text-4xl lg:text-6xl">
          World of Helper Agents
        </h4>
        <p className="text-center text-xl lg:text-4xl text-black max-w-4xl mx-auto font-bold px-2">
          Experience the{" "}
          <span className="text-[#7281ff]">power of agentic AI</span>—try our
          Christmas Gifting Agent today!
        </p>
        <button className="px-5 py-4 bg-[#7281ff] rounded-xl text-white font-bold text-lg shadow-button">
          Try Right Now!
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
