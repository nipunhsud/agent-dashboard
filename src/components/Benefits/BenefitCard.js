import React from "react";

const BenefitCard = ({ imageSrc, altText, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center rounded-2xl bg-black p-8 h-full border border-[#6366f1]/20 transition-all duration-300 hover:border-[#6366f1] hover:shadow-[0_0_20px_rgba(99,102,241,0.2)] group cursor-pointer backdrop-blur-sm">
      {/* Icon container */}
      <div className="flex items-center justify-center p-4 bg-[#6366f1]/10 rounded-2xl w-20 h-20 transition-all duration-300 group-hover:bg-[#6366f1]/20 group-hover:scale-110">
        <img
          src={imageSrc}
          alt={altText}
          className="w-12 h-12 transition-transform duration-300 group-hover:scale-110 object-contain"
        />
      </div>

      {/* Title */}
      <h6 className="font-bold text-white text-xl mt-6 mb-4 transition-colors duration-300 group-hover:text-[#6366f1]">
        {title}
      </h6>

      {/* Description */}
      <p className="text-gray-400 text-lg mt-2 transition-colors duration-300 group-hover:text-gray-300">
        {description}
      </p>
    </div>
  );
};

export default BenefitCard;
