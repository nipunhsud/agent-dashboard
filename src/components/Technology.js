import React from "react";

const Technology = () => {
  return (
    <section class="flex items-center flex-col mt-40 container mx-auto text-center mb-40">
      <p class="uppercase text-gray-400 tracking-wider">Technology</p>
      <h4 class="font-black mt-6 xl:mt-10 mb-2.5 xl:mb-4 text-2xl xl:text-4xl text-gray-700 mx-2.5 text-center text-balance">
        Agentic AI use cases
      </h4>
      <p class="text-gray-500 text-xl xl:text-2xl">
        AI tools and agents to automate your processes. Cutomizable to your
        process flow.
      </p>
      <div class="flex flex-col gap-16 max-w-2xl mt-20 mx-6">
        <div class="flex gap-6 items-center flex-col xl:flex-row text-center xl:text-left">
          <span class="flex-center p-4 bg-[#e0e7ff] rounded-full min-w-20 min-h-20 border-2 border-[#6366f1]">
            <img src="/images/mind.svg" alt="" />
          </span>
          <div class="flex flex-col justify-between">
            <h6 class="font-bold text-gray-600 text-xl">Agents</h6>
            <p class="text-gray-700 text-lg mt-4 text-balance">
              Maximize your productivity by converting everyday tasks into
              agentic flows.
            </p>
          </div>
        </div>
        <div class="flex gap-6 items-center flex-col xl:flex-row text-center xl:text-left">
          <span class="flex-center p-4 bg-[#e0e7ff] rounded-full min-w-20 min-h-20 border-2 border-[#6366f1]">
            <img src="/images/Integration.svg" alt="" />
          </span>
          <div class="flex flex-col justify-between">
            <h6 class="font-bold text-gray-600 text-xl">
              Seamless Integration
            </h6>
            <p class="text-gray-700 text-lg mt-4 text-balance">
              Seamlessly integrate with our agents to power your business.
              Customize and deploy them the way you need.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technology;
