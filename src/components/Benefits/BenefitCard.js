import React from "react";

const BenefitCard = ({ imageSrc, altText, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center rounded-[12px] bg-[#f5f5f7] p-8 h-full transform transition-all duration-300 hover:-translate-y-1">
      {/* Icon container */}
      <div className="flex items-center justify-center p-4 bg-white rounded-[12px] w-20 h-20 transition-all duration-300 hover:scale-105">
        <img
          src={imageSrc}
          alt={altText}
          className="w-12 h-12 transition-transform duration-300 hover:scale-105 object-contain"
        />
      </div>

      {/* Title */}
      <h6 className="font-bold text-[20px] text-[#0C0B0B] mt-6 mb-4 robotoFont">
        {title}
      </h6>

      {/* Description */}
      <p className="text-gray-500 text-[13px] mt-2 robotoFont font-medium">
        {description}
      </p>
    </div>
  );
};

export default BenefitCard;
