import { useState, useEffect } from 'react';

const useChartDimensions = () => {
  const [dimensions, setDimensions] = useState({
    width: Math.min(window.screen.width * 0.9, 420),
    height: 266.15,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: Math.min(window.screen.width * 0.9, 420),
        height: 266.15,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return dimensions;
};

export default useChartDimensions; 