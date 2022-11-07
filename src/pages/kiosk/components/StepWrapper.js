import React from "react";

const StepWrapper = ({ step = 1 }) => {
  return (
    <div
      style={{
        background: step < 5 ? "#0762F7" : "#01b45e",
        position: "absolute",
        width: `${step * 20}%`,
        height: 20,
        bottom: 130,
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: step < 4 ? "unset" : 32,
      }}
    />
  );
};

export default StepWrapper;
