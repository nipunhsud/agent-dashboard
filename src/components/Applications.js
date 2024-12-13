import React from "react";
// eslint-disable-next-line
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
    <section class="@container flex items-center flex-col mt-40 text-center">
      <div class="xl:max-w-4xl lg:max-w-3xl text-center">
        <p class="uppercase text-gray-400 tracking-wider">
          <span
            class="translation_missing"
            title="translation missing: en.static.index.applications"
          >
            Applications
          </span>
        </p>
        <h4 class="text-gray-700 font-bold text-3xl xl:text-4xl mt-6 mb-12 text-balance">
          Agents that integrate with everyday tools to automate daily processes.
        </h4>
        <div class="flex flex-wrap gap-24 items-center justify-center">
          <div class="flex flex-col items-center gap-4 rounded">
            <img
              src="/images/web-search.svg"
              alt=""
              className="w-[96px] h-[96px]"
            />
            <span class="text-center text-gray-700 text-xl font-semibold">
              Web Search
            </span>
          </div>
          <div class="flex flex-col items-center gap-4 rounded">
            <img src="/images/gmail.svg" alt="" className="w-[96px] h-[96px]" />
            <span class="text-center text-gray-700 text-xl font-semibold">
              Gmail
            </span>
          </div>
          <div class="flex flex-col items-center gap-4 rounded">
            <img
              src="/images/outlook.svg"
              alt=""
              className="w-[96px] h-[96px]"
            />
            <span class="text-center text-gray-700 text-xl font-semibold">
              Outlook
            </span>
          </div>
          <div class="flex flex-col items-center gap-4 rounded">
            <img src="/images/slack.svg" alt="" className="w-[96px] h-[96px]" />
            <span class="text-center text-gray-700 text-xl font-semibold">
              Slack
            </span>
          </div>
          <div class="flex flex-col items-center gap-4 rounded">
            <img
              src="/images/notion.svg"
              alt=""
              className="w-[96px] h-[96px]"
            />
            <span class="text-center text-gray-700 text-xl font-semibold">
              Notion
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Applications;
