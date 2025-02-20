import React from "react";

const FilterTab = ({ filter, isSelected, onClick }) => (
  <h4
    onClick={onClick}
    className={`text-[16px] font-bold cursor-pointer hover:text-[#0c0b0b] ${
      isSelected ? "text-[#0c0b0b]" : "text-[#b6b6b6]"
    }`}
  >
    {filter}
  </h4>
);

export default FilterTab;