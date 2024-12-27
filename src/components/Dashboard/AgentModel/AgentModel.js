import React from "react";

const AgentModel = ({ closeModal, selectedAgent }) => {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-[99999]"
      onClick={closeModal}
    >
      <div className="fixed inset-0 flex justify-center items-center z-[99999]">
        <div
          className="bg-white p-6 rounded-[12px] w-[300px] h-[300px] relative shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute top-4 right-4 text-xl font-bold text-gray-700 hover:text-gray-900 transition"
            onClick={closeModal}
          >
            &times;
          </button>

          <div className=" w-fit mx-auto my-4">
            <div className="w-[64px] h-[64px] mx-auto  bg-white rounded-[12px] flex items-center justify-center shadow-md">
              <img
                src={selectedAgent.svg}
                alt={selectedAgent.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex text-center flex-col gap-[2px]">
              <div className="font-bold text-[16px] mt-3">
                {selectedAgent.name}
              </div>
              <div className="text-[13px] font-light robotoFont text-gray-500">
                by {selectedAgent.by}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-[16px] w-fit mx-auto mt-4">
            <div className="flex items-center gap-[7px]">
              <img
                src={selectedAgent.timeImg}
                alt="time"
                className="w-[14px] h-[14px]"
              />
              <span className="robotoFont text-[13px] font-light text-gray-600">
                {selectedAgent.time}
              </span>
            </div>
            <div className="flex items-center gap-[7px]">
              <img
                src={selectedAgent.ratingImg}
                alt="rating"
                className="w-[14px] h-[14px]"
              />
              <span className="robotoFont text-[13px] font-light text-gray-600">
                {selectedAgent.rating}
              </span>
            </div>
          </div>
          <button className="border-2 w-full my-6 robotoFont font-bold text-[13px] text-[#0C0B0B] border-[#0C0B0B] px-[24px] py-[8px] rounded-[8px]  hover:bg-[#0C0B0B] hover:text-white transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
            View agent
          </button>
        </div>
      </div>
    </div>
  );
}

export default AgentModel;
