import React from "react";

const ApplicationCard = ({ img, name }) => (
    <div className="flex flex-col items-center gap-4 rounded group cursor-pointer">
      <div className="p-6 rounded-2xl bg-black border border-[#6366f1]/20 transition-all duration-300 hover:border-[#6366f1] hover:shadow-[0_0_20px_rgba(99,102,241,0.2)] flex items-center justify-center">
        <img 
          src={img} 
          alt={name} 
          className="w-[64px] h-[64px] object-contain" 
        />
      </div>
      <span className="text-center text-gray-400 text-xl font-semibold">
        {name}
      </span>
    </div>
);
  
export default ApplicationCard;