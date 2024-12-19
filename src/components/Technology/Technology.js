import React from "react";
import UseCase from "./UseCase";
import useCasesData from "../../helpers/useCasesData"; 

const Technology = () => {
  return (
    <section className="flex items-center flex-col mt-40 container mx-auto text-center mb-40">
      <p className="uppercase text-gray-400 tracking-wider">Technology</p>
      <h4 className="font-black mt-6 xl:mt-10 mb-2.5 xl:mb-4 text-2xl xl:text-4xl text-gray-700 mx-2.5 text-center text-balance">
        Why use agents?
      </h4>
      <p className="text-gray-500 text-xl xl:text-2xl">
        AI tools and agents to automate your processes. Customizable to your
        process flow.
      </p>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 max-w-4xl mt-20 mx-6">
        {useCasesData.map((useCase, index) => (
          <UseCase
            key={index}
            imageSrc={useCase.imageSrc}
            altText={useCase.altText}
            title={useCase.title}
            description={useCase.description}
          />
        ))}
      </div>
    </section>
  );
};

export default Technology;
