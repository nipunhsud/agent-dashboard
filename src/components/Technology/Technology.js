import react from "react";
import UseCase from "./UseCase";

const Technology = () => {
    return (
      <section className="flex items-center flex-col mt-40 container mx-auto text-center mb-40">
        <p className="uppercase text-gray-400 tracking-wider">Technology</p>
        <h4 className="font-black mt-6 xl:mt-10 mb-2.5 xl:mb-4 text-2xl xl:text-4xl text-gray-700 mx-2.5 text-center text-balance">
          Agentic AI use cases
        </h4>
        <p className="text-gray-500 text-xl xl:text-2xl">
          AI tools and agents to automate your processes. Customizable to your
          process flow.
        </p>
        <div className="flex flex-col gap-16 max-w-2xl mt-20 mx-6">
          <UseCase
            imageSrc="/images/mind.svg"
            altText="Mind Icon"
            title="Agents"
            description="Maximize your productivity by converting everyday tasks into agentic flows."
          />
          <UseCase
            imageSrc="/images/Integration.svg"
            altText="Integration Icon"
            title="Seamless Integration"
            description="Seamlessly integrate with our agents to power your business. Customize and deploy them the way you need."
          />
        </div>
      </section>
    );
  };
  
  export default Technology;