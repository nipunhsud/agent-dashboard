import React, { useState } from "react";
import UseCasesCard from "./UseCasesCard";
import benefitsData from "../../helpers/benefitsData"; 

const UseCases = () => {
  const [activeDescription, setActiveDescription] = useState(null);
  const useCasesData = benefitsData.slice(0, 4);

  return (
    <div className="relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mt-4 mx-6">
        {useCasesData.map((useCase, index) => (
          <UseCasesCard
            key={index}
            imageSrc={useCase.imageSrc}
            altText={useCase.altText}
            title={useCase.title}
            description={useCase.description}
            onMouseEnter={() => setActiveDescription(useCase.description)}
            onMouseLeave={() => setActiveDescription(null)}
          />
        ))}
      </div>
      
      <div 
        className={`fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-12 transition-all duration-500 ease-in-out ${
          activeDescription ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <p className="text-gray-300 text-xl text-balance max-w-3xl">
          {activeDescription || ''}
        </p>
      </div>
    </div>
  );
};

export default UseCases;

