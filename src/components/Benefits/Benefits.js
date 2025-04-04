import React from "react";
import BenefitCard from "./BenefitCard";
import benefitsData from "../../helpers/benefitsData"; 

const Benefits = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 max-w-4xl mt-4 mx-auto px-6">
      {benefitsData.map((benefit, index) => (
        <BenefitCard
          key={index}
          imageSrc={benefit.imageSrc}
          altText={benefit.altText}
          title={benefit.title}
          description={benefit.description}
        />
      ))}
    </div>
  );
};

export default Benefits;

