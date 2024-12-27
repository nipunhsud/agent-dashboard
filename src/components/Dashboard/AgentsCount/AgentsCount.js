import React, { Fragment } from "react"
import { HiMagnifyingGlass } from "react-icons/hi2";
import NotificationModel from "./NotificationModel";
import { Menu, Transition } from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa6";
import { VscListSelection } from "react-icons/vsc";
import Card from "../Card/Card";
 
const AgentsCount = ({isOpen, setIsOpen}) => {
    
  
    return (
     <div className="w-full xl:w-[50%]  gap-4 ">
        <div className="flex items-center gap-4 mb-[23.67px]">
        <div className="bg-greyCustom w-[100px] md:w-auto flex items-center p-2 sm:p-[10px_15px] rounded-[8px]">
            <HiMagnifyingGlass />
            <input
            className="bg-transparent pl-2 text-gray-500 w-full focus:outline-none focus:border-none"
            type="text"
            placeholder="Search"
            />
        </div>
        
        <div className="relative">
            <NotificationModel />
        </div>
        
        <div className="flex items-center gap-2">
            <div className="w-[40px] h-[40px] overflow-hidden rounded-[8px] border-2">
            <img src="images/user.svg" />
            </div>
            <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="text-[#0C0B0B] font-[500] px-[16px] py-[2px] rounded-[8px]  w-max">
                <FaChevronDown className=" text-[18px] h-auto" />
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
                <Menu.Items className=" z-50 absolute right-0 mt-2 w-max origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                <div className="px-1 py-1 ">
                    <Menu.Item>
                    {({ active }) => (
                        <button
                        className={`${
                            active
                            ? "bg-violet-500 text-white"
                            : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                        profile
                        </button>
                    )}
                    </Menu.Item>
                    <Menu.Item>
                    {({ active }) => (
                        <button
                        className={`${
                            active
                            ? "bg-violet-500 text-white"
                            : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                        logout
                        </button>
                    )}
                    </Menu.Item>
                </div>
                </Menu.Items>
            </Transition>
            </Menu>
            <VscListSelection
            onClick={() => setIsOpen(!isOpen)}
            className="text-4xl block md:hidden font-bold ml-5"
            />
        </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-[23.78px]">
        <Card className="p-4 bg-greyCustom pt-[30.05px] flex-1 flex">
            <div className=" flex items-center justify-between gap-2 m-auto">
            <div className="text-4xl font-bold">11</div>
            <div className="text-[16px] text-[#0C0B0B]">
                Agents <br /> Working
            </div>
            </div>
        </Card>
        <Card className="p-4 bg-greyCustom  pt-[30.05px] flex-1 flex">
            <div className=" flex items-center justify-between gap-2 m-auto">
            <div className="text-4xl font-bold">4</div>
            <div className="text-[16px] text-[#0C0B0B]">
                Agents <br /> in progress
            </div>
            </div>
        </Card>
        </div>
     </div>
    );
  };
  
export default AgentsCount;

