import React  from "react";
  
const Card = ({ children, className = "" }) => {
      
    return (
     <div className={`bg-greyCustom rounded-lg shadow ${className}`}>
        {children}
      </div>
    );
};
  
export default Card;