import React from 'react';
import TabSelector from './TabSelector';
import TimeframeSelector from './TimeframeSelector';
import LearningChart from './LearningChart';
import Card from '../Card';

const Statistics = ({ activeTab, setActiveTab, chartData }) => {
  return (
    <Card className="p-4 bg-transparent shadow-none mb-4 w-full md:min-w-[438.9px]">
      <div className="flex justify-between mb-4">
        <TabSelector 
          tabs={["Learning Hours", "My Courses"]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        <TimeframeSelector />
      </div>
      <LearningChart data={chartData} />
    </Card>
  );
};

export default Statistics; 