import React, { useState, useEffect, useContext } from "react";
import Drawer from "./Drawer";
import { Link } from "react-router-dom";
import { AuthContext } from "../utils/AuthContext";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  // eslint-disable-next-line
  const { user, token } = useContext(AuthContext);
  const auth = getAuth();
  const navigate = useNavigate();
  const onLogout = () => {
    auth.signOut();
    navigate("/signin");
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);
  return (
    <nav class="bg-black sticky top-0">
      <header className=" container mx-auto items-center justify-center pt-6 pb-6 hidden md:flex z-[99999]">
        <div
          className={`flex items-center justify-between  transition-all ease-linear duration-300 min-w-fit ${
            scrolled
              ? "w-96 border shadow-lg gap-12 mt-0 rounded-xl p-4 "
              : "w-screen shadow-none gap-4 mt-0 rounded-none border-none px-8"
          }   `}
        >
          <h1 class="text-3xl font-black text-[#6366f1]">Purnam</h1>
          {user?.email ? (
            <>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    {user?.email}
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
          ) : (
            <nav class="flex gap-2.5">
              <Link
                className="bg-black border border-white text-white rounded-lg py-2 px-3.5 inline-block font-medium cursor-pointer hover:bg-[#6366f1] hover:text-white"
                to={"/signin"}
              >
                Login
              </Link>
              <Link
                className="bg-black border border-white text-white rounded-lg py-2 px-3.5 inline-block font-medium cursor-pointer hover:bg-[#6366f1] hover:text-white"
                to={"/signup"}
              >
                Sign Up
              </Link>
            </nav>
          )}
        </div>
      </header>
      <div
        class="block md:hidden border-b px-4 py-1.5"
        data-controller="sidebar"
      >
        <div class="flex items-center justify-between fixed top-0 w-full left-0 bg-white border-b px-4 py-2.5">
          <a href="/">
            <h2 class="font-black text-[#6366f1]">Purnam</h2>
          </a>{" "}
          <span onClick={() => setIsCollapsed(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              class="stroke-[#6366f1] w-6 h-6"
            >
              <path
                fill-rule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
              ></path>
            </svg>
          </span>
        </div>
      </div>
      <Drawer isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} authUser={user} onLogout={onLogout} />
    </nav>
  );
};

export default Header;
