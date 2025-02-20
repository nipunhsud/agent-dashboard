import React from "react";
import FilterTab from "./FilterTab";

const FilterTabs = ({ filters, selectedFilter, setSelectedFilter }) => (
  <div className="flex gap-[38px] my-[15px] items-center">
    {filters?.map((filter, index) => (
      <FilterTab
        key={index}
        filter={filter}
        isSelected={selectedFilter === filter}
        onClick={() => setSelectedFilter(filter)}
      />
    ))}
  </div>
);

export default FilterTabs;