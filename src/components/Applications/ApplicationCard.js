import React from "react";

const ApplicationCard = ({ img, name }) => (
    <div className="flex flex-col items-center gap-4 rounded">
      <img src={img} alt={name} className="w-[96px] h-[96px]" />
      <span className="text-center text-gray-700 text-xl font-semibold">
        {name}
      </span>
    </div>
);
  
export default ApplicationCard;