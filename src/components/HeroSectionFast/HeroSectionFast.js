import React from "react";
import { Link } from "react-router-dom";
import landingPageBot from "../../assets/landing-page-bot.png"; 
import { applicationsData } from "../../helpers/applicationsData"
import Integrations from "./Integrations";


const HeroSectionFast = () => {
  return (
    <div className="flex flex-col items-center mt-6 mx-auto container bg-custom-purple text-white pt-8 pb-8 rounded-lg px-4 sm:px-8">
      <h4 className="text-white font-black text-center max-w-xl xl:max-w-2xl text-balance mx-2.5 text-4xl sm:text-5xl lg:text-6xl">
        Simplify Investments
      </h4>
      <p className="mt-4 text-gray-200 font-light text-center max-w-2xl text-balance text-lg sm:text-xl lg:text-2xl">Level the playing field for individual investors.</p>
      <h3 className="font-bold text-balance text-center max-w-4xl text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-white">
        {" "}
        <span className="text-black">AI-driven investment research </span>
        at your fingertips.
      </h3>
      <button
        className="mt-6 px-6 py-3.5 bg-black text-white font-semibold rounded-lg text-lg hover:!bg-gray-950 hover:!bg-opacity-90 transition-colors duration-300"
      >
        <Link to={'/stocks'} className="!text-white !no-underline block w-full h-full">
          Try right now!
        </Link>
      </button>

      <Integrations />

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

export default HeroSectionFast;