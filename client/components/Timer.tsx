import React, { useState, useEffect } from "react";

function Timer() {
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    if (seconds > 0) {
      const intervalId = setInterval(() => {
        setSeconds(seconds - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [seconds]);

  return (
    <div>{seconds === 0 ? "Time is up!" : `Seconds remaining: ${seconds}`}</div>
  );
}
export default Timer;
