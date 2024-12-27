import React, { useState } from "react";
import {
    Home,
    GraduationCap,
    User,
    Mail,
    Settings,
    LogOut,
  } from "lucide-react";

const Sidebar = ({isOpen}) => {
  

  return (
    <div
        className={`py-[24.02px] z-[99]  ${
        isOpen ? "translate-x-[0px]" : "translate-x-[-200px]"
        }  md:translate-x-[0px] absolute md:static pl-[32.34px] h-screen duration-300`}
    >
        <div className="w-auto px-[42.88px] flex flex-col items-center h-full bg-black text-white rounded-[24px] pb-[40.39px]">
        <div className="flex flex-col   items-center py-6 space-y-8">
            <div className="text-[64px] font-sans font-bold">F.</div>
            <Home size={24} />
            <GraduationCap size={24} />
            <User size={24} />
            <Mail size={24} />
            <Settings size={24} />
        </div>
        <div className="mt-auto">
            <LogOut size={24} />
        </div>
        </div>
    </div>
  );
};

export default Sidebar;