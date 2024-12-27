import React from "react";
import StatisticHeader from "./StatisticHeader";
import StatisticChart from "./StatisticChart";
import Card from "../Card/Card";

const LEARNING_DATA = [
  { day: "mon", hours: 0 },
  { day: "tue", hours: 1.5 },
  { day: "wed", hours: 2.5 },
  { day: "thu", hours: 1 },
  { day: "fri", hours: 4 },
  { day: "sat", hours: 3 },
  { day: "sun", hours: 2 },
];

const Statistic = ({ activeTab, setActiveTab }) => {
  return (
    <Card className="p-4 bg-transparent shadow-none mb-4 w-full md:min-w-[438.9px]">
      <h2 className="text-xl font-bold mb-4">Your statistics</h2>
      <StatisticHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      <StatisticChart data={LEARNING_DATA} />
    </Card>
  );
};

export default Statistic;

