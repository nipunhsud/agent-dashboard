import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

const StatisticHeader = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex justify-between mb-4">
      <div>
        <span
          className={`font-medium cursor-pointer hover:text-black ${
            activeTab === "Learning Hours" ? "text-black font-bold" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("Learning Hours")}
        >
          Learning Hours
        </span>
        <span
          className={`font-medium cursor-pointer ml-3 hover:text-black ${
            activeTab === "My Courses" ? "text-black font-bold" : "text-gray-500"
          } ml-3`}
          onClick={() => setActiveTab("My Courses")}
        >
          My Courses
        </span>
      </div>

      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="text-[#0C0B0B] font-[500] px-[16px] py-[2px] rounded-[8px] bg-greyCustom w-max">
            Weekly
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="z-50 absolute right-0 mt-2 w-max origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-violet-500 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Weekly
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-violet-500 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Monthly
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default StatisticHeader;