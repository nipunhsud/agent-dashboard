import Image from "next/image";
import React from "react";

const Technology = () => {
  return (
    <div className="my-10 lg:my-36">
      <div className="flex flex-col mx-2">
        <h6 className="font-normal text-balance text-center mx-auto text-xl px-2 border-b-2 border-[#7281ff] text-[#7281ff]">
          Technology
        </h6>
        <p className="text-4xl text-center text-black font-bold mt-3 mb-2">
          Agentic AI use cases
        </p>
        <p className="text-2xl text-center ">
          AI tools and agents to automate your processes. Cutomizable to your
          process flow.
        </p>
      </div>
      <div className="flex flex-wrap gap-2 justify-center my-10 mx-3">
        <div className="flex items-center gap-3 ">
          <div className="border-2 p-5 rounded-full">
            <Image src="/images/mind.svg" alt="" width={30} height={30} className="w-[50px] lg:w-[50px]"/>
          </div>
          <div className="flex flex-col gap-1 max-w-[500px]">
            <p className="font-bold text-gray-600 text-xl">Agents</p>
            <p className="font-normal text-gray-600 text-xl">
              Maximize your productivity by converting everyday tasks into
              agentic flows.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="border-2 p-5 rounded-full">
            <Image src="/images/Integration.svg" alt="" className="w-[50px] lg:w-[50px]" width={30} height={30} />
          </div>
          <div className="flex flex-col gap-1 max-w-[500px]">
            <p className="font-bold text-gray-600 text-xl">Agents</p>
            <p className="font-normal text-gray-600 text-xl">
              Maximize your productivity by converting everyday tasks into
              agentic flows.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Technology;
