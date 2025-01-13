import React from "react";

const IntegrationCard = ({ img, name }) => (
    <div className="flex flex-col items-center gap-4 rounded group cursor-pointer">
      <div className="p-6 rounded-2xl bg-black  transition-all duration-300 hover:!bg-gray-950 hover:!bg-opacity-90 transition-colors duration-300 flex items-center justify-center">
        <img 
          src={img} 
          alt={name} 
          className="w-[32px] h-[32px] object-contain" 
        />
      </div>
      <span className="text-center text-white-400 text-xl font-semibold">
        {name}
      </span>
    </div>
);
  
export default IntegrationCard;