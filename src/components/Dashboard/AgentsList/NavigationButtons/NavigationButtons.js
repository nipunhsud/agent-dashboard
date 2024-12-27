import React from "react";
import  NavButton from "./NavButton";

const NavigationButtons = () => (
  <div className="flex items-center gap-3 h-max">
    <NavButton direction="left" />
    <NavButton direction="right" />
  </div>
);

export default NavigationButtons;