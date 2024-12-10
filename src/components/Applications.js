import Image from "next/image";
import React from "react";

const images = [
  {
    img: "/images/web-search.svg",
    name: "Web Search",
  },
  {
    img: "/images/gmail.svg",
    name: "Gmail",
  },
  {
    img: "/images/outlook.svg",
    name: "Outlook",
  },
  {
    img: "/images/slack.svg",
    name: "Slack",
  },
  {
    img: "/images/notion.svg",
    name: "Notion",
  },
];
const Applications = () => {
  return (
    <div className="pt-10 lg:pt-36 px-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center border border-[#7281ff] p-10 rounded-3xl container mx-auto bg-white/20 shadow-lg backdrop-blur-sm">
        <div className="flex items-center flex-col gap-5 ">
          <h6 className="font-normal text-balance mx-auto text-xl px-2 border-b-2 border-[#7281ff] text-[#7281ff]">
            Applications
          </h6>
          <p className=" text-xl lg:text-4xl text-center text-black font-bold mb-2">
            Agents that integrate with everyday tools to automate daily
            processes.
          </p>
        </div>
        <div className="flex flex-wrap gap-24 items-center justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-10">
            {images &&
              images.map((item) => {
                return (
                  <>
                    <div className="flex gap-5 items-center border border-[#7281ff] rounded-full shadow-lg">
                      <div className="shadow-lg border p-5 rounded-full">
                        <Image src={item.img} alt="" className="w-[20px] lg:w-[50px]" width={50} height={50} />
                      </div>
                      <span className="text-xl font-bold pr-3">{item.name}</span>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Applications;
