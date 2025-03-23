import React from "react";
import { Link } from "react-router-dom";
import quantaDemo from "../../assets/quanta-demo.mp4";

const HeroSectionFast = () => {
  return (
    <div className="flex flex-col md:flex-row items-center bg-[#F7F7F7] text-[#0C0B0B] py-8">
      {/* Left Content Section */}
      <div className="flex flex-col w-full md:w-1/2 px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        {/* Heading */}
        <h4 className="text-[32px] sm:text-[40px] md:text-[48px] font-bold font-jakarta leading-tight text-[#0C0B0B] text-center md:text-left mb-4 md:mb-6">
          Simplify Investments
        </h4>

        {/* Subheading Container */}
        <div className="flex flex-col gap-1 md:gap-2 mb-6 md:mb-8">
          <p className="text-[#0C0B0B] font-normal text-[18px] sm:text-[20px] md:text-[24px] robotoFont text-center md:text-left">
            Level the playing field for individual investors.
            <span> AI-driven investment research</span>{" "}
            at your fingertips.
          </p>
        </div>

        {/* Button Container */}
        <div className="flex justify-center md:justify-start">
          <button className="w-[140px] px-6 py-2.5 border-2 border-[#0C0B0B] text-[#0C0B0B] font-bold rounded-[8px] text-base hover:bg-[#0C0B0B] hover:text-white transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <Link to={'/stocks'} className="!text-inherit !no-underline block w-full h-full">
              Try it now!
            </Link>
          </button>
        </div>
      </div>
     
      {/* Video Section */}
      <div className="w-full md:w-1/2 h-[300px] md:h-[400px] mt-8 md:mt-0 px-6 md:px-4">
        <video
          className="w-full h-full rounded-[12px] object-cover shadow-lg"
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