import React from "react";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";

const Drawer = ({ isCollapsed, setIsCollapsed }) => {
  return (
    <>
      <div
        className={`${
          isCollapsed ? "left-0" : "-left-[300px]"
        } transition-all duration-200 fixed bg-white w-[240px] inset-y-0 z-40`}
      >
        <h1 class="font-black text-[#6366f1] text-3xl text-center mt-8 mb-4">
          Purnam
        </h1>
        <nav class="p-4 flex flex-col gap-4">
          <ul class="flex flex-col gap-2.5">
            <li class="text-gray-700 font-medium">
              <a href="#">Projects</a>
            </li>
            <li class="text-gray-700 font-medium">
              <a href="#">Solutions</a>
            </li>
            <li class="text-gray-700 font-medium">
              <a href="#">Blog</a>
            </li>
            <li class="text-gray-700 font-medium">
              <a href="#">Events</a>
            </li>
          </ul>
          <ul class="flex flex-row gap-2.5">
            <Link
              class="bg-[#6366f1] text-white rounded-lg py-2 px-3.5 inline-block font-medium cursor-pointer"
              to={'/signin'}
            >
              Login
            </Link>
            <Link
              class="bg-[#6366f1] text-white rounded-lg py-2 px-3.5 inline-block font-medium cursor-pointer"
              to={'/signup'}
            >
              Sign Up
            </Link>
          </ul>
        </nav>
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
