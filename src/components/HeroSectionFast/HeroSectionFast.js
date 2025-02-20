import React from "react";
import { Link } from "react-router-dom";
import landingPageBot from "../../assets/landing-page-bot.png"; 
import quantaDemo from "../../assets/quanta-demo.mp4";
import { applicationsData } from "../../helpers/applicationsData"
import Integrations from "./Integrations";


const HeroSectionFast = () => {
  return (
    <div className="flex flex-row items-center bg-custom-purple text-white pt-8 pb-8">
      <div className="flex flex-col items-center px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 w-1/2">
        <h4 className="text-[48px] font-bold font-jakarta leading-tight">
          Simplify Investments
        </h4>
        <p className="text-gray-200 font-light text-[24px]">
          Level the playing field for individual investors.
        </p>
        <p className="font-medium text-[24px] leading-tight">
          <span className="text-black">AI-driven investment research</span>{" "}
          at your fingertips.
        </p>
        <button
          className="mt-2 w-[140px] px-6 py-2.5 bg-black text-white font-medium rounded-lg text-base hover:bg-gray-900 transition-colors duration-300"
        >
          <Link to={'/stocks'} className="!text-white !no-underline block w-full h-full">
            Try it now!
          </Link>
        </button>
      </div>
     
      <div className="w-1/2 h-[400px] mx-4 flex items-center justify-center">
        <video
          className="w-full h-full rounded-[25px] object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={quantaDemo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default HeroSectionFast;