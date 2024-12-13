import React, { useEffect, useState } from "react";
import { IoMenuSharp } from "react-icons/io5";
import Drawer from "./Drawer";
import { Link } from "react-router-dom";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

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
    <>
      <header className="container mx-auto items-center justify-center mt-8 sticky top-0 hidden md:flex">
        <div
          className={`flex items-center justify-between bg-white transition-all ease-linear duration-300 min-w-fit ${
            scrolled
              ? "w-96 border shadow-lg gap-12 mt-8 rounded-xl p-4 "
              : "w-screen shadow-none gap-4 mt-0 rounded-none border-none px-8"
          }   `}
        >
          <h1 class="text-3xl font-black text-[#6366f1]">Purnam</h1>
          <nav class="flex gap-2.5">
            <Link
              className="bg-[#6366f1] text-white rounded-lg py-2 px-3.5 inline-block font-medium cursor-pointer"
              to={'/signin'}
            >
              Login
            </Link>
            <Link
              className="bg-[#6366f1] text-white rounded-lg py-2 px-3.5 inline-block font-medium cursor-pointer"
              to={'/signup'}
            >
              Sign Up
            </Link>
          </nav>
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
          <span onClick={()=>setIsCollapsed(true)}>
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
      <Drawer isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
    </>
  );
};

export default Header;
