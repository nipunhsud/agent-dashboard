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
    <nav className="bg-black sticky top-0 z-50">
      {/* Desktop Header */}
      <header className="mx-auto flex items-center justify-between py-4 px-4 hidden md:flex">
        <img
          src={logo}
          alt="Logo"
          className="w-48 h-auto md:w-60 lg:w-72" 
        />
        {user?.email ? (
          <Menu as="div" className="relative inline-block text-left">
            <MenuButton className="flex items-center gap-x-1.5 bg-white px-3 py-2 text-sm font-semibold text-gray-900 rounded-md shadow-sm hover:bg-gray-100">
              {user.email}
              <ChevronDownIcon className="w-4 h-4 text-gray-400" />
            </MenuButton>
            <MenuItems className="absolute right-0 z-10 mt-2 w-40 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
              <MenuItem>
                {({ active }) => (
                  <button
                    onClick={onLogout}
                    className={`w-full px-4 py-2 text-left text-sm ${
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700"
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
              className="text-white border border-white rounded-md px-4 py-2 hover:sbg-gradient-to-tr from-[#818cf8] "
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="text-white border border-white rounded-md px-4 py-2 hover:bg-purple-500"
            >
              Sign Up
            </Link>
          </div>
        )}
      </header>

      {/* Mobile Header */}
      <div className="flex items-center justify-between md:hidden px-4 py-3">
        <img
          src={logo}
          alt="Logo"
          className="w-40 h-auto sm:w-44 md:w-48" 
        />
        <button onClick={() => setIsCollapsed(!isCollapsed)} aria-label="Menu">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-white"
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



