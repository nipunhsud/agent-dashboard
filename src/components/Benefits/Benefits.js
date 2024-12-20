import React from "react";
import BenefitCard from "./BenefitCard";
import benefitsData from "../../helpers/benefitsData"; 

const Benefits = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 max-w-4xl mt-4 mx-6">
      {benefitsData.map((useCase, index) => (
        <BenefitCard
          key={index}
          imageSrc={useCase.imageSrc}
          altText={useCase.altText}
          title={useCase.title}
          description={useCase.description}
        />
      ))}
    </div>
  );
};

export default Benefits;

