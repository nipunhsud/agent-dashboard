import React from "react";
import ProgressSection from "./ProgressSection";

const SlackAgentHeader = ({ dashOffset, validProgress }) => (
          <div className="flex bg-greyCustom flex-1 p-[8px] rounded-[14px] justify-between items-center gap-4  h-max">
            <div className="flex items-center gap-[29px]">
              <div className="p-1 bg-white rounded-lg">
                <img
                  className="min-w-[48px] h-auto"
                  src="images/SlackBack.svg"
                  alt="Slack"
                />
              </div>
              <h6 className="font-[800] agentSection">Slack Agent</h6>
            </div>
            <div className=" flex items-center gap-2">
              <div className="relative w-[40px] h-[40px]">
                <svg
                  className="w-full h-full -rotate-90"
                  viewBox="0 0 36 36"
                  xmlns="http://www.w3.org/2000/svg"
                >
              
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    className="stroke-current text-gray-200 dark:text-neutral-700"
                    strokeWidth="2"
                  />
                 
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    className="stroke-current text-[#0C0B0B]"
                    strokeWidth="2"
                    strokeDasharray="100"
                    strokeDashoffset={dashOffset}
                    strokeLinecap="round"
                  />
                </svg>
               
                <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                  <span className="text-center text-sm font-bold text-[#0C0B0B]">
                    {validProgress}%
                  </span>
                </div>
              </div>
              <button className="border-2 font-medium text-[#0C0B0B] border-[#0C0B0B] px-[24px] py-[8px] rounded-[8px]  hover:bg-[#0C0B0B] hover:text-white transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                Continue
              </button>
            </div>
          </div>
  
);

export default SlackAgentHeader;