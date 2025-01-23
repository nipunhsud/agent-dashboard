import React from "react";
import Header from "./Header";
import Statistic from "./Statistic";

const LEARNING_DATA = [
  { day: "mon", hours: 0 },
  { day: "tue", hours: 1.5 },
  { day: "wed", hours: 2.5 },
  { day: "thu", hours: 1 },
  { day: "fri", hours: 4 },
  { day: "sat", hours: 3 },
  { day: "sun", hours: 2 },
];

const Chart = ({ activeTab, setActiveTab }) => {
  return (
    <div
      className="bg-custom-purple p-4 rounded-lg mx-auto"
      style={{ maxWidth: "500px", width: "100%" }}
    >
      <h2 className="text-xl font-bold mb-4 text-white">Your statistics</h2>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <Statistic data={LEARNING_DATA} />
    </div>
  );
};

export default Chart;
