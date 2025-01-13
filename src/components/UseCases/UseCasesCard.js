import React from "react";

const UseCasesCard = ({ imageSrc, altText, title, description, onMouseEnter, onMouseLeave }) => {
  return (
    <div 
      className="flex gap-6 items-center flex-col text-center rounded-2xl bg-black border border-[#6366f1]/20 p-12 transition-all duration-300 hover:border-[#6366f1] hover:shadow-[0_0_20px_rgba(99,102,241,0.2)] group cursor-pointer backdrop-blur-sm relative h-full w-full"
      onMouseEnter={(e) => {
        e.stopPropagation();
        onMouseEnter();
      }}
      onMouseLeave={(e) => {
        e.stopPropagation();
        onMouseLeave();
      }}
    >
      <div className="flex flex-col items-center gap-6 w-full">
        <span className="flex-center p-4 bg-[#6366f1]/10 rounded-full min-w-20 min-h-20 border-2 border-[#6366f1] transition-all duration-300 group-hover:scale-110 relative z-10">
          <img 
            src={imageSrc} 
            alt={altText}
            className="transition-transform duration-300 group-hover:scale-110" 
          />
        </span>
        <h6 className="font-bold text-white text-xl w-full transition-colors duration-300 group-hover:text-[#6366f1] relative z-10">
          {title}
        </h6>
      </div>
    </div>
  );
};

export default UseCasesCard;