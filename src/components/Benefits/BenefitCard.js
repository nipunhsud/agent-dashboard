import React from "react";

const BenefitCard = ({ imageSrc, altText, title, description }) => {
  return (
    <div className="flex gap-6 items-center xl:items-start flex-col xl:flex-row text-center xl:text-left rounded-lg bg-blue-opacity p-12">
      <span className="flex-center p-4 bg-[#e0e7ff] rounded-full min-w-20 min-h-20 border-2 border-[#6366f1]">
        <img src={imageSrc} alt={altText} />
      </span>
      <div className="flex flex-col justify-between">
        <h6 className="font-bold text-gray-600 text-xl w-full">{title}</h6>
        <p className="text-gray-700 text-lg mt-4 text-balance">{description}</p>
      </div>
    </div>
  );
};

export default BenefitCard