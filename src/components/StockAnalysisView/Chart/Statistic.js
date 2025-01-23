import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import CustomTooltip from "./CustomTooltip";

const Statistic = ({ data }) => {
  const [chartDimensions, setChartDimensions] = useState({
    width: Math.min(window.screen.width * 0.9, 420),
    height: 266.15,
  });

  useEffect(() => {
    const handleResize = () => {
      setChartDimensions({
        width: Math.min(window.screen.width * 0.9, 420),
        height: 266.15,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <LineChart
      width={chartDimensions.width}
      height={chartDimensions.height}
      data={data}
      className="text-[#0C0B0B]"
      margin={{ top: 10, right: 10, bottom: 10, left: 0 }}
    >
      <XAxis
        dataKey="day"
        stroke="#0C0B0B"
        tick={{ fill: "#0C0B0B" }}
        axisLine={false}
        tickLine={false}
      />
      <YAxis
        axisLine={false}
        tickLine={false}
        stroke="#0C0B0B"
        tick={{ fill: "#0C0B0B" }}
      />
      <Tooltip content={<CustomTooltip />} cursor={false} />
      <Line
        type="monotone"
        dataKey="hours"
        stroke="#000000"
        dot={{ stroke: "#000", strokeWidth: 1, fill: "#000" }}
        strokeWidth={2}
      />
    </LineChart>
  );
};

export default Statistic;
