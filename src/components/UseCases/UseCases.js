import React from "react";
import UseCasesCard from "./UseCasesCard";
import benefitsData from "../../helpers/benefitsData"; 

const UseCases = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 max-w-4xl mt-20 mx-6">
      {benefitsData.map((useCase, index) => (
        <UsesCasesCard
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

export default UseCases;
