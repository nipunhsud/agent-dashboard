import React from "react";

const Section = ({ name, title, subtitle, children }) => {
  return (
    <section className="container mx-auto px-4">
      <div className="flex flex-col items-center text-center gap-5 p-6 bg-[#f5f5f7] rounded-[12px]">
        <div className="flex flex-col gap-[4px]">
          {name && (
            <span className="text-gray-500 text-[16px] robotoFont uppercase tracking-wider">{name}</span>
          )}
          {title && (
            <h4 className="font-bold text-[32px] text-[#0C0B0B]">{title}</h4>
          )}
          {subtitle && (
            <div className="text-[18px] font-medium robotoFont text-gray-500">
              {subtitle}
            </div>
          )}
        </div>
        
        <div className="mt-6 w-full">{children}</div>
      </div>
    </section>
  );
};

export default Section;
