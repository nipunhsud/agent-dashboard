import React from "react";
import { IoMdClose } from "react-icons/io";
const menuItem = ["Project", "Solution", "Blog", "Event"];

const Drawer = ({ isCollapsed, setIsCollapsed }) => {
  return (
    <>
      <div
        className={`${
          isCollapsed ? "left-0" : "-left-[300px]"
        } transition-all duration-200 fixed bg-white w-[300px] inset-y-0 z-40`}
      >
        <div className="flex justify-between items-center px-3 py-5">
          <h1 className="text-3xl font-black text-[#7281ff]">Purnam</h1>
          <IoMdClose
            className="text-[30px] text-black p-1 rounded-sm bg-white cursor-pointer"
            onClick={() => {
              setIsCollapsed(false);
            }}
          />
        </div>
        <ul className="flex flex-col items-start justify-start text-base w-full">
          {menuItem.map((item) => {
            return (
              <>
                <li className="hover:bg-[#7281ff] hover:text-white p-[10px_18px] transition-all duration-300 w-full cursor-pointer">
                  <a href="#" className="text-base">
                    {item}
                  </a>
                </li>
              </>
            );
          })}
        </ul>
        <ul>
          <li className="flex gap-3 mx-5">
            <a className="bg-[#6056ff] border border-[#3b32f9] text-white rounded-lg py-1 lg:py-2 px-2 lg:px-3.5 inline-block  font-medium cursor-pointer shadow-button">
              Login
            </a>
            <a className="bg-[#6056ff] text-white rounded-lg py-1 lg:py-2 px-2 lg:px-3.5 inline-block font-medium cursor-pointer shadow-button">
              Sign Up
            </a>
          </li>
        </ul>
      </div>
      <div
        className={`${
          isCollapsed ? "block" : "hidden"
        }  fixed inset-0 bg-black/50 transition-all duration-200 z-30`}
        onClick={() => {
          setIsCollapsed(false);
        }}
      ></div>
    </>
  );
};

export default Drawer;
