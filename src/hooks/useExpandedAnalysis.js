import { useState } from 'react';

const useExpandedAnalysis = () => {
  const [expandedAnalysis, setExpandedAnalysis] = useState(null);

  const closeExpandedView = () => {
    setExpandedAnalysis(null);
  };

  return {
    expandedAnalysis,
    setExpandedAnalysis,
    closeExpandedView
  };
};

export default useExpandedAnalysis; 