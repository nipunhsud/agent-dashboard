import React from "react";

const IntegrationCard = ({ img, icon, name }) => {
  return (
    <div className="text-center">
      <div className="bg-black rounded-2xl p-4 w-24 h-24 flex items-center justify-center">
        {img ? (
          <img src={img} alt={name} className="w-12 h-12" />
        ) : icon ? (
          <div className="w-12 h-12">
            {icon}
          </div>
        ) : null}
      </div>
      <p className="text-white mt-2">{name}</p>
    </div>
  );
};

export default IntegrationCard;