import React from "react";
import { FaArrowRight } from "react-icons/fa6";

const NavButton = ({ direction }) => (
  <button 
    className="rounded-full active:scale-90 hover:text-white hover:bg-black border-2 border-black min-w-[40px] p-1 grid place-content-center min-h-[40px]"
    onClick={() => console.log(`Navigating ${direction}`)}
  >
    <FaArrowRight 
      className={direction === "left" ? "rotate-180" : ""} 
    />
  </button>
);

export default NavButton;