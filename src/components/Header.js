import React, { useState } from "react";
import { IoMenuSharp } from "react-icons/io5";
import Drawer from "./Drawer";

const Header = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <>
    <div className="sticky top-5 z-30 mt-5">
      <div className="container mx-auto">
        <div className="flex items-center justify-between bg-white transition-all ease-linear duration-300 py-4 px-6 rounded-xl border shadow-lg">
          <h1 className="text-3xl font-black text-[#7281ff]">Purnam</h1>
          <div>
            <ul>
              <li className="flex gap-3">
                <a className="bg-[#6056ff] border border-[#3b32f9] text-white rounded-lg py-1 lg:py-2 px-2 lg:px-3.5 hidden lg:inline-block  font-medium cursor-pointer shadow-button">
                  Login
                </a>
                <a className="bg-[#6056ff] text-white rounded-lg py-1 lg:py-2 px-2 lg:px-3.5 hidden lg:inline-block font-medium cursor-pointer shadow-button">
                  Sign Up
                </a>
                <a className="bg-[#6056ff] text-white rounded-lg py-1 lg:py-2 px-2 lg:px-3.5 font-medium cursor-pointer shadow-button block lg:hidden"  onClick={() => {
                  setIsCollapsed(!isCollapsed);
                }}>
                  <IoMenuSharp size={25}/>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <Drawer isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
    </>
  );
};

export default Header;
