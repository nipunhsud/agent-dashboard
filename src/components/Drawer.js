import React from "react";
import { Link } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const Drawer = ({ isCollapsed, setIsCollapsed,authUser, onLogout }) => {
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
              <Link to={"#"}>Projects</Link>
            </li>
            <li class="text-gray-700 font-medium">
              <Link to={"#"}>Solutions</Link>
            </li>
            <li class="text-gray-700 font-medium">
              <Link to={"#"}>Blog</Link>
            </li>
            <li class="text-gray-700 font-medium">
              <Link to={"#"}>Events</Link>
            </li>
          </ul>
          {authUser?.email ? (
            <>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    {authUser?.email}
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 size-5 text-gray-400"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="py-1">
                    <MenuItem>
                      <button
                        type="submit"
                        onClick={onLogout}
                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                      >
                        Sign out
                      </button>
                    </MenuItem>
                  </div>
                </MenuItems>
              </Menu>
            </>
          ):(
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
          )}
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
