import React, { useState, useEffect, useContext } from "react";
import Drawer from "./Drawer";
import { Link } from "react-router-dom";
import { AuthContext } from "../utils/AuthContext";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import logo from "../assets/logo.png";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user } = useContext(AuthContext);
  const auth = getAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    auth.signOut();
    navigate("/signin");
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-sm">
      {/* Desktop Header */}
      <header className="mx-auto flex items-center justify-between py-4 px-4 hidden md:flex">
        <Link to="/">
          <img
            src={logo}
            alt="Logo"
            className="w-48 h-auto md:w-60 lg:w-72" 
          />
        </Link>
        {user?.email ? (
          <Menu as="div" className="relative inline-block text-left">
            <MenuButton className="flex items-center gap-x-1.5 bg-[#f5f5f7] px-[24px] py-[8px] robotoFont font-bold text-[13px] text-[#0C0B0B] rounded-[8px] hover:bg-[#0C0B0B] hover:text-white transform transition-all duration-300">
              {user.email}
              <ChevronDownIcon className="w-4 h-4" />
            </MenuButton>
            <MenuItems className="absolute right-0 z-10 mt-2 w-40 bg-white rounded-[8px] shadow-lg ring-1 ring-black ring-opacity-5">
              <MenuItem>
                {({ active }) => (
                  <button
                    onClick={onLogout}
                    className={`w-full px-4 py-2 text-left robotoFont text-[13px] ${
                      active ? "bg-[#f5f5f7] text-[#0C0B0B]" : "text-gray-500"
                    }`}
                  >
                    Sign Out
                  </button>
                )}
              </MenuItem>
            </MenuItems>
          </Menu>
        ) : (
          <div className="flex gap-4">
            <Link
              to="/signin"
              className="border-2 text-nowrap robotoFont font-bold text-[13px] text-[#0C0B0B] border-[#0C0B0B] px-[24px] py-[8px] rounded-[8px] hover:bg-[#0C0B0B] hover:text-white transform transition-all duration-300 hover:scale-105"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="border-2 text-nowrap robotoFont font-bold text-[13px] text-[#0C0B0B] border-[#0C0B0B] px-[24px] py-[8px] rounded-[8px] hover:bg-[#0C0B0B] hover:text-white transform transition-all duration-300 hover:scale-105"
            >
              Sign Up
            </Link>
          </div>
        )}
      </header>

      {/* Mobile Header */}
      <div className="flex items-center justify-between md:hidden px-4 py-3">
        <Link to="/">
          <img
            src={logo}
            alt="Logo"
            className="w-40 h-auto sm:w-44 md:w-48" 
          />
        </Link>
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)} 
          aria-label="Menu"
          className="text-[#0C0B0B]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Drawer for Mobile Menu */}
      {isCollapsed && (
        <Drawer
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          authUser={user}
          onLogout={onLogout}
        />
      )}
    </nav>
  );
};

export default Header;



