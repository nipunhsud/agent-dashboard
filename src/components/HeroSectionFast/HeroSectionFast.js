import React from "react";
import { Link } from "react-router-dom";
import quantaDemo from "../../assets/quanta-demo.mp4";

const HeroSectionFast = () => {
  return (
    <div className="flex flex-row items-center bg-[#F7F7F7] text-[#0C0B0B] pt-8 pb-8">
      <div className="flex flex-col items-center px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 w-1/2">
        <h4 className="text-[48px] font-bold font-jakarta leading-tight text-[#0C0B0B]">
          Simplify Investments
        </h4>
        <p className="text-[#0C0B0B] font-normal text-[24px] robotoFont -mb-1">
          Level the playing field for individual investors.
        </p>
        <p className="text-[#0C0B0B] font-normal text-[24px] robotoFont">
          <span>AI-driven investment research</span>{" "}
          at your fingertips.
        </p>
        <button
          className="mt-2 w-[140px] px-6 py-2.5 border-2 border-[#0C0B0B] text-[#0C0B0B] font-bold rounded-[8px] text-base hover:bg-[#0C0B0B] hover:text-white transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          <Link to={'/stocks'} className="!text-inherit !no-underline block w-full h-full">
            Try it now!
          </Link>
        </button>
      </div>
     
      <div className="w-1/2 h-[400px] mx-4 flex items-center justify-center">
        <video
          className="w-full h-full rounded-[12px] object-cover"
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