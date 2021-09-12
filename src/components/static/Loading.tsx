import { useEffect, useState } from "react";

function Loading() {
  let [numOfDots, setNumOfDots] = useState(1);
  useEffect(() => {
    const interval = setTimeout(() => {
      if (numOfDots >= 3) setNumOfDots(1);
      else setNumOfDots(numOfDots + 1);
    }, 1000);
    return () => clearTimeout(interval);
  }, [numOfDots]);
  return (
    <>
      <h1>Loading{".".repeat(numOfDots)}</h1>
    </>
  );
}

export default Loading;
