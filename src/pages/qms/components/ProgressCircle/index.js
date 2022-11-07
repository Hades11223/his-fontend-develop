import React, { useState, useEffect } from "react";
import { Progress } from "antd";

function ProgressCircle({ srcPath, timeRotate, isResetPercent, ...rest }) {
  const [percent, setPercent] = useState(0);
  const [timer, setTimer] = useState(null);

  const calculatePercent = () => {
    setPercent(percent + 1);
  };

  useEffect(() => {
    if (isResetPercent) {
      setPercent(0);
    }
  }, [isResetPercent]);

  useEffect(() => {
    if (timeRotate === undefined || percent >= 100) return;
    const ratioTime = timeRotate / 100;
    const timeInter = setInterval(calculatePercent, ratioTime);
    setTimer(timeInter);

    return () => {
      clearInterval(timer);
    };
  }, [percent]);

  return (
    <Progress
      {...rest}
      type="circle"
      percent={percent}
      format={() => <img src={srcPath} />}
    />
  );
}

export default ProgressCircle;
