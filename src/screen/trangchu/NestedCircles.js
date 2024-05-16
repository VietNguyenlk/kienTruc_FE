import React, { useState } from "react";

const NestedCircles = ({ innerPercent, outerPercent }) => {
  const [hoveredCircle, setHoveredCircle] = useState(null);

  const handleMouseEnter = (circle) => {
    setHoveredCircle(circle);
  };

  const handleMouseLeave = () => {
    setHoveredCircle(null);
  };

  const calculateStrokeDasharray = (percent) => {
    const circumference = 2 * Math.PI * 50; // Assuming the radius is 50 for both circles
    const dashLength = (circumference * percent) / 100;
    const gapLength = circumference - dashLength;
    return `${dashLength} ${gapLength}`;
  };
  
  const outerPercentage = (outerPercent / outerPercent) * 100; // Convert outerPercent to percentage of 156 credits
  const innerPercentage = (innerPercent / outerPercent) * 100; // Convert innerPercent to percentage of 156 credits

  return (
    <div style={{display:"flex"}}>
      <svg width="250" height="250">
        {/* Outer Circle */}
        <circle
          cx="125"
          cy="125"
          r="110"
          fill="none"
          stroke="blue"
          strokeWidth="25"
          strokeDasharray={calculateStrokeDasharray(outerPercentage)}
          onMouseEnter={() => handleMouseEnter("outer")}
          onMouseLeave={handleMouseLeave}
          strokeOpacity={hoveredCircle === "outer" ? 1 : 0.6}
        />

        {/* Inner Circle */}
        <circle
          cx="125"
          cy="125"
          r="75"
          fill="none"
          stroke="rgb(75, 224, 100)"
          strokeWidth="25"
          strokeDasharray={calculateStrokeDasharray(innerPercentage)}
          onMouseEnter={() => handleMouseEnter("inner")}
          strokeOpacity={hoveredCircle === "inner" ? 1 : 0.6}
          onMouseLeave={handleMouseLeave}
        />

        {/* Text Display */}
        {hoveredCircle && (
          <text x="125" y="110" textAnchor="middle">
            {hoveredCircle === "outer" ? 
              <>
                <tspan x="122" dy="1.2em">Tổng 156 tín chỉ</tspan>
                <tspan x="125" dy="1.2em">{`${outerPercentage}%`}</tspan>
              </> : 
              <>
                <tspan x="123" dy="1.2em">{`Đã học ${innerPercent} tín chỉ`}</tspan>
                <tspan x="125" dy="1.2em">{`${innerPercentage.toFixed(0)}%`}</tspan>
              </>
            }
          </text>
        )}

      </svg>
    </div>
  );
};

export default NestedCircles;
